import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsSideNav, { RdsSideNavProps } from "../src/rds-side-nav/rds-side-nav";

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>
}));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("RdsSideNav", () => {
    const sideNavItems = [
        { id: "home", label: "Home", path: "/" }
    ];

    const toggleThemeMock = jest.fn();

    const defaultProps: RdsSideNavProps = {
        sideNavItems: sideNavItems,
        toggleTheme: toggleThemeMock,
        collapse: true,
        toggleClass: true
    };
    
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    it("renders RdsSideNav component with provided props", () => {
        render(<RdsSideNav {...defaultProps} />);
        
        // Check if the nav item label is rendered
        expect(screen.getByText("Home")).toBeInTheDocument();
    });
});