import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompForgotPassword, {
    RdsForgotPasswordProps,
} from "../src/rds-comp-forgot-password/rds-comp-forgot-password";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));

jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );
   

describe("RdsCompForgotPassword", () => {
    const mockForgotPassword = jest.fn();

    const defaultProps: RdsForgotPasswordProps = {
        onForgotPassword: mockForgotPassword,
        onResend: function (isForgotPasswordClicked?: boolean | undefined): void {
            throw new Error("Function not implemented.");
        },
        onLogin: function (isLoginClicked?: boolean | undefined): void {
            throw new Error("Function not implemented.");
        },
        languageData: undefined
    };

    it("renders the initial state correctly", () => {
        render(<RdsCompForgotPassword {...defaultProps} />);

        expect(screen.getByText("AbpAccount.ForgotPassword")).toBeInTheDocument();
        expect(screen.getByTestId("email")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("displays success message after submitting email", () => {
        render(<RdsCompForgotPassword {...defaultProps} />);

        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(submitButton);

        expect(mockForgotPassword).toHaveBeenCalledTimes(1);
        expect(mockForgotPassword).toHaveBeenCalledWith("test@example.com");
        expect(screen.getByText("Email has been sent!")).toBeInTheDocument();
        expect(screen.getByText("Resend")).toBeInTheDocument();
    });

    it("calls the resendHandler function when 'Resend' link is clicked", () => {
        render(<RdsCompForgotPassword {...defaultProps} />);
        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(submitButton);
        const resendLink = screen.getByTestId("resend-link");

        fireEvent.click(resendLink);
    });

    it("calls the onForgotPassword callback when submitting the form", () => {
        render(<RdsCompForgotPassword {...defaultProps} />);

        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(submitButton);

        expect(mockForgotPassword).toHaveBeenCalled();
        expect(mockForgotPassword).toHaveBeenCalledWith("test@example.com");
    });

    it("resets the form and hides the success message when 'Resend' link is clicked", () => {
        render(<RdsCompForgotPassword {...defaultProps} />);

        const emailInput = screen.getByTestId("email");
        const submitButton = screen.getByRole("button", { name: "Submit" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(submitButton);

        expect(screen.getByText("Email has been sent!")).toBeInTheDocument();
        const resendLink = screen.getByTestId("resend-link");

        fireEvent.click(resendLink);
    });
});
