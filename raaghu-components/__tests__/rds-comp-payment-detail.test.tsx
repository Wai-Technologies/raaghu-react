import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import RdsCompPaymentDetail from "../src/rds-comp-payment-detail/rds-comp-payment-detail";

describe("RdsCompPaymentDetail", () => {
    const mockOnContinue = jest.fn();
    const mockOnBack = jest.fn();

    const defaultProps = {
        cvc: 123,
        cardNumber: 1234567890,
        name: "John Doe",
        expirationDate: new Date(),
        buttonSpinner: false,
        paymentModeList: ["Option 1", "Option 2"],
        onContinue: mockOnContinue,
        onBack: mockOnBack,
    };

    test("renders without errors", () => {
        render(<RdsCompPaymentDetail {...defaultProps} />);
    // Its show that component render successful
    });
  

    test("calls onBack handler when Cancel button is clicked", () => {
        const { getByText } = render(<RdsCompPaymentDetail {...defaultProps} />);
        const cancelButton = getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(mockOnBack).toHaveBeenCalled();
    });
});
