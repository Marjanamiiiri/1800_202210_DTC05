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
        var userGroup = userDoc.data().group;
        var userTeam = userDoc.data().team;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (userGroup != null) {
          document.getElementById("groupInput").value = userGroup;
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


function editUserInfo() {
  document.getElementById("personalInfoFields").disabled = false

}
editUserInfo();


//To save the data that the user has input and add it to the firebase
function saveUserInfo() {
  userName = document.getElementById("nameInput").value;  //takes the value that was given in nameInput
  userTeam = document.getElementById("groupInput").value;  //takes the value that was given in groupInput
  userTeam = document.getElementById("teamInput").value;  //takes the value that was given in teamInput

  currentUser.update({
      name: userName,
      group: userGroup,
      team: userTeam,
    })
    .then(() => {
      console.log("Team successfully added!");
    });

  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = true;
}

//call the function to run it
saveUserInfo();


function writeGroups() {
  //define a variable for the collection you want to create in Firestore to populate data
  var groupRef = db.collection("Groups");

  groupRef.add({
      name: "First Last",
      group_name: "Friends", //replace with your own city?
      team_name: "The Winner",
  });

}


//Grabs groups that were made by users and add them into cards
function populateCardsDynamically() {  //Add sortkey into the parameter?
  let groupsCardTemplate = document.getElementById("groupsCardTemplate");
  let groupsCardGroup = document.getElementById("groupsCardGroup");
  
  db.collection("Groups")
  .orderBy("Group Name", "Team Name")      //NEW LINE;  what do you want to sort by?
  .limit(8)                 //NEW LINE:  how many do you want to get? ** Allows you to limit the amount of the collection **
  .get()
  .then(allGroup => {
      allGroup.forEach(doc => {  // forEach goes through each doc
          var userName = doc.data().name; //gets the name field
          var userGroup = doc.data().id; //gets the group field
          var userTeam = doc.data().length; //gets the team field
          let testGroupCard = groupsCardTemplate.content.cloneNode(true);
          testGroupCard.querySelector('.card-title').innerHTML = userName;

          //NEW LINE: update to display Name, Group, Team
          testGroupCard.querySelector('.card-length').innerHTML = 
          "Name: " + doc.data().userName + "<br>" +
          "Group Name: " + doc.data().userGroup + "<br>" +
          "Team Name: " + doc.data().userTeam + "<br>"

          testGroupCard.querySelector('a').onclick = () => setGroupData(userGroup);

          //which group to bookmark based on which group was clicked
          testGroupCard.querySelector('i').id = 'save-' + userGroup;
          // this line will call a function to save the groups to the user's document             
          testGroupCard.querySelector('i').onclick = () => saveBookmark(userGroup);
          testGroupCard.querySelector('.read-more').href = "eachGroup.html?groupName="+userName +"&id=" + userGroup;

          testGroupCard.querySelector('img').src = `./${userGroup}.jpg`;
          groupsCardGroup.appendChild(testGroupCard);
          })

      })
}


function saveBookmark(userGroup) {
  currentUser.set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(userGroup)
      }, {
          merge: true
      })
      .then(function () {
          console.log("bookmark has been saved for: " + currentUser);
          var iconID = 'save-' + userGroup;
          //console.log(iconID);
          document.getElementById(iconID).innerText = 'bookmark';
      });
}



jQuery(document).ready(setup);

