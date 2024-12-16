import React from "react";
import NavigationLinks from "./NavigationLinks"; // Corrected import
import Logo from "./Logo";
import NavUser from "./NavUser";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Logo />
      <ul className="navbar-links">
        <NavigationLinks to="/">Home</NavigationLinks>
        <NavigationLinks to="/signin">Sign In</NavigationLinks>
        <NavigationLinks to="/signup">Sign Up</NavigationLinks>
      </ul>
      <div className="navbar-right">
        <LanguageSelector />
        <NavUser />
      </div>
    </nav>
  );
};

export default Navbar;



