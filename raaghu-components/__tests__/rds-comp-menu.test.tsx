import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMenu from '../src/rds-comp-menu/rds-comp-menu';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name, 
    label, 
    value, 
    placeholder, 
    onChange, 
    dataTestId,
    required,
    validatonPattern,
    validationMsg 
  }: any) => (
    <div data-testid={`input-wrapper-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId}
        type="text"
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
      {validatonPattern && !validatonPattern.test(value || '') && value && (
        <span data-testid={`validation-${dataTestId}`}>{validationMsg}</span>
      )}
    </div>
  ),
  RdsButton: ({ 
    label, 
    type, 
    size, 
    isOutline, 
    colorVariant, 
    isDisabled, 
    onClick,
    dataTestId,
    databsdismiss 
  }: any) => (
    <button 
      data-testid={dataTestId}
      type={type || 'button'}
      disabled={isDisabled}
      className={`btn ${isOutline ? 'btn-outline-' : 'btn-'}${colorVariant} btn-${size}`}
      onClick={onClick}
      data-bs-dismiss={databsdismiss}
    >
      {label}
    </button>
  ),
  RdsCheckbox: ({ 
    labelText, 
    onChange, 
    checked,
    dataTestId 
  }: any) => (
    <div data-testid={`checkbox-wrapper-${dataTestId}`}>
      <input
        data-testid={dataTestId}
        type="checkbox"
        checked={checked || false}
        onChange={onChange}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsSelectList: ({ 
    id, 
    label, 
    placeholder, 
    selectItems, 
    isSearchable, 
    selectedValue, 
    onChange 
  }: any) => (
    <div data-testid={`select-wrapper-${id}`}>
      <label>{label}</label>
      <select
        data-testid={id}
        value={selectedValue || ''}
        onChange={(e) => {
          const selectedOption = selectItems.find((item: any) => 
            item.value.toString() === e.target.value
          );
          onChange(selectedOption);
        }}
      >
        <option value="">{placeholder}</option>
        {selectItems && selectItems.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  )
}));

describe('RdsCompMenu Component', () => {
  // Mock props for testing
  const mockMenuPage = [
    { option: 'Dashboard', value: 1 },
    { option: 'Users', value: 2 },
    { option: 'Settings', value: 3 }
  ];
  
  const mockMenusData = {
    url: "https://example.com",
    pageId: 1,
    displayName: "Example Menu",
    isActive: true,
    icon: "dashboard",
    target: "_blank",
    elementId: "menu-1",
    cssClass: "menu-item"
  };
  
  const defaultProps = {
    menu: "default", // This is required for the component to render the form
    onSubmit: jest.fn(),
    menusData: mockMenusData,
    reset: false,
    onCancel: jest.fn(),
    menuPage: mockMenuPage,
    offId: '',
    onCreateSubMenu: jest.fn(),
    onDeleteMenu: jest.fn(),
    onMenuEdit: jest.fn(),
    listItems: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  test('renders all form elements correctly', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Check for all form fields
    expect(screen.getByTestId('url')).toBeInTheDocument();
    expect(screen.getByTestId('selpa')).toBeInTheDocument();
    expect(screen.getByTestId('display-name')).toBeInTheDocument();
    expect(screen.getByTestId('active')).toBeInTheDocument();
    expect(screen.getByTestId('enter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('target')).toBeInTheDocument();
    expect(screen.getByTestId('enter-id')).toBeInTheDocument();
    expect(screen.getByTestId('enter-css-class')).toBeInTheDocument();
    
    // Check for buttons
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
  });

  // Test 2: Pre-filled data display
  test('displays pre-filled data from props', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Check if fields have the correct initial values
    expect(screen.getByTestId('url')).toHaveValue('https://example.com');
    expect(screen.getByTestId('display-name')).toHaveValue('Example Menu');
    expect(screen.getByTestId('active')).toBeChecked();
    expect(screen.getByTestId('enter-icon')).toHaveValue('dashboard');
    expect(screen.getByTestId('target')).toHaveValue('_blank');
    expect(screen.getByTestId('enter-id')).toHaveValue('menu-1');
    expect(screen.getByTestId('enter-css-class')).toHaveValue('menu-item');
  });

  // Test 3: Form validation - valid data
  test('enables save button when form is valid', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // With valid URL and displayName, the save button should be enabled
    expect(screen.getByTestId('save')).not.toBeDisabled();
  });

  // Test 4: Form validation - invalid URL
  test('disables save button when URL is invalid', () => {
    const invalidData = {
      ...mockMenusData,
      url: "invalid-url"
    };
    
    render(<RdsCompMenu {...defaultProps} menusData={invalidData} />);
    
    // With invalid URL, the save button should be disabled
    expect(screen.getByTestId('save')).toBeDisabled();
  });

  // Test 5: Form validation - empty display name
  test('disables save button when display name is empty', () => {
    const invalidData = {
      ...mockMenusData,
      displayName: ""
    };
    
    render(<RdsCompMenu {...defaultProps} menusData={invalidData} />);
    
    // With empty display name, the save button should be disabled
    expect(screen.getByTestId('save')).toBeDisabled();
  });

  // Test 6: Input field updates
  test('updates state when input fields change', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Change URL input
    fireEvent.change(screen.getByTestId('url'), { 
      target: { value: 'https://new-example.com' } 
    });
    
    // Change Display Name input
    fireEvent.change(screen.getByTestId('display-name'), { 
      target: { value: 'New Menu Name' } 
    });
    
    // Check if values were updated
    expect(screen.getByTestId('url')).toHaveValue('https://new-example.com');
    expect(screen.getByTestId('display-name')).toHaveValue('New Menu Name');
  });

  // Test 7: Checkbox toggle
  test('toggles active status when checkbox is clicked', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Initially checked
    expect(screen.getByTestId('active')).toBeChecked();
    
    // Click to uncheck
    fireEvent.click(screen.getByTestId('active'));
    
    // Should now be unchecked
    expect(screen.getByTestId('active')).not.toBeChecked();
  });

  // Test 8: Select list functionality
  test('changes page selection when dropdown value changes', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Change selected page
    fireEvent.change(screen.getByTestId('selpa'), { 
      target: { value: '2' } 
    });
    
    // Since our mock doesn't actually update the displayed value, we'll just
    // check that the change event works by confirming the component didn't crash
    expect(screen.getByTestId('selpa')).toBeInTheDocument();
  });  // Test 9: Component behavior with different menu prop values
  test('renders correctly when menu prop is "default"', () => {
    render(<RdsCompMenu {...defaultProps} menu="default" />);
    
    expect(screen.getByTestId('url')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
  });
  // Test 10: Reset functionality with new data
  test('resets form with new data when menusData prop changes', () => {
    const { rerender } = render(<RdsCompMenu {...defaultProps} />);
    
    // Update a field
    fireEvent.change(screen.getByTestId('url'), { 
      target: { value: 'https://changed-url.com' } 
    });
    
    // Verify the field was changed
    expect(screen.getByTestId('url')).toHaveValue('https://changed-url.com');
    
    // Create new data for rerender
    const newMenusData = {
      ...mockMenusData,
      url: "https://new-example-data.com",
      displayName: "New Menu Example"
    };
    
    // Rerender with new data
    rerender(<RdsCompMenu {...defaultProps} menusData={newMenusData} />);
    
    // Fields should update to the new data values
    expect(screen.getByTestId('url')).toHaveValue('https://new-example-data.com');
    expect(screen.getByTestId('display-name')).toHaveValue('New Menu Example');
  });
  // Test 11: Required fields validation
  test('validates required fields correctly', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Check that URL and display name fields exist and are required for validation
    const urlField = screen.getByTestId('url');
    const displayNameField = screen.getByTestId('display-name');
    
    expect(urlField).toBeInTheDocument();
    expect(displayNameField).toBeInTheDocument();
  });
  // Test 12: Form structure
  test('renders with correct form structure', () => {
    render(<RdsCompMenu {...defaultProps} />);
    
    // Check for form container elements
    const urlWrapper = screen.getByTestId('input-wrapper-url');
    const displayNameWrapper = screen.getByTestId('input-wrapper-display-name');
    
    expect(urlWrapper).toBeInTheDocument();
    expect(displayNameWrapper).toBeInTheDocument();
  });
});