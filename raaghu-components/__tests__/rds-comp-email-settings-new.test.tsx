import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompEmailSettingsNew from "../src/rds-comp-email-settings-new/rds-comp-email-settings-new";

describe("RdsCompEmailSettingsNew", () => {
    it("renders the form with input fields and checkboxes", () => {
        render(<RdsCompEmailSettingsNew />);

        expect(screen.getByText("Default From Display Name")).toBeInTheDocument();
        const enterTextPlaceholder = screen.getAllByPlaceholderText("Enter Name");
        enterTextPlaceholder.forEach((item) => {
            expect(item).toBeInTheDocument();
        });
        expect(screen.getByText("Default From Address")).toBeInTheDocument();
        expect(screen.getByText("Host")).toBeInTheDocument();
        expect(screen.getByText("Port")).toBeInTheDocument();
        expect(screen.getByText("Enable SSL")).toBeInTheDocument();
        expect(screen.getByText("Use Default Credentials")).toBeInTheDocument();
        expect(screen.getByTestId("enable-ssl")).not.toBeChecked();
        expect(screen.getByTestId("default-credentials")).not.toBeChecked();
    });

    it("toggles checkbox values when clicked", () => {
        render(<RdsCompEmailSettingsNew />);

        const enableSSLCheckbox = screen.getByTestId("enable-ssl");
        const defaultCredentialsCheckbox = screen.getByTestId(
            "default-credentials"
        );

        fireEvent.click(enableSSLCheckbox);
        fireEvent.click(defaultCredentialsCheckbox);
        expect(enableSSLCheckbox).toBeChecked();
        expect(defaultCredentialsCheckbox).toBeChecked();
        fireEvent.click(enableSSLCheckbox);
        fireEvent.click(defaultCredentialsCheckbox);
        expect(enableSSLCheckbox).not.toBeChecked();
        expect(defaultCredentialsCheckbox).not.toBeChecked();
    });
});
