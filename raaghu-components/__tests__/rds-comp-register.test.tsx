import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import RdsCompRegister, { RdsCompRegisterProps } from "../src/rds-comp-register/rds-comp-register";

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
}));
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
   
  jest.mock("bootstrap", () => ({
    Tooltip: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
  }));
   
  jest.mock(
    "../../raaghu-elements/src/rds-dropdown-list/rds-dropdown-list.tsx",
    () => {
      return jest.fn(() => <div data-testid="mocked-rds-dropdown-list" />);
    }
  );

describe("RdsCompRegister", () => {
    const mockProps: RdsCompRegisterProps = {
        error: null,
        getvalidTenantName: "",
        emailAddress: "",
        password: "",
        userName: "",
        appName: "",
        onDismissAlert: jest.fn(),
        onLogin: jest.fn(),
        onRegister: jest.fn(),
        currentTenant: null,
        validTenant: null,
        languageData: undefined
    };

    it("renders the register form correctly", () => {
        render(<RdsCompRegister {...mockProps} />);

        expect(screen.getByPlaceholderText("AbpAccount.DisplayName:Email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("AbpAccount.DisplayName:Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Already Have An Account")).toBeInTheDocument();
    });

    it("submits the form with valid input", () => {
        render(<RdsCompRegister {...mockProps} />);

        const emailInput = screen.getByTestId("email");
        const passwordInput = screen.getByTestId("password");
        const registerButton = screen.getByTestId("register");

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(registerButton);

        expect(mockProps.onRegister).toHaveBeenCalledTimes(1);
        expect(mockProps.onRegister).toHaveBeenCalledWith(
            "test@example.com", "password123", "test@example.com", "Angular"
        );
    });

    it("navigates to login page on login link click", () => {
        render(<RdsCompRegister {...mockProps} />);

        const loginLink = screen.getByTestId("login");

        fireEvent.click(loginLink);

        expect(mockProps.onLogin).toHaveBeenCalledTimes(1);
        expect(mockProps.onLogin).toHaveBeenCalledWith(true);
    });

    it("updates the email address field when it is changed", () => {
        render(<RdsCompRegister {...mockProps} />);

        const emailInput = screen.getByTestId("email") as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });

        expect(emailInput.value).toBe("test@example.com");
    });

    it("updates the password field when it is changed", () => {
        render(<RdsCompRegister {...mockProps} />);

        const passwordInput = screen.getByTestId("password") as HTMLInputElement;

        fireEvent.change(passwordInput, { target: { value: "password123" } });

        expect(passwordInput.value).toBe("password123");
    });

    it("toggles the tenant switch and updates the current tenant field", () => {
        render(<RdsCompRegister {...mockProps} />);

        const switchTenant = screen.getByTestId("switch-tenant")  as HTMLInputElement;
        const tenancyNameInput = screen.getByTestId("tenacy-name") as HTMLInputElement;

        fireEvent.click(switchTenant);

        expect(switchTenant.checked).toBe(true);
        expect(tenancyNameInput).toBeEnabled();

        fireEvent.change(tenancyNameInput, { target: { value: "Tenant1" } });

        expect(tenancyNameInput.value).toBe("Tenant1");

        fireEvent.click(switchTenant);

        expect(switchTenant.checked).toBe(false);
        expect(tenancyNameInput).toBeDisabled();
        expect(tenancyNameInput.value).toBe("Tenant1");
    });
});
