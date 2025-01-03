import React from "react";
import { render, screen } from "@testing-library/react";
import StationLocator from "../stationFinder/StationLocator";

describe("StationLocator", () => {
  it("renders main heading", () => {
    render(<StationLocator />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Find a station");
  });

  it("applies correct styling", () => {
    render(<StationLocator />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("title");
  });
});
