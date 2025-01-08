import React from 'react';
import { GoogleMap, OverlayView, Marker } from "@react-google-maps/api";
import styles from '../FilterByServices.module.css';

export function StationLocations({ currentLocation, zoomLevel, filteredStations, calculateDistance }) {
  console.log('StationLocations props:', { currentLocation, zoomLevel, filteredStations });
  
  return (
    <div className={styles.mapContainer}>
      <GoogleMap
        mapContainerClassName={styles.map}
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
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
        {filteredStations && filteredStations.map((station) => (
          <Marker
            key={station.id}
            position={{ lat: station.lat, lng: station.lng }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          >
            <OverlayView
              position={{ lat: station.lat, lng: station.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className={styles.overlayContainer}>
                <img
                  src="src/assets/images/zlogo.png"
                  alt="Z Station"
                  className={styles.logo}
                />
                <div className={styles.stationInfo}>
                  <div className={styles.stationName}>{station.name}</div>
                  <div className={styles.stationServices}>
                    {station.services.join(", ")}
                  </div>
                  <div className={styles.distanceLabel}>
                    {calculateDistance(station, currentLocation).toFixed(2)} km
                  </div>
                </div>
              </div>
            </OverlayView>
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}
