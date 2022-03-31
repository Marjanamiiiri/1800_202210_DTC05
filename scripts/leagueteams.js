
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
            otherUserTeamName = userDoc.data().teamname;
            otherUserLeague = userDoc.data().league;
            otherUserAthletes = userDoc.data().team;
            // athleteCountry = athleteDoc.data().points;
            document.getElementById(
              "table-body-others"
            ).innerHTML += `<tr><td>${userTeamName}</td><td>${userLeague}</td><td><button>Join</button></td></tr>`;
          });
      });
    });
  }