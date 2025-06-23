// filepath: e:\OneDrive - WAi Technologies\Raaghu Design System Projects\docmentation\raaghu-react\raaghu-components\__tests__\rds-comp-profile-edit.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompProfileEdit from '../src/rds-comp-profile-edit/rds-comp-profile-edit';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    label, 
    name, 
    inputType, 
    placeholder, 
    value, 
    onChange, 
    required, 
    validatonPattern, 
    validationMsg, 
    dataTestId 
  }: any) => (
    <div>
      {label && <label htmlFor={name}>{name}</label>}
      <input
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-testid={dataTestId}
        aria-invalid={validatonPattern && !validatonPattern.test(value || '')}
        aria-errormessage={validationMsg}
      />
      {validatonPattern && value && !validatonPattern.test(value) && (
        <div className="error-message" data-testid={`${dataTestId}-error`}>{validationMsg}</div>
      )}
    </div>
  ),
  RdsButton: ({ 
    label, 
    type, 
    isOutline, 
    colorVariant, 
    isDisabled, 
    onClick, 
    dataTestId 
  }: any) => (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      data-testid={dataTestId}
      data-outline={isOutline}
      data-color={colorVariant}
    >
      {label}
    </button>
  )
}));

describe('RdsCompProfileEdit', () => {  // Sample profile data for testing
  const sampleProfileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890', // Keep as string for consistency
    userName: 'johndoe'
  };
  
  // Mock save handler function
  const mockSaveHandler = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should render the profile edit form with all input fields', () => {
    render(<RdsCompProfileEdit />);
    
    // Check if all input fields are rendered
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('phone-number')).toBeInTheDocument();
    expect(screen.getByTestId('username')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
  });
  it('should populate form with provided profile data', () => {
    render(<RdsCompProfileEdit profileEditData={sampleProfileData} />);
    
    // Check if input fields are populated with the provided data
    expect(screen.getByTestId('name')).toHaveValue(sampleProfileData.name);
    expect(screen.getByTestId('email')).toHaveValue(sampleProfileData.email);
    
    // Use a different approach for number inputs as they can have type conversion issues
    const phoneInput = screen.getByTestId('phone-number');
    expect(phoneInput.getAttribute('value')).toBe(sampleProfileData.phoneNumber);
    
    expect(screen.getByTestId('username')).toHaveValue(sampleProfileData.userName);
  });
  it('should update form data when inputs change', () => {
    render(<RdsCompProfileEdit profileEditData={sampleProfileData} />);
    
    // Change the name input
    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(nameInput).toHaveValue('Jane Doe');
    
    // Change the email input
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
    expect(emailInput).toHaveValue('jane.doe@example.com');
    
    // Change the phone input - use getAttribute for value comparison
    const phoneInput = screen.getByTestId('phone-number');
    fireEvent.change(phoneInput, { target: { value: '9876543210' } });
    expect(phoneInput.getAttribute('value')).toBe('9876543210');
    
    // Change the username input
    const usernameInput = screen.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'janedoe' } });
    expect(usernameInput).toHaveValue('janedoe');
  });

  it('should disable save button if form is invalid', () => {
    render(<RdsCompProfileEdit profileEditData={{ name: '', email: '', phoneNumber: '', userName: '' }} />);
    
    // Save button should be disabled with empty form
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeDisabled();
    
    // Fill name field only
    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(saveButton).toBeDisabled(); // Still disabled as other fields are empty
    
    // Fill all fields with valid data
    const emailInput = screen.getByTestId('email');
    const phoneInput = screen.getByTestId('phone-number');
    const usernameInput = screen.getByTestId('username');
    
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    
    expect(saveButton).not.toBeDisabled(); // Should be enabled now
  });

  it('should validate email format', () => {
    render(<RdsCompProfileEdit profileEditData={sampleProfileData} />);
    
    // Change email to invalid format
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Check if validation indicates invalid format
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    
    // Change to valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('should validate phone number format', () => {
    render(<RdsCompProfileEdit profileEditData={sampleProfileData} />);
    
    // Change phone to invalid format (less than 10 digits)
    const phoneInput = screen.getByTestId('phone-number');
    fireEvent.change(phoneInput, { target: { value: '123456' } });
    
    // Check if validation indicates invalid format
    expect(phoneInput).toHaveAttribute('aria-invalid', 'true');
    
    // Change to valid phone number
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    expect(phoneInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('should call onSaveHandler with form data when save button is clicked', () => {
    render(
      <RdsCompProfileEdit 
        profileEditData={sampleProfileData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Update name to ensure we're sending changed data
    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    
    // Click save button
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    // Check if onSaveHandler was called with correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      ...sampleProfileData,
      name: 'Updated Name'
    });
  });  it('should reset form data after successful save', async () => {
    render(
      <RdsCompProfileEdit 
        profileEditData={sampleProfileData} 
        onSaveHandler={mockSaveHandler} 
      />
    );
    
    // Click save button
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    // Check if form is reset - use a more lenient approach with queryByTestId
    await waitFor(() => {
      const nameInput = screen.getByTestId('name') as HTMLInputElement;
      const emailInput = screen.getByTestId('email') as HTMLInputElement;
      const phoneInput = screen.getByTestId('phone-number') as HTMLInputElement;
      const usernameInput = screen.getByTestId('username') as HTMLInputElement;
      
      // Check if the inputs are empty or have empty string values
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(phoneInput.value).toBe('');
      expect(usernameInput.value).toBe('');
    });
  });
  it('should update form when profileEditData prop changes', async () => {
    const { rerender } = render(<RdsCompProfileEdit profileEditData={sampleProfileData} />);
    
    // Check initial values
    expect(screen.getByTestId('name')).toHaveValue(sampleProfileData.name);
    
    // New profile data
    const updatedProfileData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '9876543210',
      userName: 'janesmith'
    };
    
    // Re-render with new props
    rerender(<RdsCompProfileEdit profileEditData={updatedProfileData} />);
    
    // Check if form is updated with new data
    await waitFor(() => {
      expect(screen.getByTestId('name')).toHaveValue(updatedProfileData.name);
      expect(screen.getByTestId('email')).toHaveValue(updatedProfileData.email);
      
      // Use getAttribute for phone number to avoid type issues
      const phoneInput = screen.getByTestId('phone-number');
      expect(phoneInput.getAttribute('value')).toBe(updatedProfileData.phoneNumber);
      
      expect(screen.getByTestId('username')).toHaveValue(updatedProfileData.userName);
    });
  });
  it('should handle undefined profileEditData prop', () => {
    // Render with undefined profileEditData
    render(<RdsCompProfileEdit />);
    
    // All inputs should be empty strings or have no value
    const nameInput = screen.getByTestId('name') as HTMLInputElement;
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const phoneInput = screen.getByTestId('phone-number') as HTMLInputElement;
    const usernameInput = screen.getByTestId('username') as HTMLInputElement;
    
    // Check that inputs are empty
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(phoneInput.value).toBe('');
    expect(usernameInput.value).toBe('');
    
    // Save button should be disabled
    expect(screen.getByTestId('save')).toBeDisabled();
  });
});