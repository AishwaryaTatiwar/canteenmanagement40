import React, { useState, useEffect } from "react";
import "./Menu.css";
import axios from "axios"; // Import axios for API calls

function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("North Indian");
  const [menuItems, setMenuItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    _id: null,
    name: "",
    price: "",
    ingredients: "",
    image: "",
    category: selectedCategory,
  });

  // Fetch menu items from the database when the component mounts
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:8283/api/menu");
        setMenuItems(response.data); // Assuming response.data contains the menu items
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddItem = () => {
    setModalVisible(true);
    setNewItem({
      _id: null,
      name: "",
      price: "",
      ingredients: "",
      image: "",
      category: selectedCategory,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !newItem.name ||
      !newItem.price ||
      !newItem.ingredients ||
      !newItem.image
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (newItem._id) {
        // If _id exists, update the item
        const response = await axios.put(
          `http://localhost:8283/api/updateditem/menu/${newItem._id}`,
          {
            name: newItem.name,
            image: newItem.image,
            category: newItem.category,
            price: newItem.price,
            ingredients: newItem.ingredients,
          }
        );
        alert(response.data.message);
      } else {
        // Else, create a new item
        const response = await axios.post("http://localhost:8283/api/menu", {
          name: newItem.name,
          image: newItem.image,
          category: newItem.category,
          price: newItem.price,
          ingredients: newItem.ingredients,
        });
        alert(response.data.message);
      }

      const updatedMenu = await axios.get("http://localhost:8283/api/menu");
      setMenuItems(updatedMenu.data); // Update menuItems with the newly added or updated item
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      console.error("There was an error adding/updating the item:", error);
    }
  };

  const handleUpdateItem = (id) => {
    const itemToUpdate = menuItems.find((item) => item._id === id);
    setNewItem(itemToUpdate); // Set the item details in the form
    setModalVisible(true);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8283/api/menu/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("There was an error removing the item:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const closeModal = () => {
    setModalVisible(false);
    setNewItem({
      _id: null,
      name: "",
      price: "",
      ingredients: "",
      image: "",
      category: selectedCategory,
    });
  };

  return (
    <div className="menu-management">
      <div className="head-menu">
        <div className="headerMenu">
          <button className="add-item-button" onClick={handleAddItem}>
            +Add item
          </button>
        </div>

        <div className="menu-category">
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="North Indian">North Indian</option>
            <option value="South Indian">South Indian</option>
            <option value="Beverages">Chinese</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{newItem._id ? "Update Item" : "Add New Item"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={newItem.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newItem.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients"
                value={newItem.ingredients}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newItem.image}
                onChange={handleInputChange}
                required
              />
              <select
                name="category"
                value={newItem.category}
                onChange={handleInputChange}
              >
                <option value="North Indian">North Indian</option>
                <option value="South Indian">South Indian</option>
                <option value="Beverages">Chinese</option>
                <option value="Italian">Italian</option>
              </select>
              <button type="submit">
                {newItem._id ? "Update Item" : "Add Item"}
              </button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="menu-table">
        <thead>
          <tr>
            <th>Sr.no</th>
            <th>Item name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Ingredients</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                </td>
                <td>Rs.{item.price}</td>
                <td>{item.ingredients}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={() => handleUpdateItem(item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuPage;
