///////////////// signup.js : use for signup 

const express = require('express');
const router = express.Router();
const firebase = require('firebase');

// Initialize Firebase (if not already initialized)
if (!firebase.apps.length) {
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCp-H4LfkeBR_0J594h2tlALjAQgXU6dak",
        authDomain: "intelliswitcherdb.firebaseapp.com",
        databaseURL: "https://intelliswitcherdb-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "intelliswitcherdb",
        storageBucket: "intelliswitcherdb.appspot.com",
        messagingSenderId: "222127048372",
        appId: "1:222127048372:web:81b92cca4337087b26b9e1"
    };
firebase.initializeApp(firebaseConfig);

}

const auth = firebase.auth();

const route  =()=> {
// Google Sign-Up route
router.get('/google', (req, res) => {
const provider = new firebase.auth.GoogleAuthProvider();

auth.signInWithPopup(provider)
  .then((result) => {
    // Here, you can access user information from the 'result' object
    const user = result.user;
    console.log('Google Sign-Up Successful:', user.displayName);
    // You can also save user data to the Firebase Realtime Database here

    res.json({ message: 'Google Sign-Up Successful' });
  })
  .catch((error) => {
    console.error('Google Sign-Up Error:', error);
    res.status(500).json({ error: 'Google Sign-Up Error' });
  });

});
return router;
}
module.exports = route;