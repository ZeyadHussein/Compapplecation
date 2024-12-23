import React, { useState, useEffect } from "react";
import NavigationLinks from "./NavigationLinks";
import Logo from "./Logo";
import NavUser from "./NavUser";
import LanguageSelector from "./LanguageSelector";

const Navbar = ({ cart }) => {
  const [items, setItems] = useState([]);

  // Fetch items from API on component mount
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  // Handle Create Item
  const handleCreate = () => {
    // Redirect to create item page
    window.location.href = "/create-item";
  };

  // Handle Edit Item
  const handleEdit = (id) => {
    // Redirect to edit page for specific item
    window.location.href = `/edit-item/${id}`; // Fixed template literal
  };

  // Handle Delete Item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, { // Fixed template literal
        method: "DELETE",
      });
      if (response.ok) {
        setItems(items.filter((item) => item.id !== id)); // Remove deleted item from state
      } else {
        alert("Error deleting item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <Logo />

      {/* Navigation Links */}
      <ul className="navbar-links">
        <NavigationLinks to="/">Home</NavigationLinks>
        <NavigationLinks to="/menu">Menu</NavigationLinks>
        <NavigationLinks to="/table">Table</NavigationLinks> {/* Updated Link to Table */}
        <NavigationLinks to="/signin">Sign In</NavigationLinks>
        <NavigationLinks to="/signup">Sign Up</NavigationLinks>
      </ul>

      {/* CRUD Operations Section (View Items) */}
      <div className="navbar-right">
        <button onClick={handleCreate} className="crud-button">Review Tables</button>

        {/* Display Table Items */}
        <ul className="items-list">
          {items.map((item) => (
            <li key={item.id} className="item">
              <span>{item.name}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {/* User and Language Selector Section */}
        <LanguageSelector />
        <NavUser />

        {/* Cart with Icon and Count */}
        <div className="cart">
          <NavigationLinks to="/cart" className="cart-link">
            <div className="cart-icon">🛒</div>
            Cart
            <span className="cart-count">{cart.length}</span>
          </NavigationLinks>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
