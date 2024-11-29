const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel'); 

// POST method to store user review
router.post('/userreview', async (req, res) => {
    // Destructure fields from the request body
    const { orderID, userEmail, items, feedbackMessage, rating } = req.body;

    // Validate that required fields are present
    if (!orderID || !userEmail || !feedbackMessage || !rating || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        // Create a new Review instance
        const newReview = new Review({
            orderID,
            userEmail,
            items,
            feedbackMessage,
            rating
        });

        // Save the review to the database
        await newReview.save();

        // Return success response
        res.status(201).json({ success: true, message: 'Review submitted successfully', data: newReview });
    } catch (error) {
        // Handle errors
        console.error('Error saving review:', error);
        res.status(500).json({ success: false, message: 'Failed to submit review', error: error.message });
    }
});

module.exports = router;
