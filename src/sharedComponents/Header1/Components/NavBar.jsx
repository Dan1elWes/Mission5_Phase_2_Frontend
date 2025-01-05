import React, { useState } from "react";
import styles from "../styles/NavBar.module.css";
import { NavLink, Link } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <Link to="/">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/74636c578b292d9b24050900286a5fa9c3c269b92b94b3ede804d92f78260fd8?apiKey=f1e955cb66494e36a9a2064626167bd8&"
            className={styles.logo}
            alt="Company logo"
          />
        </Link>
        <button className={styles.hamburger} onClick={toggleMenu}>
          ☰
        </button>
        <div className={styles.buttonGroup}>
          <button className={styles.personalButton}>For personal</button>
          <button className={styles.businessButton}>For business</button>
        </div>
      </div>
      <div
        className={`${styles.navSection} ${isMenuOpen ? styles.showMenu : ""}`}
      >
        <div className={styles.infoGroup}>
          <span className={styles.zAppButton}>Z App</span>
          <span className={styles.aboutZButton}>About Z</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/e3a8447b8e716bc3e41aec5e8956bdd97eb96aef8cc7c7c857c4bc66544f46b7?apiKey=f1e955cb66494e36a9a2064626167bd8&"
            className={styles.navIcon}
            alt="Navigation icon"
          />
          <div className={styles.loginButton}>
            <span>Login</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/6eee6048-ed91-4f9b-8db2-e861e9721cc0?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              className={styles.userIcon}
              alt="User icon"
            />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div className={styles.mobileMenu}>
            <div className={styles.buttonGroup}>
              <button className={styles.personalButton}>For personal</button>
              <button className={styles.businessButton}>For business</button>
            </div>
            <div className={styles.menuItems}>
              <div className={styles.menuItem}>At the station</div>
              <div className={styles.menuItem}>Power</div>
              <div className={styles.menuItem}>Rewards and promotions</div>
              <div className={styles.menuItem}>Z App</div>
              <div className={styles.menuItem}>About Z</div>
              <NavLink to="/locate-z-station" className={styles.navLink}>
                <button className={styles.locateButton}>
                  Locate Z Station
                </button>
              </NavLink>
              <div className={styles.loginButton}>
                <span>Login</span>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/6eee6048-ed91-4f9b-8db2-e861e9721cc0?apiKey=f1e955cb66494e36a9a2064626167bd8&"
                  className={styles.userIcon}
                  alt="User icon"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
