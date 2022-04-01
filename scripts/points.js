// range 4 = [0, 1, 2, 3]
function giveRandomPoints(collection, range){
    db.collection(collection).get().then(snap=>{
        snap.forEach(doc => {
            pointvalue = Math.floor(Math.random() * range);
            // console.log(doc.data().name, pointvalue);
            // doc.points =pointvalue;
            doc.ref
              .update({
                points: pointvalue
              })
        });
    });
}