// models/bill.js
const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  items: [{
    name: { type: String, required: true },
    quality: { type: String },
    quantityKg: { type: Number, required: true },
    pricePerKg: { type: Number, required: true },
    itemTotal: { type: Number, required: true }
  }],
   balanceForwarded: { // ✅ ADD THIS
    type: Number,
    default: 0
  }
},{ timestamps: true });

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;