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

function displayTeam(user) {
  var userTeam;
  user.get().then((userDoc) => {
    userTeam = userDoc.data().team; // array of athlete ids (numbers)
    userTeamName = userDoc.data().teamname; // string
    // console.log("Team " + userTeamName + " contains " + userTeam);

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
          athleteCountry = athleteDoc.data().team;
          // athleteCountry = athleteDoc.data().points;
          document.getElementById(
            "table-body"
          ).innerHTML += `<tr><td>${athleteName}</td><td>${athleteSport}</td><td>${athleteCountry}</td></tr>`;
        });
    });
  });
}
// displayTeam();
