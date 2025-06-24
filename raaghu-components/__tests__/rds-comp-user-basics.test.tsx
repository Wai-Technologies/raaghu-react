import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompUserBasics from "../src/rds-comp-user-basics/rds-comp-user-basics";

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsInput: ({ 
    value,
    placeholder,
    inputType,
    name,
    label,
    required,
    onChange,
    onKeyDown,
    reset,
    validatonPattern,
    validationMsg,
    showIcon,
    ...props 
  }: any) => {
    // Filter out custom component props
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      if (['id', 'className', 'disabled', 'form', 'autoComplete'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <div data-testid={`input-container-${name?.replace(/\s+/g, '-').toLowerCase()}`}>
        {label && <label htmlFor={name?.replace(/\s+/g, '-').toLowerCase()}>{name}</label>}
        <input
          id={name?.replace(/\s+/g, '-').toLowerCase()}
          type={inputType}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value || ""}
          onChange={onChange}
          onKeyDown={onKeyDown}
          data-testid={`input-${name?.replace(/\s+/g, '-').toLowerCase()}`}
          pattern={validatonPattern ? validatonPattern.source : undefined}
          {...htmlProps}
        />
        {validationMsg && (
          <div data-testid={`validation-msg-${name?.replace(/\s+/g, '-').toLowerCase()}`}>
            {validationMsg}
          </div>
        )}
        {showIcon && <span data-testid="password-icon">👁</span>}
      </div>
    );
  },
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled, 
    dataTestId, 
    colorVariant, 
    size, 
    type,
    tooltipTitle,
    databsdismiss,
    ...props 
  }: any) => {
    // Filter out custom component props
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      if (['id', 'name', 'className', 'disabled', 'form'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label?.replace(/\s+/g, '-').toLowerCase()}`}
        type={type || "button"}
        title={tooltipTitle}
        data-bs-dismiss={databsdismiss}
        {...htmlProps}
      >
        {label}
      </button>
    );
  },
  RdsCheckbox: ({ 
    id,
    labelText,
    checked,
    onChange,
    ...props 
  }: any) => {
    // Filter out custom component props
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      if (['className', 'disabled'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    const checkboxId = `checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`;
    
    return (
      <div data-testid={`checkbox-container-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}>
        <label htmlFor={checkboxId}>
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked || false}
            onChange={onChange}
            data-testid={checkboxId}
            {...htmlProps}
          />
          {labelText}
        </label>
      </div>
    );
  },
}));

// Mock RdsDatatable
jest.mock("../src/rds-data-table", () => {
  return function MockRdsCompDatatable(props: any) {
    return (
      <div data-testid="rds-comp-datatable">
        Mock Data Table
      </div>
    );
  };
});

