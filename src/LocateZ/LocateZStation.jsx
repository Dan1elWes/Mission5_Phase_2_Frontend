import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function LocateZStation() {
  return (
    <nav>
      <h1>Locate Z Station</h1>
      <NavLink to="/locate-z-station/filter-by-services">
        Filter by services
      </NavLink>
      <NavLink to="/locate-z-station/filter-by-price">
        Filter by fuel price
      </NavLink>
      <NavLink to="/locate-z-station/filter-by-distance">
        Filter by distance
      </NavLink>
      <Outlet />
    </nav>
  );
}
