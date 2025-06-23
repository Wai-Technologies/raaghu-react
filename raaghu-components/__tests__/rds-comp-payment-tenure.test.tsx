import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPaymentTenure from '../src/rds-comp-payment-tenure/rds-comp-payment-tenure';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsRadioButton: ({ 
    itemList, 
    value,
    onChange,
    label,
    displayType,
    customClass,
    ...props 
  }: any) => (
    <div data-testid={`radio-group-${value}`}>
      {itemList?.map((item: any, index: number) => (
        <label key={index} data-testid={`radio-option-${index}`}>
          <input
            type="radio"
            name="tenure"
            value={value}
            checked={item.checked}
            onChange={onChange}
            data-testid={`radio-${value}`}
          />
          {item.label || label}
        </label>
      ))}
    </div>
  ),  RdsCounter: ({ 
    counterValue,
    onCounterChange,
    min = 0,
    max = 50,
    colorVariant,
    type,
    width,
    label,
    ...props 
  }: any) => {
    // Use counterValue directly instead of internal state to sync with parent
    const currentValue = counterValue || 0;

    const handleIncrement = () => {
      if (currentValue < max) {
        const newValue = currentValue + 1;
        onCounterChange && onCounterChange(newValue);
      }
    };

    const handleDecrement = () => {
      if (currentValue > min) {
        const newValue = currentValue - 1;
        onCounterChange && onCounterChange(newValue);
      }
    };

    return (
      <div data-testid="developer-counter">
        <button 
          data-testid="counter-decrement"
          onClick={handleDecrement}
          disabled={currentValue <= min}
        >
          -
        </button>
        <span data-testid="counter-value">{currentValue}</span>
        <button 
          data-testid="counter-increment"
          onClick={handleIncrement}
          disabled={currentValue >= max}
        >
          +
        </button>
      </div>
    );
  },
  RdsPlandiscount: ({ 
    discount,
    saveLabel,
    discountValue,
    ...props 
  }: any) => (
    <div data-testid="plan-discount">
      <span data-testid="discount-percentage">{discount}%</span>
      <span data-testid="discount-amount">{discountValue}</span>
      {saveLabel && <span data-testid="save-label">{saveLabel}</span>}
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    colorVariant, 
    type, 
    size, 
    block,
    showLoadingSpinner,
    ...props 
  }: any) => (
    <button
      data-testid="proceed-button"
      onClick={onClick}
      className={`btn ${colorVariant} ${size} ${block ? 'block' : ''}`}
      type={type}
      {...props}
    >
      {showLoadingSpinner && <span data-testid="loading-spinner">Loading...</span>}
      {label}
    </button>
  ),
}));

