import React, { useState } from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';

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

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Fuel Type
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {fuelOptions.map((fuel) => (
            <Button
              key={fuel}
              variant={selectedFuels.includes(fuel) ? "contained" : "outlined"}
              onClick={() => handleFuelClick(fuel)}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                mb: 1
              }}
            >
              {fuel}
            </Button>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Services
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {serviceOptions.map((service) => (
            <Button
              key={service}
              variant={selectedServices.includes(service) ? "contained" : "outlined"}
              onClick={() => handleServiceClick(service)}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                mb: 1
              }}
            >
              {service}
            </Button>
          ))}
        </Box>
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Select Station Type
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {stationTypes.map((type) => (
            <Button
              key={type}
              variant={selectedStationTypes.includes(type) ? "contained" : "outlined"}
              onClick={() => handleStationTypeClick(type)}
              sx={{ 
                borderRadius: '20px',
                textTransform: 'none',
                mb: 1
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
