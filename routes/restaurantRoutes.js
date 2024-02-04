const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');



// Get restaurants by cuisine
router.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: req.params.cuisine });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get restaurants sorted by restaurant_id
router.get('/', async (req, res) => {
  const sort = req.query.sortBy === 'ASC' ? 1 : -1;
  try {
    const restaurants = await Restaurant.find().select('id cuisines name city restaurant_id').sort({ restaurant_id: sort });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get restaurants where cuisine is 'Delicatessen' and city is not 'Brooklyn'
router.get('/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ cuisine: 'Delicatessen', city: { $ne: 'Brooklyn' } }).select('cuisines name city').sort({ name: 1 });
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
