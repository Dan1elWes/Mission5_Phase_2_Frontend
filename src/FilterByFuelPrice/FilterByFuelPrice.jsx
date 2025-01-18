import { FuelSelector } from "./components/FuelSelector";
import styles from "./FilterByFuelPrice.module.css";
import currentLocationIcon from "../assets/images/marker.png";
import { GoogleMap, OverlayView, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { useGoogleMaps } from "../sharedComponents/GoogleMapsLoader/GoogleMapsLoader"; // Import from the shared context

const API_KEY = import.meta.env.VITE_SECRET_KEY; // Your Google API key
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FilterByFuelPrice({ currentLocation, zoomLevel }) {
  const { isLoaded } = useGoogleMaps(); // Use the centralized context for loading state
  const [allStations, setAllStations] = useState([]); // All stations
  const [loadingStations, setLoadingStations] = useState(true); // Loading state
  const [fuelPrice, setFuelPrice] = useState(1.5); // Fuel price range
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]); // Fuel types filter
  const [selectedStationTypes, setSelectedStationTypes] = useState([]); // Station types filter
  const [selectedSortOptions, setSelectedSortOptions] = useState([]); // Sorting options
  const [filteredStations, setFilteredStations] = useState([]); // Filtered stations

  // Fetching station data
  useEffect(() => {
    fetch(`${API_URL}/fuelstations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllStations(data); // Set all stations
        setFilteredStations(data); // Initially show all stations
        setLoadingStations(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error(error);
        setLoadingStations(false);
      });
  }, []); // Empty dependency array to fetch only on mount

  // When stations data changes, apply filtering logic
  useEffect(() => {
    // If no stations are available yet, skip filtering
    if (allStations.length === 0) return;

    const filtered = allStations.filter((station) => {
      // Apply filters based on selected fuel types, station types, and fuel price
      const fuelPriceMatches =
        station.prices["ZX premium"] &&
        station.prices["ZX premium"] <= fuelPrice;
      const fuelTypeMatches =
        selectedFuelTypes.length === 0 ||
        selectedFuelTypes.some((type) => station.types.includes(type));
      const stationTypeMatches =
        selectedStationTypes.length === 0 ||
        selectedStationTypes.some((type) =>
          station.stationTypes.includes(type)
        );

      return fuelPriceMatches && fuelTypeMatches && stationTypeMatches;
    });

    setFilteredStations(filtered); // Set filtered stations based on filters
  }, [fuelPrice, selectedFuelTypes, selectedStationTypes]); // Re-run on filter changes

  // If stations are loading, show loading state
  if (loadingStations) {
    return <div>Loading...</div>;
  }

  // If Google Maps API is not loaded, show loading state
  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  // Function to calculate distance between current location and station
  const calculateDistance = (station, position) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(station.lat - position.latitude);
    const dLng = toRad(station.lng - position.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(position.latitude)) *
        Math.cos(toRad(station.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <div>
      {/* Fuel Selector Component to filter stations */}
      <FuelSelector
        allStations={allStations}
        setFilteredStations={setFilteredStations}
        fuelPrice={fuelPrice}
        setFuelPrice={setFuelPrice}
        selectedFuelTypes={selectedFuelTypes}
        setSelectedFuelTypes={setSelectedFuelTypes}
        selectedStationTypes={selectedStationTypes}
        setSelectedStationTypes={setSelectedStationTypes}
        selectedSortOptions={selectedSortOptions}
        setSelectedSortOptions={setSelectedSortOptions}
        currentLocation={currentLocation}
        distanceFunction={calculateDistance}
      />

      {/* Google Map with markers */}
      <GoogleMap
        mapContainerClassName={styles.map}
        center={{
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }}
        zoom={zoomLevel}
      >
        {/* Marker for current location */}
        <Marker
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          icon={{
            url: currentLocationIcon, // Use the imported marker icon
            scaledSize: new google.maps.Size(40, 40), // Adjust the size if needed
          }}
        />

        {/* Markers for filtered stations */}
        {filteredStations.map((station) => (
          <OverlayView
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className={styles.overlayContainer}>
              <img
                src="src/assets/images/zlogo.png"
                alt="Company Logo"
                className={styles.zlogo}
              />
              <img
                src="src/assets/images/vector.png"
                alt="Vector Logo"
                className={styles.vectorlogo}
              />

              <div className={styles.priceContainer}>
                {station.prices["ZX premium"] && (
                  <div className={styles.premiumPriceLabel}>
                    ${station.prices["ZX premium"].toFixed(2)}
                  </div>
                )}
                {station.prices["Z91 unleaded"] && (
                  <div className={styles.unleadedPriceLabel}>
                    ${station.prices["Z91 unleaded"].toFixed(2)}
                  </div>
                )}
                {station.prices["Z diesel"] && (
                  <div className={styles.dieselPriceLabel}>
                    ${station.prices["Z diesel"].toFixed(2)}
                  </div>
                )}
                {station.prices["EV charging"] && (
                  <div className={styles.evPriceLabel}>
                    ${station.prices["EV charging"].toFixed(2)}
                  </div>
                )}
              </div>

              <div className={styles.distanceLabel}>
                {calculateDistance(station, currentLocation).toFixed(2)} km
              </div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>

      {/* Display list of filtered stations */}
      {filteredStations.length > 0 && (
        <div className={styles.stationList}>
          <ul className={styles.list}>
            {filteredStations.map((station) => (
              <li key={station.id}>
                <h4 className={styles.stationName}>{station.name}</h4>
                <b className={styles.stationAddress}>
                  {station.street}, {station.locality}, {station.country}
                </b>
                <p className={styles.fontStyling}>
                  Services: {station.services}
                </p>
                <p className={styles.fontStyling}>
                  Fuel Types: {station.types.join(", ")}
                </p>
                <p className={styles.fontStyling}>
                  Station Types: {station.stationTypes.join(", ")}
                </p>
                <p className={styles.fontStyling}>
                  Distance:{" "}
                  {calculateDistance(station, currentLocation).toFixed(2)} km
                </p>
                <div className={styles.buttonContainer}>
                  <button className={styles.getDirectionsButton}>
                    Get directions
                  </button>
                  <img
                    src="src/assets/images/heart.png"
                    alt="Heart Logo"
                    className={styles.heartLogo}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
