/////////////////////////////// verifyTokenMiddleware.js  : middleware to operate firebase-admin

const firebaseAdmin = require('firebase-admin');
const firebase = require('./firebase'); 

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  try {
    // Use the Firebase Admin app instance from the firebase.js module
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyTokenMiddleware;

