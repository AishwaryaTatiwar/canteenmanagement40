import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './Adminlogin.css';  // Ensure this file is properly linked
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8283/api/adminauth/adminlogin",
        formData // Send the formData directly
      );
      localStorage.setItem('token', response.data.token);
      console.log(response.data.message);
      alert(response.data.message); // Optional: Show success message
      navigate("/Dashboard"); // Redirect to homepage on successful login
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
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
        <button type="submit" className="login-button">LOG IN</button>
        <h3>OR</h3>
        <div className='signup-block'>
        <p>To register as admin</p>
        <Link to='/adminsignup'>
        <button className='signup-btn'>Signup</button></Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
