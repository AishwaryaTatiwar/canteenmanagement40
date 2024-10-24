import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import axios from "axios";

function ProfilePage() {
    const [activeTab, setActiveTab] = useState('personal-info');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userOrders, setUserOrders] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);

    const decodeJwt = (token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    const token = localStorage.getItem('token');
    const userId = decodeJwt(token)?.userID;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                setUserOrders(data.data); // Correctly setting orders data
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error fetching user orders:', error);
            setError('Failed to fetch user orders');
        }
    };

    useEffect(() => {
        fetchUserData();
        if (userEmail) {
            fetchUserOrders(userEmail); // Only fetch orders after email is set
        }
    }, [userEmail]);

    return (
        <div className="profile-page">
            <div className="profile-banner">
                <div className="profile-details">
                    <div className="profile-image">
                        <img src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg' alt="Profile" />
                    </div>
                    <div className="profile-name">{userName || 'Loading...'}</div>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
            </div>

            <div className="profile-content">
                <div className="profile-info-activity">
                    <h3>PROFILE</h3>
                    <ul>
                        <li><button className={activeTab === 'personal-info' ? 'active' : ''} onClick={() => handleTabClick('personal-info')}>Personal Info</button></li>
                        <li><button className={activeTab === 'cart' ? 'active' : ''} onClick={() => handleTabClick('cart')}>Cart</button></li>
                        <li><button className={activeTab === 'favourites' ? 'active' : ''} onClick={() => handleTabClick('favourites')}>Favourites</button></li>
                        <li><button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => handleTabClick('notifications')}>Notifications</button></li>
                    </ul>
                    <h3>ACTIVITY</h3>
                    <ul>
                        <li><button className={activeTab === 'order-history' ? 'active' : ''} onClick={() => handleTabClick('order-history')}>Order History</button></li>
                        <li><button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => handleTabClick('reviews')}>Reviews</button></li>
                        <li><button className={activeTab === 'settings' ? 'active' : ''} onClick={() => handleTabClick('settings')}>Settings</button></li>
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

{activeTab === 'order-history' && (
    <div className="history-container">
        <h2 className="history-title">Order History</h2>
        {userOrders.length > 0 ? (
            <div className="history-header">
                <span>OrderID:</span>
                <span>Items:</span>
                <span>Quantity:</span>
                <span>Status:</span>
                <span></span> {/* For the "Give Feedback" button */}
            </div>
        ) : (
            <p>You have not placed any orders.</p>
        )}

        {userOrders.map(order => (
            <div key={order.orderID} className="history-item">
                <span>{order.orderID}</span>
                <span>{order.cartItems.map(item => item.title).join(', ')}</span>
                <span>{order.cartItems.map(item => item.quantity).join(', ')}</span>
                <span>{order.orderStatus}</span>
                <button className="feedback-btn">Give review</button>
                <div className="total-price">
                    <span>Total price:</span>
                    <span>{order.totalPrice}</span>
                </div>
            </div>
        ))}
    </div>
)}

                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
