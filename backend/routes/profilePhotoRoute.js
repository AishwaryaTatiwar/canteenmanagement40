const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken'); // For token verification
const ProfilePhoto = require('../models/profilePhotoModel'); // Import the model

const router = express.Router();

// Configure Multer (store files in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST method to update profile photo
router.post('/updateProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
    try {
        const email = req.body.email;
        const { buffer, mimetype } = req.file;

        if (!email || !buffer || !mimetype) {
            return res.status(400).json({ success: false, message: 'Invalid data provided.' });
        }

        // Check if profile photo already exists for the user
        const existingPhoto = await ProfilePhoto.findOne({ email });

        if (existingPhoto) {
            // Update existing photo
            existingPhoto.profilePhoto = buffer;
            existingPhoto.contentType = mimetype;
            await existingPhoto.save();
        } else {
            // Create a new entry for the profile photo
            const newPhoto = new ProfilePhoto({
                email,
                profilePhoto: buffer,
                contentType: mimetype,
            });
            await newPhoto.save();
        }

        res.status(200).json({ success: true, message: 'Profile photo updated successfully.' });
    } catch (error) {
        console.error('Error updating profile photo:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;
