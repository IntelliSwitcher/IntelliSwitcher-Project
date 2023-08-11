// login.js
const express = require('express');
const router = express.Router();
const firebase = require('./firebase');

const login = async (email, password) => {
  const auth = firebase.auth();
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log('User logged in:', userCredential.user.getIdToken());
  } catch (error) {
    console.error('Error during login:', error.message);
  }
};

// Route to handle user login
router.post('/', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  login(email, password)
    .then(() => {
      res.json({ message: 'Login successful',  });
    })
    .catch((error) => {
      res.status(500).json({ error: 'An error occurred during login' });
    });
});

module.exports = router;
