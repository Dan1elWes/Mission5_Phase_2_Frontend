import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("renders menu items", () => {
    render(<Navigation />);
    expect(screen.getByText("At the station")).toBeInTheDocument();
    expect(screen.getByText("Power")).toBeInTheDocument();
    expect(screen.getByText("Rewards and promotions")).toBeInTheDocument();
  });

  it("renders locate button", () => {
    render(<Navigation />);
    expect(screen.getByText("Locate Z Station")).toBeInTheDocument();
  });

  it("renders all images with alt text", () => {
    render(<Navigation />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("locate button is clickable", () => {
    render(<Navigation />);
    const locateButton = screen.getByText("Locate Z Station").closest("button");
    fireEvent.click(locateButton);
  });

  it("menu items are clickable", () => {
    render(<Navigation />);
    const menuItems = screen.getAllByRole("img");
    menuItems.forEach((item) => {
      fireEvent.click(item);
    });
  });
});
