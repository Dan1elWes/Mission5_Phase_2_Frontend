import React from 'react';
import styles from './Footer.module.css';
import zLogo from '../../assets/images/zlogo.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img src={zLogo} alt="Z Energy Logo" className={styles.footerLogo} />
        </div>
        <div className={styles.footerSections}>
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
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLinks}>
          <span>Privacy</span>
          <span>Terms Of Use</span>
          <span>Fuel Safety Data Sheets</span>
          <span>Investor Relations</span>
        </div>
        <p className={styles.trademark}>&copy; Z Energy Limited. All Trademarks Are Used Under License.</p>
      </div>
    </footer>
  );
};

export default Footer;
