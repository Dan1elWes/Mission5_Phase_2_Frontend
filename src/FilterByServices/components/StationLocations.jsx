import React from 'react';
import { GoogleMap, OverlayView, Marker } from "@react-google-maps/api";
import styles from '../FilterByServices.module.css';
import zlogo from '../../assets/images/zlogo.png';

export function StationLocations({ currentLocation, zoomLevel, filteredStations, calculateDistance }) {
  console.log('StationLocations props:', { currentLocation, zoomLevel, filteredStations });
  
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
          mapTypeControl: false,
          zoomControl: true,
        }}
      >
        <Marker
          position={{
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
          }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          }}
        />
        {filteredStations && filteredStations.map((station) => (
          <OverlayView
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className={styles.servicesOverlayContainer}>
              <img
                src="src/assets/images/zlogo.png"
                alt="Z Station"
                className={styles.servicesLogo}
              />
              <div className={styles.servicesStationInfo}>
                <div className={styles.servicesStationName}>{station.name}</div>
                <div className={styles.servicesStationServices}>
                  {station.services}
                </div>
                <div className={styles.servicesDistanceLabel}>
                  {calculateDistance(station, currentLocation).toFixed(2)} km
                </div>
              </div>
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
}
