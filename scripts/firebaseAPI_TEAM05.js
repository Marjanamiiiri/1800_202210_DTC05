//----------------------------------------
//  Our web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyCgfawDvLWuxG4bZ_PgE4QgSlWQI3G0gEc",
    authDomain: "dtc05-91076.firebaseapp.com",
    projectId: "dtc05-91076",
    storageBucket: "dtc05-91076.appspot.com",
    messagingSenderId: "622261199413",
    appId: "1:622261199413:web:b58b3d07c40ccd2f02477c",
    measurementId: "G-R90JFS9VRN"
    };

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();