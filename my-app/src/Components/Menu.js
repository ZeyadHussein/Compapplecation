import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import MenuItem from './MenuItem';

const Menu = ({ onAddToCart }) => {
  const { language } = useLanguage();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/menuitems?lang=${language}`); // Use backticks
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();

        // Sanitize menu items to ensure item_price is a valid number
        const sanitizedMenuItems = data.map((item) => ({
          ...item,
          item_price: typeof item.item_price === 'number' ? item.item_price : 0,
        }));
        setMenuItems(sanitizedMenuItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [language]);

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="menu">
      <h2>Menu</h2>
      <div className="menu-list">
        {menuItems.map((item) => (
          <MenuItem
            key={item.menuitem_id}
            name={item.item_name}
            description={item.item_description}
            price={item.item_price || 0}
            category={item.category || 'Uncategorized'}
            onAddToCart={() => onAddToCart(item)} // Pass item to the parent
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
