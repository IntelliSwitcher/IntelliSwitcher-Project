/////////////// predict.js : executing tensorflow model-1

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Load your TensorFlow model
const modelPath = path.join(__dirname, 'path-to-your-model/model.json'); // Replace with your model path
let model;

(async () => {
  model = await tf.loadLayersModel(`file://${modelPath}`);
  console.log('Model loaded');
})();

// POST route for making predictions
app.post('/predict', async (req, res) => {
  try {
    const inputData = req.body.data; // Replace with your input data
    const inputTensor = tf.tensor(inputData);

    // Normalize the input data if needed
    const normalizedInput = inputTensor; // Modify as needed

    // Make a prediction using the loaded model
    const predictionTensor = model.predict(normalizedInput);
    const predictionData = predictionTensor.arraySync();

    res.json({ prediction: predictionData });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Prediction error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
