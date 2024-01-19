import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompLinkedAccount from "../src/rds-comp-linked-account/rds-comp-linked-account";

describe("RdsCompLinkedAccount", () => {
    it("renders the initial component state correctly", () => {
        render(<RdsCompLinkedAccount />);

        expect(screen.getByText("Link New Account")).toBeInTheDocument();
        expect(screen.queryByTestId("tenancy-name")).not.toBeInTheDocument();
        expect(screen.queryByTestId("username")).not.toBeInTheDocument();
        expect(screen.queryByTestId("password")).not.toBeInTheDocument();
        expect(screen.queryByTestId("cancel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("submit")).not.toBeInTheDocument();
    });

    it("toggles the form on button click", () => {
        render(<RdsCompLinkedAccount />);
        fireEvent.click(screen.getByTestId("link-new-account"));
        expect(screen.getByTestId("tenancy-name")).toBeInTheDocument();
        expect(screen.getByTestId("username")).toBeInTheDocument();
        expect(screen.getByTestId("password")).toBeInTheDocument();
        expect(screen.getByTestId("cancel")).toBeInTheDocument();
        expect(screen.getByTestId("submit")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("cancel"));

        expect(screen.queryByTestId("tenancy-name")).not.toBeInTheDocument();
        expect(screen.queryByTestId("username")).not.toBeInTheDocument();
        expect(screen.queryByTestId("password")).not.toBeInTheDocument();
        expect(screen.queryByTestId("cancel")).not.toBeInTheDocument();
        expect(screen.queryByTestId("submit")).not.toBeInTheDocument();
    });
});



describe("RdsCompLinkedAccount", () => {
    test("renders the \"LINK NEW ACCOUNT\" button initially", () => {
        render(<RdsCompLinkedAccount />);
        const linkNewAccountButton = screen.getByTestId("link-new-account");
        expect(linkNewAccountButton).toBeInTheDocument();
    });

    test("clicking the \"LINK NEW ACCOUNT\" button shows the form", () => {
        render(<RdsCompLinkedAccount />);
        const linkNewAccountButton = screen.getByTestId("link-new-account");
        fireEvent.click(linkNewAccountButton);
        const tenancyNameInput = screen.getByTestId("tenancy-name");
        const userNameInput = screen.getByTestId("username");
        const passwordInput = screen.getByTestId("password");
        const cancelButton = screen.getByTestId("cancel");
        const saveButton = screen.getByTestId("submit");
        expect(tenancyNameInput).toBeInTheDocument();
        expect(userNameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
    });

    test("renders the component and checks the presence of buttons", () => {
        render(<RdsCompLinkedAccount />);
    
        // Check the presence of the link-new-account button
        const linkNewAccountButton = screen.getByTestId("link-new-account");
        expect(linkNewAccountButton).toBeInTheDocument();
  
        // Simulate clicking the link-new-account button to show the form
        fireEvent.click(linkNewAccountButton);
  
        // Check the presence of the cancel button in the form
        const cancelButton = screen.getByTestId("cancel");
        expect(cancelButton).toBeInTheDocument();
  
        // Check the presence of the submit button in the form
        const submitButton = screen.getByTestId("submit");
        expect(submitButton).toBeInTheDocument();
    });
  
  
});




