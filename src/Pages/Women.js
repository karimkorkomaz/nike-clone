import React, { useState, useEffect } from "react";
import wbanner from '../Assets/wbanner.jpg';
import airmax from '../Assets/airmax.png';
import wtech from '../Assets/womentech.jpg';
import wrun from '../Assets/wrunning.jpg';
import "../Styles/Men.css"; 



const Women = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const bannerImg = wbanner;
  const shoeImg = airmax;
  const hoodieImg = wtech;
  const runningImg = wrun;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/products?section=women");

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
    setVisibleCount(prev => prev + 4);
  };

  // Filter logic: broad groups (Shoes / Clothing / Accessories)
  const filteredProducts = products.filter((p) => {
    if (filter === "all") return true;
    const cat = (p.category || "").toLowerCase();

    if (filter === "Shoes") {
      return cat.includes("shoes");
    }
    if (filter === "Clothing") {
      return (
        cat.includes("clothing") ||
        cat.includes("hoodies") ||
        cat.includes("jackets") ||
        cat.includes("shorts") ||
        cat.includes("fleece") ||
        cat.includes("shirts")
      );
    }
    if (filter === "Accessories") {
      return cat.includes("accessories");
    }

    return true;
  });

  return (
    <>
      <main className="container">
        
        {/* HEADER */}
        <header className="page-header">
          <h1>Women's Collection</h1>
          <p>Designed for confidence, comfort, and performance.</p>
        </header>

        {/* BANNER */}
        <div className="featured-banner">
          <img src={bannerImg} alt="Women's Banner" />
          <div className="featured-banner-content">
            <h2>Move With Confidence</h2>
            <p>Engineered for all-day comfort whether you're training or on the go.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

        {/* TRENDING */}
        <section className="trending-section">
          <h2 className="section-heading">Trending for Women</h2>
          <div className="trending-grid">
            <div className="trending-item">
              <img src={shoeImg} alt="" />
              <div className="trending-item-content">
                <h3>Nike Air Max Bliss</h3>
                <p>Cushioning that moves with you.</p>
                <a href="#" className="shop-button">Shop Shoes</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={hoodieImg} alt="" />
              <div className="trending-item-content">
                <h3>Women's Tech Fleece</h3>
                <p>Premium warmth, lightweight feel.</p>
                <a href="#" className="shop-button">Explore Fleece</a>
              </div>
            </div>

            <div className="trending-item">
              <img src={runningImg} alt="" />
              <div className="trending-item-content">
                <h3>Run Essentials</h3>
                <p>Built for every step of your journey.</p>
                <a href="#" className="shop-button">Shop Running</a>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS + FILTERS */}
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

export default Women;
