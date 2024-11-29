// Endpoint to get all contact messages
const express = require('express');
const router = express.Router();
const ContactForm=require("../models/userSupport");

router.get('/contacts', async (req, res) => {
    try {
        const messages = await ContactForm.find();
        console.log(messages);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

module.exports = router;
