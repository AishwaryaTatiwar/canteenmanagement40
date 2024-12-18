import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import axios from "axios";

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal-info');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOrders, setUserOrders] = useState([]); 
    const [userReviews, setUserReviews] = useState([]); // State to store reviews
    const [error, setError] = useState(null);
    const [showReviewPopup, setShowReviewPopup] = useState(false); 
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [feedbackMessage, setFeedbackMessage] = useState(''); 
    const [rating, setRating] = useState(0); 
    const [profilePhoto, setProfilePhoto] = useState(null); // State to store the selected photo
    const [profilePhotoPreview, setProfilePhotoPreview] = useState(null); // For previewing selected photo
    const [editMode, setEditMode] = useState(false); // Toggle edit mode
    const [userFavorites, setUserFavorites] = useState([]); // State for storing favorites
    const fetchUserFavorites = async (userEmail) => {
    try {
        const response = await axios.get(`http://localhost:8283/api/fetchfavorite/${userEmail}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = response.data;
        if (data.success) {
            setUserFavorites(data.data); // Save fetched favorites in state
        } else {
            setError(data.message);
        }
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        setError('Failed to fetch user favorites');
    }
};

    const decodeJwt = (token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const token = localStorage.getItem('token');
    const userId = decodeJwt(token)?.userID;

    const handleTabClick = (tab) => {
        setActiveTab(tab);

    if (tab === 'favourites') {
        fetchUserFavorites(userEmail); // Fetch favorites for the "favorites" tab
    } else if (tab === 'reviews') {
        fetchUserReviews(userEmail); // Fetch reviews for the "reviews" tab
    }
    };
    
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8283/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = response.data;
            if (data.success) {
                setUserName(data.data.name);
                setUserEmail(data.data.email);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to fetch user data');
        }
    };

    const fetchUserOrders = async (userEmail) => {
        try {
            const response = await axios.get(`http://localhost:8283/api/orders/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = response.data;
            if (data.success) {
                setUserOrders(data.data); 
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching user orders:', error);
            setError('Failed to fetch user orders');
        }
    };

    const fetchUserReviews = async (userEmail) => {
        try {
            const response = await axios.get(`http://localhost:8283/api/getreview/userreviews/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = response.data;
            if (data.success) {
                setUserReviews(data.data); // Save the fetched reviews in state
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching user reviews:', error);
            setError('Failed to fetch user reviews');
        }
    };

    useEffect(() => {
        fetchUserData();
        if (userEmail) {
            fetchUserOrders(userEmail); 
            fetchUserReviews(userEmail);
            fetchUserFavorites(userEmail);
        }
    }, [userEmail]);

    const handleGiveReview = (order) => {
        setSelectedOrder(order);
        setShowReviewPopup(true); // Show the popup when "Give review" is clicked
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setProfilePhoto(file);
        setProfilePhotoPreview(URL.createObjectURL(file)); // Create preview
    };

    const handleSubmitProfilePhoto = async (e) => {
        e.preventDefault();
        if (!profilePhoto) {
            alert('Please select a profile photo.');
            return;
        }

        const formData = new FormData();
        formData.append('email', userEmail);
        formData.append('profilePhoto', profilePhoto);

        try {
            const response = await axios.post('http://localhost:8283/api/user/updateProfilePhoto', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Profile photo updated successfully.');
                setEditMode(false); // Exit edit mode
                fetchUserData(); // Refresh user data
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile photo:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmitReview = async () => {
        // Prepare review data
        const reviewData = {
            orderID: selectedOrder.orderID,
            userEmail: userEmail, 
            items: selectedOrder.cartItems.map(item => ({ title: item.title })),
            feedbackMessage: feedbackMessage,
            rating: rating,
        };
    
        try {
            // Send POST request to save review
            const response = await axios.post('http://localhost:8283/api/review/userreview', reviewData);
    
            if (response.data.success) {
                alert("Review submitted successfully");
            } else {
                console.error("Review submission failed:", response.data.message);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    
        // Reset after submitting
        setShowReviewPopup(false);
        setFeedbackMessage('');
        setRating(0);
    };

    useEffect(() => {
        const fetchProfilePhoto = async () => {
            try {
                const response = await axios.get(`http://localhost:8283/api/photo/getProfilePhoto/${userEmail}`, {
                    responseType: 'arraybuffer', // Ensure binary data is received
                });

                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const imageUrl = URL.createObjectURL(blob);
                setProfilePhoto(imageUrl);
            } catch (error) {
                console.error('Error fetching profile photo:', error);
            }
        };

        fetchProfilePhoto();
    }, [userEmail]);

    return (
        <div className="profile-page">
            <div className="profile-banner">
                <div className="profile-details">
                <div className="profile-image">
               <img
                src={profilePhoto || 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'}
                alt="Profile"
            />
        </div>
                    <div className="profile-name">{userName || 'Loading...'}</div>
                </div>
                <button className="edit-profile-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
            {editMode && (
                <div className="edit-profile-container">
                    <h3>Edit Profile</h3>
                    <form onSubmit={handleSubmitProfilePhoto}>
                        <div className="form-group">
                            <label>Update Profile Photo:</label>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} />
                        </div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <div className="profile-content">
                <div className="profile-info-activity">
                    <h3>PROFILE</h3>
                    <ul>
                        <li><button className={activeTab === 'personal-info' ? 'active' : ''} onClick={() => handleTabClick('personal-info')}>Personal Info</button></li>
                        <li><button className={activeTab === 'favourites' ? 'active' : ''} onClick={() => handleTabClick('favourites')}>Favourites</button></li>
                    </ul>
                    <h3>ACTIVITY</h3>
                    <ul>
                        <li><button className={activeTab === 'order-history' ? 'active' : ''} onClick={() => handleTabClick('order-history')}>Order History</button></li>
                        <li><button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => handleTabClick('reviews')}>Reviews</button></li>
                    </ul>
                </div>

                <div className="tab-content">
                    {activeTab === 'personal-info' && (
                        <div className="info-box">
                            <h3>Personal Information</h3>
                            <p><strong>Name:</strong> {userName}</p>
                            <p><strong>Email:</strong> {userEmail}</p>
                        </div>
                    )}

            {activeTab === "order-history" && (
                <div className="history-container">
                    <h2 className="history-title">Order History</h2>
                    {userOrders.length > 0 ? (
                        <div className="history-header">
                            <span>OrderID:</span>
                            <span>Items:</span>
                            <span>Quantity:</span>
                            <span>Status:</span>
                            <span></span>
                        </div>
                    ) : (
                        <p>You have not placed any orders.</p>
                    )}

                    {userOrders.map((order) => (
                        <div key={order.orderID} className="history-item">
                            <span>{order.orderID}</span>
                            <span>
                                {order.cartItems.map((item) => item.title).join(", ")}
                            </span>
                            <span>
                                {order.cartItems.map((item) => item.quantity).join(", ")}
                            </span>
                            <span>{order.orderStatus}</span>

                            {order.orderStatus === "delivered" && (
                                <button
                                    className="feedback-btn"
                                    onClick={() => handleGiveReview(order)}
                                >
                                    Give review
                                </button>
                            )}

                            <div className="total-price">
                                <span>Total price:</span>
                                <span>{order.totalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
{activeTab === 'favourites' && (
    <div className="favorites-container">
        <h3>Your Favorites</h3>
        {userFavorites.length > 0 ? (
            <div className="favorites-list">
                {userFavorites.map((favorite, index) => (
                    <div key={index} className="favorite-item">
                        {favorite.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="favorite-details">
                                <img src={item.imageUrl} alt={item.title} />
                                <h4>{item.title}</h4>
                                <p>Price: ₹{item.price}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        ) : (
            <p>You have not added any items to favorites.</p>
        )}
    </div>
)}


{activeTab === 'reviews' && (
    <div className="reviews-container">
        {/* <h2 className="reviews-title">Your Reviews</h2> */}
        {userReviews && userReviews.length > 0 ? (
            userReviews.map(review => (
                <div key={review._id} className="review-card">
                    <div className="review-header">
                        <h4 className="order-id">Order ID: {review.orderID}</h4>
                    </div>
                    <div className="review-body">
                        <p><strong>Item:</strong> {review.items.map(item => item.title).join(', ')}</p>
                        <p><strong>Rating:</strong> {review.rating} stars</p>
                        <p><strong>Email:</strong> {userEmail}</p>
                        <p><strong>Feedback:</strong> {review.feedbackMessage}</p>
                    </div>
                </div>
            ))
        ) : (
            <p>You haven't left any reviews yet.</p>
        )}
    </div>
)}
                </div>

                {showReviewPopup && (
                    <div className="review-popup">
                        <div className="review-popup-content">
                            <h3>Leave a Review</h3>
                            <p><strong>Order ID:</strong> {selectedOrder?.orderID}</p>
                            <p><strong>Items:</strong> {selectedOrder?.cartItems.map(item => item.title).join(', ')}</p>
                            <p><strong>Email:</strong>{userEmail}</p>

                            <textarea
                                value={feedbackMessage}
                                onChange={(e) => setFeedbackMessage(e.target.value)}
                                placeholder="Write your review here..."
                            />

                            {/* <div className="rating-section">
                                <label>Rating:</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="5"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                />
                            </div> */}
                            <div className="star-container">
                            <label>Rating:</label>
                            {[1, 2, 3, 4, 5].map((star) => (
                            <span
                            key={star}
                            className={rating >= star ? 'star-filled' : 'star-empty'}
                            onClick={() => setRating(star)}
                            >&#9733;</span>
                            ))}</div>

                            <div className="popup-buttons">
                                <button onClick={handleSubmitReview}>Submit</button>
                                <button onClick={() => setShowReviewPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ProfilePage;
