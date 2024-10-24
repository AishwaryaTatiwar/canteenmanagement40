import React from 'react';
import Header from './Header';
import DashboardCards from './Dashboardcards';

function Dashboard() {
  return (
    <div className="canteen-management">
      <div className="main-content">
        {/* <Header /> */}
        <DashboardCards />
      </div>
    </div>
  );
}

export default Dashboard;
