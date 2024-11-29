// Endpoint to handle form submission
const express = require('express');
const router = express.Router();
const ContactForm=require('../models/userSupport');

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new ContactForm({ name, email, message });
        await newMessage.save();
        res.status(201).send({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(400).send({ error: 'Failed to send message.' });
    }
});

module.exports = router;