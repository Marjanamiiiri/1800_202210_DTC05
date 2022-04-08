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
  $("#your-leagues").empty();
  $("#join-leagues").empty();
  user.get().then((userDoc) => {
    userLeagues = userDoc.data().leagues; // array of leagues (strings)
    db.collection("leagues")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          leagueName = doc.id;
          console.log(userLeagues);
          console.log(leagueName);
          if (userLeagues.includes(leagueName)) {
            // add to your-leagues
            document.getElementById(
              "your-leagues"
            ).innerHTML += `<li class="list-group-item">
            <a href="leagueteams.html?league=${leagueName}">${leagueName}</a>
          <button id="${leagueName}" type="button" class="btn-join btn-leave btn" onclick="joinLeague(currentUser,'${leagueName}')">LEAVE</button>
          </li>`;
          } else {
            // add to join-leagues
            document.getElementById(
              "join-leagues"
            ).innerHTML += `<li class="list-group-item">${leagueName}
          <button id="${leagueName}" type="button" class="btn-join btn" onclick="joinLeague(currentUser,'${leagueName}')">JOIN</button></li>`;
          }
        });
      });
  });
  // onclick="f()"
  // $(".btn-join").click(function () {
  //   joinLeague(user, this.id);
  //   console.log("add event");
  // });
}

function joinLeague(currentUser, league) {
  currentUser.get().then((userDoc) => {
    user = userDoc.data();
    if (user.leagues.includes(league)) {
      currentUser
        .set(
          {
            leagues: firebase.firestore.FieldValue.arrayRemove(league),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log(user.name + " has left league: " + league);
          // document.getElementById(`add-${athlete}`).innerText = "person_add";
          addUserToLeague(league, false);
          displayLeagues(currentUser);
        });
    } else {
      currentUser
        .set(
          {
            leagues: firebase.firestore.FieldValue.arrayUnion(league),
          },
          {
            merge: true,
          }
        )
        .then(function () {
          console.log(user.name + " has joined league: " + league);
          // document.getElementById(`add-${athlete}`).innerText = "remove_circle_outline";
          addUserToLeague(league, true);
          displayLeagues(currentUser);
        });
    }
  });
}

function addUserToLeague(league, join) {
  const currLeague = db.collection("leagues").doc(league);
  if (join) {
    //
    currLeague.set(
      {
        users: firebase.firestore.FieldValue.arrayUnion(currentUser.id),
      },
      {
        merge: true,
      }
    );
  } else {
    //
    currLeague.set(
      {
        users: firebase.firestore.FieldValue.arrayRemove(currentUser.id),
      },
      {
        merge: true,
      }
    );
  }
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

function createLeague() {
  const newLeagueName = document.getElementById("newLeagueName").value;
  db.collection("leagues")
    .doc(newLeagueName)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // console.log("exists");
        db.collection("leagues")
          .doc(newLeagueName)
          .set({
            users: [],
          })
          .then(() => {
            displayLeagues(currentUser);
          });
      }
    });
}
