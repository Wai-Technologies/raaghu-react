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
  RdsInput: ({ name, label, inputType, placeholder, onChange, value, dataTestId, onBlur, showIcon, required, id, validationMsg }: any) => (
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
      {validationMsg && <span className="text-danger">{validationMsg}</span>}
    </div>
  ),  RdsButton: ({ label, colorVariant, size, type, onClick, isDisabled, tooltipTitle, databsdismiss, dataTestId, ...props }: any) => {
    // Filter out Bootstrap-specific props that cause issues in tests
    const { databsdismiss: _, ...safeProps } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        data-testid={dataTestId || `button-${label.toLowerCase()}`}
        data-color-variant={colorVariant}
        data-size={size}
        data-tooltip={tooltipTitle}
        {...safeProps}
      >
        {label}
      </button>
    );
  },
  RdsDropdownList: ({ listItems, ...props }: any) => (
    <select data-testid="language-dropdown" {...props}>
      <option value="">Select Language</option>
    </select>
  ),
  RdsCompLabel: ({ label, ...props }: any) => <span {...props}>{label}</span>
}));

describe('RdsCompSetPassword Component', () => {
  const mockPassword = jest.fn().mockReturnValue([{}, {}]);
  
  const defaultProps = {
    password: mockPassword,
    setPasswordField: { password: '' },
    onSaveHandler: jest.fn(),
    reset: false,
    passwordType: 'set', // Required prop for rendering
    onResend: jest.fn(),
    onLogin: jest.fn(),
    languageData: [],
    registerFields: { email: '' }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering - Set Password Type', () => {
    it('should render without crashing', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      expect(screen.getByTestId('password')).toBeInTheDocument();
      expect(screen.getByTestId('button-save')).toBeInTheDocument();
      expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    });

    it('should render with the correct structure', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      // Check for form elements
      expect(document.querySelector('form')).toBeInTheDocument();
      expect(document.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(document.querySelector('.form-group')).toBeInTheDocument();
      expect(document.querySelector('.footer-buttons')).toBeInTheDocument();
    });

    it('should display password input with correct attributes', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter Password');
      expect(passwordInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('data-show-icon', 'true');
    });
  });

  describe('Form Validation - Set Password Type', () => {
    it('should initially disable the save button', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const saveButton = screen.getByTestId('button-save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when valid password is entered', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      const saveButton = screen.getByTestId('button-save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should show error message for invalid password', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Enter invalid password (doesn't meet criteria)
      fireEvent.change(passwordInput!, { target: { value: 'weak' } });
      
      // Check for error message
      expect(screen.getByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).toBeInTheDocument();
    });

    it('should not show error message for valid password', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Enter valid password (meets all criteria)
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      // Error message should not be present
      expect(screen.queryByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).not.toBeInTheDocument();
    });
  });
  describe('Form Interaction - Set Password Type', () => {
    it('should update password state when input changes', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      
      expect(passwordInput).toHaveValue('StrongPass123!');
    });

    it('should handle password blur event', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      fireEvent.blur(passwordInput!);
      
      // Since we're just testing that the event handler is called, we don't need to assert anything
      // This test is mainly to ensure no errors are thrown
    });
  });

  describe('Setting Password Type', () => {
    const settingProps = {
      ...defaultProps,
      passwordType: 'setting',
      passwordSettingData: { curPass: '', newPass: '', curNewPass: '' }
    };

    it('should render setting password form', () => {
      render(<RdsCompSetPassword {...settingProps} />);
      
      expect(screen.getByTestId('current-password')).toBeInTheDocument();
      expect(screen.getByTestId('new-password')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });

    it('should disable save button initially', () => {
      render(<RdsCompSetPassword {...settingProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });
  });

  describe('Change Password Type', () => {
    const changeProps = {
      ...defaultProps,
      passwordType: 'change',
      changePasswordData: { currentPassword: '', newPassword: '', newPasswordConfirm: '' }
    };

    it('should render change password form', () => {
      render(<RdsCompSetPassword {...changeProps} />);
      
      expect(screen.getByTestId('password-form')).toBeInTheDocument();
      expect(screen.getByTestId('curr-password')).toBeInTheDocument();
      expect(screen.getByTestId('new-pass')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });
  });

  describe('Forgot Password Type', () => {
    const forgotProps = {
      ...defaultProps,
      passwordType: 'forgot',
      languageData: [{ label: 'English', value: 'en' }],
      registerFields: { email: '' }
    };

    it('should render forgot password form', () => {
      render(<RdsCompSetPassword {...forgotProps} />);
      
      expect(screen.getByText('Forgot Password')).toBeInTheDocument();
      expect(screen.getByTestId('email')).toBeInTheDocument();
      expect(screen.getByTestId('submit')).toBeInTheDocument();
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });

    it('should validate email input', () => {
      render(<RdsCompSetPassword {...forgotProps} />);
      
      const emailInput = screen.getByTestId('email').querySelector('input');
      fireEvent.change(emailInput!, { target: { value: 'invalid-email' } });
      
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    });
  });
  describe('Props Handling', () => {
    it('should update component when setPasswordField prop changes', async () => {
      const { rerender } = render(<RdsCompSetPassword {...defaultProps} />);
      
      // Update the props with a new password
      const updatedProps = {
        ...defaultProps,
        setPasswordField: { password: 'NewPassword123!' }
      };
      
      rerender(<RdsCompSetPassword {...updatedProps} />);
      
      // Check if the password input is updated
      await waitFor(() => {
        const passwordInput = screen.getByTestId('password').querySelector('input');
        expect(passwordInput).toHaveValue('NewPassword123!');
      });
    });

    it('should handle reset prop changes', () => {
      const { rerender } = render(<RdsCompSetPassword {...defaultProps} reset={false} />);
      
      // Update the reset prop
      rerender(<RdsCompSetPassword {...defaultProps} reset={true} />);
      
      // This is mainly to ensure the component doesn't crash when reset prop changes
      expect(screen.getByTestId('password')).toBeInTheDocument();
    });
  });

  describe('Password Validation', () => {
    it('should validate password with at least 8 characters', () => {
      render(<RdsCompSetPassword {...defaultProps} />);
      
      const passwordInput = screen.getByTestId('password').querySelector('input');
      
      // Test valid password
      fireEvent.change(passwordInput!, { target: { value: 'StrongPass123!' } });
      expect(screen.queryByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).not.toBeInTheDocument();
      
      // Test invalid password (too short)
      fireEvent.change(passwordInput!, { target: { value: 'short' } });
      expect(screen.getByText('Please Enter Valid Password length should be at least 8 characters(Alphanumeric)')).toBeInTheDocument();
    });
  });
});
