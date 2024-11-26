
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Receipt.css';
import axios from "axios";
import html2pdf from 'html2pdf.js';


const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate to redirect after cancellation
  const { cartItems, totalPrice, paymentMethod, status,transID,orderID,userName,userEmail,currentDateTime} = location.state || { cartItems: [], totalPrice: 0, paymentMethod: "N/A", status: "failure" };
  // Function to download the receipt as PDF
  const handleDownloadReceipt = () => {
    const element = document.getElementById('receipt-content'); // Target the receipt content
    const opt = {
      margin: 0.5,
      filename: `receipt_${orderID}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 7 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate and download PDF
    html2pdf().from(element).set(opt).save();
  };

  const handleCancelOrder = async () => {
    try {
      const response = await axios.delete(`http://localhost:8283/api/delete/orders/${orderID}`); // API call to delete the order
      alert('Order canceled successfully.');
      // Redirect the user after successful cancellation
      navigate('/menu'); 
    } catch (error) {
      alert(error.response?.data.message || 'An error occurred while canceling the order.');
    }
  };
  return (
    <div className="receipt-container">
      <div className="receipt-box" id="receipt-content">
        {/* Header */}
        <div className="receipt-header">
          <h1 className="receipt-title">
            Smart <span className="highlight">Canteen</span>
          </h1>
          <h2 className="receipt-subtitle">Order Receipt</h2>
        </div>

        {/* Customer Details */}
        <div className="section">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Transaction ID:</strong>{transID}</p>
        <p><strong>Payment method:</strong> {paymentMethod.toUpperCase()}</p>
        <p><strong>Transaction Status:</strong> {status === "success" ? "Successful" : "Failed"}</p>
        </div>

        {/* Order Details */}
        <div className="section">
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong>{orderID}</p>
          <p><strong>Date and time:</strong>{currentDateTime}</p>
          <table className="order-summary">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price (Rs.)</th>
                <th>Subtotal (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-price"><strong>Total Price:</strong> Rs. {totalPrice}</p>
        </div>

        {/* Footer */}
        <div className="receipt-footer">
        <p>Thank you for your order! We hope you enjoy your meal.</p>
        {status === "success" && <button className="cancel-button" onClick={handleCancelOrder}>Cancel Order</button>}
        <button className="download-button" onClick={handleDownloadReceipt}>Download Receipt</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
