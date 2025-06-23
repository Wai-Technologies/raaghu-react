import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompPasswordSetting from '../src/rds-comp-password-setting/rds-comp-password-setting';

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
    dataTestId, 
    validationMsg, 
    showIcon,
    validatonPattern,
    isValidConfirmPass,
    ...props 
  }: any) => (
    <div data-testid={`input-container-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        type={inputType}
        required={required}
        {...props}
      />
      {validationMsg && (
        <div data-testid={`${dataTestId}-error`} className="error-message">
          {validationMsg}
        </div>
      )}
      {showIcon && <span data-testid={`${dataTestId}-icon`}>👁</span>}
    </div>
  ),
  RdsButton: ({ label, onClick, colorVariant, type, size, isDisabled, isOutline, dataTestId, ...props }: any) => (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      disabled={isDisabled}
      className={`btn ${colorVariant} ${size} ${isOutline ? 'outline' : ''}`}
      type={type}
      {...props}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompPasswordSetting', () => {
  const mockPasswordData = {
    curPass: '',
    newPass: '',
    curNewPass: ''
  };

  const defaultProps = {
    passwordSettingData: mockPasswordData,
    reset: false,
    onSaveHandler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      expect(() => {
        render(<RdsCompPasswordSetting />);
      }).not.toThrow();
    });

    it('should render all password input fields', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('current-password')).toBeInTheDocument();
      expect(screen.getByTestId('new-password')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
    });

    it('should render form labels correctly', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByText('Current Password')).toBeInTheDocument();
      expect(screen.getByText('New password')).toBeInTheDocument();
      expect(screen.getByText('Confirm new password')).toBeInTheDocument();
    });

    it('should render save and cancel buttons', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });

    it('should render security information section', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByText('Where you are logged in,')).toBeInTheDocument();
      expect(screen.getByText(/We will alert you via olivia@rdssysteminc.com/)).toBeInTheDocument();
    });

    it('should render password icons', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('current-password-icon')).toBeInTheDocument();
      expect(screen.getByTestId('new-password-icon')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-password-icon')).toBeInTheDocument();
    });
  });

  describe('Form Input Handling', () => {
    it('should update current password when input changes', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: 'CurrentPass123!' } });
      
      expect(currentPasswordInput).toHaveValue('CurrentPass123!');
    });

    it('should update new password when input changes', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const newPasswordInput = screen.getByTestId('new-password');
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      
      expect(newPasswordInput).toHaveValue('NewPass123!');
    });

    it('should update confirm password when input changes', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      fireEvent.change(confirmPasswordInput, { target: { value: 'NewPass123!' } });
      
      expect(confirmPasswordInput).toHaveValue('NewPass123!');
    });
  });

  describe('Password Validation', () => {
    it('should show error for invalid current password (less than 8 characters)', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: '123' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('current-password-error')).toHaveTextContent(
          'Password must be alphanumeric and at least 8 characters long'
        );
      });
    });

    it('should show error for invalid new password (less than 8 characters)', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const newPasswordInput = screen.getByTestId('new-password');
      fireEvent.change(newPasswordInput, { target: { value: '123' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('new-password-error')).toHaveTextContent(
          'Password must be alphanumeric and at least 8 characters long'
        );
      });
    });

    it('should show error when new password matches current password', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      const newPasswordInput = screen.getByTestId('new-password');
      
      fireEvent.change(currentPasswordInput, { target: { value: 'SamePass123!' } });
      fireEvent.change(newPasswordInput, { target: { value: 'SamePass123!' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('new-password-error')).toHaveTextContent(
          'Current Password and New Password cannot be same'
        );
      });
    });

    it('should show error when confirm password does not match new password', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const newPasswordInput = screen.getByTestId('new-password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass123!' } });
      
      await waitFor(() => {
        expect(screen.getByTestId('confirm-password-error')).toHaveTextContent(
          'New Password and Confirm New Password do not match. Please try again.'
        );
      });
    });

    it('should not show errors for valid passwords', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      const newPasswordInput = screen.getByTestId('new-password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      
      fireEvent.change(currentPasswordInput, { target: { value: 'CurrentPass123!' } });
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'NewPass123!' } });
      
      await waitFor(() => {
        expect(screen.queryByTestId('current-password-error')).not.toBeInTheDocument();
        expect(screen.queryByTestId('new-password-error')).not.toBeInTheDocument();
        expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Validation and Save Button', () => {
    it('should disable save button when form is invalid', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when all fields are valid', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      const newPasswordInput = screen.getByTestId('new-password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      
      fireEvent.change(currentPasswordInput, { target: { value: 'CurrentPass123!' } });
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'NewPass123!' } });
      
      await waitFor(() => {
        const saveButton = screen.getByTestId('save');
        expect(saveButton).not.toBeDisabled();
      });
    });

    it('should call onSaveHandler when save button is clicked with valid data', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      const newPasswordInput = screen.getByTestId('new-password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      
      fireEvent.change(currentPasswordInput, { target: { value: 'CurrentPass123!' } });
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'NewPass123!' } });
      
      await waitFor(() => {
        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);
      });
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        curPass: 'CurrentPass123!',
        newPass: 'NewPass123!',
        curNewPass: 'NewPass123!'
      });
    });

    it('should reset form after successful save', async () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      const newPasswordInput = screen.getByTestId('new-password');
      const confirmPasswordInput = screen.getByTestId('confirm-password');
      
      fireEvent.change(currentPasswordInput, { target: { value: 'CurrentPass123!' } });
      fireEvent.change(newPasswordInput, { target: { value: 'NewPass123!' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'NewPass123!' } });
      
      await waitFor(() => {
        const saveButton = screen.getByTestId('save');
        fireEvent.click(saveButton);
      });
      
      expect(currentPasswordInput).toHaveValue('');
      expect(newPasswordInput).toHaveValue('');
      expect(confirmPasswordInput).toHaveValue('');
    });
  });

  describe('Props Handling', () => {
    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<RdsCompPasswordSetting />);
      }).not.toThrow();
    });

    it('should update when passwordSettingData prop changes', () => {
      const { rerender } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const newData = {
        curPass: 'ExistingPass123!',
        newPass: 'UpdatedPass123!',
        curNewPass: 'UpdatedPass123!'
      };
      
      rerender(<RdsCompPasswordSetting {...defaultProps} passwordSettingData={newData} />);
      
      expect(screen.getByTestId('current-password')).toHaveValue('ExistingPass123!');
      expect(screen.getByTestId('new-password')).toHaveValue('UpdatedPass123!');
      expect(screen.getByTestId('confirm-password')).toHaveValue('UpdatedPass123!');
    });

    it('should handle reset prop changes', () => {
      const { rerender } = render(<RdsCompPasswordSetting {...defaultProps} reset={false} />);
      
      rerender(<RdsCompPasswordSetting {...defaultProps} reset={true} />);
      
      // Component should handle reset prop change
      expect(screen.getByTestId('current-password')).toBeInTheDocument();
    });

    it('should handle undefined passwordSettingData', () => {
      render(<RdsCompPasswordSetting passwordSettingData={undefined} />);
      
      expect(screen.getByTestId('current-password')).toHaveValue('');
      expect(screen.getByTestId('new-password')).toHaveValue('');
      expect(screen.getByTestId('confirm-password')).toHaveValue('');
    });
  });

  describe('Component Structure', () => {
    it('should have correct form structure', () => {
      const { container } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should have correct CSS classes for layout', () => {
      const { container } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(container.querySelector('.custom-content-scroll')).toBeInTheDocument();
      expect(container.querySelector('.footer-buttons')).toBeInTheDocument();
    });

    it('should have proper input containers with styling', () => {
      const { container } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const inputContainers = container.querySelectorAll('.fw-normal');
      expect(inputContainers.length).toBeGreaterThan(0);
    });
  });

  describe('Input Properties', () => {
    it('should have password input type for all fields', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('current-password')).toHaveAttribute('type', 'password');
      expect(screen.getByTestId('new-password')).toHaveAttribute('type', 'password');
      expect(screen.getByTestId('confirm-password')).toHaveAttribute('type', 'password');
    });

    it('should have required attribute for all fields', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('current-password')).toHaveAttribute('required');
      expect(screen.getByTestId('new-password')).toHaveAttribute('required');
      expect(screen.getByTestId('confirm-password')).toHaveAttribute('required');
    });

    it('should have correct placeholders', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('current-password')).toHaveAttribute('placeholder', 'Current password');
      expect(screen.getByTestId('new-password')).toHaveAttribute('placeholder', 'New password');
      expect(screen.getByTestId('confirm-password')).toHaveAttribute('placeholder', 'Confirm new password');
    });
  });

  describe('Button Properties', () => {
    it('should have correct button types', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByTestId('save')).toHaveAttribute('type', 'submit');
      expect(screen.getByTestId('cancel')).toHaveAttribute('type', 'button');
    });

    it('should have correct button styling', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      const cancelButton = screen.getByTestId('cancel');
      
      expect(saveButton).toHaveClass('btn', 'primary', 'small');
      expect(cancelButton).toHaveClass('btn', 'primary', 'small', 'outline');
    });
  });
  describe('Accessibility', () => {
    it('should have accessible form elements', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      // Password inputs don't have textbox role, so check for actual input elements
      const passwordInputs = [
        screen.getByTestId('current-password'),
        screen.getByTestId('new-password'),
        screen.getByTestId('confirm-password')
      ];
      
      passwordInputs.forEach(input => {
        expect(input).toBeVisible();
        expect(input).toHaveAttribute('type', 'password');
      });
    });

    it('should have accessible buttons', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeVisible();
        expect(button).toHaveAccessibleName();
      });
    });

    it('should have proper labels for inputs', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(screen.getByText('Current Password')).toBeInTheDocument();
      expect(screen.getByText('New password')).toBeInTheDocument();
      expect(screen.getByText('Confirm new password')).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 5 });
      expect(heading).toHaveTextContent('Where you are logged in,');
    });
  });

  describe('Component Stability', () => {
    it('should not crash on multiple renders', () => {
      const { rerender } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(() => {
        rerender(<RdsCompPasswordSetting {...defaultProps} />);
        rerender(<RdsCompPasswordSetting passwordSettingData={undefined} />);
      }).not.toThrow();
    });

    it('should maintain form state during re-renders', () => {
      const { rerender } = render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: 'TestPass123!' } });
      
      rerender(<RdsCompPasswordSetting {...defaultProps} />);
      
      expect(currentPasswordInput).toHaveValue('TestPass123!');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string passwords', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: '' } });
      
      expect(currentPasswordInput).toHaveValue('');
    });

    it('should handle very long passwords', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const longPassword = 'A'.repeat(100) + '123!';
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: longPassword } });
      
      expect(currentPasswordInput).toHaveValue(longPassword);
    });

    it('should handle special characters in passwords', () => {
      render(<RdsCompPasswordSetting {...defaultProps} />);
      
      const specialPassword = 'Test!@#$%^&*()123';
      const currentPasswordInput = screen.getByTestId('current-password');
      fireEvent.change(currentPasswordInput, { target: { value: specialPassword } });
      
      expect(currentPasswordInput).toHaveValue(specialPassword);
    });
  });
});