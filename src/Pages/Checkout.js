import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "../Styles/Checkout.css";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <main className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">

        {/* LEFT SIDE — FORM */}
        <div className="checkout-form">

          <h2>Shipping Information</h2>

          <form>
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required />

            <label>Email</label>
            <input type="email" placeholder="email@example.com" required />

            <label>Address</label>
            <input type="text" placeholder="123 Street Name" required />

            <label>City</label>
            <input type="text" placeholder="City" required />

            <label>Country</label>
            <input type="text" placeholder="Country" required />

            <label>Phone Number</label>
            <input type="text" placeholder="+961 70 123 456" required />

            <h2>Payment Method</h2>

            <div className="payment-options">
              <label>
                <input type="radio" name="payment" defaultChecked />
                Credit / Debit Card
              </label>

              <label>
                <input type="radio" name="payment" />
                Cash on Delivery
              </label>
            </div>

            <button className="place-order-btn">Place Order</button>
          </form>
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="summary-items">
            {cart.map((item) => (
              <div className="summary-card" key={item.id}>
                <img src={item.image_url} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>

{item.chosenSize && (
  <p className="summary-variation">Size: {item.chosenSize}</p>
)}

{item.chosenColor && (
  <p className="summary-variation">Color: {item.chosenColor}</p>
)}

<p>${item.price}</p>

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
