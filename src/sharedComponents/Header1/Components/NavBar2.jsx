import React from "react";
import styles from "../styles/NavBar2.module.css";

export default function NavBar2() {
  return (
    <nav className={styles.navigation}>
      <div className={styles.menuItems}>
        <div className={styles.menuItem}>
          <span>At the station</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/0a4bd80f46077bfd934baec4cbc494550c55b7832b8c9869227c61f43a4b2ab5?apiKey=f1e955cb66494e36a9a2064626167bd8&"
            alt="Station icon"
          />
        </div>
        <div className={styles.menuItem}>
          <span>Power</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/0a4bd80f46077bfd934baec4cbc494550c55b7832b8c9869227c61f43a4b2ab5?apiKey=f1e955cb66494e36a9a2064626167bd8&"
            alt="Power icon"
          />
        </div>
        <div className={styles.menuItem}>
          <span>Rewards and promotions</span>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/0a4bd80f46077bfd934baec4cbc494550c55b7832b8c9869227c61f43a4b2ab5?apiKey=f1e955cb66494e36a9a2064626167bd8&"
            alt="Rewards icon"
          />
        </div>
      </div>
      <button className={styles.locateButton}>
        <span>Locate Z Station</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/76d0fb7a-0b3d-470f-b96e-cc3f93bed0b3?apiKey=f1e955cb66494e36a9a2064626167bd8&"
          alt="Location icon"
        />
      </button>
    </nav>
  );
}
