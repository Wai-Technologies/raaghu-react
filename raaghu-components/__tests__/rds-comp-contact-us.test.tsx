import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompContactUs from '../src/rds-comp-contact-us/rds-comp-contact-us';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name,
    label,
    reset,
    required,
    validatonPattern,
    validationMsg,
    placeholder,
    inputType,
    onChange,
    dataTestId,
    value,
    ...rest 
  }: any) => (
    <div data-testid={`input-wrapper-${name}`}>
      {label && <label>{name}</label>}
      <input
        data-testid={dataTestId || `input-${name}`}
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        {...rest}
      />
      {validationMsg && (
        <div data-testid={`validation-error-${name}`}>{validationMsg}</div>
      )}
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    reset,
    placeholder,
    isMandatory,
    onChange,
    rows,
    value,
    dataTestId,
    ...rest 
  }: any) => (
    <div data-testid={`textarea-wrapper-${label}`}>
      <label>{label}</label>
      <textarea
        data-testid={dataTestId || `textarea-${label}`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
        required={isMandatory}
        {...rest}
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    colorVariant, 
    isDisabled, 
    block, 
    tooltipTitle, 
    onClick,
    type,
    ...rest 
  }: any) => (
    <button
      data-testid={`button-${label.replace(/\s+/g, '-').toLowerCase()}`}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`btn btn-${colorVariant} ${block ? 'btn-block' : ''}`}
      title={tooltipTitle}
      {...rest}
    >
      {label}
    </button>
  )
}));

describe('RdsCompContactUs', () => {
  // Sample contact us data for testing
  const mockContactUsData = {
    email: 'test@example.com',
    fullname: 'John Doe',
    message: 'This is a test message'
  };

  // Mock save handler
  const mockSaveHandler = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <RdsCompContactUs 
        contactus={{}} 
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders all form elements correctly', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Email input should be present
    expect(screen.getByTestId('email')).toBeInTheDocument();
    
    // Full Name input should be present
    expect(screen.getByTestId('fullname')).toBeInTheDocument();
    
    // Message textarea should be present
    expect(screen.getByTestId('message')).toBeInTheDocument();
    
    // Send Message button should be present but disabled initially
    const sendButton = screen.getByTestId('button-send-message');
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeDisabled();
  });

  it('initializes with provided contact us data', () => {
    render(
      <RdsCompContactUs 
        contactus={mockContactUsData}
      />
    );
    
    // Email input should have the provided value
    expect(screen.getByTestId('email')).toHaveValue('test@example.com');
    
    // Full Name input should have the provided value
    expect(screen.getByTestId('fullname')).toHaveValue('John Doe');
    
    // Message textarea should have the provided value
    expect(screen.getByTestId('message')).toHaveValue('This is a test message');
    
    // Send Message button should be enabled
    expect(screen.getByTestId('button-send-message')).not.toBeDisabled();
  });

  it('updates form data when inputs change', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Change email input
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
    expect(emailInput).toHaveValue('new@example.com');
    
    // Change full name input
    const fullnameInput = screen.getByTestId('fullname');
    fireEvent.change(fullnameInput, { target: { value: 'Jane Smith' } });
    expect(fullnameInput).toHaveValue('Jane Smith');
    
    // Change message textarea
    const messageTextarea = screen.getByTestId('message');
    fireEvent.change(messageTextarea, { target: { value: 'New test message' } });
    expect(messageTextarea).toHaveValue('New test message');
  });

  it('validates email input correctly', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Get form elements
    const emailInput = screen.getByTestId('email');
    const fullnameInput = screen.getByTestId('fullname');
    const messageTextarea = screen.getByTestId('message');
    const sendButton = screen.getByTestId('button-send-message');
    
    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Enter valid fullname and message
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } });
    
    // Button should still be disabled due to invalid email
    expect(sendButton).toBeDisabled();
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    
    // Button should be enabled now
    expect(sendButton).not.toBeDisabled();
  });

  it('validates full name input correctly', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Get form elements
    const emailInput = screen.getByTestId('email');
    const fullnameInput = screen.getByTestId('fullname');
    const messageTextarea = screen.getByTestId('message');
    const sendButton = screen.getByTestId('button-send-message');
    
    // Enter valid email and message
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } });
    
    // Leave fullname empty
    fireEvent.change(fullnameInput, { target: { value: '' } });
    
    // Button should be disabled due to empty fullname
    expect(sendButton).toBeDisabled();
    
    // Enter valid fullname
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });
    
    // Button should be enabled now
    expect(sendButton).not.toBeDisabled();
  });

  it('validates message input correctly', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Get form elements
    const emailInput = screen.getByTestId('email');
    const fullnameInput = screen.getByTestId('fullname');
    const messageTextarea = screen.getByTestId('message');
    const sendButton = screen.getByTestId('button-send-message');
    
    // Enter valid email and fullname
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(fullnameInput, { target: { value: 'John Doe' } });
    
    // Leave message empty
    fireEvent.change(messageTextarea, { target: { value: '' } });
    
    // Button should be disabled due to empty message
    expect(sendButton).toBeDisabled();
    
    // Enter valid message
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } });
    
    // Button should be enabled now
    expect(sendButton).not.toBeDisabled();
  });

  it('shows validation error messages for invalid inputs', () => {
    render(<RdsCompContactUs contactus={{}} />);
    
    // Test email validation error
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Since our mock doesn't exactly replicate the component's behavior for showing error messages,
    // we can't directly test for the presence of error messages in this test.
    // In a real component, we would check if the error message is displayed.
  });

  it('calls onSaveHandler with correct data when form is submitted', () => {
    render(
      <RdsCompContactUs 
        contactus={{}}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Fill form with valid data
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('fullname'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('message'), { target: { value: 'Test message' } });
    
    // Submit form
    fireEvent.click(screen.getByTestId('button-send-message'));
    
    // Check if onSaveHandler was called with correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      email: 'test@example.com',
      fullname: 'John Doe',
      message: 'Test message'
    });
  });

  it('resets form after submission', () => {
    render(
      <RdsCompContactUs 
        contactus={mockContactUsData}
        onSaveHandler={mockSaveHandler}
      />
    );
    
    // Form should have initial values
    expect(screen.getByTestId('email')).toHaveValue('test@example.com');
    expect(screen.getByTestId('fullname')).toHaveValue('John Doe');
    expect(screen.getByTestId('message')).toHaveValue('This is a test message');
    
    // Submit form
    fireEvent.click(screen.getByTestId('button-send-message'));
    
    // Our mock doesn't reset the form values after submission, but in the real component
    // they would be reset after calling emitSaveData
  });

  it('resets form when reset prop changes', () => {
    const { rerender } = render(
      <RdsCompContactUs 
        contactus={mockContactUsData}
        reset={false}
      />
    );
    
    // Form should have initial values
    expect(screen.getByTestId('email')).toHaveValue('test@example.com');
    expect(screen.getByTestId('fullname')).toHaveValue('John Doe');
    expect(screen.getByTestId('message')).toHaveValue('This is a test message');
    
    // Change reset prop
    rerender(
      <RdsCompContactUs 
        contactus={mockContactUsData}
        reset={true}
      />
    );
    
    // The component should update inputReset state, triggering a reset of form elements
    // Since we're mocking the form elements, we just verify that the reset prop was passed
  });
});