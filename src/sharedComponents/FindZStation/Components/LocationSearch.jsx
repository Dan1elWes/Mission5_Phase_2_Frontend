import React from "react";
import styles from "../styles/LocationSearch.module.css";
import FilterByServices from "../../../FilterByServices/FilterByServices";
import FilterByFuelPrice from "../../../FilterByFuelPrice/FilterByPrice";
import FilterByDistance from "../../../FilterByDistance/FilterByDistance";
import { useState } from "react";

export const LocationSearch = () => {
  const [activeTab, setActiveTab] = useState("fuelPrice"); // Set 'fuelPrice' as the default active tab

  const renderActiveTab = () => {
    switch (activeTab) {
      case "services":
        return <FilterByServices />;
      case "fuelPrice":
        return <FilterByFuelPrice />;
      case "distance":
        return <FilterByDistance />;
      default:
        return null;
    }
  };
  return (
    <>
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
            <button
              className={`${styles.filterTab} ${
                activeTab === "services" ? styles.activeTab : styles.inactiveTab
              }`}
              onClick={() => setActiveTab("services")}
            >
              Filter by Services
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "fuelPrice"
                  ? styles.activeTab
                  : styles.inactiveTab
              }`}
              onClick={() => setActiveTab("fuelPrice")}
            >
              Filter by Fuel Price
            </button>
            <button
              className={`${styles.filterTab} ${
                activeTab === "distance" ? styles.activeTab : styles.inactiveTab
              }`}
              onClick={() => setActiveTab("distance")}
            >
              Filter by Distance
            </button>
          </div>
        </div>
      </div>
      <div>{renderActiveTab()}</div>
    </>
  );
};
