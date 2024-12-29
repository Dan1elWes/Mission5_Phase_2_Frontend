import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import HomePage from "./HomePage/HomePage";
import LocateZStation from "./LocateZ/LocateZStation";
import FilterByServices from "./FilterByServices/FilterByServices";
import FilterByPrice from "./FilterByFuelPrice/FilterByPrice";
import FilterByDistance from "./FilterByDistance/FilterByDistance";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locate-z-station" element={<LocateZStation />}>
          <Route
            path="/locate-z-station/filter-by-services"
            element={<FilterByServices />}
          />
          <Route
            path="/locate-z-station/filter-by-price"
            element={<FilterByPrice />}
          />
          <Route
            path="/locate-z-station/filter-by-distance"
            element={<FilterByDistance />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
