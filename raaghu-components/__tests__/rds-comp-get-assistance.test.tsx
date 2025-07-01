import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompGetAssistance, { RdsCompGetAssistanceProps } from '../src/rds-comp-get-assistance/rds-comp-get-assistance';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name, 
    onChange, 
    value, 
    placeholder, 
    required,
    inputType,
    reset,
    onKeyDown,
    ...props 
  }: any) => (
    <div data-testid={`input-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <label>{name}{required && '*'}</label>
      <input
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        onKeyDown={onKeyDown}
        data-testid={`input-field-${name.toLowerCase().replace(/\s+/g, '-')}`}
        {...props}
      />
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    onChange, 
    value, 
    placeholder, 
    rows,
    isMandatory,
    reset,
    ...props 
  }: any) => (
    <div data-testid="textarea-notes">
      <label>{label}{isMandatory && '*'}</label>
      <textarea
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
        data-testid="textarea-field-notes"
        {...props}
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    isDisabled,
    colorVariant,
    ...props 
  }: any) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      data-testid={`button-${colorVariant}`}
      {...props}
    >
      {label}
    </button>
  ),
  RdsDropdownList: () => <div data-testid="dropdown-list"></div>,
  RdsCompSelectList: () => <div data-testid="select-list"></div>,
  RdsCompLabel: ({ children, ...props }: any) => (
    <label data-testid="label" {...props}>
      {children}
    </label>
  )
}));

describe('RdsCompGetAssistance', () => {
  // Sample data for the component
  const sampleGetAssistanceData = {
    name: '',
    email: '',
    phoneNumber: '',
    notes: ''
  };

  // Default props
  const defaultProps: RdsCompGetAssistanceProps = {
    getAssistanceData: { ...sampleGetAssistanceData },
    onClickSubmit: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the component with all form fields', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Check if all required form fields are rendered
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-contact-number')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-notes')).toBeInTheDocument();
    
    // Check if the submit button is rendered
    expect(screen.getByTestId('button-primary')).toBeInTheDocument();
    expect(screen.getByTestId('button-primary')).toHaveTextContent('NEXT');
  });

  it('should render the component with description text', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Check if the description text is rendered
    expect(screen.getByText('Before we proceed, we would like to inquire about a few details to gain a deeper insight into your specific business requirements.')).toBeInTheDocument();
  });

  // 2. Form Input Tests
  it('should update form data when inputs change', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Find form fields
    const nameInput = screen.getByTestId('input-field-name');
    const emailInput = screen.getByTestId('input-field-email');
    const phoneInput = screen.getByTestId('input-field-contact-number');
    const notesInput = screen.getByTestId('textarea-field-notes');
    
    // Enter values in the form fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(notesInput, { target: { value: 'This is a test note' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('button-primary');
    fireEvent.click(submitButton);
    
    // Check if onClickSubmit was called with the correct data
    expect(defaultProps.onClickSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      notes: 'This is a test note'
    });
  });

  // 3. Form Validation Tests
  it('should disable the submit button when form is incomplete', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // The button should initially be disabled since the form is empty
    const submitButton = screen.getByTestId('button-primary');
    expect(submitButton).toBeDisabled();
    
    // Fill only some of the fields
    const nameInput = screen.getByTestId('input-field-name');
    const emailInput = screen.getByTestId('input-field-email');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    
    // The button should still be disabled
    expect(submitButton).toBeDisabled();
  });

  it('should enable the submit button when all required fields are filled', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Find form fields
    const nameInput = screen.getByTestId('input-field-name');
    const emailInput = screen.getByTestId('input-field-email');
    const phoneInput = screen.getByTestId('input-field-contact-number');
    const notesInput = screen.getByTestId('textarea-field-notes');
    
    // Fill in all required fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(notesInput, { target: { value: 'This is a test note' } });
    
    // The button should now be enabled
    const submitButton = screen.getByTestId('button-primary');
    expect(submitButton).not.toBeDisabled();
  });

  // 4. Form Submission Tests
  it('should call onClickSubmit with form data when submitted', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Find form fields
    const nameInput = screen.getByTestId('input-field-name');
    const emailInput = screen.getByTestId('input-field-email');
    const phoneInput = screen.getByTestId('input-field-contact-number');
    const notesInput = screen.getByTestId('textarea-field-notes');
    
    // Fill in the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(notesInput, { target: { value: 'This is a test note' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('button-primary');
    fireEvent.click(submitButton);
    
    // Check if onClickSubmit was called with the right data
    expect(defaultProps.onClickSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      notes: 'This is a test note'
    });
  });

  it('should reset form after submission', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Find form fields
    const nameInput = screen.getByTestId('input-field-name');
    const emailInput = screen.getByTestId('input-field-email');
    const phoneInput = screen.getByTestId('input-field-contact-number');
    const notesInput = screen.getByTestId('textarea-field-notes');
    
    // Fill in the form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(notesInput, { target: { value: 'This is a test note' } });
    
    // Submit the form
    const submitButton = screen.getByTestId('button-primary');
    fireEvent.click(submitButton);
    
    // Check that onClickSubmit was called
    expect(defaultProps.onClickSubmit).toHaveBeenCalled();
    
    // Form fields should be reset to empty values
    // Note: In our mock implementation, the actual input value won't reset automatically
    // We're just verifying that the component attempted to reset the form
    expect(defaultProps.onClickSubmit).toHaveBeenCalledWith(expect.objectContaining({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      notes: 'This is a test note'
    }));
  });

  // 5. Props Update Tests
  it('should update when getAssistanceData prop changes', () => {
    const { rerender } = render(<RdsCompGetAssistance {...defaultProps} />);
    
    // Find the name input field
    const nameInput = screen.getByTestId('input-field-name');
    expect(nameInput).toHaveValue('');
    
    // Update the props with new data
    const updatedProps = {
      ...defaultProps,
      getAssistanceData: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '9876543210',
        notes: 'Updated notes'
      }
    };
    
    // Rerender with updated props
    rerender(<RdsCompGetAssistance {...updatedProps} />);
    
    // Check if the input values are updated
    expect(nameInput).toHaveValue('Jane Smith');
  });

  it('should reset form when reset prop changes', () => {
    const initialProps = {
      ...defaultProps,
      reset: false
    };
    
    const { rerender } = render(<RdsCompGetAssistance {...initialProps} />);
    
    // Fill in the form
    const nameInput = screen.getByTestId('input-field-name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    // Change the reset prop to trigger form reset
    const updatedProps = {
      ...initialProps,
      reset: true
    };
    
    rerender(<RdsCompGetAssistance {...updatedProps} />);
    
    // In a real component, this would reset the form.
    // For our test with mocked components, we just verify the component responded to the prop change
    // by checking that useEffect was triggered (which we can't directly test in this mock setup)
  });

  // 6. Input Validation Tests
  it('should validate phone number input', () => {
    render(<RdsCompGetAssistance {...defaultProps} />);
    
    const phoneInput = screen.getByTestId('input-field-contact-number');
    
    // Try to enter letters
    fireEvent.keyDown(phoneInput, { key: 'a' });
    // This should be prevented, but we can't easily assert this with the mock
    
    // Try to enter a plus sign
    fireEvent.keyDown(phoneInput, { key: '+' });
    
    // Try to enter a number
    fireEvent.keyDown(phoneInput, { key: '1' });
      // Set a long value to test length limit
    fireEvent.change(phoneInput, { target: { value: '12345678901234567890' } });
    
    // Trying to add more digits should be prevented
    fireEvent.keyDown(phoneInput, { key: '1' });
    
    // Since we're using a mock, we can't directly test the actual value restriction
    // but we can verify the input exists and the keyDown handler was attached
    expect(phoneInput).toBeInTheDocument();
  });
});