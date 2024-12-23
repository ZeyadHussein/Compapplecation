// MenuItem.js
import React from "react";

const MenuItem = ({ name, description, price, category, onAddToCart }) => {
  return (
    <div className="menu-item">
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">${price.toFixed(2)}</p>
      <p className="category">{category}</p>
      <button onClick={onAddToCart}>Add to Cart</button> {/* Button to add item to cart */}
    </div>
  );
};

export default MenuItem;
