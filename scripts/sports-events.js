// page URL should look something like:
// /sports-events.html?sport=alpine-skiing

function displayCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const currSport = urlParams.get("sport");
  $("#sport-heading").text(currSport.toUpperCase());

  ["Women's", "Men's", "Mixed"].forEach(gender => {
    db.collection("sports/" + currSport + `/${gender}`)
      .get()
      .then((snap) => {
        if (snap.size > 0) {
          $('#gender-container').append(`<h2>${gender}</h2>`);
          snap.forEach((eventSnap) => {
            currEvent = eventSnap.id;
            // console.log(currEvent)
            $('#gender-container').append(
              `<div class="event"><a href="./athletes.html?sport=${currSport}&gender=${gender}&event=${currEvent}">${currEvent}</a></div>`
            );
          });
        }
      });
  });

  // original way
  // doc.data()["Women's"].forEach(event => {
  //   $("#womens-events").append(`<div class="event"><a href="./athletes.html?sport=${currSport}&gender=Women%27s&event=${event}">${event}</a></div>`);
  // });
  // doc.data()["Men's"].forEach(event => {
  //   $("#mens-events").append(`<div class="event"><a href="./athletes.html?sport=${currSport}&gender=Men%27s&event=${event}">${event}</a></div>`);
  // });
}
displayCards();

function lowerCaseGender(g) {
  return g.replace("'", "").toLowerCase();
}
