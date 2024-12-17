import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing in with email:", email);
    console.log("Signing in with phone:", phone);
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