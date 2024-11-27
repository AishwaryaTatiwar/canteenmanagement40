import React, { useState, useEffect } from 'react';
import './CrowdMonitor.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CrowdMonitoring = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHumanCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/human_count');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.human_count);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHumanCount();
  }, []);

  const totalSeats = 60;
  const occupancyPercentage = data ? ((data / totalSeats) * 100).toFixed(0) : 0;

  const getColor = () => {
    if (occupancyPercentage <= 25) return 'green';
    if (occupancyPercentage <= 60) return 'yellow';
    return 'red';
  };

  const getCrowdImage = () => {
    if (occupancyPercentage <= 25) {
      return {
        src: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png',
        alt: 'Lightly Crowded',
        label: 'Lightly Crowded',
      };
    } else if (occupancyPercentage <= 60) {
      return {
        src: 'https://media.istockphoto.com/id/1158561473/vector/three-persons-icon-black-vector.jpg?s=612x612&w=0&k=20&c=UvL4Nvz9nL4zi5RdjAabosuFer98suMTA-FheZ2KLlQ=',
        alt: 'Medium Crowded',
        label: 'Medium Crowded',
      };
    } else {
      return {
        src: 'https://cdn-icons-png.flaticon.com/512/3064/3064175.png',
        alt: 'Heavily Crowded',
        label: 'Heavily Crowded',
      };
    }
  };

  const chartData = {
    labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
    datasets: [
      {
        label: 'Crowd Occupancy',
        data: [80, 90, 70, 50, 40, 40, 20, 5, 0, 0],
        backgroundColor: '#FF5733',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Crowd Occupancy Over Time',
      },
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuad',
    },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const crowdImage = getCrowdImage();

  return (
    <div className="crowd-monitor-containerz">
      <header className="headerz">
        <h1>
          Your <span className="highlight">Crowd</span> Monitor
        </h1>
        <p>Helps you analyze crowd from your location and saves your time !!</p>
      </header>

      <div className="content">
        <div className="main-contentz">
          {/* Histogram */}
          <div className="histogram-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

          {/* Circular Loader */}
          <div
            className="circle-containerz"
            style={{
              borderColor: getColor(),
              maxWidth: '300px',
              height: '300px',
              marginTop: '40px', 
              marginLeft: '200px',
              borderRadius: '100%',
            }}
          >
            <div className="circle">
              <div className="percentage" style={{ color: getColor() }}>
                {occupancyPercentage}%
              </div>
              <div className="text">space occupied</div>
            </div>
          </div>
        </div>

        <div className='Left'>
          <div className="human-count">
            <p>Number of Humans Detected: {data}</p>
          </div>

          <div className="crowd-icon">
            <img src={crowdImage.src} alt={crowdImage.alt} />
            <span>{crowdImage.label}</span>
          </div>
        </div>
        
      </div>

      <footer className="footer">
        <p>Predictions may not be fully accurate, made based on previous data.</p>
      </footer>
    </div>
  );
};

export default CrowdMonitoring;
