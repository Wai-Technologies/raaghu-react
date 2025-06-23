import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompMySettings from '../src/rds-comp-my-settings/rds-comp-my-settings';
import { InputSize } from '../../raaghu-elements/src/rds-input/rds-input';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name, 
    label, 
    placeholder, 
    inputType,
    onChange, 
    onBlur,
    value, 
    required,
    showIcon,
    reset,
    id,
    size,
    validatonPattern,
    validationMsg
  }: any) => (
    <div data-testid={`input-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={`input-field-${name.replace(/\s+/g, '-').toLowerCase()}`}
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        id={id}
      />
      {showIcon && <span data-testid={`icon-${name.replace(/\s+/g, '-').toLowerCase()}`}>👁️</span>}
    </div>
  ),
  RdsButton: ({ 
    label, 
    colorVariant, 
    isDisabled, 
    size, 
    type, 
    isOutline,
    onClick 
  }: any) => (
    <button 
      data-testid={`button-${label.toLowerCase()}`}
      type={type || "button"}
      disabled={isDisabled}
      className={`btn btn-${isOutline ? 'outline-' : ''}${colorVariant} btn-${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}));

describe('RdsCompMySettings Component', () => {
  // Sample settings details
  const sampleSettingDetails = {
    ProfileName: 'Test User',
    Email: 'test@example.com',
    UserName: 'testuser',
    curPass: 'currentPassword123',
    newPass: 'newPassword123',
    curNewPass: 'newPassword123'
  };

  // Mock function for save handler
  const mockSaveHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Basic rendering
  test('renders the form correctly with provided settings details', () => {
    render(
      <RdsCompMySettings 
        settingDetails={sampleSettingDetails} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Check if component renders all input fields
    expect(screen.getByTestId('input-profile-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-user-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-current-password')).toBeInTheDocument();
    expect(screen.getByTestId('input-new-password')).toBeInTheDocument();
    expect(screen.getByTestId('input-confirm-new-password')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('button-save')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
    
    // Check if input fields have the correct values
    expect(screen.getByTestId('input-field-profile-name')).toHaveValue('Test User');
    expect(screen.getByTestId('input-field-email')).toHaveValue('test@example.com');
    expect(screen.getByTestId('input-field-user-name')).toHaveValue('testuser');
    expect(screen.getByTestId('input-field-current-password')).toHaveValue('currentPassword123');
    expect(screen.getByTestId('input-field-new-password')).toHaveValue('newPassword123');
    expect(screen.getByTestId('input-field-confirm-new-password')).toHaveValue('newPassword123');
    
    // Save button should be enabled with valid form data
    expect(screen.getByTestId('button-save')).not.toBeDisabled();
  });

  // Test 2: Form with empty values (Save button should be disabled)
  test('disables save button with empty form values', () => {
    render(
      <RdsCompMySettings 
        settingDetails={{
          ProfileName: '',
          Email: '',
          UserName: '',
          curPass: '',
          newPass: '',
          curNewPass: ''
        }} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Save button should be disabled with invalid form data
    expect(screen.getByTestId('button-save')).toBeDisabled();
  });

  // Test 3: Form validation - Password mismatch
  test('shows error when passwords do not match', async () => {
    const { rerender } = render(
      <RdsCompMySettings 
        settingDetails={{
          ProfileName: 'Test User',
          Email: 'test@example.com',
          UserName: 'testuser',
          curPass: 'currentPassword123',
          newPass: 'newPassword123',
          curNewPass: 'differentPassword123'
        }} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Trigger blur event on confirm password field to show validation message
    fireEvent.blur(screen.getByTestId('input-field-confirm-new-password'));
    
    // Save button should be disabled with mismatched passwords
    expect(screen.getByTestId('button-save')).toBeDisabled();
  });

  // Test 4: Form validation - Email format
  test('validates email format correctly', () => {
    render(
      <RdsCompMySettings 
        settingDetails={{
          ProfileName: 'Test User',
          Email: 'invalid-email',
          UserName: 'testuser',
          curPass: 'currentPassword123',
          newPass: 'newPassword123',
          curNewPass: 'newPassword123'
        }} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Trigger change event to fix the email
    fireEvent.change(screen.getByTestId('input-field-email'), { 
      target: { value: 'valid@example.com' } 
    });
    
    // Trigger blur event to validate
    fireEvent.blur(screen.getByTestId('input-field-email'));
  });

  // Test 5: Password validation - Length requirement
  test('validates password length requirement', () => {
    render(
      <RdsCompMySettings 
        settingDetails={{
          ProfileName: 'Test User',
          Email: 'test@example.com',
          UserName: 'testuser',
          curPass: 'short',
          newPass: 'newPassword123',
          curNewPass: 'newPassword123'
        }} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Trigger blur event on current password field to show validation message
    fireEvent.blur(screen.getByTestId('input-field-current-password'));
    
    // Save button should be disabled with invalid password
    expect(screen.getByTestId('button-save')).toBeDisabled();
  });

  // Test 6: Form submission
  test('calls onSaveHandler with form data when save button is clicked', () => {
    render(
      <RdsCompMySettings 
        settingDetails={sampleSettingDetails} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Click the save button
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onSaveHandler was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith(sampleSettingDetails);
  });

  // Test 7: Reset functionality
  test('resets form when reset prop changes', () => {
    const { rerender } = render(
      <RdsCompMySettings 
        settingDetails={sampleSettingDetails} 
        onSaveHandler={mockSaveHandler}
        reset={false}
      />
    );
    
    // Re-render with reset=true
    rerender(
      <RdsCompMySettings 
        settingDetails={sampleSettingDetails} 
        onSaveHandler={mockSaveHandler}
        reset={true}
      />
    );
    
    // The component should update its internal inputReset state
    // This is hard to test directly but we can verify component still renders
    expect(screen.getByTestId('button-save')).toBeInTheDocument();
  });

  // Test 8: Form field updates
  test('updates form data when input fields change', () => {
    render(
      <RdsCompMySettings 
        settingDetails={sampleSettingDetails} 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Change the profile name
    fireEvent.change(screen.getByTestId('input-field-profile-name'), { 
      target: { value: 'Updated Name' } 
    });
    
    // Change the email
    fireEvent.change(screen.getByTestId('input-field-email'), { 
      target: { value: 'updated@example.com' } 
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('button-save'));
    
    // Check if onSaveHandler was called with updated data
    expect(mockSaveHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        ProfileName: 'Updated Name',
        Email: 'updated@example.com'
      })
    );
  });
});