import React, { useState, useEffect } from "react";
import "../Styles/Men.css";

import Unleash from "../Assets/Poster.jpg";
import Airmax from "../Assets/airmax.png";
import Tech from "../Assets/tech.jpg";
import Run from "../Assets/running.jpg";

const Men = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FILTER STATE
  const [filter, setFilter] = useState("all");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/products?section=men");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // FILTERED PRODUCTS LOGIC
  const filteredProducts =
    filter === "all"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === filter.toLowerCase()
        );

  return (
    <>
      <main className="container">

        {/* PAGE HEADER */}
        <header className="page-header">
          <h1>Men's Collection</h1>
          <p>Explore the latest in performance and style. Built for the modern athlete.</p>
        </header>

        {/* FEATURED BANNER */}
        <div className="featured-banner">
          <img src={Unleash} alt="Featured collection banner" />
          <div className="featured-banner-content">
            <h2>Unleash Your Potential</h2>
            <p>New arrivals engineered for peak performance and ultimate comfort. Discover what's new.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

        {/* TRENDING SECTION */}
        <section className="trending-section">
          <h2 className="section-heading">Trending Now</h2>

          <div className="trending-grid">
            <div className="trending-item">
              <img src={Airmax} alt="Trending Shoe 1" />
              <div className="trending-item-content">
                <h3>Air Max Dn</h3>
                <p>The next generation of Air technology.</p>
                <a href="#" className="shop-button">Shop Now</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={Tech} alt="Trending Clothing" />
              <div className="trending-item-content">
                <h3>Tech Fleece</h3>
                <p>Lightweight warmth, premium look.</p>
                <a href="#" className="shop-button">Explore Tech Fleece</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={Run} alt="Trending Running Gear" />
              <div className="trending-item-content">
                <h3>Running Essentials</h3>
                <p>Gear up for your best run yet.</p>
                <a href="#" className="shop-button">Shop Running</a>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID WITH FILTERS */}
        <section>
          <h2 className="section-heading">Shop The Essentials</h2>

          {/* FILTER BAR */}
          <div className="filter-bar">
            <button onClick={() => setFilter("all")}>All</button>
            <button onClick={() => setFilter("Shoes")}>Shoes</button>
            <button onClick={() => setFilter("Clothing")}>Clothing</button>
            <button onClick={() => setFilter("Accessories")}>Accessories</button>
          </div>

          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div className="product-grid">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image_url} alt={product.name} />

                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="category">{product.category}</p>
                      <p className="price">${Number(product.price).toFixed(2)}</p>
                      <button className="add-button">Add to cart</button>
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

export default Men;
