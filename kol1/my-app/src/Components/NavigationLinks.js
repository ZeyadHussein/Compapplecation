// src/Components/NavigationLink.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation

const NavigationLink = ({ to, children }) => {
  return <li><Link to={to}>{children}</Link></li>;
};

export default NavigationLink;

