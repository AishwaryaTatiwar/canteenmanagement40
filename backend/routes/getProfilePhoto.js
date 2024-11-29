const express = require('express');
const ProfilePhoto = require('../models/profilePhotoModel');
const router = express.Router();

// Get profile photo by email
router.get('/getProfilePhoto/:email', async (req, res) => {
    const { email } = req.params;

    try {
        // Fetch the profile photo document by email
        const userPhoto = await ProfilePhoto.findOne({ email });

        if (!userPhoto) {
            return res.status(404).json({ message: 'Profile photo not found.' });
        }

        // Set the Content-Type to the stored MIME type (e.g., 'image/jpeg')
        res.set('Content-Type', userPhoto.contentType);

        // Send the profile photo's binary data
        res.send(userPhoto.profilePhoto);
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
