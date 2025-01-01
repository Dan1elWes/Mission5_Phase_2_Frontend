import React from "react";
import styles from "../styles/LocationSearch.module.css";
import { FilterTab } from "./FilterTab";

export const LocationSearch = () => {
  const filterTabs = [
    { label: "Filter by services", isActive: false },
    { label: "Filter by fuel price", isActive: true },
    { label: "Filter by distance", isActive: false },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <h2 className={styles.findaStationText}>Find a Station</h2>
        <form role="search" className={styles.searchField}>
          <input
            type="search"
            id="locationSearch"
            className={styles.searchPlaceholder}
            placeholder="Please enter a location / Station / Truck Stop / Airtop"
            aria-label="Search for location"
          />
          <button className={styles.searchIcon}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/aed59eff0e8517a6f05c7173c66db43ec8a1a9a84026c95e04dae987750c2c94?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              alt=""
              role="presentation"
            />
          </button>
        </form>

        <div className={styles.locationContainer}>
          <button
            className={styles.locationText}
            onClick={() => {}}
            aria-label="Use current location"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/15ce6de65fb993b4142d1b963fa1b2c315149b550a6badf5b2201d1f284e153a?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              className={styles.locationIcon}
              alt=""
              role="presentation"
            />
            Or use my current location
          </button>
        </div>

        <div
          className={styles.filterTabs}
          role="tablist"
          aria-label="Filter options"
        >
          {filterTabs.map((tab, index) => (
            <button
              key={tab.label}
              className={`${styles.filterTab} ${
                tab.isActive ? styles.activeTab : styles.inactiveTab
              }`}
              tabIndex={0}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
