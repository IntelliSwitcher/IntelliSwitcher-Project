const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase configuration and initialization
// You need to replace the placeholders with your actual Firebase credentials
const firebase = require('firebase');
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN'
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};
firebase.initializeApp(firebaseConfig);


const database = firebase.database();

// Routes
const signupRoute = require('./signup');
const dashboardRoute = require('./dashboard');

app.use('/signup', signupRoute);
app.use('/dashboard', dashboardRoute);

// Start the server
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
