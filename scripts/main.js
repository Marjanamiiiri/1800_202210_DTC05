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
function insertName(){
    firebase.auth().onAuthStateChanged(user =>{
        if (user){
            console.log(user.uid); // let me know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will go to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_Name= userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery way
                // document.getElementById("name-goes-here").innerText=user_Name;
            })
        }
    })
    }
insertName();