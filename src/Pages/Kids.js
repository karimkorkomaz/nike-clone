import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import kbanner from "../Assets/kbanner.jpg";
import kidshoe from "../Assets/kidsairmax.jpg";
import ktech from "../Assets/ktech.jpg";
import kdrifit from "../Assets/kdrifit.jpg";

import "../Styles/Men.css";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


const Kids = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // TRENDING images
  const shoeImg = kidshoe;
  const hoodieImg = ktech;
  const runningImg = kdrifit;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/api/products?section=kids`
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Could not load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 4);

  // PRODUCT FILTER LOGIC
  const filteredProducts = products.filter((p) => {
    if (filter === "all") return true;

    const cat = (p.category || "").toLowerCase();

    if (filter === "Shoes") return cat.includes("shoe");
    if (filter === "Clothing")
      return (
        cat.includes("clothing") ||
        cat.includes("hoodie") ||
        cat.includes("jacket") ||
        cat.includes("tee") ||
        cat.includes("shirt") ||
        cat.includes("training")
      );
    if (filter === "Accessories") return cat.includes("access");

    return true;
  });

  return (
    <>
      <main className="container">
        {/* HEADER */}
        <header className="page-header">
          <h1>Kids Collection</h1>
          <p>Performance, comfort, and style for the next generation.</p>
        </header>

        {/* BANNER */}
        <div className="featured-banner">
          <img src={kbanner} alt="Kids banner" />
          <div className="featured-banner-content">
            <h2>Play All Day</h2>
            <p>Lightweight gear built for movement and fun.</p>
            <a href="#" className="cta-button">
              Shop New Arrivals
            </a>
          </div>
        </div>

        {/* TRENDING */}
        <section className="trending-section">
          <h2 className="section-heading">Trending For Kids</h2>

          <div className="trending-grid">
            <div className="trending-item">
              <img src={shoeImg} alt="Kids shoes" />
              <div className="trending-item-content">
                <h3>Kids Air Max</h3>
                <p>Soft cushioning for all-day play.</p>
                <a href="#" className="shop-button">
                  Shop Shoes
                </a>
              </div>
            </div>

            <div className="trending-item">
              <img src={hoodieImg} alt="Kids fleece" />
              <div className="trending-item-content">
                <h3>Kids Tech Fleece</h3>
                <p>Warm, lightweight, and cozy.</p>
                <a href="#" className="shop-button">
                  Explore Fleece
                </a>
              </div>
            </div>

            <div className="trending-item">
              <img src={runningImg} alt="Training essentials" />
              <div className="trending-item-content">
                <h3>Training Essentials</h3>
                <p>Clothing that moves with them.</p>
                <a href="#" className="shop-button">
                  Shop Training
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section>
          <h2 className="section-heading">Shop The Essentials</h2>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <button
              className={filter === "all" ? "active-filter" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>

            <button
              className={filter === "Shoes" ? "active-filter" : ""}
              onClick={() => setFilter("Shoes")}
            >
              Shoes
            </button>

            <button
              className={filter === "Clothing" ? "active-filter" : ""}
              onClick={() => setFilter("Clothing")}
            >
              Clothing
            </button>

            <button
              className={filter === "Accessories" ? "active-filter" : ""}
              onClick={() => setFilter("Accessories")}
            >
              Accessories
            </button>
          </div>

          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div className="product-grid">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div
                    className="product-card"
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={product.image_url} alt={product.name} />

                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="category">{product.category}</p>
                      <p className="price">
                        ${Number(product.price).toFixed(2)}
                      </p>
                      <button 
                                      className="add-button"
                                   onClick={() => {
                                    console.log("Product added:", product);
                                    addToCart(product);
                                   }}>

                                    Add to cart
                                              </button>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="load-more-container">
                  <button className="load-more-button" onClick={handleLoadMore}>
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Kids;