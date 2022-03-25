//For the implementation of Groups, allowing input

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data field of the user for groups they registered in
        var userName = userDoc.data().name;
        var userTeam = userDoc.data().team;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userTeam != null) {
          document.getElementById("teamInput").value = userTeam;
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateInfo();

//To save the data that the user has input and add it to the firebase
function saveUserInfo() {
  userName = document.getElementById("nameInput").value;  //takes the value that was given in nameInput
  userTeam = document.getElementById("teamInput").value;  //takes the value that was given in teamInput

  currentUser.update({
      name: userName,
      team: userteam,
    })
    .then(() => {
      console.log("Team successfully added!");
    });

  //Enable the form fields
  document.getElementById("teamlInfoFields").disabled = true;
}

//call the function to run it
saveUserInfo();

jQuery(document).ready(setup);
