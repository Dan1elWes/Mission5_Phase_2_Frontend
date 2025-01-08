// import React from "react";
// import styles from "../styles/StationLocations.module.css";
// import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
// import { useState, useEffect } from "react";

// const allStations = [
//   {
//     id: 1,
//     name: "Station 1",
//     lat: -40.9006,
//     lng: 174.886,
//     price: 2.5,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z91 unleaded"],
//     stationTypes: ["Service station"],
//     street: "123 Main St",
//     locality: "Wellington",
//     country: "New Zealand",
//   },
//   {
//     id: 2,
//     name: "Station 2",
//     lat: -36.8524555,
//     lng: 174.7580782,
//     price: 2.0,
//     services: "Car Wash, ATM",
//     types: ["Z diesel", "EV charging"],
//     stationTypes: ["Truck stop", "Service station"],
//     street: "456 Queen St",
//     locality: "Auckland",
//     country: "New Zealand",
//   },
//   {
//     id: 3,
//     name: "Station 3",
//     lat: -41.2865,
//     lng: 174.7762,
//     price: 2.3,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "789 King St",
//     locality: "Wellington",
//     country: "New Zealand",
//   },
//   {
//     id: 4,
//     name: "Station 4",
//     lat: -43.5321,
//     lng: 172.6362,
//     price: 2.4,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "101 North St",
//     locality: "Christchurch",
//     country: "New Zealand",
//   },
//   {
//     id: 5,
//     name: "Station 5",
//     lat: -45.8788,
//     lng: 170.5028,
//     price: 2.2,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z diesel"],
//     stationTypes: ["Service station", "Truck stop"],
//     street: "202 South St",
//     locality: "Dunedin",
//     country: "New Zealand",
//   },
//   {
//     id: 6,
//     name: "Station 6",
//     lat: -39.4928,
//     lng: 176.912,
//     price: 2.1,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "303 East St",
//     locality: "Napier",
//     country: "New Zealand",
//   },
//   {
//     id: 7,
//     name: "Station 7",
//     lat: -38.1368,
//     lng: 176.2497,
//     price: 2.35,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "404 West St",
//     locality: "Rotorua",
//     country: "New Zealand",
//   },
//   {
//     id: 8,
//     name: "Station 8",
//     lat: -37.787,
//     lng: 175.2793,
//     price: 2.45,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "505 Central St",
//     locality: "Hamilton",
//     country: "New Zealand",
//   },
//   {
//     id: 9,
//     name: "Station 9",
//     lat: -40.3523,
//     lng: 175.6082,
//     price: 2.25,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "606 Market St",
//     locality: "Palmerston North",
//     country: "New Zealand",
//   },
//   {
//     id: 10,
//     name: "Station 10",
//     lat: -36.89774,
//     lng: 174.734467,
//     price: 2.15,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "707 Broadway",
//     locality: "Auckland",
//     country: "New Zealand",
//   },
//   {
//     id: 11,
//     name: "Station 11",
//     lat: -36.892807,
//     lng: 174.736774,
//     price: 2.3,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z91 unleaded"],
//     stationTypes: ["Service station"],
//     street: "808 Victoria St",
//     locality: "Auckland",
//     country: "New Zealand",
//   },
//   {
//     id: 12,
//     name: "Station 12",
//     lat: -36.84856,
//     lng: 174.737397,
//     price: 2.25,
//     services: "Car Wash, ATM",
//     types: ["Z diesel", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "909 Albert St",
//     locality: "Auckland",
//     country: "New Zealand",
//   },
//   {
//     id: 13,
//     name: "Station 13",
//     lat: -36.857661,
//     lng: 174.727493,
//     price: 2.2,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "1010 Queen St",
//     locality: "Auckland",
//     country: "New Zealand",
//   },
//   {
//     id: 14,
//     name: "Station 14",
//     lat: -36.877338,
//     lng: 174.798334,
//     price: 2.35,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "1111 King St",
//     locality: "Remuera",
//     country: "New Zealand",
//   },
//   {
//     id: 15,
//     name: "Station 15",
//     lat: -36.898261,
//     lng: 174.816956,
//     price: 2.4,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z diesel"],
//     stationTypes: ["Service station", "Truck stop"],
//     street: "1212 Prince St",
//     locality: "Ellerslie",
//     country: "New Zealand",
//   },
//   {
//     id: 16,
//     name: "Station 16",
//     lat: -36.86667,
//     lng: 174.77799,
//     price: 2.45,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "1313 Duke St",
//     locality: "Newmarket",
//     country: "New Zealand",
//   },
//   {
//     id: 17,
//     name: "Station 17",
//     lat: -36.889842,
//     lng: 174.776556,
//     price: 2.5,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "1414 Earl St",
//     locality: "Epsom",
//     country: "New Zealand",
//   },
//   {
//     id: 18,
//     name: "Station 18",
//     lat: -36.919848,
//     lng: 174.747963,
//     price: 2.55,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "1515 Baron St",
//     locality: "Mount Roskill",
//     country: "New Zealand",
//   },
//   {
//     id: 19,
//     name: "Station 19",
//     lat: -36.924446,
//     lng: 174.783073,
//     price: 2.6,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "EV charging"],
//     stationTypes: ["Truck stop"],
//     street: "1616 Viscount St",
//     locality: "Onehunga",
//     country: "New Zealand",
//   },
//   {
//     id: 20,
//     name: "Station 20",
//     lat: -36.918541,
//     lng: 174.816111,
//     price: 2.65,
//     services: "Car Wash, ATM",
//     types: ["Z91 unleaded", "Z diesel"],
//     stationTypes: ["Service station"],
//     street: "1717 Marquis St",
//     locality: "Penrose",
//     country: "New Zealand",
//   },
//   {
//     id: 21,
//     name: "Station 21",
//     lat: -36.909376,
//     lng: 174.840979,
//     price: 2.7,
//     services: "Car Wash, ATM",
//     types: ["ZX premium", "Z91 unleaded"],
//     stationTypes: ["Service station"],
//     street: "1818 Duke St",
//     locality: "Mount Wellington",
//     country: "New Zealand",
//   },
// ];

