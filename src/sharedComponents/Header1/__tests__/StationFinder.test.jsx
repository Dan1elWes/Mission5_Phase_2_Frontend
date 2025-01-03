import React from "react";
import { render, screen } from "@testing-library/react";
import StationFinder from "../StationFinder";

describe("StationFinder", () => {
  it("renders without crashing", () => {
    render(<StationFinder />);
  });

  it("contains main heading", () => {
    render(<StationFinder />);
    expect(screen.getByText("Find a station")).toBeInTheDocument();
  });

  it("renders all main components", () => {
    render(<StationFinder />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
