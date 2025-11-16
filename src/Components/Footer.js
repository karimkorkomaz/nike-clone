import React  from "react";
import '../Styles/Footer.css'


const Footer = () => {
    return(
        <div>
            
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-grid">


            <div className="footer-column">
              <h4>GET HELP</h4>
              <ul>
               
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>ABOUT NIKE</h4>
              <ul>
                <li><a href="#">News</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Investors</a></li>
                <li><a href="#">Sustainability</a></li>
              </ul>
            </div>

            <div className="footer-column footer-socials-container">
              <div className="footer-socials"></div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Nike, Inc. All Rights Reserved </p>
            
          </div>
        </div>
      </footer>
        </div>
    )
}
export default Footer;