import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIconList from "../src/rds-comp-icon-list/rds-comp-icon-list";
import { Icons } from "../src/rds-comp-icon-list/Icons";

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

// Mock the setTimeout function
jest.useFakeTimers();

// Mock the IconPosition enum
jest.mock("../../raaghu-elements/src/rds-search/rds-search", () => ({
  IconPosition: {
    Left: "left",
    Right: "right",
  }
}));

// Mock the rds-elements
jest.mock("../src/rds-elements", () => ({
  RdsIcon: jest.fn(({ name, dataTestId }) => (
    <div data-testid={dataTestId || "mocked-icon"} data-name={name}>
      {name}
    </div>
  )),
  RdsSearch: jest.fn(({ placeholder, onChange, value, dataTestId }) => (
    <input
      data-testid={dataTestId}
      placeholder={placeholder}
      onChange={onChange}
      value={value || ""}
    />
  )),
}));

describe("RdsCompIconList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test basic rendering
  test("should render the icon list component", () => {
    const { container } = render(<RdsCompIconList />);
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("search")).toBeInTheDocument();
  });  // Test that icons are rendered
  test("should render icons from the Icons object", () => {
    render(<RdsCompIconList />);
    
    // Get a few sample icon names
    const iconKeys = Object.keys(Icons);
    const sampleIconKeys = iconKeys.slice(0, 3);
    
    // Check if those icons are rendered in the DOM
    // The icons are rendered by the mocked RdsIcon component with the name as text content
    for (const iconName of sampleIconKeys) {
      const iconElements = screen.getAllByTestId("icon-list");
      const matchingIcon = iconElements.find(el => el.getAttribute('data-name') === iconName);
      expect(matchingIcon).not.toBeUndefined();
      expect(matchingIcon).toBeInTheDocument();
    }
    
    // Verify that icons have the correct data-testid and count
    const iconElements = screen.getAllByTestId("icon-list");
    expect(iconElements.length).toBe(iconKeys.length);
  });

  // Test search functionality
  test("should filter icons when searching", () => {
    render(<RdsCompIconList />);
    
    const searchInput = screen.getByTestId("search");
    const allIconKeys = Object.keys(Icons);
    
    // Find an icon name to search for
    const searchTerm = "arrow"; // Assuming there are icons with "arrow" in their name
    const expectedFilteredIcons = allIconKeys.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Perform search
    fireEvent.change(searchInput, { target: { value: searchTerm } });
    
    // After search, only filtered icons should be displayed
    const iconElements = screen.getAllByTestId("icon-list");
    expect(iconElements.length).toBe(expectedFilteredIcons.length);
  });  // Test copy to clipboard functionality
  test("should copy icon code to clipboard when clicked", () => {
    const { rerender } = render(<RdsCompIconList />);
    
    // Get the first icon card
    const iconKey = Object.keys(Icons)[0];
    const iconElements = screen.getAllByTestId("icon-list");
    const matchingIcon = iconElements.find(el => el.getAttribute('data-name') === iconKey);
    
    if (!matchingIcon) {
      throw new Error(`Icon with name ${iconKey} not found`);
    }
    
    const iconCard = matchingIcon.closest('div[class*="card"]');
    
    if (!iconCard) {
      throw new Error('Card container not found');
    }
    
    // Click on the icon card to copy
    fireEvent.click(iconCard);
    
    // Check if clipboard.writeText was called with correct template
    const expectedTemplate = `<RdsIcon name="${iconKey}" height="20px" width="20px" fill={false} stroke={true} />`;
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expectedTemplate);
    
    // After click, the "copy" icon should change to "check" icon temporarily
    // Advance timers to simulate the setTimeout callback
    jest.runAllTimers();
    
    // Force a re-render of the component to reflect the state change
    rerender(<RdsCompIconList />);
    
    // Verify that identity state is reset after timeout
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
  });// Test error handling in copy to clipboard
  test("should handle clipboard copy errors", async () => {
    // Mock console.error to test error path
    const originalConsoleError = console.error;
    console.error = jest.fn();
    
    // Mock clipboard failure - must reject the promise for the error handler to be called
    const writeTextMock = navigator.clipboard.writeText as jest.Mock;
    writeTextMock.mockRejectedValueOnce(new Error("Clipboard error"));
    
    render(<RdsCompIconList />);
    
    // Get the first icon card
    const iconKey = Object.keys(Icons)[0];
    const iconElements = screen.getAllByTestId("icon-list");
    const matchingIcon = iconElements.find(el => el.getAttribute('data-name') === iconKey);
    
    if (!matchingIcon) {
      throw new Error(`Icon with name ${iconKey} not found`);
    }
    
    const iconCard = matchingIcon.closest('div[class*="card"]');
    
    if (!iconCard) {
      throw new Error('Card container not found');
    }
    
    // Click on the icon card to copy
    fireEvent.click(iconCard);
    
    // Wait for the promise rejection to be handled
    await Promise.resolve();
    
    // Error should be logged
    expect(console.error).toHaveBeenCalledWith(
      "Failed to copy text: ", 
      expect.objectContaining({ message: "Clipboard error" })
    );
    
    // Restore console.error
    console.error = originalConsoleError;
  });
  // Test resetting search
  test("should reset icon list when search field is cleared", () => {
    render(<RdsCompIconList />);
    
    const searchInput = screen.getByTestId("search");
    const allIconKeys = Object.keys(Icons);
    
    // First perform a search
    fireEvent.change(searchInput, { target: { value: "arrow" } });
    
    // Then clear the search
    fireEvent.change(searchInput, { target: { value: "" } });
    
    // All icons should be displayed again
    const iconElements = screen.getAllByTestId("icon-list");
    expect(iconElements.length).toBe(allIconKeys.length);
  });  // Test icon identity state changes
  test("should show check icon when an icon is copied", () => {
    const { rerender } = render(<RdsCompIconList />);
    
    // Get the first icon card
    const iconKey = Object.keys(Icons)[0];
    const iconElements = screen.getAllByTestId("icon-list");
    const matchingIcon = iconElements.find(el => el.getAttribute('data-name') === iconKey);
    
    if (!matchingIcon) {
      throw new Error(`Icon with name ${iconKey} not found`);
    }
    
    const iconCard = matchingIcon.closest('div[class*="card"]');
    
    if (!iconCard) {
      throw new Error('Card container not found');
    }
    
    // Get initial number of check icons (should be 0)
    const initialCheckIcons = document.querySelectorAll('.text-success.iconcopy');
    expect(initialCheckIcons.length).toBe(0);
    
    // Click on the icon card to copy
    fireEvent.click(iconCard);
    
    // After click, the "copy" icon should change to "check" icon
    const checkIcons = document.querySelectorAll('.text-success.iconcopy');
    expect(checkIcons.length).toBe(1);
    
    // Advance timers to simulate the setTimeout callback
    jest.runAllTimers(); // This will run all pending timers completely
    
    // Force a re-render of the component to reflect the state change
    rerender(<RdsCompIconList />);
    
    // After timeout, the check icon should disappear
    const finalCheckIcons = document.querySelectorAll('.text-success.iconcopy');
    expect(finalCheckIcons.length).toBe(0);
  });
  
  // Test search with no matches
  test("should display no icons when search has no matches", () => {
    render(<RdsCompIconList />);
    
    const searchInput = screen.getByTestId("search");
    
    // Search for a term that doesn't exist in any icon name
    const nonExistentSearchTerm = "xyznonexistentterm123";
    fireEvent.change(searchInput, { target: { value: nonExistentSearchTerm } });
    
    // Try to find icons after the search
    // This should return an empty list, but getAllByTestId would throw an error
    // So we use queryAllByTestId instead
    const iconElements = screen.queryAllByTestId("icon-list");
    expect(iconElements.length).toBe(0);
  });
});