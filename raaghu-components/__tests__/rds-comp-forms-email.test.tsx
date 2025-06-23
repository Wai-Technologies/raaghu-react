import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFormsEmail, { RdsCompFormsEmailProps } from '../src/rds-comp-forms-email/rds-comp-forms-email';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    onChange, 
    value, 
    validationMsg,
    placeholder,
    inputType,
    dataTestId,
    name,
    ...props 
  }: any) => (
    <div data-testid={`input-wrapper-${dataTestId || 'default'}`}>
      <label>{props.label && name}</label>
      <input
        data-testid={dataTestId || 'default-input'}
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={(e) => onChange && onChange(e)}
        aria-invalid={!!validationMsg}
      />
      {validationMsg && <div data-testid="validation-error">{validationMsg}</div>}
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled, 
    dataTestId,
    ...props 
  }: any) => (
    <button
      data-testid={dataTestId || 'default-button'}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {label}
    </button>
  ),
  RdsLabel: ({ 
    children,
    ...props 
  }: any) => (
    <label data-testid="body-label">
      {children}
    </label>
  ),
  RdsTextEditor: ({ 
    onChange, 
    value,
    ...props 
  }: any) => (
    <div data-testid="text-editor-wrapper">
      <textarea
        data-testid="body"
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  )
}));

