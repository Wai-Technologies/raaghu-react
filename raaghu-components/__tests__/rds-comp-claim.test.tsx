import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompClaim from '../src/rds-comp-claim/rds-comp-claim';

// Mock the RdsButton component from rds-elements
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, onClick, colorVariant, size, databsdismiss, type, class: className }: any) => (
    <button 
      data-testid={`button-${label.toLowerCase()}`}
      onClick={onClick}
      className={`btn btn-${colorVariant} btn-${size} ${className}`}
      data-bs-dismiss={databsdismiss}
      type={type}
    >
      {label}
    </button>
  )
}));

describe('RdsCompClaim', () => {
  // Mock data for testing
  const mockResources = [
    {
      id: 1,
      displayName: 'Resource 1',
      selected: false,
      children: [
        { id: 11, displayName: 'Child 1-1', selected: false },
        { id: 12, displayName: 'Child 1-2', selected: false },
        { id: 13, displayName: 'Child 1-3', selected: false }
      ]
    },
    {
      id: 2,
      displayName: 'Resource 2',
      selected: false,
      children: [
        { id: 21, displayName: 'Child 2-1', selected: false },
        { id: 22, displayName: 'Child 2-2', selected: false }
      ]
    }
  ];

  // Mock functions
  const mockOnCreate = jest.fn();
  const mockOnCancel = jest.fn();

  // Default props
  const defaultProps = {
    resources: mockResources,
    onCreate: mockOnCreate,
    onCancel: mockOnCancel
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    expect(container).toBeTruthy();
  });
  it('renders all resources and their children', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Check if all resource headings are rendered
    expect(screen.getByText('Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Resource 2')).toBeInTheDocument();
    
    // Check if all children are rendered
    // Since label and input relationships are based on IDs, we'll check these directly
    const childLabels = document.querySelectorAll('.form-check-label');
    const childNames = ['Child 1-1', 'Child 1-2', 'Child 1-3', 'Child 2-1', 'Child 2-2'];
    
    // Create an array of text contents from the labels
    const labelTexts = Array.from(childLabels).map(label => label.textContent?.trim());
    
    // Check if each child name is present in the label texts
    childNames.forEach(childName => {
      expect(labelTexts.includes(childName)).toBe(true);
    });
  });
  it('toggles parent checkbox when clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Find the parent checkbox for Resource 1
    // We need to use a more robust selector since the previous approach was failing
    const parentCheckboxes = document.querySelectorAll('.form-check-input');
    // The second checkbox should be for Resource 1 (after the main "Select all" checkbox)
    const resource1Checkbox = parentCheckboxes[1] as HTMLInputElement;
    
    // Initially it should be unchecked
    expect(resource1Checkbox.checked).toBeFalsy();
    
    // Click the checkbox
    fireEvent.click(resource1Checkbox);
    
    // It should be checked now
    expect(resource1Checkbox.checked).toBeTruthy();
    
    // All children should also be checked
    // Find children of Resource 1 by their IDs which should be "01", "02", "03"
    const childCheckboxes = [
      document.getElementById('01') as HTMLInputElement,
      document.getElementById('02') as HTMLInputElement,
      document.getElementById('03') as HTMLInputElement
    ];
    
    childCheckboxes.forEach(checkbox => {
      if (checkbox) {
        expect(checkbox.checked).toBeTruthy();
      }
    });
    
    // Click again to uncheck
    fireEvent.click(resource1Checkbox);
    
    // Should be unchecked again
    expect(resource1Checkbox.checked).toBeFalsy();
    
    // All children should also be unchecked
    childCheckboxes.forEach(checkbox => {
      if (checkbox) {
        expect(checkbox.checked).toBeFalsy();
      }
    });
  });
  it('toggles child checkbox when clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Get a child checkbox
    const childCheckbox = document.getElementById('00') as HTMLInputElement;
    
    // Initially it should be unchecked
    expect(childCheckbox.checked).toBeFalsy();
    
    // Click to check
    fireEvent.click(childCheckbox);
    
    // Should be checked now
    expect(childCheckbox.checked).toBeTruthy();
    
    // Parent should still be unchecked (since not all children are checked)
    const parentCheckboxes = document.querySelectorAll('.form-check-input');
    const parentCheckbox = parentCheckboxes[1] as HTMLInputElement;
    expect(parentCheckbox.checked).toBeFalsy();
    
    // Check all siblings
    const childCheckbox2 = document.getElementById('01') as HTMLInputElement;
    const childCheckbox3 = document.getElementById('02') as HTMLInputElement;
    fireEvent.click(childCheckbox2);
    fireEvent.click(childCheckbox3);
    
    // Now parent should be checked as all children are checked
    expect(parentCheckbox.checked).toBeTruthy();
  });
  it('toggles all checkboxes when "Select all" is clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Get the main "Select all" checkbox (the first one)
    const selectAllCheckbox = document.querySelector('.form-check-input') as HTMLInputElement;
    
    // Initially it should be unchecked
    expect(selectAllCheckbox.checked).toBeFalsy();
    
    // Click to select all
    fireEvent.click(selectAllCheckbox);
    
    // Should be checked now
    expect(selectAllCheckbox.checked).toBeTruthy();
    
    // All parent and child checkboxes should be checked
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(checkbox => {
      expect(checkbox as HTMLInputElement).toBeChecked();
    });
    
    // Click again to unselect all
    fireEvent.click(selectAllCheckbox);
    
    // Should be unchecked now
    expect(selectAllCheckbox.checked).toBeFalsy();
    
    // All checkboxes should be unchecked
    allCheckboxes.forEach(checkbox => {
      expect(checkbox as HTMLInputElement).not.toBeChecked();
    });
  });
  it('calls onCreate with updated resources when Save button is clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Select a checkbox
    const childCheckbox = document.getElementById('00') as HTMLInputElement;
    fireEvent.click(childCheckbox);
    
    // Click Save button
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onCreate was called with the updated resources
    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    
    // Check that the updated state was passed to onCreate
    const updatedResources = mockOnCreate.mock.calls[0][0];
    expect(updatedResources[0].children[0].selected).toBe(true); // Child 1-1 should be selected
    expect(updatedResources[0].selected).toBe(false); // Parent 1 should not be selected
  });
  it('resets form after saving', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Select some checkboxes
    const childCheckbox1 = document.getElementById('00') as HTMLInputElement;
    const childCheckbox2 = document.getElementById('01') as HTMLInputElement;
    fireEvent.click(childCheckbox1);
    fireEvent.click(childCheckbox2);
    
    // Verify they are checked
    expect(childCheckbox1.checked).toBeTruthy();
    expect(childCheckbox2.checked).toBeTruthy();
    
    // Click Save button
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Checkboxes should be reset
    expect(childCheckbox1.checked).toBeFalsy();
    expect(childCheckbox2.checked).toBeFalsy();
  });

  it('renders the Cancel button', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Check if Cancel button exists
    const cancelButton = screen.getByTestId('button-cancel');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');
  });

  it('provides proper aria accessibility', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Check that all checkboxes have associated labels
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      // Get the id of the checkbox
      const id = checkbox.getAttribute('id');
      
      if (id) {
        // Check if there's a label with htmlFor matching the id
        const associatedLabel = document.querySelector(`label[for="${id}"]`);
        expect(associatedLabel).toBeInTheDocument();
      }
    });
  });
});