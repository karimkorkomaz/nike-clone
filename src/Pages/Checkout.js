import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Checkout.css";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ===============================
  // PLACE ORDER → SEND TO BACKEND
  // ===============================
  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        alert("You must be logged in.");
        return;
      }

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          total: total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("Order failed");
        return;
      }

      clearCart(); // empty the cart
      setOrderPlaced(true); // show success popup

    } catch (err) {
      console.error("Order error:", err);
      alert("Order failed due to server error.");
    }
  };

  // ===============================
  // SUCCESS POPUP
  // ===============================
  if (orderPlaced) {
    return (
      <div className="order-success-container">
        <div className="order-success-box">
          <h2>Order successfully placed!</h2>
          <p>Thank you for shopping with us.</p>

          <button className="view-orders-btn" onClick={() => navigate("/orders")}>
            View Order
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // CHECKOUT PAGE
  // ===============================
  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">

        {/* LEFT: FORM */}
        <div className="checkout-form">
          <h2>Shipping Information</h2>

          <form onSubmit={placeOrder}>
            <label>Full Name</label>
            <input type="text" required />

            <label>Email</label>
            <input type="email" required />

            <label>Address</label>
            <input type="text" required />

            <label>City</label>
            <input type="text" required />

            <label>Country</label>
            <input type="text" required />

            <label>Phone Number</label>
            <input type="text" required />

          <h2>Payment Method</h2>

          <div className="payment-options">
            <label className="payment-option">
              <input type="radio" name="payment" defaultChecked />
              <span>Credit / Debit Card</span>
            </label>

            <label className="payment-option">
              <input type="radio" name="payment" />
              <span>Cash on Delivery</span>
            </label>
          </div>


            <button className="place-order-btn" type="submit">
              Place Order
            </button>
          </form>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-card" key={item.id}>
                <img src={item.image_url} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>

                  {item.chosenSize && <p>Size: {item.chosenSize}</p>}
                  {item.chosenColor && <p>Color: {item.chosenColor}</p>}

                  <p>${Number(item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="checkout-total">Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </main>
  );
};

export default Checkout;