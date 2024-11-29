import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA component
import "./comp.css";
import "./login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [captchaToken, setCaptchaToken] = useState(""); // Store CAPTCHA token
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please verify the CAPTCHA.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8283/api/auth/login",
        {
          ...formData,
          captchaToken, // Include CAPTCHA token in the request
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log(response.data.message);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="captcha-group">
            <ReCAPTCHA
              sitekey="6LczmYsqAAAAAEpCLurqzgYAXifm-tWF0AN1f87B" // Replace with your actual site key
              onChange={handleCaptchaChange}
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="signup">
          <h3>Don't have an account?</h3>
          <Link to="/Signup">
            <button className="signup-btn">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
