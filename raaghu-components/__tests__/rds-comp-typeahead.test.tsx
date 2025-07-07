import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompTypeahead from "../src/rds-comp-typeahead/rds-comp-typeahead";

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsCompSelectList: ({ 
    id, 
    selectedValue, 
    selectItems, 
    label, 
    placeholder, 
    onChange,
    ...props 
  }: any) => (
    <div data-testid={`select-list-${id}`}>
      <label>{label}</label>
      <select
        data-testid={`select-${id}`}
        value={selectedValue || ""}
        onChange={(e) => onChange && onChange({ value: e.target.value })}
        {...props}
      >
        <option value="">{placeholder}</option>
        {selectItems?.map((item: any) => (
          <option key={item.value} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled, 
    dataTestId, 
    colorVariant, 
    size, 
    type,
    block,
    ...props 
  }: any) => {
    // Filter out custom component props to avoid passing them to native HTML elements
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      // Only pass standard HTML button attributes
      if (['id', 'name', 'className', 'disabled', 'form'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label}`}
        type={type || "button"}
        {...htmlProps}
      >
        {label}
      </button>
    );
  },
  RdsCompIcon: ({ 
    name, 
    onClick, 
    dataTestId,
    colorVariant,
    height,
    width,
    fill,
    stroke,
    isCursorPointer,
    ...props 
  }: any) => {
    // Filter out custom component props to avoid passing them to native HTML elements
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      // Only pass standard HTML attributes
      if (['id', 'className'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <span
        data-testid={dataTestId || `icon-${name}`}
        onClick={onClick}
        style={{ cursor: isCursorPointer ? 'pointer' : 'default' }}
        {...htmlProps}
      >
        {name}
      </span>
    );
  },
}));

describe("RdsCompTypeahead", () => {
  const mockSelectItems = [
    { option: "Author 1", value: "author1" },
    { option: "Author 2", value: "author2" },
    { option: "Author 3", value: "author3" },
    { option: "Author 4", value: "author4" },
  ];

  const mockSelectedItems = [
    { option: "Author 1", value: "author1" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    expect(screen.getByTestId("select-selCat")).toBeInTheDocument();
    expect(screen.getByTestId("button-ADD")).toBeInTheDocument();
  });

  // Test 2: Renders with label
  it("renders with correct label", () => {
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems} 
        label="Test Authors" 
      />
    );
    
    expect(screen.getByText("Test Authors")).toBeInTheDocument();
  });
  // Test 3: Renders select items correctly
  it("renders select items in dropdown", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const selectElement = screen.getByTestId("select-selCat");
    
    // Check if select element is present
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(mockSelectItems.length + 1); // +1 for placeholder
    
    // Check specific options
    expect(screen.getByRole("option", { name: "Author 1" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Author 2" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Author 3" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Author 4" })).toBeInTheDocument();
  });

  // Test 4: Shows placeholder text
  it("shows correct placeholder text", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    expect(screen.getByDisplayValue("Select Authors")).toBeInTheDocument();
  });

  // Test 5: Handles selection change
  it("handles select change correctly", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const selectElement = screen.getByTestId("select-selCat");
    
    fireEvent.change(selectElement, { target: { value: "author2" } });
    
    expect(selectElement).toHaveValue("author2");
  });

  // Test 6: Add button click adds item to selected list
  it("adds selected item to list when ADD button is clicked", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const selectElement = screen.getByTestId("select-selCat");
    const addButton = screen.getByTestId("button-ADD");
    
    // Select an item
    fireEvent.change(selectElement, { target: { value: "author1" } });
    
    // Click add button
    fireEvent.click(addButton);
    
    // Check if table is rendered and item is added
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Author 1")).toBeInTheDocument();
  });
  // Test 7: Table shows correct headers
  it("shows table with correct headers when items are added", () => {
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems} 
        selectedItems={mockSelectedItems}
        label="Authors"
      />
    );
    
    expect(screen.getByRole("table")).toBeInTheDocument();
    
    // Check for table headers specifically by role
    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBeGreaterThan(0);
    
    // Check for Actions header specifically
    expect(screen.getByRole("columnheader", { name: "Actions" })).toBeInTheDocument();
  });
  // Test 8: Delete icon functionality
  it("removes item when delete icon is clicked", async () => {
    const mockOnChange = jest.fn();
    
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems} 
        selectedItems={mockSelectedItems}
        onChange={mockOnChange}
      />
    );
    
    // Item should be present initially in the table
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    
    // Click delete icon
    const deleteIcon = screen.getByTestId("icon-delete");
    fireEvent.click(deleteIcon);
    
    // Check that onChange was called (the component should handle the removal)
    expect(mockOnChange).toHaveBeenCalled();
  });

  // Test 9: OnChange callback is called
  it("calls onChange callback when items are modified", () => {
    const mockOnChange = jest.fn();
    
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems} 
        onChange={mockOnChange}
      />
    );
    
    const selectElement = screen.getByTestId("select-selCat");
    const addButton = screen.getByTestId("button-ADD");
    
    // Select and add an item
    fireEvent.change(selectElement, { target: { value: "author2" } });
    fireEvent.click(addButton);
    
    // onChange should be called
    expect(mockOnChange).toHaveBeenCalled();
  });

  // Test 10: Filters out selected items from dropdown
  it("removes added items from select dropdown", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const selectElement = screen.getByTestId("select-selCat");
    const addButton = screen.getByTestId("button-ADD");
    
    // Initially all items should be available
    expect(screen.getByRole("option", { name: "Author 1" })).toBeInTheDocument();
    
    // Select and add item
    fireEvent.change(selectElement, { target: { value: "author1" } });
    fireEvent.click(addButton);
    
    // Author 1 should no longer be in dropdown options
    expect(screen.queryByRole("option", { name: "Author 1" })).not.toBeInTheDocument();
    
    // But other authors should still be there
    expect(screen.getByRole("option", { name: "Author 2" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Author 3" })).toBeInTheDocument();
  });

  // Test 11: Handles pre-selected items
  it("handles pre-selected items correctly", () => {
    const filteredSelectItems = mockSelectItems.filter(
      item => !mockSelectedItems.some(selected => selected.value === item.value)
    );
    
    render(
      <RdsCompTypeahead 
        selectItems={filteredSelectItems}
        selectedItems={mockSelectedItems}
      />
    );
    
    // Should show selected item in table
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    
    // Should not show selected item in dropdown
    expect(screen.queryByRole("option", { name: "Author 1" })).not.toBeInTheDocument();
    
    // Should show other items in dropdown
    expect(screen.getByRole("option", { name: "Author 2" })).toBeInTheDocument();
  });

  // Test 12: Table is not rendered when no items selected
  it("does not render table when no items are selected", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  // Test 13: Multiple items can be added
  it("allows adding multiple items", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const selectElement = screen.getByTestId("select-selCat");
    const addButton = screen.getByTestId("button-ADD");
    
    // Add first item
    fireEvent.change(selectElement, { target: { value: "author1" } });
    fireEvent.click(addButton);
    
    // Add second item
    fireEvent.change(selectElement, { target: { value: "author2" } });
    fireEvent.click(addButton);
    
    // Both items should be in the table
    expect(screen.getByText("Author 1")).toBeInTheDocument();
    expect(screen.getByText("Author 2")).toBeInTheDocument();
  });
  // Test 14: Delete restores item to dropdown
  it("restores item to dropdown when deleted from selected list", async () => {
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems.filter(item => item.value !== "author1")}
        selectedItems={mockSelectedItems}
      />
    );
    
    // Author 1 should not be in dropdown initially
    expect(screen.queryByRole("option", { name: "Author 1" })).not.toBeInTheDocument();
    
    // Delete the selected item
    const deleteIcon = screen.getByTestId("icon-delete");
    fireEvent.click(deleteIcon);
    
    // Author 1 should now be back in dropdown
    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Author 1" })).toBeInTheDocument();
    });
  });

  // Test 15: Handles empty select items array
  it("handles empty select items array", () => {
    render(<RdsCompTypeahead selectItems={[]} />);
    
    expect(screen.getByTestId("select-selCat")).toBeInTheDocument();
    expect(screen.getByTestId("button-ADD")).toBeInTheDocument();
    
    // Should only have placeholder option
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(1);
    expect(screen.getByDisplayValue("Select Authors")).toBeInTheDocument();
  });

  // Test 16: Add button works with no selection (edge case)
  it("handles ADD button click with no selection", () => {
    render(<RdsCompTypeahead selectItems={mockSelectItems} />);
    
    const addButton = screen.getByTestId("button-ADD");
    
    // Click add without selecting anything
    fireEvent.click(addButton);
    
    // Should not crash and table should not appear
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  // Test 17: Correct CSS classes are applied
  it("applies correct CSS classes", () => {
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems} 
        selectedItems={mockSelectedItems}
      />
    );
    
    // Check for presence of key CSS classes
    const rowElements = screen.getAllByText("Author 1")[0].closest('.row');
    expect(rowElements).toBeInTheDocument();
    
    const tableElement = screen.getByRole("table");
    expect(tableElement).toHaveClass("table");
  });

  // Test 18: Handles selectedValue prop
  it("handles selectedValue prop correctly", () => {
    const selectedValue = [{ option: "Author 2", value: "author2" }];
    
    render(
      <RdsCompTypeahead 
        selectItems={mockSelectItems}
        selectedValue={selectedValue}
      />
    );
    
    // This test ensures the component doesn't crash with selectedValue prop
    expect(screen.getByTestId("select-selCat")).toBeInTheDocument();
  });
});
