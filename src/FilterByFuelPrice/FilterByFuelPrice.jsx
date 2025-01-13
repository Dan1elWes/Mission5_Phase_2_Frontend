import { FuelSelector } from "./components/FuelSelector";
import styles from "./FilterByFuelPrice.module.css";
import currentLocationIcon from "../assets/images/marker.png";
import { useLoadScript, GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_SECRET_KEY;

const libraries = ["places"];

export default function FilterByFuelPrice({ currentLocation, zoomLevel }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const [allStations, setAllStations] = useState([]); 
  const [loadingStations, setLoadingStations] = useState(true);
  const [fuelPrice, setFuelPrice] = useState(1.5);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);
  const [selectedSortOptions, setSelectedSortOptions] = useState([]);
  const [filteredStations, setFilteredStations] = useState(allStations);

  useEffect(() => {
    fetch("http://localhost:8500/fuelstations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllStations(data);
        setFilteredStations(data);
        setLoadingStations(false);
      })
      .catch((error) => {
        console.error("Error fetching stations:", error);
        setLoadingStations(false);
      });
  }, []);

  useEffect(() => {
    setFilteredStations(allStations);
  }, [allStations]);

  // Function to calculate distance between current location and a station
  const calculateDistance = (station, position) => {
    // Haversine formula to calculate distance between two points
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
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

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <div>
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
      <GoogleMap
        mapContainerClassName={styles.map}
        center={{
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }}
        zoom={zoomLevel}
      >
        <Marker
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          icon={{
            url: currentLocationIcon, // Use the imported image
            scaledSize: new google.maps.Size(40, 40), // Adjust the size if needed
          }}
        />
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
                alt="vector Logo"
                className={styles.vectorlogo}
              />

              <div className={styles.priceContainer}>
                {station.prices["ZX premium"] !== undefined && (
                  <div className={styles.premiumPriceLabel}>
                    ${station.prices["ZX premium"].toFixed(2)}
                  </div>
                )}
                {station.prices["Z91 unleaded"] !== undefined && (
                  <div className={styles.unleadedPriceLabel}>
                    ${station.prices["Z91 unleaded"].toFixed(2)}
                  </div>
                )}
                {station.prices["Z diesel"] !== undefined && (
                  <div className={styles.dieselPriceLabel}>
                    ${station.prices["Z diesel"].toFixed(2)}
                  </div>
                )}
                {station.prices["EV charging"] !== undefined && (
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
      {filteredStations.length > 0 && (
        <div className={styles.stationList}>
          <ul className={styles.list}>
            {filteredStations.map((station) => (
              <li key={station.id}>
                <h4 className={styles.stationName}>{station.name}</h4>
                <b className={styles.stationAddress}>
                  {station.street}, {station.locality}, {station.country}
                </b>
                {/* <p>Price: ${station.price.toFixed(2)}</p> */}
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
                  Distance:
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
