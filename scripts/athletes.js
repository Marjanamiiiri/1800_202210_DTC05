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
  // console.log(eventInfo);

  document.getElementById("title-gender").innerHTML = eventInfo.gender;
  document.getElementById("title-event").innerHTML = eventInfo.event;

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
    .then((eventDoc) => {
      var athletesInEvent = eventDoc.data().athletes;
      athletesInEvent.forEach((a) => {
        db.collection("athletes")
          .doc(a + "")
          .get()
          .then((athleteDoc) => {
            if (!athleteDoc.exists) {
              // console.log(a, "does not exist");
              return;
            }
            console.log(athleteDoc.data().sex);
            var name = athleteDoc.data().name;
            var country = athleteDoc.data().team.toUpperCase();
            var age = athleteDoc.data().age;
            var weight = athleteDoc.data().weight;
            var height = athleteDoc.data().height;
            var pic = "./images/athletes/women_outline.png";
            if (athleteDoc.data().sex == "M") {
              pic = "./images/athletes/men_outline.png";
            }

            // clone the template
            let newcard = athleteCardTemplate.content.cloneNode(true);
            // update elements of the clone
            newcard.querySelector(".athlete-card-image").src = pic;
            newcard.querySelector(".athlete-card-image").alt = name;
            newcard.querySelector(".athlete-card-name").innerHTML = name;
            newcard.querySelector(".athlete-card-country").innerHTML = country;
            newcard.querySelector(".athlete-card-bio-info").innerHTML = 
              age + "yrs " + height + "cm " + weight + "kg";
            newcard.querySelector(".athlete-card").setAttribute("id", athleteDoc.id);
            newcard.querySelector(".add-button").setAttribute("id", `add-${athleteDoc.id}`);
            newcard.querySelector("a").href =
              "./athlete-info.html?id=" + athleteDoc.id;
            newcard.querySelector("i").onclick = () =>
              addToTeam(currentUser, parseInt(athleteDoc.id));
            if (userTeam.includes(parseInt(athleteDoc.id))) {
              newcard.querySelector("i").innerHTML = "remove_circle_outline";
            }

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
    user = userDoc.data();
    console.log(user.name, user.team, athlete);
    if (user.team.includes(athlete)) {
      currentUser
        .set(
          {
            team: firebase.firestore.FieldValue.arrayRemove(athlete),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log(athlete + " has been removed for: " + user.name);
          document.getElementById(`add-${athlete}`).innerText = "person_add";
        });
    } else {
      currentUser
        .set(
          {
            team: firebase.firestore.FieldValue.arrayUnion(athlete),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log(athlete + " has been added for: " + user.name);
          document.getElementById(`add-${athlete}`).innerText = "remove_circle_outline";
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
