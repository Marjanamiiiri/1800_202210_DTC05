// var currentUser = localStorage.getItem("user");
// console.log("current user is " + currentUser);

// page url should look something like:
// athletes.html?sport=Skating&gender=Women%27s&sportevent=1,000m
function getEventInfo() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    sport: urlParams.get("sport"),
    sporttitle: toTitleCase(urlParams.get("sport").replace("-", " ")),
    gender: urlParams.get("gender"),
    event: urlParams.get("event"),
  };
}

var currentUser;
function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //get doc associated with user
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        // console.log("athletes.js: " + user_Name + ", " + user.uid);
        displayCards("athletes");
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

  document.getElementById("athletes-title").innerHTML =
    "Competitors in " + eventInfo.gender + " " + eventInfo.event;

  //get user team info to update "added" status on athlete cards
  var userTeam;
  currentUser.get().then((userDoc) => {
    userTeam = userDoc.data().team; // array of athlete ids
    userTeamName = userDoc.data().teamname; // string
    // console.log("Team " + userTeamName + " contains " + userTeam);
  });

  db.collection(`sports/${eventInfo.sport}/${eventInfo.gender}`)
    .doc(eventInfo.event)
    .get()
    .then( eventDoc => {
      console.log(eventDoc.exists);
      var athletesInEvent = eventDoc.data().athletes;
      
      athletesInEvent.forEach((a) => {
        // console.log(a);
        db.collection("athletes")
          .doc(a + "")
          .get()
          .then((athleteDoc) => {
            if (!athleteDoc.exists) {
              console.log(a, "does not exist");
              return;
            }
            // console.log(athleteDoc);
            var name = athleteDoc.data().name;
            var age = athleteDoc.data().age;
            var pic = "./images/athletes/women_outline.png";
            if (athleteDoc.data().sex == "M") {
              pic = "./images/athletes/men_outline.png";
            }

            // clone the template
            let newcard = athleteCardTemplate.content.cloneNode(true);
            // update elements of the clone
            newcard.querySelector(".card-image").src = pic;
            newcard.querySelector(".card-image").alt = name;
            newcard.querySelector(".athlete-card-name").innerHTML = name;
            newcard.querySelector(".athlete-card-age").innerHTML = age;
            newcard.querySelector(".card").setAttribute("id", athleteDoc.id);

            newcard.querySelector("a").href =
              "./athlete-info.html?id=" + athleteDoc.id;
            newcard.querySelector("i").onclick = () =>
              addToTeam(currentUser, athleteDoc.id);
            // if (userTeam.includes(athleteDoc.id)) {
            //   newcard.querySelector("i").innerHTML = "bookmark";
            // }

            document
              .getElementById(collection + "-go-here")
              .appendChild(newcard);
          });
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

function addToTeam(currentUser, athlete) {
  currentUser.get().then((userDoc) => {
    user = user.data();
    console.log(user.name, user.bookmarks);
    if (user.data().bookmarks.includes(athlete)) {
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
          document.getElementById(iconID).innerText = "person_add";
        });
    }
  });
}

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
  // $(".add-to-team").click(addToTeam);
}
$(document).ready(setup);
