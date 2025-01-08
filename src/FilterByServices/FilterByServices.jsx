import React, { useState } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import { ServiceSelector } from './components/ServiceSelector';
import { StationLocations } from './components/StationLocations';

const API_KEY = import.meta.env.VITE_SECRET_KEY;

export default function FilterByServices({ currentLocation = { latitude: -40.9006, longitude: 174.886 }, zoomLevel = 6 }) {
  const [allStations, setAllStations] = useState([
    {
      id: 1,
      name: "Station 1",
      lat: -40.9006,
      lng: 174.886,
      prices: {
        "ZX premium": 2.5,
        "Z91 unleaded": 2.4,
        "Z diesel": 2.3,
        "EV charging": 0.5,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z91 unleaded"],
      stationTypes: ["Service station"],
      street: "123 Main St",
      locality: "Wellington",
      country: "New Zealand",
    },
    {
      id: 2,
      name: "Station 2",
      lat: -36.8524555,
      lng: 174.7580782,
      prices: {
        "ZX premium": 2.6,
        "Z91 unleaded": 2.5,
        "Z diesel": 2.0,
        "EV charging": 0.6,
      },
      services: "Car Wash, ATM",
      types: ["Z diesel", "EV charging"],
      stationTypes: ["Truck stop", "Service station"],
      street: "456 Queen St",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 3,
      name: "Station 3",
      lat: -41.2865,
      lng: 174.7762,
      prices: {
        "ZX premium": 2.55,
        "Z91 unleaded": 2.45,
        "Z diesel": 2.3,
        "EV charging": 0.55,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z diesel"],
      stationTypes: ["Service station"],
      street: "789 King St",
      locality: "Wellington",
      country: "New Zealand",
    },
    {
      id: 4,
      name: "Station 4",
      lat: -43.5321,
      lng: 172.6362,
      prices: {
        "ZX premium": 2.7,
        "Z91 unleaded": 2.6,
        "Z diesel": 2.4,
        "EV charging": 0.7,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "101 North St",
      locality: "Christchurch",
      country: "New Zealand",
    },
    {
      id: 5,
      name: "Station 5",
      lat: -45.8788,
      lng: 170.5028,
      prices: {
        "ZX premium": 2.65,
        "Z91 unleaded": 2.55,
        "Z diesel": 2.2,
        "EV charging": 0.65,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z diesel"],
      stationTypes: ["Service station", "Truck stop"],
      street: "202 South St",
      locality: "Dunedin",
      country: "New Zealand",
    },
    {
      id: 6,
      name: "Station 6",
      lat: -39.4928,
      lng: 176.912,
      prices: {
        "ZX premium": 2.5,
        "Z91 unleaded": 2.4,
        "Z diesel": 2.1,
        "EV charging": 0.5,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "303 East St",
      locality: "Napier",
      country: "New Zealand",
    },
    {
      id: 7,
      name: "Station 7",
      lat: -38.1368,
      lng: 176.2497,
      prices: {
        "ZX premium": 2.75,
        "Z91 unleaded": 2.65,
        "Z diesel": 2.35,
        "EV charging": 0.75,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "404 West St",
      locality: "Rotorua",
      country: "New Zealand",
    },
    {
      id: 8,
      name: "Station 8",
      lat: -37.787,
      lng: 175.2793,
      prices: {
        "ZX premium": 2.8,
        "Z91 unleaded": 2.7,
        "Z diesel": 2.45,
        "EV charging": 0.8,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "505 Central St",
      locality: "Hamilton",
      country: "New Zealand",
    },
    {
      id: 9,
      name: "Station 9",
      lat: -40.3523,
      lng: 175.6082,
      prices: {
        "ZX premium": 2.65,
        "Z91 unleaded": 2.55,
        "Z diesel": 2.25,
        "EV charging": 0.65,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "606 Market St",
      locality: "Palmerston North",
      country: "New Zealand",
    },
    {
      id: 10,
      name: "Station 10",
      lat: -36.89774,
      lng: 174.734467,
      prices: {
        "ZX premium": 2.55,
        "Z91 unleaded": 2.45,
        "Z diesel": 2.15,
        "EV charging": 0.55,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "707 Broadway",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 11,
      name: "Station 11",
      lat: -36.892807,
      lng: 174.736774,
      prices: {
        "ZX premium": 2.6,
        "Z91 unleaded": 2.5,
        "Z diesel": 2.3,
        "EV charging": 0.6,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z91 unleaded"],
      stationTypes: ["Service station"],
      street: "808 Victoria St",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 12,
      name: "Station 12",
      lat: -36.84856,
      lng: 174.737397,
      prices: {
        "ZX premium": 2.55,
        "Z91 unleaded": 2.45,
        "Z diesel": 2.25,
        "EV charging": 0.55,
      },
      services: "Car Wash, ATM",
      types: ["Z diesel", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "909 Albert St",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 13,
      name: "Station 13",
      lat: -36.857661,
      lng: 174.727493,
      prices: {
        "ZX premium": 2.5,
        "Z91 unleaded": 2.4,
        "Z diesel": 2.2,
        "EV charging": 0.5,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z diesel"],
      stationTypes: ["Service station"],
      street: "1010 Queen St",
      locality: "Auckland",
      country: "New Zealand",
    },
    {
      id: 14,
      name: "Station 14",
      lat: -36.877338,
      lng: 174.798334,
      prices: {
        "ZX premium": 2.65,
        "Z91 unleaded": 2.55,
        "Z diesel": 2.35,
        "EV charging": 0.65,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "1111 King St",
      locality: "Remuera",
      country: "New Zealand",
    },
    {
      id: 15,
      name: "Station 15",
      lat: -36.898261,
      lng: 174.816956,
      prices: {
        "ZX premium": 2.7,
        "Z91 unleaded": 2.6,
        "Z diesel": 2.4,
        "EV charging": 0.7,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z diesel"],
      stationTypes: ["Service station", "Truck stop"],
      street: "1212 Prince St",
      locality: "Ellerslie",
      country: "New Zealand",
    },
    {
      id: 16,
      name: "Station 16",
      lat: -36.86667,
      lng: 174.77799,
      prices: {
        "ZX premium": 2.75,
        "Z91 unleaded": 2.65,
        "Z diesel": 2.45,
        "EV charging": 0.75,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "1313 Duke St",
      locality: "Newmarket",
      country: "New Zealand",
    },
    {
      id: 17,
      name: "Station 17",
      lat: -36.889842,
      lng: 174.776556,
      prices: {
        "ZX premium": 2.8,
        "Z91 unleaded": 2.7,
        "Z diesel": 2.5,
        "EV charging": 0.8,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "1414 Earl St",
      locality: "Epsom",
      country: "New Zealand",
    },
    {
      id: 18,
      name: "Station 18",
      lat: -36.919848,
      lng: 174.747963,
      prices: {
        "ZX premium": 2.85,
        "Z91 unleaded": 2.75,
        "Z diesel": 2.55,
        "EV charging": 0.85,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "1515 Baron St",
      locality: "Mount Roskill",
      country: "New Zealand",
    },
    {
      id: 19,
      name: "Station 19",
      lat: -36.924446,
      lng: 174.783073,
      prices: {
        "ZX premium": 2.9,
        "Z91 unleaded": 2.8,
        "Z diesel": 2.6,
        "EV charging": 0.9,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "EV charging"],
      stationTypes: ["Truck stop"],
      street: "1616 Viscount St",
      locality: "Onehunga",
      country: "New Zealand",
    },
    {
      id: 20,
      name: "Station 20",
      lat: -36.918541,
      lng: 174.816111,
      prices: {
        "ZX premium": 2.95,
        "Z91 unleaded": 2.85,
        "Z diesel": 2.65,
        "EV charging": 0.95,
      },
      services: "Car Wash, ATM",
      types: ["Z91 unleaded", "Z diesel"],
      stationTypes: ["Service station"],
      street: "1717 Marquis St",
      locality: "Penrose",
      country: "New Zealand",
    },
    {
      id: 21,
      name: "Station 21",
      lat: -36.909376,
      lng: 174.840979,
      prices: {
        "ZX premium": 3.0,
        "Z91 unleaded": 2.9,
        "Z diesel": 2.7,
        "EV charging": 1.0,
      },
      services: "Car Wash, ATM",
      types: ["ZX premium", "Z91 unleaded"],
      stationTypes: ["Service station"],
      street: "1818 Duke St",
      locality: "Mount Wellington",
      country: "New Zealand",
    },
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
