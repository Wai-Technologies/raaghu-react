import React from "react";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsSideNav, { RdsSideNavProps } from "../src/rds-side-nav/rds-side-nav";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsSideNav", () => {
    const sideNavItems: never[] = [
    // Define your test data for sideNavItems
    // ...
    ];

    const onClickMock = jest.fn();
    const toggleThemeMock = jest.fn();

    const defaultProps: RdsSideNavProps = {
        sideNavItems: sideNavItems,
        toggleTheme: toggleThemeMock,
        collapse: true,
        toggleClass:true
    };
    afterEach(() => {
        cleanup();
    });
    
    it("renders RdsSideNav component with provided props", () => {
        render(<RdsSideNav {...defaultProps} />);
    
        // Example assertions:
        expect(screen.getByTestId("someTestId")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("toggleThemeButton"));
        expect(toggleThemeMock).toHaveBeenCalled();
    });
    
});