import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RdsDropdownList from "../src/rds-dropdown-list/rds-dropdown-list";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

// Mock global.fetch for icon loading in test environment
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            text: () => Promise.resolve('<svg></svg>'),
        })
    ) as jest.Mock;
});

afterAll(() => {
    // @ts-ignore
    delete global.fetch;
});

describe("RdsDropdownList", () => {
    const listItems = [
        {
            label: "Item 1",
            val: "1",
            icon: "icon-1",
            iconWidth: "16px",
            iconHeight: "12px"
        },
        {
            label: "Item 2",
            val: "2",
            icon: "icon-2",
            iconWidth: "16px",
            iconHeight: "12px"
        }
    ];

    const props = {
        listItems: listItems,
        id: "dropdown-menu",
        placeholder: "Select an item",
        onClick: jest.fn(),
        selectedItems: jest.fn(),
        
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("renders the component with placeholder text", () => {
        // Pass multiSelect to trigger placeholder rendering logic
        const { container } = render(<RdsDropdownList {...props} isPlaceholder={true} multiSelect={true} />);
        // Find the placeholder by class name
        const placeholder = container.querySelector('.dw-placeholder');
        expect(placeholder).toBeInTheDocument();
        expect(placeholder).toHaveTextContent("Select an item");
    });

    test("renders the component with list items", () => {
        const { getAllByText } = render(<RdsDropdownList {...props}/>);
        // There may be multiple elements with the same text, so use getAllByText
        const item1s = getAllByText("Item 1");
        const item2s = getAllByText("Item 2");
        expect(item1s.length).toBeGreaterThan(0);
        expect(item2s.length).toBeGreaterThan(0);
    });

    test("calls the onClick function when an item is clicked", () => {
        const { getAllByText } = render(<RdsDropdownList {...props} />);
        // Find the dropdown item in the menu, not the placeholder
        const item1s = getAllByText("Item 1");
        // The dropdown menu item is likely not the first occurrence
        const menuItem = item1s.find(node => node.closest('a.dropdown-item'));
        expect(menuItem).toBeTruthy();
        fireEvent.click(menuItem!);
        expect(props.onClick).toHaveBeenCalledWith(expect.anything(), "1");
    });
});
