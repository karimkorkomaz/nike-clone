


import React, { useState } from "react";
import kbanner from "../Assets/kbanner.jpg"; 
import kidshoe from '../Assets/kidsairmax.jpg';
import ktech from '../Assets/ktech.jpg';
import kdrifit from '../Assets/kdrifit.jpg';
import kjordan from '../Assets/kidshoe.jpg';
import khoodie from '../Assets/khoodie.jpg';
import juniortee from '../Assets/juniortee.jpg';
import kairmax from '../Assets/kairmax.jpg';
import "../Styles/Men.css"; 

const Kids = () => {
  const [visibleCount, setVisibleCount] = useState(4);

 
  const shoeImg = kidshoe;
  const hoodieImg = ktech;
  const runningImg = kdrifit;

  const products = [
    {
      name: "Kids Air Jordan",
      category: " Lifestyle Shoes",
      price: "$120",
      image: kjordan,
    },
    {
      name: "Kids Sports Hoodie",
      category: "Hoodies & Jackets",
      price: "$65",
      image: khoodie,
    },
    {
      name: "Dri-FIT Junior Tee",
      category: "Training Clothing",
      price: "$30",
      image: juniortee,
    },
    {
      name: "Air Max Kids",
      category: "Lifestyle Shoes",
      price: "$85",
      image: kairmax,
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <main className="container">

        <header className="page-header">
          <h1>Kids Collection</h1>
          <p>Performance, comfort, and style for the next generation.</p>
        </header>

       
        <div className="featured-banner">
          <img src={kbanner} alt="Kids Banner" />
          <div className="featured-banner-content">
            <h2>Play All Day</h2>
            <p>Lightweight gear built for movement and fun.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

        
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

export default Kids;
