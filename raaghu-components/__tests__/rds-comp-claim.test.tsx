import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompClaim from "../src/rds-comp-claim/rds-comp-claim";

describe("RdsCompClaim", () => {
    const resources = [
        {
            id: 1,
            displayName: "Resource 1",
            selected: false,
            children: [
                { id: 1, displayName: "Child 1", selected: false },
                { id: 2, displayName: "Child 2", selected: false }
            ]
        },
        {
            id: 2,
            displayName: "Resource 2",
            selected: false,
            children: [
                { id: 3, displayName: "Child 3", selected: false },
                { id: 4, displayName: "Child 4", selected: false }
            ]
        }
    ];

    test("renders the component", () => {
        render(<RdsCompClaim resources={resources} />);
        const selectAllElements = screen.queryAllByText("Select all");
        expect(selectAllElements[0]).toBeInTheDocument();
    });



    test("toggles parent selection", () => {
        render(<RdsCompClaim resources={resources} />);
        const selectAllElements = screen.queryAllByText("Select all");
        fireEvent.click(selectAllElements[0]); // Click the first "Select all" element
        // Add your assertions here
        expect(selectAllElements[0]).toBeInTheDocument();
        expect(screen.getByLabelText("Child 1", { selector: "input" })).toBeChecked();
        expect(screen.getByLabelText("Child 2", { selector: "input" })).toBeChecked();
    });
  

    test("toggles child selection", () => {
        render(<RdsCompClaim resources={resources} />);

        // Click on the first child checkbox
        fireEvent.click(screen.getByLabelText("Child 1", { selector: "input" }));

        // Verify that only the first child is selected
        expect(screen.getByLabelText("Child 1", { selector: "input" })).toBeChecked();
        expect(screen.getByLabelText("Child 2", { selector: "input" })).not.toBeChecked();
    });

    test("calls onCreate callback when Save button is clicked", () => {
        const onCreateMock = jest.fn();
        render(<RdsCompClaim resources={resources} onCreate={onCreateMock} />);
  
        // Click on the Save button
        fireEvent.click(screen.getByText("Save"));
  
        // Verify that the onCreate callback is called with the correct argument
        expect(onCreateMock).toHaveBeenCalledWith(resources);
    });
  
});

