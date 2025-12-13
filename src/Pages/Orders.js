import React, { useState, useEffect } from "react";
import "../Styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const response = await fetch(
        `http://localhost:5000/api/orders/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <main className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order #{order.id}</h2>

              <p className="order-date">{order.created_at}</p>

              <p className="order-total">
                Total: ${Number(order.total).toFixed(2)}
              </p>

              <div className="order-items-container">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item-card">
                    <h4 className="order-item-name">{item.name || item.NAME}</h4>

                    <div className="order-item-details">
                      <p><strong>Qty:</strong> {item.qty}</p>

                      {item.chosenSize && (
                        <p><strong>Size:</strong> {item.chosenSize}</p>
                      )}

                      {item.chosenColor && (
                        <p><strong>Color:</strong> {item.chosenColor}</p>
                      )}

                      <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Orders;
