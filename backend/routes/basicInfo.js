/////////////////// basicInfo.js  

// after sign up ; 
// 1. the user is asked to choose the Monitored premises(Home,Compnay,Indstrial factory, other)
// 2. then he is asked to choose how many people resides/works on avarage in weekdays
// 3. then he is asked to choose how many people resides/works on avarage in weekends
// 4.  then asks how many electrical aplliances of following catergories you have
//       i. continuous (router,survalance camera)
//      ii. standby (TV, Radio, Speaker, Laptop, PC)
//      iii. cold (Fridges, Freezers)
//      iv. active (kettles,heaters,hot-water shower, Lightnening-CFL,Lightnening_LED) 

// after getting these values we have to store these values in a csv file name of the csv file is  <username><timestamp>.csv"

const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require('./verifyTokenMiddleware'); // Path to your verifyTokenMiddleware.js file

router.post('/submit', verifyTokenMiddleware, async (req, res) => {
  const { premises, weekdaysPeople, weekendsPeople, applianceCounts } = req.body;
  
  const firebaseApp = req.firebaseApp; // Access the Firebase app instance from the middleware

  try {
    
    const user = await firebaseApp.auth().currentUser;

    // Generate a unique filename using username and timestamp
    const timestamp = moment().format('YYYY-MM-DD-HHmmss');
    const filename = `data_${user.uid}_${timestamp}.csv`;

    // CSV content
    const csvContent = `Monitored Premises,Weekdays People,Weekends People,Continues,Standby,Cold,Active\n`
      + `${premises},${weekdaysPeople},${weekendsPeople},${applianceCounts.continuous},${applianceCounts.standby},${applianceCounts.cold},${applianceCounts.active}`;

    // File path
    const filePath = path.join(__dirname, '..', 'csv', filename);

    // Write CSV content to file
    fs.writeFileSync(filePath, csvContent);

    return res.status(200).json({ message: 'Data submitted successfully' });
  } catch (error) {
    console.error('Error submitting data:', error);
    return res.status(500).json({ error: 'An error occurred while submitting data' });
  }
});

module.exports = router;
