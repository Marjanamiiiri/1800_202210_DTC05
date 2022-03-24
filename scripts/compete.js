//For the implementation of Groups, allowing input

function populateInfo() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if user is signed in:
      if (user) {

          //go to the correct user document by referencing to the user uid
          currentUser = db.collection("users").doc(user.uid)
          //get the document for current user.
          currentUser.get()
              .then(userDoc => {
                  //get the data field of the user for groups they registered in
                  var GroupNameInput = userDoc.data().GroupName;

                  //if the data fields are not empty, then write them in to the form.
                  if (GroupNameInput != null) {
                      document.getElementById("GroupNameInput").value = GroupNameInput;
                  }
              })
      } else {
          // No user is signed in.
          console.log("No user is signed in");
      }
  });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
  document.getElementById("personalInfoFields").disabled = false

}
editUserInfo();

function saveUserInfo() {
  userName = document.getElementById('GroupNameInput').value;

  currentUser.update({
          group: groupName,

      })
      .then(() => {
          console.log("Document successfully updated!");
      })

  //Enable the form fields
  document.getElementById('personalInfoFields').disabled = true;
}

  jQuery(document).ready(setup);