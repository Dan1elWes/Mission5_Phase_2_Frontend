import React, { useState, useEffect } from 'react';
import FilterByDistance from './FilterByDistance';
import './StationLocator.css';

const StationLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  // Sample station data (replace with actual API call)
  const sampleStations = [
    {
      id: 1,
      name: "Z Newmarket",
      address: "123 Broadway, Newmarket",
      latitude: -36.8688,
      longitude: 174.7766,
      services: ["Cafe", "Car Wash", "Shop"],
      fuelPrices: {
        "91": 2.89,
        "95": 3.09,
        "Diesel": 2.29
      }
    },
    // Add more sample stations as needed
  ];

  // Function to search stations
  const searchStations = async (query) => {
    try {
      setIsSearching(true);
      const response = await fetch(`http://localhost:5000/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setStations(data.results);
      } else {
        console.error('Search failed:', data.error);
      }
    } catch (error) {
      console.error('Error searching stations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      searchStations(query);
    } else if (query.length === 0) {
      fetchAllStations();
    }
  };

  const fetchAllStations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      
      if (data.success) {
        setStations(data.items);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
      // Use sample data for development
      setStations(sampleStations);
    }
  };

  useEffect(() => {
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

    fetchAllStations();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleDistanceChange = (newDistance) => {
    setDistanceFilter(newDistance);
  };

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

  const handleStationClick = (station) => {
    setSelectedStation(station);
  };

  return (
    <div className="station-locator">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search stations by name, address, or services..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        {isSearching && <span className="searching-indicator">Searching...</span>}
      </div>

      <div className="main-content">
        <div className="map-section">
          <FilterByDistance
            stations={filteredStations}
            onDistanceChange={handleDistanceChange}
            selectedStation={selectedStation}
          />
        </div>

        <div className="stations-list">
          <h2>Nearby Z Stations</h2>
          {userLocation ? (
            filteredStations.length > 0 ? (
              filteredStations.map(station => (
                <div 
                  key={station.id} 
                  className={`station-card ${selectedStation?.id === station.id ? 'selected' : ''}`}
                  onClick={() => handleStationClick(station)}
                >
                  <h3>{station.name}</h3>
                  <p className="address">{station.address}</p>
                  {station.fuelPrices && (
                    <div className="fuel-prices">
                      {Object.entries(station.fuelPrices).map(([type, price]) => (
                        <div key={type} className="fuel-price">
                          <span className="fuel-type">{type}</span>
                          <span className="price">${price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
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
    </div>
  );
};

export default StationLocator;
