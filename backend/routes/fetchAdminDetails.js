const express = require('express');
const router = express.Router();
const AdminModel=require("../models/adminModel");

const fetchAdminDetails = async (req, res) => {
    const adminId = req.params.adminId; // Assuming userId is passed as a URL parameter
    try {
        const admin = await AdminModel.findById(adminId).select('-password'); // Fetch user by ID and exclude the password
  
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }
  
        res.json({ success: true, data: admin }); // Send the user data in response
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching admin details" }); // Proper error handling
    }
  };
// const fetchAdminDetails = async (req, res) => {
//     const { adminId } = req.params;
  
//     if (!adminId) {
//       return res.status(400).json({ error: 'Invalid admin ID' });
//     }
  
//     // Proceed with fetching admin details
//     try {
//       const admin = await AdminModel.findById(adminId);
//       if (!admin) {
//         return res.status(404).json({ error: 'Admin not found' });
//       }
//       res.json(admin);
//     } catch (error) {
//       res.status(500).json({ error: 'Server error' });
//     }
//   };
  
  router.get("/admin/:adminId", fetchAdminDetails);
  module.exports = router;