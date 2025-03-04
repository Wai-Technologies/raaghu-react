import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsRadioButton, { RdsRadioButtonProps } from "../src/rds-radio-button/rds-radio-button";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

describe("RdsRadioButton", () => {
    const itemList = [
        { id: 1, name: "radio-group", label: "Option 1", checked: true, disabled: false },
        { id: 2, name: "radio-group", label: "Option 2", checked: false, disabled: true },
        { id: 3, name: "radio-group", label: "Option 3", checked: false, disabled: false },
    ];
    const defaultProps = {
        itemList,
        label: "Radio Button Group",
    };

    it("renders the label correctly", () => {
        render(<RdsRadioButton onChange={function (value: any): void {
            throw new Error("Function not implemented.");
        } } value={""} {...defaultProps} />);
    });

    it("displays an error message when provided with the `state` prop", () => {
        const errorMessage = "This is an error message";
        render(<RdsRadioButton onChange={function (value: any): void {
            throw new Error("Function not implemented.");
        } } value={""} {...defaultProps}  errorMessage={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

});
