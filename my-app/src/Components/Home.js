import React from "react";
import { useLanguage } from "../contexts/LanguageContext"; // Import the language context

const Home = () => {
  const { language } = useLanguage(); // Get the current language from the context

  // Function to get the appropriate greeting message based on the selected language
  const getWelcomeMessage = () => {
    switch (language) {
      case "en":
        return "Welcome to Feastly!";
      case "es":
        return "¡Bienvenidos a Feastly!";
      case "fr":
        return "Bienvenue à Feastly!";
      case "de":
        return "Willkommen bei Feastly!";
      case "zh":
        return "欢迎来到Feastly!";
      default:
        return "Welcome to Feastly!";
    }
  };

  // Function to get the appropriate description based on the selected language
  const getDescriptionMessage = () => {
    switch (language) {
      case "en":
        return "Discover delicious meals and more!";
      case "es":
        return "¡Descubre deliciosas comidas y mucho más!";
      case "fr":
        return "Découvrez de délicieux repas et bien plus encore!";
      case "de":
        return "Entdecken Sie köstliche Mahlzeiten und mehr!";
      case "zh":
        return "发现美味的菜肴和更多内容！";
      default:
        return "Discover delicious meals and more!";
    }
  };

  return (
    <div className="home">
      <h1>{getWelcomeMessage()}</h1>
      <p>{getDescriptionMessage()}</p>
    </div>
  );
};

export default Home;