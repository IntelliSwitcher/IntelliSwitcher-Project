/////////////////////////////////// dashboard.js

const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('./verifyTokenMiddleware');

// Protected route that requires authentication
router.get('/', verifyTokenMiddleware, (req, res) => {
  const user = req.user;
  res.json({ message: `Welcome, ${user.name}` });
});

module.exports = router;
