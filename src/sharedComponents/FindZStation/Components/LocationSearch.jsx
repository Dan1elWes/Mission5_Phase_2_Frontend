import React, { useState } from "react";
import { useGoogleMaps } from "../../GoogleMapsLoader/GoogleMapsLoader"; // Import the hook to check loading state
import styles from "../styles/LocationSearch.module.css";
import FilterByServices from "../../../FilterByServices/FilterByServices";
import FilterByFuelPrice from "../../../FilterByFuelPrice/FilterByFuelPrice";
import FilterByDistance from "../../../FilterByDistance/StationLocator";

const API_KEY = import.meta.env.VITE_SECRET_KEY;

export const LocationSearch = () => {
  const { isLoaded, loadError } = useGoogleMaps(); // Use the Google Maps loading state
  const [activeTab, setActiveTab] = useState("services"); // Default tab
  const [currentLocation, setCurrentLocation] = useState({
    latitude: -40.9006,
    longitude: 174.886,
    location: "",
  });

  const [zoomLevel, setZoomLevel] = useState(6);

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
        setZoomLevel(13);
      } else {
        console.error("Error fetching location coordinates:", data.status);
      }
    } catch (error) {
      console.error("Error fetching location coordinates:", error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "services":
        return (
          <FilterByServices
            currentLocation={currentLocation}
            zoomLevel={zoomLevel}
          />
        );
      case "fuelPrice":
        return (
          <FilterByFuelPrice
            currentLocation={currentLocation}
            zoomLevel={zoomLevel}
          />
        );
      case "distance":
        return <FilterByDistance />;
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>; // Show loading indicator until Google Maps is loaded
  }

  return (
    <div>
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
                alt="search icon"
                role="presentation"
              />
            </button>
          </form>

          <div className={styles.locationContainer}>
            <button
              className={styles.locationText}
           
              aria-label="Use current location"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/f1e955cb66494e36a9a2064626167bd8/15ce6de65fb993b4142d1b963fa1b2c315149b550a6badf5b2201d1f284e153a?apiKey=f1e955cb66494e36a9a2064626167bd8&"
                className={styles.locationIcon}
                alt="location icon"
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
    </div>
  );
};
