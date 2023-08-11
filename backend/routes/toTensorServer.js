////////////////////////////////////// toTensorServer.js 
                                     // converting current csv files to required formats for tenser server
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const math = require('mathjs');

// Read the original CSV data
const dataCsvFilePath = path.join('./newcsv', 'data.csv');
const calculatedCsvFilePath = path.join('./newcsv', 'data_calculated.csv');

// Define CSV headers for the model CSV files
const model1CsvHeader = 'second_of_minute,minute_of_hour,hour_of_day,weekday,units_consumed,within_next_30_minutes\n';
const model2CsvHeader = 'second_of_minute,minute_of_hour,hour_of_day,weekday,units_consumed,within_next_1_minute\n';
const model3CsvHeader = 'second_of_minute,minute_of_hour,hour_of_day,weekday,units_consumed,phase,lagged_current5,lagged_voltage5,lagged_angle5,lagged_current10,lagged_voltage10,lagged_angle10,lagged_current20,lagged_voltage20,lagged_angle20,lagged_current40,lagged_voltage40,lagged_angle40,lagged_current60,lagged_voltage60,lagged_angle60,unit_consumed_within_next_30_minutes\n';

// Initialize variables to store model data
let model1Data = [];
let model2Data = [];
let model3Data = [];

// Load initial data from data.csv and data_calculated.csv
const rawData = fs.readFileSync(dataCsvFilePath, 'utf-8');
const calculatedRawData = fs.readFileSync(calculatedCsvFilePath, 'utf-8');
const dataRows = rawData.trim().split('\n').slice(1); // Exclude the header row
const calculatedRows = calculatedRawData.trim().split('\n').slice(1);

// Process each row and update model data
dataRows.forEach((dataRow, index) => {
  const calculatedRow = calculatedRows[index];

  const [current, phase, voltage, timestamp] = dataRow.split(',');
  const [consumption, units, totalCharge, _] = calculatedRow.split(',');

  // Process timestamp
  const momentTimestamp = moment(timestamp);
  const seconds = momentTimestamp.seconds();
  const minutes = momentTimestamp.minutes();
  const hours = momentTimestamp.hours();
  const weekday = momentTimestamp.weekday();
  
  // Calculate within_next_30_minutes and within_next_1_minute (dummy examples)
  const withinNext30Minutes = consumption > 0.001 ? 1 : 0;
  const withinNext1Minute = consumption > 0.0005 ? 1 : 0;

  // Example logic for model3Data
  const lagged_current5 = 0; // Placeholder value
  const lagged_voltage5 = 0; // Placeholder value
  const lagged_angle5 = 0;   // Placeholder value
  // ... (similarly calculate lagged_current10, lagged_voltage10, etc.)
  
  // Example logic for model3Data phase (angle)
  const angle = phase; // Assuming phase is already in degrees
  
  // Example logic for unit_consumed_within_next_30_minutes
  const unit_consumed_within_next_30_minutes = withinNext30Minutes;

  // Update model1Data, model2Data, and model3Data
  const model1Entry = `${seconds},${minutes},${hours},${weekday},${units},${withinNext30Minutes}`;
  model1Data.push(model1Entry);

  const model2Entry = `${seconds},${minutes},${hours},${weekday},${units},${withinNext1Minute}`;
  model2Data.push(model2Entry);

  const model3Entry = `${seconds},${minutes},${hours},${weekday},${units},${angle},${lagged_current5},${lagged_voltage5},${lagged_angle5},...${unit_consumed_within_next_30_minutes}`;
  model3Data.push(model3Entry);
});

// Write model data to respective CSV files
const model1CsvFilePath = path.join('./newcsv', 'model1.csv');
const model2CsvFilePath = path.join('./newcsv', 'model2.csv');
const model3CsvFilePath = path.join('./newcsv', 'model3.csv');

fs.writeFileSync(model1CsvFilePath, model1CsvHeader + model1Data.join('\n'));
fs.writeFileSync(model2CsvFilePath, model2CsvHeader + model2Data.join('\n'));
fs.writeFileSync(model3CsvFilePath, model3CsvHeader + model3Data.join('\n'));

console.log('Model CSV files updated.');
