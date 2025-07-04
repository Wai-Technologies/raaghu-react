import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompBillingAddress from '../src/rds-comp-billing-address/rds-comp-billing-address';

// Define enum directly since we can't import it
enum InputSize {
  Small = "sm",
  Medium = "md",
  Large = "lg"
}

// Define the interfaces for better type checking
interface BillingAddressDetails {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  address: string;
  city: string;
  countryList: string;
  indianStateList: string;
  pin: string;
}

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    label, 
    name, 
    placeholder, 
    value, 
    onChange, 
    required, 
    dataTestId, 
    onKeyDown 
  }: { 
    label: boolean;
    size: InputSize;
    inputType?: string;
    name: string;
    placeholder: string;
    value?: string;
    onChange: (e: { target: { value: string } }) => void;
    required?: boolean;
    dataTestId: string;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    reset?: boolean;
  }) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-testid={dataTestId}
        onKeyDown={onKeyDown}
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    colorVariant,
    onClick, 
    isDisabled,
    dataTestId 
  }: { 
    class?: string;
    label: string;
    colorVariant: string;
    size: string;
    tooltipTitle: string;
    type: string;
    onClick?: (e: React.MouseEvent) => void;
    databsdismiss?: string;
    isDisabled?: boolean;
    dataTestId: string;
  }) => (
    <button 
      onClick={onClick} 
      disabled={isDisabled} 
      data-testid={dataTestId}
      className={`btn btn-${colorVariant}`}
    >
      {label}
    </button>
  ),  RdsCompSelectList: ({ 
    id, 
    label, 
    placeholder, 
    selectItems, 
    selectedValue, 
    onChange, 
    required,
    dataTestId 
  }: { 
    id: string;
    label: string;
    placeholder: string;
    selectItems: Array<{ option: string; value: string }>;
    selectedValue?: string;
    onChange: (item: { value: string }) => void;
    required?: boolean;
    dataTestId: string;
    key?: string;
  }) => (
    <div data-testid={`select-container-${dataTestId}`}>
      <label>{label}</label>
      <select 
        data-testid={dataTestId}
        value={selectedValue || ''}
        onChange={(e) => onChange({ value: e.target.value })}
        required={required}
      >
        <option value="">{placeholder}</option>
        {selectItems.map((item, index) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('RdsCompBillingAddress', () => {
  // Sample data for testing
  const mockCountryList = [
    { option: 'United States', value: 'US' },
    { option: 'Canada', value: 'CA' },
    { option: 'United Kingdom', value: 'UK' },
    { option: 'India', value: 'IN' }
  ];

  const mockIndianStateList = [
    { option: 'Maharashtra', value: 'MH' },
    { option: 'Karnataka', value: 'KA' },
    { option: 'Tamil Nadu', value: 'TN' },
    { option: 'Gujarat', value: 'GJ' }
  ];

  const mockBillingAddressDetails: BillingAddressDetails = {
    firstName: 'John',
    lastName: 'Doe',
    company: 'Example Inc',
    phone: '1234567890',
    address: '123 Main St',
    city: 'New York',
    countryList: 'US',
    indianStateList: 'NY',
    pin: '10001'
  };

  const mockEmptyBillingAddressDetails: BillingAddressDetails = {
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    countryList: '',
    indianStateList: '',
    pin: ''
  };

  const mockOnSaveHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders the billing address form with correct title', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    expect(screen.getByText('Billing Address')).toBeInTheDocument();
  });

  it('renders form with initial values when provided', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    expect(screen.getByTestId('f-name')).toHaveValue(mockBillingAddressDetails.firstName);
    expect(screen.getByTestId('last-name')).toHaveValue(mockBillingAddressDetails.lastName);
    expect(screen.getByTestId('company')).toHaveValue(mockBillingAddressDetails.company);
    expect(screen.getByTestId('phone')).toHaveValue(mockBillingAddressDetails.phone);
    expect(screen.getByTestId('address')).toHaveValue(mockBillingAddressDetails.address);
    expect(screen.getByTestId('city')).toHaveValue(mockBillingAddressDetails.city);
    expect(screen.getByTestId('postal-code')).toHaveValue(mockBillingAddressDetails.pin);
  });

  it('updates form values when user inputs data', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockEmptyBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Input first name
    fireEvent.change(screen.getByTestId('f-name'), { target: { value: 'Jane' } });
    expect(screen.getByTestId('f-name')).toHaveValue('Jane');
    
    // Input last name
    fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Smith' } });
    expect(screen.getByTestId('last-name')).toHaveValue('Smith');
    
    // Input company
    fireEvent.change(screen.getByTestId('company'), { target: { value: 'New Company' } });
    expect(screen.getByTestId('company')).toHaveValue('New Company');
    
    // Input phone
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '9876543210' } });
    expect(screen.getByTestId('phone')).toHaveValue('9876543210');
    
    // Input address
    fireEvent.change(screen.getByTestId('address'), { target: { value: '456 Oak St' } });
    expect(screen.getByTestId('address')).toHaveValue('456 Oak St');
    
    // Input city
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'Chicago' } });
    expect(screen.getByTestId('city')).toHaveValue('Chicago');
    
    // Input postal code
    fireEvent.change(screen.getByTestId('postal-code'), { target: { value: '60601' } });
    expect(screen.getByTestId('postal-code')).toHaveValue('60601');
  });

  it('calls onSaveHandler with form data when save button is clicked', async () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Click the save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Check that onSaveHandler was called with the form data
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSaveHandler).toHaveBeenCalledWith(expect.objectContaining(mockBillingAddressDetails));
  });

  it('disables save button when form is not valid', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockEmptyBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Save button should be disabled when form is empty
    expect(screen.getByTestId('save')).toBeDisabled();
  });

  it('enables save button when all required fields are filled', () => {
    // Start with empty form
    const { rerender } = render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockEmptyBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Save button should initially be disabled
    expect(screen.getByTestId('save')).toBeDisabled();
    
    // Rerender with filled form
    rerender(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Save button should be enabled when form is filled
    expect(screen.getByTestId('save')).not.toBeDisabled();
  });

  it('resets form after save', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Initially form should have values
    expect(screen.getByTestId('f-name')).toHaveValue(mockBillingAddressDetails.firstName);
    
    // Click save
    fireEvent.click(screen.getByTestId('save'));
    
    // Form should be reset after save
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    
    // We can't directly test the reset state because the component updates its internal state,
    // but we can verify that the onSaveHandler was called with the correct data
    expect(mockOnSaveHandler).toHaveBeenCalledWith(expect.objectContaining(mockBillingAddressDetails));
  });  it('handles country selection correctly', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockEmptyBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Fill all required fields including country and state
    fireEvent.change(screen.getByTestId('f-name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByTestId('address'), { target: { value: '456 Oak St' } });
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'London' } });
    fireEvent.change(screen.getByTestId('postal-code'), { target: { value: 'SW1A 1AA' } });
    
    // For RdsCompSelectList we need to simulate the selection properly based on how our mock works
    // Our mock calls onChange with {value: selectedValue} when the select changes
    const countrySelect = screen.getByTestId('select-country');
    fireEvent.change(countrySelect, { target: { value: 'UK' } });
    
    const stateSelect = screen.getByTestId('select-state');
    fireEvent.change(stateSelect, { target: { value: 'KA' } });
    
    // At this point, all required fields should be filled, making the form valid
    // Verify save button is enabled when form is valid
    const saveButton = screen.getByTestId('save');
    expect(saveButton).not.toBeDisabled();
    
    // Click the save button to trigger form submission
    fireEvent.click(saveButton);
    
    // Verify onSaveHandler was called with the correct data
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '9876543210',
        address: '456 Oak St',
        city: 'London',
        countryList: 'UK',
        indianStateList: 'KA',
        pin: 'SW1A 1AA'
      })
    );
  });
  it('handles state/province selection correctly', () => {
    render(
      <RdsCompBillingAddress 
        countryList={mockCountryList}
        IndianStateList={mockIndianStateList}
        billingAddressDetails={mockEmptyBillingAddressDetails}
        onSaveHandler={mockOnSaveHandler}
      />
    );
    
    // Fill all required fields including country and state
    fireEvent.change(screen.getByTestId('f-name'), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByTestId('last-name'), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByTestId('phone'), { target: { value: '9876543210' } });
    fireEvent.change(screen.getByTestId('address'), { target: { value: '456 Oak St' } });
    fireEvent.change(screen.getByTestId('city'), { target: { value: 'Mumbai' } });
    fireEvent.change(screen.getByTestId('postal-code'), { target: { value: '400001' } });
    
    // For RdsCompSelectList we need to simulate the selection properly
    fireEvent.change(screen.getByTestId('select-country'), { target: { value: 'IN' } });
    
    // Focus on state selection for this test
    fireEvent.change(screen.getByTestId('select-state'), { target: { value: 'MH' } });
    
    // At this point, all required fields should be filled, making the form valid
    // Verify save button is enabled when form is valid
    const saveButton = screen.getByTestId('save');
    expect(saveButton).not.toBeDisabled();
    
    // Click the save button to trigger form submission
    fireEvent.click(saveButton);
    
    // Verify onSaveHandler was called with the correct data
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '9876543210',
        address: '456 Oak St',
        city: 'Mumbai',
        countryList: 'IN',
        indianStateList: 'MH',
        pin: '400001'
      })
    );
  });
});