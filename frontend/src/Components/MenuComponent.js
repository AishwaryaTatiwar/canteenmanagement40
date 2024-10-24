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


import React, { useState } from 'react';
import './MenuComponent.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

function MenuComponent({ url, title, price, onAddToCart }) {
  const [isLiked, setIsLiked] = useState(false); // Track heart icon state

  // Toggle heart color on click
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  // Function to format the title: If it exceeds 14 characters, break into multiple lines
  const formatTitle = (title) => {
    if (title.length > 14) {
      return title.match(/.{1,14}/g).join('\n'); // Split every 14 characters
    }
    return title;
  };

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
