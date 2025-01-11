import React from 'react';
import { Button, Typography } from '@mui/material';
import styles from '../FilterByServices.module.css';
import applyFiltersImage from '../../assets/images/applyFilters1.jpg';
import resetFiltersImage from '../../assets/images/resetFilters1.jpg';

export function ServiceSelector({
  setFilteredStations,
  selectedFuels,
  setSelectedFuels,
  selectedServices,
  setSelectedServices,
  selectedStationTypes,
  setSelectedStationTypes,
  selectedSortBy,
  setSelectedSortBy
}) {
  const fuelOptions = [
    "ZX premium",
    "Z91 unleaded",
    "Z diesel",
    "EV charging"
  ];

  const serviceOptions = [
    "Car Wash",
    "ATM",
    "Food & Drink",
    "Pay At Pump",
    "Trailer Hire",
    "LPG Swap",
    "Engine Oil",
    "Toilets",
    "Wifi",
  ];

  const stationTypes = ["Service station", "Truck stop"];
  const sortByOptions = ["Distance", "Name", "Services"];

  const handleFuelClick = (fuel) => {
    if (selectedFuels.includes(fuel)) {
      setSelectedFuels(selectedFuels.filter(f => f !== fuel));
    } else {
      setSelectedFuels([...selectedFuels, fuel]);
    }
  };

  const handleServiceClick = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleStationTypeClick = (type) => {
    if (selectedStationTypes.includes(type)) {
      setSelectedStationTypes(selectedStationTypes.filter(t => t !== type));
    } else {
      setSelectedStationTypes([...selectedStationTypes, type]);
    }
  };

  const handleSortByClick = (option) => {
    setSelectedSortBy(option);
  };

  const handleApplyFilters = async () => {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      if (selectedFuels.length > 0) {
        params.append('fuels', selectedFuels.join(','));
      }
      if (selectedServices.length > 0) {
        params.append('services', selectedServices.join(','));
      }
      if (selectedStationTypes.length > 0) {
        params.append('stationTypes', selectedStationTypes.join(','));
      }

      // Fetch filtered stations from backend
      const response = await fetch(`http://localhost:5000/api/stations?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered stations');
      }
      const filteredData = await response.json();
      setFilteredStations(filteredData);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  const handleResetFilters = async () => {
    setSelectedFuels([]);
    setSelectedServices([]);
    setSelectedStationTypes([]);
    setSelectedSortBy("Distance");
    
    try {
      const response = await fetch('http://localhost:5000/api/stations');
      if (!response.ok) {
        throw new Error('Failed to fetch stations');
      }
      const data = await response.json();
      setFilteredStations(data);
    } catch (error) {
      console.error('Error resetting filters:', error);
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div>
        <Typography className={styles.categoryTitle}>
          Select Fuel 
        </Typography>
        <div className={styles.filterGroup}>
          {fuelOptions.map((fuel) => (
            <button
              key={fuel}
              onClick={() => handleFuelClick(fuel)}
              className={`${styles.filterButton} ${selectedFuels.includes(fuel) ? styles.filterButtonSelected : ''}`}
            >
              {fuel}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Typography className={styles.categoryTitle}>
          Select Services
        </Typography>
        <div className={styles.filterGroup}>
          {serviceOptions.map((service) => (
            <button
              key={service}
              onClick={() => handleServiceClick(service)}
              className={`${styles.filterButton} ${selectedServices.includes(service) ? styles.filterButtonSelected : ''}`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bottomFiltersContainer}>
        <div className={styles.bottomFilterSection}>
          <Typography className={styles.categoryTitle}>
            Select Station Type
          </Typography>
          <div className={styles.filterGroup}>
            {stationTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleStationTypeClick(type)}
                className={`${styles.filterButton} ${selectedStationTypes.includes(type) ? styles.filterButtonSelected : ''}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.bottomFilterSection}>
          <Typography className={styles.categoryTitle}>
            Sort By
          </Typography>
          <div className={styles.filterGroup}>
            {sortByOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSortByClick(option)}
                className={`${styles.filterButton} ${selectedSortBy === option ? styles.filterButtonSelected : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
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
      </div>
    </div>
  );
}
