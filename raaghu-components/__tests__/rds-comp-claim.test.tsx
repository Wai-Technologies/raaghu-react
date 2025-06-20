import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompClaim from '../src/rds-comp-claim/rds-comp-claim';

// Mock Bootstrap to prevent offcanvas errors
jest.mock('bootstrap', () => ({
  Offcanvas: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    toggle: jest.fn(),
    dispose: jest.fn(),
  })),
}));

// Mock Bootstrap modules to prevent any initialization
jest.mock('bootstrap/js/src/offcanvas', () => ({
  default: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    toggle: jest.fn(),
    dispose: jest.fn(),
  }))
}), { virtual: true });

jest.mock('bootstrap/js/src/util/component-functions', () => ({
  enableDismissTrigger: jest.fn(),
}), { virtual: true });

jest.mock('bootstrap/js/src/base-component', () => ({
  default: jest.fn().mockImplementation(() => ({})),
  getOrCreateInstance: jest.fn(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    toggle: jest.fn(),
  })),
}), { virtual: true });

// Mock the RdsButton component from rds-elements
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ label, onClick, colorVariant, size, databsdismiss, type, class: className, dataTestId }: any) => (
    <button 
      data-testid={dataTestId || `button-${label.toLowerCase()}`}
      onClick={onClick}
      className={`btn btn-${colorVariant} btn-${size} ${className}`}
      type={type}
      // Remove data-bs-dismiss to prevent Bootstrap errors
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
    claim: "default", // Required for the component to render the checkbox interface
    resources: mockResources,
    onCreate: mockOnCreate,
    onCancel: mockOnCancel
  };
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  beforeAll(() => {
    // Mock bootstrap object completely
    window.bootstrap = {
      Offcanvas: {
        getInstance: jest.fn(() => null),
        getOrCreateInstance: jest.fn(() => ({
          show: jest.fn(),
          hide: jest.fn(),
          toggle: jest.fn()
        }))
      }
    } as any;
  });

  afterAll(() => {
    // Clean up bootstrap mock
    if ('bootstrap' in window) {
      delete (window as any).bootstrap;
    }
    // Reset any other mocks
    jest.restoreAllMocks();
  });it('renders without crashing', () => {
    const { container } = render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    expect(container).toBeTruthy();
    
    // Verify that the main "Select all" checkbox is rendered by its ID
    const mainSelectAllCheckbox = document.getElementById('flexCheckDefault');
    expect(mainSelectAllCheckbox).toBeInTheDocument();
    
    // Verify that the associated label exists
    const mainSelectAllLabel = document.querySelector('label[for="flexCheckDefault"]');
    expect(mainSelectAllLabel).toBeInTheDocument();
    expect(mainSelectAllLabel).toHaveTextContent('Select all');
  });it('renders all resources and their children', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Check if all resource headings are rendered
    expect(screen.getByText('Resource 1')).toBeInTheDocument();
    expect(screen.getByText('Resource 2')).toBeInTheDocument();
    
    // Check if all children are rendered by their labels
    expect(screen.getByLabelText('Child 1-1')).toBeInTheDocument();
    expect(screen.getByLabelText('Child 1-2')).toBeInTheDocument();
    expect(screen.getByLabelText('Child 1-3')).toBeInTheDocument();
    expect(screen.getByLabelText('Child 2-1')).toBeInTheDocument();
    expect(screen.getByLabelText('Child 2-2')).toBeInTheDocument();
  });  it('toggles parent checkbox when clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Find the parent checkbox for Resource 1 by its ID (should be "0" based on the component code)
    const resource1Checkbox = document.getElementById('0') as HTMLInputElement;
    expect(resource1Checkbox).toBeTruthy();
    
    // Initially it should be unchecked
    expect(resource1Checkbox.checked).toBeFalsy();
    
    // Click the checkbox
    fireEvent.click(resource1Checkbox);
    
    // It should be checked now
    expect(resource1Checkbox.checked).toBeTruthy();
    
    // All children should also be checked (IDs: "00", "01", "02")
    const childCheckbox1 = document.getElementById('00') as HTMLInputElement;
    const childCheckbox2 = document.getElementById('01') as HTMLInputElement;
    const childCheckbox3 = document.getElementById('02') as HTMLInputElement;
    
    expect(childCheckbox1.checked).toBeTruthy();
    expect(childCheckbox2.checked).toBeTruthy();
    expect(childCheckbox3.checked).toBeTruthy();
    
    // Click again to uncheck
    fireEvent.click(resource1Checkbox);
    
    // Should be unchecked again
    expect(resource1Checkbox.checked).toBeFalsy();
    
    // All children should also be unchecked
    expect(childCheckbox1.checked).toBeFalsy();
    expect(childCheckbox2.checked).toBeFalsy();
    expect(childCheckbox3.checked).toBeFalsy();
  });  it('toggles child checkbox when clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Get a child checkbox (first child of Resource 1: "00")
    const childCheckbox = document.getElementById('00') as HTMLInputElement;
    expect(childCheckbox).toBeTruthy();
    
    // Initially it should be unchecked
    expect(childCheckbox.checked).toBeFalsy();
    
    // Click to check
    fireEvent.click(childCheckbox);
    
    // Should be checked now
    expect(childCheckbox.checked).toBeTruthy();
    
    // Parent should still be unchecked (since not all children are checked)
    const parentCheckbox = document.getElementById('0') as HTMLInputElement;
    expect(parentCheckbox.checked).toBeFalsy();
    
    // Check all siblings (Resource 1 has 3 children: "00", "01", "02")
    const childCheckbox2 = document.getElementById('01') as HTMLInputElement;
    const childCheckbox3 = document.getElementById('02') as HTMLInputElement;
    fireEvent.click(childCheckbox2);
    fireEvent.click(childCheckbox3);
    
    // Now parent should be checked as all children are checked
    expect(parentCheckbox.checked).toBeTruthy();
  });  it('toggles all checkboxes when "Select all" is clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Get the main "Select all" checkbox by its ID
    const selectAllCheckbox = document.getElementById('flexCheckDefault') as HTMLInputElement;
    expect(selectAllCheckbox).toBeTruthy();
    
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
  });  it('calls onCreate with updated resources when Save button is clicked', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Select a child checkbox
    const childCheckbox = document.getElementById('00') as HTMLInputElement;
    fireEvent.click(childCheckbox);
    
    // Get the Save button and simulate its onClick behavior directly
    const saveButton = screen.getByTestId('button-save');
    expect(saveButton).toBeInTheDocument();
    
    // Simulate the save action by calling the onClick handler directly
    // Since the button has an onClick that calls props.onCreate and resetForm
    fireEvent.click(saveButton);
    
    // Check if onCreate was called with the updated resources
    expect(mockOnCreate).toHaveBeenCalledTimes(1);
    
    // Check that the updated state was passed to onCreate
    const updatedResources = mockOnCreate.mock.calls[0][0];
    expect(updatedResources[0].children[0].selected).toBe(true); // Child 1-1 should be selected
    expect(updatedResources[0].selected).toBe(false); // Parent 1 should not be selected (not all children selected)
  });  it('resets form after saving', () => {
    render(<RdsCompClaim valueType={[]} {...defaultProps} />);
    
    // Select some checkboxes
    const childCheckbox1 = document.getElementById('00') as HTMLInputElement;
    const childCheckbox2 = document.getElementById('01') as HTMLInputElement;
    fireEvent.click(childCheckbox1);
    fireEvent.click(childCheckbox2);
    
    // Verify they are checked
    expect(childCheckbox1.checked).toBeTruthy();
    expect(childCheckbox2.checked).toBeTruthy();
    
    // Get the Save button and click it
    const saveButton = screen.getByTestId('button-save');
    fireEvent.click(saveButton);
    
    // Checkboxes should be reset to their original state
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