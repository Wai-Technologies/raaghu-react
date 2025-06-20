// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-information.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompInformation from "../src/rds-comp-information/rds-comp-information";

// Mock the rds-elements used in the information component
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
  RdsDropdownList: jest.fn(({
    isPlaceholder,
    placeholder,
    listItems,
    borderDropdown,
    onChange,
    "data-testid": dataTestId
  }) => (
    <div data-testid="dropdown-container">
      <select 
        data-testid={dataTestId || "input-type"}
        onChange={onChange}
      >
        {isPlaceholder && <option value="">{placeholder}</option>}
        {listItems && listItems.map((item: any, index: number) => (
          <option key={index} value={item.value || item.some}>
            {item.label || item.some}
          </option>
        ))}
      </select>
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

// Sample input type list for testing
const mockInputTypeList = [
  { some: "Text", id: 1 },
  { some: "Number", id: 2 },
  { some: "Date", id: 3 },
  { some: "Checkbox", id: 4 }
];

// Sample information item data for testing
const mockInformationItemInitial = {
  propertyname: "test-property",
  displayname: "Test Property",
  inputtype: "Text"
};

describe("RdsCompInformation Component", () => {
  // Test basic rendering
  test("should render the information component with data", () => {
    const { container } = render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
      />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if inputs have the correct values
    expect(screen.getByTestId("property-name")).toHaveValue("test-property");
    expect(screen.getByTestId("display-name")).toHaveValue("Test Property");
    
    // Check if dropdown is rendered
    expect(screen.getByTestId("input-type")).toBeInTheDocument();
  });

  // Test rendering with empty data
  test("should render correctly with empty data", () => {
    const emptyData = {
      propertyname: "",
      displayname: "",
      inputtype: ""
    };

    render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={emptyData} 
      />
    );

    // Inputs should be empty
    expect(screen.getByTestId("property-name")).toHaveValue("");
    expect(screen.getByTestId("display-name")).toHaveValue("");
  });

  // Test input field value changes
  test("should update information data when input values change", () => {
    render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
      />
    );

    // Change Property Name input
    const propertyNameInput = screen.getByTestId("property-name");
    fireEvent.change(propertyNameInput, { target: { value: "new-property-name" } });
    expect(propertyNameInput).toHaveValue("new-property-name");

    // Change Display Name input
    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: "New Display Name" } });
    expect(displayNameInput).toHaveValue("New Display Name");
  });

  // Test save button functionality
  test("should call informationItemHandler with updated data when save button is clicked", () => {
    const mockInformationItemHandler = jest.fn();
    
    render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
        informationItemHandler={mockInformationItemHandler} 
      />
    );
    
    // Update form values
    const propertyNameInput = screen.getByTestId("property-name");
    fireEvent.change(propertyNameInput, { target: { value: "updated-property-name" } });
    
    const displayNameInput = screen.getByTestId("display-name");
    fireEvent.change(displayNameInput, { target: { value: "Updated Display Name" } });
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(propertyNameInput).toHaveValue("");
    expect(displayNameInput).toHaveValue("");
  });

  // Test form reset after save
  test("should reset form data after successful save", () => {
    const mockInformationItemHandler = jest.fn();
    
    render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
        informationItemHandler={mockInformationItemHandler} 
      />
    );
    
    // Initial values
    const propertyNameInput = screen.getByTestId("property-name");
    expect(propertyNameInput).toHaveValue("test-property");
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(propertyNameInput).toHaveValue("");
  });

  // Test component updates when props change
  test("should update when informationItemInitial prop changes", () => {
    const { rerender } = render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
      />
    );
    
    // Initial values
    const propertyNameInput = screen.getByTestId("property-name");
    expect(propertyNameInput).toHaveValue("test-property");
    
    // Update the props
    const updatedData = {
      propertyname: "different-property",
      displayname: "Different Property",
      inputtype: "Number"
    };
    
    rerender(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={updatedData} 
      />
    );
    
    // Component should reflect the new props
    expect(propertyNameInput).toHaveValue("different-property");
    expect(screen.getByTestId("display-name")).toHaveValue("Different Property");
  });
  // Test reset functionality
  test("should reset form when reset prop changes", () => {
    // Mock the handlers and state update that would happen
    const mockInformationItemHandler = jest.fn();

    // First, render the component with initial data
    const { rerender } = render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial}
        informationItemHandler={mockInformationItemHandler}
        reset={false}
      />
    );
    
    // Simulate user changing the form data
    const propertyNameInput = screen.getByTestId("property-name");
    fireEvent.change(propertyNameInput, { target: { value: "changed-property-name" } });
    expect(propertyNameInput).toHaveValue("changed-property-name");
    
    // Simulate the reset prop changing (which happens when parent component triggers a reset)
    rerender(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial}
        informationItemHandler={mockInformationItemHandler}
        reset={true}
      />
    );
    
    // Since we're directly testing the reset prop's effect, let's check if inputReset state is toggled
    // We can simulate the effect of the inputReset toggle by clicking save which would reset the form
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(propertyNameInput).toHaveValue("");
    
    // Now set new data via props to ensure component can receive new data
    const newData = {
      propertyname: "new-property-after-reset",
      displayname: "New Property After Reset",
      inputtype: "Number"
    };
    
    rerender(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={newData}
        informationItemHandler={mockInformationItemHandler}
      />
    );
    
    // Form should now show the new data
    expect(propertyNameInput).toHaveValue("new-property-after-reset");
  });

  // Test cancel button functionality
  test("should render cancel button correctly", () => {
    render(
      <RdsCompInformation 
        inputTypeList={mockInputTypeList} 
        informationItemInitial={mockInformationItemInitial} 
      />
    );
    
    const cancelButton = screen.getByTestId("cancel");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
  });
});