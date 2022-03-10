function displayCards(collection) {
  let cardTemplate = document.getElementById("sportCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
        // iterate thru each doc

        // set some variable to data from database document
        var title = doc.data().name;
        var photo = "./images/sports/" + doc.data().image;

        // clone the template
        let newcard = cardTemplate.content.cloneNode(true);

        // update elements of the clone
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-image").src =
          "./images/sports/" + doc.id + ".svg";

        
        // give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);

        // attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        
        // i++;
      });
    });
    // document.querySelector(".card").addEventListener("click", gotoEventsPage);
    // document.querySelector(".card").onclick = function () {console.log("hey")};

    document.querySelector(".card-block").onclick = function () {console.log("hey")};
}

displayCards("sports");

function gotoEventsPage() {
  console.log("hey");
  // need to get sport! but for now..
  let sport = 'skiing';

  window.location.href = "sports-events.html?sport=" + sport;
}

function setup() {
//   $(".card-block").on("click", gotoEventsPage);
}
$(document).ready(setup);

// document.querySelector(".see-event").addEventListener("click", function () {
//   console.log("hey");
// });
