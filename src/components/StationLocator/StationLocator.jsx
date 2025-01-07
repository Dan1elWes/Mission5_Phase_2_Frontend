import React, { useState, useEffect } from 'react';
import './StationLocator.css';

const StationLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(5); // Default 5km radius

  // Sample station data (replace with actual API call)
  const sampleStations = [
    {
      id: 1,
      name: "Z Newmarket",
      address: "123 Broadway, Newmarket",
      latitude: -36.8688,
      longitude: 174.7766,
      services: ["Cafe", "Car Wash", "Shop"],
    },
    // Add more sample stations
  ];

  useEffect(() => {
    // Get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    // Set initial stations data
    setStations(sampleStations);
  }, []);

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Filter stations based on distance
  useEffect(() => {
    if (userLocation) {
      const filtered = stations.filter(station => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          station.latitude,
          station.longitude
        );
        return distance <= distanceFilter;
      });
      setFilteredStations(filtered);
    }
  }, [userLocation, stations, distanceFilter]);

  const handleDistanceChange = (event) => {
    setDistanceFilter(Number(event.target.value));
  };

  return (
    <div className="station-locator">
      <div className="filter-section">
        <h2>Find Z Stations Near You</h2>
        <div className="distance-filter">
          <label htmlFor="distance">Distance (km):</label>
          <select 
            id="distance" 
            value={distanceFilter} 
            onChange={handleDistanceChange}
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="15">15 km</option>
            <option value="20">20 km</option>
            <option value="25">25 km</option>
          </select>
        </div>
      </div>

      <div className="stations-list">
        {userLocation ? (
          filteredStations.length > 0 ? (
            filteredStations.map(station => (
              <div key={station.id} className="station-card">
                <h3>{station.name}</h3>
                <p>{station.address}</p>
                <div className="station-services">
                  {station.services.map(service => (
                    <span key={service} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
                <button className="view-details-btn">View Details</button>
              </div>
            ))
          ) : (
            <p className="no-stations">No stations found within {distanceFilter}km</p>
          )
        ) : (
          <p className="loading">Getting your location...</p>
        )}
      </div>
    </div>
  );
};

export default StationLocator;
