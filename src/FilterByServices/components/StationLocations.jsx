import React, { useEffect, useState } from 'react';
import { GoogleMap, OverlayView, Marker } from "@react-google-maps/api";
import styles from '../FilterByServices.module.css';
import zlogo from '../../assets/images/zlogo.png';

export function StationLocations({ currentLocation, zoomLevel, filteredStations }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [stationDistances, setStationDistances] = useState({});

  useEffect(() => {
    if (map && filteredStations && filteredStations.length > 0) {
      setMarkers(filteredStations);
      
      // Calculate distances for all stations
      const distances = {};
      filteredStations.forEach(station => {
        distances[station.id] = calculateDistance(station, currentLocation);
      });
      setStationDistances(distances);

      // Update map center and zoom
      map.panTo({ lat: currentLocation.latitude, lng: currentLocation.longitude });
      map.setZoom(13);
    }
  }, [map, filteredStations, currentLocation]);
  
  const calculateDistance = (station, location) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = location.latitude * Math.PI / 180;
    const lat2 = station.lat * Math.PI / 180;
    const deltaLat = (station.lat - location.latitude) * Math.PI / 180;
    const deltaLon = (station.lng - location.longitude) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance;
  };

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);
  
  return (
    <div className={styles.servicesMapContainer}>
      <GoogleMap
        mapContainerClassName={styles.servicesMap}
        center={{
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }}
        zoom={zoomLevel}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Current location marker */}
        <Marker
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          icon={{
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#4285F4" stroke="white" stroke-width="2"/>
              </svg>
            `),
            anchor: { x: 12, y: 12 },
          }}
        />
        
        {/* Station markers */}
        {markers.map((station) => (
          <OverlayView
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className={styles.servicesOverlayContainer}>
              <img
                src={zlogo}
                alt="Z Station"
                className={styles.servicesLogo}
              />
              <div className={styles.servicesStationInfo}>
                <div className={styles.servicesStationName}>{station.name}</div>
                <div className={styles.servicesStationServices}>
                  {station.services}
                </div>
                <div className={styles.servicesDistanceLabel}>
                  {stationDistances[station.id]?.toFixed(2) || '0.00'} km
                </div>
              </div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
}
