// page url should look something like:
// athletes.html?sport=Skating&gender=Women%27s&sportevent=1,000m
function getEventInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    sport: urlParams.get("sport"),
    gender: urlParams.get("gender"),
    event: urlParams.get("sportevent"),
  };
}

function displayCards(collection) {
  eventInfo = getEventInfo();
  document.getElementById("athletes-title").innerHTML =
    "Competitors in " + eventInfo.gender + " " + eventInfo.sportevent;

  let cardTemplate = document.getElementById("athleteCardTemplate");
  // var athletesRef = db.collection(collection);
  // use currEvent to query firestore and get all athletes for this event
  //  var query = athletesRef.where("events", "array-contains", sportEvent);
  db.collection(collection)
    .where("sex", "==", "F") //change to sport, gender, event, etc.
    .get()
    .then((athList) => {
      athList.forEach((athlete) => {
        // console.log(athlete.data().name);
      });
    })
    .catch((error) => {
      console.log("Error getting athletes: ", error);
    });
  // db.collection(collection)
  //   .get()
  //   .then((snap) => {
  //     var i = 1;

  //     snap.forEach((doc) => {
  //       // iterate thru each doc

  //       // set some variable to data from database document
  //       var name = doc.data().name;
  //       var age = doc.data().age;

  //       // clone the template
  //       let newcard = cardTemplate.content.cloneNode(true);

  //       // update elements of the clone
  //       newcard.querySelector(".athlete-card-name").innerHTML = name;
  //       newcard.querySelector(".athlete-card-age").innerHTML = age;

  //       // attach to gallery
  //       document.getElementById(collection + "-go-here").appendChild(newcard);
  //       i++;
  //     });
  //   });
}

displayCards("athletes");

function diplayAthletes() {
  eventSelection = $("#event-selection").val();
  // console.log(eventSelection);
}

function setup() {
  $("#get-event-selection").click(diplayAthletes);
}
$(document).ready(setup);
