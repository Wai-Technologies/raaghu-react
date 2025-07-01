import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompShippingAddress from '../src/rds-comp-shipping-address/rds-comp-shipping-address';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, inputType, placeholder, onChange, value, dataTestId, required, reset, isDisabled, readonly, onKeyDown }: any) => (
    <div data-testid={dataTestId || `input-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        data-reset={reset}
        disabled={isDisabled}
        readOnly={readonly}
        data-name={name}
      />
    </div>
  ),
  RdsCompSelectList: ({ id, label, placeholder, selectItems, selectedValue, onChange }: any) => (
    <div data-testid={`select-${label.toLowerCase()}`}>
      <label>{label}</label>
      <select 
        value={selectedValue || ''}
        onChange={(e) => {
          const selected = selectItems.find((item: any) => item.value === e.target.value);
          onChange(selected || { value: e.target.value });
        }}
        data-placeholder={placeholder}
      >
        <option value="">Select</option>
        {selectItems?.map((item: any, index: number) => (
          <option key={index} value={item.value}>
            {item.option}
          </option>
        ))}
      </select>
    </div>
  ),
  RdsButton: ({ label, colorVariant, size, type, onClick, isDisabled, isOutline }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={`button-${label.toLowerCase()}`}
      data-color-variant={colorVariant}
      data-size={size}
      data-outline={isOutline}
    >
      {label}
    </button>
  )
}));

describe('RdsCompShippingAddress Component', () => {
  const mockCountryList = [
    { option: 'United States', value: 'US' },
    { option: 'Canada', value: 'CA' },
    { option: 'United Kingdom', value: 'UK' }
  ];

  const mockShippingData = {
    firstName: 'John',
    lastName: 'Doe',
    company: 'ABC Corp',
    phone: '1234567890',
    address: '123 Main St',
    city: 'New York',
    country: 'US',
    state: 'NY',
    postalCode: '10001'
  };

  const defaultProps = {
    countryList: mockCountryList,
    onSaveHandler: jest.fn(),
    shippingAddressData: mockShippingData,
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      // Check for section heading
      expect(screen.getByText('Shipping Address')).toBeInTheDocument();
      
      // Check for form elements
      expect(screen.getByTestId('input-first-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-last-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-company')).toBeInTheDocument();
      expect(screen.getByTestId('input-phone')).toBeInTheDocument();
      expect(screen.getByTestId('input-address')).toBeInTheDocument();
      expect(screen.getByTestId('input-city')).toBeInTheDocument();
      expect(screen.getByTestId('select-country')).toBeInTheDocument();
      expect(screen.getByTestId('input-state/province')).toBeInTheDocument();
      expect(screen.getByTestId('input-postal-code')).toBeInTheDocument();
      
      // Check for buttons
      expect(screen.getByTestId('button-back')).toBeInTheDocument();
      expect(screen.getByTestId('button-save')).toBeInTheDocument();
    });

    it('should render with default values from props', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      // Check input values
      expect(screen.getByTestId('input-first-name').querySelector('input')).toHaveValue('John');
      expect(screen.getByTestId('input-last-name').querySelector('input')).toHaveValue('Doe');
      expect(screen.getByTestId('input-company').querySelector('input')).toHaveValue('ABC Corp');
      expect(screen.getByTestId('input-phone').querySelector('input')).toHaveValue('1234567890');
      expect(screen.getByTestId('input-address').querySelector('input')).toHaveValue('123 Main St');
      expect(screen.getByTestId('input-city').querySelector('input')).toHaveValue('New York');
      expect(screen.getByTestId('input-state/province').querySelector('input')).toHaveValue('NY');
      expect(screen.getByTestId('input-postal-code').querySelector('input')).toHaveValue('10001');
      
      // Check select value
      const countrySelect = screen.getByTestId('select-country').querySelector('select');
      expect(countrySelect).toHaveValue('US');
    });

    it('should render without data when shippingAddressData is not provided', () => {
      const propsWithoutData = {
        ...defaultProps,
        shippingAddressData: undefined
      };
      
      render(<RdsCompShippingAddress {...propsWithoutData} />);
      
      // All inputs should be empty
      expect(screen.getByTestId('input-first-name').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-last-name').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-company').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-phone').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-address').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-city').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-state/province').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-postal-code').querySelector('input')).toHaveValue('');
    });
  });

  describe('Form Validation', () => {
    it('should disable save button when form is invalid', () => {
      const invalidData = {
        ...mockShippingData,
        firstName: '' // Making the form invalid by clearing a required field
      };
      
      const propsWithInvalidData = {
        ...defaultProps,
        shippingAddressData: invalidData
      };
      
      render(<RdsCompShippingAddress {...propsWithInvalidData} />);
      
      expect(screen.getByTestId('button-save')).toBeDisabled();
    });

    it('should enable save button when form is valid', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      expect(screen.getByTestId('button-save')).not.toBeDisabled();
    });

    it('should validate all required fields', () => {
      const emptyData = {
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        address: '',
        city: '',
        country: '',
        state: '',
        postalCode: ''
      };
      
      const propsWithEmptyData = {
        ...defaultProps,
        shippingAddressData: emptyData
      };
      
      render(<RdsCompShippingAddress {...propsWithEmptyData} />);
      
      // Save button should be disabled when all fields are empty
      expect(screen.getByTestId('button-save')).toBeDisabled();
      
      // Fill in all required fields one by one and check if the form becomes valid when all are filled
      const fields = [
        'first-name', 'last-name', 'company', 'phone', 
        'address', 'city', 'state/province', 'postal-code'
      ];
      
      fields.forEach((field, index) => {
        fireEvent.change(screen.getByTestId(`input-${field}`).querySelector('input')!, { 
          target: { value: `Test ${field}` } 
        });
        
        // Save button should still be disabled until all fields are filled
        if (index < fields.length - 1) {
          expect(screen.getByTestId('button-save')).toBeDisabled();
        }
      });
      
      // Select a country
      const countrySelect = screen.getByTestId('select-country').querySelector('select');
      fireEvent.change(countrySelect!, { target: { value: 'US' } });
      
      // Now with all fields filled, save button should be enabled
      expect(screen.getByTestId('button-save')).not.toBeDisabled();
    });
  });

  describe('Form Interaction', () => {
    it('should update form data when input values change', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      const firstNameInput = screen.getByTestId('input-first-name').querySelector('input');
      fireEvent.change(firstNameInput!, { target: { value: 'Jane' } });
      
      expect(firstNameInput).toHaveValue('Jane');
    });

    it('should update form data when country selection changes', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      const countrySelect = screen.getByTestId('select-country').querySelector('select');
      fireEvent.change(countrySelect!, { target: { value: 'CA' } });
      
      expect(countrySelect).toHaveValue('CA');
    });    it('should call onSaveHandler with form data when save button is clicked', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      // Update a field
      const firstNameInput = screen.getByTestId('input-first-name').querySelector('input');
      fireEvent.change(firstNameInput!, { target: { value: 'Jane' } });
      
      // Click save button
      const saveButton = screen.getByTestId('button-save');
      fireEvent.click(saveButton);
      
      // Check if onSaveHandler was called with updated data
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        ...mockShippingData,
        firstName: 'Jane'
      });
    });

    it('should reset form after save', () => {
      render(<RdsCompShippingAddress {...defaultProps} />);
      
      // Click save button
      const saveButton = screen.getByTestId('button-save');
      fireEvent.click(saveButton);
      
      // All inputs should be reset
      expect(screen.getByTestId('input-first-name').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-last-name').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-company').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-phone').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-address').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-city').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-state/province').querySelector('input')).toHaveValue('');
      expect(screen.getByTestId('input-postal-code').querySelector('input')).toHaveValue('');
    });
  });

  describe('Props Handling', () => {
    it('should update component when shippingAddressData prop changes', async () => {
      const { rerender } = render(<RdsCompShippingAddress {...defaultProps} />);
      
      // Update the props with new shipping data
      const updatedShippingData = {
        ...mockShippingData,
        firstName: 'Jane',
        lastName: 'Smith'
      };
      
      rerender(<RdsCompShippingAddress {...defaultProps} shippingAddressData={updatedShippingData} />);
      
      // Check if the form inputs are updated
      await waitFor(() => {
        expect(screen.getByTestId('input-first-name').querySelector('input')).toHaveValue('Jane');
        expect(screen.getByTestId('input-last-name').querySelector('input')).toHaveValue('Smith');
      });
    });

    it('should handle reset prop changes', async () => {
      const { rerender } = render(<RdsCompShippingAddress {...defaultProps} reset={false} />);
      
      // Update a field
      const firstNameInput = screen.getByTestId('input-first-name').querySelector('input');
      fireEvent.change(firstNameInput!, { target: { value: 'Jane' } });
      
      // Update the reset prop
      rerender(<RdsCompShippingAddress {...defaultProps} reset={true} />);
      
      // This is mainly to ensure the component doesn't crash when reset prop changes
      // Since inputReset is an internal state, we can't directly test its value
    });

    it('should handle missing onSaveHandler prop', () => {
      const propsWithoutHandler = {
        ...defaultProps,
        onSaveHandler: undefined
      };
      
      render(<RdsCompShippingAddress {...propsWithoutHandler} />);
      
      // Update a field
      const firstNameInput = screen.getByTestId('input-first-name').querySelector('input');
      fireEvent.change(firstNameInput!, { target: { value: 'Jane' } });
      
      // Click save button
      const saveButton = screen.getByTestId('button-save');
      
      // Should not throw an error when clicked without handler
      expect(() => fireEvent.click(saveButton)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty countryList', () => {
      const propsWithEmptyCountryList = {
        ...defaultProps,
        countryList: []
      };
      
      expect(() => render(<RdsCompShippingAddress {...propsWithEmptyCountryList} />)).not.toThrow();
    });

    it('should handle partial form data', () => {
      const partialData = {
        firstName: 'John',
        // Missing other fields
      };
      
      const propsWithPartialData = {
        ...defaultProps,
        shippingAddressData: partialData
      };
      
      render(<RdsCompShippingAddress {...propsWithPartialData} />);
      
      // Only firstName should have a value
      expect(screen.getByTestId('input-first-name').querySelector('input')).toHaveValue('John');
      expect(screen.getByTestId('input-last-name').querySelector('input')).toHaveValue('');
      
      // Save button should be disabled because form is incomplete
      expect(screen.getByTestId('button-save')).toBeDisabled();
    });
  });
});
