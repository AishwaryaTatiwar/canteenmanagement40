const express = require('express');
const Orders = require('../models/ordersModel'); // Adjust the path based on your project structure

const router = express.Router();

// Route to fetch orders based on timePeriod
router.get('/:timePeriod', async (req, res) => {
  const { timePeriod } = req.params;

  try {
    let matchStage = { orderStatus: 'delivered' }; // Match only delivered orders
    let groupStage;

    if (timePeriod === 'day') {
      // Group by hour of the day
      groupStage = {
        $group: {
          _id: { $hour: '$datetime' }, // Extract hour from datetime
          count: { $sum: 1 }, // Count the number of orders
          totalRevenue: { $sum: '$totalPrice' }, // Sum total revenue
        },
      };
    } else if (timePeriod === 'week') {
      // Group by day of the week
      groupStage = {
        $group: {
          _id: { $dayOfWeek: '$datetime' }, // Extract day of the week (1=Sunday, 2=Monday, etc.)
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      };
    } else if (timePeriod === 'month') {
      // Group by month
      groupStage = {
        $group: {
          _id: { $month: '$datetime' }, // Extract month (1=January, 2=February, etc.)
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      };
    } else {
      return res.status(400).json({ error: 'Invalid timePeriod. Use "day", "week", or "month".' });
    }

    // Fetch data using MongoDB aggregation
    const orders = await Orders.aggregate([
      { $match: matchStage }, // Match only delivered orders
      groupStage,
      { $sort: { _id: 1 } }, // Sort by time
    ]);

    // Format the response
    const response = orders.map(order => ({
      ...(timePeriod === 'day' && { hour: order._id }),
      ...(timePeriod === 'week' && { dayOfWeek: order._id }),
      ...(timePeriod === 'month' && { month: order._id }),
      count: order.count,
      totalRevenue: order.totalRevenue,
    }));

    res.json(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
