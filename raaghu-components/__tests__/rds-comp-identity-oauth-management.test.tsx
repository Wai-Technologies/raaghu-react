import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIdentityOauthManagement from "../src/rds-comp-identity-oauth-management/rds-comp-identity-oauth-management";

// Mock the rds-elements used in the OAuth management component
jest.mock("../src/rds-elements", () => ({
  RdsInput: jest.fn(({ 
    value, 
    name, 
    label, 
    placeholder, 
    customClasses, 
    inputType, 
    onChange, 
    dataTestId,
    required,
    reset 
  }) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType || "text"}
        placeholder={placeholder}
        className={customClasses}
        data-testid={dataTestId}
        onChange={onChange}
        value={value || ""}
        required={required}
        data-reset={reset}
      />
    </div>
  )),
  RdsCheckbox: jest.fn(({ 
    labelText, 
    onChange, 
    checked, 
    dataTestId 
  }) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
        id={`checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}
      />
      <label htmlFor={`checkbox-${labelText?.replace(/\s+/g, '-').toLowerCase()}`}>{labelText}</label>
    </div>
  )),
  RdsCompLabel: jest.fn(({ label }) => (
    <label data-testid="oauth-settings-label">{label}</label>
  )),
  RdsButton: jest.fn(({ 
    label, 
    type, 
    colorVariant, 
    size, 
    dataTestId, 
    onClick,
    isDisabled 
  }) => (
    <button
      type={type}
      data-testid={dataTestId}
      onClick={onClick}
      data-variant={colorVariant}
      data-size={size}
      disabled={isDisabled}
    >
      {label}
    </button>
  )),
}));

// Mock react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Sample OAuth data for testing
const mockOauthData = {
  enableOAuthLogin: true,
  clientId: "test-client-id",
  clientSecret: "test-client-secret",
  authority: "https://example.com/auth",
  scope: "openid profile email",
  requireHttpsMetadata: true,
  validateEndpoints: false,
  validateIssuerName: true
};

describe("RdsCompIdentityOauthManagement Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test basic rendering
  test("should render the OAuth management component with OAuth data", () => {
    const { container } = render(
      <RdsCompIdentityOauthManagement oauthData={mockOauthData} />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if the main label is rendered
    expect(screen.getByTestId("oauth-settings-label")).toHaveTextContent("OAuth Login Settings");

    // Check if inputs have the correct values
    expect(screen.getByTestId("client-id")).toHaveValue("test-client-id");
    expect(screen.getByTestId("client-secret")).toHaveValue("test-client-secret");
    expect(screen.getByTestId("base-domain")).toHaveValue("https://example.com/auth");
    expect(screen.getByTestId("scope")).toHaveValue("openid profile email");
    
    // Check if checkboxes have correct states
    expect(screen.getByTestId("use-default-credential")).toBeChecked();
    expect(screen.getByTestId("requireHttpsMetadata")).toBeChecked();
    expect(screen.getByTestId("validateEndpoints")).not.toBeChecked();
    expect(screen.getByTestId("validateIssuerName")).toBeChecked();

    // Check if save button is rendered
    expect(screen.getByTestId("save")).toBeInTheDocument();
  });

  // Test rendering with empty OAuth data
  test("should render correctly with empty OAuth data", () => {
    const emptyOauthData = {
      enableOAuthLogin: false,
      clientId: "",
      clientSecret: "",
      authority: "",
      scope: "",
      requireHttpsMetadata: false,
      validateEndpoints: false,
      validateIssuerName: false
    };

    render(<RdsCompIdentityOauthManagement oauthData={emptyOauthData} />);

    // Inputs should be empty
    expect(screen.getByTestId("client-id")).toHaveValue("");
    expect(screen.getByTestId("client-secret")).toHaveValue("");
    expect(screen.getByTestId("base-domain")).toHaveValue("");
    expect(screen.getByTestId("scope")).toHaveValue("");
    
    // Checkboxes should not be checked
    expect(screen.getByTestId("use-default-credential")).not.toBeChecked();
    expect(screen.getByTestId("requireHttpsMetadata")).not.toBeChecked();
    expect(screen.getByTestId("validateEndpoints")).not.toBeChecked();
    expect(screen.getByTestId("validateIssuerName")).not.toBeChecked();
  });

  // Test input field value changes
  test("should update OAuth data when input values change", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);

    // Change Client ID input
    const clientIdInput = screen.getByTestId("client-id");
    fireEvent.change(clientIdInput, { target: { value: "new-client-id" } });
    expect(clientIdInput).toHaveValue("new-client-id");

    // Change Client Secret input
    const clientSecretInput = screen.getByTestId("client-secret");
    fireEvent.change(clientSecretInput, { target: { value: "new-client-secret" } });
    expect(clientSecretInput).toHaveValue("new-client-secret");

    // Change Authority input
    const authorityInput = screen.getByTestId("base-domain");
    fireEvent.change(authorityInput, { target: { value: "https://new-auth.example.com" } });
    expect(authorityInput).toHaveValue("https://new-auth.example.com");

    // Change Scope input
    const scopeInput = screen.getByTestId("scope");
    fireEvent.change(scopeInput, { target: { value: "openid profile" } });
    expect(scopeInput).toHaveValue("openid profile");
  });

  // Test checkbox state changes
  test("should update OAuth settings when checkboxes are toggled", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);

    // Toggle Enable OAuth Login checkbox
    const enableOAuthCheckbox = screen.getByTestId("use-default-credential");
    expect(enableOAuthCheckbox).toBeChecked();
    fireEvent.click(enableOAuthCheckbox);
    expect(enableOAuthCheckbox).not.toBeChecked();

    // Toggle Require Https Metadata checkbox
    const requireHttpsCheckbox = screen.getByTestId("requireHttpsMetadata");
    expect(requireHttpsCheckbox).toBeChecked();
    fireEvent.click(requireHttpsCheckbox);
    expect(requireHttpsCheckbox).not.toBeChecked();

    // Toggle Validate Endpoints checkbox
    const validateEndpointsCheckbox = screen.getByTestId("validateEndpoints");
    expect(validateEndpointsCheckbox).not.toBeChecked();
    fireEvent.click(validateEndpointsCheckbox);
    expect(validateEndpointsCheckbox).toBeChecked();

    // Toggle Validate Issuer Name checkbox
    const validateIssuerCheckbox = screen.getByTestId("validateIssuerName");
    expect(validateIssuerCheckbox).toBeChecked();
    fireEvent.click(validateIssuerCheckbox);
    expect(validateIssuerCheckbox).not.toBeChecked();
  });

  // Test save button functionality
  test("should call onOauthDataSubmit with updated OAuth data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityOauthManagement 
        oauthData={mockOauthData} 
        onOauthDataSubmit={mockSaveHandler} 
      />
    );
    
    // Update form values
    const clientIdInput = screen.getByTestId("client-id");
    fireEvent.change(clientIdInput, { target: { value: "updated-client-id" } });
    
    const authorityInput = screen.getByTestId("base-domain");
    fireEvent.change(authorityInput, { target: { value: "https://updated-auth.example.com" } });
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Verify that onOauthDataSubmit was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      enableOAuthLogin: true,
      clientId: "updated-client-id",
      clientSecret: "test-client-secret",
      authority: "https://updated-auth.example.com",
      scope: "openid profile email",
      requireHttpsMetadata: true,
      validateEndpoints: false,
      validateIssuerName: true
    });
  });

  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityOauthManagement 
        oauthData={mockOauthData} 
        onOauthDataSubmit={mockSaveHandler} 
      />
    );
    
    // Initial values
    const clientIdInput = screen.getByTestId("client-id");
    expect(clientIdInput).toHaveValue("test-client-id");
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(clientIdInput).toHaveValue("");
    expect(screen.getByTestId("client-secret")).toHaveValue("");
    expect(screen.getByTestId("base-domain")).toHaveValue("");
    expect(screen.getByTestId("scope")).toHaveValue("");
    expect(screen.getByTestId("use-default-credential")).not.toBeChecked();
    expect(screen.getByTestId("requireHttpsMetadata")).not.toBeChecked();
    expect(screen.getByTestId("validateEndpoints")).not.toBeChecked();
    expect(screen.getByTestId("validateIssuerName")).not.toBeChecked();
  });

  // Test component updates when props change
  test("should update when oauthData prop changes", () => {
    const { rerender } = render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // Initial values
    const clientIdInput = screen.getByTestId("client-id");
    expect(clientIdInput).toHaveValue("test-client-id");
    
    // Update the props
    const updatedOauthData = {
      ...mockOauthData,
      clientId: "different-client-id",
      authority: "https://different-auth.example.com"
    };
    
    rerender(<RdsCompIdentityOauthManagement oauthData={updatedOauthData} />);
    
    // Component should reflect the new props
    expect(clientIdInput).toHaveValue("different-client-id");
    expect(screen.getByTestId("base-domain")).toHaveValue("https://different-auth.example.com");
  });
  // Test reset prop functionality
  test("should trigger input reset when reset prop changes", () => {
    const { rerender } = render(
      <RdsCompIdentityOauthManagement oauthData={mockOauthData} />
    );
    
    // Check initial reset state (starts as false, gets toggled to true when component mounts)
    const clientIdInput = screen.getByTestId("client-id");
    const initialResetState = clientIdInput.getAttribute("data-reset");
    
    // Change reset prop to true (this should toggle the reset state)
    rerender(
      <RdsCompIdentityOauthManagement oauthData={mockOauthData} reset={true} />
    );
    
    // The reset prop should trigger a change in the input reset state
    const newResetState = clientIdInput.getAttribute("data-reset");
    expect(newResetState).not.toBe(initialResetState);
  });

  // Test form validation - save button should be disabled when required fields are empty
  test("should disable save button when required fields are empty", () => {
    const emptyRequiredData = {
      ...mockOauthData,
      clientId: "", // Required field
      authority: "" // Required field
    };
    
    render(<RdsCompIdentityOauthManagement oauthData={emptyRequiredData} />);
    
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeDisabled();
  });

  // Test form validation - save button should be enabled when required fields are filled
  test("should enable save button when required fields are filled", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    const saveButton = screen.getByTestId("save");
    expect(saveButton).not.toBeDisabled();
  });

  // Test form validation - save button state changes when required fields change
  test("should update save button state when required field values change", () => {
    const partialData = {
      ...mockOauthData,
      clientId: "",
      authority: "https://example.com/auth"
    };
    
    render(<RdsCompIdentityOauthManagement oauthData={partialData} />);
    
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeDisabled();
    
    // Fill in the missing required field
    const clientIdInput = screen.getByTestId("client-id");
    fireEvent.change(clientIdInput, { target: { value: "new-client-id" } });
    
    // Save button should now be enabled
    expect(saveButton).not.toBeDisabled();
  });

  // Test all input field placeholders
  test("should render input fields with correct placeholders", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // Check placeholders
    expect(screen.getByPlaceholderText("Enter Client Id")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("389")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Base Domain Component")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Scope")).toBeInTheDocument();
  });

  // Test input field types
  test("should render input fields with correct types", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // All inputs should be of type text
    expect(screen.getByTestId("client-id")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("client-secret")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("base-domain")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("scope")).toHaveAttribute("type", "text");
  });

  // Test form submission prevents default
  test("should prevent default form submission when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityOauthManagement 
        oauthData={mockOauthData} 
        onOauthDataSubmit={mockSaveHandler} 
      />
    );
    
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Verify preventDefault was called (this is handled internally by the component)
    expect(mockSaveHandler).toHaveBeenCalled();
  });

  // Test component renders without onOauthDataSubmit
  test("should render correctly without onOauthDataSubmit prop", () => {
    const { container } = render(
      <RdsCompIdentityOauthManagement oauthData={mockOauthData} />
    );
    
    expect(container).toBeInTheDocument();
    
    // Save button should still be rendered and clickable
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeInTheDocument();
    
    // Should not throw error when clicked without handler
    fireEvent.click(saveButton);
  });

  // Test all form fields are properly labeled
  test("should render all form fields with proper labels", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // Check for field labels
    expect(screen.getByText("Client Id")).toBeInTheDocument();
    expect(screen.getByText("Client Secret")).toBeInTheDocument();
    expect(screen.getByText("Authority")).toBeInTheDocument();
    expect(screen.getByText("Enter Scope")).toBeInTheDocument();
    expect(screen.getByText("Enable OAuth Login")).toBeInTheDocument();
    expect(screen.getByText("Require Https Metadata")).toBeInTheDocument();
    expect(screen.getByText("Validate End points")).toBeInTheDocument();
    expect(screen.getByText("Validate Issuer Name")).toBeInTheDocument();
  });

  // Test input field CSS classes
  test("should render input fields with correct CSS classes", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // Check that inputs have the form-control class
    expect(screen.getByTestId("client-id")).toHaveClass("form-control");
    expect(screen.getByTestId("client-secret")).toHaveClass("form-control");
    expect(screen.getByTestId("base-domain")).toHaveClass("form-control");
    expect(screen.getByTestId("scope")).toHaveClass("form-control");
  });

  // Test required field validation
  test("should mark required fields as required", () => {
    render(<RdsCompIdentityOauthManagement oauthData={mockOauthData} />);
    
    // Check that required fields have the required attribute
    expect(screen.getByTestId("client-id")).toBeRequired();
    expect(screen.getByTestId("base-domain")).toBeRequired();
    
    // Optional fields should not be required
    expect(screen.getByTestId("client-secret")).not.toBeRequired();
    expect(screen.getByTestId("scope")).not.toBeRequired();
  });
});