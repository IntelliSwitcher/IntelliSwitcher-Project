////////////////////////// dataLogger.js    // fethces data from realtimeDB  firebase
                                            // AND saves at "./backend/csv/data_<username>.csv"

    const fs = require('fs');
    const path = require('path');
    const moment = require('moment');
    const firebaseAdmin = require('firebase-admin');
    
    // Initialize Firebase Admin
    const serviceAccount = require('./backend/serviceAccountKey.json'); // service account JSON
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
      databaseURL: 'https://intelliswitcherdb-default-rtdb.asia-southeast1.firebasedatabase.app'
    });
    
    const db = firebaseAdmin.database();
    
    const csvFilePath = path.join('./backend/routes/newcsv', 'csv');
    
    // Create CSV header
    const csvHeader = 'current,phase,voltage,timestamp\n';
    
    // Write header to file
    try {
      fs.writeFileSync(path.join(csvFilePath, 'data.csv'), csvHeader, { flag: 'w' });
      console.log('CSV header written successfully');
    } catch (error) {
      console.error('Error writing CSV header:', error);
    }
    
//     // Listen for changes in the database
// db.ref('Sensor').on('child_changed', (snapshot) => {
//     try {
//       const data = snapshot.val();
      
//       if (data.Amp && data.Phase && data.Voltage) {
//         const current = data.Amp.map(value => value.toString()).join(','); // Convert to strings and join
//         const phase = data.Phase.map(value => value.toString()).join(','); // Convert to strings and join
//         const voltage = data.Voltage.map(value => value.toString()).join(','); // Convert to strings and join
  
//         const csvRow = `${current},${phase},${voltage},${moment().format('YYYY-MM-DD HH:mm:ss')}\n`;
//         fs.appendFileSync(path.join(csvFilePath, 'data.csv'), csvRow);
//         console.log('Data logged successfully:', csvRow);
//       } else {
//         console.log('Data arrays are missing or undefined. Skipping data logging.');
//       }
//     } catch (error) {
//       console.error('Error logging data:', error);
//     }
//   });

// /// Listen for changes in the database
// db.ref('Sensor').on('child_changed', (snapshot) => {
//     try {
//       const data = snapshot.val();
      
//       const current = data.Amp ? data.Amp.map(value => value.toString()).join(',') : 'null';
//       const phase = data.Phase ? data.Phase.map(value => value.toString()).join(',') : 'null';
//       const voltage = data.Voltage ? data.Voltage.map(value => value.toString()).join(',') : 'null';
  
//       const csvRow = `${current},${phase},${voltage},${moment().format('YYYY-MM-DD HH:mm:ss')}\n`;
//       fs.appendFileSync(path.join(csvFilePath, 'data.csv'), csvRow);
//       console.log('Data logged successfully:', csvRow);
//     } catch (error) {
//       console.error('Error logging data:', error);
//     }
//   });


// Listen for changes in the database
db.ref('Sensor').on('value', (snapshot) => {
  try {
    const data = snapshot.val();
    console.log(data);
    
    const current = data.Amp ? data.Amp.map(value => value.toString()) : ['null'];
    const phase = data.Phase ? data.Phase.map(value => value.toString()) : ['null'];
    const voltage = data.Voltage ? data.Voltage.map(value => value.toString()) : ['null'];

    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    
    for (let i = 0; i < Math.max(current.length, phase.length, voltage.length); i++) {
      const csvRow = `${getValue(current, i)},${getValue(phase, i)},${getValue(voltage, i)},${timestamp}\n`;
      fs.appendFileSync(path.join(csvFilePath, 'data.csv'), csvRow);
      console.log('Data logged successfully:', csvRow);
    }
  } catch (error) {
    console.error('Error logging data:', error);
  }
});

  
    console.log('Data logging started...');
    
    function getValue(array, index) {
      return index < array.length ? array[index] : 'null';
    }