import React, { useState, useEffect } from 'react';
import { useJsApiLoader } from "@react-google-maps/api";
import { ServiceSelector } from './components/ServiceSelector';
import { StationLocations } from './components/StationLocations';

const API_KEY = import.meta.env.VITE_SECRET_KEY;

export default function FilterByServices({ currentLocation, zoomLevel = 6 }) {
  const [allStations, setAllStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedStationTypes, setSelectedStationTypes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places", "geometry"],
  });

  // Initial data fetch
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:5000/fuelstations");
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setAllStations(data);
        setFilteredStations(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching stations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isMapLoaded) {
      fetchStations();
    }
  }, [isMapLoaded]);

  // Don't render anything until both map is loaded and initial data is fetched
  if (!isMapLoaded || loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ServiceSelector
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
        filteredStations={filteredStations}
        currentLocation={currentLocation}
        zoomLevel={zoomLevel}
      />
    </div>
  );
}
