import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import RdsDropdownList from "../src/rds-dropdown-list/rds-dropdown-list";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

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
        const { getByText } = render(<RdsDropdownList {...props}  isPlaceholder={true}/>);
        const placeholderText = getByText("Select an item");
        expect(placeholderText).toBeInTheDocument();
    });

    test("renders the component with list items", () => {
        const { getByText } = render(<RdsDropdownList {...props}/>);
        const item1 = getByText("Item 1");
        const item2 = getByText("Item 2");
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });

    test("calls the onClick function when an item is clicked", () => {
        const { getByText } = render(<RdsDropdownList {...props} />);
        const item1 = getByText("Item 1");
        fireEvent.click(item1);
        expect(props.onClick).toHaveBeenCalledWith(expect.anything(), "1");
    });
});
