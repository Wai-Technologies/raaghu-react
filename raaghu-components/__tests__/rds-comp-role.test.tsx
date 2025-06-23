import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompRole from "../src/rds-comp-role/rds-comp-role";

// Mock the rds-elements used in the role component
jest.mock("../src/rds-elements", () => ({
  RdsLabel: jest.fn(({ label, size }) => (
    <div data-testid="mocked-label" data-size={size}>
      {label}
    </div>
  )),
  RdsInput: jest.fn(({ 
    name, 
    label, 
    size, 
    inputType, 
    isDisabled, 
    readonly, 
    value, 
    onChange, 
    placeholder, 
    required 
  }) => (
    <div data-testid="mocked-input">
      {label && <label>{name}</label>}
      <input
        type={inputType}
        disabled={isDisabled}
        readOnly={readonly}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid="role-name-input"
      />
    </div>
  )),
  RdsCheckbox: jest.fn(({ labelText, checked, onChange }) => (
    <div data-testid="mocked-checkbox">
      <input
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
        data-testid="default-checkbox"
      />
      <label>{labelText}</label>
    </div>
  )),
  RdsButton: jest.fn(({ 
    size, 
    isOutline, 
    colorVariant, 
    label, 
    type, 
    onClick, 
    isDisabled 
  }) => (
    <button
      data-testid={`mocked-button-${label.toLowerCase()}`}
      data-size={size}
      data-outline={isOutline}
      data-variant={colorVariant}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {label}
    </button>
  )),
}));

// Sample role data for testing
const mockRoleData = {
  displayName: "Admin",
  isDefault: true
};

describe("RdsCompRole Component", () => {
  // Test basic rendering
  test("should render the role component with role data", () => {
    const { container } = render(
      <RdsCompRole roleData={mockRoleData} />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Input field should have the correct value
    const inputElement = screen.getByTestId("role-name-input");
    expect(inputElement).toHaveValue("Admin");

    // Default checkbox should be checked
    const checkboxElement = screen.getByTestId("default-checkbox");
    expect(checkboxElement).toBeChecked();
  });

  // Test rendering with empty role data
  test("should render correctly with empty role data", () => {
    const emptyRoleData = {
      displayName: "",
      isDefault: false
    };

    render(<RdsCompRole roleData={emptyRoleData} />);

    // Input field should be empty
    const inputElement = screen.getByTestId("role-name-input");
    expect(inputElement).toHaveValue("");

    // Default checkbox should not be checked
    const checkboxElement = screen.getByTestId("default-checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  // Test input field value change
  test("should update displayName when input value changes", () => {
    render(<RdsCompRole roleData={mockRoleData} />);

    const inputElement = screen.getByTestId("role-name-input");
    
    // Change the input value
    fireEvent.change(inputElement, { target: { value: "New Role Name" } });
    
    // Check if the input field value was updated
    expect(inputElement).toHaveValue("New Role Name");
  });

  // Test checkbox state change
  test("should update isDefault when checkbox is toggled", () => {
    render(<RdsCompRole roleData={mockRoleData} />);

    const checkboxElement = screen.getByTestId("default-checkbox");
    
    // Initially checked
    expect(checkboxElement).toBeChecked();
    
    // Toggle the checkbox
    fireEvent.click(checkboxElement);
    
    // Should now be unchecked
    expect(checkboxElement).not.toBeChecked();
  });

  // Test save button functionality
  test("should call onSaveHandler with updated role data when save button is clicked", () => {
    const mockSaveHandler = jest.fn();
    
    render(<RdsCompRole roleData={mockRoleData} onSaveHandler={mockSaveHandler} />);
    
    // Get elements
    const inputElement = screen.getByTestId("role-name-input");
    const checkboxElement = screen.getByTestId("default-checkbox");
    const saveButton = screen.getByTestId("mocked-button-save");
    
    // Update form values
    fireEvent.change(inputElement, { target: { value: "Updated Role" } });
    fireEvent.click(checkboxElement); // Toggle from true to false
    
    // Click save button
    fireEvent.click(saveButton);
    
    // Verify that onSaveHandler was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      displayName: "Updated Role",
      isDefault: false
    });
  });

  // Test save button disabled state
  test("should disable the save button when role name is empty", () => {
    const emptyRoleData = {
      displayName: "",
      isDefault: false
    };
    
    render(<RdsCompRole roleData={emptyRoleData} />);
    
    // Save button should be disabled initially
    const saveButton = screen.getByTestId("mocked-button-save");
    expect(saveButton).toBeDisabled();
    
    // Enter a role name
    const inputElement = screen.getByTestId("role-name-input");
    fireEvent.change(inputElement, { target: { value: "New Role" } });
    
    // Save button should now be enabled
    expect(saveButton).not.toBeDisabled();
  });

  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockSaveHandler = jest.fn();
    
    render(<RdsCompRole roleData={mockRoleData} onSaveHandler={mockSaveHandler} />);
    
    // Initial values
    const inputElement = screen.getByTestId("role-name-input");
    expect(inputElement).toHaveValue("Admin");
    
    // Click save button
    const saveButton = screen.getByTestId("mocked-button-save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(inputElement).toHaveValue("");
  });

  // Test component updates when props change
  test("should update when roleData prop changes", () => {
    const { rerender } = render(<RdsCompRole roleData={mockRoleData} />);
    
    // Initial values
    const inputElement = screen.getByTestId("role-name-input");
    expect(inputElement).toHaveValue("Admin");
    
    // Update the props
    const updatedRoleData = {
      displayName: "Moderator",
      isDefault: false
    };
    
    rerender(<RdsCompRole roleData={updatedRoleData} />);
    
    // Component should reflect the new props
    expect(inputElement).toHaveValue("Moderator");
    
    const checkboxElement = screen.getByTestId("default-checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  // Test cancel button rendering
  test("should render cancel button correctly", () => {
    render(<RdsCompRole roleData={mockRoleData} />);
    
    const cancelButton = screen.getByTestId("mocked-button-cancel");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
  });

  // Test for required information text
  test("should show 'Assign to new users by default' text", () => {
    render(<RdsCompRole roleData={mockRoleData} />);
    
    expect(screen.getByText("Assign to new users by default")).toBeInTheDocument();
  });

  // Test form validation
  test("should validate form correctly", () => {
    const { rerender } = render(<RdsCompRole roleData={mockRoleData} />);
    
    // Form should be valid initially (with valid data)
    const saveButton = screen.getByTestId("mocked-button-save");
    expect(saveButton).not.toBeDisabled();
    
    // Rerender with invalid data
    const invalidRoleData = {
      displayName: "",
      isDefault: true
    };
    
    rerender(<RdsCompRole roleData={invalidRoleData} />);
    
    // Save button should now be disabled
    expect(saveButton).toBeDisabled();
  });
});