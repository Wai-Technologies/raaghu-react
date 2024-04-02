import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsDropdown, { RdsDropdownProps } from "../src/rds-dropdown/rds-dropdown";
import React from "react";

describe("RdsDropdown", () => {
    const props: RdsDropdownProps = {
        colorVariant: "primary",
        size: "small",
        darkDropdown: false,
        label: "Dropdown",
        listItems: [
            { id: "item1", label: "Item 1", path: "/item1" },
            { id: "item2", label: "Item 2", path: "/item2" },
            { id: "item3", label: "Item 3", path: "/item3" },
        ],
        id: "1",
    };

    it("renders the dropdown button label", () => {
        render(<RdsDropdown {...props} />);
        const labelElement = screen.getByText(props.label);
        expect(labelElement).toBeInTheDocument();
    });

    it("renders the dropdown items", () => {
        render(<RdsDropdown {...props} />);
        const listItems = props.listItems.map(item => item.label);
        const listItemElements = screen.getAllByRole("menuitem").map(el => el.textContent);
        expect(listItemElements).toEqual(listItems);
    });

    it("applies the correct dropdown direction class", () => {
        render(<RdsDropdown {...props} />);
        const dropdownElement = screen.getByRole("feed");
        expect(dropdownElement.classList).toContain("dropup");
    });
});
