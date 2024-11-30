const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
