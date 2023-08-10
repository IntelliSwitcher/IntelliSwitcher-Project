const express = require('express');
const app = express();
const firebaseAdmin = require('firebase-admin');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: 'YOUR_DATABASE_URL'
});

// Require and use your routes
const dashboardRoute = require('./routes/dashboard');
app.use('/dashboard', dashboardRoute);

// Start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
