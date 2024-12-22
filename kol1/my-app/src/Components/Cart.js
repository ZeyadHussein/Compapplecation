import React, { useState } from "react";

const Cart = ({ cart, onRemoveFromCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Handle form submission (mock submission in this case)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment method selected:", paymentMethod);
    alert("Payment submitted!");
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <span className="cart-item-name">{item.name}</span> - 
                <span className="cart-item-price"> ${item.price.toFixed(2)}</span>
                {/* Remove Button */}
                <button 
                  className="remove-btn" 
                  onClick={() => onRemoveFromCart(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {/* Total Price */}
          <p className="total">
            Total: $
            {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </p>
        </div>
      )}

      {/* Payment Details Form */}
      <div className="payment-details">
        <h3>Payment Information</h3>
        <form onSubmit={handleSubmit}>
          {/* Payment Method Selection */}
          <div className="payment-methods">
            <label>Payment Method</label>
            <div className="payment-method-radio">
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="creditCard">Credit/Debit Card</label>

              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="paypal">PayPal</label>

              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
          </div>

          {/* If Credit/Debit Card is selected, show Card Details */}
          {paymentMethod === "creditCard" && (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Enter your card number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date  </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV  </label>
                <input
                  type="password"
                  id="cvv"
                  placeholder="Enter your CVV"
                  required
                />
              </div>
            </>
          )}

          {/* If PayPal is selected, you can add PayPal payment details if needed */}
          {paymentMethod === "paypal" && (
            <div className="form-group">
              <p>You will be redirected to PayPal for payment processing.</p>
            </div>
          )}

          {/* If Cash is selected, show cash-related instructions */}
          {paymentMethod === "cash" && (
            <div className="form-group">
              <p>You will pay in cash at the time of delivery/pickup.</p>
            </div>
          )}

          <button type="submit" className="pay-button">
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
