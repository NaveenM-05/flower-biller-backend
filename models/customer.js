// models/customer.js
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // No two customers can have the same name
    trim: true
  },
  
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;