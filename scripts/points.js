// range 4 = [0, 1, 2, 3]
function giveRandomPoints(collection, range) {
  db.collection(collection)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        pointvalue = Math.floor(Math.random() * range);
        doc.ref.update({
          points: pointvalue,
        });
      });
    });
}

