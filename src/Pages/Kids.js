import React, { useState, useEffect } from "react";
import kbanner from "../Assets/kbanner.jpg";
import kidshoe from '../Assets/kidsairmax.jpg';
import ktech from '../Assets/ktech.jpg';
import kdrifit from '../Assets/kdrifit.jpg';
import "../Styles/Men.css";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shoeImg = kidshoe;
  const hoodieImg = ktech;
  const runningImg = kdrifit;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/products?section=kids");

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

  return (
    <>
      <main className="container">

        {/* PAGE HEADER */}
        <header className="page-header">
          <h1>Kids Collection</h1>
          <p>Performance, comfort, and style for the next generation.</p>
        </header>

        {/* FEATURED BANNER */}
        <div className="featured-banner">
          <img src={kbanner} alt="Kids Banner" />
          <div className="featured-banner-content">
            <h2>Play All Day</h2>
            <p>Lightweight gear built for movement and fun.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

        {/* TRENDING */}
        <section className="trending-section">
          <h2 className="section-heading">Trending For Kids</h2>
          <div className="trending-grid">

            <div className="trending-item">
              <img src={shoeImg} alt="" />
              <div className="trending-item-content">
                <h3>Kids Air Max</h3>
                <p>Soft cushioning for all-day play.</p>
                <a href="#" className="shop-button">Shop Shoes</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={hoodieImg} alt="" />
              <div className="trending-item-content">
                <h3>Kids Tech Fleece</h3>
                <p>Warm, lightweight, and cozy.</p>
                <a href="#" className="shop-button">Explore Fleece</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={runningImg} alt="" />
              <div className="trending-item-content">
                <h3>Training Essentials</h3>
                <p>Clothing that moves with them.</p>
                <a href="#" className="shop-button">Shop Training</a>
              </div>
            </div>

          </div>
        </section>

        {/* PRODUCT GRID */}
        <section>
          <h2 className="section-heading">Shop The Essentials</h2>

          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <>
              <div className="product-grid">
                {products.slice(0, visibleCount).map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image_url} alt={product.name} />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="category">{product.category}</p>
                      <p className="price">${Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {visibleCount < products.length && (
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
