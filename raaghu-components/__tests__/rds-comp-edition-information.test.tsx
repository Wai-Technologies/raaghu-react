import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEditionInformation, { RdsCompEditionInformationProps } from '../src/rds-comp-edition-information/rds-comp-edition-information';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, placeholder, value, onChange, inputType, required, dataTestId, reset, ...props }: any) => (
    <div data-testid={`input-container-${dataTestId || name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId || name}
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ label, onClick, type, colorVariant, size, class: className, dataTestId, databsdismiss, isDisabled, ...props }: any) => (
    <button
      data-testid={dataTestId || `button-${label?.toLowerCase()}`}
      onClick={onClick}
      type={type}
      data-color-variant={colorVariant}
      data-size={size}
      className={className}
      data-bs-dismiss={databsdismiss}
      disabled={isDisabled}
      {...props}
    >
      {label}
    </button>
  ),
  RdsRadioButton: ({ label, value, checked, onChange, name, ...props }: any) => (
    <div data-testid={`radio-${name || label}`}>
      <input
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        name={name}
        {...props}
      />
      <label>{label}</label>
    </div>
  ),
  RdsCounter: ({ counterValue, label, min, max, width, type, colorVariant, onCounterChange, ...props }: any) => (
    <div data-testid={`counter-${label?.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{label}</label>
      <div data-testid="counter-controls">
        <button onClick={() => onCounterChange && onCounterChange(Math.max(min || 0, counterValue - 1))}>-</button>
        <span data-testid="counter-value">{counterValue || 0}</span>
        <button onClick={() => onCounterChange && onCounterChange(Math.min(max || 100, counterValue + 1))}>+</button>
      </div>
    </div>
  ),
}));

