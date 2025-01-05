import React from "react";
import styles from "../styles/LocationSearch.module.css";
import FilterByServices from "../../../FilterByServices/FilterByServices";
import FilterByFuelPrice from "../../../FilterByFuelPrice/FilterByFuelPrice";
import FilterByDistance from "../../../FilterByDistance/FilterByDistance";
import { useState } from "react";

const API_KEY = "AIzaSyCU4kzOocg3otWJE5QqRHca30Zw5FP70zs";

export const LocationSearch = () => {
  const [activeTab, setActiveTab] = useState("fuelPrice"); // Set 'fuelPrice' as the default active tab
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -40.9006,
    longitude: 174.886,
    location: "",
  }); // Default position (New Zealand)

  const [zoomLevel, setZoomLevel] = useState(6); // Default zoom level for New Zealand

  const handleInputChange = (event) => {
    const location = event.target.value;
    setCurrentLocation({ ...currentLocation, location });
  };

  const handleSearch = async () => {
    const location = currentLocation.location;
    console.log(`Searching for stations in: ${location}`);
    await fetchLocationData(location);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your custom logic here
  };

  const extractLocationDetails = (addressComponents) => {
    const localityComponent = addressComponents.find((component) =>
      component.types.includes("locality")
    );
    const countryComponent = addressComponents.find((component) =>
      component.types.includes("country")
    );
    const localityName = localityComponent
      ? localityComponent.long_name
      : "Unknown locality";
    const countryName = countryComponent
      ? countryComponent.long_name
      : "Unknown country";
    return { localityName, countryName };
  };

  const fetchLocationData = async (location) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        const { localityName, countryName } = extractLocationDetails(
          data.results[0].address_components
        );
        const fullLocation = `${localityName}, ${countryName}`;
        setCurrentLocation({
          latitude: lat,
          longitude: lng,
          location: fullLocation,
        });
        setZoomLevel(13); // Zoom in more for user-specified location
      } else {
        console.error("Error fetching location coordinates:", data.status);
      }
    } catch (error) {
      console.error("Error fetching location coordinates:", error);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationName = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const { localityName, countryName } = extractLocationDetails(
          data.results[0].address_components
        );
        const fullLocation = `${localityName}, ${countryName}`;
        setCurrentLocation({ latitude, longitude, location: fullLocation });
        setZoomLevel(13); // Zoom in more for user-specified location
      } else {
        console.error("Error fetching location name:", data.status);
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

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
          <form
            role="search"
            className={styles.searchField}
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              value={currentLocation.location}
              id="locationSearch"
              className={styles.searchPlaceholder}
              placeholder="Please enter a location / Station / Truck Stop / Airtop"
              aria-label="Search for location"
              onChange={handleInputChange}
            />
            <button className={styles.searchIcon} onClick={handleSearch}>
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
              onClick={handleUseCurrentLocation}
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
      <div className={styles.activeTabContainer}>{renderActiveTab()}</div>
    </>
  );
};
