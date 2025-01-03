import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import { LocationSearch } from "../sharedComponents/FindZStation/Components/LocationSearch";

export default function LocateZStation() {
  return (
    <nav>
      <HeaderMain />
      <LocationSearch />
      <Outlet />
    </nav>
  );
}
