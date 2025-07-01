import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompOtpInput, { FieldStyle } from '../src/rds-comp-otpinput/rds-comp-otpinput';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: React.forwardRef(({ value, onChange, onKeyDown, customClasses, maxLength, name, placeholder, ...props }: any, ref: any) => (
    <input
      ref={ref}
      data-testid={`otp-input-${props.key || 0}`}
      className={customClasses}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  )),
  RdsButton: ({ label, onClick, colorVariant, type, size }: any) => (
    <button
      data-testid="rds-button"
      onClick={onClick}
      className={`btn ${colorVariant} ${size}`}
      type={type}
    >
      {label}
    </button>
  ),
  RdsCompIcon: ({ name, height, width, colorVariant }: any) => (
    <span data-testid="rds-icon" className={`icon ${colorVariant}`}>
      {name}
    </span>
  ),
}));

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, 'alert', {
  writable: true,
  value: mockAlert,
});

describe('RdsCompOtpInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompOtpInput />);
      }).not.toThrow();
    });

    it('should render default 4 OTP input fields', () => {
      render(<RdsCompOtpInput />);
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
    });

    it('should render custom number of OTP input fields', () => {
      render(<RdsCompOtpInput otpSize={6} />);
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('should render instruction text for default style', () => {
      render(<RdsCompOtpInput otpSize={4} />);
      
      expect(screen.getByText('Enter the 4-digit OTP you received')).toBeInTheDocument();
    });

    it('should not render instruction text for advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      expect(screen.queryByText('Enter the 4-digit OTP you received')).not.toBeInTheDocument();
    });
  });

  describe('Field Styles', () => {
    it('should apply default field style class', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Default} />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('otp-input-default');
      });
    });

    it('should apply circle field style class', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Circle} />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('otp-input-circle');
      });
    });

    it('should apply square field style class', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Square} />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toHaveClass('otp-input-square');
      });
    });
  });

  describe('Advance Style Rendering', () => {    it('should render advance style with icon and verification UI', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} iconUrl="check-circle" />);
      
      expect(screen.getByTestId('rds-icon')).toBeInTheDocument();
      expect(screen.getByText('OTP Verification')).toBeInTheDocument();
      expect(screen.getByText('One-Time OTP sent to your registered email address')).toBeInTheDocument();
      expect(screen.getByTestId('rds-button')).toBeInTheDocument();
    });

    it('should render verify button in advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      const verifyButton = screen.getByTestId('rds-button');
      expect(verifyButton).toHaveTextContent('VERIFY');
    });
  });

  describe('OTP Input Functionality', () => {
    it('should accept numeric input only', () => {
      render(<RdsCompOtpInput />);
      
      const firstInput = screen.getAllByRole('textbox')[0];
      
      // Should accept numeric input
      fireEvent.change(firstInput, { target: { value: '5' } });
      expect(firstInput).toHaveValue('5');
      
      // Should not accept non-numeric input
      fireEvent.change(firstInput, { target: { value: 'a' } });
      expect(firstInput).toHaveValue('5'); // Should remain unchanged
    });

    it('should focus next input after entering a digit', async () => {
      render(<RdsCompOtpInput />);
      
      const inputs = screen.getAllByRole('textbox');
      const firstInput = inputs[0];
      const secondInput = inputs[1];
      
      fireEvent.change(firstInput, { target: { value: '1' } });
      
      await waitFor(() => {
        expect(document.activeElement).toBe(secondInput);
      });
    });

    it('should handle backspace and focus previous input', async () => {
      render(<RdsCompOtpInput />);
      
      const inputs = screen.getAllByRole('textbox');
      const firstInput = inputs[0];
      const secondInput = inputs[1];
      
      // Enter digit in first input to move to second
      fireEvent.change(firstInput, { target: { value: '1' } });
      
      // Focus second input and press backspace
      fireEvent.keyDown(secondInput, { key: 'Backspace' });
      
      await waitFor(() => {
        expect(firstInput).toHaveValue('');
        expect(document.activeElement).toBe(firstInput);
      });
    });

    it('should limit input to single digit', () => {
      render(<RdsCompOtpInput />);
      
      const firstInput = screen.getAllByRole('textbox')[0];
      
      // Try to enter multiple digits
      fireEvent.change(firstInput, { target: { value: '123' } });
      
      // Should only accept the first digit due to maxLength=1
      expect(firstInput).toHaveAttribute('maxLength', '1');
    });
  });

  describe('Button Interactions', () => {
    it('should handle verify button click', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      // Enter some OTP digits
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      fireEvent.change(inputs[2], { target: { value: '3' } });
      fireEvent.change(inputs[3], { target: { value: '4' } });
      
      const verifyButton = screen.getByTestId('rds-button');
      fireEvent.click(verifyButton);
      
      expect(mockAlert).toHaveBeenCalledWith('Entered OTP: 1234');
    });

    it('should handle resend OTP click', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      const resendLink = screen.getByText('Resend OTP');
      fireEvent.click(resendLink);
      
      expect(mockAlert).toHaveBeenCalledWith('OTP has been resent to your registered email address.');
    });

    it('should handle verify with incomplete OTP', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      // Enter partial OTP
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      
      const verifyButton = screen.getByTestId('rds-button');
      fireEvent.click(verifyButton);
      
      expect(mockAlert).toHaveBeenCalledWith('Entered OTP: 12');
    });
  });

  describe('Props Handling', () => {
    it('should handle otpSize prop changes', () => {
      const { rerender } = render(<RdsCompOtpInput otpSize={4} />);
      
      let inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(4);
      
      rerender(<RdsCompOtpInput otpSize={6} />);
      
      inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);
    });

    it('should handle missing optional props', () => {
      expect(() => {
        render(<RdsCompOtpInput />);
      }).not.toThrow();
    });

    it('should render with custom icon in advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} iconUrl="custom-icon" />);
      
      const icon = screen.getByTestId('rds-icon');
      expect(icon).toHaveTextContent('custom-icon');
    });
  });

  describe('Component Structure', () => {
    it('should have correct container classes for default style', () => {
      const { container } = render(<RdsCompOtpInput />);
      
      expect(container.querySelector('.text-center')).toBeInTheDocument();
      expect(container.querySelector('.d-flex.justify-content-center.mx-auto')).toBeInTheDocument();
    });

    it('should have correct container classes for advance style', () => {
      const { container } = render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      expect(container.querySelector('.otp-verification-container')).toBeInTheDocument();
      expect(container.querySelector('.otp-inputs')).toBeInTheDocument();
    });

    it('should have proper heading structure in advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('OTP Verification');
      expect(heading).toHaveAttribute('id', 'otpverification');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input elements', () => {
      render(<RdsCompOtpInput />);
      
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach(input => {
        expect(input).toBeVisible();
        expect(input).toHaveAttribute('name');
      });
    });

    it('should have accessible button in advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAccessibleName('VERIFY');
    });

    it('should have proper heading hierarchy in advance style', () => {
      render(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompOtpInput />);
      
      expect(() => {
        rerender(<RdsCompOtpInput fieldStyle={FieldStyle.Circle} />);
        rerender(<RdsCompOtpInput fieldStyle={FieldStyle.Square} />);
        rerender(<RdsCompOtpInput fieldStyle={FieldStyle.Advance} />);
      }).not.toThrow();
    });

    it('should maintain input values during style changes', () => {
      const { rerender } = render(<RdsCompOtpInput />);
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: '1' } });
      
      rerender(<RdsCompOtpInput fieldStyle={FieldStyle.Circle} />);
      
      const updatedInputs = screen.getAllByRole('textbox');
      expect(updatedInputs[0]).toHaveValue('1');
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero OTP size gracefully', () => {
      render(<RdsCompOtpInput otpSize={0} />);
      
      const inputs = screen.queryAllByRole('textbox');
      expect(inputs).toHaveLength(0);
    });

    it('should handle large OTP size', () => {
      render(<RdsCompOtpInput otpSize={10} />);
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(10);
    });

    it('should clear inputs when otpSize changes', () => {
      const { rerender } = render(<RdsCompOtpInput otpSize={4} />);
      
      const inputs = screen.getAllByRole('textbox');
      fireEvent.change(inputs[0], { target: { value: '1' } });
      fireEvent.change(inputs[1], { target: { value: '2' } });
      
      rerender(<RdsCompOtpInput otpSize={6} />);
      
      const newInputs = screen.getAllByRole('textbox');
      newInputs.forEach(input => {
        expect(input).toHaveValue('');
      });
    });
  });
});