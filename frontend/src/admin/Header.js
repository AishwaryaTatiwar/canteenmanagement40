import React, { useState } from 'react';
import './Header.css'; // Ensure the styles are imported
import {Link} from 'react-router-dom';
function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="header-container">
      {/* Header with Hamburger Icon */}
      <div className="header">
        <div className="toggle" onClick={toggleSidebar}>
          <span>&#9776;</span> {/* Hamburger icon */}
        </div>
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="icon-button">🔔</div>
        <div className="icon-button">👤</div>
        {/* <button>Login or Signup</button> */}
      </div>

      {/* Sidebar */}
      <div className={`sidebar1 ${isSidebarOpen ? 'open' : ''}`}>
        <div className="close-btn1" onClick={toggleSidebar}>&times;</div> {/* Close Button */}
        <div className='navigate'>
        <Link to="/" className='links'>Login or Signup</Link>
        <Link to="/Dashboard" className='links'>Dashboard</Link>
        <Link to="/orders" className='links'>Orders</Link>
        <Link to="/menu" className='links'>Menu</Link>
        <Link to="/users" className='links'>Users</Link>
        <Link to="/staff" className='links'>Staff</Link>
        <Link to="/userquery" className='links'>User Queries</Link>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>}
    </div>
  );
}

export default Header;
