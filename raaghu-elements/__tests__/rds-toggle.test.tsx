import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import  RdsToggle,{ RdsToggleProps } from "../src/rds-toggle/rds-toggle";


describe("RdsToggle", () => {
    const mockOnClick = jest.fn();
    const defaultProps = {
        iconOnUncheck: "uncheck",
        iconOnCheck: "check",
        checked: false,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the component", () => {
        const { container } = render(<RdsToggle style={"Style 1"} layout={"Switch + label"} isChecked={false} isDisabled={false} {...defaultProps} />);
        expect(container.firstChild).toMatchSnapshot();
    });


    it("calls onChangeHandler function when checkbox is clicked", () => {
        const { getByRole } = render(
            <RdsToggle style={"Style 1"} layout={"Switch + label"} isChecked={false} isDisabled={false} {...defaultProps} onClick={mockOnClick} />
        );
        fireEvent.click(getByRole("checkbox"));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});





