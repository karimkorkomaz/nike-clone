import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Styles/HeroCarousel.css"; 
import image1 from '../Assets/image1.jpg';
import image2 from '../Assets/image2.jpeg';
import image3 from '../Assets/image3.png';


const HomeCarousel = () => {
  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">

     
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img src={image1} className="d-block w-100" alt="slide 1" />
          <div className="carousel-caption middle-left">
            <h2>NIKE AIR MAX</h2>
            <p>Experience comfort and performance</p>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img src={image2} className="d-block w-100" alt="slide 2" />
          <div className="carousel-caption middle-left">
            <h2>EVERYONE WANTS A PAIR</h2>
            <p>Get yours at Nike.com</p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img src={image3} className="d-block w-100" alt="slide 3" />
          <div className="carousel-caption middle-left">
            <h2>JUST DO IT</h2>
            <p>Shop the latest releases now</p>
          </div>
        </div>

      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
      
    </div>
  );
};

export default HomeCarousel;
