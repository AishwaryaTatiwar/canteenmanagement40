const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const Menus = mongoose.model('Menus', menuSchema);

module.exports = Menus;
