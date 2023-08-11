const firebaseAdmin = require("./firebaseAdmin");

const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    req.firebaseApp = firebaseAdmin;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyTokenMiddleware;
