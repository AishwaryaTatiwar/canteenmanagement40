import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboardcards.css';
 // Import necessary chart elements

// Register the required components for Chart.js


function DashboardCards() {
  const [dataCounts, setDataCounts] = useState({
    menucount: 0,
    usercount: 0,
    deliveredcount: 0,
    pendingcount: 0,
    cancelledcount: 0,
    staffcount: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const usersCount = await axios.get('http://localhost:8283/api/users/count');
        const dishesCount = await axios.get('http://localhost:8283/api/menu/count');
        const deliveredOrdersCount = await axios.get('http://localhost:8283/api/count/delivered');
        const pendingOrdersCount = await axios.get('http://localhost:8283/api/count/pending');
        const cancelledOrdersCount = await axios.get('http://localhost:8283/api/count/cancelled');
        const staffs = await axios.get('http://localhost:8283/api/staff/count');

        const newCounts = {
          menucount: dishesCount.data.menucount,
          usercount: usersCount.data.usercount,
          deliveredcount: deliveredOrdersCount.data.deliveredcount,
          pendingcount: pendingOrdersCount.data.pendingcount,
          cancelledcount: cancelledOrdersCount.data.cancelledcount,
          staffcount: staffs.data.staffcount,
        };
        console.log('Updated counts:', newCounts);
        setDataCounts(newCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const cardsData = [
    { icon: '🍽️', count: dataCounts.menucount, title: 'Dishes' },
    { icon: '👤', count: dataCounts.usercount, title: 'Users' },
    { icon: '📦', count: dataCounts.deliveredcount, title: 'Delivered Orders' },
    { icon: '📃', count: dataCounts.pendingcount, title: 'Pending Orders' },
    { icon: '❌', count: dataCounts.cancelledcount, title: 'Cancelled Orders' },
    { icon: '👤', count: dataCounts.staffcount, title: 'Staff' },
  ];

  // Pie chart data
  

  return (
    <div className="dashboard-cards">
      {cardsData.map((card, index) => (
        <div className="card" key={index}>
          <span className="card-icon">{card.icon}</span>
          <div className="card-content">
            <h3>{card.count}</h3>
            <p>{card.title}</p>
          </div>
        </div>
      ))}

     
    </div>
  );
}

export default DashboardCards;
