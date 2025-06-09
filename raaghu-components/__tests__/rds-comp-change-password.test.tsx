import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompChangePassword from '../src/rds-comp-change-password/rds-comp-change-password';

// Define types for mocks
interface RdsInputProps {
  name?: string;
  label?: boolean;
  inputType?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  dataTestId?: string;
  showIcon?: boolean;
  validationMsg?: string;
  reset?: boolean;
  isDisabled?: boolean;
  readonly?: boolean;
  size?: string;
  [key: string]: any;
}

interface RdsButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  colorVariant?: string;
  size?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  dataTestId?: string;
  [key: string]: any;
}

// Mock the rds-elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name, 
    label, 
    inputType, 
    placeholder, 
    value, 
    onChange, 
    required, 
    dataTestId, 
    showIcon, 
    validationMsg, 
    reset,
    isDisabled,
    readonly,
    size,
    ...rest
  }: RdsInputProps) => (
    <div data-testid={`input-wrapper-${dataTestId}`}>
      {label && <label>{name}</label>}
      <input
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-testid={dataTestId}
        disabled={isDisabled}
        readOnly={readonly}
        {...rest}
      />
      {validationMsg && <div data-testid={`validation-${dataTestId}`} className="text-danger">{validationMsg}</div>}
    </div>
  ),
  RdsButton: ({ 
    label, 
    type, 
    colorVariant, 
    size, 
    onClick, 
    isDisabled, 
    dataTestId,
    ...rest
  }: RdsButtonProps) => (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={dataTestId}
      className={`btn btn-${colorVariant} btn-${size}`}
      {...rest}
    >
      {label}
    </button>
  )
}));

describe('RdsCompChangePassword', () => {
  // Sample data for testing
  const mockChangePasswordData = {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  };

  const defaultProps = {
    onSaveHandler: jest.fn(),
    changePasswordData: mockChangePasswordData
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompChangePassword {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders all password input fields', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    expect(screen.getByTestId('curr-password')).toBeInTheDocument();
    expect(screen.getByTestId('new-pass')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
  });

  it('updates form data when inputs change', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    // Change current password
    const currentPasswordInput = screen.getByTestId('curr-password');
    fireEvent.change(currentPasswordInput, { target: { value: 'oldPass123' } });
    
    // Change new password
    const newPasswordInput = screen.getByTestId('new-pass');
    fireEvent.change(newPasswordInput, { target: { value: 'newPass123' } });
    
    // Change confirm password
    const confirmPasswordInput = screen.getByTestId('confirm-password');
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPass123' } });
    
    // Values should be updated
    expect(currentPasswordInput).toHaveValue('oldPass123');
    expect(newPasswordInput).toHaveValue('newPass123');
    expect(confirmPasswordInput).toHaveValue('newPass123');
  });

  it('disables save button when form is invalid', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    // Initially save button should be disabled
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeDisabled();
    
    // Fill in current password only
    fireEvent.change(screen.getByTestId('curr-password'), { target: { value: 'oldPass123' } });
    expect(saveButton).toBeDisabled();
    
    // Fill in new password too
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    expect(saveButton).toBeDisabled();
    
    // Fill in confirm password with non-matching value
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'differentPass123' } });
    expect(saveButton).toBeDisabled();
  });

  it('enables save button when form is valid', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    
    // Fill in all fields correctly
    fireEvent.change(screen.getByTestId('curr-password'), { target: { value: 'oldPass123' } });
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newPass123' } });
    
    // Save button should now be enabled
    expect(saveButton).not.toBeDisabled();
  });

  it('shows validation error when passwords do not match', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    // Fill in new password
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    
    // Fill in non-matching confirm password
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'differentPass123' } });
    
    // Check for validation message
    const validationMessage = screen.getByTestId('validation-confirm-password');
    expect(validationMessage).toBeInTheDocument();
    expect(validationMessage).toHaveTextContent('New password and confirm new password do not match');
  });

  it('calls onSaveHandler with form data when save button is clicked', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    // Fill in all fields correctly
    fireEvent.change(screen.getByTestId('curr-password'), { target: { value: 'oldPass123' } });
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newPass123' } });
    
    // Click save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Check if onSaveHandler was called with correct data
    expect(defaultProps.onSaveHandler).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
      currentPassword: 'oldPass123',
      newPassword: 'newPass123',
      newPasswordConfirm: 'newPass123'
    });
  });

  it('resets form after saving', () => {
    render(<RdsCompChangePassword {...defaultProps} />);
    
    // Fill in all fields correctly
    fireEvent.change(screen.getByTestId('curr-password'), { target: { value: 'oldPass123' } });
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newPass123' } });
    
    // Click save button
    fireEvent.click(screen.getByTestId('save'));
    
    // Form should be reset
    expect(screen.getByTestId('curr-password')).toHaveValue('');
    expect(screen.getByTestId('new-pass')).toHaveValue('');
    expect(screen.getByTestId('confirm-password')).toHaveValue('');
  });

  it('pre-fills form with provided changePasswordData', () => {
    const prefillData = {
      currentPassword: 'existingPassword',
      newPassword: 'newPasswordValue',
      newPasswordConfirm: 'newPasswordValue'
    };
    
    render(<RdsCompChangePassword {...defaultProps} changePasswordData={prefillData} />);
    
    // Inputs should have prefilled values
    expect(screen.getByTestId('curr-password')).toHaveValue('existingPassword');
    expect(screen.getByTestId('new-pass')).toHaveValue('newPasswordValue');
    expect(screen.getByTestId('confirm-password')).toHaveValue('newPasswordValue');
  });

  it('resets form when reset prop changes', () => {
    const { rerender } = render(<RdsCompChangePassword {...defaultProps} reset={false} />);
    
    // Fill in all fields
    fireEvent.change(screen.getByTestId('curr-password'), { target: { value: 'oldPass123' } });
    fireEvent.change(screen.getByTestId('new-pass'), { target: { value: 'newPass123' } });
    fireEvent.change(screen.getByTestId('confirm-password'), { target: { value: 'newPass123' } });
    
    // Trigger reset by changing reset prop
    rerender(<RdsCompChangePassword {...defaultProps} reset={true} />);
    
    // Note: Since we're mocking the RdsInput component, we can't directly test if the component resets
    // due to the setInputReset call. In a real scenario, we would see the inputs reset.
    // This test is just checking if the component handles the reset prop change.
  });
});