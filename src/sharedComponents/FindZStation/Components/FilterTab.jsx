import React from "react";
import styles from "../styles/LocationSearch.module.css";

export const FilterTab = ({ label, isActive, tabIndex }) => {
  return (
    <div
      className={`${styles.filterTab} ${
        isActive ? styles.activeTab : styles.inactiveTab
      }`}
      role="tab"
      tabIndex={tabIndex}
      aria-selected={isActive}
    >
      {label}
    </div>
  );
};
