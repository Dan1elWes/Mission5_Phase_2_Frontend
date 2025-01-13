import React from "react";
import zlogo from "../assets/images/zlogo.png";
import Variant2 from "../assets/images/Variant2.jpg";
import sharetank from "../assets/images/sharetank.jpg";
import HeroImage1 from "../assets/images/HeroImage1.jpg";
import trailerIcon from "../assets/images/trailer-icon.svg";
import carWashIcon from "../assets/images/car-wash-icon.svg";
import lpgIcon from "../assets/images/lpg-icon.svg";
import foodIcon from "../assets/images/food-icon.svg";
import evHomePlan from "../assets/images/ev-home-plan.svg";
import fuelBackPlan from "../assets/images/fuel-back-plan.svg";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const fuelPrices = [
    { type: "91", price: "2.89", color: "#ED550E" },
    { type: "95", price: "3.09", color: "#4A4A9C" },
    { type: "Diesel", price: "2.29", color: "#2A9D8F" },
    { type: "EV", price: "0.60", color: "#219653" }
  ];

  return (
    <div className="homepage">
      <HeaderMain />

      <main className="hero-section">
        <div className="hero-background" style={{ backgroundImage: `url(${HeroImage1})` }}>
          <div className="hero-content">
            <h1>Z is for<br />New Zealand</h1>
            <p>We're here to keep our communities<br />and whānau moving</p>
            <button className="find-out-more">
              Find out more&nbsp;|&nbsp;locate Z station 
              <span className="arrow">→</span>
            </button>
          </div>
          <div className="fuel-prices">
            {fuelPrices.map((fuel, index) => (
              <div 
                key={index} 
                className="price-tag"
                style={{ backgroundColor: fuel.color }}
              >
                <span className="fuel-type">{fuel.type}</span>
                <span className="fuel-price">${fuel.price}</span>
              </div>
            ))}
            <div className="distance">
              <span>2.5km</span>
            </div>
          </div>
        </div>
      </main>

      <section className="info-sections">
        <div className="power-home-section">
          <div className="content-wrapper">
            <div className="text-content">
              <h2>Power your home</h2>
              <p>Specialised home power plans to help keep your home and vehicle running, tailored for both EV and non-EV drivers.</p>
              <button className="find-out-more">
                Find out more
                <span className="arrow">→</span>
              </button>
            </div>
            <div className="icon-group">
              <div className="icon-item">
                <img src={evHomePlan} alt="EV home plan" />
                <span>EV home plan</span>
              </div>
              <div className="icon-item">
                <img src={fuelBackPlan} alt="Fuel back plan" />
                <span>Fuel back plan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          <h2>What you need, made easy</h2>
          <p>Moving furniture? Hungry for a pie and barista made coffee? Have a dirty car that needs some love? Come on in — we've got you covered!</p>
          <button className="products-services-btn" aria-label="View products and services">
            Products and services
            <span className="arrow">→</span>
          </button>
          
          <div className="services-grid">
            <div className="service-item">
              <img src={trailerIcon} alt="Trailer hire" />
              <span>Trailer hire</span>
              <button className="service-arrow" aria-label="Learn more about trailer hire">→</button>
            </div>
            <div className="service-item">
              <img src={carWashIcon} alt="Car wash" />
              <span>Car wash</span>
              <button className="service-arrow" aria-label="Learn more about car wash">→</button>
            </div>
            <div className="service-item">
              <img src={lpgIcon} alt="LPG bottle swap" />
              <span>LPG bottle swap</span>
              <button className="service-arrow" aria-label="Learn more about LPG bottle swap">→</button>
            </div>
            <div className="service-item">
              <img src={foodIcon} alt="Food and drink" />
              <span>Food and drink</span>
              <button className="service-arrow" aria-label="Learn more about food and drink">→</button>
            </div>
          </div>
        </div>
      </section>

      <section className="info-cards">
        <div className="info-card">
          <h3>Z Electric</h3>
          <p>Join the electric revolution with Z's charging network and EV solutions.</p>
          <button className="card-button" aria-label="Learn more about Z Electric">Learn More</button>
        </div>
        <div className="info-card">
          <h3>Z Business</h3>
          <p>Fuel solutions and business tools to keep your business moving forward.</p>
          <button className="card-button" aria-label="Learn more about Z Business">Learn More</button>
        </div>
        <div className="info-card">
          <h3>Z App</h3>
          <p>Download the Z App for exclusive deals and easy fuel payments.</p>
          <button className="card-button" aria-label="Learn more about Z App">Learn More</button>
        </div>
      </section>

      <section className="content-blocks">
        <div className="content-block">
          <div className="image-block">
            <img src={sharetank} alt="sharetank image" />
          </div>
          <div className="text-block">
            <h3>Sharetank</h3>
            <p>Sign up to Sharetank, the virtual fuel tank you can fill anytime, 
              anywhere and share with up to 5 friends or whānau.</p>
            <button className="content-button" aria-label="Learn more about Sharetank">Learn More</button>
          </div>
        </div>
      </section>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <img src={zlogo} alt="Z Energy Logo" />
            </Link>
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
                <li><Link to="/business-fuel-card">Z Business fuel card</Link></li>
                <li><Link to="/fuels-and-services">Fuels and services</Link></li>
                <li><Link to="/business-tips">Business tips and stories</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>About Z</h4>
              <ul>
                <li><Link to="/our-story">Our story</Link></li>
                <li><Link to="/our-people">Our people</Link></li>
                <li><Link to="/what-we-stand-for">What we stand for</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/careers">Careers at Z</Link></li>
                <li><Link to="/corporate">Corporate centre</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms of use</Link>
            <Link to="/fuel-safety">Fuel Safety Data Sheets</Link>
            <Link to="/investor">Investor relations</Link>
          </div>
          <div className="footer-copyright">
            <p> Z Energy Limited. All trademarks are used under license.</p>
          </div>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}