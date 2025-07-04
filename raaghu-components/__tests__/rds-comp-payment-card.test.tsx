import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPaymentCard from '../src/rds-comp-payment-card/rds-comp-payment-card';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    name, 
    required, 
    inputType,
    size,
    labelPosition,
    reset,
    id,
    ...props 
  }: any) => (
    <div data-testid={`input-container-${name?.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)|[/]/g, '')}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={name?.toLowerCase().replace(/\s+/g, '-').replace(/\(|\)|[/]/g, '')}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        type={inputType}
        required={required}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    colorVariant, 
    size, 
    isDisabled, 
    block, 
    showLoadingSpinner,
    type,
    isOutline,
    ...props 
  }: any) => (
    <button
      data-testid={`button-${label?.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
      className={`btn ${colorVariant} ${size} ${block ? 'block' : ''} ${isOutline ? 'outline' : ''}`}
      {...props}
    >
      {showLoadingSpinner && <span data-testid="loading-spinner">Loading...</span>}
      {label}
    </button>
  ),
  RdsCounter: ({ 
    counterValue, 
    onCounterChange, 
    min, 
    max, 
    colorVariant, 
    type, 
    width, 
    label,
    ...props 
  }: any) => (
    <div data-testid="counter">
      <button onClick={() => onCounterChange && onCounterChange(Math.max(min || 0, (counterValue || 0) - 1))}>-</button>
      <span data-testid="counter-value">{counterValue || 0}</span>
      <button onClick={() => onCounterChange && onCounterChange(Math.min(max || 100, (counterValue || 0) + 1))}>+</button>
    </div>
  ),
  RdsRadioButton: ({ 
    itemList, 
    onChange, 
    value, 
    customClass, 
    displayType, 
    label,
    ...props 
  }: any) => (
    <div data-testid="radio-group">
      {itemList?.map((item: any, index: number) => (
        <label key={index}>
          <input
            type="radio"
            name={`radio-${index}`}
            value={item.value || item.label}
            checked={item.checked || value === (item.value || item.label)}
            onChange={() => onChange && onChange(item.value || item.label)}
          />
          {item.label}
        </label>
      ))}
    </div>
  ),
  RdsCompPlandiscount: ({ discount, saveLabel, discountValue, ...props }: any) => (
    <div data-testid="plan-discount">
      <span>Discount: {discount}%</span>
      <span>Save: {discountValue}</span>
    </div>
  )
}));

describe('RdsCompPaymentCard', () => {
  const mockPaymentCardData = {
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  };

  const defaultProps = {
    paymentCardData: mockPaymentCardData,
    onSaveHandler: jest.fn(),
    reset: false,
    payment: 'card'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Card Payment Flow', () => {
    it('renders card payment form correctly', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('card-number')).toBeInTheDocument();
      expect(screen.getByTestId('cardholder-name')).toBeInTheDocument();
      expect(screen.getByTestId('expiry-date')).toBeInTheDocument();
      expect(screen.getByTestId('cvv')).toBeInTheDocument();
      expect(screen.getByTestId('button-pay-now')).toBeInTheDocument();
    });

    it('handles input changes for card form', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
      expect(cardNumberInput).toHaveValue('1234567890123456');

      const cardholderNameInput = screen.getByTestId('cardholder-name');
      fireEvent.change(cardholderNameInput, { target: { value: 'John Doe' } });
      expect(cardholderNameInput).toHaveValue('John Doe');
    });

    it('calls onSaveHandler when form is submitted with valid data', () => {
      const filledData = {
        cardNumber: '1234567890123456',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123'
      };
      
      render(<RdsCompPaymentCard {...defaultProps} paymentCardData={filledData} />);
      
      const payButton = screen.getByTestId('button-pay-now');
      fireEvent.click(payButton);
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalled();
    });
  });

  describe('Detail Payment Flow', () => {
    const detailProps = {
      ...defaultProps,
      payment: 'detail',
      paymentModeList: [
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'eTransfer', value: 'eTransfer' }
      ]
    };

    it('renders payment detail form correctly', () => {
      render(<RdsCompPaymentCard {...detailProps} />);
      
      expect(screen.getByText('Payment details')).toBeInTheDocument();
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
      expect(screen.getByTestId('card-number')).toBeInTheDocument();
      expect(screen.getByTestId('button-confirm')).toBeInTheDocument();
    });

    it('handles payment method selection', () => {
      render(<RdsCompPaymentCard {...detailProps} />);
      
      const radioInputs = screen.getAllByRole('radio');
      expect(radioInputs.length).toBeGreaterThan(0);
      
      fireEvent.click(radioInputs[0]);
      expect(radioInputs[0]).toBeChecked();
    });
  });

  describe('Default Summary Flow', () => {
    const summaryProps = {
      ...defaultProps,
      payment: 'default',
      summaryDetailsList: {
        planName: 'Basic Plan',
        licenseTenureName: '1 Year',
        licensePrice: 100,
        totalNetPrice: '$120'
      }
    };

    it('renders summary view correctly', () => {
      render(<RdsCompPaymentCard {...summaryProps} />);
      
      expect(screen.getByText('Summary')).toBeInTheDocument();
      expect(screen.getByText('License Details')).toBeInTheDocument();
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('1 Year')).toBeInTheDocument();
    });
  });

  describe('Tenure Payment Flow', () => {
    const tenureProps = {
      ...defaultProps,
      payment: 'tenure',
      paymentTenure: [
        { 
          id: 1, 
          licenseTenureName: '1 Year', 
          discountPercentage: 10, 
          discountAmount: 50,
          tenureCount: 12
        }
      ],
      sendTenureId: jest.fn(),
      developerCount: jest.fn()
    };

    it('renders tenure selection correctly', () => {
      render(<RdsCompPaymentCard {...tenureProps} />);
      
      expect(screen.getByText('Payment')).toBeInTheDocument();
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();
      expect(screen.getByTestId('counter')).toBeInTheDocument();
      expect(screen.getByTestId('button-proceed')).toBeInTheDocument();
    });

    it('handles counter changes', () => {
      render(<RdsCompPaymentCard {...tenureProps} />);
      
      const counterValue = screen.getByTestId('counter-value');
      const incrementButton = screen.getByText('+');
      
      expect(counterValue).toHaveTextContent('0');
      
      fireEvent.click(incrementButton);
      expect(tenureProps.developerCount).toHaveBeenCalledWith(1);
    });

    it('calls sendTenureId when tenure is selected', () => {
      render(<RdsCompPaymentCard {...tenureProps} />);
      
      const tenureDiv = screen.getByText('1 Year').closest('div');
      if (tenureDiv) {
        fireEvent.click(tenureDiv);
        expect(tenureProps.sendTenureId).toHaveBeenCalledWith(1, 12);
      }
    });
  });

  describe('Component Props Handling', () => {
    it('handles missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPaymentCard payment="card" />);
      }).not.toThrow();
    });

    it('updates when props change', () => {
      const { rerender } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      const newData = {
        cardNumber: '9876543210987654',
        cardHolderName: 'Jane Smith',
        expiryDate: '06/26',
        cvv: '456'
      };
      
      rerender(<RdsCompPaymentCard {...defaultProps} paymentCardData={newData} />);
      
      expect(screen.getByTestId('card-number')).toHaveValue('9876543210987654');
      expect(screen.getByTestId('cardholder-name')).toHaveValue('Jane Smith');
    });
  });
});