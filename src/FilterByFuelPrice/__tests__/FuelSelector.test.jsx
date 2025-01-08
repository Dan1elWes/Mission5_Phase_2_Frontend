import React from "react";
import { render, screen } from "@testing-library/react";
import { FuelSelector } from "../components/FuelSelector";

describe("FuelSelector", () => {
  it("renders all section titles", () => {
    render(<FuelSelector />);
    expect(screen.getByText("Select Fuel")).toBeInTheDocument();
    expect(screen.getByText("Select Fuel Range")).toBeInTheDocument();
    expect(screen.getByText("Select Station Type")).toBeInTheDocument();
    expect(screen.getByText("Sort by")).toBeInTheDocument();
  });

  it("renders all fuel types", () => {
    render(<FuelSelector />);
    expect(screen.getByText("ZX premium")).toBeInTheDocument();
    expect(screen.getByText("Z91 unleaded")).toBeInTheDocument();
    expect(screen.getByText("Z diesel")).toBeInTheDocument();
    expect(screen.getByText("EV charging")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<FuelSelector />);
    expect(screen.getByText("Reset filters")).toBeInTheDocument();
    expect(screen.getByText("Apply filters")).toBeInTheDocument();
  });
});
