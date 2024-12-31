import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";

export default function LocateZStation() {
  return (
    <nav>
      <HeaderMain />
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

