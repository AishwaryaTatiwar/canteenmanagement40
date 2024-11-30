const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel"); // Assuming you have a Review model

// GET method to fetch reviews by rating category
router.get("/reviews/rating/:rating", async (req, res) => {
  const { rating } = req.params;

  // Validate that the rating category is provided
  if (!rating || !["positive", "neutral", "negative", "all"].includes(rating)) {
    return res
      .status(400)
      .json({ success: false, message: "Valid rating category is required (positive, neutral, negative, or all)." });
  }

  let ratingFilter = [];

  // Determine the filter based on rating category
  if (rating === "positive") {
    ratingFilter = [4, 5]; // Ratings 4 and 5 for positive reviews
  } else if (rating === "neutral") {
    ratingFilter = [3]; // Rating 3 for neutral reviews
  } else if (rating === "negative") {
    ratingFilter = [1, 2]; // Ratings 1 and 2 for negative reviews
  } else if (rating === "all") {
    ratingFilter = [1, 2, 3, 4, 5]; // All ratings
  }

  try {
    // Find reviews by the rating filter
    const reviewsByRating = await Review.find({ rating: { $in: ratingFilter } });

    // If no reviews found, return a 404 response
    if (reviewsByRating.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No reviews found for ${rating} ratings.`,
      });
    }

    // Return the fetched reviews
    res.status(200).json({ success: true, data: reviewsByRating });
  } catch (error) {
    // Handle errors
    console.error("Error fetching reviews by rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
});

module.exports = router;