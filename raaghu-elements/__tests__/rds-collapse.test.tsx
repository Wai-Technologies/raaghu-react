import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import RdsCollapse from "../src/rds-collapse/rds-collapse";

describe("RdsCollapse component", () => {
    const buttonList = [{ label: "Button 1", id: "button1" }];

    test("displays the content when the toggle button is clicked", () => {
        render(<RdsCollapse buttonList={buttonList} />);
        const toggleButton = screen.getByRole("button", { name: /toggle element/i });
        expect(screen.queryByText(/placeholder content/i)).toBeNull(); // initial state, should not display content
        fireEvent.click(toggleButton);
        expect(screen.getByText(/placeholder content/i)).toBeInTheDocument(); // after click, should display content
    });

    test("toggles the content when the toggle button is clicked twice", () => {
        render(<RdsCollapse buttonList={buttonList} />);
        const toggleButton = screen.getByRole("button", { name: /toggle element/i });
        fireEvent.click(toggleButton);
        expect(screen.getByText(/placeholder content/i)).toBeInTheDocument(); // after first click, should display content
        fireEvent.click(toggleButton);
        expect(screen.queryByText(/placeholder content/i)).toBeNull(); // after second click, should not display content
    });
});
