// routes/flowerRoutes.js
const express = require('express');
const router = express.Router();
const Flower = require('../models/flower');

// @route   POST /api/flowers
// @desc    Add a new flower
router.post('/', async (req, res) => {
  try {
    const { name, defaultPricePerKg } = req.body;
    const newFlower = new Flower({ name, defaultPricePerKg });
    await newFlower.save();
    res.status(201).json(newFlower);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/flowers
// @desc    Get all flowers
router.get('/', async (req, res) => {
  try {
    const flowers = await Flower.find().sort({ name: 1 }); // Sort by name
    res.json(flowers);
  } catch (err) {
    console.error(err.message); 
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, defaultPricePerKg } = req.body;
    const updatedFlower = await Flower.findByIdAndUpdate(
      req.params.id,
      { name, defaultPricePerKg },
      { new: true }
    );
    res.json(updatedFlower);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/flowers/:id
// @desc    Delete a flower
router.delete('/:id', async (req, res) => {
  try {
    await Flower.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flower removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;