// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This line loads the .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allow the server to accept JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Flower Biller API!');
});


app.use('/api/flowers', require('./routes/flowerRoutes'));

app.use('/api/customers', require('./routes/customerRoutes'));

app.use('/api/bills', require('./routes/billRoutes'));




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});