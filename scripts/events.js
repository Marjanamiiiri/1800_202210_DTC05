// page URL should look something like:
// /events.html?sport=alpine-skiing

function displayCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const currSport = urlParams.get("sport");
  $("#sport-heading").text(currSport.replace(/-/g, ' ').toUpperCase());

  ["Women's", "Men's", "Mixed"].forEach((gender) => {
    db.collection("sports/" + currSport + `/${gender}`)
      .get()
      .then((snap) => {
        if (snap.size > 0) {
          $("#events").append(`<h2>${gender}</h2>`);
          snap.forEach((eventSnap) => {
            currEvent = eventSnap.id;
            console.log(currEvent)
            $("#events").append(
              `<div class="event">
                <a href="./athletes.html?sport=${currSport}&gender=${gender}&event=${currEvent}">${currEvent}</a>
              </div>`
            );
          });
        }
      });
  });
}
displayCards();

function lowerCaseGender(g) {
  return g.replace("'", "").toLowerCase();
}