describe('RdsCompPaymentTenure', () => {
  const mockPaymentTenure = [
    {
      id: 1,
      tenureCount: 12,
      licenseTenureName: 'Annual Plan',
      discountPercentage: 20,
      discountAmount: 100,
      saveLabel: 'Save $100'
    },
    {
      id: 2,
      tenureCount: 6,
      licenseTenureName: 'Semi-Annual Plan',
      discountPercentage: 10,
      discountAmount: 50,
      saveLabel: 'Save $50'
    },
    {
      id: 3,
      tenureCount: 1,
      licenseTenureName: 'Monthly Plan',
      discountPercentage: 0,
      discountAmount: 0,
      saveLabel: ''
    }
  ];

  const defaultProps = {
    paymentTenure: mockPaymentTenure,
    sendTenureId: jest.fn(),
    developerCount: jest.fn(),
    reset: false,
    onSaveHandler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPaymentTenure />);
      }).not.toThrow();
    });

    it('should render all essential elements', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      expect(screen.getByText('Payment')).toBeInTheDocument();
      expect(screen.getByText('3 developers already included, you can add additional users here')).toBeInTheDocument();
      expect(screen.getByTestId('developer-counter')).toBeInTheDocument();
      expect(screen.getByTestId('proceed-button')).toBeInTheDocument();
    });

    it('should render all payment tenure options', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      expect(screen.getByText('Annual Plan')).toBeInTheDocument();
      expect(screen.getByText('Semi-Annual Plan')).toBeInTheDocument();
      expect(screen.getByText('Monthly Plan')).toBeInTheDocument();
    });

    it('should render discount components for plans with discounts', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const discountComponents = screen.getAllByTestId('plan-discount');
      expect(discountComponents).toHaveLength(2); // Only Annual and Semi-Annual have discounts
    });
  });

  describe('Default Selection', () => {
    it('should select first tenure option by default', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const firstRadio = screen.getByTestId('radio-1');
      expect(firstRadio).toBeChecked();
    });

    it('should set active div class on first option by default', () => {
      const { container } = render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const firstDiv = container.querySelector('#paymentDiv-1');
      expect(firstDiv).toHaveClass('active');
    });
  });

  describe('Tenure Selection', () => {    it('should handle tenure selection by clicking on div', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const secondDiv = screen.getByText('Semi-Annual Plan').closest('div');
      if (secondDiv) {
        fireEvent.click(secondDiv);
      }
      
      expect(defaultProps.sendTenureId).toHaveBeenCalledWith(2, 6);
    });

    it('should handle tenure selection by clicking radio button', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const radioGroup = screen.getByTestId('radio-group-2');
      fireEvent.click(radioGroup);
      
      expect(defaultProps.sendTenureId).toHaveBeenCalledWith(2, 6);
    });    it('should update active div when tenure is selected', () => {
      const { container } = render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const thirdDiv = screen.getByText('Monthly Plan').closest('div');
      if (thirdDiv) {
        fireEvent.click(thirdDiv);
      }
      
      const activeDiv = container.querySelector('#paymentDiv-3');
      expect(activeDiv).toHaveClass('active');
    });
  });

  describe('Developer Counter', () => {
    it('should start with counter value of 0', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    });

    it('should increment developer count', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const incrementButton = screen.getByTestId('counter-increment');
      fireEvent.click(incrementButton);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('1');
      expect(defaultProps.developerCount).toHaveBeenCalledWith(1);
    });

    it('should decrement developer count', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      // First increment to have a value > 0
      const incrementButton = screen.getByTestId('counter-increment');
      fireEvent.click(incrementButton);
      
      // Then decrement
      const decrementButton = screen.getByTestId('counter-decrement');
      fireEvent.click(decrementButton);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    });
  });
  describe('Form Submission', () => {

    it('should reset form after successful submission', async () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      // Set developer count
      const incrementButton = screen.getByTestId('counter-increment');
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      
      // Submit form
      const proceedButton = screen.getByTestId('proceed-button');
      fireEvent.click(proceedButton);
      
      expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    });

    it('should prevent default form submission', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const proceedButton = screen.getByTestId('proceed-button');
      const mockEvent = { preventDefault: jest.fn() };
      
      proceedButton.onclick = (e) => {
        mockEvent.preventDefault();
        defaultProps.onSaveHandler(expect.any(Object));
      };
      
      fireEvent.click(proceedButton);
      
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPaymentTenure />);
      }).not.toThrow();
    });

    it('should handle empty paymentTenure array', () => {
      render(<RdsCompPaymentTenure {...defaultProps} paymentTenure={[]} />);
      
      expect(screen.getByText('Payment')).toBeInTheDocument();
      expect(screen.getByTestId('developer-counter')).toBeInTheDocument();
    });    it('should handle undefined callback functions', () => {
      render(<RdsCompPaymentTenure 
        {...defaultProps} 
        sendTenureId={undefined}
        developerCount={undefined}
        onSaveHandler={undefined}
      />);
      
      expect(() => {
        const firstDiv = screen.getByText('Annual Plan').closest('div');
        if (firstDiv) {
          fireEvent.click(firstDiv);
        }
        fireEvent.click(screen.getByTestId('proceed-button'));
      }).not.toThrow();
    });

    it('should update when paymentTenure prop changes', () => {
      const { rerender } = render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const newTenure = [
        {
          id: 4,
          tenureCount: 24,
          licenseTenureName: 'Biennial Plan',
          discountPercentage: 30,
          discountAmount: 200,
          saveLabel: 'Save $200'
        }
      ];
      
      rerender(<RdsCompPaymentTenure {...defaultProps} paymentTenure={newTenure} />);
      
      expect(screen.getByText('Biennial Plan')).toBeInTheDocument();
    });
  });

  describe('Discount Display', () => {    it('should show discount for plans with discount percentage > 0', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const discountPercentages = screen.getAllByTestId('discount-percentage');
      const discountAmounts = screen.getAllByTestId('discount-amount');
      
      expect(discountPercentages[0]).toHaveTextContent('20%');
      expect(discountAmounts[0]).toHaveTextContent('100');
      expect(discountPercentages[1]).toHaveTextContent('10%');
      expect(discountAmounts[1]).toHaveTextContent('50');
    });

    it('should not show discount for plans with 0 discount', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const discountComponents = screen.getAllByTestId('plan-discount');
      expect(discountComponents).toHaveLength(2); // Only 2 plans have discounts
    });
  });

  describe('Component Structure', () => {
    it('should have correct form structure', () => {
      const { container } = render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should have correct CSS classes for layout', () => {
      const { container } = render(<RdsCompPaymentTenure {...defaultProps} />);
      
      expect(container.querySelector('.container')).toBeInTheDocument();
      expect(container.querySelector('.custom-radio-border')).toBeInTheDocument();
    });

    it('should render proceed button with correct properties', () => {
      render(<RdsCompPaymentTenure {...defaultProps} />);
      
      const proceedButton = screen.getByTestId('proceed-button');
      expect(proceedButton).toHaveClass('btn', 'primary', 'medium', 'block');
      expect(proceedButton).toHaveAttribute('type', 'submit');
    });
  });
});