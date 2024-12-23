import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import axios from 'axios';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  // console.log("Signing in with email:", email);
  // console.log("Signing in with phone:", phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            email,
            phone
        });

        if (response.status === 200) {
            alert(response.data.message);
            navigate('/home');
        } else {
            alert(response.data.message);
        }
    } catch (error) {
        if (error.response) {
            alert(error.response.data.message);
        } else {
            alert('An unexpected error occurred');
        }
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

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link> {/* Link to Sign Up */}
      </p>
    </div>
  );
};

export default SignIn;
