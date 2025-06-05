import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RdsToggle, { RdsToggleProps, ToggleLayout, ToggleState, ToggleStyle } from "../src/rds-toggle/rds-toggle";

describe("RdsToggle", () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        iconOnUncheck: "uncheck",
        iconOnCheck: "check",
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        const { container } = render(
            <RdsToggle
                style={ToggleStyle.Style1}
                layout={ToggleLayout.SwitchLabel}
                checked={false}
                state={ToggleState.DisabledOn}
                {...defaultProps}
            />
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it("calls onClick function when toggle is clicked", () => {
        const { getByRole } = render(
            <RdsToggle 
                style={ToggleStyle.Style1} 
                layout={ToggleLayout.SwitchLabel} 
                checked={false} 
                state={ToggleState.On} 
                {...defaultProps} 
                onClick={mockOnClick} 
            />
        );
        const toggleSwitch = getByRole("switch");
        expect(toggleSwitch).toBeInTheDocument();
        fireEvent.click(toggleSwitch);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });    it("renders in disabled state", () => {
        const { getByRole, container } = render(
            <RdsToggle 
                style={ToggleStyle.Style1} 
                layout={ToggleLayout.SwitchLabel} 
                checked={false} 
                state={ToggleState.DisabledOn} 
                {...defaultProps} 
            />
        );
        const toggleSwitch = getByRole("switch");
        const wrapper = container.querySelector('.form-check.form-switch');
        expect(wrapper).toHaveClass('disabled');
        expect(wrapper).toBeInTheDocument();
    });
});





