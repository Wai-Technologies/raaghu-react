import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompAlertPopup from "../src/rds-comp-alert-popup/rds-comp-alert-popup";

// Mock the rds-elements components used in RdsCompAlertPopup
jest.mock("../src/rds-elements", () => ({
    RdsModal: ({ children, ...props }: any) => (
        <div data-testid="rds-modal" {...props}>
            {children}
        </div>
    ),
    RdsCompIcon: ({ ...props }: any) => <div data-testid="rds-icon" {...props} />,
    RdsButton: ({ label, onClick, ...props }: any) => (
        <button data-testid={`rds-button-${label?.toLowerCase()}`} onClick={onClick} {...props}>
            {label}
        </button>
    ),
    RdsCompLabel: ({ label, ...props }: any) => <span data-testid="rds-comp-label" {...props}>{label}</span>
}));

describe("RdsCompAlertPopup", () => {
    const mockProps = {
        alertID: "test-alert",
        onSuccess: jest.fn(),
        onCancel: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders default alert popup correctly", () => {
        render(<RdsCompAlertPopup {...mockProps} />);

        // Check for default content
        expect(screen.getByText("Are You Sure?")).toBeInTheDocument();
        expect(screen.getByText("This record will be deleted permanently.")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-cancel")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-delete")).toBeInTheDocument();
    });

    it("renders with custom text and labels", () => {
        const customProps = {
            ...mockProps,
            alertConfirmation: "Custom Title",
            messageAlert: "Custom Message",
            cancelBtnLabel: "Custom Cancel",
            deleteBtnLabel: "Custom Delete"
        };

        render(<RdsCompAlertPopup {...customProps} />);

        expect(screen.getByText("Custom Title")).toBeInTheDocument();
        expect(screen.getByText("Custom Message")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-custom cancel")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-custom delete")).toBeInTheDocument();
    });

    it("handles cancel button click", () => {
        render(<RdsCompAlertPopup {...mockProps} />);

        fireEvent.click(screen.getByTestId("rds-button-cancel"));
        expect(mockProps.onCancel).toHaveBeenCalledTimes(1);
    });

    it("handles delete button click", () => {
        render(<RdsCompAlertPopup {...mockProps} />);

        fireEvent.click(screen.getByTestId("rds-button-delete"));
        expect(mockProps.onSuccess).toHaveBeenCalledTimes(1);
    });

    it("renders confirmation type alert popup correctly", () => {
        const confirmProps = {
            ...mockProps,
            type: "confirm",
            buttonlabel: "Confirm",
            alertConfirmation: "Please Confirm"
        };

        render(<RdsCompAlertPopup {...confirmProps} />);

        expect(screen.getByText("Please Confirm")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-confirm")).toBeInTheDocument();
    });

    it("renders transfer ownership type alert popup correctly", () => {
        const transferProps = {
            ...mockProps,
            type: "transfer_ownership",
            buttonlabel: "Transfer",
            alertConfirmation: "Transfer Ownership"
        };

        render(<RdsCompAlertPopup {...transferProps} />);

        expect(screen.getByText("Transfer Ownership")).toBeInTheDocument();
        expect(screen.getByTestId("rds-button-transfer")).toBeInTheDocument();
    });

    it("renders OTP validation type correctly", () => {
        const otpProps = {
            ...mockProps,
            type: "otpvalidation",
            children: <div data-testid="otp-content">OTP Content</div>
        };

        render(<RdsCompAlertPopup {...otpProps} />);

        expect(screen.getByTestId("otp-content")).toBeInTheDocument();
    });

    it("renders with custom icon and color", () => {
        const customStyleProps = {
            ...mockProps,
            iconUrl: "custom-icon",
            colorVariant: "warning"
        };

        render(<RdsCompAlertPopup {...customStyleProps} />);

        const icon = screen.getByTestId("rds-icon");
        expect(icon).toHaveAttribute("name", "custom-icon");
        expect(icon).toHaveAttribute("colorVariant", "warning");
    });

    it("renders children content when provided", () => {
        render(
            <RdsCompAlertPopup {...mockProps}>
                <div data-testid="custom-content">Custom Child Content</div>
            </RdsCompAlertPopup>
        );

        expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    });
});