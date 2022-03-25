var currentUser;

function getCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
        // Check if user is loged in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid); //get doc associated with user
            currentUser.get().then((userDoc) => {
            var user_Name = userDoc.data().name;
            console.log("main.js: " + user_Name + ", " + user.uid);
            $("#name-goes-here").text(user_Name); //set text of html element to username
            localStorage.setItem("user", currentUser);
            });
        } else {
            console.log("No user is logged in.");
        }
    });
}
getCurrentUser();

// export {currentUser, getCurrentUser};