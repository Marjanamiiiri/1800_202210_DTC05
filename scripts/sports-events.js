// page URL should look something like:
// /sports-events.html?sport=alpine-skiing

function displayCards() {
  let cardTemplate = document.getElementById("eventCardTemplate");
  const urlParams = new URLSearchParams(window.location.search);
  const currSport = urlParams.get("sport");
  // use currSport to query firestore and get all events for this sport
  // to populate templates with
  db.collection("sports")
    .doc(currSport)
    .get()
    .then((doc) => {
      console.log("Men's");
      console.log(doc.data()["Men's"]);
      console.log("Women's");
      console.log(doc.data()["Women's"]);
    });

  // db.collection(collection)
  //   .get()
  //   .then((snap) => {
  //     var i = 1;
  //     snap.forEach((doc) => {
  //       // iterate thru each doc

  //       // set some variable to data from database document
  //       // var title = doc.data().name;

  //       // clone the template
  //       let newcard = cardTemplate.content.cloneNode(true);

  //       // update elements of the clone
  //       // newcard.querySelector(".card-title").innerHTML = title;

  //       // give unique ids to all elements for future use
  //       // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);

  //       // attach to gallery
  //       document.getElementById(collection + "-go-here").appendChild(newcard);

  //       // i++;
  //     });
  // });
  // document.querySelector(".card").addEventListener("click", gotoEventsPage);
  // document.querySelector("button").onclick = function () {console.log("hey")};
}

// first figure out how to read the events from firestore
displayCards();
