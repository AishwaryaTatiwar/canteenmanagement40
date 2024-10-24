import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CartDisplay from './CartDisplay';  
import { BsFillCartFill } from 'react-icons/bs'
import './CartPage.css';
import axios from "axios";

const CartPage = () => {
  const location = useLocation();
  const initialCartItems = location.state?.cartItems.map(item => ({
    ...item,
    quantity: 1,  // always starts at 1
  })) || [];

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userName, setUserName] = useState(''); // State for storing the user's name
  const [userEmail, setUserEmail] = useState(''); // State for storing the user's name
  const [error, setError] = useState(null); // State for handling errors

    // Function to decode JWT token
    const decodeJwt = (token) => {
        if (!token) return null;
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    };

    // Get the token from localStorage and decode it to extract userId
    const token = localStorage.getItem('token');
    const userId = decodeJwt(token)?.userID;


    // Function to fetch user name from the server
    const fetchUserName = async () => {
        try {
            const response = await axios.get(`http://localhost:8283/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your token in the request
                },
            });

            const data = response.data;
            if (data.success) {
                setUserName(data.data.name); // Set the user's name in the state
            } else {
                setError(data.message); // Handle error message
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
            setError('Failed to fetch user name');
        }
    };
    const fetchUserEmail = async () => {
        try {
            const response = await axios.get(`http://localhost:8283/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your token in the request
                },
            });

            const data = response.data;
            if (data.success) {
                setUserEmail(data.data.email); // Set the user's name in the state
            } else {
                setError(data.message); // Handle error message
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
            setError('Failed to fetch user name');
        }
    };

    // Fetch user name on component mount
    useEffect(() => {
      // Fetch functions for user data
      fetchUserName();
      fetchUserEmail();
    }, [userId]); 

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity > 0 ? newQuantity : 1; // quantity can't be zero
    setCartItems(updatedItems);
  };
  const navigate = useNavigate();
  
  const handlePayment= () => {
    navigate('/paymentpage',{ state: { cartItems,totalPrice,userName,userEmail} });
  };

  return (
    <div className="cart-page">
      <div className='cart-heading'> 
        <BsFillCartFill className="cart-icon1" />
        <h2>Your Food Cart</h2>
      </div>
      <div className="cart-items-container">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartDisplay
              key={index}
              Img={item.url} 
              foodName={item.title} 
              price={item.price} 
              quantity={item.quantity}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
            />
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
      <div className="total-section">
        <h3>Total Price: Rs. {totalPrice}</h3>
          <button onClick={handlePayment} className="proceed-payment">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CartPage;
