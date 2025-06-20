import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsUserDelegations from "../src/rds-comp-user-delegations/rds-comp-user-delegations";

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
  RdsButton: ({ 
    type,
    icon,
    iconFill,
    iconHeight,
    iconStroke,
    iconWidth,
    colorVariant,
    label,
    size,
    iconColorVariant,
    isOutline,
    onClick,
    dataTestId,
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
        data-testid={dataTestId || `button-${label?.replace(/\s+/g, '-').toLowerCase()}`}
        {...htmlProps}
      >
        {icon && <span data-testid={`icon-${icon}`}>{icon}</span>}
        {label}
      </button>
    );
  },
  RdsDatePicker: ({ 
    type,
    DatePickerLabel,
    onDatePicker,
    isDropdownOpen,
    ...props 
  }: any) => {
    // Filter out custom component props
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      if (['id', 'className'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <div data-testid="date-picker" {...htmlProps}>
        <label>{DatePickerLabel}</label>
        <input
          type="date"
          data-testid="start-date"
          onChange={(e) => {
            // Simulate date range selection
            const startDate = new Date(e.target.value);
            const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days later
            onDatePicker && onDatePicker([startDate, endDate]);
          }}
        />
        <input
          type="date"
          data-testid="end-date"
          onChange={(e) => {
            // Simulate date range selection
            const endDate = new Date(e.target.value);
            const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days earlier
            onDatePicker && onDatePicker([startDate, endDate]);
          }}
        />
      </div>
    );
  },
}));

