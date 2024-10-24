// routes/orders.js
const express = require('express');
const router = express.Router();
const Orders=require("../models/ordersModel");

// PUT: Update order status to "inpreparation"
router.put('/:orderID', async (req, res) => {
  const { orderID } = req.params;
  const { orderStatus } = req.body;

  try {
    // Find the order by orderID and update the orderStatus
    const updatedOrder = await Orders.findOneAndUpdate(
      { orderID: orderID },   // Find the order with matching orderID
      { orderStatus: orderStatus }, // Update the orderStatus field
      { new: true }  // Return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
