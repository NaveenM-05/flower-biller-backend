// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const Customer = require('../models/customer');

// Create a new bill (POST route is unchanged)
router.post('/', async (req, res) => {
  try {
    const { customerId, items} = req.body;
    const itemsWithSubtotals = items.map(item => ({ ...item, itemTotal: item.quantityKg * item.pricePerKg }));
    const itemsTotal = itemsWithSubtotals.reduce((sum, item) => sum + item.itemTotal, 0);
    const newBill = new Bill({
      customer: customerId,
      items: itemsWithSubtotals,
      balanceForwarded: 0,
      totalAmount: itemsTotal,
    
    });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a bill
router.put('/:id', async (req, res) => {
  try {
    const { items, balanceForwarded, customerId } = req.body;
    const billId = req.params.id;

    const originalBill = await Bill.findById(billId);
    if (!originalBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    const originalTotal = originalBill.totalAmount;

    const itemsWithSubtotals = items.map(item => ({ ...item, itemTotal: item.quantityKg * item.pricePerKg }));
    const newItemsTotal = itemsWithSubtotals.reduce((sum, item) => sum + item.itemTotal, 0);
    const newGrandTotal = newItemsTotal + (balanceForwarded || 0);

    const updatedBill = await Bill.findByIdAndUpdate(
      billId,
      { items: itemsWithSubtotals, balanceForwarded: balanceForwarded || 0, totalAmount: newGrandTotal },
      { new: true }
    );

    // Update the customer's lastBalanceForwarded
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId, 
      { lastBalanceForwarded: balanceForwarded || 0 },
      { new: true }
    );
    
    // Send back both updated documents
    res.json({ updatedBill, updatedCustomer });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;