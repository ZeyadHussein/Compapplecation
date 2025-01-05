import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Using useNavigate to handle redirects

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        phone,
      });

      if (response.status === 200) {
        const { token } = response.data;  // Assuming response contains the token

        // Save the token to localStorage
        localStorage.setItem("authToken", token);

        // Trigger the onLogin function passed from App.js to update the loggedIn state
        onLogin(true);

        // Redirect to home after login
        navigate("/home");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default SignIn;