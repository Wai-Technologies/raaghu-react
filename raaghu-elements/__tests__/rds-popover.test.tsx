import React from "react";
import { RdsPopover } from "../src";
import { render, fireEvent, screen } from "@testing-library/react";
import { PopoverState } from "../src/rds-popover/rds-popover";
import '@testing-library/jest-dom';

jest.mock('lottie-web')
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));
   
// Mock the useTranslation hook
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock RdsButton component
jest.mock("../src/rds-button", () => ({
    __esModule: true,
    default: jest.fn(({ onClick, label }) => (
        <button onClick={onClick} data-testid="rds-button">{label}</button>
    ))
}));

describe("RdsPopover", () => {
    it("should apply the correct class based on the state prop", () => {
        render(<RdsPopover state={PopoverState.LeftCentre}>Popover content</RdsPopover>);
        
        // Get the popover card element
        const popoverCard = screen.getByText("Popover content").closest(".popoverCard");
        
        // Check if it has both the base class and the state-specific class
        expect(popoverCard).toHaveClass("popoverCard");
        expect(popoverCard).toHaveClass("LeftCentre");
    });

    it("should initially hide the popover content", () => {
        render(<RdsPopover state={PopoverState.TopCentre}>Test content</RdsPopover>);
        
        // Get the popover card element
        const popoverCard = screen.getByText("Test content").closest(".popoverCard");
        
        // Check if it's initially hidden
        expect(popoverCard).toHaveStyle("display: none");
    });
    
    it("should show the popover when the button is clicked", () => {
        render(<RdsPopover state={PopoverState.BottomCentre}>Click test</RdsPopover>);
        
        // Click the button
        fireEvent.click(screen.getByTestId("rds-button"));
        
        // Get the popover card element
        const popoverCard = screen.getByText("Click test").closest(".popoverCard");
        
        // Check if it's visible after clicking
        expect(popoverCard).toHaveStyle("display: inline-block");
    });
    
    it("should hide the popover when the button is clicked again", () => {
        render(<RdsPopover state={PopoverState.RightCentre}>Toggle test</RdsPopover>);
        
        // Click the button to show
        fireEvent.click(screen.getByTestId("rds-button"));
        
        // Click the button again to hide
        fireEvent.click(screen.getByTestId("rds-button"));
        
        // Get the popover card element
        const popoverCard = screen.getByText("Toggle test").closest(".popoverCard");
        
        // Check if it's hidden after clicking again
        expect(popoverCard).toHaveStyle("display: none");
    });
    
    it("should apply different positioning classes based on state prop", () => {
        // Test with different positions
        const { rerender } = render(
            <RdsPopover state={PopoverState.TopRight}>Top right popover</RdsPopover>
        );
        
        let popoverCard = screen.getByText("Top right popover").closest(".popoverCard");
        expect(popoverCard).toHaveClass("TopRight");
        
        // Rerender with a different position
        rerender(<RdsPopover state={PopoverState.BottomLeft}>Bottom left popover</RdsPopover>);
        
        popoverCard = screen.getByText("Bottom left popover").closest(".popoverCard");
        expect(popoverCard).toHaveClass("BottomLeft");
    });
});

