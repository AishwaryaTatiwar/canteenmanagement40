import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './comp.css';

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const history = useNavigate();

  // Check if token exists
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/login'); // Redirect to login
  };

  return (
    <div>
      <nav className="navbar">
        <div className="site-name">
          <Link to="/">Smart Canteen</Link>
        </div>
        <div className="nav-toggle" onClick={toggleSidebar}>
          <span>&#9776;</span> {/* Hamburger Icon */}
        </div>
        <div className="nav-links">
          {/* Show login link if not logged in, else show other links */}
          {!isLoggedIn ? (
            <Link to="/login">Login or Signup</Link>
          ) : (
            <>
              <Link to="/menu">Menu</Link>
              <Link to="/delivery">CrowdMonitor</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div id="sidebar" className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <a href="#" className="closebtn" onClick={toggleSidebar}>
          &times;
        </a>
        {/* Show login link if not logged in, else show other links */}
        {!isLoggedIn ? (
          <Link to="/login" onClick={toggleSidebar}>Login</Link>
        ) : (
          <>
            <Link to="/menu" onClick={toggleSidebar}>Menu</Link>
            <Link to="/delivery" onClick={toggleSidebar}>Crowd Monitor</Link>
            <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
            <button onClick={() => { toggleSidebar(); handleLogout(); }} >Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
