import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEmailSettings, { RdsCompEmailSettingsProps } from '../src/rds-comp-email-settings/rds-comp-email-settings';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, placeholder, value, onChange, inputType, dataTestId, validatonPattern, validationMsg, ...props }: any) => (
    <div data-testid={`input-container-${dataTestId || name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId || name}
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        data-validation-pattern={validatonPattern?.toString()}
        data-validation-msg={validationMsg}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ label, onClick, type, colorVariant, size, dataTestId, isOutline, ...props }: any) => (
    <button
      data-testid={dataTestId || `button-${label?.toLowerCase()}`}
      onClick={onClick}
      type={type}
      data-color-variant={colorVariant}
      data-size={size}
      data-outline={isOutline}
      {...props}
    >
      {label}
    </button>
  ),
  RdsCheckbox: ({ labelText, onChange, checked, dataTestId, ...props }: any) => (
    <div data-testid={`checkbox-container-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        onChange={onChange}
        checked={checked || false}
        {...props}
      />
      <label>{labelText}</label>
    </div>
  ),
  RdsLabel: ({ label, class: className, ...props }: any) => (
    <label className={className} {...props}>
      {label}
    </label>
  ),
}));

describe('RdsCompEmailSettings', () => {
  const mockBasicEmailSettings = {
    currentEmail: 'current@example.com',
    newEmail: 'new@example.com',
    confirmEmail: 'new@example.com'
  };

  const mockAdvancedEmailSettings = {
    displayName: 'Test Display',
    address: 'admin@example.com',
    host: 'smtp.example.com',
    port: '587',
    enableSSL: true,
    defaultCredentials: false
  };

  const mockOnSaveHandler = jest.fn();

  const defaultBasicProps: RdsCompEmailSettingsProps = {
    emailSettings: mockBasicEmailSettings,
    displayType: 'basic',
    onSaveHandler: mockOnSaveHandler
  };

  const defaultAdvancedProps: RdsCompEmailSettingsProps = {
    emailSettings: mockAdvancedEmailSettings,
    displayType: 'advanced',
    onSaveHandler: mockOnSaveHandler
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Display Type Tests
  describe('Basic Display Type', () => {
    it('should render basic email change form correctly', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      expect(screen.getByTestId('current-email')).toBeInTheDocument();
      expect(screen.getByTestId('new-email')).toBeInTheDocument();
      expect(screen.getByTestId('confirm-email')).toBeInTheDocument();
      expect(screen.getByText('Current Email')).toBeInTheDocument();
      expect(screen.getByText('New Email')).toBeInTheDocument();
      expect(screen.getByText('Confirm New Email')).toBeInTheDocument();
    });

    it('should initialize basic form with provided email settings', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      const newEmailInput = screen.getByTestId('new-email');
      const confirmEmailInput = screen.getByTestId('confirm-email');
      
      expect(currentEmailInput).toHaveValue('current@example.com');
      expect(newEmailInput).toHaveValue('new@example.com');
      expect(confirmEmailInput).toHaveValue('new@example.com');
    });

    it('should render basic form buttons', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('submit')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  // 2. Advanced Display Type Tests
  describe('Advanced Display Type', () => {
    it('should render advanced SMTP settings form correctly', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      expect(screen.getByTestId('display-name')).toBeInTheDocument();
      expect(screen.getByTestId('address')).toBeInTheDocument();
      expect(screen.getByTestId('host')).toBeInTheDocument();
      expect(screen.getByTestId('port')).toBeInTheDocument();
      expect(screen.getByTestId('enable-ssl')).toBeInTheDocument();
      expect(screen.getByTestId('default-credentials')).toBeInTheDocument();
    });

    it('should initialize advanced form with provided email settings', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const displayNameInput = screen.getByTestId('display-name');
      const addressInput = screen.getByTestId('address');
      const hostInput = screen.getByTestId('host');
      const portInput = screen.getByTestId('port');
      
      expect(displayNameInput).toHaveValue('Test Display');
      expect(addressInput).toHaveValue('admin@example.com');
      expect(hostInput).toHaveValue('smtp.example.com');
      expect(portInput).toHaveValue('587');
    });

    it('should initialize checkboxes correctly in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const sslCheckbox = screen.getByTestId('enable-ssl');
      const credentialsCheckbox = screen.getByTestId('default-credentials');
      
      expect(sslCheckbox).toBeChecked();
      expect(credentialsCheckbox).not.toBeChecked();
    });
  });

  // 3. Form Field Updates Tests
  describe('Form Field Updates', () => {
    it('should update current email in basic form', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      fireEvent.change(currentEmailInput, { target: { value: 'updated@example.com' } });
      
      expect(currentEmailInput).toHaveValue('updated@example.com');
    });

    it('should update new email in basic form', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const newEmailInput = screen.getByTestId('new-email');
      fireEvent.change(newEmailInput, { target: { value: 'newemail@example.com' } });
      
      expect(newEmailInput).toHaveValue('newemail@example.com');
    });

    it('should update display name in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const displayNameInput = screen.getByTestId('display-name');
      fireEvent.change(displayNameInput, { target: { value: 'Updated Display' } });
      
      expect(displayNameInput).toHaveValue('Updated Display');
    });

    it('should update SMTP settings in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const hostInput = screen.getByTestId('host');
      const portInput = screen.getByTestId('port');
      
      fireEvent.change(hostInput, { target: { value: 'smtp.newhost.com' } });
      fireEvent.change(portInput, { target: { value: '465' } });
      
      expect(hostInput).toHaveValue('smtp.newhost.com');
      expect(portInput).toHaveValue('465');
    });
  });

  // 4. Email Validation Tests
  describe('Email Validation', () => {
    it('should show error when new email and confirm email do not match', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const newEmailInput = screen.getByTestId('new-email');
      const confirmEmailInput = screen.getByTestId('confirm-email');
      
      fireEvent.change(newEmailInput, { target: { value: 'test1@example.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'test2@example.com' } });
      
      expect(screen.getByText('New Email and Confirm New Email do not match')).toBeInTheDocument();
    });

    it('should clear error when emails match', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const newEmailInput = screen.getByTestId('new-email');
      const confirmEmailInput = screen.getByTestId('confirm-email');
      
      // First create mismatch
      fireEvent.change(newEmailInput, { target: { value: 'test1@example.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'test2@example.com' } });
      
      // Then make them match
      fireEvent.change(confirmEmailInput, { target: { value: 'test1@example.com' } });
      
      expect(screen.queryByText('New Email and Confirm New Email do not match')).not.toBeInTheDocument();
    });

    it('should have email validation pattern in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const addressInput = screen.getByTestId('address');
      expect(addressInput).toHaveAttribute('data-validation-pattern');
      expect(addressInput).toHaveAttribute('data-validation-msg', 'Please Enter Valid Email Address.');
    });
  });

  // 5. Checkbox Management Tests
  describe('Checkbox Management', () => {
    it('should toggle SSL checkbox in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const sslCheckbox = screen.getByTestId('enable-ssl');
      fireEvent.click(sslCheckbox);
      
      expect(sslCheckbox).not.toBeChecked();
    });

    it('should toggle default credentials checkbox in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const credentialsCheckbox = screen.getByTestId('default-credentials');
      fireEvent.click(credentialsCheckbox);
      
      expect(credentialsCheckbox).toBeChecked();
    });
  });

  // 6. Form Submission Tests
  describe('Form Submission', () => {
    it('should call onSaveHandler when submitting basic form', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    });

    it('should call onSaveHandler with updated data in basic form', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      fireEvent.change(currentEmailInput, { target: { value: 'modified@example.com' } });
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          currentEmail: 'modified@example.com'
        })
      );
    });

    it('should call onSaveHandler when submitting advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    });

    it('should call onSaveHandler with updated data in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const displayNameInput = screen.getByTestId('display-name');
      fireEvent.change(displayNameInput, { target: { value: 'Modified Display' } });
      
      const sslCheckbox = screen.getByTestId('enable-ssl');
      fireEvent.click(sslCheckbox);
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Modified Display',
          enableSSL: false
        })
      );
    });
  });

  // 7. Props Updates Tests
  describe('Props Updates', () => {
    it('should update form data when emailSettings prop changes', () => {
      const { rerender } = render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const updatedSettings = {
        ...mockBasicEmailSettings,
        currentEmail: 'updated@example.com'
      };
      
      rerender(<RdsCompEmailSettings {...defaultBasicProps} emailSettings={updatedSettings} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      expect(currentEmailInput).toHaveValue('updated@example.com');
    });

    it('should switch between display types correctly', () => {
      const { rerender } = render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      expect(screen.getByTestId('current-email')).toBeInTheDocument();
      expect(screen.queryByTestId('display-name')).not.toBeInTheDocument();
      
      rerender(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      expect(screen.queryByTestId('current-email')).not.toBeInTheDocument();
      expect(screen.getByTestId('display-name')).toBeInTheDocument();
    });
  });

  // 8. Button Configuration Tests
  describe('Button Configuration', () => {
    it('should configure buttons correctly in basic form', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      const submitButton = screen.getByTestId('submit');
      
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-outline', 'true');
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toHaveAttribute('data-color-variant', 'primary');
    });

    it('should configure buttons correctly in advanced form', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      const submitButton = screen.getByTestId('submit');
      
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-outline', 'true');
      expect(submitButton).toHaveAttribute('type', 'submit');
      expect(submitButton).toHaveAttribute('data-color-variant', 'primary');
    });
  });

  // 9. Edge Cases Tests
  describe('Edge Cases', () => {
    it('should handle missing onSaveHandler gracefully', () => {
      const propsWithoutHandler = { ...defaultBasicProps, onSaveHandler: undefined };
      render(<RdsCompEmailSettings {...propsWithoutHandler} />);
      
      const submitButton = screen.getByTestId('submit');
      
      expect(() => {
        fireEvent.click(submitButton);
      }).not.toThrow();
    });

    it('should handle empty email settings', () => {
      const propsWithEmptySettings = { ...defaultBasicProps, emailSettings: {} };
      
      expect(() => {
        render(<RdsCompEmailSettings {...propsWithEmptySettings} />);
      }).not.toThrow();
    });

    it('should handle undefined email settings', () => {
      const propsWithUndefinedSettings = { ...defaultBasicProps, emailSettings: undefined };
      
      expect(() => {
        render(<RdsCompEmailSettings {...propsWithUndefinedSettings} />);
      }).not.toThrow();
    });
  });

  // 10. Component Structure Tests
  describe('Component Structure', () => {
    it('should render basic form with correct CSS classes', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const formGroup = screen.getByTestId('current-email').closest('.form-group');
      expect(formGroup).toHaveClass('row', 'align-items-center');
    });

    it('should render advanced form with correct CSS classes', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const form = screen.getByTestId('display-name').closest('form');
      expect(form).toHaveClass('RdsCompEmailSettingsNew__form');
    });
  });

  // 11. Form Reset Tests
  describe('Form Reset', () => {
    it('should reset basic form after successful submission', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      fireEvent.change(currentEmailInput, { target: { value: 'modified@example.com' } });
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(currentEmailInput).toHaveValue('');
    });

    it('should reset advanced form after successful submission', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const displayNameInput = screen.getByTestId('display-name');
      fireEvent.change(displayNameInput, { target: { value: 'Modified Display' } });
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(displayNameInput).toHaveValue('');
    });
  });

  // 12. Integration Tests
  describe('Integration Tests', () => {
    it('should handle complete email change workflow', () => {
      render(<RdsCompEmailSettings {...defaultBasicProps} />);
      
      const currentEmailInput = screen.getByTestId('current-email');
      const newEmailInput = screen.getByTestId('new-email');
      const confirmEmailInput = screen.getByTestId('confirm-email');
      
      fireEvent.change(currentEmailInput, { target: { value: 'old@example.com' } });
      fireEvent.change(newEmailInput, { target: { value: 'newemail@example.com' } });
      fireEvent.change(confirmEmailInput, { target: { value: 'newemail@example.com' } });
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith({
        currentEmail: 'old@example.com',
        newEmail: 'newemail@example.com',
        confirmEmail: 'newemail@example.com'
      });
    });

    it('should handle complete SMTP settings workflow', () => {
      render(<RdsCompEmailSettings {...defaultAdvancedProps} />);
      
      const displayNameInput = screen.getByTestId('display-name');
      const hostInput = screen.getByTestId('host');
      const sslCheckbox = screen.getByTestId('enable-ssl');
      
      fireEvent.change(displayNameInput, { target: { value: 'Integration Test' } });
      fireEvent.change(hostInput, { target: { value: 'smtp.integration.com' } });
      fireEvent.click(sslCheckbox);
      
      const submitButton = screen.getByTestId('submit');
      fireEvent.click(submitButton);
      
      expect(mockOnSaveHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          displayName: 'Integration Test',
          host: 'smtp.integration.com',
          enableSSL: false
        })
      );
    });
  });
});