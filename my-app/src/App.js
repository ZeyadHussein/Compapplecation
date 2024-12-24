import React, { useState } from "react"; // Removed useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Menu from "./Components/Menu";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Reservation from "./Components/Reservation"; // Import your Reservation component
import Table from "./Components/Table";  // Import Table.js
import CrudPage from "./Components/CrudPage"; // Import the new CrudPage component
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Navbar cart={cart} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} onRemoveFromCart={removeFromCart} />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/table" element={<Table />} />
            <Route path="/crud" element={<CrudPage />} />  {/* New CRUD operations route */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;