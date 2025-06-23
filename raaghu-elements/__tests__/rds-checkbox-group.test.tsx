import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCheckboxGroup, { RdsCheckboxGroupProps } from "../src/rds-checkbox-group/rds-checkbox-group";

describe("RdsCheckboxGroup", () => {
    // Test props for simple checkbox list mode
    const simpleProps: RdsCheckboxGroupProps = {
        multiOptionCheck: true,
        itemList: [
            {
                id: "checkbox1",
                label: "Checkbox 1",
                name: "checkbox1",
                checked: false,
                disabled: false,
            },
            {
                id: "checkbox2",
                label: "Checkbox 2",
                name: "checkbox2",
                checked: false,
                disabled: false,
            },
        ],
    };

    // Test props for nested parent-child mode
    const nestedProps: RdsCheckboxGroupProps = {
        multiOptionCheck: false,
        userData: [
            {
                id: 1,
                label: "Parent 1",
                isSelected: false,
                isIntermediate: false,
                disabled: false,
                childList: [
                    {
                        id: 1,
                        label: "Child 1",
                        parent_id: 1,
                        isSelected: false,
                        disabled: false,
                    },
                    {
                        id: 2,
                        label: "Child 2",
                        parent_id: 1,
                        isSelected: false,
                        disabled: false,
                    },
                ],
            },
        ],
        itemList: [],
    };

    it("renders without error", () => {
        render(<RdsCheckboxGroup {...simpleProps} />);
    });

    it("renders the correct number of checkboxes in simple mode", () => {
        render(<RdsCheckboxGroup {...simpleProps} />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(simpleProps.itemList.length);
    });

    it("calls the onClick prop when a checkbox is clicked in simple mode", () => {
        const onClick = jest.fn();
        render(<RdsCheckboxGroup {...simpleProps} onClick={onClick} />);
        const checkbox = screen.getByLabelText(simpleProps.itemList[0].label);
        fireEvent.click(checkbox);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders parent-child structure in nested mode", () => {
        render(<RdsCheckboxGroup {...nestedProps} />);
        const parentCheckbox = screen.getByTestId("Parent 1");
        expect(parentCheckbox).toBeInTheDocument();
    });

    it("renders with correct labels", () => {
        render(<RdsCheckboxGroup {...simpleProps} />);
        expect(screen.getByLabelText("Checkbox 1")).toBeInTheDocument();
        expect(screen.getByLabelText("Checkbox 2")).toBeInTheDocument();
    });

    it("respects disabled state", () => {
        const propsWithDisabled = {
            ...simpleProps,
            itemList: [
                {
                    id: "checkbox1",
                    label: "Checkbox 1",
                    name: "checkbox1",
                    checked: false,
                    disabled: true,
                },
            ],
        };
        render(<RdsCheckboxGroup {...propsWithDisabled} />);
        const checkbox = screen.getByLabelText("Checkbox 1");
        expect(checkbox).toBeDisabled();
    });

    it("respects checked state", () => {
        const propsWithChecked = {
            ...simpleProps,
            itemList: [
                {
                    id: "checkbox1",
                    label: "Checkbox 1",
                    name: "checkbox1",
                    checked: true,
                    disabled: false,
                },
            ],
        };
        render(<RdsCheckboxGroup {...propsWithChecked} />);
        const checkbox = screen.getByLabelText("Checkbox 1");
        expect(checkbox).toBeChecked();
    });    it("renders as switch when isSwitch is true", () => {
        const switchProps = {
            ...simpleProps,
            isSwitch: true,
        };
        render(<RdsCheckboxGroup {...switchProps} />);
        const switchElement = document.querySelector('.form-switch');
        expect(switchElement).toBeInTheDocument();
    });

    it("displays label when provided", () => {
        const propsWithLabel = {
            ...simpleProps,
            label: "Test Label",
        };
        render(<RdsCheckboxGroup {...propsWithLabel} />);
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });
});
