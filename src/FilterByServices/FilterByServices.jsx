import React, { useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import { ServiceSelector } from './components/ServiceSelector';
import { StationLocations } from './components/StationLocations';

const API_KEY = import.meta.env.VITE_SECRET_KEY;

export default function FilterByServices({ currentLocation = { latitude: -40.9006, longitude: 174.886 }, zoomLevel = 6 }) {
  const [allStations, setAllStations] = useState([
    {
      id: 1,
      name: "Z Station Wellington",
      lat: -40.9006,
      lng: 174.886,
      services: ["Car Wash", "ATM", "Food & Drink"],
      fuels: ["ZX Premium", "Z91 Unleaded", "Z Diesel"],
      stationTypes: ["Service Station"],
      street: "123 Main St",
      locality: "Wellington",
      country: "New Zealand",
    },
    {
      id: 2,
      name: "Z Station Auckland",
      lat: -36.8524555,
      lng: 174.7580782,
      services: ["Car Wash", "ATM", "Pay At Pump", "Trailer Hire"],
      fuels: ["Z91 Unleaded", "Z Diesel", "EV Charging"],
      stationTypes: ["Service Station", "Truck Stop"],
      street: "456 Queen St",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 3,
      name: "Z Station Wellington Central",
      lat: -41.2865,
      lng: 174.7762,
      services: ["Car Wash", "ATM", "Food & Drink", "Pay In App"],
      fuels: ["ZX Premium", "Z Diesel"],
      stationTypes: ["Service Station"],
      street: "789 King St",
      locality: "Wellington",
      country: "New Zealand",
    },
    {
      id: 4,
      name: "Z Station Christchurch",
      lat: -43.5321,
      lng: 172.6362,
      services: ["Car Wash", "ATM", "LPG Swap", "Engine Oil"],
      fuels: ["Z91 Unleaded", "EV Charging"],
      stationTypes: ["Truck Stop"],
      street: "101 North St",
      locality: "Christchurch",
      country: "New Zealand",
    },
    {
      id: 5,
      name: "Z Station Dunedin",
      lat: -45.8788,
      lng: 170.5028,
      services: ["Car Wash", "ATM", "Toilets", "Wifi"],
      fuels: ["ZX Premium", "Z91 Unleaded", "Z Diesel", "EV Charging"],
      stationTypes: ["Service Station"],
      street: "202 South St",
      locality: "Dunedin",
      country: "New Zealand",
    }
  ]);
  
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("Distance");
  const [filteredStations, setFilteredStations] = useState(allStations);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

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

  // If the API is not loaded, don't render GoogleMap or Marker
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ServiceSelector
        allStations={allStations}
        setFilteredStations={setFilteredStations}
        selectedFuels={selectedFuels}
        setSelectedFuels={setSelectedFuels}
        selectedServices={selectedServices}
        setSelectedServices={setSelectedServices}
        selectedStationTypes={selectedStationTypes}
        setSelectedStationTypes={setSelectedStationTypes}
        selectedSortBy={selectedSortBy}
        setSelectedSortBy={setSelectedSortBy}
      />
      <StationLocations
        currentLocation={currentLocation}
        zoomLevel={zoomLevel}
        filteredStations={filteredStations}
        calculateDistance={calculateDistance}
      />
    </div>
  );
}
