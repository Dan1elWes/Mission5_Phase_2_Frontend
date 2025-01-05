import React from "react";
import styles from "../styles/FuelOption.module.css";

export const FuelOption = ({ color, label }) => (
  <div className={styles.fuelOptionWrapper}>
    <div className={styles.colorIndicator} style={{ backgroundColor: color }} />
    <div className={styles.label}>{label}</div>
  </div>
);