// export default function StationLocations({ currentLocation, zoomLevel }) {
//   const [position, setPosition] = useState({ lat: -40.9006, lng: 174.886 }); // Default position (New Zealand)
//   const [selectedStation, setSelectedStation] = useState(null);

//   useEffect(() => {
//     console.log("Props passed to StationLocations :", {
//       currentLocation,
//       zoomLevel,
//     });
//     if (currentLocation.latitude && currentLocation.longitude) {
//       const { latitude, longitude } = currentLocation;
//       setPosition({ lat: latitude, lng: longitude });
//     }
//   }, [currentLocation]);

//   const handleMarkerClick = (station) => {
//     setSelectedStation(station);
//   };

//   const handleInfoWindowCloseClick = () => {
//     setSelectedStation(null);
//   };

//   return (
//     <div className={styles.responsiveContainer}>
//       <GoogleMap
//         mapContainerClassName={styles.stationLocationsContainer}
//         center={position}
//         zoom={zoomLevel}
//       >
//         {allStations.map((station) => (
//           <Marker
//             key={station.id}
//             position={{ lat: station.lat, lng: station.lng }}
//             onClick={() => handleMarkerClick(station)}
//           />
//         ))}

//         {selectedStation && (
//           <InfoWindow
//             position={{ lat: selectedStation.lat, lng: selectedStation.lng }}
//             onCloseClick={handleInfoWindowCloseClick}
//           >
//             <div className={styles.infoWindowContent}>
//               <h2>{selectedStation.name}</h2>
//               <p>
//                 {selectedStation.street}, {selectedStation.locality},{" "}
//                 {selectedStation.country}
//               </p>
//               <p>Price: ${selectedStation.price}</p>
//               <p>Services: {selectedStation.services}</p>
//               <p>Types: {selectedStation.types.join(", ")}</p>
//               <p>Station Types: {selectedStation.stationTypes.join(", ")}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// }
