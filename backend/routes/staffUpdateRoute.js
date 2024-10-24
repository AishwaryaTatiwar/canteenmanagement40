const express = require('express');
const router = express.Router();
const Staffs=require("../models/staffModel.js");
  
router.put('/staff/:id', async (req, res) => {
    const { id } = req.params; // Get the menu item ID from the request parameters
    const { name, phone,work } = req.body; // Extract the updated fields from the request body
  
    try {
      // Find the menu item by ID and update it with the new data
      const updatedStaff = await Staffs.findByIdAndUpdate(
        id,
        {
          name,
          phone,
          work
        },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedStaff) {
        return res.status(404).json({ message: 'Staff not found' });
      }
  
      res.status(200).json({ message: 'Staff updated successfully', updatedStaff });
    } catch (error) {
      console.error('Error updating staff:', error);
      res.status(500).json({ message: 'Server error, unable to update staff' });
    }
  });

  module.exports = router;