import React, { createContext, useContext, useState, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// Define the libraries to load
const GOOGLE_MAPS_LIBRARIES = ["places", "geometry"]; // Add other libraries as needed
const API_KEY = import.meta.env.VITE_SECRET_KEY; // Use the environment variable for the API key

// Create a context to store the Google Maps loading state
const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES, // Always use the same libraries array
    version: "weekly",
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

// Custom hook to access the Google Maps loading state
export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
