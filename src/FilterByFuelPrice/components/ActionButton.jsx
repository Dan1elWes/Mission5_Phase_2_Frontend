import React from "react";
import styles from "../styles/ActionButton.module.css";

export const ActionButton = ({ label, icon, className }) => (
  <button className={`${styles.actionButtonContainer} ${className}`}>
    <img src={icon} alt="" className={styles.actionIcon} />
    {label}
  </button>
);
