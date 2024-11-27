const mongoose = require('mongoose');

// Define the schema for the contact form
const contactFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true,   // Ensure email is unique
    },
    message: {
        type: String,
        required: true, // Message is required
        minlength: 1,   // Minimum length
        maxlength: 500, // Maximum length
    },
});

// Create the model from the schema
const ContactForm = mongoose.model('ContactForm', contactFormSchema);

module.exports = ContactForm;
