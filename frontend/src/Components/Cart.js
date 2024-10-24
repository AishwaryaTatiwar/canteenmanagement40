
import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import './Cart.css';

function Cart({ cartCount }) {
  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-icon-wrapper">
          <BsFillCartFill className="cart-icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
        <span className="cart-label">Your food cart</span>
      </div>
    </div>
  );
}
export default Cart;
