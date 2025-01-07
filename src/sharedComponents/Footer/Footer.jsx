import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Products and Services</h3>
          <ul>
            <li>Electric Vehicles</li>
            <li>Charging Solutions</li>
            <li>Energy Plans</li>
            <li>Mobile App</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>For Businesses</h3>
          <ul>
            <li>Fleet Solutions</li>
            <li>Commercial Charging</li>
            <li>Partner Program</li>
            <li>Business Support</li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3>About Z</h3>
          <ul>
            <li>Our Story</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Contact Us</li>
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
