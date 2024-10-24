const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1 // Ensures that quantity cannot be less than 1
    },
    price: {
      type: Number,
      required: true,
      min: 0 // Ensures that price cannot be negative
    }
  }, { _id: false }); // Prevents Mongoose from creating an _id field for cart items
const ordersSchema = new mongoose.Schema({
    orderID: { 
      type: String, 
      required: true 
    },
    transID: { 
      type: String, 
      required: true 
    },
    cartItems: [cartItemSchema], // Array of cart items
    totalPrice: { 
      type: Number, 
      required: true 
    },
    paymentMethod: { 
      type: String, 
      enum: ['upi', 'qr', 'card', 'netbanking'], 
      required: true 
    },
    paymentStatus: { 
      type: String, 
      enum: ['Successful', 'Failed'], 
      default: 'Successful' 
    },
    datetime: { 
      type: Date, 
      default: Date.now 
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'inpreparation','delivered', 'cancelled'],
      default: 'pending'
    },
    userName: {  // New field for user's name
      type: String,
      required: true
    },
    userEmail: {  // New field for user's email
      type: String,
      required: true
    }
  });

const Orders= mongoose.model("Orders",ordersSchema);
module.exports = Orders;