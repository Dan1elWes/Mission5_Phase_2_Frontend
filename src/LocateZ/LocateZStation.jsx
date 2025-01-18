import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import HeaderMain from "../sharedComponents/Header1/Components/HeaderMain";
import { LocationSearch } from "../sharedComponents/FindZStation/Components/LocationSearch";
import Footer from "../sharedComponents/Footer/Footer";
import { GoogleMapsProvider } from "../sharedComponents/GoogleMapsLoader/GoogleMapsLoader";

export default function LocateZStation() {
  return (
    <div>
      <nav>
        <HeaderMain />
        <GoogleMapsProvider>
          <LocationSearch />
        </GoogleMapsProvider>
        <Outlet />
      </nav>
      <Footer />
    </div>
  );
}
