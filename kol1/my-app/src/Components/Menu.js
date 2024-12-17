import React from "react";
import { useLanguage } from "../contexts/LanguageContext"; // Use language context
import MenuItem from "./MenuItem"; // Import MenuItem component

const Menu = ({ onAddToCart }) => {
  const { language } = useLanguage(); // Get current language from context

  // Menu items data in different languages
  const menuItems = {
    en: [
      { name: "Burger", description: "A delicious beef burger with cheese.", price: 8.99, category: "Main Course" },
      { name: "Pizza", description: "Cheese and tomato pizza with a crispy crust.", price: 12.99, category: "Main Course" },
      { name: "Caesar Salad", description: "Crispy romaine lettuce with Caesar dressing.", price: 6.99, category: "Appetizer" },
      { name: "Ice Cream", description: "Creamy vanilla ice cream topped with chocolate sauce.", price: 4.99, category: "Dessert" },
      { name: "Pasta", description: "Spaghetti with marinara sauce and fresh basil.", price: 9.99, category: "Main Course" },
    ],
    es: [
      { name: "Hamburguesa", description: "Una deliciosa hamburguesa de carne con queso.", price: 8.99, category: "Plato Principal" },
      { name: "Pizza", description: "Pizza de queso y tomate con una corteza crujiente.", price: 12.99, category: "Plato Principal" },
      { name: "Ensalada César", description: "Lechuga romana crujiente con aderezo César.", price: 6.99, category: "Entrante" },
      { name: "Helado", description: "Helado de vainilla cremoso con salsa de chocolate.", price: 4.99, category: "Postre" },
      { name: "Pasta", description: "Espaguetis con salsa marinara y albahaca fresca.", price: 9.99, category: "Plato Principal" },
    ],
    fr: [
      { name: "Burger", description: "Un délicieux burger de bœuf avec du fromage.", price: 8.99, category: "Plat Principal" },
      { name: "Pizza", description: "Pizza au fromage et à la tomate avec une croûte croustillante.", price: 12.99, category: "Plat Principal" },
      { name: "Salade César", description: "Laitue romaine croquante avec une vinaigrette César.", price: 6.99, category: "Entrée" },
      { name: "Crème glacée", description: "Crème glacée à la vanille nappée de sauce au chocolat.", price: 4.99, category: "Dessert" },
      { name: "Pâtes", description: "Spaghetti avec sauce marinara et basilic frais.", price: 9.99, category: "Plat Principal" },
    ],
    de: [
      { name: "Burger", description: "Ein köstlicher Rindfleischburger mit Käse.", price: 8.99, category: "Hauptgericht" },
      { name: "Pizza", description: "Käse- und Tomatenpizza mit knusprigem Teig.", price: 12.99, category: "Hauptgericht" },
      { name: "Caesar Salat", description: "Crispy Romaine-Salat mit Caesar-Dressing.", price: 6.99, category: "Vorspeise" },
      { name: "Eiscreme", description: "Cremige Vanilleeiscreme mit Schokoladensauce.", price: 4.99, category: "Dessert" },
      { name: "Pasta", description: "Spaghetti mit Marinara-Sauce und frischem Basilikum.", price: 9.99, category: "Hauptgericht" },
    ],
    zh: [
      { name: "汉堡包", description: "一款美味的牛肉汉堡，配有奶酪。", price: 8.99, category: "主菜" },
      { name: "披萨", description: "奶酪和番茄披萨，带有脆皮。", price: 12.99, category: "主菜" },
      { name: "凯撒沙拉", description: "脆皮罗马生菜，配有凯撒沙拉酱。", price: 6.99, category: "前菜" },
      { name: "冰淇淋", description: "香草冰淇淋，上面撒上巧克力酱。", price: 4.99, category: "甜点" },
      { name: "意大利面", description: "意大利面配有番茄酱和新鲜的罗勒。", price: 9.99, category: "主菜" },
    ],
  };

  return (
    <div className="menu">
      <h2>Menu</h2>
      <p>Explore our delicious offerings!</p>

      {/* Displaying menu items based on selected language */}
      <div className="menu-list">
        {menuItems[language]?.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            onAddToCart={() => onAddToCart(item)} // Pass item to cart handler
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
