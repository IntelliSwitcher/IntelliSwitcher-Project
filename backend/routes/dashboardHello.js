/////////////////////////////////// dashboard.js : getting the basic user info 
                                                // from firebase auth to frontend dashboard

const express = require('express');
const router = express.Router();
const firebase = require('./firebase'); // Adjust the path based on your file structure
const verifyTokenMiddleware = require('./verifyTokenMiddleware');

// Protected route that requires authentication
router.get('/', verifyTokenMiddleware, async (req, res) => {
  const user = req.user;

  // Example: Use the Firebase Admin app instance to retrieve user data
  try {
    const firebaseAdmin = require('firebase-admin'); // Requiring Firebase Admin SDK here for illustration
    const userRecord = await firebaseAdmin.auth().getUser(user.uid);

    // Additional logic, if needed
    // ...

    res.json({ message: `Welcome, ${userRecord.displayName}` });
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'An error occurred while retrieving user data' });
  }
});

module.exports = router;

