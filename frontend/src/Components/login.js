import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./comp.css";
import "./login.css";
import axios from "axios";

export default function Login() {
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

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8283/api/auth/login",
        formData // Send the formData directly
      );
      localStorage.setItem('token', response.data.token);
      console.log(response.data.message);
      alert(response.data.message); // Optional: Show success message
      navigate("/"); // Redirect to homepage on successful login
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          {" "}
          {/* Add onSubmit handler */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email" // Add name attribute
              placeholder="Enter your email"
              value={formData.email} // Set value from state
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Enter your password"
              value={formData.password} // Set value from state
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>{" "}
          {/* Change button to submit */}
        </form>
        <div className="signup">
          <h3>Don't have an account?</h3>
          <Link to="/Signup">
            {" "}
            {/* Use Link for navigation */}
            <button className="signup-btn">Signup</button>
          </Link>
        </div>
      </div>

      {/* Mobile view */}
      <div className="mob-login-container">
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          {" "}
          {/* Add onSubmit handler */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email" // Add name attribute
              placeholder="Enter your email"
              value={formData.email} // Set value from state
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password" // Add name attribute
              placeholder="Enter your password"
              value={formData.password} // Set value from state
              onChange={handleChange} // Add onChange handler
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>{" "}
          {/* Change button to submit */}
        </form>
        <div className="mob-signup">
          <h3>Don't have an account?</h3>
          <Link to="/Signup">
            <button className="signup-btn">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

