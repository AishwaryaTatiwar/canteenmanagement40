// Import necessary modules
const express = require('express');
const router = express.Router();
const Order = require('../models/ordersModel.js'); // Assuming you have an Order model

// DELETE endpoint to remove an order by orderID
router.delete('/orders/:orderID', async (req, res) => {
  try {
    const { orderID } = req.params; // Get the orderID from the request parameters

    // Find the order by orderID and delete it
    const deletedOrder = await Order.findOneAndDelete({ orderID });

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' }); // If no order is found
    }

    res.status(200).json({ message: 'Order cancelled successfully', order: deletedOrder });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error while cancelling the order' });
  }
});

module.exports = router;
