import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompIcon from "../src/rds-comp-icon/rds-comp-icon";

// Set up fetch mock before any imports
if (typeof global.fetch !== 'function') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>'),
    })
  ) as jest.Mock;
}

// Mock window.URL.createObjectURL if needed
if (typeof window.URL.createObjectURL !== 'function') {
  Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(() => 'mock-url') });
}

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsCompIcon", () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    if (global.fetch) {
      (global.fetch as jest.Mock).mockClear();
    }
  });

  it("Icon renders correctly with default props", async () => {
    const { container } = render(<RdsCompIcon name="circle" />);
    
    // Since the icon might be loaded asynchronously, use container to check
    expect(container).not.toBeEmptyDOMElement();
  });
  
  it("Icon renders with custom width and height", () => {
    const { container } = render(<RdsCompIcon name="circle" width="32px" height="32px" />);
    
    // Check if the container has content
    expect(container).not.toBeEmptyDOMElement();
  });
  
  it("Icon renders with custom classes", () => {
    const { container } = render(<RdsCompIcon name="circle" classes="custom-class" />);
    
    // Check if the container has the custom class
    expect(container.innerHTML).toContain("custom-class");
  });
  
  it("Icon renders with fill option", () => {
    const { container } = render(<RdsCompIcon name="circle" fill={true} />);
    
    // Check if the container has content
    expect(container).not.toBeEmptyDOMElement();
  });
});