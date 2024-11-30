// import React, { useState } from 'react';
// import './MenuComponent.css';
// import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

// function MenuComponent({ url, title, price, onAddToCart }) {
//   const [isLiked, setIsLiked] = useState(false); // Track heart icon state

//   // Toggle heart color on click
//   const handleLike = () => {
//     setIsLiked(!isLiked);
//   };

//   return (
//     <div className="box">
//       <div className="image-container">
//         <img src={url} alt="food" />
//         <span className="heart-icon" onClick={handleLike}>
//           {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
//         </span>
//       </div>
//       <div className="details">
//         <div className="detailsPara">
//           <p className="food-title">{title}</p>
//           <p className="food-price">₹ {price}</p>
//         </div>
//         <button onClick={onAddToCart}>Add</button>
//       </div>
//     </div>
//   );
// }

// export default MenuComponent;


import React, { useState,useEffect} from 'react';
import './MenuComponent.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons
import axios from 'axios';

function MenuComponent({ url, title, price, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false); // Track heart icon state
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState(null);

  

  const decodeJwt = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
};

const token = localStorage.getItem('token');
const userId = decodeJwt(token)?.userID;


const fetchUserData = async () => {
  try {
      const response = await axios.get(`http://localhost:8283/api/user/${userId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      const data = response.data;
      if (data.success) {
          setUserEmail(data.data.email);
      } else {
          setError(data.message);
      }
  } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data');
  }
};

  // Toggle heart color on click
  const handleLike =async () => {
    setIsLiked(!isLiked);
    try {
      if (!isLiked) {
        // If item is liked, save to database
        const response = await axios.post('http://localhost:8283/api/favorites/add', {
          email: userEmail,
          item: {
            title,
            price,
            imageUrl: url,
          },
        });

        if (response.data.success) {
          console.log('Item added to favorites');
          alert(response.data.message);
        } else {
          console.error('Failed to add item to favorites');
        }
      } 
    } catch (error) {
      console.error('Error handling favorite action:', error);
    }
  };

  // Function to format the title: If it exceeds 14 characters, break into multiple lines
  const formatTitle = (title) => {
    if (title.length > 14) {
      return title.match(/.{1,14}/g).join('\n'); // Split every 14 characters
    }
    return title;
  };
  useEffect(() => {
    fetchUserData();
}, [userEmail]);

  return (
    <div className="box">
      <div className="image-container">
        <img src={url} alt="food" />
        <span className="heart-icon" onClick={handleLike}>
          {isLiked ? <FaHeart style={{ color: 'red' }} /> : <FaRegHeart />}
        </span>
      </div>
      <div className="details">
        <div className="detailsPara">
          {/* Use the formatTitle function to display title */}
          <p className="food-title">{formatTitle(title)}</p>
          <p className="food-price">₹ {price}</p>
        </div>
        <button onClick={onAddToCart}>Add</button>
      </div>
    </div>
  );
}

export default MenuComponent;
