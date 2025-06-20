// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-invoice.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompInvoice from "../src/rds-comp-invoice/rds-comp-invoice";

// Mock html2canvas and jsPDF
jest.mock("html2canvas", () => jest.fn());
jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    internal: {
      pageSize: {
        getWidth: () => 210,
        getHeight: () => 297,
      },
    },
    addImage: jest.fn(),
    save: jest.fn(),
  })),
}));

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
    value,
    showTitle 
  }) => (
    <div data-testid={`textarea-container-${dataTestId}`}>
      {showTitle && label && <label>{label}</label>}
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
    onClick,
    icon,
    showLoadingSpinner
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
      {icon && <span data-testid={`icon-${icon}`}></span>}
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

  const mockInvoiceDetails = {
    billedTo: "John Doe",
    purchaseDate: "2024-01-15T00:00:00.000Z",
    transactionId: "TXN123456789",
    invoiceNumber: "INV-2024-001",
    grandTotal: "500.00",
    subTotal: "450.00",
    discount: "50.00",
    invoiceItems: [
      {
        itemName: "Premium Plan",
        itemAmount: "450.00",
        quantity: 1,
        totalAmount: "450.00"
      }
    ]
  };

  // Test default form rendering
  test("should render the invoice form when invoice prop is 'default'", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="default"
      />
    );

    // Check if heading is rendered
    expect(screen.getByText("Invoice Information")).toBeInTheDocument();

    // Check if inputs are rendered
    expect(screen.getByTestId("leagalName")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
  });

  // Test invoice detail receipt rendering
  test("should render the invoice receipt when invoice prop is 'detailReceipt'", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="detailReceipt"
        invoiceDetails={mockInvoiceDetails}
      />
    );

    // Check if invoice details are rendered
    expect(screen.getByText("Billed To")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Premium Plan")).toBeInTheDocument();
  });

  // Test rendering with empty data in default mode
  test("should render correctly with empty data in default mode", () => {
    render(
      <RdsCompInvoice 
        leagalName="" 
        address=""
        invoice="default"
      />
    );

    // Inputs should be rendered but empty
    expect(screen.getByTestId("leagalName")).toHaveValue("");
    expect(screen.getByTestId("address")).toHaveValue("");
  });

  // Test input field value changes in default mode
  test("should handle input changes in default mode", async () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="default"
      />
    );

    // Wait for component to initialize
    await waitFor(() => {
      expect(screen.getByTestId("leagalName")).toHaveValue("Test Company Ltd");
    });

    // Change Legal Name input
    const legalNameInput = screen.getByTestId("leagalName");
    fireEvent.change(legalNameInput, { target: { value: "New Company Name" } });
    expect(legalNameInput).toHaveValue("New Company Name");

    // Change Address textarea
    const addressInput = screen.getByTestId("address");
    fireEvent.change(addressInput, { target: { value: "New Address" } });
    expect(addressInput).toHaveValue("New Address");
  });

  // Test form reset after save button is clicked
  test("should reset form data after save button is clicked", async () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="default"
      />
    );
    
    // Wait for initial values to be set
    await waitFor(() => {
      expect(screen.getByTestId("leagalName")).toHaveValue("Test Company Ltd");
    });
    
    // Click save button
    const saveButton = screen.getByTestId("save");
    fireEvent.click(saveButton);
    
    // Form should be reset after save
    await waitFor(() => {
      expect(screen.getByTestId("leagalName")).toHaveValue("");
      expect(screen.getByTestId("address")).toHaveValue("");
    });
  });

  // Test component updates when props change
  test("should update when props change in default mode", async () => {
    const { rerender } = render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="default"
      />
    );
    
    // Wait for initial values
    await waitFor(() => {
      expect(screen.getByTestId("leagalName")).toHaveValue("Test Company Ltd");
    });
    
    // Update the props
    const updatedData = {
      leagalName: "Updated Company",
      address: "Updated Address",
    };
    
    rerender(
      <RdsCompInvoice 
        leagalName={updatedData.leagalName} 
        address={updatedData.address}
        invoice="default"
      />
    );
    
    // Component should reflect the new props
    await waitFor(() => {
      expect(screen.getByTestId("leagalName")).toHaveValue("Updated Company");
      expect(screen.getByTestId("address")).toHaveValue("Updated Address");
    });
  });

  // Test buttons rendering in default mode
  test("should render buttons correctly in default mode", () => {
    render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
        invoice="default"
      />
    );
    
    const cancelButton = screen.getByTestId("cancel");
    const saveButton = screen.getByTestId("save");
    
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");
    expect(saveButton).toHaveTextContent("Save");
  });

  // Test that nothing renders when invoice prop is neither 'default' nor 'detailReceipt'
  test("should not render content when invoice prop is not specified", () => {
    const { container } = render(
      <RdsCompInvoice 
        leagalName={mockInvoiceData.leagalName} 
        address={mockInvoiceData.address}
      />
    );
    
    // Should not render the form or receipt content
    expect(screen.queryByText("Invoice Information")).not.toBeInTheDocument();
    expect(screen.queryByText("Billed To")).not.toBeInTheDocument();  });
});