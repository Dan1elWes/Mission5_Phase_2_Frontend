import React, { useState } from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import styles from './FilterByServices.module.css';

export default function FilterByServices() {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);

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

  const handleResetFilters = () => {
    setSelectedFuels([]);
    setSelectedServices([]);
    setSelectedStationTypes([]);
  };

  const handleApplyFilters = () => {
    console.log({
      fuels: selectedFuels,
      services: selectedServices,
      stationTypes: selectedStationTypes
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

      <Divider />

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

      <Divider />

      <Box>
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

      <Box className={styles.buttonContainer}>
        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            borderColor: '#FF6B00',
            color: '#FF6B00',
            '&:hover': {
              borderColor: '#FF6B00',
              backgroundColor: 'rgba(255, 107, 0, 0.04)'
            }
          }}
        >
          Reset Filters
        </Button>
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            backgroundColor: '#FF6B00',
            '&:hover': {
              backgroundColor: '#e66000'
            }
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
}
