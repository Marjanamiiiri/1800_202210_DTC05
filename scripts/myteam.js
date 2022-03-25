// need to add getUser function that calls displaycards

function displayCards(collection) {
    var userTeam;
    currentUser.get().then((userDoc) => {
      //get user team info
      userTeam = userDoc.data().team; // array of athlete ids
      userTeamName = userDoc.data().teamname; // string
      console.log("Team " + userTeamName + " contains " + userTeam);
    });
    // console.log(eventInfo);
    document.getElementById("athletes-title").innerHTML =
      "Competitors in " + eventInfo.gender + " " + eventInfo.event;
  
    let cardTemplate = document.getElementById("athleteCardTemplate");
    // var athletesRef = db.collection(collection);
    // use currEvent to query firestore and get all athletes for this event
    //  var query = athletesRef.where("events", "array-contains", sportEvent);
    db.collection(collection)
      .where(admin.firestore.FieldPath.documentId(), "in", userTeam)
      // .where("genders", "==", eventInfo.gender)
      // .where("events", "==", eventInfo.event)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          console.log(doc.data().name);
          var name = doc.data().name;
          var age = doc.data().age;
          var pic = "./images/athletes/women_outline.png";
          if (doc.data().sex == "M") {
            pic = "./images/athletes/men_outline.png";
          }
  
          // clone the template
          let newcard = cardTemplate.content.cloneNode(true);
  
          // update elements of the clone
          // newcard.querySelector("a").href = `./athlete-bio.html?id=${doc.id}`;
          newcard.querySelector(".card-image").src = pic;
          newcard.querySelector(".card-image").alt = name;
          newcard.querySelector(".athlete-card-name").innerHTML = name;
          newcard.querySelector(".athlete-card-age").innerHTML = age;
  
          newcard.querySelector(".card").setAttribute("id", doc.id);
  
          // change to <i> Materials Icon
          newcard.querySelector("i").onclick = () => addToTeam(doc.id);
          if (userTeam.includes(doc.id)) {
            newcard.querySelector("i").innerHTML = "bookmark";
          }
          newcard.querySelector(".read-more").href =
            "athleteinfo.html?id=" + doc.id; // + "&event=" + getEventInfo.event;
  
          // attach to gallery
          document.getElementById(collection + "-go-here").appendChild(newcard);
        });
      })
      .catch((error) => {
        console.log("Error getting athletes: ", error);
      });
  }
  displayCards("athletes");