import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Food from "./FoodItems";
import MenuComponent from "./MenuComponent";
import Cart from "./Cart";
import specialsData from "./SpecialsData";
import TodaySpeciality from "./TodaySpeciality";
import "./Menu.css";
import axios from "axios";

function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [recommendations, setRecommendations] = useState([]); // State for recommendations
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [userName, setUserName] = useState(""); // State for storing the user's name
  const [error, setError] = useState(null); // State for handling errors

  const decodeJwt = (token) => {
    if (!token) return null;
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  };

  // Get the token from localStorage and decode it to extract userId
  // const token = localStorage.getItem("token");
  // const userId = decodeJwt(token)?.userID;
  const token = localStorage.getItem("token");
  const decodedToken = decodeJwt(token); // Define `decodedToken` here
  const userId = decodedToken?.userID;
  const userEmail = decodedToken?.email;

  const fetchUserName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8283/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include your token in the request
          },
        }
      );

      const data = response.data;
      if (data.success) {
        setUserName(data.data.name); // Set the user's name in the state
      } else {
        setError(data.message); // Handle error message
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
      setError("Failed to fetch user name");
    }
  };

  // const fetchRecommendations = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8283/api/recommendations${userEmail}",
  //       {
  //         orderData: cartItems.map((item) => ({ title: item.title })), // Assuming `item.title` is relevant for recommendations
  //       }
  //     );

  //     if (response.data) {
  //       setRecommendations(response.data); // Store the fetched recommendations
  //     }
  //   } catch (error) {
  //     console.error("Error fetching recommendations:", error);
  //     setError("Failed to fetch recommendations");
  //   }
  // };
  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8283/api/recommendations/aishwaryatatiwar@gmail.com`, // Correctly formatted URL
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authorization
          },
          params: {
            orderData: cartItems.map((item) => ({ title: item.title })), // Sending orderData as query params
          },
        }
      );

      console.log("Recommendations API Response:", response.data); // Log the response for debugging

      if (response.data.success) {
        setRecommendations(response.data.recommendedItems); // Store the fetched recommendations
      } else {
        setError("No recommendations available"); // Set error if the response is not successful
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserName();
    }
  }, [userId]);

  useEffect(() => {
    fetchRecommendations(); // Fetch recommendations when userEmail is available
  }, []);

  // useEffect(() => {
  //   if (cartItems.length > 0) {
  //     fetchRecommendations(); // Fetch recommendations whenever cartItems change
  //   }
  // }, [cartItems]);
  // Filter food by search query
  const filteredFood = Food.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add to cart and update the cart count
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Navigate to CartPage with the cart items
  const handleOrderNow = () => {
    navigate("/cart", { state: { cartItems } });
  };

  return (
    <div>
      <div className="top">
        <p>Hey {userName}, Good Afternoon!</p>
        <input
          type="text"
          className="search-bar"
          placeholder="Search food by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <TodaySpeciality specials={specialsData} />

      {/* Render menu items based on search or categories */}
      {searchQuery ? (
        <>
          <h3>Search Results</h3>
          <div className="menu-container">
            {filteredFood.length > 0 ? (
              filteredFood.map((item, index) => (
                <MenuComponent
                  key={index}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </>
      ) : (
        <>
          <h3>Recommended For You</h3>
          <div className="menu-container">
            {recommendations.length > 0 ? (
              recommendations.map((item, index) => (
                <MenuComponent
                  key={index}
                  title={item.title}
                  price={item.price}
                  url={
                    Food.find((foodItem) => foodItem.title === item.title)
                      ?.url || "#"
                  }
                  onAddToCart={() => handleAddToCart({ title: item })}
                />
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>

          {/* Indian category */}
          <h3>Indian</h3>
          <div className="menu-container">
            {Food.filter((item) => item.class === "Indian").map(
              (item, index) => (
                <MenuComponent
                  key={index}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )
            )}
          </div>

          {/* Italian category */}
          <h3>Italian</h3>
          <div className="menu-container">
            {Food.filter((item) => item.class === "Italian").map(
              (item, index) => (
                <MenuComponent
                  key={index}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )
            )}
          </div>

          {/* Chinese category */}
          <h3>Chinese</h3>
          <div className="menu-container">
            {Food.filter((item) => item.class === "Chinese").map(
              (item, index) => (
                <MenuComponent
                  key={index}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )
            )}
          </div>

          {/* South Indian category */}
          <h3>South-Indian</h3>
          <div className="menu-container">
            {Food.filter((item) => item.class === "South-Indian").map(
              (item, index) => (
                <MenuComponent
                  key={index}
                  url={item.url}
                  title={item.title}
                  price={item.price}
                  onAddToCart={() => handleAddToCart(item)}
                />
              )
            )}
          </div>
        </>
      )}
      <div className="last">
        <Cart cartCount={cartItems.length} />

        <button onClick={handleOrderNow} className="order-now-button">
          Order Now
        </button>
      </div>
    </div>
  );
}

export default Menu;
