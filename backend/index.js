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
  databaseURL: 'https://console.firebase.google.com/project/intelliswitcherdb/database/intelliswitcherdb-default-rtdb/data/~2F'
});

// Require and use your routes
const dashboardRoute = require('./routes/dashboard');
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");


// use the routes
app.use('/dashboard', dashboardRoute);
app.use('/signup',signupRoute);
app.use('/login',loginRoute);

// Start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
