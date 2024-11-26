const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    items: [{
        title: {
            type: String,
            required: true,
        },
    }],
    feedbackMessage: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
