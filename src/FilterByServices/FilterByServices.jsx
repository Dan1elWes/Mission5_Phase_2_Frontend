import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styles from './FilterByServices.module.css';
import applyFiltersImage from '../assets/images/applyFilters1.jpg';
import resetFiltersImage from '../assets/images/resetFilters1.jpg';

export default function FilterByServices() {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState('');

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
  };

  const handleApplyFilters = () => {
    console.log({
      fuels: selectedFuels,
      services: selectedServices,
      stationTypes: selectedStationTypes,
      sortBy: selectedSortBy
    });
  };

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
    </Box>
  );
}
