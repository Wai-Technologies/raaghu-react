import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIdentityClientBasic from "../src/rds-comp-identity-client-basic/rds-comp-identity-client-basic";

// Mock the rds-elements used in the identity client basic component
jest.mock("../src/rds-elements", () => ({
  RdsInput: jest.fn(({ 
    placeholder, 
    inputType, 
    name, 
    label, 
    required, 
    dataTestId, 
    onChange, 
    value, 
    validatonPattern, 
    validationMsg 
  }) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        required={required}
        data-testid={dataTestId}
        onChange={onChange}
        value={value || ""}
      />
      {validatonPattern && value && !validatonPattern.test(value) && (
        <div data-testid={`validation-error-${dataTestId}`}>{validationMsg}</div>
      )}
    </div>
  )),
  RdsTextArea: jest.fn(({ 
    label, 
    placeholder, 
    rows, 
    dataTestId, 
    onChange, 
    value 
  }) => (
    <div data-testid={`textarea-container-${dataTestId}`}>
      {label && <label>{label}</label>}
      <textarea
        rows={rows}
        placeholder={placeholder}
        data-testid={dataTestId}
        onChange={onChange}
        value={value || ""}
      />
    </div>
  )),
  RdsCheckbox: jest.fn(({ 
    labelText, 
    dataTestId, 
    onChange, 
    checked 
  }) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
      />
      <label>{labelText}</label>
    </div>
  )),  RdsButton: jest.fn(({ 
    class: buttonClass, 
    tooltipTitle, 
    type, 
    label, 
    colorVariant, 
    size, 
    databsdismiss, 
    dataTestId, 
    onClick, 
    isDisabled 
  }) => (
    <button
      className={buttonClass}
      data-testid={dataTestId || (label === 'Save' ? 'save-button' : undefined)}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-dismiss={databsdismiss}
      data-size={size}
      data-variant={colorVariant}
    >
      {label}
    </button>
  )),
}));

// Sample client data for testing
const mockClientData = {
  clientId: "test-client-id",
  clientName: "Test Client",
  description: "This is a test client",
  clientUrl: "https://example.com",
  logoUrl: "https://example.com/logo.png",
  callbackUrl: "https://example.com/callback",
  logoutUrl: "https://example.com/logout",
  requiredConsent: true
};

