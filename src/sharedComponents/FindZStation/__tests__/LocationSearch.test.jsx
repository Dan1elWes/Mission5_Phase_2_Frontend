import React from "react";
import { render, screen } from "@testing-library/react";
import { LocationSearch } from "../Components/LocationSearch";

describe("LocationSearch", () => {
  it("renders search input", () => {
    render(<LocationSearch />);
    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByLabelText("Search for location")).toBeInTheDocument();
  });

  it("renders current location button", () => {
    render(<LocationSearch />);
    expect(
      screen.getByRole("button", { name: /use current location/i })
    ).toBeInTheDocument();
  });

  it("renders filter tabs", () => {
    render(<LocationSearch />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(3);
  });
});