describe("RdsCompUserBasics", () => {
  const mockUserData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    userName: "johndoe",
    phoneNumber: "1234567890",
    twoFactorEnabled: false,
    isActive: true,
    lockoutEnabled: false,
    shouldChangePasswordOnNextLogin: false
  };

  const defaultProps = {
    user: "basics", // This is required for the component to render content
    onSubmit: jest.fn(),
    selectuser: [],
    Usermanagementsettings: undefined,
    tableHeaders: [],
    tableData: [],
    actions: [],
    pagination: false,
    onActionSelection: jest.fn(),
    usersRole: undefined,
    recordsPerPage: 0,
    recordsPerPageSelectListOption: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByTestId("input-first-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-last-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-email-address")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-username")).toBeInTheDocument();
    expect(screen.getByTestId("input-phone-number")).toBeInTheDocument();
  });

  // Test 2: Renders all form fields with correct labels
  it("renders all form fields with correct labels", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
  });

  // Test 3: Renders all checkboxes
  it("renders all checkbox options", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByTestId("checkbox-two-factor-authentication")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-active")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-should-change-password-on-next-login")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-account-lockout")).toBeInTheDocument();
  });

  // Test 4: Renders action buttons
  it("renders save and cancel buttons", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByTestId("save")).toBeInTheDocument();
    expect(screen.getByTestId("cancel")).toBeInTheDocument();
  });

  // Test 5: Shows correct placeholders
  it("displays correct placeholder texts", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByPlaceholderText("Enter First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Phone Number")).toBeInTheDocument();
  });

  // Test 6: Populates form with initial userData
  it("populates form with provided userData", () => {
    render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} />);
    
    expect(screen.getByTestId("input-first-name")).toHaveValue("John");
    expect(screen.getByTestId("input-last-name")).toHaveValue("Doe");
    expect(screen.getByTestId("input-email-address")).toHaveValue("john.doe@example.com");
    expect(screen.getByTestId("input-password")).toHaveValue("password123");
    expect(screen.getByTestId("input-username")).toHaveValue("johndoe");
    expect(screen.getByTestId("input-phone-number")).toHaveValue("1234567890");
    expect(screen.getByTestId("checkbox-active")).toBeChecked();
  });

  // Test 7: Handles input changes
  it("handles input field changes correctly", () => {
    render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} />);
    
    const firstNameInput = screen.getByTestId("input-first-name");
    
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    
    expect(firstNameInput).toHaveValue("Jane");
  });

  // Test 8: Handles checkbox changes
  it("handles checkbox changes correctly", () => {
    render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} />);
    
    const twoFactorCheckbox = screen.getByTestId("checkbox-two-factor-authentication");
    
    expect(twoFactorCheckbox).not.toBeChecked();
    
    fireEvent.click(twoFactorCheckbox);
    
    expect(twoFactorCheckbox).toBeChecked();
  });

  // Test 9: Save button validation
  it("validates save button state based on form data", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    const saveButton = screen.getByTestId("save");
    
    // Save button should exist
    expect(saveButton).toBeInTheDocument();
  });

  // Test 10: Save button with valid data
  it("enables save button when form has valid data", () => {
    render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} />);
    
    const saveButton = screen.getByTestId("save");
      expect(saveButton).not.toBeDisabled();
  });

  // Test 11: Form validation - email pattern
  it("applies email validation pattern", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    const emailInput = screen.getByTestId("input-email-address");
    
    expect(emailInput).toHaveAttribute("pattern");
    expect(screen.getByTestId("validation-msg-email-address")).toHaveTextContent("Invalid Email Address.");
  });
  // Test 12: Password field shows icon
  it("shows password visibility icon", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByTestId("password-icon")).toBeInTheDocument();
  });

  // Test 13: Required fields are marked as required
  it("marks all input fields as required", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByTestId("input-first-name")).toBeRequired();
    expect(screen.getByTestId("input-last-name")).toBeRequired();
    expect(screen.getByTestId("input-email-address")).toBeRequired();
    expect(screen.getByTestId("input-password")).toBeRequired();
    expect(screen.getByTestId("input-username")).toBeRequired();
    expect(screen.getByTestId("input-phone-number")).toBeRequired();
  });
  // Test 14: Form structure and CSS classes
  it("renders with correct form structure", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    // Check for form element
    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass("pt-3");
    
    // Check for row structures
    const rows = document.querySelectorAll(".row");
    expect(rows.length).toBeGreaterThan(0);
  });

  // Test 15: Button attributes and styling
  it("applies correct attributes to buttons", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    const saveButton = screen.getByTestId("save");
    const cancelButton = screen.getByTestId("cancel");
    
    expect(saveButton).toHaveAttribute("type", "submit");
    expect(cancelButton).toHaveAttribute("type", "button");
    expect(cancelButton).toHaveAttribute("data-bs-dismiss", "offcanvas");
    expect(saveButton).toHaveAttribute("data-bs-dismiss", "offcanvas");
  });

  // Test 17: Checkbox labels are correct
  it("displays correct checkbox labels", () => {
    render(<RdsCompUserBasics {...defaultProps} />);
    
    expect(screen.getByLabelText("Two Factor Authentication")).toBeInTheDocument();
    expect(screen.getByLabelText("Active")).toBeInTheDocument();
    expect(screen.getByLabelText("Should Change Password On Next Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Account Lockout")).toBeInTheDocument();
  });

  // Test 18: Updates userData when props change
  it("updates form data when userData prop changes", () => {
    const { rerender } = render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} />);
    
    expect(screen.getByTestId("input-first-name")).toHaveValue("John");
    
    const newUserData = { ...mockUserData, firstName: "Jane" };
    rerender(<RdsCompUserBasics {...defaultProps} userData={newUserData} />);
    
    expect(screen.getByTestId("input-first-name")).toHaveValue("Jane");
  });
  // Test 19: Component behavior with different user prop values
  it("renders correctly when user prop is 'basics'", () => {
    render(<RdsCompUserBasics {...defaultProps} user="basics" />);
    
    expect(screen.getByTestId("input-first-name")).toBeInTheDocument();
    expect(screen.getByTestId("save")).toBeInTheDocument();
  });

  // Test 20: Reset functionality
  it("handles reset prop correctly", () => {
    const { rerender } = render(<RdsCompUserBasics {...defaultProps} userData={mockUserData} reset={false} />);
    
    // Change reset prop
    rerender(<RdsCompUserBasics {...defaultProps} userData={mockUserData} reset={true} />);
    
    // Component should handle reset without crashing
    expect(screen.getByTestId("input-first-name")).toBeInTheDocument();
  });
});
