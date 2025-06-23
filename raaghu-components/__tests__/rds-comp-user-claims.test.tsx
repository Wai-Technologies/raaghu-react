import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompUserClaim from "../src/rds-comp-user-claims/rds-comp-user-claims";

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsInput: ({ 
    name,
    label,
    required,
    reset,
    inputType,
    placeholder,
    size,
    dataTestId,
    onChange,
    value,
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
      <div data-testid={`input-container-${dataTestId}`}>
        {label && <label htmlFor={dataTestId}>{name}</label>}
        <input
          id={dataTestId}
          type={inputType}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value || ""}
          onChange={onChange}
          data-testid={dataTestId}
          {...htmlProps}
        />
      </div>
    );
  },
  RdsLabel: ({ 
    label,
    ...props 
  }: any) => (
    <span data-testid="rds-label" {...props}>
      {label}
    </span>
  ),
  RdsButton: ({ 
    type,
    label, 
    onClick, 
    isDisabled, 
    dataTestId, 
    colorVariant, 
    size,
    isOutline,
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
        type={type || "button"}
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label?.replace(/\s+/g, '-').toLowerCase()}`}
        {...htmlProps}
      >
        {label}
      </button>
    );
  },
}));

// Mock InputSize enum
jest.mock("../../raaghu-elements/src/rds-input/rds-input", () => ({
  InputSize: {
    Small: "small",
    Medium: "medium",
    Large: "large",
  },
}));

describe("RdsCompUserClaim", () => {
  const mockUserClaimData = {
    type: "email",
    value: "user@example.com"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompUserClaim />);
    
    expect(screen.getByTestId("type")).toBeInTheDocument();
    expect(screen.getByTestId("value")).toBeInTheDocument();
    expect(screen.getByTestId("cancel")).toBeInTheDocument();
    expect(screen.getByTestId("next")).toBeInTheDocument();
  });

  // Test 2: Renders form fields with correct labels
  it("renders form fields with correct labels", () => {
    render(<RdsCompUserClaim />);
    
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Value")).toBeInTheDocument();
  });

  // Test 3: Shows correct placeholders
  it("displays correct placeholder texts", () => {
    render(<RdsCompUserClaim />);
    
    expect(screen.getByPlaceholderText("Enter Type")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Value")).toBeInTheDocument();
  });

  // Test 4: Renders with initial data
  it("populates form with provided userClaimData", () => {
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    
    expect(typeInput).toHaveValue("email");
    expect(valueInput).toHaveValue("user@example.com");
  });

  // Test 5: Handles type input change
  it("handles type input change correctly", () => {
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} />);
    
    const typeInput = screen.getByTestId("type");
    
    fireEvent.change(typeInput, { target: { value: "phone" } });
    
    expect(typeInput).toHaveValue("phone");
  });

  // Test 6: Handles value input change
  it("handles value input change correctly", () => {
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} />);
    
    const valueInput = screen.getByTestId("value");
    
    fireEvent.change(valueInput, { target: { value: "123-456-7890" } });
    
    expect(valueInput).toHaveValue("123-456-7890");
  });

  // Test 7: Next button is disabled when form is invalid
  it("disables next button when form is invalid", () => {
    render(<RdsCompUserClaim />);
    
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).toBeDisabled();
  });

  // Test 8: Next button is enabled when form is valid
  it("enables next button when form is valid", () => {
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} />);
    
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).not.toBeDisabled();
  });

  // Test 9: Next button disabled with partial data
  it("disables next button when only type is filled", () => {
    const partialData = { type: "email", value: "" };
    render(<RdsCompUserClaim userClaimData={partialData} />);
    
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).toBeDisabled();
  });

  // Test 10: Next button disabled with partial data (value only)
  it("disables next button when only value is filled", () => {
    const partialData = { type: "", value: "user@example.com" };
    render(<RdsCompUserClaim userClaimData={partialData} />);
    
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).toBeDisabled();
  });

  // Test 11: Calls onSaveHandler when next button is clicked
  it("calls onSaveHandler when next button is clicked", () => {
    const mockSaveHandler = jest.fn();
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} onSaveHandler={mockSaveHandler} />);
    
    const nextButton = screen.getByTestId("next");
    
    fireEvent.click(nextButton);
    
    expect(mockSaveHandler).toHaveBeenCalledWith(mockUserClaimData);
  });

  // Test 12: Form clears after successful save
  it("clears form after next button is clicked", () => {
    const mockSaveHandler = jest.fn();
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} onSaveHandler={mockSaveHandler} />);
    
    const nextButton = screen.getByTestId("next");
    
    fireEvent.click(nextButton);
    
    // After save, form should be cleared
    expect(screen.getByTestId("type")).toHaveValue("");
    expect(screen.getByTestId("value")).toHaveValue("");
  });

  // Test 13: Both fields are required
  it("marks both input fields as required", () => {
    render(<RdsCompUserClaim />);
    
    expect(screen.getByTestId("type")).toBeRequired();
    expect(screen.getByTestId("value")).toBeRequired();
  });

  // Test 14: Correct input types are set
  it("sets correct input types for both fields", () => {
    render(<RdsCompUserClaim />);
    
    expect(screen.getByTestId("type")).toHaveAttribute("type", "text");
    expect(screen.getByTestId("value")).toHaveAttribute("type", "text");
  });

  // Test 15: Cancel button is always enabled
  it("cancel button is always enabled", () => {
    render(<RdsCompUserClaim />);
    
    const cancelButton = screen.getByTestId("cancel");
    
    expect(cancelButton).not.toBeDisabled();
  });

  // Test 16: Button types are correct
  it("sets correct button types", () => {
    render(<RdsCompUserClaim />);
    
    const cancelButton = screen.getByTestId("cancel");
    const nextButton = screen.getByTestId("next");
    
    expect(cancelButton).toHaveAttribute("type", "button");
    expect(nextButton).toHaveAttribute("type", "button");
  });

  // Test 17: Form structure and CSS classes
  it("renders with correct form structure", () => {
    render(<RdsCompUserClaim />);
    
    // Check for tab-content wrapper
    const tabContent = document.querySelector(".tab-content");
    expect(tabContent).toBeInTheDocument();
    
    // Check for form element
    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
    
    // Check for row structure
    const rows = document.querySelectorAll(".row");
    expect(rows.length).toBeGreaterThan(0);
    
    // Check for form-group classes
    const formGroups = document.querySelectorAll(".form-group");
    expect(formGroups).toHaveLength(2);
  });

  // Test 18: Updates formData when userClaimData prop changes
  it("updates form data when userClaimData prop changes", () => {
    const { rerender } = render(<RdsCompUserClaim userClaimData={mockUserClaimData} />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    
    expect(typeInput).toHaveValue("email");
    expect(valueInput).toHaveValue("user@example.com");
    
    // Update props
    const newData = { type: "role", value: "admin" };
    rerender(<RdsCompUserClaim userClaimData={newData} />);
    
    expect(typeInput).toHaveValue("role");
    expect(valueInput).toHaveValue("admin");
  });

  // Test 19: Reset functionality
  it("handles reset prop correctly", () => {
    const { rerender } = render(<RdsCompUserClaim userClaimData={mockUserClaimData} reset={false} />);
    
    // Change reset prop
    rerender(<RdsCompUserClaim userClaimData={mockUserClaimData} reset={true} />);
    
    // Component should handle reset without crashing
    expect(screen.getByTestId("type")).toBeInTheDocument();
    expect(screen.getByTestId("value")).toBeInTheDocument();
  });

  // Test 20: Form validation with empty strings
  it("treats empty strings as invalid", () => {
    const emptyData = { type: "", value: "" };
    render(<RdsCompUserClaim userClaimData={emptyData} />);
    
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).toBeDisabled();
  });

  // Test 21: Form validation with whitespace
  it("treats whitespace-only values as valid input", () => {
    render(<RdsCompUserClaim />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    const nextButton = screen.getByTestId("next");
    
    // Fill with whitespace (component doesn't trim values)
    fireEvent.change(typeInput, { target: { value: "   " } });
    fireEvent.change(valueInput, { target: { value: "   " } });
    
    expect(nextButton).not.toBeDisabled();
  });

  // Test 22: Handles undefined userClaimData
  it("handles undefined userClaimData gracefully", () => {
    render(<RdsCompUserClaim userClaimData={undefined} />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    
    expect(typeInput).toHaveValue("");
    expect(valueInput).toHaveValue("");
  });

  // Test 23: Form becomes valid when filling both fields
  it("enables next button when both fields are filled", () => {
    render(<RdsCompUserClaim />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    const nextButton = screen.getByTestId("next");
    
    expect(nextButton).toBeDisabled();
    
    // Fill type field
    fireEvent.change(typeInput, { target: { value: "department" } });
    expect(nextButton).toBeDisabled(); // Still disabled, value is empty
    
    // Fill value field
    fireEvent.change(valueInput, { target: { value: "IT" } });
    expect(nextButton).not.toBeDisabled(); // Now enabled
  });

  // Test 24: Multiple input changes maintain state
  it("maintains state across multiple input changes", () => {
    render(<RdsCompUserClaim />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    
    // Change type
    fireEvent.change(typeInput, { target: { value: "role" } });
    expect(typeInput).toHaveValue("role");
    
    // Change value
    fireEvent.change(valueInput, { target: { value: "admin" } });
    expect(valueInput).toHaveValue("admin");
    
    // Change type again
    fireEvent.change(typeInput, { target: { value: "department" } });
    expect(typeInput).toHaveValue("department");
    expect(valueInput).toHaveValue("admin"); // Should maintain previous value
  });

  // Test 25: onSaveHandler receives updated data
  it("onSaveHandler receives updated form data after changes", () => {
    const mockSaveHandler = jest.fn();
    render(<RdsCompUserClaim userClaimData={mockUserClaimData} onSaveHandler={mockSaveHandler} />);
    
    const typeInput = screen.getByTestId("type");
    const valueInput = screen.getByTestId("value");
    const nextButton = screen.getByTestId("next");
    
    // Change values
    fireEvent.change(typeInput, { target: { value: "role" } });
    fireEvent.change(valueInput, { target: { value: "admin" } });
    
    // Save form
    fireEvent.click(nextButton);
    
    expect(mockSaveHandler).toHaveBeenCalledWith({
      type: "role",
      value: "admin"
    });
  });
});
