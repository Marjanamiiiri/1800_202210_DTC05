var currentUser;

function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //get doc associated with user
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        console.log("main.js: " + user_Name + ", " + user.uid);
        $("#name-goes-here").text(user_Name); //set text of html element to username
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
    userTeam = userDoc.data().team; // array of athlete ids
    userTeamName = userDoc.data().teamname; // string
    console.log("Team " + userTeamName + " contains " + userTeam);

    userTeam.forEach((athleteID) => {
      db.collection("athletes")
        .get(athleteID) //might need String(athlete)
        .then((athlete) => {
          document
            .getElementById("tbody")
            .append(`<tr><td>${athlete.name}</td><td>${athlete.sport}</td><td>${athlete.team}</td></tr>`);
        });
    });
  });
}
