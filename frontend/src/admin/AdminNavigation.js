import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import StaffPage from "./StaffPage";
import MenuPage from "./MenuPage";
import OrderDetails from "./OrderDetails";
import UsersPage from './UsersPage.js';
import AdminLogin from "./Adminlogin.js";
import AdminSignup from './Adminsignup.js';
import UserSupport from './Usersupport';

function AdminNavigation() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderDetails></OrderDetails>} />
        <Route path="/menu" element={<MenuPage></MenuPage>} />
        <Route path="/users" element={<UsersPage></UsersPage>} />
        <Route path="/staff" element={<StaffPage></StaffPage>} />
        <Route path="/userquery" element={<UserSupport></UserSupport>} />
        <Route path="/" element={<AdminLogin></AdminLogin>} />
        <Route path="/adminsignup" element={<AdminSignup></AdminSignup>} />
      </Routes>
    </Router>
  );
}

export default AdminNavigation;
