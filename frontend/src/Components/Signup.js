import React, { useState } from "react";
import "./comp.css";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8283/api/auth/register",
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
      navigate("/login");
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>SignUp</h2>
        <form onSubmit={submitForm}>
          {" "}
          {/* Add onSubmit handler */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn">
            Signup
          </button>{" "}
          {/* Change button to submit */}
        </form>
      </div>
    </div>
  );
}
