import { render, screen } from "@testing-library/react";
import { StationFinder } from "../Components/StationFinder";

describe("StationFinder", () => {
  it("renders heading text correctly", () => {
    render(<StationFinder />);
    const headingElement = screen.getByText("Find a station");
    expect(headingElement).toBeInTheDocument();
  });

  it("has correct heading level for accessibility", () => {
    render(<StationFinder />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
  });
});
