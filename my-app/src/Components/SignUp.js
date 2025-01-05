import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import axios from "axios";

const SignUp = ({ setLoggedIn }) => { // Accept setLoggedIn as a prop
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationPhoneNumber, setConfirmationPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if phone numbers match
    if (confirmationPhoneNumber !== phone) {
      setErrorMessage("Confirmation phone number does not match the original phone number!");
      return;
    }

    try {
      // Sending data to the backend for user creation
      const response = await axios.post('http://localhost:5000/api/addcustomer', {
        name: name,
        email: email,
        phone: phone
      });

      if (response.status === 200) {
        // If the signup is successful, save the token in localStorage
        localStorage.setItem('authToken', response.data.token);
        setLoggedIn(true); // Update the loggedIn state to true
        alert(response.data.message); // Show success message
        navigate('/home'); // Navigate to the home page after successful signup
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      // Handle errors that occur during the API request
      alert(error.response?.data?.message || 'An error occurred during sign up!');
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <input
          type="tel"
          placeholder="Enter confirmation phone number"
          value={confirmationPhoneNumber}
          onChange={(e) => setConfirmationPhoneNumber(e.target.value)}
          required
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error */}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link> {/* Link to Sign In */}
      </p>
    </div>
  );
};

export default SignUp;