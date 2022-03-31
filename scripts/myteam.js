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

    userTeam.forEach((athletesID) => {
      // console.log(typeof athleteID, athleteID);
      db.collection("athletes")
        .get(athletesID + "")
        .then((athletes) => {
          console.log(athletes.name);
          document
            .getElementById("table-body")
            .append(
              `<tr><td>${athletes.name}</td><td>${athletes.sport}</td><td>${athletes.team}</td></tr>`
            );
        });
    });
  });
}
displayTeam();


// This function is used to populate the information into the table
function populateAthleteInfo() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {

          //go to the correct athletes document by referencing to the athletes id
          currentUser = db.collection("athletes").doc(athletesID)
          //get the document for current user.
          currentUser.get()
              .then(athletesDoc => {
                  //get the data fields of the athletes
                  var athleteName = athletesDoc.data().name;
                  var athleteSport = athletesDoc.data().sport;
                  // This is commented out because points do not exist at the moment
                  // var athletePoints = athletesDoc.data().points;

                  //if the data fields are not empty, then write them in to the form.
                  if (athleteName != null) {
                      document.getElementById("athleteName").value = athleteName;
                  }
                  if (athleteSport != null) {
                      document.getElementById("athleteSport").value = athleteSport;
                  }
                  // This is commented out because points do no exist at the moment
                  // if (athletePoints != null) {
                  //     document.getElementById("athletePoints").value = athletePoints;
                  // }
              })
      } else {
          // No user is signed in.
          console.log ("No user is signed in");
      }
  });
}

//call the function to run it 
populateAthleteInfo();


function populateAthleteDynamically(){
  let athleteTableTemplate = document.getElementById("athleteCardTemplate");
  let tablebody = document.getElementById("table-body");

  db.collection("athletes").get()
    .then(allathletes => {
    allathletes.forEach(doc => {
      var athletesName = doc.data().name;  // gets the name of the athlete
      var athletesSport = doc.data().sport;  // gets the sport name of the athlete
      var athletesPoints = doc.data().points;  // gets the points from that one athlete
      let fillAthleteTable = athleteTableTemplate.content.cloneNode(true);
      testAthlete.querySelector('athlete-card-name').innerHTML = athletesName;
      testAthlete.querySelector('athlete-card-sport').innerHTML = athletesSport;
      testAthlete.querySelector('athlete-card-points').innerHTML = athletesPoints;
      tablebody.appendChild(fillAthleteTable);
    })
})
}

populateAthleteDynamically();



