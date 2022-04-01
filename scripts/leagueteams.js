
// This is to be moved over to the leagues.js
function leagueMoveURL() {  //Add sortkey into the parameter
  db.collection("leagues")
  .get()
  .then(allusers => {
      allusers.forEach(doc => {  // forEach goes through each doc
          var leagueName = doc.data().league; //gets the name of the key field
          let leagueExpand = leagueNameclickable***.content.cloneNode(true);
          leagueExpand.querySelector('.list-group-item').href = "leagues.html?leagueName="+leagueName;


// This is to grab other user's information and populate in the accordian
var otherUser;
function getOtherUser() {
  FirebaseDatabase.DefaultInstance
  .GetArray("leagues")
  .GetValueAsync().ContinueWithOnMainThread(task => {
    if (task.IsFaulted) {
      console.log("Other user's data does not exist")
    }
    else if (task.IsCompleted) {
      DataSnapshot = task.Result;
      if (Users) {
        otherUser = db.collection("users").doc(Users.uid).userDoc.data().league; //get doc associated with user
        otherUser.get().then((userDoc) => {
          var user_League = userDoc.data().league;
          console.log("main.js: " + user_League + ", " + user.uid);
          displayTeam(otherUser);
      // Do something with snapshot...
    }
  );
    };
  }
getOtherUser();




// var otherUser;
// function getOtherUser() {
//   firebase.auth().onAuthStateChanged((Users) => {
//     // Check if user is logged in:
//     if (Users) {
//       otherUser = db.collection("users").doc(Users.uid).userDoc.data().league; //get doc associated with user
//       otherUser.get().then((userDoc) => {
//         var user_League = userDoc.data().league;
//         console.log("main.js: " + user_League + ", " + user.uid);
//         displayTeam(otherUser);
//       });
//     } else {
//       console.log("Cannot grab other user's information");
//     }
//   });
// }
// getOtherUser();


// This is for other user's data to be populated
// function displayLeagueOthers(user) {
    var otherUserTeam;
    user.get().then((userDoc) => {
      otherUserTeam = userDoc.data().team; // array of athlete ids (numbers) of other users
      otherUserTeamName = userDoc.data().teamname; // string
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
            userTeamName = userDoc.data().teamname;
            userLeague = userDoc.data().league;
            userAthletes = userDoc.data().team;
            // athleteCountry = athleteDoc.data().points;

            // This is to grab the other user's team name and gives the accordian the other user's team name
            document.getElementById(
              "other-user-team"
            ).innerHTML += `${userTeamName}`;

            // This document populates the table within this accordian
            document.getElementById("table-body").innerHTML += `<tr>
            <td>${athleteName}</td>
            <td>${athleteSport}</td>
            <td>${"#"}</td>
            <td><i class="material-icons add-button" id="add-${athleteID}">remove_circle_outline</i></td>
            </tr>`;
          });
      });
    });
  }