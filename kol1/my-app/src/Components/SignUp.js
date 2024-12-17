import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize navigation hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that confirmation code matches phone
    if (confirmationCode !== phone) {
      setErrorMessage("Confirmation code does not match the phone number!");
      return;
    }

    // Clear error message
    setErrorMessage("");

    // Log success and redirect to home page
    console.log(
      "Signing up with email:",
      email,
      "phone:",
      phone,
      "and confirmation code:",
      confirmationCode
    );

    navigate("/home"); // Redirect to Home page
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
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
        <input
          type="text"
          placeholder="Enter confirmation code"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
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
