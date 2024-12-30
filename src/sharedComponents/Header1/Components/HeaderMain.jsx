import React from "react";
import styles from "../Styles/HeaderMain.module.css";
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";

export default function HeaderMain() {
  return (
    <div className={styles.container}>
      <NavBar />
      <NavBar2 />
    </div>
  );
}
