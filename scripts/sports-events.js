// page URL should look something like:
// /sports-events.html?sport=alpine-skiing

function displayCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const currSport = urlParams.get("sport");
  $("#sport-heading").text(currSport.toUpperCase());
  // use currSport to query firestore and get all events for this sport
  // to populate templates with
  db.collection("sports")
    .doc(currSport)
    .get()
    .then((doc) => {
      doc.data()["Women's"].forEach(event => {
        $("#womens-events").append(`<div class="event"><a href="./athletes.html?sport=${currSport}&gender=Women%27s&event=${event}">${event}</a></div>`);
      });
      doc.data()["Men's"].forEach(event => {
        $("#mens-events").append(`<div class="event"><a href="./athletes.html?sport=${currSport}&gender=Men%27s&event=${event}">${event}</a></div>`);
      });
    });
}

displayCards();
