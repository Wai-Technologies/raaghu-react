import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompCMS from '../src/rds-comp-cms/rds-comp-cms';

// Mock the RdsButton and RdsInput components
jest.mock('../src/rds-elements', () => ({
  RdsButton: ({ 
    label, 
    type, 
    colorVariant, 
    size, 
    dataTestId, 
    isDisabled,
    onClick 
  }: any) => (
    <button
      data-testid={dataTestId}
      type={type}
      disabled={isDisabled}
      className={`btn btn-${colorVariant} btn-${size}`}
      onClick={onClick}
    >
      {label}
    </button>
  ),
  RdsInput: ({ 
    name, 
    label, 
    reset, 
    inputType, 
    placeholder, 
    required, 
    value, 
    onChange, 
    dataTestId, 
    fontWeight,
    validatonPattern,
    validationMsg
  }: any) => (
    <div data-testid="input-wrapper">
      {label && <label htmlFor={dataTestId}>{name}</label>}
      <input
        data-testid={dataTestId}
        type={inputType || 'text'}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`font-weight-${fontWeight}`}
      />
      {validationMsg && <div data-testid="validation-message">{validationMsg}</div>}
    </div>
  )
}));

describe('RdsCompCMS', () => {
  // Default props for testing
  const defaultProps = {
    receiverEmailAddress: '',
    onSubmit: jest.fn()
  };

  it('renders without crashing', () => {
    const { container } = render(<RdsCompCMS {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders the email input field with correct props', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', 'info@mycompanyname.com');
    expect(emailInput).toHaveAttribute('type', 'text');
  });

  it('renders the save button with correct props', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    expect(saveButton).toBeInTheDocument();
    expect(saveButton).toHaveAttribute('type', 'submit');
    expect(saveButton).toHaveClass('btn-primary');
    expect(saveButton).toHaveClass('btn-small');
    expect(saveButton).toBeDisabled(); // Initially disabled when email is empty
  });

  it('updates email state when input changes', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('enables save button when a valid email is entered', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const saveButton = screen.getByTestId('save');
    
    // Initially the button should be disabled
    expect(saveButton).toBeDisabled();
    
    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Now the button should be enabled
    expect(saveButton).not.toBeDisabled();
  });

  it('keeps save button disabled when an invalid email is entered', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const saveButton = screen.getByTestId('save');
    
    // Enter an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Button should still be disabled
    expect(saveButton).toBeDisabled();
  });

  it('calls onSubmit with correct value when form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<RdsCompCMS {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const form = emailInput.closest('form');
    
    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.submit(form!);
    
    // Check if onSubmit was called with the correct value
    expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com');
  });

  it('resets the input field after form submission', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const form = emailInput.closest('form');
    
    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Submit the form
    fireEvent.submit(form!);
    
    // Email input should be cleared
    expect(emailInput).toHaveValue('');
  });

  it('initializes with provided email address', () => {
    render(<RdsCompCMS {...defaultProps} receiverEmailAddress="initial@example.com" />);
    
    const emailInput = screen.getByTestId('receiver-email');
    expect(emailInput).toHaveValue('initial@example.com');
  });

  it('updates when receiverEmailAddress prop changes', () => {
    const { rerender } = render(<RdsCompCMS {...defaultProps} receiverEmailAddress="initial@example.com" />);
    
    // Verify initial value
    let emailInput = screen.getByTestId('receiver-email');
    expect(emailInput).toHaveValue('initial@example.com');
    
    // Rerender with new prop value
    rerender(<RdsCompCMS {...defaultProps} receiverEmailAddress="updated@example.com" />);
    
    // Verify the value was updated
    emailInput = screen.getByTestId('receiver-email');
    expect(emailInput).toHaveValue('updated@example.com');
  });

  it('handles multiple form submissions correctly', () => {
    const mockOnSubmit = jest.fn();
    render(<RdsCompCMS {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const form = emailInput.closest('form');
    
    // First submission
    fireEvent.change(emailInput, { target: { value: 'test1@example.com' } });
    fireEvent.submit(form!);
    expect(mockOnSubmit).toHaveBeenCalledWith('test1@example.com');
    expect(emailInput).toHaveValue('');
    
    // Second submission
    fireEvent.change(emailInput, { target: { value: 'test2@example.com' } });
    fireEvent.submit(form!);
    expect(mockOnSubmit).toHaveBeenCalledWith('test2@example.com');
    expect(emailInput).toHaveValue('');
    
    // Verify onSubmit was called twice
    expect(mockOnSubmit).toHaveBeenCalledTimes(2);
  });  it('does not call onSubmit when form is submitted with invalid email', () => {
    const mockOnSubmit = jest.fn();
    render(<RdsCompCMS {...defaultProps} onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const saveButton = screen.getByTestId('save');
    
    // Enter an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Verify the button is disabled to prevent form submission
    expect(saveButton).toBeDisabled();
    
    // Try to click the button (should have no effect since it's disabled)
    fireEvent.click(saveButton);
    
    // onSubmit should not have been called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
  
  it('validates a valid email format correctly', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const saveButton = screen.getByTestId('save');
    
    // Test with a valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Button should be enabled for valid email
    expect(saveButton).not.toBeDisabled();
  });
  
  it('rejects an invalid email format correctly', () => {
    render(<RdsCompCMS {...defaultProps} />);
    
    const emailInput = screen.getByTestId('receiver-email');
    const saveButton = screen.getByTestId('save');
    
    // Test with an invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Button should stay disabled for invalid email
    expect(saveButton).toBeDisabled();
  });
});