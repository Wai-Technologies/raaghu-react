import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsStat, { RdsStatProps } from "../src/rds-stat/rds-stat";

// Mock RdsCompIcon component to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, fill, colorVariant, height, width, isCursorPointer }) => (
        <div data-testid={`icon-${name}`} className={colorVariant ? `text-${colorVariant}` : ""}>
            <span className={`icon-${name}`} style={{ height, width }}></span>
        </div>
    ))
}));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("RdsStat component", () => {
    const items = [
        {
            icon: "user",
            iconFill: "#000",
            iconHeight: "30px",
            iconWidth: "30px",
            title: "Users",
            value: 100,
        },
        {
            icon: "book",
            iconFill: "#000",
            iconHeight: "30px",
            iconWidth: "30px",
            title: "Books",
            value: 50,
        },
    ];
    const defaultProps: RdsStatProps = {
        displayType: "basic",
        items,
    };    it("should render basic display type correctly", () => {
        render(<RdsStat {...defaultProps} />);
        
        // Check titles and values
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Books")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        
        // Check icons
        expect(screen.getByTestId("icon-user")).toBeInTheDocument();
        expect(screen.getByTestId("icon-book")).toBeInTheDocument();
          // Check basic layout structure
        const statElement = screen.getByTestId("rds-stat");
        expect(statElement).toHaveAttribute('style', expect.stringContaining('background-color: white'));
    });

    it("should render advanced display type correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            displayType: "advanced",
        };
        render(<RdsStat {...props} />);
        
        // Check titles and values are displayed in advanced mode
        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Books")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
        expect(screen.getByText("50")).toBeInTheDocument();
        
        // Advanced mode should have stathover class
        const statElements = screen.getAllByText(/100|50/);
        statElements.forEach(el => {
            expect(el.closest(".stathover")).not.toBeNull();
        });
    });    it("should apply custom background color variant correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            backgroundColorVarient: "blue",
        };
        render(<RdsStat {...props} />);
        
        // Directly check the style attribute value instead of computed style
        const statElement = screen.getByTestId("rds-stat");
        expect(statElement).toHaveAttribute('style', expect.stringContaining('background-color: blue'));
    });

    it("should apply custom color variant correctly", () => {
        const props: RdsStatProps = {
            ...defaultProps,
            colorVariant: "success",
        };
        render(<RdsStat {...props} />);
        
        // The colorVariant should be applied as a class to the value
        const valueElements = screen.getAllByText(/100|50/);
        valueElements.forEach(el => {
            expect(el).toHaveClass("text-success");
        });
        
        // Icon should also get the colorVariant
        expect(screen.getByTestId("icon-user")).toHaveClass("text-success");
        expect(screen.getByTestId("icon-book")).toHaveClass("text-success");
    });
});
