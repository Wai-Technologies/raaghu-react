import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompRegister from "./rds-comp-register";

// Mock all the child components used in RdsCompRegister
jest.mock("../rds-elements", () => ({
  RdsLabel: jest.fn(({ label, className }) => (
    <div data-testid="rds-label" className={className}>{label}</div>
  )),
  RdsButton: jest.fn(({ label, onClick, dataTestId, isDisabled, block }) => (
    <button 
      data-testid={dataTestId} 
      disabled={isDisabled} 
      onClick={onClick}
      className={block ? "btn-block" : ""}
    >
      {label}
    </button>
  )),
  RdsInput: jest.fn(({ name, placeholder, inputType, onChange, value, dataTestId }) => (
    <input
      name={name}
      placeholder={placeholder}
      type={inputType === "password" ? "password" : "text"}
      onChange={onChange}
      value={value || ""}
      data-testid={dataTestId}
    />
  )),
  RdsCheckbox: jest.fn(({ labelText, checked, onChange, dataTestId }) => (
    <div data-testid={dataTestId}>
      <input
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        data-testid={`${dataTestId}-input`}
      />
      <label>{labelText}</label>
    </div>
  )),
  RdsCompIcon: jest.fn(({ name }) => (
    <img src="test-icon.svg" alt={name} role="img" data-testid={`icon-${name}`} />
  )),
  RdsModal: jest.fn(({ children, modalbutton }) => (
    <div data-testid="modal">
      {modalbutton}
      <div data-testid="modal-content">{children}</div>
    </div>
  )),
  RdsDropdownList: jest.fn(() => <div data-testid="dropdown-list"></div>)
}));

describe("RdsCompRegister", () => {
  const defaultMockProps = {
    getvalidTenantName: "TestTenant",
    emailAddress: "",
    password: "",
    userName: "",
    appName: "Test App",
    onLogin: jest.fn(),
    onRegister: jest.fn(),
    currentTenant: "Default",
    validTenant: jest.fn(),
    onSaveHandler: jest.fn(),
    languageData: [
      { id: "en", name: "English", icon: "en" },
      { id: "fr", name: "French", icon: "fr" }
    ],
    onClickHandler: jest.fn(),
    languageLabel: "English",
    registerFields: {
      emailAddress: "",
      password: "",
      Accept: false
    },
    register: "default" // This is crucial for rendering
  };

  const memberMockProps = {
    ...defaultMockProps,
    register: "member",
    registerMemberData: {
      userName: "",
      email: "",
      name: "",
      surname: "",
      password: ""
    },
    onRegisterMemberSaveHandler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Default Register Mode", () => {
    it("renders the register component correctly", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      // Check if main heading is present - use role to be more specific
      expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
    });

    it("renders tenant information correctly", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      expect(screen.getByText("Tenants TestTenant")).toBeInTheDocument();
      expect(screen.getByText("Not Selected")).toBeInTheDocument();
      expect(screen.getByText("Change")).toBeInTheDocument();
    });

    it("renders email and password input fields", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      // Check for form inputs using correct test IDs (as shown in the actual output)
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("password")).toBeInTheDocument();
    });

    it("renders register button", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      expect(screen.getByTestId("register")).toBeInTheDocument();
    });

    it("calls onLogin when login link is clicked", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      const loginLink = screen.getByTestId("login");
      fireEvent.click(loginLink);
      
      expect(defaultMockProps.onLogin).toHaveBeenCalledWith(true);
    });

    it("renders social login options", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      expect(screen.getByText("or Connect with")).toBeInTheDocument();
      expect(screen.getByTestId("icon-google")).toBeInTheDocument();
    });

    it("disables register button when form is invalid", () => {
      render(<RdsCompRegister {...defaultMockProps} />);
      
      const registerButton = screen.getByTestId("register");
      expect(registerButton).toBeDisabled();
    });

    it("enables register button when form is valid", () => {
      const validProps = {
        ...defaultMockProps,
        registerFields: {
          emailAddress: "test@example.com",
          password: "Password123!",
          Accept: true
        }
      };
      
      render(<RdsCompRegister {...validProps} />);
      
      const registerButton = screen.getByTestId("register");
      expect(registerButton).not.toBeDisabled();
    });
  });  describe("Member Register Mode", () => {
    it("renders member registration form correctly", () => {
      render(<RdsCompRegister {...memberMockProps} />);
      
      // Check for member-specific form inputs - there are multiple "name" fields, so use getAllByTestId
      expect(screen.getAllByTestId("name")).toHaveLength(2); // Username and first name fields
      expect(screen.getByTestId("email")).toBeInTheDocument();
      expect(screen.getByTestId("surname")).toBeInTheDocument();
    });

    it("renders accept terms checkbox", () => {
      render(<RdsCompRegister {...memberMockProps} />);
      
      expect(screen.getByText("I Accept Terms Of Service")).toBeInTheDocument();
    });

    it("renders create account button", () => {
      render(<RdsCompRegister {...memberMockProps} />);
      
      expect(screen.getByText("Accept & Create Account")).toBeInTheDocument();
    });  });
});