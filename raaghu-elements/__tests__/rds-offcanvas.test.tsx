import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { RdsOffcanvas } from "../src";
import { RdsOffcanvasBackDrop, RdsOffcanvasPlacement } from "../src/rds-offcanvas/rds-offcanvas";

// Mock RdsIcon component to fix fetch issue
jest.mock("../src/rds-icon", () => ({
  __esModule: true,
  default: jest.fn(({ name }) => (
    <img src="test-icon.svg" alt={name} role="img" data-testid={`icon-${name}`} />
  ))
}));

jest.mock('lottie-web');
jest.mock('react-lottie-player', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("RdsOffcanvas", () => {
  // Basic rendering tests
  it("renders without crashing", () => {
    const { getByText } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-1" 
        canvasTitle="My Offcanvas" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        Hello World
      </RdsOffcanvas>
    );
    expect(getByText("Hello World")).toBeInTheDocument();
    expect(getByText("My Offcanvas")).toBeInTheDocument();
  });

  // Test different placements
  it("applies correct class based on placement", () => {
    const { container, rerender } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-1" 
        canvasTitle="My Offcanvas" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        Content
      </RdsOffcanvas>
    );
    
    expect(container.querySelector(".offcanvas-end")).toBeInTheDocument();
    
    rerender(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.Start} 
        offId="offcanvas-1" 
        canvasTitle="My Offcanvas" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        Content
      </RdsOffcanvas>
    );
    
    expect(container.querySelector(".offcanvas-start")).toBeInTheDocument();
    
    rerender(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.Top} 
        offId="offcanvas-1" 
        canvasTitle="My Offcanvas" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        Content
      </RdsOffcanvas>
    );
    
    expect(container.querySelector(".offcanvas-top")).toBeInTheDocument();
  });

  // Test with custom button
  it("renders with custom button and opens on click", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-2" 
        canvasTitle="Custom Button Offcanvas" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
        offcanvasbutton={<button>Open Offcanvas</button>}
        onclick={handleClick}
      >
        Custom Button Content
      </RdsOffcanvas>
    );
    
    const button = getByText("Open Offcanvas");
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test optional buttons
  it("renders with optional buttons when props are true", () => {
    const { getByText } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-3" 
        canvasTitle="Buttons Test" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
        showPrimaryButton={true}
        showSecondaryButton={true}
        showTertiaryButton={true}
      >
        Content with buttons
      </RdsOffcanvas>
    );
    
    expect(getByText("SAVE")).toBeInTheDocument();
    expect(getByText("CANCEL")).toBeInTheDocument();
    expect(getByText("RESTORE TO DEFAULT")).toBeInTheDocument();
  });
  // Test callback
  it("calls onClose callback when close button is clicked", () => {
    const handleClose = jest.fn();
    const { container } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-4" 
        canvasTitle="Callback Test" 
        onClose={handleClose} 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        Close button test
      </RdsOffcanvas>
    );
    
    // Find close button (it has the cross icon)
    const closeButton = container.querySelector('.close button');
    expect(closeButton).toBeInTheDocument();
    
    // Click the close button - add a non-null assertion since we've verified it exists
    if (closeButton) {
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    }
  });

  // Test with different backdrop options
  it("applies correct backdrop attribute based on prop", () => {
    const { container, rerender } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-5" 
        canvasTitle="Backdrop Test" 
        backDrop={RdsOffcanvasBackDrop.Static} 
        scrolling={false}
      >
        Static backdrop
      </RdsOffcanvas>
    );
    
    expect(container.querySelector('[data-bs-backdrop="static"]')).toBeInTheDocument();
    
    rerender(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-5" 
        canvasTitle="Backdrop Test" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={false}
      >
        No backdrop
      </RdsOffcanvas>
    );
    
    expect(container.querySelector('[data-bs-backdrop="false"]')).toBeInTheDocument();
  });

  // Test scrolling prop
  it("applies correct scroll attribute based on prop", () => {
    const { container } = render(
      <RdsOffcanvas 
        placement={RdsOffcanvasPlacement.End} 
        offId="offcanvas-6" 
        canvasTitle="Scroll Test" 
        backDrop={RdsOffcanvasBackDrop.False} 
        scrolling={true}
      >
        Scrollable content
      </RdsOffcanvas>
    );
    
    expect(container.querySelector('[data-bs-scroll="true"]')).toBeInTheDocument();
  });
});
