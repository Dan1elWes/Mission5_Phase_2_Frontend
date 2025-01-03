import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Z App")).toBeInTheDocument();
    expect(screen.getByText("About Z")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders business/personal buttons", () => {
    render(<Header />);
    expect(screen.getByText("For personal")).toBeInTheDocument();
    expect(screen.getByText("For business")).toBeInTheDocument();
  });

  it("renders all images with alt text", () => {
    render(<Header />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  it("buttons are clickable", () => {
    render(<Header />);
    const personalButton = screen.getByText("For personal");
    const businessButton = screen.getByText("For business");

    fireEvent.click(personalButton);
    fireEvent.click(businessButton);
  });
});
