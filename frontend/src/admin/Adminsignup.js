import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './Adminsignup.css';  // Ensure this file is properly linked
import axios from "axios";

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
      const navigate = useNavigate();
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8283/api/adminauth/adminregister",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("name", formData.name);
      console.log("email", formData.email);
      console.log("password", formData.password);
      alert(response.data.message);
      navigate("/adminlogin");
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSignup}>
        <h2>Admin Signup</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
           name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-button">SIGN UP</button>
      </form>
    </div>
  );
};

export default AdminSignup;
