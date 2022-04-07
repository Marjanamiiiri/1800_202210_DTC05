function displayAthleteBio() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentAthlete = urlParams.get("id");
  console.log(currentAthlete);
  db.collection("athletes")
    .doc(currentAthlete)
    .get()
    .then((athleteDoc) => {
      athlete = athleteDoc.data();
      console.log(athlete.name);
      // use data in doc to populate a bio

      if (athlete.sex == "M") {
        $("#athlete-image").attr("src", "./images/athletes/men_outline.png");
      }else{
        $("#athlete-image").attr("src", "./images/athletes/women_outline.png");
      }

      $("#athlete-name").text(athlete.name);
      $("#athlete-sport").text(athlete.sport);
      $("#athlete-country").text(athlete.team);
      $("#athlete-age").text(athlete.age + " years");
      $("#athlete-height").text(athlete.height + " cm");
      $("#athlete-weight").text(athlete.weight + " kg");

    });
}
displayAthleteBio();
