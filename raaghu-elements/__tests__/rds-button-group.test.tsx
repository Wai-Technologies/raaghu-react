import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsButtonGroup, { RdsButtonGroupProps } from "../src/rds-button-group/rds-button-group";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

const defaultProps: RdsButtonGroupProps = {
    vertical: false,
    isOutline: false,
    size: "",
    role: "button",
    buttonGroupItems: [
        { id: "1", label: "Button 1" },
        { id: "2", label: "Button 2" },
        { id: "3", label: "Button 3" },
    ],
};

describe("RdsButtonGroup", () => {
    it("renders button group items correctly", () => {
        render(<RdsButtonGroup {...defaultProps} />);
        const button1 = screen.getByText("Button 1");
        const button2 = screen.getByText("Button 2");
        const button3 = screen.getByText("Button 3");
        expect(button1).toBeInTheDocument();
        expect(button2).toBeInTheDocument();
        expect(button3).toBeInTheDocument();
    });

    //   it("calls onClick when a button is clicked", () => {
    //     const handleClick = jest.fn();
    //     render(
    //       <RdsButtonGroup {...defaultProps} onClick={handleClick} />
    //     );
    //     const button1 = screen.getByText("Button 1");
    //     fireEvent.click(button1);
    //     expect(handleClick).toHaveBeenCalled();
    //   });
  
    it("applies size class correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} size="large" />
        );
        const btnGroup = screen.getByRole("group");
        expect(btnGroup.classList).toContain("btn-group-lg");
    });

    it("applies vertical class correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} vertical={true} />
        );
        const btnGroup = screen.getByRole("group");
        expect(btnGroup.classList).toContain("btn-group-vertical");
    });

    it("applies outline color variant correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} isOutline={true} colorVariant="primary" />
        );
        const button1 = screen.getByText("Button 1");
        expect(button1.classList).toContain("btn-outline-primary");
    });

    it("applies non-outline color variant correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} colorVariant="danger" />
        );
        const button1 = screen.getByText("Button 1");
        expect(button1.classList).toContain("btn-danger");
    });

    it("renders checkbox inputs correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} role="checkbox" />
        );
        const checkboxInputs = screen.getAllByRole("checkbox");
        expect(checkboxInputs).toHaveLength(3);
    });

    it("renders radio inputs correctly", () => {
        render(
            <RdsButtonGroup {...defaultProps} role="radio" />
        );
        const radioInputs = screen.getAllByRole("radio");
        expect(radioInputs).toHaveLength(3);
    });
});
