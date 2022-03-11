// page url should look something like:
// athletes.html?sport=Skating&gender=Women%27s&sportevent=1,000m
function getEventInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    sport: toTitleCase(urlParams.get("sport").replace("-", " ")),
    gender: urlParams.get("gender"),
    event: urlParams.get("event"),
  };
}

function displayCards(collection) {
  eventInfo = getEventInfo();
  // console.log(eventInfo);
  document.getElementById("athletes-title").innerHTML =
    "Competitors in " + eventInfo.gender + " " + eventInfo.event;

  let cardTemplate = document.getElementById("athleteCardTemplate");
  // var athletesRef = db.collection(collection);
  // use currEvent to query firestore and get all athletes for this event
  //  var query = athletesRef.where("events", "array-contains", sportEvent);
  db.collection(collection)
    .where("sport", "==", eventInfo.sport)
    // .where("genders", "==", eventInfo.gender)
    // .where("events", "==", eventInfo.event)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        console.log(doc.data().name);
        var name = doc.data().name;
        var age = doc.data().age;
        var pic = "./images/athletes/women_outline.png";
        if (doc.data().sex == "M") {
          pic = "./images/athletes/men_outline.png";
        }

        // clone the template
        let newcard = cardTemplate.content.cloneNode(true);

        // update elements of the clone
        // newcard.querySelector("a").href = `./athlete-bio.html?id=${doc.id}`;
        newcard.querySelector(".card-image").src = pic;
        newcard.querySelector(".card-image").alt = name;
        newcard.querySelector(".athlete-card-name").innerHTML = name;
        newcard.querySelector(".athlete-card-age").innerHTML = age;

        newcard.querySelector(".card").setAttribute("id", doc.id);
        // attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    })
    .catch((error) => {
      console.log("Error getting athletes: ", error);
    });
}

displayCards("athletes");

function diplayAthletes() {
  eventSelection = $("#event-selection").val();
  // console.log(eventSelection);
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function setup() {
  $("#get-event-selection").click(diplayAthletes);
}
$(document).ready(setup);
