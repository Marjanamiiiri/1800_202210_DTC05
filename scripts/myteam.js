// import * as firebase from 'firebase/app';
// const db = firebase.firestore();

var currentUser;
function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //get doc associated with user
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        console.log("main.js: " + user_Name + ", " + user.uid);
        displayTeam(currentUser);
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}
getCurrentUser();

var pointTotal = 0;
function displayTeam(user) {
  var userTeam;

  user
    .get()
    .then((userDoc) => {
      userTeam = userDoc.data().team; // array of athlete ids (numbers)
      userTeamName = userDoc.data().teamname; // string
      $("#teamname").text(userTeamName);

      userTeam.forEach((athleteID) => {
        athleteID = athleteID.toString();
        db.collection("athletes")
          .doc(athleteID.toString())
          .get()
          .then((athleteDoc) => {
            if (!athleteDoc.exists) {
              console.log(athleteID, "does not exist");
              return;
            }
            athleteName = athleteDoc.data().name;
            athleteSport = athleteDoc.data().sport;
            athleteCountry = athleteDoc.data().noc; // <td>${athleteCountry}</td>
            athletePoints = athleteDoc.data().points;
            pointTotal += athletePoints;
            document.getElementById("table-body").innerHTML += `<tr>
            <td>${athleteName}</td>
            <td>${athleteSport}</td>
            <td>${athletePoints}</td>
            <td><i class="material-icons add-button" id="${athleteID} onclick="addToTeam(currentUser, ${athleteID})">remove_circle_outline</i></td>
            </tr>`;
            userDoc.ref.update({
              points: pointTotal,
            });
            $("#totalpoints").text(pointTotal);
          });
      });
    })
    .then(() => {
      $(".add-button").click(() => {
        console.log("func");
        addToTeam(user, parseInt(this.id));
      });
    });
}
// displayTeam();
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
          document.getElementById(`add-${athlete}`).innerText =
            "remove_circle_outline";
        });
    }
  });
}
