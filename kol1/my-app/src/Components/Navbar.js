import React from "react";
import NavigationLinks from "./NavigationLinks"; // Corrected import
import Logo from "./Logo";
import NavUser from "./NavUser";
import LanguageSelector from "./LanguageSelector";

const Navbar = ({ cart }) => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <Logo />

      {/* Navigation Links */}
      <ul className="navbar-links">
        <NavigationLinks to="/">Home</NavigationLinks>
        <NavigationLinks to="/menu">Menu</NavigationLinks> {/* Added Menu Link */}
        <NavigationLinks to="/signin">Sign In</NavigationLinks>
        <NavigationLinks to="/signup">Sign Up</NavigationLinks>
      </ul>

      {/* User and Language Selector Section */}
      <div className="navbar-right">
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
