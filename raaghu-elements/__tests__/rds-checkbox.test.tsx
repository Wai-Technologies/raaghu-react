import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCheckbox, { CheckboxStatus } from "../src/rds-checkbox/rds-checkbox";

describe("RdsCheckbox", () => {
    const defaultProps = {
        label: "Checkbox label",
        checked: false,
    };

    it("renders with default props", () => {
        const handleChange = jest.fn();
        render(<RdsCheckbox labelText='Checkbox' id='checkbox' onChange={handleChange} checked={false}/>);
        const checkbox = screen.getByLabelText("Checkbox") as HTMLInputElement;
        expect(checkbox).toBeInTheDocument();
        expect(checkbox.checked).toBe(false);
    });

    it("renders with checked prop", () => {
        const handleChange = jest.fn();
        render(<RdsCheckbox {...defaultProps} checked={true} id='checkbox' onChange={handleChange}/>);
        const checkbox = screen.getByLabelText(defaultProps.label)  as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it("calls onChange prop when clicked", () => {
        const handleChange = jest.fn();
        render(<RdsCheckbox {...defaultProps} id='checkbox' onChange={handleChange} />);
        const checkbox = screen.getByLabelText(defaultProps.label);
        fireEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("renders disabled checkbox", () => {
        const handleChange = jest.fn();
        render(<RdsCheckbox {...defaultProps} isDisabled={true} id='checkbox' onChange={handleChange}/>);
        const checkbox = screen.getByLabelText(defaultProps.label)  as HTMLInputElement;
        expect(checkbox.disabled).toBe(true);
    });

    it("renders checkbox with indeterminate state", () => {
        const handleChange = jest.fn();
        render(<RdsCheckbox {...defaultProps} status={CheckboxStatus.Indeterminate} id='checkbox' onChange={handleChange}/>);
        const checkbox = screen.getByLabelText(defaultProps.label)  as HTMLInputElement;
        expect(checkbox.classList).toContain("form-check-input-intermediate");
    });
});
