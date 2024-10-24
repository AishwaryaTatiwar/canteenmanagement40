const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'canteensmart38@gmail.com', // Replace with your email
    pass: 'exuo lump czbl sgon',  // Replace with your email password
  },
});

// Function to send email
const sendMail = (recipientEmail, subject, text) => {
  const mailOptions = {
    from: 'aishwaryatatiwar@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

// Route to handle acceptance email
router.post('/send-accept-email', async (req, res) => {
  const { userEmail, orderID } = req.body;

  try {
    await sendMail(
      userEmail,
      'Order Accepted',
      `Your order with ID ${orderID} has been accepted. It will be processed soon.`
    );
    res.status(200).json({ message: 'Acceptance email sent successfully.' });
  } catch (error) {
    console.error('Error sending acceptance email:', error);
    res.status(500).json({ message: 'Failed to send acceptance email.' });
  }
});

// Route to handle rejection email
router.post('/send-reject-email', async (req, res) => {
  const { userEmail, orderID } = req.body;

  try {
    await sendMail(
      userEmail,
      'Order Rejected',
      `Your order with ID ${orderID} has been rejected. Please contact support for further details.`
    );
    res.status(200).json({ message: 'Rejection email sent successfully.' });
  } catch (error) {
    console.error('Error sending rejection email:', error);
    res.status(500).json({ message: 'Failed to send rejection email.' });
  }
});
router.post('/send-prepared-email', async (req, res) => {
  const { userEmail, orderID } = req.body;

  try {
    await sendMail(
      userEmail,
      'Order Prepared',
      `Your order with ID ${orderID} has been prepared and is ready for collection from canteen.`
    );
    res.status(200).json({ message: 'Preparation email sent successfully.' });
  } catch (error) {
    console.error('Error sending preparation email:', error);
    res.status(500).json({ message: 'Failed to send preparation email.' });
  }
});

module.exports = router;
