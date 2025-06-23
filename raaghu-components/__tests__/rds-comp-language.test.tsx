import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompLanguage from '../src/rds-comp-language/rds-comp-language';
// import { InputSize } from "../../../raaghu-elements/src/rds-input/rds-input";

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsSelectList: ({ 
    id,
    label,
    selectItems,
    selectedValue,
    onChange,
    required,
    key
  }: any) => (
    <div data-testid={`select-wrapper-${id}`}>
      <label>{label}</label>
      <select
        data-testid={`select-${id}`}
        value={selectedValue}
        onChange={(e) => onChange({ value: e.target.value })}
        required={required}
      >
        <option value={selectedValue}>{selectedValue}</option>
        {selectItems && selectItems.map((item: any, index: number) => (
          <option key={index} value={item.value}>{item.option}</option>
        ))}
      </select>
    </div>
  ),
  RdsInput: ({ 
    size,
    name,
    label,
    placeholder,
    value,
    onChange,
    required,
    reset
  }: any) => (
    <div data-testid={`input-wrapper-${name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={`input-${name}`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
      />
    </div>
  ),
  RdsCheckbox: ({ 
    labelText,
    checked,
    onChange
  }: any) => (
    <div data-testid={`checkbox-wrapper-${labelText}`}>
      <input
        data-testid={`checkbox-${labelText}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label>{labelText}</label>
    </div>
  ),  RdsButton: ({ 
    label,
    type,
    colorVariant,
    size,
    databsdismiss,
    isOutline,
    isDisabled,
    onClick
  }: any) => (
    <button
      data-testid={`button-${label}`}
      type={type}
      className={`${colorVariant} ${size} ${isOutline ? 'outline' : ''}`}
      disabled={isDisabled}
      onClick={onClick ? (e) => { 
        // Prevent default to avoid bootstrap offcanvas behavior
        e.preventDefault();
        onClick(e);
      } : undefined}
    >
      {label}
    </button>
  )
}));

// Mock data for testing
const mockCultureList = [
  { option: "English (United States)", value: "en-US" },
  { option: "French (France)", value: "fr-FR" },
  { option: "Spanish (Spain)", value: "es-ES" }
];

const mockFlagIconList = [
  { option: "United States", value: "us" },
  { option: "France", value: "fr" },
  { option: "Spain", value: "es" }
];

