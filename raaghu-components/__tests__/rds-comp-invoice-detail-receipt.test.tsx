// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-invoice-detail-receipt.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompInvoiceDetailReceipt from "../src/rds-comp-invoice-detail-receipt/rds-comp-invoice-detail-receipt";

// Mock the external libraries
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    internal: {
      pageSize: {
        getWidth: jest.fn().mockReturnValue(210),
        getHeight: jest.fn().mockReturnValue(297),
      },
    },
    addImage: jest.fn(),
    save: jest.fn(),
  }));
});

jest.mock("html2canvas", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    toDataURL: jest.fn().mockReturnValue("data:image/png;base64,mockedBase64Data"),
    width: 800,
    height: 600,
  }),
}));

// Mock the rds-elements used in the component
jest.mock("../src/rds-elements", () => ({
  RdsButton: jest.fn(({ 
    colorVariant, 
    label, 
    icon, 
    showLoadingSpinner, 
    size, 
    onClick 
  }) => (
    <button
      data-testid={label ? `button-${label.toLowerCase()}` : "button-download"}
      data-color={colorVariant}
      data-icon={icon}
      data-spinner={showLoadingSpinner}
      data-size={size}
      onClick={onClick}
    >
      {label || (icon ? icon : "Button")}
    </button>
  )),
}));

// Sample invoice details for testing
const mockInvoiceDetails = {
  billedTo: "John Doe",
  purchaseDate: "2023-06-15T00:00:00.000Z",
  transactionId: "TRX123456789",
  invoiceNumber: "INV-2023-001",
  grandTotal: 1299.99,
  subTotal: 1399.99,
  discount: 100.00,
  invoiceItems: [
    {
      itemName: "Premium Plan",
      itemAmount: 1299.99,
      quantity: 1,
      totalAmount: 1299.99
    },
    {
      itemName: "Additional Service",
      itemAmount: 50.00,
      quantity: 2,
      totalAmount: 100.00
    }
  ]
};

describe("RdsCompInvoiceDetailReceipt Component", () => {
  // Test basic rendering
  test("should render the invoice detail receipt component with data", () => {
    const { container } = render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );

    // The component should render without errors
    expect(container).toBeInTheDocument();

    // Check if billed to information is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    
    // Check if transaction ID is displayed
    expect(screen.getByText("TRX123456789")).toBeInTheDocument();
    
    // Check if invoice number is displayed
    expect(screen.getByText("INV-2023-001")).toBeInTheDocument();
    
    // Check if formatted date is displayed (Jun 15, 2023)
    expect(screen.getByText("Jun 15, 2023")).toBeInTheDocument();
      // Check if grand total is displayed - use a more specific selector
    const grandTotalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'span' && 
             element?.classList.contains('fs-4') && 
             element?.classList.contains('fw-bolder') && 
             content.includes('1299.99');
    });
    expect(grandTotalElement).toBeInTheDocument();
  });
  // Test invoice items rendering
  test("should render all invoice items correctly", () => {
    render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Check if table headers are displayed
    expect(screen.getByText("Plan Name")).toBeInTheDocument();
    expect(screen.getByText("Rate")).toBeInTheDocument();
    expect(screen.getByText("Qty")).toBeInTheDocument();
    
    // Use getAllByText for "Total" since it appears multiple times
    const totalTexts = screen.getAllByText("Total");
    expect(totalTexts.length).toBeGreaterThanOrEqual(1);
    
    // Check if item names are displayed
    expect(screen.getByText("Premium Plan")).toBeInTheDocument();
    expect(screen.getByText("Additional Service")).toBeInTheDocument();
  });
  // Test subtotal, discount and total section rendering
  test("should display correct subtotal, discount, and total", () => {
    render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Check if subtotal is displayed
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
      // Use a more specific selector for monetary values
    const subtotalElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             element?.classList.contains('mb-2') && 
             element?.classList.contains('fw-semibold') && 
             content.includes('1399.99');
    });
    expect(subtotalElement).toBeInTheDocument();
    
    // Check if discount is displayed
    expect(screen.getByText("Discount")).toBeInTheDocument();
    
    // For discount amount
    const discountElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             element?.classList.contains('mb-2') && 
             element?.classList.contains('fw-semibold') && 
             content.includes('100');
    });
    expect(discountElement).toBeInTheDocument();
    
    // For total, use getAllByText and find the one that's the summary total
    const totalElements = screen.getAllByText("Total");
    expect(totalElements.length).toBeGreaterThanOrEqual(1);
      // Check for the grand total value
    const totalAmountElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && 
             element?.classList.contains('mb-0') && 
             element?.classList.contains('fw-semibold') && 
             content.includes('1299.99');
    });
    expect(totalAmountElement).toBeInTheDocument();
  });

  // Test terms section rendering
  test("should display terms section", () => {
    render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Check if terms header is displayed
    expect(screen.getByText("Terms")).toBeInTheDocument();
    
    // Check if terms content is displayed
    expect(screen.getByText("Refunds will be issued in accordance with our refund policy. Please refer to our website or contact us for more information.")).toBeInTheDocument();
    expect(screen.getByText("Payment Disputes: Any payment disputes must be raised within 30 days from the date of this receipt.")).toBeInTheDocument();
    expect(screen.getByText("Taxes: All applicable taxes have been included in the payment amount.")).toBeInTheDocument();
  });
  // Test download button functionality
  test("should call download function when download button is clicked", async () => {
    // Setup mock for querySelector
    document.querySelector = jest.fn().mockReturnValue({
      // Mock required properties that html2canvas might need
      getBoundingClientRect: jest.fn().mockReturnValue({
        width: 800,
        height: 600,
        top: 0,
        left: 0,
        right: 800,
        bottom: 600
      }),
      style: {},
      ownerDocument: document
    });
    
    // Get the mocked html2canvas implementation
    const html2canvas = require("html2canvas").default;
    
    render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Get the download button
    const downloadButton = screen.getByTestId("button-download");
    
    // Click download button
    fireEvent.click(downloadButton);
    
    // Verify that document.querySelector was called with the correct selector
    expect(document.querySelector).toHaveBeenCalledWith(".actual-reciept");
    
    // Verify that html2canvas was called with the element returned by querySelector
    expect(html2canvas).toHaveBeenCalled();
    
    // Since html2canvas returns a Promise, we should wait for it to resolve
    await new Promise(process.nextTick);
    
    // jsPDF should be called and initialized
    const jsPDF = require("jspdf");
    expect(jsPDF).toHaveBeenCalled();
  });

  // Test send button rendering
  test("should render send button correctly", () => {
    render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Get the send button
    const sendButton = screen.getByTestId("button-send");
    
    // Verify button exists and has correct text
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toHaveTextContent("Send");
  });

  // Test responsive layout
  test("should have proper responsive layout classes", () => {
    const { container } = render(
      <RdsCompInvoiceDetailReceipt 
        invoiceDetails={mockInvoiceDetails} 
      />
    );
    
    // Check if container has responsive classes
    expect(container.querySelector(".container")).toBeInTheDocument();
    
    // Check if row and col classes are used for responsive layout
    expect(container.querySelector(".row")).toBeInTheDocument();
    expect(container.querySelector(".col-md-8")).toBeInTheDocument();
    expect(container.querySelector(".col-lg-6")).toBeInTheDocument();
  });
});