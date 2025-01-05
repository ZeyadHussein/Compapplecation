import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for programmatic navigation
import NavigationLinks from "./NavigationLinks";
import Logo from "./Logo";
import NavUser from "./NavUser";
import LanguageSelector from "./LanguageSelector";

const Navbar = ({ cart, loggedIn, onLogout }) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

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

  // Handle Edit Item
  const handleEdit = (id) => {
    navigate(`/crud/edit/${id}`); // Use navigate to redirect to the edit page (corrected template string)
  };

  // Handle Delete Item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, { // Corrected template string
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

  const handleLogout = () => {
    onLogout();
    navigate("/signin"); // After logout, navigate to SignIn page
  };

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <Logo />

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <NavigationLinks to="/">Home</NavigationLinks>
        </li>
        <li>
          <NavigationLinks to="/menu">Menu</NavigationLinks>
        </li>
        <li>
          <NavigationLinks to="/table">Table</NavigationLinks>
        </li>
        <li>
          <NavigationLinks to="/crud">CRUD Operations</NavigationLinks>
        </li>
        {!loggedIn ? (
          <>
            <li>
              <NavigationLinks to="/signin">Sign In</NavigationLinks>
            </li>
            <li>
              <NavigationLinks to="/signup">Sign Up</NavigationLinks>
            </li>
          </>
        ) : (
          <li>
            <Link to="#" onClick={handleLogout} className="logout-link">
              Logout
            </Link>
          </li>
        )}
      </ul>

      {/* Right-Side Section */}
      <div className="navbar-right">
        {/* CRUD Operations Section */}
        {loggedIn && (
          <div className="items-list">
            <ul>
              {items.map((item) => (
                <li key={item.id} className="item">
                  <span>{item.name}</span>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* User and Language Selector */}
        <LanguageSelector />
        <NavUser />

        {/* Cart Section */}
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
