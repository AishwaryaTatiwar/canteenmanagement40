const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel'); // Assuming you have a Review model

// GET method to fetch reviews by user email
router.get('/userreviews/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    // Validate that the email is provided
    if (!userEmail) {
        return res.status(400).json({ success: false, message: 'User email is required.' });
    }

    try {
        // Find reviews by user email
        const userReviews = await Review.find({ userEmail });

        // If no reviews found, return a 404 response
        if (userReviews.length === 0) {
            return res.status(404).json({ success: false, message: 'No reviews found for this user.' });
        }

        // Return the fetched reviews
        res.status(200).json({ success: true, data: userReviews });
    } catch (error) {
        // Handle errors
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', error: error.message });
    }
});

module.exports = router;
