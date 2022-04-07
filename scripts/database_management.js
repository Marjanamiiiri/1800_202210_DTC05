$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "./text/athlete_events.tsv",
    dataType: "text",
    success: function (data) {
      processData(data); // do all the things!
    },
  });
});

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headings = allTextLines[0].split("\t");
  var allSportsEvents = {};
  var athletesDict = {};

  // go through each line and build dictionary
  // for (row = 1; row < allTextLines.length; row += 10) {
  for (row = 2; row < allTextLines.length; row += 4) {
    let textLine = allTextLines[row].split("\t");

    // skip weird names
    if (/"|\(|\)/.test(textLine[1])) {
      continue;
    }

    let athleteID = parseInt(textLine[0]);
    let currAthlete = {};

    // got through each column (total: 10) in table (up to not incl Event)=> field in firestore doc
    for (field = 1; field < 9; field++) {
      let fieldValue = textLine[field];
      if (field > 5) {
        fieldValue = parseInt(fieldValue);
      }
      currAthlete[headings[field].toLowerCase()] = fieldValue;
    }
    // assign random 'medal' to athlete
    currAthlete['points'] = Math.floor(Math.random() * 4)

    // break up 'Events' value into [whole_string, sport, sex, event]
    const re = /(\w+)\s(Men's|Women's|Mixed)\s(.+)/;
    let eventArr = re.exec(textLine[9]);
    // console.log(eventArr);
    let sport = textLine[5];
    let gender = eventArr[2];
    let event = eventArr[3];


    // db.collection("sports")
    //       .doc(sport)
    //       .collection(gender)
    //       .document(event)
    //       .set({ athletes: firebase.firestore.FieldValue.arrayUnion(athleteID)}, { merge: true })
    //       .then(function () {
    //         console.log(athleteID +" added to "+ sport +'>'+ gender +'>'+ event);
    //       });

    if (!(sport in allSportsEvents)) {
      allSportsEvents[sport] = {
        "Men's": {},
        "Women's": {},
        Mixed: {},
      };
    }
    // then add the particular
    if (event in allSportsEvents[sport][gender]) {
      allSportsEvents[sport][gender][event].push(athleteID);
    } else {
      allSportsEvents[sport][gender][event] = [athleteID];
    }

    // athlete repeated (diff sport or gender or event)
    if (athleteID in athletesDict) {
      let existingSportArr = athletesDict[athleteID].sport;
      // console.log(athleteID, "is in multiple events");
      if (
        sport == athletesDict[athleteID].sport &&
        gender == athletesDict[athleteID].genders
      ) {
        athletesDict[athleteID].events.push(event);
      } else {
        console.log(athleteID, "is in multiple sports");
      }
    } else {
      currAthlete["sport"] = sport;
      currAthlete["genders"] = gender;
      currAthlete["events"] = [event];
      athletesDict[athleteID] = currAthlete;
    }
  }
  // delete empty genders (Mixed)
  for (const [sport, sex] of Object.entries(allSportsEvents)) {
    for (const [gender, event] of Object.entries(sex)) {
      if (Object.keys(event).length === 0) {
        delete allSportsEvents[sport][gender];
      }
    }
  }
  console.log(Object.keys(athletesDict).length + " athletes");
  console.log(athletesDict);
  // writeAthletes(athletesDict);      // write to athletes collection

  console.log(allSportsEvents);
  // writeEvents(allSportsEvents); // write to sports collection
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
  // console.log(events);
  // {sport: {gender: {event: [athletes]}}}
  for (const [sport, gender] of Object.entries(events)) {
    sportID = sport.replaceAll(" ", "-").toLowerCase();
    // console.log(sportID, gender);
    for (const [sex, events] of Object.entries(gender)) {
      // eventArr = Array.from(event);
      for (const [event, athletesList] of Object.entries(events)) {
        if (athletesList.length > 0) {
          console.log(sportID, sex, event, athletesList);
          db.collection("sports")
            .doc(sportID)
            // .set({ name: sport}, { merge: true })
            .collection(sex)
            .doc(event)
            .set({athletes: athletesList}, { merge: true })
            .then(function () {
              // console.log(sport, sex, event, athletesList);
            });
        }
      }
    }
  }
}

// fixes incorrectly created sports fields for athlete documents
function adjustSportFields() {
  db.collection("athletes")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        // doc.data().sport = {Alpine Skiing: {Men's: ["Combined", "Giant Slalom"]}}
        // console.log(typeof doc);
        let sportDict = doc.data().sport;
        let sport = Object.keys(sportDict)[0];
        let gender = Object.keys(sportDict[sport])[0];
        let events = sportDict[sport][gender];
        // console.log(doc.id);
        doc.ref
          .update({
            sport: sport,
            gender: gender,
            events: events,
          })
          .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        console.log(sport, gender, events);
        // doc.set({ 'sport': sport, 'gender': gender, 'events': events}, { merge: true });
        // doc.update({ sport: [sport], gender: [gender], events: [events] });
      });
    });
}

// some names are weird, this tried to fix them
function formatName(name) {
  const re = /(\w+"\w+"*\w+)(\(-\w+\))*/;
  const nameArr = re.exec(name);
  return nameArr;
}


// range 4 = [0, 1, 2, 3]
function giveRandomPoints(collection, range) {
  db.collection(collection)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        pointvalue = Math.floor(Math.random() * range);
        doc.ref.update({
          points: pointvalue,
        });
      });
    });
}
