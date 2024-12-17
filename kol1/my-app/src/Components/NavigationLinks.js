// src/Components/NavigationLink.js
import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ to, children }) => {
  return (
    <li>
      <Link to={to} style={{ textDecoration: "none" }}>
        <button className="nav-button">{children}</button>
      </Link>
    </li>
  );
};

export default NavigationLink;



