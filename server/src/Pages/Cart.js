import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

import "../Styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, changeQty } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <main className="container">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-grid">
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <img src={item.image_url} alt={item.name} />

              <div className="cart-info">
  <h3>{item.name}</h3>
  
  {/* Show size & color if available */}
  {item.chosenSize && (
    <p className="cart-variation">Size: {item.chosenSize}</p>
  )}
  
  {item.chosenColor && (
    <p className="cart-variation">Color: {item.chosenColor}</p>
  )}

  <p>${item.price}</p>



                <div className="qty-controls">
                  <button onClick={() => changeQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, +1)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="total">Total: ${total.toFixed(2)}</h2>

      <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

    </main>
  );
};

export default Cart;
