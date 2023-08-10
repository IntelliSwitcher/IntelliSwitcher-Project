/////////////////////////////// verifyTokenMiddleware.js

const firebaseAdmin = require('firebase-admin');

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyTokenMiddleware;
