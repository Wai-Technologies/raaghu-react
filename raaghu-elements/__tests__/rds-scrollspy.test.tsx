import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsScrollspy from "../src/rds-scrollspy/rds-scrollspy";
import "@testing-library/jest-dom";

const mockData = [
  { id: "1", title: "First", header: "First header", content: "First content" },
  { id: "2", title: "Second", header: "Second header", content: "Second content" },
  { id: "3", title: "Third", header: "Third header", content: "Third content" },
];

describe("RdsScrollspy", () => {
  it("renders navigation links for each item", () => {
    render(<RdsScrollspy data={mockData} />);
    mockData.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it("renders headers and content for each item", () => {
    render(<RdsScrollspy data={mockData} />);
    mockData.forEach(item => {
      expect(screen.getByText(item.header)).toBeInTheDocument();
      expect(screen.getByText(item.content)).toBeInTheDocument();
    });
  });

  it("renders 'Go Top' link for each section", () => {
    render(<RdsScrollspy data={mockData} />);
    const goTopLinks = screen.getAllByText("Go Top");
    expect(goTopLinks.length).toBe(mockData.length);
  });

  test("clicking a navigation link scrolls to the appropriate section", () => {
    const { getAllByText, getByText } = render(<RdsScrollspy data={mockData} />);
    const firstSectionLink = getByText("First");
    fireEvent.click(firstSectionLink);
    const firstHeader = getByText("First header");
    expect(firstHeader).toBeInTheDocument();
  });
});