describe("RdsCompIdentityClientBasic Component", () => {
  // Test basic rendering
  test("should render the identity client basic component with client data", () => {
    const { container } = render(
      <RdsCompIdentityClientBasic clientData={mockClientData} />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if inputs have the correct values
    expect(screen.getByTestId("client-id")).toHaveValue("test-client-id");
    expect(screen.getByTestId("client-name")).toHaveValue("Test Client");
    expect(screen.getByTestId("description")).toHaveValue("This is a test client");
    expect(screen.getByTestId("client-url")).toHaveValue("https://example.com");
    expect(screen.getByTestId("logo-url")).toHaveValue("https://example.com/logo.png");
    expect(screen.getByTestId("callback-url")).toHaveValue("https://example.com/callback");
    expect(screen.getByTestId("logout-url")).toHaveValue("https://example.com/logout");
    
    // Check if checkbox is checked
    expect(screen.getByTestId("consent")).toBeChecked();
  });

  // Test rendering with empty client data
  test("should render correctly with empty client data", () => {
    const emptyClientData = {
      clientId: "",
      clientName: "",
      description: "",
      clientUrl: "",
      logoUrl: "",
      callbackUrl: "",
      logoutUrl: "",
      requiredConsent: false
    };

    render(<RdsCompIdentityClientBasic clientData={emptyClientData} />);

    // Inputs should be empty
    expect(screen.getByTestId("client-id")).toHaveValue("");
    expect(screen.getByTestId("client-name")).toHaveValue("");
    expect(screen.getByTestId("description")).toHaveValue("");
    expect(screen.getByTestId("client-url")).toHaveValue("");
    expect(screen.getByTestId("logo-url")).toHaveValue("");
    expect(screen.getByTestId("callback-url")).toHaveValue("");
    expect(screen.getByTestId("logout-url")).toHaveValue("");
    
    // Checkbox should not be checked
    expect(screen.getByTestId("consent")).not.toBeChecked();
  });

  // Test input field value changes
  test("should update client data when input values change", () => {
    render(<RdsCompIdentityClientBasic clientData={mockClientData} />);

    // Change Client ID input
    const clientIdInput = screen.getByTestId("client-id");
    fireEvent.change(clientIdInput, { target: { value: "new-client-id" } });
    expect(clientIdInput).toHaveValue("new-client-id");

    // Change Client Name input
    const clientNameInput = screen.getByTestId("client-name");
    fireEvent.change(clientNameInput, { target: { value: "New Client Name" } });
    expect(clientNameInput).toHaveValue("New Client Name");

    // Change Description textarea
    const descriptionInput = screen.getByTestId("description");
    fireEvent.change(descriptionInput, { target: { value: "Updated description" } });
    expect(descriptionInput).toHaveValue("Updated description");

    // Change Client URL input
    const clientUrlInput = screen.getByTestId("client-url");
    fireEvent.change(clientUrlInput, { target: { value: "https://new-example.com" } });
    expect(clientUrlInput).toHaveValue("https://new-example.com");
  });

  // Test URL validation
  test("should validate URL fields correctly", () => {
    render(<RdsCompIdentityClientBasic clientData={mockClientData} />);

    // Change Client URL to an invalid URL
    const clientUrlInput = screen.getByTestId("client-url");
    fireEvent.change(clientUrlInput, { target: { value: "invalid-url" } });
      // The Save button should be disabled due to validation failure
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).toBeDisabled();

    // Change back to a valid URL
    fireEvent.change(clientUrlInput, { target: { value: "https://valid-url.com" } });
    
    // The Save button should be enabled now
    expect(saveButton).not.toBeDisabled();
  });

  // Test checkbox state change
  test("should update requiredConsent when checkbox is toggled", () => {
    render(<RdsCompIdentityClientBasic clientData={mockClientData} />);

    const consentCheckbox = screen.getByTestId("consent");
    
    // Initially checked
    expect(consentCheckbox).toBeChecked();
    
    // Toggle the checkbox
    fireEvent.click(consentCheckbox);
    
    // Should now be unchecked
    expect(consentCheckbox).not.toBeChecked();
  });

  // Test save button functionality
  test("should call onSaveHandler with updated client data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityClientBasic 
        clientData={mockClientData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Update form values
    const clientIdInput = screen.getByTestId("client-id");
    fireEvent.change(clientIdInput, { target: { value: "updated-client-id" } });
    
    const clientNameInput = screen.getByTestId("client-name");
    fireEvent.change(clientNameInput, { target: { value: "Updated Client Name" } });
      // Click save button
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    
    // Verify that onSaveHandler was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      clientId: "updated-client-id",
      clientName: "Updated Client Name",
      description: "This is a test client",
      clientUrl: "https://example.com",
      logoUrl: "https://example.com/logo.png",
      callbackUrl: "https://example.com/callback",
      logoutUrl: "https://example.com/logout",
      requiredConsent: true
    });
  });

  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentityClientBasic 
        clientData={mockClientData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Initial values
    const clientIdInput = screen.getByTestId("client-id");
    expect(clientIdInput).toHaveValue("test-client-id");
      // Click save button
    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(clientIdInput).toHaveValue("");
  });

  // Test component updates when props change
  test("should update when clientData prop changes", () => {
    const { rerender } = render(<RdsCompIdentityClientBasic clientData={mockClientData} />);
    
    // Initial values
    const clientIdInput = screen.getByTestId("client-id");
    expect(clientIdInput).toHaveValue("test-client-id");
    
    // Update the props
    const updatedClientData = {
      ...mockClientData,
      clientId: "different-client-id",
      clientName: "Different Client"
    };
    
    rerender(<RdsCompIdentityClientBasic clientData={updatedClientData} />);
    
    // Component should reflect the new props
    expect(clientIdInput).toHaveValue("different-client-id");
    expect(screen.getByTestId("client-name")).toHaveValue("Different Client");
  });
  // Test save button disabled state for invalid URL fields
  test("should disable save button when URL fields are invalid", () => {
    const { rerender } = render(<RdsCompIdentityClientBasic clientData={mockClientData} />);
    
    // Initially, with valid URLs, save button should be enabled
    const saveButton = screen.getByRole('button', { name: 'Save' });
    expect(saveButton).not.toBeDisabled();
    
    // Update with invalid URL data
    const invalidClientData = {
      ...mockClientData,
      clientUrl: "invalid-url" // Not a valid URL format
    };
    
    rerender(<RdsCompIdentityClientBasic clientData={invalidClientData} />);
    
    // Save button should now be disabled
    expect(saveButton).toBeDisabled();
  });

  // Test cancel button functionality
  test("should render cancel button correctly", () => {
    render(<RdsCompIdentityClientBasic clientData={mockClientData} />);
    
    const cancelButton = screen.getByTestId("cancel");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
  });
});