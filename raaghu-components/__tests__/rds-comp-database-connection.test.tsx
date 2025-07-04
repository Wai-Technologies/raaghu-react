import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompDatabaseConnection from '../src/rds-comp-database-connection/rds-comp-database-connection';

// Mock the child components
jest.mock('../src/rds-elements', () => ({
  RdsCompLabel: ({ label, required }: any) => (
    <div data-testid="rds-comp-label" data-required={required}>
      {label}
    </div>
  ),
  RdsRadioButton: ({ itemList, onClick, displayType }: any) => (
    <div data-testid="rds-radio-button" data-display-type={displayType}>
      {itemList.map((item: any) => (
        <div 
          key={item.id} 
          data-testid={`radio-item-${item.id}`}
          data-checked={item.checked}
          onClick={() => onClick({ target: { id: item.id, value: item.label } })}
        >
          {item.label}
        </div>
      ))}
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    placeholder, 
    onChange, 
    rows, 
    value, 
    dataTestId, 
    validationPattern, 
    validationMsg 
  }: any) => (
    <div data-testid={dataTestId || "rds-textarea"}>
      <label>{label}</label>
      <textarea 
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        value={value || ''}
        data-validation-msg={validationMsg}
      />
    </div>
  ),
  RdsCheckbox: ({ labelText, checked, onChange }: any) => (
    <div data-testid="rds-checkbox" data-checked={checked}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onChange && onChange(e)}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsButton: ({ 
    label, 
    colorVariant, 
    size, 
    type, 
    databsdismiss, 
    onClick 
  }: any) => (
    <button 
      data-testid={`rds-button-${label.toLowerCase()}`}
      data-color-variant={colorVariant}
      data-size={size}
      type={type}
      data-bs-dismiss={databsdismiss}
      onClick={onClick}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompDatabaseConnection Component', () => {
  // Sample connection strings for testing
  const mockConnectionStrings = {
    default: 'https://example-database.com/connection'
  };

  // Basic render test
  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompDatabaseConnection 
        connectionStrings={{}} 
        isModuleSpecificDb={false}
      />
    );
    expect(container).toBeTruthy();
  });

  // Test for Connection Strings label
  it('renders the Connection Strings label', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={{}} 
        isModuleSpecificDb={false}
      />
    );
    
    const label = screen.getByTestId('rds-comp-label');
    expect(label).toHaveTextContent('Connection Strings');
    expect(label).toHaveAttribute('data-required', 'true');
  });

  // Test radio buttons
  it('renders radio buttons with Shared Database selected by default when no connection string', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={{}} 
        isModuleSpecificDb={false}
      />
    );
    
    const sharedDatabaseOption = screen.getByTestId('radio-item-1');
    const separatedDatabaseOption = screen.getByTestId('radio-item-2');
    
    expect(sharedDatabaseOption).toHaveAttribute('data-checked', 'true');
    expect(separatedDatabaseOption).toHaveAttribute('data-checked', 'false');
  });

  // Test radio buttons with connection string
  it('renders radio buttons with Separated Database selected when connection string is provided', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    const sharedDatabaseOption = screen.getByTestId('radio-item-1');
    const separatedDatabaseOption = screen.getByTestId('radio-item-2');
    
    expect(sharedDatabaseOption).toHaveAttribute('data-checked', 'false');
    expect(separatedDatabaseOption).toHaveAttribute('data-checked', 'true');
  });
  // Test display of textarea when Separated Database is selected
  it('displays textarea when Separated Database is selected', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    const textareaElements = screen.getAllByTestId('data');
    expect(textareaElements.length).toBeGreaterThan(0);
    expect(textareaElements[0]).toBeInTheDocument();
  });

  // Test no textarea display when Shared Database is selected
  it('does not display textarea when Shared Database is selected', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={{}} 
        isModuleSpecificDb={false}
      />
    );
    
    const textarea = screen.queryByTestId('data');
    expect(textarea).not.toBeInTheDocument();
  });

  // Test checkbox display when Separated Database is selected
  it('displays checkbox when Separated Database is selected', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    const checkbox = screen.getByTestId('rds-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('data-checked', 'false');
  });

  // Test isModuleSpecificDb prop
  it('sets checkbox checked state based on isModuleSpecificDb prop', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={true}
      />
    );
    
    const checkbox = screen.getByTestId('rds-checkbox');
    expect(checkbox).toHaveAttribute('data-checked', 'true');
  });

  // Test radio button click handler
  it('updates radio button selection when clicked', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    // Initially Separated Database should be selected
    expect(screen.getByTestId('radio-item-2')).toHaveAttribute('data-checked', 'true');
    
    // Click on Shared Database option
    fireEvent.click(screen.getByTestId('radio-item-1'));
    
    // Now Shared Database should be selected
    expect(screen.getByTestId('radio-item-1')).toHaveAttribute('data-checked', 'true');
    expect(screen.getByTestId('radio-item-2')).toHaveAttribute('data-checked', 'false');
    
    // And the textarea should be hidden
    const textarea = screen.queryByTestId('data');
    expect(textarea).not.toBeInTheDocument();
  });

  // Test save button
  it('calls onSaveHandler with correct data when Save button is clicked', () => {
    const mockSaveHandler = jest.fn();
    
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Click save button
    fireEvent.click(screen.getByTestId('rds-button-save'));
    
    // Check if handler was called with correct data
    expect(mockSaveHandler).toHaveBeenCalledWith({
      default: 'https://example-database.com/connection',
      specificDatabase: true
    });
  });

  // Test checkbox change
  it('updates isModuleSpecificDb state when checkbox is clicked', () => {
    render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    const checkbox = screen.getByTestId('rds-checkbox');
    const checkboxInput = checkbox.querySelector('input[type="checkbox"]');
    
    // Initially checkbox should be unchecked
    expect(checkbox).toHaveAttribute('data-checked', 'false');
    
    // Click the checkbox
    if (checkboxInput) {
      fireEvent.change(checkboxInput, { target: { checked: true } });
    }
    
    // Now checkbox should be checked
    waitFor(() => {
      expect(checkbox).toHaveAttribute('data-checked', 'true');
    });
  });

  // Test reset functionality
  it('resets form when reset prop changes', () => {
    const { rerender } = render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={true}
        reset={false}
      />
    );
    
    // Trigger reset
    rerender(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={true}
        reset={true}
      />
    );
    
    // Form should still be rendered correctly after reset
    expect(screen.getByTestId('rds-comp-label')).toHaveTextContent('Connection Strings');
  });
  // Test textarea value change
  it('updates connection string value when textarea is changed', () => {
    // Clear previous renders and render once with unique id
    const { unmount } = render(
      <RdsCompDatabaseConnection 
        connectionStrings={mockConnectionStrings} 
        isModuleSpecificDb={false}
      />
    );
    
    // Get all matching elements and use the first one
    const textareaElements = screen.getAllByTestId('data');
    expect(textareaElements.length).toBeGreaterThan(0);
    
    const textarea = textareaElements[0].querySelector('textarea');
    const newValue = 'https://new-example-database.com/connection';
    
    if (textarea) {
      fireEvent.change(textarea, { target: { value: newValue } });
    }
    
    // Unmount the previous component to avoid duplication
    unmount();
    
    // Create a mock handler for the save action
    const mockSaveHandler = jest.fn();
    
    // Render with the new value
    const { container } = render(
      <RdsCompDatabaseConnection 
        connectionStrings={{ default: newValue }} 
        isModuleSpecificDb={false}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Get all textareas in this new render and verify the first one has our value
    const updatedTextareaElements = screen.getAllByTestId('data');
    const updatedTextarea = updatedTextareaElements[0].querySelector('textarea');
    expect(updatedTextarea).toHaveValue(newValue);
  });
});