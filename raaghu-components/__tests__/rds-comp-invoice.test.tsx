// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-invoice.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompInvoice from "../src/rds-comp-invoice/rds-comp-invoice";

// Mock the rds-elements used in the invoice component
jest.mock("../src/rds-elements", () => ({
  RdsInput: jest.fn(({ 
    placeholder, 
    inputType, 
    name, 
    label, 
    required, 
    id, 
    onChange, 
    value, 
    reset 
  }) => (
    <div data-testid={`input-container-${id}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        required={required}
        id={id}
        data-testid={id}
        onChange={onChange}
        value={value || ""}
      />
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
  RdsButton: jest.fn(({ 
    class: buttonClass, 
    tooltipTitle, 
    type, 
    label, 
    colorVariant, 
    size, 
    databsdismiss, 
    dataTestId, 
    onClick 
  }) => (
    <button
      className={buttonClass}
      data-testid={dataTestId}
      type={type}
      onClick={onClick}
      data-dismiss={databsdismiss}
      data-size={size}
      data-variant={colorVariant}
    >
      {label}
    </button>
  )),
}));

describe("RdsCompInvoice Component", () => {
  // Sample invoice data for testing
  const mockInvoiceData = {
    leagalName: "Test Company Ltd",
    address: "123 Test Street, Test City, Test Country",
  };

  // Test basic rendering
  test("should render the invoice component with data", () => {
    const { container } = render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if heading is rendered
    expect(screen.getByText("Invoice Information")).toBeInTheDocument();

    // Check if inputs have the correct values
    expect(screen.getByTestId("leagalName")).toHaveValue("Test Company Ltd");
    expect(screen.getByTestId("address")).toHaveValue("123 Test Street, Test City, Test Country");
  });

  // Test rendering with empty data
  test("should render correctly with empty data", () => {
    render(
      <RdsCompInvoice 
        leagalName="" 
        address="" 
      />
    );

    // Inputs should be empty
    expect(screen.getByTestId("leagalName")).toHaveValue("");
    expect(screen.getByTestId("address")).toHaveValue("");
  });

  // Test input field value changes
  test("should update invoice data when input values change", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );

    // Change Legal Name input
    const legalNameInput = screen.getByTestId("leagalName");
    fireEvent.change(legalNameInput, { target: { value: "New Company Name" } });
    expect(legalNameInput).toHaveValue("New Company Name");

    // Change Address textarea
    const addressInput = screen.getByTestId("address");
    fireEvent.change(addressInput, { target: { value: "New Address" } });
    expect(addressInput).toHaveValue("New Address");
  });

  // Test form reset after save
  test("should reset form data after save button is clicked", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );
    
    // Initial values
    const legalNameInput = screen.getByTestId("leagalName");
    const addressInput = screen.getByTestId("address");
    expect(legalNameInput).toHaveValue("Test Company Ltd");
    expect(addressInput).toHaveValue("123 Test Street, Test City, Test Country");
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    expect(legalNameInput).toHaveValue("");
    expect(addressInput).toHaveValue("");
  });

  // Test component updates when props change
  test("should update when props change", () => {
    const { rerender } = render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );
    
    // Initial values
    const legalNameInput = screen.getByTestId("leagalName");
    const addressInput = screen.getByTestId("address");
    expect(legalNameInput).toHaveValue("Test Company Ltd");
    expect(addressInput).toHaveValue("123 Test Street, Test City, Test Country");
    
    // Update the props
    const updatedData = {
      leagalName: "Updated Company",
      address: "Updated Address",
    };
    
    rerender(
      <RdsCompInvoice 
        leagalName={updatedData.leagalName} 
        address={updatedData.address} 
      />
    );
    
    // Component should reflect the new props
    expect(legalNameInput).toHaveValue("Updated Company");
    expect(addressInput).toHaveValue("Updated Address");
  });

  // Test cancel button rendering
  test("should render cancel button correctly", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );
    
    const cancelButton = screen.getByTestId("cancel");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
  });

  // Test save button rendering
  test("should render save button correctly", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );
    
    const saveButton = screen.getByTestId("save");
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveTextContent("Save");
  });

  // Test button layout classes
  test("should have proper button layout classes", () => {
    const { container } = render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address} 
      />
    );
    
    // Check if the buttons container has proper responsive classes
    const buttonsContainer = container.querySelector(".d-flex.flex-column-reverse.flex-lg-row");
    expect(buttonsContainer).toBeInTheDocument();
  });
});