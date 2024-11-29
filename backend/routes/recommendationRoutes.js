const express = require("express");
const router = express.Router();
const Order = require("../models/ordersModel"); // Import the Orders model

// Function to generate recommendations based on user's previous orders
const getRecommendations = async (userEmail) => {
  try {
    // Fetch all orders for the given userEmail
    const orders = await Order.find({ userEmail }).lean();

    // Create a frequency map to count item occurrences across all orders
    const itemFrequency = {};

    // Count item frequencies across all orders
    orders.forEach((order) => {
      order.cartItems.forEach((item) => {
        // Access cartItems
        if (itemFrequency[item.title]) {
          itemFrequency[item.title].quantity += item.quantity;
        } else {
          itemFrequency[item.title] = { ...item }; // Store the complete item data
          itemFrequency[item.title].quantity = item.quantity; // Initialize the quantity
        }
      });
    });

    // Sort items by frequency to get the most frequently ordered items
    const recommendedItems = Object.values(itemFrequency)
      .sort((a, b) => b.quantity - a.quantity) // Sort by total quantity
      .slice(0, 5); // Get top 5 items

    return recommendedItems; // Return the complete data for recommended items
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw new Error("Could not fetch recommendations"); // Handle the error appropriately
  }
};

// Route to get recommendations for a user by email
router.get("/:userEmail", async (req, res) => {
  const { userEmail } = req.params; // Get userEmail from the URL

  try {
    // Fetch recommendations based on userEmail
    const recommendations = await getRecommendations(userEmail);

    // Return recommendations as a JSON response
    res.status(200).json({
      success: true,
      recommendedItems: recommendations,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recommendations",
      error: error.message,
    });
  }
});

module.exports = router;
