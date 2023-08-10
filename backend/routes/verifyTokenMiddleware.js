/////////////////////////////// verifyTokenMiddleware.js  : middleware to operate firebase-admin

const firebaseAdmin = require('firebase-admin');
const firebase = require('./firebase'); // Adjust the path to match your file structure

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    // Use the Firebase Admin app instance from the firebase.js module
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyTokenMiddleware;

