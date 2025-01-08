import React from "react";
import zlogo from "../assets/images/zlogo.png";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <HeaderMain />

      <main className="hero-section">
        <div className="hero-content">
          <h1>Z is for<br />New Zealand</h1>
          <p>We're here to keep our communities<br />and whānau moving</p>
        </div>
        <div className="hero-images">
          <img src="/hero-image-1.png" alt="Hero visual 1" />
          <img src="/hero-image-2.png" alt="Hero visual 2" />
        </div>
      </main>

      <section className="info-sections">
        <div className="info-block">
          <div className="text-content">
            <h2>Information Block 1</h2>
            <p>Description text goes here</p>
            <button className="info-button">Learn More</button>
          </div>
          <div className="image-pair">
            <img src="/info-image-1.png" alt="Info 1" />
            <img src="/info-image-2.png" alt="Info 2" />
          </div>
        </div>

        <div className="quick-links">
          <div className="link-item">
            <img src="/link-image-1.png" alt="Quick link 1" />
            <button className="arrow-button">→</button>
          </div>
          <div className="link-item">
            <img src="/link-image-2.png" alt="Quick link 2" />
            <button className="arrow-button">→</button>
          </div>
          <div className="link-item">
            <img src="/link-image-3.png" alt="Quick link 3" />
            <button className="arrow-button">→</button>
          </div>
          <div className="link-item">
            <img src="/link-image-4.png" alt="Quick link 4" />
            <button className="arrow-button">→</button>
          </div>
        </div>
      </section>

      <section className="info-cards">
        <div className="info-card">
          <h3>Card Title 1</h3>
          <p>Description text for the first information card goes here.</p>
          <button className="card-button">Learn More</button>
        </div>
        <div className="info-card">
          <h3>Card Title 2</h3>
          <p>Description text for the second information card goes here.</p>
          <button className="card-button">Learn More</button>
        </div>
        <div className="info-card">
          <h3>Card Title 3</h3>
          <p>Description text for the third information card goes here.</p>
          <button className="card-button">Learn More</button>
        </div>
      </section>

      <section className="content-blocks">
        <div className="content-block">
          <div className="image-block"></div>
          <div className="text-block">
            <h3>Content Title</h3>
            <p>Detailed description about this content section goes here.</p>
            <button className="content-button">Learn More</button>
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="zlogo.png" alt="Z Energy Logo" />
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Products and services</h4>
              <ul>
                <li><Link to="/at-the-station">At the station</Link></li>
                <li><Link to="/z-app">Z App</Link></li>
                <li><Link to="/rewards">Rewards and promotions</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>For businesses</h4>
              <ul>
                <li><Link to="/fleet-fuel-card">Z Business fuel card</Link></li>
                <li><Link to="/fleet-management">Fleet card services</Link></li>
                <li><Link to="/business-rewards">Business tips and tricks</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About Z</h4>
              <ul>
                <li><Link to="/our-story">Our story</Link></li>
                <li><Link to="/our-people">Our people</Link></li>
                <li><Link to="/sustainability">What we're doing</Link></li>
                <li><Link to="/investors">For investors</Link></li>
                <li><Link to="/careers">Careers at Z</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/corporate-news">Corporate news</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Connect us</h4>
              <div className="social-links">
                <a href="#" className="social-icon facebook">Facebook</a>
                <a href="#" className="social-icon twitter">Twitter</a>
                <a href="#" className="social-icon linkedin">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms of use</Link>
            <Link to="/site-map">Corporate Site Notice</Link>
          </div>
          <div className="footer-copyright">
            <p> Z Energy Limited and associated companies</p>
            <button className="theme-toggle">🌙</button>
          </div>
        </div>
      </footer>
    </div>
  );
}