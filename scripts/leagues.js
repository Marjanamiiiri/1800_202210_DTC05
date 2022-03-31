const leagueList = document.querySelector('#league-creation-goes-here');
const form = document.querySelector('#add-league-form');

var currentUser;
function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      currentUser.get().then((userDoc) => {
        var user_Name = userDoc.data().name;
        console.log("leagues.js: " + user_Name + ", " + user.uid);
        displayLeagues(currentUser);
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}
getCurrentUser();

function displayLeagues(user) {
  var userTeam;
  user.get().then((userDoc) => {
    userLeagues = userDoc.data().leagues; // array of leagues (strings)
    db.collection("leagues").get().then((snap)=>{
      snap.forEach((doc)=>{
        leagueName = doc.id;
        if (userLeagues.includes(leagueName)){
          // add to your-leagues
          document.getElementById("your-leagues").innerHTML += `<li class="list-group-item">${leagueName}
          <button id="leave-${leagueName}" type="button" class="btn-leave btn">LEAVE</button>
          </li>`;
          $(`#leave-${leagueName}`).click(() => {
            joinLeague(user, parseInt(athleteID));
          });
        }else{
          // add to join-leagues
          document.getElementById("join-leagues").innerHTML += `<li class="list-group-item">${leagueName}
          <button id="join-${leagueName}" type="button" class="btn-join btn">JOIN</button></li>`;
          $(`#join-${leagueName}`).click(() => {
            joinLeague(user, parseInt(athleteID));
          });
        }
      });
    });
  });
}


function joinLeague(currentUser, athlete) {
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
          document.getElementById(`add-${athlete}`).innerText = "remove_circle_outline";
        });
    }
  });
}

// This is for the created leagues to be placed into the "Join Existing Leagues" for user selection afterwards.
// form.addEventListener('submit', (eventobject) => {
//     eventobject.preventDefault();
//     db.collection('leagues').add({
//       league: form.league.value,
//       teamName: form.teamName.value
//     });
//     form.league.value = '';
//     form.teamName.value = ''
// })


function setup() {
}

jQuery(document).ready(setup);

