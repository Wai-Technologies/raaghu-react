import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompIdentiyResourceBasic from "../src/rds-comp-identiy-resource-basic/rds-comp-identiy-resource-basic";

// Mock the rds-elements used in the identity resource basic component
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
    reset 
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
    </div>
  )),
  RdsTextArea: jest.fn(({ 
    label, 
    placeholder, 
    dataTestId, 
    onChange, 
    value 
  }) => (
    <div data-testid={`textarea-container-${dataTestId}`}>
      {label && <label>{label}</label>}
      <textarea
        placeholder={placeholder}
        data-testid={dataTestId}
        onChange={onChange}
        value={value || ""}
      />
    </div>
  )),
  RdsCheckbox: jest.fn(({ 
    id, 
    labelText, 
    dataTestId, 
    onChange, 
    checked 
  }) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        id={id}
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
      />
      <label>{labelText}</label>
    </div>
  )),
  RdsButton: jest.fn(({ 
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
      data-testid={dataTestId}
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

// Sample identity resource data for testing
const mockIdentityResourceData = {
  name: "test-resource",
  displayName: "Test Resource",
  description: "This is a test identity resource",
  enabled: true,
  required: true,
  emphasize: false,
  showInDiscovery: true
};

describe("RdsCompIdentiyResourceBasic Component", () => {
  // Test basic rendering
  test("should render the identity resource basic component with data", () => {
    const { container } = render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if inputs have the correct values
    expect(screen.getByTestId("name")).toHaveValue("test-resource");
    expect(screen.getByTestId("display-name")).toHaveValue("Test Resource");
    expect(screen.getByTestId("description")).toHaveValue("This is a test identity resource");
    
    // Check if checkboxes are correctly checked
    expect(screen.getByTestId("enabled")).toBeChecked();
    expect(screen.getByTestId("required")).toBeChecked();
    expect(screen.getByTestId("emphasize")).not.toBeChecked();
    expect(screen.getByTestId("discovery-document")).toBeChecked();
  });

  // Test rendering with empty data
  test("should render correctly with empty data", () => {
    const emptyResourceData = {
      name: "",
      displayName: "",
      description: "",
      enabled: false,
      required: false,
      emphasize: false,
      showInDiscovery: false
    };

    render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={emptyResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );

    // Inputs should be empty
    expect(screen.getByTestId("name")).toHaveValue("");
    expect(screen.getByTestId("display-name")).toHaveValue("");
    expect(screen.getByTestId("description")).toHaveValue("");
    
    // Checkboxes should not be checked
    expect(screen.getByTestId("enabled")).not.toBeChecked();
    expect(screen.getByTestId("required")).not.toBeChecked();
    expect(screen.getByTestId("emphasize")).not.toBeChecked();
    expect(screen.getByTestId("discovery-document")).not.toBeChecked();
  });

  // Test input field value changes
  test("should update identity resource data when input values change", () => {
    render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );

    // Change Name input
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "new-resource-name" } });
    expect(nameInput).toHaveValue("new-resource-name");

    // Change Display Name input
    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: "New Display Name" } });
    expect(displayNameInput).toHaveValue("New Display Name");

    // Change Description textarea
    const descriptionInput = screen.getByTestId("description");
    fireEvent.change(descriptionInput, { target: { value: "Updated description" } });
    expect(descriptionInput).toHaveValue("Updated description");
  });

  // Test checkbox state changes
  test("should update checkbox states when toggled", () => {
    render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );

    // Test enabled checkbox
    const enabledCheckbox = screen.getByTestId("enabled");
    expect(enabledCheckbox).toBeChecked();
    fireEvent.click(enabledCheckbox);
    expect(enabledCheckbox).not.toBeChecked();

    // Test required checkbox
    const requiredCheckbox = screen.getByTestId("required");
    expect(requiredCheckbox).toBeChecked();
    fireEvent.click(requiredCheckbox);
    expect(requiredCheckbox).not.toBeChecked();

    // Test emphasize checkbox
    const emphasizeCheckbox = screen.getByTestId("emphasize");
    expect(emphasizeCheckbox).not.toBeChecked();
    fireEvent.click(emphasizeCheckbox);
    expect(emphasizeCheckbox).toBeChecked();

    // Test showInDiscovery checkbox
    const discoveryCheckbox = screen.getByTestId("discovery-document");
    expect(discoveryCheckbox).toBeChecked();
    fireEvent.click(discoveryCheckbox);
    expect(discoveryCheckbox).not.toBeChecked();
  });

  // Test save button functionality
  test("should call onSaveHandler with updated data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData}
        onSaveHandler={mockSaveHandler} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    // Update form values
    const nameInput = screen.getByTestId("name");
    fireEvent.change(nameInput, { target: { value: "updated-resource-name" } });
    
    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: "Updated Display Name" } });
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Verify that onSaveHandler was called
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
  });

  // Test component updates when props change
  test("should update when identityResourceBasicData prop changes", () => {
    const { rerender } = render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    // Initial values
    const nameInput = screen.getByTestId("name");
    expect(nameInput).toHaveValue("test-resource");
    
    // Update the props
    const updatedResourceData = {
      ...mockIdentityResourceData,
      name: "different-resource",
      displayName: "Different Resource"
    };
    
    rerender(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={updatedResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    // Component should reflect the new props
    expect(nameInput).toHaveValue("different-resource");
    expect(screen.getByTestId("display-name")).toHaveValue("Different Resource");
  });

  // Test save button and cancel button rendering
  test("should render save and cancel buttons correctly", () => {
    render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="resourceBasic"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    const saveButton = screen.getByTestId("save");
    const cancelButton = screen.getByTestId("cancel");
    
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent("Save");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
  });

  // Test component doesn't render without correct identity prop
  test("should not render when identity prop is missing", () => {
    const { container } = render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    // Component should not render any form elements
    expect(screen.queryByTestId("name")).not.toBeInTheDocument();
    expect(screen.queryByTestId("save")).not.toBeInTheDocument();
  });

  // Test component doesn't render with wrong identity prop
  test("should not render when identity prop is incorrect", () => {
    const { container } = render(
      <RdsCompIdentiyResourceBasic 
        identityResourceBasicData={mockIdentityResourceData} 
        identity="wrongType"
        ldapData={undefined} 
        onIdentitySettingsSubmit={undefined} 
        lockoutSettings={undefined} 
        passwordSettings={undefined} 
        signSettings={undefined} 
        userSettings={undefined} 
        oauthData={undefined} 
      />
    );
    
    // Component should not render any form elements
    expect(screen.queryByTestId("name")).not.toBeInTheDocument();
    expect(screen.queryByTestId("save")).not.toBeInTheDocument();
  });
});