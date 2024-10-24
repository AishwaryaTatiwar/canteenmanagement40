
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css';
import axios from "axios";

const Receipt = () => {
  const location = useLocation();
  const { cartItems, totalPrice, paymentMethod, status,transID,orderID,userName,userEmail,currentDateTime} = location.state || { cartItems: [], totalPrice: 0, paymentMethod: "N/A", status: "failure" };

  
  return (
    <div className="receipt-container">
      <div className="receipt-box">
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
        {status === "success" && <button className="cancel-button">Cancel Order</button>}
        <button className="download-button">Download Receipt</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
