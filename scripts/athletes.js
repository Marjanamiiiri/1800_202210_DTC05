function displayAthleteCards(collection) {
  let cardTemplate = document.getElementById("athleteCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      var i = 1;
      snap.forEach((doc) => {
        //iterate thru each doc

        // set some variable to data from database document
        var name = doc.data().name;
        var age = doc.data().age;

        // clone the template
        let newcard = cardTemplate.content.cloneNode(true);

        //update elements of the clone
        newcard.querySelector(".athlete-card-name").innerHTML = name;
        newcard.querySelector(".thlete-card-age").innerHTML = age;

        // attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        i++;
      });
    });
}

// displayAthleteCard("athletes");
function diplayAthletes(){
    eventSelection = $('#event-selection').val();
    console.log(eventSelection);
}


function setup() {
  $("#get-event-selection").click(diplayAthletes);
}
$(document).ready(setup);
