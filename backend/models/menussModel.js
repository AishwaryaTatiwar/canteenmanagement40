const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
});

const Menus = mongoose.model('Menus', menuSchema);

module.exports = Menus;
