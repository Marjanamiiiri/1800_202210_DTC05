function read_display_Quote() {
    db.collection("quotes").doc("Tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(TuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + TuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = TuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()        //calling the function

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is loged in:
        if (user) {
            console.log(user.uid); //display user who just logged in
            currentUser = db.collection("users").doc(user.uid); //get doc associated with user
            currentUser.get().then(userDoc => {
               var user_Name = userDoc.data().name;
               console.log(user_Name);
               $("#name-goes-here").text(user_Name); //set text of html element to username
            })
        } else {
            // No user is signed in.
        }
    });
}
insertName();

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;
                var details = doc.data().details;
                var photo = doc.data().photo;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = photo;

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");