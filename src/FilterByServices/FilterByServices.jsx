import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styles from './FilterByServices.module.css';
import applyFiltersImage from '../assets/images/applyFilters1.jpg';
import resetFiltersImage from '../assets/images/resetFilters1.jpg';
import {
  GoogleMap,
  OverlayView,
  useJsApiLoader,
  Marker
} from "@react-google-maps/api";

const API_KEY = import.meta.env.VITE_SECRET_KEY;

const initialStations = [
  {
    id: 1,
    name: "Z Newmarket",
    lat: -36.8524555,
    lng: 174.7580782,
    services: ["Car Wash", "ATM", "Food & Drink"],
    fuels: ["ZX Premium", "Z91 Unleaded", "Z Diesel"],
    stationTypes: ["Service Station"],
    street: "123 Broadway",
    locality: "Newmarket",
    country: "New Zealand",
  },
  {
    id: 2,
    name: "Z Mount Eden",
    lat: -36.8773,
    lng: 174.7583,
    services: ["Trailer Hire", "LPG Swap", "Pay At Pump"],
    fuels: ["Z91 Unleaded", "Z Diesel", "EV Charging"],
    stationTypes: ["Service Station", "Truck Stop"],
    street: "456 Mount Eden Road",
    locality: "Mount Eden",
    country: "New Zealand",
  }
];

export default function FilterByServices({ currentLocation = { latitude: -36.8485, longitude: 174.7633 }, zoomLevel = 13 }) {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [allStations, setAllStations] = useState(initialStations);
  const [filteredStations, setFilteredStations] = useState(initialStations);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY
  });

  const fuelOptions = [
    'ZX Premium',
    'Z91 Unleaded',
    'Z Diesel',
    'EV Charging'
  ];

  const serviceOptions = [
    'Car Wash',
    'Trailer Hire',
    'LPG Swap',
    'Engine Oil',
    'Tyre Pressure',
    'Food & Drink',
    'Pay In App',
    'Pay At Pump',
    'Pay By Late',
    'Wifi',
    'ATM',
    'Toilets'
  ];

  const stationTypes = [
    'Service Station',
    'Truck Stop'
  ];

  const sortByOptions = [
    'Nearest',
    'Cheapest',
    'Economical'
  ];

  const handleFuelClick = (fuel) => {
    setSelectedFuels(prevFuels =>
      prevFuels.includes(fuel)
        ? prevFuels.filter(f => f !== fuel)
        : [...prevFuels, fuel]
    );
  };

  const handleServiceClick = (service) => {
    setSelectedServices(prevServices =>
      prevServices.includes(service)
        ? prevServices.filter(s => s !== service)
        : [...prevServices, service]
    );
  };

  const handleStationTypeClick = (type) => {
    setSelectedStationTypes(prevTypes =>
      prevTypes.includes(type)
        ? prevTypes.filter(t => t !== type)
        : [...prevTypes, type]
    );
  };

  const handleSortByClick = (sortOption) => {
    setSelectedSortBy(selectedSortBy === sortOption ? '' : sortOption);
  };

  const handleResetFilters = () => {
    setSelectedFuels([]);
    setSelectedServices([]);
    setSelectedStationTypes([]);
    setSelectedSortBy('');
    setFilteredStations(allStations);
  };

  const handleApplyFilters = () => {
    let filtered = allStations;

    if (selectedServices.length > 0) {
      filtered = filtered.filter(station =>
        selectedServices.every(service => station.services.includes(service))
      );
    }

    if (selectedFuels.length > 0) {
      filtered = filtered.filter(station =>
        selectedFuels.every(fuel => station.fuels.includes(fuel))
      );
    }

    if (selectedStationTypes.length > 0) {
      filtered = filtered.filter(station =>
        selectedStationTypes.every(type => station.stationTypes.includes(type))
      );
    }

    setFilteredStations(filtered);
  };

  const calculateDistance = (station, position) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(station.lat - position.latitude);
    const dLng = toRad(station.lng - position.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(position.latitude)) *
        Math.cos(toRad(station.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box className={styles.filterContainer}>
      <Box>
        <Typography className={styles.categoryTitle}>
          Select Fuel 
        </Typography>
        <Box className={styles.filterGroup}>
          {fuelOptions.map((fuel) => (
            <button
              key={fuel}
              onClick={() => handleFuelClick(fuel)}
              className={`${styles.filterButton} ${selectedFuels.includes(fuel) ? styles.filterButtonSelected : ''}`}
            >
              {fuel}
            </button>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography className={styles.categoryTitle}>
          Select Services
        </Typography>
        <Box className={styles.filterGroup}>
          {serviceOptions.map((service) => (
            <button
              key={service}
              onClick={() => handleServiceClick(service)}
              className={`${styles.filterButton} ${selectedServices.includes(service) ? styles.filterButtonSelected : ''}`}
            >
              {service}
            </button>
          ))}
        </Box>
      </Box>

      <Box className={styles.bottomFiltersContainer}>
        <Box className={styles.bottomFilterSection}>
          <Typography className={styles.categoryTitle}>
            Select Station Type
          </Typography>
          <Box className={styles.filterGroup}>
            {stationTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleStationTypeClick(type)}
                className={`${styles.filterButton} ${selectedStationTypes.includes(type) ? styles.filterButtonSelected : ''}`}
              >
                {type}
              </button>
            ))}
          </Box>
        </Box>

        <Box className={styles.bottomFilterSection}>
          <Typography className={styles.categoryTitle}>
            Sort By
          </Typography>
          <Box className={styles.filterGroup}>
            {sortByOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortByClick(option)}
                className={`${styles.filterButton} ${selectedSortBy === option ? styles.filterButtonSelected : ''}`}
              >
                {option}
              </button>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className={styles.buttonContainer}>
        <Button
          variant="contained"
          onClick={handleResetFilters}
          className={styles.resetButton}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            padding: 0,
            minWidth: 'unset',
            overflow: 'hidden',
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          <img 
            src={resetFiltersImage} 
            alt="Reset Filters" 
            className={styles.resetButtonImage}
          />
        </Button>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          className={styles.applyButton}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            padding: 0,
            minWidth: 'unset',
            overflow: 'hidden',
            '&:hover': {
              opacity: 0.9
            }
          }}
        >
          <img 
            src={applyFiltersImage} 
            alt="Apply Filters" 
            className={styles.applyButtonImage}
          />
        </Button>
      </Box>

      <Box className={styles.mapContainer}>
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
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
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
                  alt="Z Station"
                  className={styles.logo}
                />
                <div className={styles.stationInfo}>
                  <div className={styles.stationName}>{station.name}</div>
                  <div className={styles.stationServices}>
                    {station.services.join(", ")}
                  </div>
                  <div className={styles.distanceLabel}>
                    {calculateDistance(station, currentLocation).toFixed(2)} km
                  </div>
                </div>
              </div>
            </OverlayView>
          ))}
        </GoogleMap>
      </Box>
    </Box>
  );
}