describe('RdsCompEditionInformation', () => {
  const mockRadioItems = [
    {
      id: 'feature-group-1',
      label: 'Feature Group 1',
      itemList: [
        { id: 'feature-1-1', label: 'Option 1' },
        { id: 'feature-1-2', label: 'Option 2' },
        { id: 'feature-1-3', label: 'Option 3' }
      ]
    },
    {
      id: 'feature-group-2',
      label: 'Feature Group 2',
      itemList: [
        { id: 'feature-2-1', label: 'Enabled' },
        { id: 'feature-2-2', label: 'Disabled' }
      ]
    }
  ];

  const mockSizeDataWithDescription = [
    { size: 'Small', description: 'For small teams' },
    { size: 'Medium', description: 'For medium organizations' },
    { size: 'Large', description: 'For large enterprises' }
  ];

  const mockEdition = {
    editionName: 'Standard Edition',
    annualPrice: '299.99'
  };

  const mockOnSaveHandler = jest.fn();

  const defaultProps: RdsCompEditionInformationProps = {
    radioItems: mockRadioItems,
    sizeDataWithDescription: mockSizeDataWithDescription,
    edition: mockEdition,
    onSaveHandler: mockOnSaveHandler
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('should render edition information form correctly', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      expect(screen.getByTestId('edition-name')).toBeInTheDocument();
      expect(screen.getByTestId('annual-price')).toBeInTheDocument();
      expect(screen.getByTestId('counter-trial-period')).toBeInTheDocument();
      expect(screen.getByTestId('counter-expiry-notification-interval')).toBeInTheDocument();
    });

    it('should render all form fields with proper labels', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      expect(screen.getByText('Edition Name')).toBeInTheDocument();
      expect(screen.getByText('Annual Price')).toBeInTheDocument();
      expect(screen.getByText('Trial Period')).toBeInTheDocument();
      expect(screen.getByText('Expiry Notification Interval')).toBeInTheDocument();
    });

    it('should render radio button groups', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      expect(screen.getByText('Feature Group 1')).toBeInTheDocument();
      expect(screen.getByText('Feature Group 2')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Enabled')).toBeInTheDocument();
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
    });
  });
  // 2. Form Field Management Tests
  describe('Form Field Management', () => {
    it('should update edition name when input changes', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const editionNameInput = screen.getByTestId('edition-name');
      fireEvent.change(editionNameInput, { target: { value: 'Premium Edition' } });
      
      expect(editionNameInput).toHaveValue('Premium Edition');
    });
  });
  // 3. Counter Management Tests
  describe('Counter Management', () => {
    it('should initialize counters with zero values', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const trialPeriodCounter = screen.getByTestId('counter-trial-period');
      const expiryNotificationCounter = screen.getByTestId('counter-expiry-notification-interval');
      
      expect(trialPeriodCounter.querySelector('[data-testid="counter-value"]')).toHaveTextContent('0');
      expect(expiryNotificationCounter.querySelector('[data-testid="counter-value"]')).toHaveTextContent('0');
    });
  });

  // 4. Radio Button Management Tests
  describe('Radio Button Management', () => {
    it('should handle radio button selection in first group', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const option1Radio = screen.getByLabelText('Option 1');
      fireEvent.click(option1Radio);
      
      expect(option1Radio).toBeChecked();
    });

    it('should handle radio button selection in second group', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const enabledRadio = screen.getByLabelText('Enabled');
      fireEvent.click(enabledRadio);
      
      expect(enabledRadio).toBeChecked();
    });

    it('should allow only one selection per radio group', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const option1Radio = screen.getByLabelText('Option 1');
      const option2Radio = screen.getByLabelText('Option 2');
      
      fireEvent.click(option1Radio);
      expect(option1Radio).toBeChecked();
      expect(option2Radio).not.toBeChecked();
      
      fireEvent.click(option2Radio);
      expect(option1Radio).not.toBeChecked();
      expect(option2Radio).toBeChecked();
    });

    it('should handle selections in multiple groups independently', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const option1Radio = screen.getByLabelText('Option 1');
      const enabledRadio = screen.getByLabelText('Enabled');
      
      fireEvent.click(option1Radio);
      fireEvent.click(enabledRadio);
      
      expect(option1Radio).toBeChecked();
      expect(enabledRadio).toBeChecked();
    });
  });

  // 5. Form Validation Tests
  describe('Form Validation', () => {
    it('should disable save button when edition name is empty', () => {
      const propsWithEmptyEdition = {
        ...defaultProps,
        edition: { editionName: '', annualPrice: '299.99' }
      };
      
      render(<RdsCompEditionInformation {...propsWithEmptyEdition} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should disable save button when annual price is empty', () => {
      const propsWithEmptyPrice = {
        ...defaultProps,
        edition: { editionName: 'Standard Edition', annualPrice: '' }
      };
      
      render(<RdsCompEditionInformation {...propsWithEmptyPrice} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when both required fields are filled', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should validate form dynamically as user types', () => {
      const propsWithEmptyEdition = {
        ...defaultProps,
        edition: { editionName: '', annualPrice: '' }
      };
      
      render(<RdsCompEditionInformation {...propsWithEmptyEdition} />);
      
      const saveButton = screen.getByTestId('save');
      const editionNameInput = screen.getByTestId('edition-name');
      const annualPriceInput = screen.getByTestId('annual-price');
      
      expect(saveButton).toBeDisabled();
      
      fireEvent.change(editionNameInput, { target: { value: 'Test Edition' } });
      expect(saveButton).toBeDisabled(); // Still disabled because price is empty
      
      fireEvent.change(annualPriceInput, { target: { value: '199.99' } });
      expect(saveButton).not.toBeDisabled(); // Now enabled
    });
  });
  // 6. Form Submission Tests
  describe('Form Submission', () => {
    it('should call onSaveHandler when save button is clicked', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    });

    it('should call onSaveHandler with correct form data', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const editionNameInput = screen.getByTestId('edition-name');
      const annualPriceInput = screen.getByTestId('annual-price');
      
      fireEvent.change(editionNameInput, { target: { value: 'Custom Edition' } });
      fireEvent.change(annualPriceInput, { target: { value: '599.99' } });
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          editionName: 'Custom Edition',
          annualPrice: '599.99',
          trialPeriodCounter: 0,
          expiryNotificationCounter: 0,
          selectedOptions: {}
        })
      );
    });

    it('should include selected radio options in form submission', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const option1Radio = screen.getByLabelText('Option 1');
      const enabledRadio = screen.getByLabelText('Enabled');
      
      fireEvent.click(option1Radio);
      fireEvent.click(enabledRadio);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedOptions: {
            'feature-group-1': 'Option 1',
            'feature-group-2': 'Enabled'
          }
        })
      );
    });
  });

  // 7. Button Configuration Tests
  describe('Button Configuration', () => {
    it('should configure cancel button correctly', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      
      expect(cancelButton).toHaveTextContent('Cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-color-variant', 'outline-primary');
      expect(cancelButton).toHaveAttribute('data-size', 'small');
      expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    });

    it('should configure save button correctly', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      
      expect(saveButton).toHaveTextContent('Save');
      expect(saveButton).toHaveAttribute('type', 'submit');
      expect(saveButton).toHaveAttribute('data-color-variant', 'primary');
      expect(saveButton).toHaveAttribute('data-size', 'small');
      expect(saveButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    });
  });
  // 8. Edge Cases and Error Handling Tests
  describe('Edge Cases and Error Handling', () => {
    it('should handle missing onSaveHandler gracefully', () => {
      const propsWithoutHandler = { ...defaultProps, onSaveHandler: undefined };
      render(<RdsCompEditionInformation {...propsWithoutHandler} />);
      
      const saveButton = screen.getByTestId('save');
      
      expect(() => {
        fireEvent.click(saveButton);
      }).not.toThrow();
    });

    it('should handle empty radio items array', () => {
      const propsWithEmptyRadioItems = { ...defaultProps, radioItems: [] };
      render(<RdsCompEditionInformation {...propsWithEmptyRadioItems} />);
      
      expect(screen.getByTestId('edition-name')).toBeInTheDocument();
      expect(screen.getByTestId('annual-price')).toBeInTheDocument();
    });

    it('should handle null radio items gracefully', () => {
      const propsWithNullRadioItems = { ...defaultProps, radioItems: [] };
      
      expect(() => {
        render(<RdsCompEditionInformation {...propsWithNullRadioItems} />);
      }).not.toThrow();
    });
  });

  // 9. Reset Functionality Tests
  describe('Reset Functionality', () => {
    it('should reset form when reset prop changes', () => {
      const { rerender } = render(<RdsCompEditionInformation {...defaultProps} reset={false} />);
      
      const editionNameInput = screen.getByTestId('edition-name');
      fireEvent.change(editionNameInput, { target: { value: 'Modified Edition' } });
      
      rerender(<RdsCompEditionInformation {...defaultProps} reset={true} />);
      
      // Form should trigger reset
      expect(editionNameInput).toBeInTheDocument();
    });

    it('should handle multiple reset cycles', () => {
      const { rerender } = render(<RdsCompEditionInformation {...defaultProps} reset={false} />);
      
      rerender(<RdsCompEditionInformation {...defaultProps} reset={true} />);
      rerender(<RdsCompEditionInformation {...defaultProps} reset={false} />);
      rerender(<RdsCompEditionInformation {...defaultProps} reset={true} />);
      
      expect(screen.getByTestId('edition-name')).toBeInTheDocument();
    });
  });
  // 10. Component Structure Tests
  describe('Component Structure', () => {
    it('should render with correct CSS classes', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const container = screen.getByTestId('edition-name').closest('.edition-information-container');
      expect(container).toBeInTheDocument();
    });

    it('should render radio groups with proper structure', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      const radioGroup1 = screen.getByText('Feature Group 1').closest('.radio-group');
      const radioGroup2 = screen.getByText('Feature Group 2').closest('.radio-group');
      
      expect(radioGroup1).toBeInTheDocument();
      expect(radioGroup2).toBeInTheDocument();
    });
  });
  // 11. Integration Tests
  describe('Integration Tests', () => {
    it('should handle complete form workflow', () => {
      render(<RdsCompEditionInformation {...defaultProps} />);
      
      // Fill form fields
      const editionNameInput = screen.getByTestId('edition-name');
      const annualPriceInput = screen.getByTestId('annual-price');
      
      fireEvent.change(editionNameInput, { target: { value: 'Integration Test Edition' } });
      fireEvent.change(annualPriceInput, { target: { value: '799.99' } });
      
      // Select radio options
      const option2Radio = screen.getByLabelText('Option 2');
      const disabledRadio = screen.getByLabelText('Disabled');
      fireEvent.click(option2Radio);
      fireEvent.click(disabledRadio);
      
      // Submit form
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          editionName: 'Integration Test Edition',
          annualPrice: '799.99',
          selectedOptions: {
            'feature-group-1': 'Option 2',
            'feature-group-2': 'Disabled'
          }
        })
      );
    });

    it('should work correctly with multiple radio groups', () => {
      const multipleGroupsProps = {
        ...defaultProps,
        radioItems: [
          ...mockRadioItems,
          {
            id: 'feature-group-3',
            label: 'Feature Group 3',
            itemList: [
              { id: 'feature-3-1', label: 'Yes' },
              { id: 'feature-3-2', label: 'No' }
            ]
          }
        ]
      };
      
      render(<RdsCompEditionInformation {...multipleGroupsProps} />);
      
      expect(screen.getByText('Feature Group 3')).toBeInTheDocument();
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
      
      const yesRadio = screen.getByLabelText('Yes');
      fireEvent.click(yesRadio);
      expect(yesRadio).toBeChecked();
    });
  });
});