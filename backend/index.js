//////////////////////////// index.js
// main js file contains all the routes

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const firebase = require("./routes/firebase");
const firebaseAdmin = require("./routes/firebaseAdmin");
const verifyTokenMiddleware = require("./routes/verifyTokenMiddleware");

// Middleware
app.use(bodyParser.json());

// Use the Firebase Admin app instance in your routes
const dashboardHelloRoute = require("./routes/dashboardHello");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const basicInfoRoute = require("./routes/basicInfo");
// const predictRoute = require('./routes/predict');

// Use the routes
app.use("/dashboardHello", verifyTokenMiddleware, dashboardHelloRoute);
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/basicInfo", basicInfoRoute);
// app.use('predict',predictRoute);

// Start the server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
