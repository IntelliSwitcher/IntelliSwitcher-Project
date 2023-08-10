////////////////// login.js

const express = require('express');
const router = express.Router();
const firebase = require('firebase');

// Initialize Firebase (if not already initialized)
if (!firebase.apps.length) {
  const firebaseConfig = {
    // Your Firebase config here
  };
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// Google Login route
router.get('/google', (req, res) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      // Here, you can access user information from the 'result' object
      const user = result.user;
      console.log('Google Login Successful:', user.displayName);
      // You can also save user data to the Firebase Realtime Database here

      res.json({ message: 'Google Login Successful' });
    })
    .catch((error) => {
      console.error('Google Login Error:', error);
      res.status(500).json({ error: 'Google Login Error' });
    });
});

module.exports = router;
