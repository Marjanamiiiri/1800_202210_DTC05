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

var currentUser;
function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      // console.log(user.uid); //display user who just logged in
      currentUser = db.collection("users").doc(user.uid); //get doc associated with user
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        // console.log(user_Name);
        $("#name-goes-here").text(user_Name); //set text of html element to username
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}
getCurrentUser();

function displayCards(collection) {
  // "athletes"
  eventInfo = getEventInfo();
  console.log(eventInfo);

  // console.log(currentUser.id);
  document.getElementById("athletes-title").innerHTML =
    "Competitors in " + eventInfo.gender + " " + eventInfo.event;

  //get user team info to update "added" status on athlete cards
  // var userTeam;
  // currentUser.get().then((userDoc) => {
  //   userTeam = userDoc.data().team; // array of athlete ids
  //   userTeamName = userDoc.data().teamname; // string
  //   console.log("Team " + userTeamName + " contains " + userTeam);
  // });

  let cardTemplate = document.getElementById("athleteCardTemplate");
  // var athletesRef = db.collection(collection);
  // use currEvent to query firestore and get all athletes for this event
  //  var query = athletesRef.where("events", "array-contains", sportEvent);

  fakeList = [60215, 38381, 15104, 10926];
  // get array of athletes contained in event, forEach get athlete doc and make card
  db.collection(collection)
    .where("age", "<", 30)
    // .where(admin.firestore.FieldPath.documentId(), "in", userTeam)
    // .where("genders", "==", eventInfo.gender)
    // .where("events", "==", eventInfo.event)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        console.log(doc.data().name);
        var name = doc.data().name;
        var age = doc.data().age;
        var pic = "./images/athletes/women_outline.png";
        if (doc.data().sex == "F") {
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

        // newcard.querySelector("i").onclick = () => addToTeam(doc.id);
        // if (userTeam.includes(doc.id)) {
        //   newcard.querySelector("i").innerHTML = "bookmark";
        // }
        // newcard.querySelector(".read-more").href =
        //   "athleteinfo.html?id=" + doc.id; // + "&event=" + getEventInfo.event;

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

function addToTeam(athlete) {
  currentUser.get().then((userDoc) => {
    //get the user name
    // console.log(userDoc.data().bookmarks);
    if (userDoc.data().bookmarks.includes(athlete)) {
      currentUser
        .set(
          {
            bookmarks: firebase.firestore.FieldValue.arrayRemove(athlete),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log("bookmark has been removed for: " + currentUser);
          var iconID = "save-" + athlete;
          //console.log(iconID);
          document.getElementById(iconID).innerText = "done";
        });
    } else {
      currentUser
        .set(
          {
            bookmarks: firebase.firestore.FieldValue.arrayUnion(athlete),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log("bookmark has been saved for: " + currentUser);
          var iconID = "save-" + athlete;
          //console.log(iconID);
          document.getElementById(iconID).innerText = "add";
        });
    }
  });
}

function setup() {
  $("#get-event-selection").click(diplayAthletes);
  // $(".add-to-team").click(addToTeam);
}
$(document).ready(setup);
