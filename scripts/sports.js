function displayCards(collection) {
  let sportCardTemplate = document.getElementById("sportCardTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        // iterate thru each doc
        // set some variable to data from database document
        var title = doc.data().name;
        var photo = "./images/sports/" + doc.id + ".svg";

        // clone the template
        let newcard = sportCardTemplate.content.cloneNode(true);

        // update elements of the clone
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-img-top").src = photo;
        newcard.querySelector(".card-block").href =
          "events.html?sport=" + doc.id;

        // attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
      });
    });
}
displayCards("sports");
