import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompContactUs from "../src/rds-comp-contact-us/rds-comp-contact-us";


describe("RdsCompContactUs", () => {
    test("renders without errors", () => {
        render(<RdsCompContactUs />);
    // Rendered without error 
    });

    it("should render form fields and button", () => {
        render(<RdsCompContactUs />);

        // Check if email input field is rendered
        const emailInput = screen.getByText("Email ID");
        expect(emailInput).toBeInTheDocument();

        // Check if fullname input field is rendered
        const fullnameInput = screen.getByText("Full Name");
        expect(fullnameInput).toBeInTheDocument();

        // Check if message textarea field is rendered
        const messageTextarea = screen.getByText("Message");
        expect(messageTextarea).toBeInTheDocument();

        // Check if submit button is rendered
        const submitButton = screen.getByText("Send Message");
        expect(submitButton).toBeInTheDocument();
    });


    test("submits the form when all fields are valid", () => {
        render(<RdsCompContactUs />);
        const emailInput = screen.getByPlaceholderText("name@gmail.com") as HTMLInputElement;
        const fullnameInput = screen.getByPlaceholderText("Full Name") as HTMLInputElement;
        const messageInput = screen.getByPlaceholderText("Message") as HTMLTextAreaElement;
        const submitButton = screen.getByText("Send Message") as HTMLButtonElement;

        fireEvent.change(emailInput, { target: { value: "valid-email@example.com" } });
        fireEvent.change(fullnameInput, { target: { value: "John Doe" } });
        fireEvent.change(messageInput, { target: { value: "Hello, world!" } });

        fireEvent.click(submitButton);

    });
  
});
