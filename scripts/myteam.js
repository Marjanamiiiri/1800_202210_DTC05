import * as firebase from 'firebase/app';
const db = firebase.firestore();

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

function displayTeam(user) {
  var userTeam;
  user.get().then((userDoc) => {
    //get user team info
    userTeam = userDoc.data().team; // array of athlete ids (numbers)
    userTeamName = userDoc.data().teamname; // string
    console.log("Team " + userTeamName + " contains " + userTeam);

    userTeam.forEach((athleteID) => {
      // console.log(typeof athleteID, athleteID);
      db.collection("athletes")
        .get(athleteID + "")
        .then((athlete) => {
          console.log(athlete.name);
          document
            .getElementById("table-body")
            .append(
              `<tr><td>${athlete.name}</td><td>${athlete.sport}</td><td>${athlete.team}</td></tr>`
            );
        });
    });
  });
}


const query = db.collectionGroup('athletes').d
              .where('users', '==', 'G5cr8D6qZIYJXO7ua1jBAS0IuYh2')