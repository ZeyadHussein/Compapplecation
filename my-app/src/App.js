import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Reservation from "./Components/Reservation"; // Import your Reservation component
import Table from "./Components/Table"; // Import Table.js
import CrudPage from "./Components/CrudPage"; // Import the new CrudPage component
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Token validation logic
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get("http://localhost:5001/validate-token", {
          headers: { Authorization: `Bearer ${token}` }, // Corrected template string
        })
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          setLoggedIn(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setLoggedIn(false);
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navbar cart={cart} loggedIn={loggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/signin"
              element={
                loggedIn ? <Navigate to="/home" /> : <SignIn onLogin={() => setLoggedIn(true)} />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setLoggedIn={setLoggedIn} />} // Pass setLoggedIn here
            />
            <Route
              path="/menu"
              element={loggedIn ? <Menu onAddToCart={addToCart} /> : <Navigate to="/signin" />}
            />
            <Route
              path="/cart"
              element={
                loggedIn ? <Cart cart={cart} onRemoveFromCart={removeFromCart} /> : <Navigate to="/signin" />
              }
            />
            <Route
              path="/reservation"
              element={loggedIn ? <Reservation /> : <Navigate to="/signin" />}
            />
            <Route path="/table" element={loggedIn ? <Table /> : <Navigate to="/signin" />} />
            <Route path="/crud" element={loggedIn ? <CrudPage /> : <Navigate to="/signin" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
