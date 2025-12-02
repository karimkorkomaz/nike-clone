import React, { useState, useEffect } from "react";
import "../Styles/Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    section: "",
    price: "",
    imageUrl: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploading(true);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/products", {
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

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    const res = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchProducts();
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* Add Product */}
      <h2 className="admin-section-title">Add Product</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <select
          name="section"
          value={form.section}
          onChange={handleChange}
          required
        >
          <option value="">Select Section</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button
          type="button"
          onClick={handleImageUpload}
          className="admin-submit-btn"
          disabled={!imageFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>

        {/* Auto-Filled After Upload */}
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

      {/* Product List */}
      <h2 className="admin-section-title">All Products</h2>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="admin-product-card">
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.category}</p>
            <p>${Number(p.price).toFixed(2)}</p>
            <p style={{ fontSize: "0.9rem", color: "#777" }}>({p.section})</p>

            <button
              className="delete-btn"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
