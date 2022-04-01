var currentUser;
function getCurrentUser() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is loged in:
    if (user) {
      currentUser = db.collection("users").doc(user.uid); //get doc associated with user
      currentUser.get().then((userDoc) => {
        const urlParams = new URLSearchParams(window.location.search);
        const league = urlParams.get("league");
        getUsers(league);
      });
    } else {
      console.log("No user is logged in.");
    }
  });
}
getCurrentUser();

function getUsers(league) {
  db.collection("leagues")
    .doc(league)
    .get()
    .then((doc) => {
      // list of users with team in current league
      const leagueUsers = doc.data().users;
      // TODO put current user FIRST
      

      leagueUsers.forEach((user) => {
        db.collection("users")
          .doc(user)
          .get()
          .then((userDoc) => {

            // in accordian header
            const teamName = userDoc.data().teamname;
            const userName = userDoc.data().name;
            let points = userDoc.data().points;
            // accordianButtonText = teamName + " - " + points + "pts";

            // populate table with above










            // in accordian body (table)
            // let points = 0;
            // const team = userDoc.data().team;
            // team.forEach((athleteID) => {
            //   athleteID = athleteID.toString();
            //   db.collection("athletes")
            //     .doc(athleteID.toString())
            //     .get()
            //     .then((athleteDoc) => {
            //       if (!athleteDoc.exists) {
            //         console.log(athleteID, "does not exist");
            //         return;
            //       }
            //       athleteName = athleteDoc.data().name;
            //       athleteSport = athleteDoc.data().sport;
            //       athleteCountry = athleteDoc.data().noc; 
            //       // athleteItem = athleteName + " " + athleteSport;
                  
            //       // document.getElementById("table-body").innerHTML += `<tr>
            //       //   <td>${athleteName}</td>
            //       //   <td>${athleteSport}</td>
            //       //   <td>${"#"}</td>
            //       //   </tr>`;


            //       // calculate total points based on athletes' points
            //       // athleteCountry = athleteDoc.data().points;
            //       // points += athleteDoc.data().points;
            //     });
            // });
          });
      });
    });
}
