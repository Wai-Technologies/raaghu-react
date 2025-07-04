import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompButtonGroup, { RdsCompButtonGroupProps, Role } from "../src/rds-comp-button-group/rds-comp-button-group";

jest.mock('react-lottie-player', () => ({
    __esModule: true,
    default: jest.fn(),
  }));

const defaultProps: RdsCompButtonGroupProps = {
    vertical: false,
    isOutline: false,
    size: "",
    role: Role.Button,
    buttonGroupItems: [
        { id: "1", label: "Button 1" },
        { id: "2", label: "Button 2" },
        { id: "3", label: "Button 3" },
    ],
};

describe("RdsCompButtonGroup", () => {
    it("renders button group items correctly", () => {
        render(<RdsCompButtonGroup {...defaultProps} />);
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
    //       <RdsCompButtonGroup {...defaultProps} onClick={handleClick} />
    //     );
    //     const button1 = screen.getByText("Button 1");
    //     fireEvent.click(button1);
    //     expect(handleClick).toHaveBeenCalled();
    //   });
  
    it("applies size class correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps} size="large" />
        );
        const btnGroup = screen.getByRole("group");
        expect(btnGroup.classList).toContain("btn-group-lg");
    });

    it("applies vertical class correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps} vertical={true} />
        );
        const btnGroup = screen.getByRole("group");
        expect(btnGroup.classList).toContain("btn-group-vertical");
    });

    it("applies outline color variant correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps} isOutline={true} colorVariant="primary" />
        );
        const button1 = screen.getByText("Button 1");
        expect(button1.classList).toContain("btn-outline-primary");
    });

    it("applies non-outline color variant correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps} colorVariant="danger" />
        );
        const button1 = screen.getByText("Button 1");
        expect(button1.classList).toContain("btn-danger");
    });

    it("renders checkbox inputs correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps}  role={Role.Checkbox} />
        );
        const checkboxInputs = screen.getAllByRole("checkbox");
        expect(checkboxInputs).toHaveLength(3);
    });

    it("renders radio inputs correctly", () => {
        render(
            <RdsCompButtonGroup {...defaultProps}  role={Role.Radio} />
        );
        const radioInputs = screen.getAllByRole("radio");
        expect(radioInputs).toHaveLength(3);
    });
});
