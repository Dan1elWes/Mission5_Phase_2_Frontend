import React from "react";
import {NavLink} from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <nav>
        <NavLink to="/locate-z-station">Locate Z Station</NavLink>
      </nav>
    </>
  );
}
