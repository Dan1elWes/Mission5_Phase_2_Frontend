import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Products and Services</h3>
          <ul>
            <li>At the Station</li>
            <li>Z App</li>
            <li>Rewards and Promotions</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>For Businesses</h3>
          <ul>
            <li>Z Business Fuel Card</li>
            <li>Fuels and Services</li>
            <li>Business Tips and Stories</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>About Z</h3>
          <ul>
            <li>Our Story</li>
            <li>Our People</li>
            <li>What We Stand For</li>
            <li>Sustainability</li>
            <li>News</li>
            <li>Careers At Z</li>
            <li>Corporate Centre</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 Z Energy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
