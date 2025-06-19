import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSetPassword from '../src/rds-comp-set-password/rds-comp-set-password';

// Mock the react-i18next hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, inputType, placeholder, onChange, value, dataTestId, onBlur, showIcon, required, id }: any) => (
    <div data-testid={dataTestId}>
      {label && <label>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        data-show-icon={showIcon}
        required={required}
        id={id}
      />
    </div>
  ),
  RdsButton: ({ label, colorVariant, size, type, onClick, isDisabled, tooltipTitle, databsdismiss }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={`button-${label.toLowerCase()}`}
      data-color-variant={colorVariant}
      data-size={size}
      data-tooltip={tooltipTitle}
      data-bs-dismiss={databsdismiss}
    >
      {label}
    </button>
  )
}));

describe('RdsCompSetPassword Component', () => {
  const mockPassword = jest.fn().mockReturnValue([{}, {}]);
  
  const defaultProps = {
    password: mockPassword,
    setPasswordField: { password: '' },
    onSaveHandler: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      expect(screen.getByTestId('password')).toBeInTheDocument();
      expect(screen.getByTestId('button-save')).toBeInTheDocument();
      expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    });

    it('should render with the correct structure', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      // Check for form elements
      expect(document.querySelector('form')).toBeInTheDocument();
      expect(document.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(document.querySelector('.form-group')).toBeInTheDocument();
      expect(document.querySelector('.footer-buttons')).toBeInTheDocument();
    });

    it('should display password input with correct attributes', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter Password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('data-show-icon', 'true');
    });
  });

  describe('Form Validation', () => {
    it('should initially disable the save button', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const saveButton = screen.getByTestId('button-save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when valid password is entered', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      const saveButton = screen.getByTestId('button-save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should show error message for invalid password', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Enter invalid password (doesn't meet criteria)
      fireEvent.change(passwordInput!, { target: { value: 'weak' } });
      
      // Check for error message
      expect(screen.getByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).toBeInTheDocument();
    });

    it('should not show error message for valid password', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Enter valid password (meets all criteria)
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      // Error message should not be present
      expect(screen.queryByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).not.toBeInTheDocument();
    });
  });

  describe('Form Interaction', () => {
    it('should update password state when input changes', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      expect(passwordInput).toHaveValue('StrongPass123!');
    });

    it('should handle password blur event', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.blur(passwordInput!);
      
      // Since we're just testing that the event handler is called, we don't need to assert anything
      // This test is mainly to ensure no errors are thrown
    });

    it('should call onSaveHandler with password data when save button is clicked', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      const saveButton = screen.getByTestId('button-save');
      fireEvent.click(saveButton);
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({ password: 'StrongPass123!' });
    });

    it('should reset form after save', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      const saveButton = screen.getByTestId('button-save');
      fireEvent.click(saveButton);
      
      // After save, password should be reset
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Props Handling', () => {
    it('should update component when setPasswordField prop changes', async () => {
      const { rerender } = render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      // Update the props with a new password
      const updatedProps = {
        ...defaultProps,
        setPasswordField: { password: 'NewPassword123!' }
      };
      
      rerender(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...updatedProps} />);
      
      // Check if the password input is updated
      await waitFor(() => {
        const passwordInput = screen.getByTestId('password').querySelector('input');
        expect(passwordInput).toHaveValue('NewPassword123!');
      });
    });

    it('should handle reset prop changes', async () => {
      const { rerender } = render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} reset={false} />);
      
      // Update the reset prop
      rerender(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} reset={true} />);
      
      // This is mainly to ensure the component doesn't crash when reset prop changes
      // Since inputReset is an internal state, we can't directly test its value
    });

    it('should handle missing onSaveHandler prop', () => {
      const propsWithoutHandler = {
        ...defaultProps,
        onSaveHandler: undefined
      };
      
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...propsWithoutHandler} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      const saveButton = screen.getByTestId('button-save');
      
      // Should not throw an error when clicked without handler
      expect(() => fireEvent.click(saveButton)).not.toThrow();
    });
  });

  describe('Password Validation', () => {
    it('should validate password with at least 8 characters including uppercase, lowercase, number, and special character', () => {
      render(<RdsCompSetPassword onResend={function (isForgotPasswordClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (isLoginClicked?: boolean): void {
        throw new Error('Function not implemented.');
      } } languageData={undefined} registerFields={undefined} {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Test valid password formats
      const validPasswords = ['StrongP@ss1', 'Password123!', 'C0mplex$Pass'];
      validPasswords.forEach(password => {
        fireEvent.change(passwordInput!, { target: { value: password } });
        expect(screen.queryByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).not.toBeInTheDocument();
      });
      
      // Test invalid password formats
      const invalidPasswords = ['short', 'nouppercase123!', 'NOLOWERCASE123!', 'NoNumbers!', 'NoSpecial123'];
      invalidPasswords.forEach(password => {
        fireEvent.change(passwordInput!, { target: { value: password } });
        expect(screen.getByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).toBeInTheDocument();
      });
    });
  });
});
