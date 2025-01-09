import React from "react";
import { FuelOption } from "./FuelOption";
import { SelectButton } from "./SelectButton";
import styles from "../styles/FuelSelector.module.css";

const API_KEY = import.meta.env.VITE_SECRET_KEY; // Replace with your actual API key

const fuelTypes = [
  { label: "ZX premium", color: "#ED550E" },
  { label: "Z91 unleaded", color: "#F8852C" },
  { label: "Z diesel", color: "#FFB12E" },
  { label: "EV charging", color: "#2C259B" },
];

const stationTypes = ["Service station", "Truck stop"];
const sortOptions = ["Nearest", "Cheapest", "Economical"];

export const FuelSelector = ({
  allStations,
  setFilteredStations,
  fuelPrice,
  setFuelPrice,
  selectedFuelTypes,
  setSelectedFuelTypes,
  selectedStationTypes,
  setSelectedStationTypes,
  selectedSortOptions,
  setSelectedSortOptions,
  currentLocation,
  distanceFunction,
}) => {
  const handleSliderChange = (event) => {
    setFuelPrice(parseFloat(event.target.value));
  };

  const handleFuelTypeClick = (fuelType) => {
    setSelectedFuelTypes((prevSelectedFuelTypes) =>
      prevSelectedFuelTypes.includes(fuelType)
        ? prevSelectedFuelTypes.filter((type) => type !== fuelType)
        : [...prevSelectedFuelTypes, fuelType]
    );
  };

  const handleStationTypeClick = (stationType) => {
    setSelectedStationTypes((prevSelectedStationTypes) =>
      prevSelectedStationTypes.includes(stationType)
        ? prevSelectedStationTypes.filter((type) => type !== stationType)
        : [...prevSelectedStationTypes, stationType]
    );
  };

  const handleSortByClick = (sortOption) => {
    setSelectedSortOptions((prevSelectedSortOptions) =>
      prevSelectedSortOptions.includes(sortOption)
        ? prevSelectedSortOptions.filter((option) => option !== sortOption)
        : [...prevSelectedSortOptions, sortOption]
    );
  };

  const applyFilters = async () => {
    let stationsWithinLocality = allStations;

    if (
      currentLocation.latitude !== -40.9006 ||
      currentLocation.longitude !== 174.886
    ) {
      const locality = await fetchLocality(
        currentLocation.latitude,
        currentLocation.longitude
      );
      if (locality) {
        stationsWithinLocality = allStations.filter(
          (station) => station.locality === locality
        );
      }
    }

    const filtered = stationsWithinLocality
      .map((station) => {
        const filteredPrices = Object.fromEntries(
          Object.entries(station.prices).filter(
            ([fuelType, price]) => price <= fuelPrice
          )
        );
        return { ...station, prices: filteredPrices };
      })
      .filter(
        (station) =>
          Object.keys(station.prices).length > 0 &&
          (selectedFuelTypes.length === 0 ||
            station.types.some((type) => selectedFuelTypes.includes(type))) &&
          (selectedStationTypes.length === 0 ||
            station.stationTypes.some((type) =>
              selectedStationTypes.includes(type)
            ))
      )
      .sort((a, b) => {
        if (
          selectedSortOptions.includes("Cheapest") ||
          selectedSortOptions.length === 0
        ) {
          return (
            Math.min(...Object.values(a.prices)) -
            Math.min(...Object.values(b.prices))
          );
        } else if (selectedSortOptions.includes("Nearest")) {
          return (
            distanceFunction(a, currentLocation) -
            distanceFunction(b, currentLocation)
          );
        } else if (selectedSortOptions.includes("Economical")) {
          return (
            Math.min(...Object.values(a.prices)) /
              distanceFunction(a, currentLocation) -
            Math.min(...Object.values(b.prices)) /
              distanceFunction(b, currentLocation)
          );
        }
        return 0;
      });

    setFilteredStations(filtered);
  };

  const fetchLocality = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const localityComponent = data.results[0].address_components.find(
          (component) => component.types.includes("locality")
        );
        return localityComponent ? localityComponent.long_name : null;
      } else {
        console.error("Error fetching locality:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching locality:", error);
      return null;
    }
  };

  const resetFilters = () => {
    setFuelPrice(1.5);
    setSelectedFuelTypes([]);
    setSelectedStationTypes([]);
    setSelectedSortOptions([]);
    applyFilters();
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectFuelContainer}>
        <h2 className={styles.sectionTitle}>Select Fuel</h2>

        <div className={styles.optionsGrid}>
          {fuelTypes.map((type) => (
            <SelectButton
              key={type.label}
              label={type.label}
              onClickfunc={() => handleFuelTypeClick(type.label)}
              selectedButtons={selectedFuelTypes}
            />
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
            <SelectButton
              key={type}
              label={type}
              onClickfunc={() => handleStationTypeClick(type)}
              selectedButtons={selectedStationTypes}
            />
          ))}
        </div>
        <div className={styles.sortOptions}>
          {sortOptions.map((option) => (
            <SelectButton
              key={option}
              label={option}
              onClickfunc={() => handleSortByClick(option)}
              selectedButtons={selectedSortOptions}
            />
          ))}
        </div>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.actionButtons}>
          <button className={styles.resetFiltersButton} onClick={resetFilters}>
            <img
              src={
                "https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/433af642-d24f-425e-937a-33d8df0e813a?apiKey=f1e955cb66494e36a9a2064626167bd8&"
              }
              alt="arrow pointing right"
              className={styles.arrowIconLeft}
            />{" "}
            {"Reset filters"}
          </button>
          <button className={styles.applyFiltersButton} onClick={applyFilters}>
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
