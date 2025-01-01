import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound/PageNotFound";
import HomePage from "./HomePage/HomePage";
import LocateZStation from "./LocateZ/LocateZStation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/locate-z-station" element={<LocateZStation />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
