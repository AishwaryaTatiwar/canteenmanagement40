import React, { useState,useEffect} from 'react';
import './Header.css'; // Ensure the styles are imported
import { Link ,useNavigate} from 'react-router-dom';
import axios from "axios";

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [error, setError] = useState(null);
  const decodeJwt = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};

const token = localStorage.getItem('token');
const adminId = decodeJwt(token)?.adminID;
const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('token'); // Remove token on logout
    navigate('/'); // Redirect to login
  };

const fetchAdminData = async () => {
  try {
      const response = await axios.get(`http://localhost:8283/api/admindetails/admin/${adminId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      const data = response.data;
      if (data.success) {
          setAdminName(data.data.name);
          setAdminEmail(data.data.email);
      } else {
          setError(data.message);
      }
  } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
  }
};
useEffect(() => {
  fetchAdminData();
}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  // Sample admin data
  // const adminData = {
  //   name: "Admin Name",
  //   email: "admin@example.com",
  // };

  return (
    <div className="header-container">
      {/* Header with Hamburger Icon */}
      <div className="header">
        <div className="toggle" onClick={toggleSidebar}>
          <span>&#9776;</span> {/* Hamburger icon */}
        </div>
        {/* <div><p>Smart Canteen Admin</p></div>
        <div className="notifi-button">🔔</div>
        <div className="profile-button" onClick={toggleProfileDropdown}>
          👤
        </div> */}
        <div className='headers'>
        <h4 onClick={toggleProfileDropdown} className="profile-button" >👤</h4>
        <h4 className='admin-heading'>Smart Canteen Admin</h4>
        </div>
        
        
        
        {/* Profile Dropdown */}
        {isProfileDropdownOpen && (
          <div className="profile-dropdown">
            <button className="close-dropdown" onClick={closeProfileDropdown}>
              &times; {/* Close Button */}
            </button>
            
            <div className="profile-info">
              <p>Name:{adminName}</p>
              <p>Email:{adminEmail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className={`sidebar1 ${isSidebarOpen ? 'open' : ''}`}>
        <div className="close-btn1" onClick={toggleSidebar}>
          &times;
        </div> {/* Close Button */}
        <div className='navigate'>
        {!isLoggedIn ? (
          <Link to="/" onClick={toggleSidebar}>Login or Signup</Link>
        ) : (
          <>
          <Link to="/Dashboard" className='links'>Dashboard</Link>
          <Link to="/orders" className='links'>Orders</Link>
          <Link to="/menu" className='links'>Menu</Link>
          <Link to="/users" className='links'>Users</Link>
          <Link to="/staff" className='links'>Staff</Link>
          <Link to="/userquery" className='links'>User Support/Help</Link>
          <button onClick={() => { toggleSidebar(); handleLogout(); }} >Logout</button>
          </>
        )}
          
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && <div className={`overlay ${isSidebarOpen ? 'show' : ''}`} onClick={toggleSidebar}></div>}
    </div>
  );
}

export default Header;
