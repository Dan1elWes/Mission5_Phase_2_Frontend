import React, { useState } from "react";
import { FuelOption } from "./FuelOption";
import { SelectButton } from "./SelectButton";
import { ActionButton } from "./ActionButton";
import styles from "../styles/FuelSelector.module.css";

const fuelTypes = [
  { label: "ZX premium", color: "#ED550E" },
  { label: "Z91 unleaded", color: "#F8852C" },
  { label: "Z diesel", color: "#FFB12E" },
  { label: "EV charging", color: "#2C259B" },
];

const stationTypes = ["Service station", "Truck stop"];
const sortOptions = ["Nearest", "Cheapest", "Economical"];

export const FuelSelector = () => {
  const [fuelPrice, setFuelPrice] = useState(1.5);

  const handleSliderChange = (event) => {
    setFuelPrice(parseFloat(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectFuelContainer}>
        <h2 className={styles.sectionTitle}>Select Fuel</h2>

        <div className={styles.optionsGrid}>
          {fuelTypes.map((type) => (
            <SelectButton key={type.label} label={type.label} />
          ))}
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <h2 className={styles.sectionTitle} style={{ alignSelf: "start" }}>
          Select Fuel Range
        </h2>
        <div className={styles.sliderWrapper}>
          <input
            type="range"
            min="1.5"
            max="4.0"
            step="0.1"
            value={fuelPrice}
            onChange={handleSliderChange}
            className={styles.slider}
          />
          <div
            className={styles.sliderTooltip}
            style={{ left: `${((fuelPrice - 1.5) / 2.5) * 100}%` }}
          >
            ${fuelPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>Select Station Type</h2>
        <h2 className={styles.sectionTitle}>Sort by</h2>
      </div>

      <div className={styles.filterOptions}>
        <div className={styles.stationTypes}>
          {stationTypes.map((type) => (
            <SelectButton key={type} label={type} />
          ))}
        </div>
        <div className={styles.sortOptions}>
          {sortOptions.map((option) => (
            <SelectButton key={option} label={option} />
          ))}
        </div>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.actionButtons}>
          <button className={styles.resetFiltersButton}>
            <img
              src={
                "https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/433af642-d24f-425e-937a-33d8df0e813a?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              }
              alt="arrow pointing right"
              className={styles.arrowIconLeft}
            />{" "}
            {"Reset filters"}
          </button>
          <button className={styles.applyFiltersButton}>
            {"Apply filters"}
            <img
              src={
                "https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/538e7344-b212-4ce5-b128-9477541b8e89?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              }
              alt="arrow pointing right"
              className={styles.arrowIconRight}
            />
          </button>
        </div>
        <div className={styles.legend}>
          {fuelTypes.map((type) => (
            <FuelOption key={type.label} {...type} />
          ))}
        </div>
      </div>
    </div>
  );
};
