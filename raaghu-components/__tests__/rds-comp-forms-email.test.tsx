import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompFormsEmail, {
    RdsCompFormsEmailProps,
} from "../src/rds-comp-forms-email/rds-comp-forms-email";

describe("RdsCompFormsEmail", () => {
    const mockProps: RdsCompFormsEmailProps = {
        formsEmailData: {
            to: "test@example.com",
            subject: "Test Subject",
            body: "Test Body",
        },
        handleSubmit: jest.fn(),
    };

    it("renders the component correctly", () => {
        render(<RdsCompFormsEmail {...mockProps} />);
        expect(screen.getByText("Forms.To")).toBeInTheDocument();
        expect(screen.getByText("Forms.Subject")).toBeInTheDocument();
        expect(screen.getByText("AbpUi.Cancel")).toBeInTheDocument();
        expect(screen.getByText("Forms.Send")).toBeInTheDocument();
    });

    it("updates email data on input change", () => {
        render(<RdsCompFormsEmail {...mockProps} />);
        const toInput = screen.getByTestId("email");
        const subjectInput = screen.getByTestId("subject");
        fireEvent.change(toInput, { target: { value: "new@example.com" } });
        fireEvent.change(subjectInput, { target: { value: "New Subject" } });

        expect(toInput).toHaveValue("new@example.com");
        expect(subjectInput).toHaveValue("New Subject");
    });

    it("disables SEND button when email form is invalid", () => {
        render(<RdsCompFormsEmail {...mockProps} />);
        const toInput = screen.getByTestId("email");
        const sendButton = screen.getByTestId("send");
        fireEvent.change(toInput, { target: { value: "invalid-email" } });
        expect(sendButton).toBeDisabled();
    });

    it("enables SEND button when email form is valid", () => {
        render(<RdsCompFormsEmail {...mockProps} />);
        const toInput = screen.getByTestId("email");
        const sendButton = screen.getByTestId("send");
        fireEvent.change(toInput, { target: { value: "valid@example.com" } });
        expect(sendButton).toBeEnabled();
    });
});
