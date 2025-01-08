import React, { useState, useEffect } from 'react';
import './StationLocator.css';

const StationLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  // Handle search input changes
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    // Debounce search to avoid too many requests
    if (query.length >= 2) {
      searchStations(query);
    } else if (query.length === 0) {
      // Reset to all stations when search is cleared
      fetchAllStations();
    }
  };

  // Fetch all stations
  const fetchAllStations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items');
      const data = await response.json();
      
      if (data.success) {
        setStations(data.items);
      }
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

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

    // Fetch initial stations data
    fetchAllStations();
  }, []);

  // Calculate distance between two points using Haversine formula
  // The Haversine formula is a mathematical equation that calculates the shortest 
  // distance between two points on a sphere (in our case, Earth) using their latitude and 
  //longitude coordinates. It's particularly useful for finding real-world distances between locations.
  
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
        
        {/* Search input */}
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
