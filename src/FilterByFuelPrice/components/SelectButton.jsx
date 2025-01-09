import React, { useState } from "react";
import styles from "../styles/SelectButton.module.css";

export const SelectButton = ({ label, onClickfunc, selectedButtons = [] }) => {
  return (
    <button
      className={`${styles.selectButton} ${
        selectedButtons.includes(label) ? styles.active : ""
      }`}
      onClick={onClickfunc}
    >
      {label}
    </button>
  );
};
