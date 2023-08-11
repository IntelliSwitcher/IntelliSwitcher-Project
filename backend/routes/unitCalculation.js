//////////////////////////// unitCalculation.js  : calculate Watts,units,charge
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const math = require('mathjs');

// Read the original CSV data
const csvFilePath = path.join('./newcsv', 'data.csv');
const rawData = fs.readFileSync(csvFilePath, 'utf-8');
const rows = rawData.trim().split('\n').slice(1); // Exclude the header row

// Initialize variables for calculations
let totalConsumption = 0;
let totalUnits = 0;
let totalCharge = 0;
let startTime = null;

// Create a new CSV header for the calculated data
const calculatedCsvHeader = `'consumption (kW)','Units','Total Charge(Rs.)',timestamp\n`;

// Process each row and perform calculations
const calculatedRows = rows.map(row => {
  const [current, phase, voltage, timestamp] = row.split(',');

  const consumption = math.multiply(
    math.multiply(current, voltage, math.cos(math.unit(phase, 'deg'))),
    1 / 1000
  );

  if (!startTime) {
    startTime = moment(timestamp, 'YYYY-MM-DD HH:mm:ss');
  }
  
  const currentTime = moment(timestamp, 'YYYY-MM-DD HH:mm:ss');
  const timestampDiffHours = currentTime.diff(startTime, 'hours', true);
  
  totalConsumption += consumption;
  totalUnits = totalConsumption * (1 / 3600) * timestampDiffHours;

  // Calculate total charge based on consumption and predefined ranges
  let energyCharge = 0;
  let fixedCharge = 0;

  if (totalUnits <= 60) {
    energyCharge = totalUnits <= 30 ? 2.5 : 4.85;
    fixedCharge = totalUnits <= 30 ? 30 : 60;
  } else if (totalUnits <= 90) {
    energyCharge = 10.0;
    fixedCharge = 90.0;
  } else if (totalUnits <= 120) {
    energyCharge = 27.75;
    fixedCharge = 480.0;
  } else if (totalUnits <= 180) {
    energyCharge = 32.0;
    fixedCharge = 480.0;
  }

  totalCharge = energyCharge * totalUnits + fixedCharge;

  return `${consumption},${totalUnits},${totalCharge},${timestamp}`;
});

// Create the new CSV file with calculated data
const calculatedCsvFilePath = path.join('./newcsv', 'data_calculated.csv');
fs.writeFileSync(calculatedCsvFilePath, calculatedCsvHeader + calculatedRows.join('\n'));

console.log('Unit calculation completed and data_calculated.csv created.');
