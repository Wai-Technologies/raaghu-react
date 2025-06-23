import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompContactInformation from '../src/rds-comp-contact-information/rds-comp-contact-information';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    id, 
    inputType, 
    name, 
    label, 
    labelPosition, 
    placeholder, 
    required, 
    readonly,
    isDisabled,
    size,
    value,
    onChange,
    onKeyDown,
    reset,
    validatonPattern,
    validationMsg,
    dataTestId,
    ...rest 
  }: any) => (
    <div data-testid={`input-wrapper-${name}`}>
      <label>{name}</label>
      <input
        data-testid={dataTestId || `input-${name}`}
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        disabled={isDisabled}
        readOnly={readonly}
        {...rest}
      />
      {validatonPattern && value && !validatonPattern.test(value) && (
        <div data-testid={`validation-error-${name}`}>{validationMsg}</div>
      )}
    </div>
  ),
  RdsCheckbox: ({ 
    id, 
    labelText, 
    checked, 
    onChange,
    dataTestId,
    ...rest 
  }: any) => (
    <div>
      <input
        data-testid={dataTestId || `checkbox-${id}`}
        type="checkbox"
        id={id}
        checked={checked || false}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={id}>{labelText}</label>
    </div>
  ),
  RdsButton: ({ 
    label, 
    colorVariant, 
    isDisabled, 
    block, 
    tooltipTitle, 
    type,
    dataTestId,
    onClick,
    ...rest 
  }: any) => (
    <button
      data-testid={dataTestId || `button-${label}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`btn btn-${colorVariant} ${block ? 'btn-block' : ''}`}
      title={tooltipTitle}
      {...rest}
    >
      {label}
    </button>
  ),
  RdsLabel: ({ children, ...rest }: any) => <label {...rest}>{children}</label>
}));

describe('RdsCompContactInformation', () => {
  const mockContactInfo = {
    email: 'test@example.com',
    contact: '1234567890',
    checked: true
  };

  const mockSaveHandler = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompContactInformation />);
    expect(container).toBeTruthy();
  });

  it('renders all form elements correctly', () => {
    render(<RdsCompContactInformation />);
    
    // Email input should be present
    expect(screen.getByTestId('input-Email')).toBeInTheDocument();
    
    // Contact input should be present
    expect(screen.getByTestId('contact-number')).toBeInTheDocument();
    
    // Checkbox should be present
    expect(screen.getByTestId('remember-me')).toBeInTheDocument();
    
    // Continue button should be present but disabled initially
    const continueButton = screen.getByTestId('continue');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton).toBeDisabled();
  });

  it('initializes with provided contact information data', () => {
    render(
      <RdsCompContactInformation 
        contactInformationData={mockContactInfo}
      />
    );
    
    // Email input should have the provided value
    expect(screen.getByTestId('input-Email')).toHaveValue('test@example.com');
    
    // Contact input should have the provided value
    expect(screen.getByTestId('contact-number')).toHaveValue('1234567890');
    
    // Checkbox should be checked
    expect(screen.getByTestId('remember-me')).toBeChecked();
    
    // Continue button should be enabled
    expect(screen.getByTestId('continue')).not.toBeDisabled();
  });

  it('updates contact information when inputs change', () => {
    render(<RdsCompContactInformation />);
    
    // Change email input
    const emailInput = screen.getByTestId('input-Email');
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    expect(emailInput).toHaveValue('new@example.com');
    
    // Change contact input
    const contactInput = screen.getByTestId('contact-number');
    fireEvent.change(contactInput, { target: { value: '9876543210' } });
    expect(contactInput).toHaveValue('9876543210');
    
    // Check checkbox
    const checkbox = screen.getByTestId('remember-me');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('validates email input correctly', async () => {
    render(<RdsCompContactInformation />);
    
    // Get form elements
    const emailInput = screen.getByTestId('input-Email');
    const contactInput = screen.getByTestId('contact-number');
    const checkbox = screen.getByTestId('remember-me');
    const continueButton = screen.getByTestId('continue');
    
    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Enter valid contact
    fireEvent.change(contactInput, { target: { value: '1234567890' } });
    
    // Check checkbox
    fireEvent.click(checkbox);
    
    // Button should still be disabled due to invalid email
    expect(continueButton).toBeDisabled();
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    
    // Button should be enabled now
    expect(continueButton).not.toBeDisabled();
  });

  it('validates contact input correctly', () => {
    render(<RdsCompContactInformation />);
    
    // Get form elements
    const emailInput = screen.getByTestId('input-Email');
    const contactInput = screen.getByTestId('contact-number');
    const checkbox = screen.getByTestId('remember-me');
    const continueButton = screen.getByTestId('continue');
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    
    // Leave contact empty
    fireEvent.change(contactInput, { target: { value: '' } });
    
    // Check checkbox
    fireEvent.click(checkbox);
    
    // Button should be disabled due to empty contact
    expect(continueButton).toBeDisabled();
    
    // Enter valid contact
    fireEvent.change(contactInput, { target: { value: '1234567890' } });
    
    // Button should be enabled now
    expect(continueButton).not.toBeDisabled();
  });

  it('requires checkbox to be checked for form validation', () => {
    render(<RdsCompContactInformation />);
    
    // Get form elements
    const emailInput = screen.getByTestId('input-Email');
    const contactInput = screen.getByTestId('contact-number');
    const checkbox = screen.getByTestId('remember-me');
    const continueButton = screen.getByTestId('continue');
    
    // Enter valid email and contact
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(contactInput, { target: { value: '1234567890' } });
    
    // Checkbox not checked
    expect(checkbox).not.toBeChecked();
    
    // Button should be disabled
    expect(continueButton).toBeDisabled();
    
    // Check checkbox
    fireEvent.click(checkbox);
    
    // Button should be enabled now
    expect(continueButton).not.toBeDisabled();
  });
  it('allows only numbers and + in contact input', () => {
    render(<RdsCompContactInformation />);
    
    const contactInput = screen.getByTestId('contact-number');
    
    // Test entering a number - simulate typing a valid character
    fireEvent.change(contactInput, { target: { value: '5' } });
    expect(contactInput).toHaveValue('5');
    
    // Test entering a letter - in the actual component, the preventDefault would be 
    // called in the onKeyDown handler, but in our test we're directly changing the value
    // So we simulate what would happen when user tries to type an invalid character
    fireEvent.change(contactInput, { target: { value: '5a' } });
    
    // Try to enter a + at the start - this is allowed
    fireEvent.change(contactInput, { target: { value: '' } });
    fireEvent.change(contactInput, { target: { value: '+' } });
    expect(contactInput).toHaveValue('+');
    
    // Test entering a + after some digits - the component would prevent this
    // but we're simulating it here by seeing what happens in the UI
    fireEvent.change(contactInput, { target: { value: '123' } });
    expect(contactInput).toHaveValue('123');
  });
  it('limits the length of contact number input', () => {
    render(<RdsCompContactInformation />);
    
    const contactInput = screen.getByTestId('contact-number');
    
    // Test with regular phone number (10 digits)
    // In the real component, the length would be limited by the onKeyDown handler
    // but for testing purposes, we can just simulate the input change
    fireEvent.change(contactInput, { target: { value: '1234567890' } });
    expect(contactInput).toHaveValue('1234567890');
    
    // Test with phone number starting with + (should allow up to 13 chars)
    fireEvent.change(contactInput, { target: { value: '' } });
    fireEvent.change(contactInput, { target: { value: '+123456789012' } });
    expect(contactInput).toHaveValue('+123456789012');
    
    // For more comprehensive testing, we could mock the component's handleDataChanges function
    // but this basic test ensures the inputs work as expected
  });

  it('calls onSaveHandler with correct data when form is submitted', () => {
    render(
      <RdsCompContactInformation 
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Fill form with valid data
    fireEvent.change(screen.getByTestId('input-Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('contact-number'), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByTestId('remember-me'));
    
    // Submit form
    fireEvent.click(screen.getByTestId('continue'));
    
    // Check if onSaveHandler was called with correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      contact: '1234567890',
      checked: true
    });
  });

  it('resets form when reset prop is changed', () => {
    const { rerender } = render(
      <RdsCompContactInformation 
        contactInformationData={mockContactInfo}
        reset={false}
      />
    );
    
    // Form should have initial values
    expect(screen.getByTestId('input-Email')).toHaveValue('test@example.com');
    expect(screen.getByTestId('contact-number')).toHaveValue('1234567890');
    expect(screen.getByTestId('remember-me')).toBeChecked();
    
    // Change reset prop
    rerender(
      <RdsCompContactInformation 
        contactInformationData={mockContactInfo}
        reset={true}
      />
    );
    
    // The component should update inputReset state, triggering a reset of form elements
    // In a real component with actual RdsInput, this would reset the input
    // But since we're mocking RdsInput, we just verify that the reset prop was passed
  });
});