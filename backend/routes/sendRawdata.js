//  each record is sent as an array of 
// current,phase,voltage,timestamp
// to frontend

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Read the data.csv file
  const csvFilePath = path.join(__dirname, 'data.csv');
  const rawData = fs.readFileSync(csvFilePath, 'utf-8');
  const rows = rawData.trim().split('\n').slice(1);

  // Send each row to the connected client
  rows.forEach((row) => {
    ws.send(row);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8081, () => {
  console.log('WebSocket server for raw data is running on port 8081');
});
