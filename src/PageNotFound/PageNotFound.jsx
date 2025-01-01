import React from "react";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import styles from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <HeaderMain />
      <div className={styles.container}>
        <h1 className={styles.pageNotFoundText}>Page Not Found</h1>
        <div className={styles.messageText}>
          <p>
            Sorry, the page you are looking for does not exist. Uh oh. You've
            found the hole in our donut.
            <br />
            We've changed our website a bit, so what you're trying to find might
            look different or be in a different place.
            <br />
            Try a search. Watch for any typos!
            <br />
            If you still can't find what you're looking for, contact us.
          </p>
        </div>
        <Link to="/">
          <button className={styles.returnHomeButton}>Return to home</button>
        </Link>
      </div>
    </>
  );
}
