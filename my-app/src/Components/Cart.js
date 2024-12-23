import React, { useState } from "react";
import axios from "axios";

const Cart = ({ cart, onRemoveFromCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [orderId, setOrderId] = useState(""); // Order ID input state
  const [payAmount, setPayAmount] = useState(""); // Payment amount input state
  const [payDate, setPayDate] = useState(""); // Payment date input state

  // Handle form submission (send payment data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      order_id: orderId,
      pay_type: paymentMethod,
      pay_date: payDate,
      pay_amount: payAmount,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/adpayment", paymentData);
      console.log("Payment successful:", response.data);
      alert("Payment submitted successfully!");
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Error submitting payment.");
    }
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
            Total: $ {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </p>
        </div>
      )}

      {/* New Payment Details Form */}
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

          {/* If PayPal is selected, show PayPal details */}
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

          {/* Order ID and Payment Amount Inputs */}
          <div className="form-group">
            <label htmlFor="orderId">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payAmount">Amount</label>
            <input
              type="text"
              id="payAmount"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payDate">Payment Date</label>
            <input
              type="date"
              id="payDate"
              value={payDate}
              onChange={(e) => setPayDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="pay-button">
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
