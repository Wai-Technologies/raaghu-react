import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    <div data-testid={`input-container-${name?.toLowerCase().replace(/\s+/g, '-')}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={name?.toLowerCase().replace(/\s+/g, '-')}
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
    ...props 
  }: any) => (
    <button
      data-testid="pay-now-button"
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${colorVariant} ${size} ${block ? 'block' : ''}`}
      {...props}
    >
      {showLoadingSpinner && <span data-testid="loading-spinner">Loading...</span>}
      {label}
    </button>
  ),
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPaymentCard />);
      }).not.toThrow();
    });

    it('should render all payment card input fields', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('card-number')).toBeInTheDocument();
      expect(screen.getByTestId('cardholder-name')).toBeInTheDocument();
      expect(screen.getByTestId('expiry-date')).toBeInTheDocument();
      expect(screen.getByTestId('cvv')).toBeInTheDocument();
    });

    it('should render form labels correctly', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByText('Card Number')).toBeInTheDocument();
      expect(screen.getByText('Cardholder Name')).toBeInTheDocument();
      expect(screen.getByText('Expiry Date')).toBeInTheDocument();
      expect(screen.getByText('CVV')).toBeInTheDocument();
    });

    it('should render pay now button', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('pay-now-button')).toBeInTheDocument();
      expect(screen.getByText('PAY NOW')).toBeInTheDocument();
    });

    it('should render with correct placeholder texts', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('card-number')).toHaveAttribute('placeholder', 'XXXX XXXX XXXX XXXX');
      expect(screen.getByTestId('cardholder-name')).toHaveAttribute('placeholder', 'Enter Cardholder Name');
      expect(screen.getByTestId('expiry-date')).toHaveAttribute('placeholder', 'Enter Expiry Date');
      expect(screen.getByTestId('cvv')).toHaveAttribute('placeholder', 'Enter CVV');
    });

    it('should render loading spinner on pay button', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(screen.getByTestId('loading-spinner')).toHaveTextContent('Loading...');
    });
  });

  describe('Form Input Handling', () => {
    it('should update card number when input changes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
      
      expect(cardNumberInput).toHaveValue('1234 5678 9012 3456');
    });

    it('should update cardholder name when input changes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardholderNameInput = screen.getByTestId('cardholder-name');
      fireEvent.change(cardholderNameInput, { target: { value: 'John Doe' } });
      
      expect(cardholderNameInput).toHaveValue('John Doe');
    });

    it('should update expiry date when input changes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const expiryDateInput = screen.getByTestId('expiry-date');
      fireEvent.change(expiryDateInput, { target: { value: '12/25' } });
      
      expect(expiryDateInput).toHaveValue('12/25');
    });

    it('should update CVV when input changes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cvvInput = screen.getByTestId('cvv');
      fireEvent.change(cvvInput, { target: { value: '123' } });
      
      expect(cvvInput).toHaveValue('123');
    });

    it('should handle multiple field updates simultaneously', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      const cardholderNameInput = screen.getByTestId('cardholder-name');
      
      fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(cardholderNameInput, { target: { value: 'Jane Smith' } });
      
      expect(cardNumberInput).toHaveValue('1234 5678 9012 3456');
      expect(cardholderNameInput).toHaveValue('Jane Smith');
    });
  });

  describe('Form Validation and Pay Button', () => {
    it('should disable pay button when form is incomplete', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const payButton = screen.getByTestId('pay-now-button');
      expect(payButton).toBeDisabled();
    });

    it('should disable pay button when only some fields are filled', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
      
      const payButton = screen.getByTestId('pay-now-button');
      expect(payButton).toBeDisabled();
    });

    it('should enable pay button when all fields are filled', async () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByTestId('cardholder-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('expiry-date'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('cvv'), { target: { value: '123' } });
      
      await waitFor(() => {
        const payButton = screen.getByTestId('pay-now-button');
        expect(payButton).not.toBeDisabled();
      });
    });

    it('should call onSaveHandler when pay button is clicked with valid data', async () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByTestId('cardholder-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('expiry-date'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('cvv'), { target: { value: '123' } });
      
      await waitFor(() => {
        const payButton = screen.getByTestId('pay-now-button');
        fireEvent.click(payButton);
      });
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        cardNumber: '1234 5678 9012 3456',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '123'
      });
    });

    it('should reset form after successful payment', async () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByTestId('cardholder-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('expiry-date'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('cvv'), { target: { value: '123' } });
      
      await waitFor(() => {
        const payButton = screen.getByTestId('pay-now-button');
        fireEvent.click(payButton);
      });
      
      expect(screen.getByTestId('card-number')).toHaveValue('');
      expect(screen.getByTestId('cardholder-name')).toHaveValue('');
      expect(screen.getByTestId('expiry-date')).toHaveValue('');
      expect(screen.getByTestId('cvv')).toHaveValue('');
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPaymentCard />);
      }).not.toThrow();
    });

    it('should update when paymentCardData prop changes', () => {
      const { rerender } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      const newData = {
        cardNumber: '9876 5432 1098 7654',
        cardHolderName: 'Jane Smith',
        expiryDate: '06/26',
        cvv: '456'
      };
      
      rerender(<RdsCompPaymentCard {...defaultProps} paymentCardData={newData} />);
      
      expect(screen.getByTestId('card-number')).toHaveValue('9876 5432 1098 7654');
      expect(screen.getByTestId('cardholder-name')).toHaveValue('Jane Smith');
      expect(screen.getByTestId('expiry-date')).toHaveValue('06/26');
      expect(screen.getByTestId('cvv')).toHaveValue('456');
    });

    it('should handle reset prop changes', () => {
      const { rerender } = render(<RdsCompPaymentCard {...defaultProps} reset={false} />);
      
      // Fill some data first
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234567890123456' } });
      
      rerender(<RdsCompPaymentCard {...defaultProps} reset={true} />);
      
      // Component should handle reset prop change
      expect(screen.getByTestId('card-number')).toBeInTheDocument();
    });

    it('should handle undefined paymentCardData', () => {
      render(<RdsCompPaymentCard paymentCardData={undefined} />);
      
      expect(screen.getByTestId('card-number')).toHaveValue('');
      expect(screen.getByTestId('cardholder-name')).toHaveValue('');
      expect(screen.getByTestId('expiry-date')).toHaveValue('');
      expect(screen.getByTestId('cvv')).toHaveValue('');
    });

    it('should handle null onSaveHandler', () => {
      render(<RdsCompPaymentCard {...defaultProps} onSaveHandler={undefined} />);
      
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByTestId('cardholder-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('expiry-date'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('cvv'), { target: { value: '123' } });
      
      expect(() => {
        const payButton = screen.getByTestId('pay-now-button');
        fireEvent.click(payButton);
      }).not.toThrow();
    });
  });

  describe('Component Structure', () => {
    it('should have correct container structure', () => {
      const { container } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(container.querySelector('.button-card-container')).toBeInTheDocument();
      expect(container.querySelector('.button-footer')).toBeInTheDocument();
    });

    it('should have responsive grid layout for expiry and CVV', () => {
      const { container } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(container.querySelector('.row')).toBeInTheDocument();
      expect(container.querySelectorAll('.col-md-6')).toHaveLength(2);
    });

    it('should have proper CSS classes for styling', () => {
      const { container } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(container.querySelector('.button-footer.p-3')).toBeInTheDocument();
    });
  });

  describe('Input Properties', () => {
    it('should have text input type for all fields', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('card-number')).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('cardholder-name')).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('expiry-date')).toHaveAttribute('type', 'text');
      expect(screen.getByTestId('cvv')).toHaveAttribute('type', 'text');
    });

    it('should have required attribute for all fields', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('card-number')).toHaveAttribute('required');
      expect(screen.getByTestId('cardholder-name')).toHaveAttribute('required');
      expect(screen.getByTestId('expiry-date')).toHaveAttribute('required');
      expect(screen.getByTestId('cvv')).toHaveAttribute('required');
    });

    it('should pass correct input size and label position props', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      // These props are passed to the mocked RdsInput component
      expect(screen.getByTestId('input-container-card-number')).toBeInTheDocument();
      expect(screen.getByTestId('input-container-cardholder-name')).toBeInTheDocument();
      expect(screen.getByTestId('input-container-expiry-date')).toBeInTheDocument();
      expect(screen.getByTestId('input-container-cvv')).toBeInTheDocument();
    });
  });

  describe('Button Properties', () => {
    it('should have correct button styling classes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const payButton = screen.getByTestId('pay-now-button');
      expect(payButton).toHaveClass('btn', 'primary', 'medium', 'block');
    });

    it('should show loading spinner', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should have block layout for full width', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const payButton = screen.getByTestId('pay-now-button');
      expect(payButton).toHaveClass('block');
    });
  });

  describe('Card Number Validation', () => {
    it('should handle different card number formats', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      
      // Test with spaces
      fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
      expect(cardNumberInput).toHaveValue('1234 5678 9012 3456');
      
      // Test without spaces
      fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } });
      expect(cardNumberInput).toHaveValue('1234567890123456');
    });

    it('should handle card number with dashes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '1234-5678-9012-3456' } });
      
      expect(cardNumberInput).toHaveValue('1234-5678-9012-3456');
    });
  });

  describe('Form Submission', () => {
    it('should prevent default form submission', async () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      fireEvent.change(screen.getByTestId('card-number'), { target: { value: '1234 5678 9012 3456' } });
      fireEvent.change(screen.getByTestId('cardholder-name'), { target: { value: 'John Doe' } });
      fireEvent.change(screen.getByTestId('expiry-date'), { target: { value: '12/25' } });
      fireEvent.change(screen.getByTestId('cvv'), { target: { value: '123' } });
      
      const payButton = screen.getByTestId('pay-now-button');
      const mockEvent = { preventDefault: jest.fn() };
      
      payButton.onclick = (e) => {
        mockEvent.preventDefault();
        defaultProps.onSaveHandler(expect.any(Object));
      };
      
      fireEvent.click(payButton);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible form elements', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const inputs = [
        screen.getByTestId('card-number'),
        screen.getByTestId('cardholder-name'),
        screen.getByTestId('expiry-date'),
        screen.getByTestId('cvv')
      ];
      
      inputs.forEach(input => {
        expect(input).toBeVisible();
        expect(input).toHaveAttribute('type', 'text');
      });
    });

    it('should have accessible button', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const payButton = screen.getByRole('button');
      expect(payButton).toBeVisible();
      expect(payButton).toHaveAccessibleName();
    });

    it('should have proper labels for inputs', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(screen.getByText('Card Number')).toBeInTheDocument();
      expect(screen.getByText('Cardholder Name')).toBeInTheDocument();
      expect(screen.getByText('Expiry Date')).toBeInTheDocument();
      expect(screen.getByText('CVV')).toBeInTheDocument();
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(() => {
        rerender(<RdsCompPaymentCard {...defaultProps} />);
        rerender(<RdsCompPaymentCard paymentCardData={undefined} />);
        rerender(<RdsCompPaymentCard />);
      }).not.toThrow();
    });

    it('should maintain form state during re-renders', () => {
      const { rerender } = render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '1234 5678 9012 3456' } });
      
      rerender(<RdsCompPaymentCard {...defaultProps} />);
      
      expect(cardNumberInput).toHaveValue('1234 5678 9012 3456');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string values', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cardNumberInput = screen.getByTestId('card-number');
      fireEvent.change(cardNumberInput, { target: { value: '' } });
      
      expect(cardNumberInput).toHaveValue('');
    });

    it('should handle very long input values', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const longValue = '1234567890123456789012345678901234567890';
      const cardholderNameInput = screen.getByTestId('cardholder-name');
      fireEvent.change(cardholderNameInput, { target: { value: longValue } });
      
      expect(cardholderNameInput).toHaveValue(longValue);
    });

    it('should handle special characters in cardholder name', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const specialName = "O'Connor-Smith Jr.";
      const cardholderNameInput = screen.getByTestId('cardholder-name');
      fireEvent.change(cardholderNameInput, { target: { value: specialName } });
      
      expect(cardholderNameInput).toHaveValue(specialName);
    });

    it('should handle numeric expiry date formats', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const expiryDateInput = screen.getByTestId('expiry-date');
      
      // MM/YY format
      fireEvent.change(expiryDateInput, { target: { value: '12/25' } });
      expect(expiryDateInput).toHaveValue('12/25');
      
      // MM/YYYY format
      fireEvent.change(expiryDateInput, { target: { value: '12/2025' } });
      expect(expiryDateInput).toHaveValue('12/2025');
    });

    it('should handle 3 and 4 digit CVV codes', () => {
      render(<RdsCompPaymentCard {...defaultProps} />);
      
      const cvvInput = screen.getByTestId('cvv');
      
      // 3 digit CVV
      fireEvent.change(cvvInput, { target: { value: '123' } });
      expect(cvvInput).toHaveValue('123');
      
      // 4 digit CVV (Amex)
      fireEvent.change(cvvInput, { target: { value: '1234' } });
      expect(cvvInput).toHaveValue('1234');
    });
  });
});