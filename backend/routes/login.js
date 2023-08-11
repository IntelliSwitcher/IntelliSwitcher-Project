////////////////// login.js
const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');

// Google Login route
router.get('/google', (req, res) => {
  const provider = new firebaseAdmin.auth.GoogleAuthProvider();

  // Redirect the user to Google's sign-in page
  res.redirect(provider.buildUrl().toString());
});

module.exports = router;
