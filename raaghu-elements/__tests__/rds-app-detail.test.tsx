import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsAppDetail, { RdsAppDetailProps, IconPosition } from "../src/rds-app-detail/rds-app-detail";

// Mock RdsCompIcon to prevent fetch issues
jest.mock("../src/rds-icon", () => ({
    __esModule: true,
    default: jest.fn(({ name, colorVariant, height, width }) => (
        <img 
            src="test-icon.svg" 
            alt={name} 
            data-testid={`icon-${name}`} 
            role="img"
        />
    ))
}));

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("RdsAppDetail", () => {
    const appDetailsItem: RdsAppDetailProps["appDetailsItem"] = {
        icon: "zapier",
        iconColor: "warning",
        iconHeight: "30px",
        iconWidth: "30px",
        iconFill: true,
        iconStroke: true,
        title: "Zapier",
        subtitle: "Build custom automation and intefrations with app",
        route: "https://example.com",
        routeLabel: "View integration",
    };
      it("renders the component with the given props", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} linkUrl={appDetailsItem.route} />
        );
        
        // Check title and subtitle
        expect(screen.getByText("Zapier")).toBeInTheDocument();
        expect(screen.getByText("Build custom automation and intefrations with app")).toBeInTheDocument();
        
        // Check route link
        const linkElement = screen.getByText("View integration");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", appDetailsItem.route);
        
        // Verify icon exists
        expect(screen.getByTestId(`icon-${appDetailsItem.icon}`)).toBeInTheDocument();
    });
      it("renders the component with the icon", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} />
        );
        // Check that the icon was rendered via our mock
        expect(screen.getByTestId(`icon-${appDetailsItem.icon}`)).toBeInTheDocument();
    });
    
    it("renders the component with link url and label", () => {
        const linkUrl = "https://custom-link.com";
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} linkUrl={linkUrl} />
        );
        
        const linkElement = screen.getByText("View integration");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", linkUrl);
    });    it("renders with different icon positions", () => {
        const { rerender } = render(
            <RdsAppDetail appDetailsItem={appDetailsItem} iconPosition={IconPosition.Left} />
        );
        
        // We can't easily test the CSS styles directly, but we can at least verify
        // that the component renders with different icon positions without errors
        rerender(<RdsAppDetail appDetailsItem={appDetailsItem} iconPosition={IconPosition.Center} />);
        rerender(<RdsAppDetail appDetailsItem={appDetailsItem} iconPosition={IconPosition.Right} />);
        
        // Ensure the icon is still in the document
        expect(screen.getByTestId(`icon-${appDetailsItem.icon}`)).toBeInTheDocument();
    });
      it("renders with showUpperBorder prop", () => {
        render(
            <RdsAppDetail appDetailsItem={appDetailsItem} showUpperBorder={true} linkUrl={appDetailsItem.route} />
        );
        
        // Verify component renders with the showUpperBorder prop
        expect(screen.getByText("Zapier")).toBeInTheDocument();
        expect(screen.getByText("View integration")).toBeInTheDocument();
        
        // Check for border class - we can't easily test the exact CSS,
        // but we can ensure the component rendered successfully
        expect(screen.getByText("View integration")).toHaveAttribute("href", appDetailsItem.route);
    });
});
