import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompNotificationSettings, { RdsCompNotificationSettingsProps } from "../src/rds-comp-notification-settings/rds-comp-notification-settings";

describe("RdsCompNotificationSettings", () => {
    const defaultProps: RdsCompNotificationSettingsProps = {
        onSave: jest.fn(),
        onCancel: jest.fn(),
        default: [{ enabled: false, NewUser: false, NewTenant: false }],
    };


    test("renders notification settings component", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        // Check for the presence of important elements in the component
        expect(screen.getByText("Receive Notifications")).toBeInTheDocument();
        expect(screen.getByText("Notification Types")).toBeInTheDocument();
        expect(screen.getByTestId("cancel-btn")).toBeInTheDocument();
        expect(screen.getByTestId("save-btn")).toBeInTheDocument();
    });

    test("toggle notification checkbox", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        const notificationCheckbox = screen.getByTestId("notification") as HTMLInputElement;
        fireEvent.click(notificationCheckbox);

        expect(notificationCheckbox.checked).toBe(true);
        expect(defaultProps.onSave).not.toHaveBeenCalled(); // onSave should not be called
    });

    test("toggle new user checkbox", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        const newUserCheckbox = screen.getByTestId("new-user") as HTMLInputElement;
        fireEvent.click(newUserCheckbox);

        expect(newUserCheckbox.checked).toBe(true);
        expect(defaultProps.onSave).not.toHaveBeenCalled(); // onSave should not be called
    });

    test("toggle new tenant checkbox", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        const newTenantCheckbox = screen.getByTestId("new-tenant") as HTMLInputElement;
        fireEvent.click(newTenantCheckbox);

        expect(newTenantCheckbox.checked).toBe(true);
        expect(defaultProps.onSave).not.toHaveBeenCalled(); // onSave should not be called
    });

    test("click cancel button", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        const cancelButton = screen.getByTestId("cancel-btn");
        fireEvent.click(cancelButton);

        expect(defaultProps.onCancel).toHaveBeenCalledTimes(1); // onCancel should be called once
    });

    test("click save button", () => {
        render(<RdsCompNotificationSettings {...defaultProps} />);

        const saveButton = screen.getByTestId("save-btn");
        fireEvent.click(saveButton);

        expect(defaultProps.onSave).toHaveBeenCalledTimes(1); // onSave should be called once
        expect(defaultProps.onSave).toHaveBeenCalledWith(expect.any(Object), defaultProps.default);
    });
});
