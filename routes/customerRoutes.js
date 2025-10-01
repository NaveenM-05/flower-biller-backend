// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// @route   POST /api/customers
// @desc    Add a new customer
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    // Check if customer already exists
    let customer = await Customer.findOne({ name });
    if (customer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }
    const newCustomer = new Customer({ name });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/customers
// @desc    Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Note: In a real app, you'd check if the customer has an outstanding balance before deleting.
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;