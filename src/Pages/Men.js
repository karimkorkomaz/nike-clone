import React, { useState } from "react";
import "../Styles/Men.css";

import Unleash from "../Assets/Poster.jpg";
import Airmax from "../Assets/airmax.png";
import Tech from "../Assets/tech.jpg";
import Run from "../Assets/running.jpg";
import airforce from '../Assets/airforce.png';
import jordan from '../Assets/jordan1.png';
import drifit from '../Assets/drifit.png';
import jacket from '../Assets/jacket.png';
import cap from '../Assets/cap.jpg';
import bag from '../Assets/brasilia.png';
import vomero from '../Assets/vomero.png';
import jordan1 from '../Assets/jordan1.jpg';
// Static product data WITHOUT images
const staticProducts = [
  {
    name: "Nike Air Force",
    category: "Shoes",
    price: "$130",
    image: airforce  
  },
  {
    name: "Nike Air Jordan High",
    category: "Shoes",
    price: "$160",
    image: jordan 
  },
  {
    name: "Nike Dri-FIT Tee",
    category: "Clothing",
    price: "$35",
    image: drifit
  },
  {
    name: "Nike Jacket",
    category: "Clothing",
    price: "$70",
    image: jacket   
  },
  {
    name: "Nike Cap",
    category: "Accessories",
    price: "$25",
    image: cap   
  },
  {
    name: "Nike Bag",
    category: "Accessories",
    price: "$55",
    image: bag  
  },
  {
    name: "Nike Vomero",
    category: "Shoes",
    price: "$85",
    image: vomero  
  },
  {
    name: "Nike Air jordan Low",
    category: "Shoes",
    price: "$75",
    image: jordan1  
  }

];

const Men = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <>
      <main className="container">

        
        <header className="page-header">
          <h1>Men's Collection</h1>
          <p>Explore the latest in performance and style. Built for the modern athlete.</p>
        </header>

       
        <div className="featured-banner">
          <img src={Unleash} alt="Featured collection banner" />
          <div className="featured-banner-content">
            <h2>Unleash Your Potential</h2>
            <p>New arrivals engineered for peak performance and ultimate comfort. Discover what's new.</p>
            <a href="#" className="cta-button">Shop New Arrivals</a>
          </div>
        </div>

       
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

       
        <section>
          <h2 className="section-heading">Shop The Essentials</h2>

          <div className="product-grid">
            {staticProducts.slice(0, visibleCount).map((product, index) => (
              <div className="product-card" key={index}>
                
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="category">{product.category}</p>
                  <p className="price">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < staticProducts.length && (
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

export default Men;
