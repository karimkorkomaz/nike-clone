import React, { useState } from "react";
import wbanner from '../Assets/wbanner.jpg';
import airmax from '../Assets/airmax.png';
import wtech from '../Assets/womentech.jpg';
import wrun from '../Assets/wrunning.jpg';
import pegasus from '../Assets/pegasus.png';
import wdrifit from '../Assets/wdrifit.jpg';
import bliss from '../Assets/bliss.jpg';
import wleg from '../Assets/wleggings.jpg';
import wshort from '../Assets/wshorts.jpg';
import whair from '../Assets/whair.jpg';
import wblazer from '../Assets/wblazer.jpg';
import "../Styles/Men.css"; 

const Women = () => {
  const [visibleCount, setVisibleCount] = useState(4);

 
  const bannerImg = wbanner;
  const shoeImg = airmax;
  const hoodieImg = wtech;
  const runningImg = wrun;

 
  const products = [      //static products
    {
      name: "Nike Air Zoom Pegasus",
      category: "Running Shoes",
      price: "$160",
      image: pegasus,
    },
    {
      name: "Women's Tech Fleece Hoodie",
      category: "Hoodies & Jackets",
      price: "$120",
      image: wtech,
    },
    {
      name: "Dri-FIT Running Tee",
      category: "Training Clothing",
      price: "$45",
      image: wdrifit,
    },
    {
      name: "Air Max Bliss",
      category: "Lifestyle Shoes",
      price: "$95",
      image: bliss,
    },
    {
      name: "Sportswear Essential Leggings",
      category: "Lifestyle Clothing",
      price: "$55",
      image: wleg,
    },
    
    {
      name: "Sportswear Essential Shorts",
      category: "Shorts",
      price: "$45",
      image: wshort,
    },
    
    {
      name: "Nike Women's Headband",
      category: "Women's Accessories",
      price: "$30",
      image: whair,
    },
    {
      name: "Nike Women's Blazer Mid 77 Vintage",
      category: "Shoes",
      price: "$120",
      image: wblazer,
    }
        
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <main className="container">
        
        <header className="page-header">
          <h1>Women's Collection</h1>
          <p>Designed for confidence, comfort, and performance.</p>
        </header>

        <div className="featured-banner">
          <img src={bannerImg} alt="Women's Banner" />
          <div className="featured-banner-content">
            <h2>Move With Confidence</h2>
            <p>Engineered for all-day comfort whether you're training or on the go.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

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

        <section>
          <h2 className="section-heading">Shop The Essentials</h2>
          <div className="product-grid">
            {products.slice(0, visibleCount).map((product, i) => (
              <div className="product-card" key={i}>
                <img src={product.image} alt="" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
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
        </section>
      </main>

    </>
  );
};

export default Women;