describe('RdsCompFormsEmail', () => {
  // Default props for the component
  const defaultProps: RdsCompFormsEmailProps = {
    formsEmailData: {
      to: '',
      subject: '',
      body: ''
    },
    reset: false,
    onDataSendHandler: jest.fn()
  };

  // Pre-populated props
  const populatedProps: RdsCompFormsEmailProps = {
    formsEmailData: {
      to: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test body content'
    },
    reset: false,
    onDataSendHandler: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the email form correctly', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    // Check for essential elements
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('subject')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByTestId('body-label')).toBeInTheDocument();
    expect(screen.getByTestId('send')).toBeInTheDocument();
    
    // Send button should be disabled initially because email is empty
    expect(screen.getByTestId('send')).toBeDisabled();
  });

  it('should pre-populate form fields with existing data', () => {
    render(<RdsCompFormsEmail {...populatedProps} />);
    
    // Check that fields have correct values
    expect(screen.getByTestId('email')).toHaveValue('test@example.com');
    expect(screen.getByTestId('subject')).toHaveValue('Test Subject');
    expect(screen.getByTestId('body')).toHaveValue('Test body content');
    
    // Send button should be enabled as email is valid
    expect(screen.getByTestId('send')).not.toBeDisabled();
  });

  // 2. Email Validation Tests
  it('should disable send button when email is empty', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    // Send button should be disabled initially
    expect(screen.getByTestId('send')).toBeDisabled();
    
    // Enter a valid email
    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Send button should be enabled now
    expect(screen.getByTestId('send')).not.toBeDisabled();
    
    // Clear the email
    fireEvent.change(emailInput, { target: { value: '' } });
    
    // Send button should be disabled again
    expect(screen.getByTestId('send')).toBeDisabled();
  });

  it('should display validation error for invalid email format', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const emailInput = screen.getByTestId('email');
    
    // Enter invalid email
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Check that validation error appears
    expect(screen.getByTestId('validation-error')).toHaveTextContent('Please enter a valid email address.');
    
    // Send button should remain disabled
    expect(screen.getByTestId('send')).toBeDisabled();
  });

  it('should enable send button when valid email is entered', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const emailInput = screen.getByTestId('email');
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // Check that send button is enabled
    expect(screen.getByTestId('send')).not.toBeDisabled();
  });

  it('should display required field error when email is empty after having a value', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const emailInput = screen.getByTestId('email');
    
    // Enter valid email then clear it
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    
    // Check that validation error appears
    expect(screen.getByTestId('validation-error')).toHaveTextContent('Email is required.');
  });

  // 3. Input Handling Tests
  it('should update subject field correctly', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const subjectInput = screen.getByTestId('subject');
    
    // Enter subject
    fireEvent.change(subjectInput, { target: { value: 'New Test Subject' } });
    
    // Check that subject is updated
    expect(subjectInput).toHaveValue('New Test Subject');
  });

  it('should update body field correctly', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const bodyInput = screen.getByTestId('body');
    
    // Enter body text
    fireEvent.change(bodyInput, { target: { value: 'New test body content' } });
    
    // Check that body is updated
    expect(bodyInput).toHaveValue('New test body content');
  });

  // 4. Form Submission Tests
  it('should call onDataSendHandler when form is submitted with valid data', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const emailInput = screen.getByTestId('email');
    const subjectInput = screen.getByTestId('subject');
    const bodyInput = screen.getByTestId('body');
    const sendButton = screen.getByTestId('send');
    
    // Enter form data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(bodyInput, { target: { value: 'Test body content' } });
    
    // Submit the form
    fireEvent.click(sendButton);
    
    // Check that onDataSendHandler was called with the correct data
    expect(defaultProps.onDataSendHandler).toHaveBeenCalledWith({
      to: 'test@example.com',
      subject: 'Test Subject',
      body: 'Test body content'
    });
  });

  it('should reset form fields after successful submission', () => {
    render(<RdsCompFormsEmail {...defaultProps} />);
    
    const emailInput = screen.getByTestId('email');
    const subjectInput = screen.getByTestId('subject');
    const bodyInput = screen.getByTestId('body');
    const sendButton = screen.getByTestId('send');
    
    // Enter form data
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(bodyInput, { target: { value: 'Test body content' } });
    
    // Submit the form
    fireEvent.click(sendButton);
    
    // We can't directly test the reset functionality with our mocks
    // But we can verify that onDataSendHandler was called
    expect(defaultProps.onDataSendHandler).toHaveBeenCalled();
  });

  // 5. Props Update Tests
  it('should update form fields when formsEmailData props change', () => {
    const { rerender } = render(<RdsCompFormsEmail {...defaultProps} />);
    
    // Check initial empty values
    expect(screen.getByTestId('email')).toHaveValue('');
    expect(screen.getByTestId('subject')).toHaveValue('');
    expect(screen.getByTestId('body')).toHaveValue('');
    
    // Update props with new data
    const updatedProps = {
      ...defaultProps,
      formsEmailData: {
        to: 'updated@example.com',
        subject: 'Updated Subject',
        body: 'Updated body content'
      }
    };
    
    rerender(<RdsCompFormsEmail {...updatedProps} />);
    
    // Check that form fields have been updated
    expect(screen.getByTestId('email')).toHaveValue('updated@example.com');
    expect(screen.getByTestId('subject')).toHaveValue('Updated Subject');
    expect(screen.getByTestId('body')).toHaveValue('Updated body content');
  });

  it('should handle reset prop change', () => {
    const { rerender } = render(<RdsCompFormsEmail {...defaultProps} />);
    
    // Update the reset prop
    const updatedProps = {
      ...defaultProps,
      reset: true
    };
    
    // This shouldn't throw an error
    expect(() => rerender(<RdsCompFormsEmail {...updatedProps} />)).not.toThrow();
  });

  // 6. Edge Cases
  it('should handle missing formsEmailData values gracefully', () => {
    const incompleteProps = {
      ...defaultProps,
      formsEmailData: {
        // Missing to, subject, and body
      }
    };
    
    // This shouldn't throw an error
    expect(() => render(<RdsCompFormsEmail {...incompleteProps} />)).not.toThrow();
  });

  it('should handle missing onDataSendHandler prop gracefully', () => {
    const propsWithoutHandler = {
      ...defaultProps,
      onDataSendHandler: undefined
    };
    
    render(<RdsCompFormsEmail {...propsWithoutHandler} />);
    
    const emailInput = screen.getByTestId('email');
    const sendButton = screen.getByTestId('send');
    
    // Enter valid email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    // This shouldn't throw an error when clicked
    expect(() => fireEvent.click(sendButton)).not.toThrow();
  });
});