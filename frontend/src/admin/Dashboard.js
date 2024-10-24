import React, { useState, useEffect } from 'react';
import Header from './Header';
import DashboardCards from './Dashboardcards';
import axios from "axios";
import { Pie } from 'react-chartjs-2'; // Import Pie component
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [dataCounts, setDataCounts] = useState({
    deliveredcount: 0,
    pendingcount: 0,
    cancelledcount: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const deliveredOrdersCount = await axios.get('http://localhost:8283/api/count/delivered');
        const pendingOrdersCount = await axios.get('http://localhost:8283/api/count/pending');
        const cancelledOrdersCount = await axios.get('http://localhost:8283/api/count/cancelled');

        const newCounts = {
          deliveredcount: deliveredOrdersCount.data.deliveredcount,
          pendingcount: pendingOrdersCount.data.pendingcount,
          cancelledcount: cancelledOrdersCount.data.cancelledcount,
        };
        console.log('Updated counts:', newCounts);
        setDataCounts(newCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const pieData = {
    labels: ['Pending Orders', 'Delivered Orders', 'Cancelled Orders'],
    datasets: [
      {
        label: 'Order Status',
        data: [
          dataCounts.pendingcount,
          dataCounts.deliveredcount,
          dataCounts.cancelledcount,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for the pie chart
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="canteen-management">
      <div className="main-content">
        {/* <Header /> */}
        <DashboardCards />
      </div>
      {/* Pie Chart */}
      <div className="pie-chart">
        <h2>Order Status Distribution</h2>
        <Pie data={pieData} /> {/* Render the pie chart */}
      </div>
    </div>
  );
}

export default Dashboard;
