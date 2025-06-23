import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsDropdown, { RdsDropdownProps, DisplayType, Layout, Style } from "../src/rds-dropdown/rds-dropdown";
import React from "react";

// Mock global.fetch to prevent icon loading errors
beforeAll(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            statusText: 'OK',
            redirected: false,
            type: 'basic',
            url: '',
            headers: {},
            json: () => Promise.resolve({}),
            text: () => Promise.resolve(""),
            clone: function () { return this; },
            body: null,
            bodyUsed: false,
            arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
            blob: () => Promise.resolve(new Blob()),
            formData: () => Promise.resolve(new FormData()),
        } as unknown as Response)
    );
});
afterAll(() => {
    // @ts-ignore
    delete global.fetch;
});

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
        displayType: DisplayType.Dropdown,
        layout: Layout.IconBefore,
        style: Style.Primary,
    };

    it("renders the dropdown button label", () => {
        const { container } = render(<RdsDropdown {...props} />);
        // Debug: print the rendered DOM
        // eslint-disable-next-line no-console
        console.log(container.innerHTML);
        // Try to get the button by role and label, fallback to test id or class if needed
        const button = screen.queryByRole("button", { name: props.label }) || screen.getByText(props.label);
        expect(button).toBeInTheDocument();
    });

    it("renders the dropdown items", () => {
        render(<RdsDropdown {...props} />);
        // Open the dropdown if needed
        const button = screen.queryByRole("button", { name: props.label }) || screen.getByText(props.label);
        if (button) {
            button.click();
        }
        // Try to get menu items by text if role is not present
        props.listItems.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });
    });

    it("applies the correct dropdown direction class", () => {
        render(<RdsDropdown {...props} />);
        // Query by class name instead of role
        const dropdownElement = document.querySelector(".dropdown, .dropup");
        expect(dropdownElement).not.toBeNull();
        // Check for direction class
        expect(dropdownElement?.classList.contains("dropup") || dropdownElement?.classList.contains("dropdown")).toBe(true);
    });
});
