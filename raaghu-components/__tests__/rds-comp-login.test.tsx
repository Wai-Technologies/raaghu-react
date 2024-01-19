import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompLogin from "../src/rds-comp-login/rds-comp-login";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));

describe("RdsCompLogin", () => {
    test("renders login form correctly", () => {
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={() => { } }
                onForgotPassword={() => { } }
                onRegister={() => { } }
                currentTenant={{}}
                validTenant={{}}
                error={{ show: false, message: "" }} languageData={undefined}            />
        );

        // Assert the presence of form elements
        expect(screen.getByPlaceholderText("Enter Email/Username")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
        expect(screen.getByText("AbpAccount.RememberMe")).toBeInTheDocument();
        expect(screen.getByText("AbpAccount.ForgotPassword")).toBeInTheDocument();
        expect(screen.getByText("Dont have an Account")).toBeInTheDocument();
        expect(screen.getByText("AbpUi.Register")).toBeInTheDocument();
    });

    test("calls onLogin when form is submitted", () => {
        const mockOnLogin = jest.fn();
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={mockOnLogin}
                onForgotPassword={() => { } }
                onRegister={() => { } }
                currentTenant={{}}
                validTenant={{}}
                error={{ show: false, message: "" }} languageData={undefined}            />
        );

        // Fill in the form
        fireEvent.change(screen.getByTestId("username"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByTestId("password"), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByTestId("remember-me"));
            });

    test("calls onForgotPassword when 'Forgot password ?' is clicked", () => {
        const mockOnForgotPassword = jest.fn();
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={() => { } }
                onForgotPassword={mockOnForgotPassword}
                onRegister={() => { } }
                currentTenant={{}}
                validTenant={{}}
                error={{ show: false, message: "" }} languageData={undefined}            />
        );

        // Click on 'Forgot password ?' link
        fireEvent.click(screen.getByText("AbpAccount.ForgotPassword"));

        // Check if onForgotPassword was called
        expect(mockOnForgotPassword).toHaveBeenCalled();
    });

    test("calls onRegister when 'Register' is clicked", () => {
        const mockOnRegister = jest.fn();
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={() => { } }
                onForgotPassword={() => { } }
                onRegister={mockOnRegister}
                currentTenant={{}}
                validTenant={{}}
                error={{ show: false, message: "" }} languageData={undefined}            />
        );

        // Click on 'Register' link
        fireEvent.click(screen.getByText("AbpUi.Register"));

        // Check if onRegister was called
        expect(mockOnRegister).toHaveBeenCalled();
    });

    test("displays error message when error prop is provided", () => {
        const error = { show: true, message: "Invalid credentials" };
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={() => { } }
                onForgotPassword={() => { } }
                onRegister={() => { } }
                currentTenant={{}}
                validTenant={{}}
                error={error} languageData={undefined}            />
        );

        // Assert the presence of the error message
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    test("calls onDismissAlert when dismissing the error message", () => {
        const error = { show: true, message: "Invalid credentials" };
        const mockOnDismissAlert = jest.fn();
        render(
            <RdsCompLogin
                getvalidTenantName=""
                email=""
                password=""
                onLogin={() => { } }
                onForgotPassword={() => { } }
                onRegister={() => { } }
                currentTenant={{}}
                validTenant={{}}
                error={error}
                onDismissAlert={mockOnDismissAlert} languageData={undefined}            />
        );

        // Click the dismiss button on the error message
        fireEvent.click(screen.getByRole("button", { name: "Close" }));

        // Check if onDismissAlert was called
        expect(mockOnDismissAlert).toHaveBeenCalled();
    });
});
