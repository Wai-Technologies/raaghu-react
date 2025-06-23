import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPaymentDetail from '../src/rds-comp-payment-detail/rds-comp-payment-detail';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsRadioButton: ({ 
    itemList, 
    onChange, 
    value,
    ...props 
  }: any) => (
    <div data-testid="payment-method-radio-group">
      {itemList?.map((item: any, index: number) => (
        <label key={index} data-testid={`radio-option-${index}`}>
          <input
            type="radio"
            name="paymentMethod"
            value={item.value || item.label || item}
            checked={value === (item.value || item.label || item)}
            onChange={(e) => onChange && onChange(e.target.value)}
            data-testid={`radio-${item.value || item.label || item}`.toLowerCase().replace(/\s+/g, '-')}
          />
          {item.label || item.value || item}
        </label>
      ))}
    </div>
  ),
  RdsInput: ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    name, 
    required, 
    id,
    size,
    reset,
    ...props 
  }: any) => (
    <div data-testid={`input-container-${id}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={id}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    colorVariant, 
    type, 
    size, 
    isDisabled, 
    isOutline, 
    block,
    tooltipTitle,
    showLoadingSpinner,
    ...props 
  }: any) => (
    <button
      data-testid={`button-${label?.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${colorVariant} ${size} ${isOutline ? 'outline' : ''} ${block ? 'block' : ''}`}
      type={type}
      title={tooltipTitle}
      {...props}
    >
      {showLoadingSpinner && <span data-testid="loading-spinner">Loading...</span>}
      {label}
    </button>
  ),
  RdsSpinner: (props: any) => (
    <div data-testid="spinner" className="spinner">
      Loading...
    </div>
  ),
}));

describe('RdsCompPaymentDetail', () => {
  const mockPaymentModeList = [
    { label: 'Credit Card', value: 'Credit Card' },
    { label: 'eTransfer', value: 'eTransfer' },
    { label: 'PayPal', value: 'PayPal' }
  ];

  const mockPaymentDetails = {
    cardNumber: '',
    cardHolderName: '',
    cardExpirationDate: '',
    cardCvc: ''
  };

  const defaultProps = {
    buttonSpinner: false,
    paymentModeList: mockPaymentModeList,
    paymentDetails: mockPaymentDetails,
    reset: false,
    onSaveHandler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPaymentDetail />);
      }).not.toThrow();
    });

    it('should render all essential elements', () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      expect(screen.getByText('Payment details')).toBeInTheDocument();
      expect(screen.getByTestId('payment-method-radio-group')).toBeInTheDocument();
      expect(screen.getByTestId('txtCardNumber')).toBeInTheDocument();
      expect(screen.getByTestId('txtName')).toBeInTheDocument();
      expect(screen.getByTestId('txtExpirationDate')).toBeInTheDocument();
      expect(screen.getByTestId('txtCvc')).toBeInTheDocument();
      expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
      expect(screen.getByTestId('button-confirm')).toBeInTheDocument();
    });
  });

  describe('Payment Method Selection', () => {
    it('should handle payment method selection', () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      const creditCardRadio = screen.getByTestId('radio-credit-card');
      fireEvent.click(creditCardRadio);
      
      expect(creditCardRadio).toBeChecked();
    });

    it('should clear form data when switching to Credit Card', () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('txtCardNumber'), { target: { value: '1234567890123456' } });
      
      const creditCardRadio = screen.getByTestId('radio-credit-card');
      fireEvent.click(creditCardRadio);
      
      expect(screen.getByTestId('txtCardNumber')).toHaveValue('');
    });
  });

  describe('Form Input Handling', () => {
    it('should update all form fields when input changes', () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('txtCardNumber'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByTestId('txtName'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('txtExpirationDate'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('txtCvc'), { target: { value: '123' } });
      
      expect(screen.getByTestId('txtCardNumber')).toHaveValue('1234567890123456');
      expect(screen.getByTestId('txtName')).toHaveValue('John Doe');
      expect(screen.getByTestId('txtExpirationDate')).toHaveValue('12/25');
      expect(screen.getByTestId('txtCvc')).toHaveValue('123');
    });
  });

  describe('Form Validation', () => {
    it('should disable confirm button when form is incomplete', () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      const confirmButton = screen.getByTestId('button-confirm');
      expect(confirmButton).toBeDisabled();
    });

    it('should enable confirm button when all required fields are filled', async () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('txtCardNumber'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByTestId('txtName'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('txtExpirationDate'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('txtCvc'), { target: { value: '123' } });
      
      await waitFor(() => {
        const confirmButton = screen.getByTestId('button-confirm');
        expect(confirmButton).not.toBeDisabled();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call onSaveHandler when confirm button is clicked with valid data', async () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      fireEvent.click(screen.getByTestId('radio-credit-card'));
      fireEvent.change(screen.getByTestId('txtCardNumber'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByTestId('txtName'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('txtExpirationDate'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('txtCvc'), { target: { value: '123' } });
      
      await waitFor(() => {
        const confirmButton = screen.getByTestId('button-confirm');
        fireEvent.click(confirmButton);
      });
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        cardNumber: '1234567890123456',
        cardHolderName: 'John Doe',
        cardExpirationDate: '12/25',
        cardCvc: '123',
        selectedPaymentMethod: 'Credit Card'
      });
    });

    it('should reset form after successful submission', async () => {
      render(<RdsCompPaymentDetail {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('txtCardNumber'), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByTestId('txtName'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('txtExpirationDate'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('txtCvc'), { target: { value: '123' } });
      
      await waitFor(() => {
        const confirmButton = screen.getByTestId('button-confirm');
        fireEvent.click(confirmButton);
      });
      
      expect(screen.getByTestId('txtCardNumber')).toHaveValue('');
      expect(screen.getByTestId('txtName')).toHaveValue('');
      expect(screen.getByTestId('txtExpirationDate')).toHaveValue('');
      expect(screen.getByTestId('txtCvc')).toHaveValue('');
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPaymentDetail />);
      }).not.toThrow();
    });

    it('should update when paymentDetails prop changes', () => {
      const { rerender } = render(<RdsCompPaymentDetail {...defaultProps} />);
      
      const newDetails = {
        cardNumber: '9876543210987654',
        cardHolderName: 'Jane Smith',
        cardExpirationDate: '06/26',
        cardCvc: '456'
      };
      
      rerender(<RdsCompPaymentDetail {...defaultProps} paymentDetails={newDetails} />);
      
      expect(screen.getByTestId('txtCardNumber')).toHaveValue('9876543210987654');
      expect(screen.getByTestId('txtName')).toHaveValue('Jane Smith');
      expect(screen.getByTestId('txtExpirationDate')).toHaveValue('06/26');
      expect(screen.getByTestId('txtCvc')).toHaveValue('456');
    });

    it('should handle undefined props', () => {
      render(<RdsCompPaymentDetail {...defaultProps} paymentDetails={undefined} onSaveHandler={undefined} />);
      
      expect(screen.getByTestId('txtCardNumber')).toHaveValue('');
      expect(() => {
        fireEvent.click(screen.getByTestId('button-confirm'));
      }).not.toThrow();
    });
  });
});