function displayCards(collection) {
  let cardTemplate = document.getElementById("eventCardTemplate");


  // this will be a little more complicated...
  db.collection(collection)
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
        // iterate thru each doc

        // set some variable to data from database document
        // var title = doc.data().name;

        // clone the template
        let newcard = cardTemplate.content.cloneNode(true);

        // update elements of the clone
        // newcard.querySelector(".card-title").innerHTML = title;

        
        // give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);

        // attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        
        // i++;
      });
    });
    // document.querySelector(".card").addEventListener("click", gotoEventsPage);
    // document.querySelector("button").onclick = function () {console.log("hey")};
}

// first figure out how to read the events from firestore
// displayCards("sports-events");

function gotoAthletesPage() {
  console.log("hey");
  window.location.href = "athletes.html";
}

function setup() {
  $("button").on("click", gotoAthletesPage);
}
$(document).ready(setup);
