import React, { useState, useEffect } from "react";
import "../Styles/Admin.css";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


const Admin = () => {
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    section: "",
    price: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // ==========================
  // FETCH PRODUCTS
  // ==========================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  // ==========================
  // FETCH ORDERS (ADMIN)
  // ==========================
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!Array.isArray(data)) {
        console.error("Orders API error:", data);
        setOrders([]);
        return;
      }

      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setOrders([]);
    }
  };

  // ==========================
  // FETCH CONTACT MESSAGES
  // ==========================
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        setMessages([]);
        return;
      }

      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchMessages();
  }, []);

  // ==========================
  // FORM CHANGE
  // ==========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==========================
  // IMAGE UPLOAD
  // ==========================
  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.imageUrl) {
      setForm({ ...form, imageUrl: data.imageUrl });
      alert("Image uploaded!");
    } else {
      alert("Upload failed");
    }
  };

  // ==========================
  // ADD PRODUCT
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Product added!");
      setForm({ name: "", category: "", section: "", price: "", imageUrl: "" });
      setImageFile(null);
      fetchProducts();
    } else {
      alert("Failed to add product");
    }
  };

  // ==========================
  // DELETE PRODUCT
  // ==========================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) fetchProducts();
    else alert("Failed to delete product");
  };

  // ==========================
  // DELETE MESSAGE
  // ==========================
  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) fetchMessages();
    else alert("Failed to delete message");
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ADD PRODUCT */}
      <h2 className="admin-section-title">Add Product</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <select name="section" value={form.section} onChange={handleChange} required>
          <option value="">Select Section</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required />

        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

        <button
          type="button"
          onClick={handleImageUpload}
          className="admin-submit-btn"
          disabled={!imageFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        <input
          name="imageUrl"
          placeholder="Image URL (auto-filled)"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <button type="submit" className="admin-submit-btn">
          Add Product
        </button>
      </form>

      {/* PRODUCTS */}
      <h2 className="admin-section-title">All Products</h2>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="admin-product-card">
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>${Number(p.price).toFixed(2)}</p>
            <p className="product-section">({p.section})</p>

            <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h2 className="admin-section-title">All Orders</h2>

      <div className="orders-admin-list">
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="admin-order-card">
              
              <h2 className="admin-order-title">Order #{order.id}</h2>
              <p className="admin-order-date">{order.created_at}</p>

              <p className="admin-order-total">
                <strong>Total:</strong> ${Number(order.total).toFixed(2)}
              </p>

              <p className="admin-order-user">
                <strong>User ID:</strong> {order.user_id}
              </p>

              <div className="admin-order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="admin-order-item-card">
                    
                    <h4 className="admin-item-name">{item.name || item.NAME}</h4>

                    <div className="admin-item-details">
                      <p><strong>Qty:</strong> {item.qty}</p>
                      {item.chosenSize && <p><strong>Size:</strong> {item.chosenSize}</p>}
                      {item.chosenColor && <p><strong>Color:</strong> {item.chosenColor}</p>}
                      <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>


      {/* MESSAGES */}
      <h2 className="admin-section-title">Messages</h2>
      <div className="messages-list">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message-card">
              <h3>{msg.name}</h3>
              <p><strong>Email:</strong> {msg.email}</p>
              <p className="message-text">{msg.message}</p>

              <button className="delete-btn" onClick={() => deleteMessage(msg.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;