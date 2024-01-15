import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCheckboxParentChild, { RdsCheckboxParentChildProps } from "../src/rds-checkbox-parent-child/rds-checkbox-parent-child";

const userData: RdsCheckboxParentChildProps["userData"] = [
    {
        id: "1",
        label: "Parent 1",
        isSelected: false,
        isIntermediate: false,
        childList: [
            {
                id: "1_1",
                label: "Child 1",
                isSelected: false,
                isIntermediate: false,
                parent_id: "1",
            },
            {
                id: "1_2",
                label: "Child 2",
                isSelected: false,
                isIntermediate: false,
                parent_id: "1",
            },
        ],
    },
    {
        id: "2",
        label: "Parent 2",
        isSelected: false,
        isIntermediate: false,
        childList: [
            {
                id: "2_1",
                label: "Child 2.1",
                isSelected: false,
                isIntermediate: false,
                parent_id: "2",
            },
        ],
    },
];

describe("RdsCheckboxParentChild", () => {
    it("renders the component with the correct initial state", () => {
        render(<RdsCheckboxParentChild userData={userData} />);
        expect(screen.getAllByRole("checkbox")).toHaveLength(5); // 2 parents and 3 children
        expect(screen.getByTestId("Parent 1")).not.toBeChecked();
        expect(screen.getByTestId("Parent 2")).not.toBeChecked();
        expect(screen.getByTestId("Child 1")).not.toBeChecked();
        expect(screen.getByTestId("Child 2")).not.toBeChecked();
        expect(screen.getByTestId("Child 2.1")).not.toBeChecked();
    });

    it("selects a parent when clicked", () => {
        render(<RdsCheckboxParentChild userData={userData} />);
        fireEvent.click(screen.getByTestId("Parent 1"));
        expect(screen.getByTestId("Parent 1")).toBeChecked();
        expect(screen.getByTestId("Child 1")).toBeChecked();
        expect(screen.getByTestId("Child 2")).toBeChecked();
    });

    it("selects a child when clicked", () => {
        render(<RdsCheckboxParentChild userData={userData} />);
        fireEvent.click(screen.getByTestId("Child 1"));
        expect(screen.getByTestId("Parent 1")).not.toBeChecked();
        expect(screen.getByTestId("Child 1")).toBeChecked();
        expect(screen.getByTestId("Child 2")).not.toBeChecked();
    });

    it("deselects a child when clicked twice", () => {
        render(<RdsCheckboxParentChild userData={userData} />);
        fireEvent.click(screen.getByTestId("Child 1"));
        fireEvent.click(screen.getByTestId("Child 1"));
        expect(screen.getByTestId("Parent 1")).not.toBeChecked();
        expect(screen.getByTestId("Child 1")).not.toBeChecked();
        expect(screen.getByTestId("Child 2")).not.toBeChecked();
    });

    it("selects all children of a parent when all children are clicked", () => {
        render(<RdsCheckboxParentChild userData={userData} />);
        fireEvent.click(screen.getByTestId("Child 1"));
        fireEvent.click(screen.getByTestId("Child 2"));
        expect(screen.getByTestId("Parent 1")).toBeChecked();
        expect(screen.getByTestId("Child 1")).toBeChecked();
        expect(screen.getByTestId("Child 2")).toBeChecked();
    });
});
