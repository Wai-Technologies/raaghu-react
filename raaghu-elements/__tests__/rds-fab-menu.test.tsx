import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import RdsFabMenu, { RdsFabMenuProps } from "../src/rds-fab-menu/rds-fab-menu";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsFabMenu", () => {
    const mockOnClick = jest.fn();
    const mockListItems = [
        {
            icon: "users",
            iconWidth: "20px",
            iconHeight: "20px",
            value: "Test Value",
            onClick: mockOnClick,
        },
    ];

    const defaultProps: RdsFabMenuProps = {
        colorVariant: "primary",
        size: "large",
        listItems: mockListItems,
        onClick: jest.fn(),
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders with default props", () => {
        render(<RdsFabMenu {...defaultProps} />);
        const dropdownButton = screen.getByRole("button");
        const dropdownMenu = screen.getByRole("menu");

        expect(dropdownButton).toBeInTheDocument();
        expect(dropdownButton).toHaveClass("btn-primary");
        expect(dropdownButton).toHaveClass("btn-lg");
        expect(dropdownButton).toHaveClass("btn-icon");
        expect(dropdownButton).toHaveClass("fab-btn");

        expect(dropdownMenu).toBeInTheDocument();
        expect(dropdownMenu).toHaveClass("fab-dropdown");
        expect(dropdownMenu).toHaveClass("border-0");
        expect(dropdownMenu).toHaveClass("shadow");
    });

    it("calls onClick when menu item is clicked", () => {
        render(<RdsFabMenu {...defaultProps} />);
        const menuItem = screen.getByText("Test Value");
        fireEvent.click(menuItem);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("renders list items correctly", () => {
        const mockListItems = [
            { value: "Item 1", icon: "circle" },
            { value: "Item 2", icon: "square" },
            { value: "Item 3", icon: "triangle" },
        ];
        render(<RdsFabMenu listItems={mockListItems} />);
        fireEvent.click(screen.getByRole("button"));
        const listItems = screen.queryAllByRole("link");
        expect(listItems.length).toBe(mockListItems.length);
    });

    it("renders icon correctly", () => {
        render(<RdsFabMenu {...defaultProps} />);
        const iconElements = screen.getAllByRole("img");

        iconElements.forEach((element) => {
            expect(element).toBeInTheDocument();
        });
    });
});
