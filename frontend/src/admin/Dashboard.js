import React, { useState, useEffect } from 'react';
import Header from './Header';
import DashboardCards from './Dashboardcards';
import axios from "axios";
import { Pie, Bar } from 'react-chartjs-2'; // Import Bar chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'; // Import necessary chart.js components
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale); // Register BarChart elements

function Dashboard() {
  const [dataCounts, setDataCounts] = useState({
    deliveredcount: 0,
    pendingcount: 0,
    cancelledcount: 0,
  });
  const [timePeriod, setTimePeriod] = useState('day'); // Default to 'day'
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
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
        setDataCounts(newCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchChartData() {
      try {
        const response = await axios.get(`http://localhost:8283/api/time/${timePeriod}`);
        
        if (timePeriod === 'day') {
          setChartData({
            labels: response.data.map(order => `${order.hour}:00`),
            data: response.data.map(order => order.count),
          });
        } else if (timePeriod === 'week') {
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          setChartData({
            labels: response.data.map(order => daysOfWeek[order.dayOfWeek - 1]),
            data: response.data.map(order => order.count),
          });
        } else if (timePeriod === 'month') {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          setChartData({
            labels: response.data.map(order => months[order.month - 1]),
            data: response.data.map(order => order.count),
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }

    fetchChartData();
  }, [timePeriod]); // Re-fetch data when timePeriod changes

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
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: timePeriod === 'day' ? 'Time (Hours)' : timePeriod === 'week' ? 'Days' : 'Months',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Delivered Orders',
        },
        min: 0, // Ensures that the Y-axis starts at 0
        ticks: {
          stepSize: 10, // Defines the interval for Y-axis ticks (10, 20, 30, 40, 50, etc.)
        },
      },
    },
  };


  return (
    <div>
      <div className='canteen-management'>
      <div className="main-content">
        <DashboardCards />
      </div>
      {/* Pie Chart */}
      <div className="pie-chart">
        <h2>Order Status Distribution</h2>
        <Pie data={pieData} /> {/* Render the pie chart */}
      </div>
      {/* Time Period Dropdown */}
      </div>
      <div className="time-period-selector">
        <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>
     
      {/* Orders Chart based on Time Period */}
      <div className="orders-chart">
        <h2>Orders Delivered ({timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)})</h2>
        <Bar 
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: `Delivered Orders by ${timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}`,
                data: chartData.data,
                backgroundColor: '#FFA500',
                borderColor: '#FF8C00',
                borderWidth: 1,
              },
            ],
          }} 
          options={chartOptions} 
        /> {/* Render the Bar chart */}
      </div>
    </div>
  );
}

export default Dashboard;
