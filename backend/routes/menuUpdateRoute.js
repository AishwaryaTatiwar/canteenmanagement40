const express = require('express');
const router = express.Router();
const Menus=require("../models/menussModel");
  
router.put('/menu/:id', async (req, res) => {
    const { id } = req.params; // Get the menu item ID from the request parameters
    const { name, price, ingredients, image, category } = req.body; // Extract the updated fields from the request body
  
    try {
      // Find the menu item by ID and update it with the new data
      const updatedItem = await Menus.findByIdAndUpdate(
        id,
        {
          name,
          price,
          ingredients,
          image,
          category,
        },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
  
      res.status(200).json({ message: 'Menu item updated successfully', updatedItem });
    } catch (error) {
      console.error('Error updating menu item:', error);
      res.status(500).json({ message: 'Server error, unable to update menu item' });
    }
  });

  module.exports = router;