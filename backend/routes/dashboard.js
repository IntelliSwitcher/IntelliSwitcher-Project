///////////////////////////// dashboard.js    
                           // retieve predicted data from tensorflow model and display on the dashboard 

const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('./verifyTokenMiddleware'); // Path to your verifyTokenMiddleware.js file
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Protected route that requires authentication
router.get('/', verifyTokenMiddleware, async (req, res) => {
    const user = req.user;

    // Path to the predicted data CSV file
    const filePath = path.join('./backend', '..', 'csv', `predict_${user.uid}.csv`);

    // Read the CSV file and parse its content
    const predictedData = [];
    fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
        predictedData.push(row);
    })
    .on('end', () => {
        // Render the dashboard with the predicted data
        res.render('dashboard', { user, predictedData });
    });
});

module.exports = router;
                           
