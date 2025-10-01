// models/Flower.js
const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // Removes whitespace
  },
  defaultPricePerKg: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Flower = mongoose.model('Flower', flowerSchema);

module.exports = Flower;