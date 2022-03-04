// greets user by their given name

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
            console.log("No user is logged in.")
        }
    });
}
insertName();
