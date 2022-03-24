// page URL should look something like:
// /sports-events.html?sport=alpine-skiing

function displayCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const currSport = urlParams.get("sport");
  $("#sport-heading").text(currSport.toUpperCase());

  // for (gender of ["Women's", "Men's", "Mixed"]) {}
  // let lowercaseGender = gender.replace("'", "").toLowerCase();
  // console.log(lowercaseGender);
  // $(`${lowercaseGender}-events`).append(`<h2>${gender}</h2>`);
  let gender = "Women's";
  db.collection("sports/" + currSport + `/${gender}`)
    .get()
    .then((snap) => {
      $(`#${lowerCaseGender(gender)}-events`).append(`<h2>${gender}</h2>`);
      snap.forEach((eventSnap) => {
        currEvent = eventSnap.id;
        $(`#${lowerCaseGender(gender)}-events`).append(
          `<div class="event"><a href="./athletes.html?sport=${currSport}&gender=${gender}&event=${currEvent}">${currEvent}</a></div>`
        );
      });
    });
  // gender = "Men's";
  // db.collection("sports/" + currSport + `/${gender}`)
  //   .get()
  //   .then((snap) => {
  //     $(`#${lowerCaseGender(gender)}-events`).append(`<h2>${gender}</h2>`);
  //     snap.forEach((eventSnap) => {
  //       currEvent = eventSnap.id;
  //       $(`#${lowerCaseGender(gender)}-events`).append(
  //         `<div class="event"><a href="./athletes.html?sport=${currSport}&gender=${gender}&event=${currEvent}">${currEvent}</a></div>`
  //       );
  //     });
  //   });
  // gender = "Mixed";
  // db.collection("sports/" + currSport + `/${gender}`)
  //   .get()
  //   .then((snap) => {
  //     $(`#${lowerCaseGender(gender)}-events`).append(`<h2>${gender}</h2>`);
  //     snap.forEach((eventSnap) => {
  //       currEvent = eventSnap.id;
  //       $(`#${lowerCaseGender(gender)}-events`).append(
  //         `<div class="event"><a href="./athletes.html?sport=${currSport}&gender=${gender}&event=${currEvent}">${currEvent}</a></div>`
  //       );
  //     });
  //   });

  // .get()
  // .then((sportSnap) => {
  //   console.log(sportSnap);
  //   sportSnap.forEach((sportDoc) => {
  //     console.log(sportDoc.data());
  //     sportDoc.listCollections().then((querySnapshot) => {
  //       querySnapshot.forEach((collection) => {
  //         console.log("collection: " + collection.id);
  //       });
  //     });
  //     // console.log(doc.data().athletes);
  //   });
  // });

  // .doc(currSport)
  // .listCollections()
  // .then((subCollections) => {
  //   subCollections.forEach((subCollection) => {
  //     subCollection.get().then((athletes) => {
  //       console.log(athletes);
  //     });
  //   });
  // });

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
