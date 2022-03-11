$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./text/athlete_events.tsv",
    dataType: "text",
    success: function (data) {
      processData(data);
    },
  });
});

function processData(allText) {
  //   var columns = 14; // number of columns
  var allTextLines = allText.split(/\r\n|\n/);
  var headings = allTextLines[0].split("\t");
  //   var headings = headings.splice(0, columns);

  var allSportsEvents = {};
  var athletesDict = {};

  // go through each line and build dictionary
  for (row = 1; row < allTextLines.length - 10; row += 20) {
    //   for (row = 1; row < 13; row += 1) {
    let textLine = allTextLines[row].split("\t");
    // skip weird names
    if (/"|\(|\)/.test(textLine[1])) {
      continue;
    }

    let athleteID = parseInt(textLine[0]);
    let currAthlete = {};

    for (field = 1; field < 8; field++) {
      let fieldValue = textLine[field];
      if (field > 2 && field < 6) {
        fieldValue = parseInt(fieldValue);
      }
      // else if (field == 1)
      // make weird names less weird
      // fieldValue = formatName(fieldValue);
      currAthlete[headings[field].toLowerCase()] = fieldValue;
    }

    // break up 'Events' value into [whole_string, sport, sex, event]
    const re = /(\w+)\s(Men's|Women's|Mixed)\s(.+)/;
    let eventArr = re.exec(textLine[13]);
    let sport = textLine[12];
    let sex = eventArr[2];
    let event = eventArr[3];
    currAthleteSport = { [sport]: { [sex]: [event] } };

    // make sure sport is in dict of all sports events
    if (!(sport in allSportsEvents)) {
      allSportsEvents[sport] = {
        "Men's": new Set(),
        "Women's": new Set(),
        Mixed: new Set(),
      };
    }
    // then add the particular
    allSportsEvents[sport][sex].add(event);

    // athlete repeated (diff sport or sex or event)
    if (athleteID in athletesDict) {
      let existingSportArr = athletesDict[athleteID].sport;
      console.log("exists:", existingSportArr);
      if (sport in existingSportArr) {
        if (sex in existingSportArr[sport]) {
          existingSportArr[sport][sex].push(event);
        } else {
          existingSportArr[sport][sex] = [event];
        }
      } else {
        //add new sport
        existingSportArr[sport] = { [sex]: [[event]] };
      }
    } else {
      currAthlete["sport"] = currAthleteSport;
      athletesDict[athleteID] = currAthlete;
    }
  }
  console.log(athletesDict);
  console.log(allSportsEvents);
  // 0: "ID"        INT
  // 1: "Name"
  // 2: "Sex"
  // 3: "Age"       INT
  // 4: "Height"    INT
  // 5: "Weight"    INT
  // 6: "Team"
  // 7: "NOC"
  // 8: "Games"     X
  // 9: "Year"      X
  // 10: "Season"   X
  // 11: "City"     X
  // 12: "Sport"    X
  // 13: "Event"
  // writeAthletes(athletesDict);
  // writeEvents(allSportsEvents);
}

function writeAthletes(athletes) {
  for (const [id, athlete] of Object.entries(athletes)) {
    for (const [field, value] of Object.entries(athlete)) {
      // console.log(field, value);
      db.collection("athletes")
        .doc(id)
        .set({ [field]: value }, { merge: true });
    }
  }
}
function writeEvents(events) {
  for (const [sport, subsport] of Object.entries(events)) {
    sportID = sport.replaceAll(" ", "-").toLowerCase();
    // console.log(sportID, subsport);
    for (const [sex, event] of Object.entries(subsport)) {
      eventArr = Array.from(event);
      if (eventArr.length > 0) {
        // console.log(sex, eventArr);
        db.collection("sports")
          .doc(sportID)
          .set({ name: sport, [sex]: eventArr }, { merge: true });
      }
    }
  }
}
//  db.collection("athletes-test").doc(docname).set()

// some names are weird, let's fix 'em
function formatName(name) {
  const re = /(\w+"\w+"*\w+)(\(-\w+\))*/;
  const nameArr = re.exec(name);
  return nameArr;
}
