import React from "react";
import { useLanguage } from "../contexts/LanguageContext"; // Use language context

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage(); // Get language state and change function

  const handleChange = (e) => {
    changeLanguage(e.target.value);
    console.log("Selected language:", e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">Select Language: </label>
      <select id="language" value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="zh">中文</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
