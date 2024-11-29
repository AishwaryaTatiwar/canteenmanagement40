const mongoose = require('mongoose');

const ProfilePhotoSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    profilePhoto: { 
        type: Buffer, // Store image as binary data
        required: true 
    },
    contentType: { 
        type: String, // e.g., 'image/png' or 'image/jpeg'
        required: true 
    }
});

module.exports = mongoose.model('ProfilePhoto', ProfilePhotoSchema);
