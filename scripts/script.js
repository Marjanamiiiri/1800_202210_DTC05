function sayHello() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      console.log(user.uid);
      db.collection("users")
        .doc(user.uid)
        .get()
        .then(function (doc) {
          var n = doc.data().name;
          console.log(n);
          //$("#username").text(n);
          document.getElementById("username").innerText = n;
        });
    } else {
      // No user is signed in.
    }
  });
}
//sayHello();


// This is for the compete page, for the group creation
$(document).ready(function () {
  $("#see-me").click(function () {
    $("#show-me-two:hidden").show("slow");
    $("#show-me").hide();
    $("#show-me-three").hide();
  });
  $("#see-me").click(function () {
    if ($("see-me-two").prop("checked") === false) {
      $("#show-me-two").hide();
    }
  });

  $("#look-me").click(function () {
    $("#show-me-three:hidden").show("slow");
    $("#show-me").hide();
    $("#show-me-two").hide();
  });
  $("#look-me").click(function () {
    if ($("see-me-three").prop("checked") === false) {
      $("#show-me-three").hide();
    }
  });
});
