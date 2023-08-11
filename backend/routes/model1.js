const express = require('express');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const math = require('mathjs');

const app = express();

app.get('/generateModelInput', (req, res) => {
  try {
    const csvFilePath = path.join('./newcsv', 'data_calculated.csv');
    const rawData = fs.readFileSync(csvFilePath, 'utf-8');
    const rows = rawData.trim().split('\n').slice(1);

    const modelInputRows = [];

    rows.forEach((row) => {
      const [consumption, units, totalCharge, timestamp] = row.split(',');

      const dateTime = moment(timestamp);
      const secondOfMinute = dateTime.seconds();
      const minuteOfHour = dateTime.minutes();
      const hourOfDay = dateTime.hours();
      const weekday = dateTime.day() === 0 || dateTime.day() === 6 ? 1 : 0; // 1 for weekend, 0 for weekdays

      const unitsConsumed = parseFloat(units);
      const next30Minutes = moment(timestamp).add(30, 'minutes');
      const unitsWithinNext30Minutes = calculateUnitsWithinTimeRange(rows, timestamp, next30Minutes);

      modelInputRows.push(`${secondOfMinute},${minuteOfHour},${hourOfDay},${weekday},${unitsConsumed},${unitsWithinNext30Minutes}`);
    });

    const modelInputCsvFilePath = path.join(__dirname, 'modelinput_1.csv');
    fs.writeFileSync(modelInputCsvFilePath, 'second_of_minute,minute_of_hour,hour_of_day,weekday,units_consumed,within_next_30_minutes\n');
    fs.appendFileSync(modelInputCsvFilePath, modelInputRows.join('\n'));

    res.json({ message: 'modelinput_1.csv generated successfully' });
  } catch (error) {
    console.error('Error generating modelinput_1.csv:', error);
    res.status(500).json({ error: 'An error occurred while generating the file' });
  }
});

// Helper function to calculate units consumed within a given time range
function calculateUnitsWithinTimeRange(rows, startTime, endTime) {
  let totalUnits = 0;

  rows.forEach((row) => {
    const [consumption, units, totalCharge, timestamp] = row.split(',');
    const rowTime = moment(timestamp);

    if (rowTime >= startTime && rowTime <= endTime) {
      totalUnits += parseFloat(units);
    }
  });

  return totalUnits;
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
