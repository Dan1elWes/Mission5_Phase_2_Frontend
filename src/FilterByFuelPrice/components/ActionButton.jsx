import React from "react";
import styles from "../styles/ActionButton.module.css";

export const ActionButton = ({ label, icon }) => (
  <button className={styles.actionButtonContainer}>
    <img src={icon} alt="" className={styles.actionIcon} />
    {label}
  </button>
);
