import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserReview.css";

const UserReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter is 'all'

  // Fetch reviews from the API based on the selected rating filter
  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const url = `http://localhost:8283/api/getratingreview/reviews/rating/${filter}`; // Adjust URL to match the API endpoint
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;
        if (data.success) {
          setReviews(data.data); // Save the fetched reviews in state
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    };

    fetchUserReviews(); // Call the function to fetch the reviews whenever filter changes
  }, [filter]); // This will run whenever the filter changes

  // Filter reviews based on the selected filter
  useEffect(() => {
    let filtered = reviews;

    // The filtering logic is now handled directly by the server-side fetchRatingRoute.
    // No need to filter again on the frontend, as reviews are already filtered by rating category.

    setFilteredReviews(filtered); // Update filtered reviews state
  }, [reviews]); // Trigger filter update when reviews change

  return (
    
    <div className="review-container">
      <div className="headerReview">
        <h1 className="filter-header">User Reviews</h1>
        
        <select
          className="review-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} // Update filter when changed
        >
          <option value="all">All</option>
          <option value="positive">Positive</option>
          <option value="neutral">Neutral</option>
          <option value="negative">Negative</option>
        </select>
      </div>

      <div>
      <div className="cards">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div className="review-card" key={review._id}>
              <div className="review-header">
                <p>
                  <strong>Order ID:</strong> {review.orderID}
                </p>
                <span className="review-rating">{review.rating}</span>
              </div>
              <p className="review-feedback">
                <strong>Feedback:</strong> {review.feedbackMessage}
              </p>
              <p>
                <strong>User Email:</strong> {review.userEmail}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="no-reviews">No reviews available.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default UserReview;