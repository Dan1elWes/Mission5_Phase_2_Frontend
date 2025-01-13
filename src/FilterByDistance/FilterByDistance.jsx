import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import './FilterByDistance.css';

const FilterByDistance = ({ stations, onDistanceChange }) => {
  const [radius, setRadius] = useState(5); // Default 5km radius
  const [center, setCenter] = useState({
    lat: -36.8485, // Default to Auckland
    lng: 174.7633
  });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setCenter(location);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const handleRadiusChange = (event) => {
    const newRadius = parseInt(event.target.value);
    setRadius(newRadius);
    onDistanceChange(newRadius);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const circleOptions = {
    strokeColor: '#ED5910',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FEA03A',
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: radius * 1000, // Convert km to meters
    zIndex: 1
  };

  return (
    <div className="filter-by-distance">
      <div className="filter-controls">
        <label htmlFor="radius">Search radius:</label>
        <div className="radius-slider">
          <input
            type="range"
            id="radius"
            min="1"
            max="50"
            value={radius}
            onChange={handleRadiusChange}
          />
          <span>{radius} km</span>
        </div>
      </div>

      <LoadScript googleMapsApiKey={process.env.VITE_SECRET_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={11}
        >
          {userLocation && (
            <>
              <Marker
                position={userLocation}
                icon={{
                  url: '/marker-icon.png',
                  scaledSize: { width: 40, height: 40 }
                }}
              />
              <Circle
                center={userLocation}
                options={circleOptions}
              />
            </>
          )}
          
          {stations && stations.map((station, index) => (
            <Marker
              key={index}
              position={{ lat: station.latitude, lng: station.longitude }}
              icon={{
                url: '/z-station-marker.png',
                scaledSize: { width: 32, height: 32 }
              }}
              title={station.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default FilterByDistance;