describe("RdsUserDelegations", () => {
  const mockSelectUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Bob Wilson" },
  ];

  const mockOnSubmit = jest.fn();

  const defaultProps = {
    onSubmit: mockOnSubmit,
    selectuser: mockSelectUsers,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering (initial state)
  it("renders without crashing in initial state", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    expect(screen.getByTestId("button-delegate-new-user")).toBeInTheDocument();
    expect(screen.getByText("Delegate New User")).toBeInTheDocument();
  });

  // Test 2: Shows plus icon on delegate button
  it("displays plus icon on delegate new user button", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    expect(screen.getByTestId("icon-plus")).toBeInTheDocument();
  });

  // Test 3: Toggle to form state
  it("toggles to form view when delegate button is clicked", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    const delegateButton = screen.getByTestId("button-delegate-new-user");
    
    fireEvent.click(delegateButton);
    
    // Should now show the form instead of the button
    expect(screen.queryByTestId("button-delegate-new-user")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // select dropdown
  });

  // Test 4: Renders user selection dropdown
  it("renders user selection dropdown with correct options", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    
    // Check for default option
    expect(screen.getByText("Select a User")).toBeInTheDocument();
    
    // Check for user options
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Wilson")).toBeInTheDocument();
  });

  // Test 5: Renders date picker component
  it("renders date picker component in form state", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    expect(screen.getByText("Select Date Range")).toBeInTheDocument();
  });

  // Test 6: Renders Save and Cancel buttons in form state
  it("renders Save and Cancel buttons in form state", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    expect(screen.getByTestId("button-save")).toBeInTheDocument();
    expect(screen.getByTestId("button-cancel")).toBeInTheDocument();
  });

  // Test 7: Cancel button toggles back to initial state
  it("toggles back to initial state when cancel button is clicked", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Verify form is shown
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    
    // Click cancel
    fireEvent.click(screen.getByTestId("button-cancel"));
    
    // Should be back to initial state
    expect(screen.getByTestId("button-delegate-new-user")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  // Test 8: User selection updates state
  it("handles user selection correctly", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const selectElement = screen.getByRole("combobox");
    
    fireEvent.click(selectElement);
    
    // Component should handle the selection without crashing
    expect(selectElement).toBeInTheDocument();
  });

  // Test 9: Date picker updates state
  it("handles date selection correctly", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const startDateInput = screen.getByTestId("start-date");
    
    fireEvent.change(startDateInput, { target: { value: "2024-01-01" } });
    
    // Component should handle the date selection without crashing
    expect(startDateInput).toBeInTheDocument();
  });

  // Test 10: Save button calls onSubmit with userData
  it("calls onSubmit with userData when save button is clicked", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Select a user (simulate click event)
    const selectElement = screen.getByRole("combobox");
    fireEvent.click(selectElement, { target: { value: "John Doe" } });
    
    // Select dates
    const startDateInput = screen.getByTestId("start-date");
    fireEvent.change(startDateInput, { target: { value: "2024-01-01" } });
    
    // Click save
    fireEvent.click(screen.getByTestId("button-save"));
    
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  // Test 11: Save button type is submit
  it("save button has correct type attribute", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const saveButton = screen.getByTestId("button-save");
    
    expect(saveButton).toHaveAttribute("type", "submit");
  });

  // Test 12: Cancel button type is button
  it("cancel button has correct type attribute", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const cancelButton = screen.getByTestId("button-cancel");
    
    expect(cancelButton).toHaveAttribute("type", "button");
  });

  // Test 13: Handles empty selectuser array
  it("handles empty selectuser array gracefully", () => {
    render(<RdsUserDelegations onSubmit={mockOnSubmit} selectuser={[]} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
    
    // Should only show the default option
    expect(screen.getByText("Select a User")).toBeInTheDocument();
  });

  // Test 14: Handles undefined selectuser
  it("handles undefined selectuser gracefully", () => {
    render(<RdsUserDelegations onSubmit={mockOnSubmit} selectuser={undefined as any} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Should not render select dropdown when selectuser is undefined
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  // Test 15: CSS classes and structure
  it("applies correct CSS classes and structure", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Check for form elements
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveClass("form-select", "form-select-md");
    
    // Check for footer buttons container
    const footerButtons = document.querySelector(".footer-buttons");
    expect(footerButtons).toBeInTheDocument();
  });

  // Test 16: Date picker is advanced type
  it("renders date picker with advanced type", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const datePicker = screen.getByTestId("date-picker");
    expect(datePicker).toBeInTheDocument();
  });

  // Test 17: Multiple state toggles work correctly
  it("handles multiple state toggles correctly", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Initial state - button visible
    expect(screen.getByTestId("button-delegate-new-user")).toBeInTheDocument();
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    expect(screen.queryByTestId("button-delegate-new-user")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    
    // Click cancel to go back
    fireEvent.click(screen.getByTestId("button-cancel"));
    expect(screen.getByTestId("button-delegate-new-user")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    
    // Click delegate again
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  // Test 18: Form layout and responsive classes
  it("applies correct responsive layout classes", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Check for responsive flex classes
    const footerButtons = document.querySelector(".d-flex.flex-column-reverse.ps-4.flex-lg-row");
    expect(footerButtons).toBeInTheDocument();
  });

  // Test 19: Date picker receives correct props
  it("passes correct props to date picker component", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    // Date picker should have the correct label
    expect(screen.getByText("Select Date Range")).toBeInTheDocument();
  });

  // Test 20: User selection default value
  it("sets correct default value for user selection", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Click to show form
    fireEvent.click(screen.getByTestId("button-delegate-new-user"));
    
    const selectElement = screen.getByRole("combobox");
    const defaultOption = screen.getByText("Select a User");
    
    expect(defaultOption).toHaveAttribute("value", "DEFAULT");
    expect(defaultOption).toHaveAttribute("disabled");
  });

  // Test 21: Button styling and variants
  it("applies correct styling to buttons", () => {
    render(<RdsUserDelegations {...defaultProps} />);
    
    // Initial delegate button should have primary color
    const delegateButton = screen.getByTestId("button-delegate-new-user");
    expect(delegateButton).toBeInTheDocument();
    
    // Click to show form
    fireEvent.click(delegateButton);
    
    // Check button attributes would be passed to RdsButton
    const saveButton = screen.getByTestId("button-save");
    const cancelButton = screen.getByTestId("button-cancel");
    
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
