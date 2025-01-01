import React from "react";
import { render, screen } from "@testing-library/react";
import { FilterTab } from "../components/FilterTab";

describe("FilterTab", () => {
  it("renders with correct active state", () => {
    render(<FilterTab label="Test Tab" isActive={true} tabIndex={0} />);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveTextContent("Test Tab");
  });

  it("renders with correct inactive state", () => {
    render(<FilterTab label="Test Tab" isActive={false} tabIndex={0} />);
    const tab = screen.getByRole("tab");
    expect(tab).toHaveAttribute("aria-selected", "false");
  });
});
