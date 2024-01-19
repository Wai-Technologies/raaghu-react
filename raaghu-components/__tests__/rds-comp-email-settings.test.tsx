import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompEmailSettings from "../src/rds-comp-email-settings/rds-comp-email-settings";

describe("RdsCompEmailSettings", () => {
    const emailSettings = {
        currentEmail: "example@example.com",
        newEmail: "",
        confirmEmail: ""
    };

    beforeEach(() => {
        render(<RdsCompEmailSettings emailSettings={emailSettings} />);
    });

    it("renders the current email input field", () => {
        const currentEmailInput = screen.getByTestId("current-email");
        expect(currentEmailInput).toBeInTheDocument();
        expect(currentEmailInput).toHaveValue(emailSettings.currentEmail);
    });

    it("renders the new email input field", () => {
        const newEmailInput = screen.getByTestId("new-email");
        expect(newEmailInput).toBeInTheDocument();
        expect(newEmailInput).toHaveValue(emailSettings.newEmail);
    });

    it("renders the confirm email input field", () => {
        const confirmEmailInput = screen.getByTestId("confirm-email");
        expect(confirmEmailInput).toBeInTheDocument();
        expect(confirmEmailInput).toHaveValue(emailSettings.confirmEmail);
    });

    it("renders the cancel and submit buttons", () => {
        const cancelButton = screen.getByTestId("cancel");
        const submitButton = screen.getByTestId("submit");

        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toHaveTextContent("Cancel");

        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent("Save");
    });

    it("triggers the submit event when Save button is clicked", () => {
        const submitButton = screen.getByTestId("submit");
        const form = submitButton.closest("form");
        const onSubmit = jest.fn();
        form?.addEventListener("submit", onSubmit);

        fireEvent.click(submitButton);

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });
});
