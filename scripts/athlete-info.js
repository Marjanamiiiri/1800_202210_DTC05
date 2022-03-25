function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        // console.log("athletes.js: " + user_Name + ", " + user.uid);
        // displayAthleteBio();
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}
getCurrentUser();

function displayAthleteBio() {
  const urlParams = new URLSearchParams(window.location.search);
  currentAthlete = urlParams.id;
  db.collection("athletes")
    .doc(currentAthlete)
    .get()
    .then(athleteDoc => { 
      console.log(athleteDoc.name)
      // use data in doc to populate a bio
    });
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
}
$(document).ready(setup);
