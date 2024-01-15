import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompContactInformation, { RdsCompContactInfoProps } from "../src/rds-comp-contact-information/rds-comp-contact-information";

describe("RdsCompContactInformation", () => {
    const mockOnContinue = jest.fn();

    const defaultProps: RdsCompContactInfoProps = {
        onContinue: mockOnContinue,
    };

    beforeEach(() => {
        render(<RdsCompContactInformation {...defaultProps} />);
    });

    it("should render the component", () => {
    // Check if the component renders without any errors
        expect(screen.getByTestId("contact-info-form")).toBeInTheDocument();
    });

    it("should display error message for invalid email", () => {
        const emailInput = screen.getByTestId("email");

        fireEvent.change(emailInput, { target: { value: "invalid-email" } });

        expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    });

    it("should enable continue button when form is valid", () => {
        const emailInput = screen.getByTestId("email");
        const contactInput = screen.getByTestId("contact-number");
        const checkboxInput = screen.getByTestId("terms-and-condition");
        const continueButton = screen.getByTestId("continue");

        fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
        fireEvent.change(contactInput, { target: { value: "1234567890" } });
        fireEvent.click(checkboxInput);

        expect(continueButton).toBeEnabled();
    });

    it("should call onContinue prop when form is submitted", () => {
        const emailInput = screen.getByTestId("email");
        const contactInput = screen.getByTestId("contact-number");
        const checkboxInput = screen.getByTestId("terms-and-condition");
        const continueButton = screen.getByTestId("continue");

        fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
        fireEvent.change(contactInput, { target: { value: "1234567890" } });
        fireEvent.click(checkboxInput);
        fireEvent.click(continueButton);

        expect(mockOnContinue).toHaveBeenCalledTimes(1);
        expect(mockOnContinue).toHaveBeenCalledWith(expect.any(Object), {
            email: "valid@example.com",
            contact: "1234567890",
            checked: true,
        });
    });
});
