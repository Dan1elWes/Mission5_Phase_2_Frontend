import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import { LocationSearch } from "../sharedComponents/FindZStation/Components/LocationSearch";
import Footer from "../sharedComponents/Footer/Footer";

export default function LocateZStation() {
  return (
    <div>
      <nav>
        <HeaderMain />
        <LocationSearch />
        <Outlet />
      </nav>
      <Footer />
    </div>
  );
}