describe('RdsCompLanguage Component', () => {
  // Test 1: Basic rendering
  test('renders all form elements correctly', () => {
    render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={false}
      />
    );
    
    // Check for all major elements
    expect(screen.getByTestId('select-langC')).toBeInTheDocument();
    expect(screen.getByTestId('select-langU')).toBeInTheDocument();
    expect(screen.getByTestId('select-langF')).toBeInTheDocument();
    expect(screen.getByTestId('input-Display Name')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-Is Enabled')).toBeInTheDocument();
    expect(screen.getByTestId('button-Save')).toBeInTheDocument();
    expect(screen.getByTestId('button-Cancel')).toBeInTheDocument();
    
    // Save button should be disabled initially
    expect(screen.getByTestId('button-Save')).toBeDisabled();
  });

  // Test 2: Editing mode
  test('renders in edit mode correctly', () => {
    render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={true}
        displayName="English"
        edit={true}
      />
    );
    
    // In edit mode, culture name and UI culture name fields should not be visible
    expect(screen.queryByTestId('select-langC')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-langU')).not.toBeInTheDocument();
    
    // Display name and flag icon should be visible
    expect(screen.getByTestId('input-Display Name')).toBeInTheDocument();
    expect(screen.getByTestId('select-langF')).toBeInTheDocument();
    
    // Display name should have the provided value
    expect(screen.getByTestId('input-Display Name')).toHaveValue('English');
    
    // Checkbox should be checked
    expect(screen.getByTestId('checkbox-Is Enabled')).toBeChecked();
    
    // Save button should be enabled since we have a display name
    expect(screen.getByTestId('button-Save')).not.toBeDisabled();
  });

  // Test 3: Form validation
  test('validates form and enables save button when all required fields are filled', async () => {
    render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={false}
      />
    );
    
    // Save button should be disabled initially
    expect(screen.getByTestId('button-Save')).toBeDisabled();
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('select-langC'), { target: { value: 'en-US' } });
    fireEvent.change(screen.getByTestId('select-langU'), { target: { value: 'en-US' } });
    fireEvent.change(screen.getByTestId('input-Display Name'), { target: { value: 'English' } });
    
    // Wait for validation to happen
    await waitFor(() => {
      // Save button should be enabled now
      expect(screen.getByTestId('button-Save')).not.toBeDisabled();
    });
  });

  // Test 4: Checkbox toggle
  test('toggles the isEnabled checkbox', () => {
    render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={false}
      />
    );
    
    // Checkbox should not be checked initially
    expect(screen.getByTestId('checkbox-Is Enabled')).not.toBeChecked();
    
    // Click the checkbox
    fireEvent.click(screen.getByTestId('checkbox-Is Enabled'));
    
    // Checkbox should be checked now
    expect(screen.getByTestId('checkbox-Is Enabled')).toBeChecked();
  });
  // Test 5: Save handler
  test('calls onSaveHandler with correct data when Save button is clicked', async () => {
    // Mock the emitSaveData function to avoid Bootstrap offcanvas issues
    const mockSaveHandler = jest.fn();
    
    // Create a custom render to access the component instance
    render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={mockSaveHandler}
        isEnabled={false}
      />
    );
    
    // Fill in required fields
    fireEvent.change(screen.getByTestId('select-langC'), { target: { value: 'en-US' } });
    fireEvent.change(screen.getByTestId('select-langU'), { target: { value: 'en-US' } });
    fireEvent.change(screen.getByTestId('input-Display Name'), { target: { value: 'English' } });
    fireEvent.change(screen.getByTestId('select-langF'), { target: { value: 'us' } });
    fireEvent.click(screen.getByTestId('checkbox-Is Enabled'));
    
    // Wait for validation to happen
    await waitFor(() => {
      expect(screen.getByTestId('button-Save')).not.toBeDisabled();
    });
    
    // Create a mock event
    const mockEvent = {
      preventDefault: jest.fn()
    };
    
    // Get the onClick handler and call it directly with the mock event
    // This bypasses the Bootstrap offcanvas initialization that's causing issues
    const saveButton = screen.getByTestId('button-Save');
    fireEvent.click(saveButton);
    
    // Check if onSaveHandler was called with correct data
    await waitFor(() => {
      expect(mockSaveHandler).toHaveBeenCalledWith(expect.objectContaining({
        isEnabled: true,
        cultureName: expect.any(String),
        cultureUIName: expect.any(String),
        displayName: 'English',
        id: undefined,
        flagIcon: expect.any(String)
      }));
    });
  });
  // Test 6: Reset functionality
  test('resets form when reset prop changes', async () => {
    // Mock the behavior of reset functionality
    const RdsInputMock = ({ reset, onChange, value }: any) => {
      React.useEffect(() => {
        if (reset) {
          onChange({ target: { value: '' } });
        }
      }, [reset]);
      
      return (
        <input 
          data-testid="input-Display Name"
          value={value || ''}
          onChange={onChange}
        />
      );
    };
    
    // Override the RdsInput mock just for this test
    const originalMock = jest.requireMock('../src/rds-elements').RdsInput;
    jest.requireMock('../src/rds-elements').RdsInput = RdsInputMock;
    
    const { rerender } = render(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={false}
        reset={false}
      />
    );
    
    // Fill in display name
    fireEvent.change(screen.getByTestId('input-Display Name'), { target: { value: 'English' } });
    expect(screen.getByTestId('input-Display Name')).toHaveValue('English');
    
    // Rerender with reset=true
    rerender(
      <RdsCompLanguage 
        cultureList={mockCultureList}
        flagIconList={mockFlagIconList}
        onSaveHandler={jest.fn()}
        isEnabled={false}
        reset={true}
      />
    );
    
    // Wait for the reset effect to apply
    await waitFor(() => {
      expect(screen.getByTestId('input-Display Name')).toHaveValue('');
    });
    
    // Restore the original mock
    jest.requireMock('../src/rds-elements').RdsInput = originalMock;
  });
});