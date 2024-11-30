const express = require('express');
const router = express.Router();
const Favorite = require('../models/FavoriteSchema'); // Import the Favorite model

// Add to favorites
router.post('/add', async (req, res) => {
  const { email, item } = req.body;

  if (!email || !item) {
    return res.status(400).json({ success: false, message: 'Email and item details are required' });
  }

  try {
    // Check if a favorite document exists for the user
    let favorite = await Favorite.findOne({ email });

    if (favorite) {
      // Check if the item is already in the favorites list
      const itemExists = favorite.items.some((favItem) => favItem.title === item.title);

      if (itemExists) {
        return res.status(400).json({ success: false, message: 'Item is already in favorites' });
      }

      // Add the item to the user's favorites
      favorite.items.push(item);
      await favorite.save();
    } else {
      // If no document exists, create a new one
      favorite = new Favorite({
        email,
        items: [item],
      });
      await favorite.save();
    }

    res.status(200).json({ success: true, message: 'Item added to favorites', data: favorite });
  } catch (error) {
    console.error('Error adding item to favorites:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
