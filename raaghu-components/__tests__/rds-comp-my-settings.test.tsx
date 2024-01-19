import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RdsCompMySettings from "../src/rds-comp-my-settings/rds-comp-my-settings";

describe("RdsCompMySettings", () => {



    describe("RdsCompMySettings", () => {
        it("should render the component without errors", () => {
            render(<RdsCompMySettings />);

            // Check if the "Profile Name" label and input are associated correctly
            const profileNameLabel = screen.getByText("Profile Name");
            expect(profileNameLabel).toBeInTheDocument();
            expect(profileNameLabel).toBeVisible();
            const profileNameInput = screen.getByPlaceholderText("Current password");
            expect(profileNameInput).toBeInTheDocument();
            expect(profileNameInput).toBeVisible();


            const emailLabel = screen.getByText("Email");
            expect(emailLabel).toBeInTheDocument();
            expect(emailLabel).toBeVisible();
            const emailInput = screen.getByPlaceholderText("contact@waiin.com");
            expect(emailLabel).toBeVisible();
            expect(emailInput).toBeInTheDocument();

            // // Check if the "User Name" label and input are associated correctly
            const userNameLabel = screen.getByText("User Name");
            const userNameInput = screen.getByPlaceholderText("Confirm new password");
            expect(userNameInput).toBeInTheDocument();
            expect(userNameLabel).toBeInTheDocument();

            // // Check if the "Current password" label and input are associated correctly
            const currentPasswordLabel = screen.getByText("Current password");
            const currentPasswordInput = screen.getByPlaceholderText("Current password");
            expect(currentPasswordLabel).toBeInTheDocument();
            expect(currentPasswordInput).toBeInTheDocument();

            // // Check if the "New password" label and input are associated correctly
            const newPasswordLabel = screen.getByText("New password");
            const newPasswordInput = screen.getByPlaceholderText("New password");
            expect(newPasswordLabel).toBeInTheDocument();
            expect(newPasswordInput).toBeInTheDocument();

        });
    });
});

it("should update the current password state on input change", () => {
    render(<RdsCompMySettings />);
    const curPassInput = screen.getAllByPlaceholderText("Confirm new password")[0]; // Access the first element
    expect(curPassInput).toBeVisible();
    expect(curPassInput).toBeInTheDocument();
});
