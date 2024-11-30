const express = require('express');
const router = express.Router();
const Favorites = require('../models/FavoriteSchema'); // Replace with your actual model path

// GET route to fetch favorite items for a specific user by email
router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const favorites = await Favorites.find({ email });
        res.json({ success: true, data: favorites });
        // console.log("success");
    } catch (error) {
        console.log("error in favorites");
        console.error('Error fetching favorites:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch favorites' });
    }
});

module.exports = router;
