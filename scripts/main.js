function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will go to the firestore and go to the document of the user
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name); //jquery way
                // document.getElementById("name-goes-here").innerText=user_Name;
            })
        }
    })
}

insertName();
