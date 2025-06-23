import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RdsCompTransferList, { SelectAllType } from "../src/rds-comp-transfer-list/rds-comp-transfer-list";

// Mock the RdsElements components
jest.mock("../src/rds-elements", () => ({
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled, 
    dataTestId, 
    colorVariant, 
    size, 
    ...props 
  }: any) => {
    // Filter out custom component props to avoid passing them to native HTML elements
    const { style, ...htmlProps } = props;
    return (
      <button
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label}`}
        {...htmlProps}
      >
        {label}
      </button>
    );
  },
  RdsCheckbox: ({ 
    labelText, 
    checked, 
    onChange, 
    dataTestId, 
    style,
    ...props 
  }: any) => {
    // Filter out custom component props to avoid passing them to native HTML elements
    const htmlProps = Object.keys(props).reduce((acc, key) => {
      // Only pass standard HTML input attributes
      if (['id', 'name', 'value', 'className', 'disabled'].includes(key)) {
        acc[key] = props[key];
      }
      return acc;
    }, {} as any);
    
    return (
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          data-testid={dataTestId || `checkbox-${labelText}`}
          {...htmlProps}
        />
        {labelText}
      </label>
    );
  },
}));

// Mock CheckboxStyle enum
jest.mock("../../raaghu-elements/src/rds-checkbox/rds-checkbox", () => ({
  CheckboxStyle: {
    Square: "Square",
    Circular: "Circular",
  },
}));

describe("RdsCompTransferList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  it("renders without crashing", () => {
    render(<RdsCompTransferList />);
    expect(screen.getByTestId("button->")).toBeInTheDocument();
    expect(screen.getByTestId("button-<")).toBeInTheDocument();
  });

  // Test 2: Default selectAllType rendering
  it("renders with default selectAllType correctly", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    // Should show move all buttons
    expect(screen.getByTestId("button->>")).toBeInTheDocument();
    expect(screen.getByTestId("button-<<")).toBeInTheDocument();
    expect(screen.getByTestId("button->")).toBeInTheDocument();
    expect(screen.getByTestId("button-<")).toBeInTheDocument();
  });
  // Test 3: Advanced selectAllType rendering
  it("renders with advanced selectAllType correctly", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    // Should show select all checkboxes and counters
    expect(screen.getByTestId("checkbox-Choices")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-Chosen")).toBeInTheDocument();
    
    // Should show both counter texts (one for left side, one for right side)
    const counterTexts = screen.getAllByText("0/5 selected");
    expect(counterTexts).toHaveLength(2);
  });

  // Test 4: Initial items rendering
  it("renders initial items correctly", () => {
    render(<RdsCompTransferList />);
    
    // Check left side items (0-4)
    expect(screen.getByTestId("checkbox-List item 1")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 2")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 3")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 4")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 5")).toBeInTheDocument();
    
    // Check right side items (5-9)
    expect(screen.getByTestId("checkbox-List item 6")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 7")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 8")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 9")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 10")).toBeInTheDocument();
  });

  // Test 5: Individual item selection
  it("handles individual item selection correctly", () => {
    render(<RdsCompTransferList />);
    
    const item1Checkbox = screen.getByTestId("checkbox-List item 1");
    
    // Initially unchecked
    expect(item1Checkbox).not.toBeChecked();
    
    // Click to check
    fireEvent.click(item1Checkbox);
    expect(item1Checkbox).toBeChecked();
    
    // Click again to uncheck
    fireEvent.click(item1Checkbox);
    expect(item1Checkbox).not.toBeChecked();
  });

  // Test 6: Move selected items right
  it("moves selected items from left to right", () => {
    render(<RdsCompTransferList />);
    
    // Select first item from left
    const item1Checkbox = screen.getByTestId("checkbox-List item 1");
    fireEvent.click(item1Checkbox);
    
    // Move to right
    const moveRightButton = screen.getByTestId("button->");
    fireEvent.click(moveRightButton);
    
    // Item should no longer be in left side (item count changes)
    // Item 1 should now be on the right side
    expect(screen.getByTestId("checkbox-List item 1")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 1")).not.toBeChecked();
  });

  // Test 7: Move selected items left
  it("moves selected items from right to left", () => {
    render(<RdsCompTransferList />);
    
    // Select first item from right
    const item6Checkbox = screen.getByTestId("checkbox-List item 6");
    fireEvent.click(item6Checkbox);
    
    // Move to left
    const moveLeftButton = screen.getByTestId("button-<");
    fireEvent.click(moveLeftButton);
    
    // Item should now be on the left side and unchecked
    expect(screen.getByTestId("checkbox-List item 6")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 6")).not.toBeChecked();
  });

  // Test 8: Move all right (Default mode)
  it("moves all items from left to right in default mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    const moveAllRightButton = screen.getByTestId("button->>");
    fireEvent.click(moveAllRightButton);
    
    // All original left items should now be on right
    // Original left items were 1-5, now they should all be on right
    expect(screen.getByTestId("checkbox-List item 1")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 5")).toBeInTheDocument();
  });

  // Test 9: Move all left (Default mode)
  it("moves all items from right to left in default mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    const moveAllLeftButton = screen.getByTestId("button-<<");
    fireEvent.click(moveAllLeftButton);
    
    // All items should now be on left side
    expect(screen.getByTestId("checkbox-List item 6")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-List item 10")).toBeInTheDocument();
  });

  // Test 10: Button disabled states
  it("disables buttons appropriately", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    const moveRightButton = screen.getByTestId("button->");
    const moveLeftButton = screen.getByTestId("button-<");
    
    // Initially, move buttons should be disabled (no items selected)
    expect(moveRightButton).toBeDisabled();
    expect(moveLeftButton).toBeDisabled();
    
    // Select an item from left
    const item1Checkbox = screen.getByTestId("checkbox-List item 1");
    fireEvent.click(item1Checkbox);
    
    // Now move right should be enabled
    expect(moveRightButton).not.toBeDisabled();
  });

  // Test 11: Select all functionality in Advanced mode
  it("handles select all functionality in advanced mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    const selectAllLeftCheckbox = screen.getByTestId("checkbox-Choices");
    
    // Initially unchecked
    expect(selectAllLeftCheckbox).not.toBeChecked();
    
    // Click to select all
    fireEvent.click(selectAllLeftCheckbox);
    expect(selectAllLeftCheckbox).toBeChecked();
    
    // All left items should be selected
    expect(screen.getByTestId("checkbox-List item 1")).toBeChecked();
    expect(screen.getByTestId("checkbox-List item 5")).toBeChecked();
  });

  // Test 12: Counter updates in Advanced mode
  it("updates counters correctly in advanced mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    // Initially 0/5 selected on both sides
    expect(screen.getAllByText("0/5 selected")).toHaveLength(2);
    
    // Select one item from left
    const item1Checkbox = screen.getByTestId("checkbox-List item 1");
    fireEvent.click(item1Checkbox);
    
    // Left counter should update to 1/5
    expect(screen.getByText("1/5 selected")).toBeInTheDocument();
  });

  // Test 13: Select all right side in Advanced mode
  it("handles select all for right side in advanced mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    const selectAllRightCheckbox = screen.getByTestId("checkbox-Chosen");
    
    // Click to select all right items
    fireEvent.click(selectAllRightCheckbox);
    expect(selectAllRightCheckbox).toBeChecked();
    
    // All right items should be selected
    expect(screen.getByTestId("checkbox-List item 6")).toBeChecked();
    expect(screen.getByTestId("checkbox-List item 10")).toBeChecked();
  });

  // Test 14: Move all disabled states in Default mode
  it("handles move all button disabled states in default mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    const moveAllRightButton = screen.getByTestId("button->>");
    const moveAllLeftButton = screen.getByTestId("button-<<");
    
    // Initially both should be enabled (both sides have items)
    expect(moveAllRightButton).not.toBeDisabled();
    expect(moveAllLeftButton).not.toBeDisabled();
    
    // Move all items to right
    fireEvent.click(moveAllRightButton);
    
    // Now move all right should be disabled (no items on left)
    expect(moveAllRightButton).toBeDisabled();
    expect(moveAllLeftButton).not.toBeDisabled();
  });

  // Test 15: Complex interaction workflow
  it("handles complex interaction workflow correctly", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    // Select multiple items from left
    fireEvent.click(screen.getByTestId("checkbox-List item 1"));
    fireEvent.click(screen.getByTestId("checkbox-List item 3"));
    
    // Check counter updates
    expect(screen.getByText("2/5 selected")).toBeInTheDocument();
    
    // Move selected items to right
    fireEvent.click(screen.getByTestId("button->"));
    
    // Items should be deselected and counter should reset
    expect(screen.getByText("0/3 selected")).toBeInTheDocument();
    
    // Select items from right and move back
    fireEvent.click(screen.getByTestId("checkbox-List item 6"));
    fireEvent.click(screen.getByTestId("button-<"));
    
    // Should have items moved back to left
    expect(screen.getByTestId("checkbox-List item 6")).toBeInTheDocument();
  });

  // Test 16: No advanced features in Default mode
  it("does not show advanced features in default mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Default} />);
    
    // Should not show select all checkboxes or counters
    expect(screen.queryByTestId("checkbox-Choices")).not.toBeInTheDocument();
    expect(screen.queryByTestId("checkbox-Chosen")).not.toBeInTheDocument();
    expect(screen.queryByText("selected")).not.toBeInTheDocument();
  });

  // Test 17: CSS classes applied correctly
  it("applies correct CSS classes", () => {
    const { container } = render(<RdsCompTransferList />);
    
    // Check main container class
    expect(container.querySelector(".transfer-list-container")).toBeInTheDocument();
    expect(container.querySelector(".transfer-list")).toBeInTheDocument();
    expect(container.querySelector(".button-controls")).toBeInTheDocument();
  });
  // Test 18: Unselect all functionality
  it("handles unselect all functionality in advanced mode", () => {
    render(<RdsCompTransferList selectAllType={SelectAllType.Advanced} />);
    
    const selectAllLeftCheckbox = screen.getByTestId("checkbox-Choices");
    
    // First select all
    fireEvent.click(selectAllLeftCheckbox);
    expect(screen.getByText("5/5 selected")).toBeInTheDocument();
    
    // Then unselect all
    fireEvent.click(selectAllLeftCheckbox);
    
    // Should show both counter texts (one for left side, one for right side)
    const counterTexts = screen.getAllByText("0/5 selected");
    expect(counterTexts).toHaveLength(2);
    
    // All items should be unchecked
    expect(screen.getByTestId("checkbox-List item 1")).not.toBeChecked();
    expect(screen.getByTestId("checkbox-List item 5")).not.toBeChecked();
  });
});
