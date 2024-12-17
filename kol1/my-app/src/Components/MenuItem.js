// MenuItem.js
import React from "react";

const MenuItem = ({ name, description, price, category }) => {
  return (
    <div className="menu-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
      <p className="category">{category}</p>
    </div>
  );
};

export default MenuItem;

