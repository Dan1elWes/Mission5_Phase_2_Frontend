import React from "react";
import { FuelSelector } from "./components/FuelSelector";
import StationLocations from "./components/StationLocations";

export default function FilterByFuelPrice() {
  return (
    <div>
      <FuelSelector />
      <StationLocations />
    </div>
  );
}
