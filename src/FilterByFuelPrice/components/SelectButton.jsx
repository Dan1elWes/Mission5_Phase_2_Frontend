import React, { useState } from "react";
import styles from "../styles/SelectButton.module.css";

export const SelectButton = ({ label, onClickfunc }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClickfunc) {
      onClickfunc();
    }
  };

  return (
    <button
      className={`${styles.selectButton} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
