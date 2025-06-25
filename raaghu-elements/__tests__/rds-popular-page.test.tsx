import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsPopularPage, { RdsPopularPageProps } from "../src/rds-popular-page/rds-popular-page";

// Mock react-lottie-player
jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the RdsCompIcon component that's causing the fetch issue
jest.mock('../src/rds-icon', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(({ name }) => {
        return <img src="test-icon.svg" alt={name} role="img" data-testid={`icon-${name}`} />;
    })
}));

describe("RdsPopularPage", () => {
    const itemList: RdsPopularPageProps["itemList"] = [
        {
            title: "Page 1",
            subtitle: "Description of page 1",
            icon: "users",
            route: "/page1"
        },
        {
            title: "Page 2",
            subtitle: "Description of page 2",
            icon: "folder",
            route: "/page2"
        }
    ];

    it("should render the popular pages heading", () => {
        render(<RdsPopularPage itemList={itemList} />);
        expect(screen.getByText("POPULAR PAGES")).toBeInTheDocument();
    });

    it("should render the correct number of items", () => {
        render(<RdsPopularPage itemList={itemList} />);
        const containerDivs = screen.getAllByTestId("container-div");
        expect(containerDivs).toHaveLength(2);
    });

    it("should render the correct title and subtitle for each item", () => {
        render(<RdsPopularPage itemList={itemList} />);
        
        // Check first item
        expect(screen.getByText("Page 1")).toBeInTheDocument();
        expect(screen.getByText("Description of page 1")).toBeInTheDocument();
        
        // Check second item
        expect(screen.getByText("Page 2")).toBeInTheDocument();
        expect(screen.getByText("Description of page 2")).toBeInTheDocument();
    });    it("should render icons with correct names", () => {
        render(<RdsPopularPage itemList={itemList} />);
        
        // Using the mocked icons' testids
        expect(screen.getByTestId("icon-users")).toBeInTheDocument();
        expect(screen.getByTestId("icon-folder")).toBeInTheDocument();
        
        // Each item has a chevron_right icon, so we should have 2 of them
        const chevronIcons = screen.getAllByTestId("icon-chevron_right");
        expect(chevronIcons).toHaveLength(2);
    });
});
