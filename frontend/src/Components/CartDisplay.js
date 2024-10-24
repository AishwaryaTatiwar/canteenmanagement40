import React from 'react';
import './CartDisplay.css';

const CartDisplay = ({ Img, foodName, price, quantity, onQuantityChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="cart-display-item">
      <img src={Img} alt={foodName} className="cart-food-img" />
      <div className="food-details">
        <h3>{foodName}</h3>
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button className="quantity-btn" onClick={handleIncrease}>+</button>
        </div>
        <p>Price: Rs. {price}</p>
        <p>Subtotal: Rs. {price * quantity}</p>
      </div>
    </div>
  );
};

export default CartDisplay;




