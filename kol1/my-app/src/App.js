import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext"; // Import the LanguageProvider
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Menu from "./Components/Menu"; // Import Menu component
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  // Load language preference from localStorage on initial load
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      // Set the language in the document or in state as needed
      document.documentElement.lang = savedLanguage; // This can help with SEO
    }
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          {/* Navbar */}
          <Navbar />

          {/* Main Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/menu" element={<Menu />} /> {/* Added Menu Route */}
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
