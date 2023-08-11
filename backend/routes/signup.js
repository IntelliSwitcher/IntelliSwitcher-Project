///////////////////// signup.js

const express = require('express');
const router = express.Router();
const firebase = require('./firebase');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Use the firebase app instance for authentication
  const auth = firebase.auth();

  try {
    // Create a new user using email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);


    return res.status(200).json({ message: 'Signup successful', user: userCredential.user });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ error: 'An error occurred during signup' });
  }
});

module.exports = router;
