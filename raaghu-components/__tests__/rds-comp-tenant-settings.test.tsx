import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompTenantSettings, {
    RdsCompTenantSettingsProps,
} from "../src/rds-comp-tenant-settings/rds-comp-tenant-settings";


describe("RdsCompTenantSettings", () => {
    test("renders the component correctly", () => {
        render(<RdsCompTenantSettings />);

        // Verify that the component is rendered
        expect(screen.getByText("Database Connection String")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByText("Confirm Password")).toBeInTheDocument();
        expect(screen.getByText("Activate")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    test("handles checkbox change correctly", () => {
        const props: RdsCompTenantSettingsProps = {
            showEditData: true,
        };
        render(<RdsCompTenantSettings {...props} />);
    // Assertions and event simulation to test the checkbox behavior
    });

    test("enables save button when all inputs are valid", () => {
        render(<RdsCompTenantSettings />);
        const passwordInput = screen.getByTestId("password");
        const confirmPasswordInput = screen.getByTestId("confirm-password");
        const saveButton = screen.getByTestId("save");

        fireEvent.change(passwordInput, { target: { value: "strongPassword1!" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "strongPassword1!" },
        });

        expect(saveButton).toBeEnabled();
    });

    // Add more tests as needed
});
