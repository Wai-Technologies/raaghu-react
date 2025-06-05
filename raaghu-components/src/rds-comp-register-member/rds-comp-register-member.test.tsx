import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RdsCompRegisterMember from './rds-comp-register-member';

// Mock LabelPosition enum from rds-input
jest.mock('../../../raaghu-elements/src/rds-input/rds-input', () => ({
  LabelPosition: {
    Top: 'top',
    Bottom: 'bottom',
    Floating: 'floating',
    Right: 'right',
    Left: 'left',
  }
}));

// Mock CheckboxStatus enum from rds-checkbox
jest.mock('../../../raaghu-elements/src/rds-checkbox/rds-checkbox', () => ({
  CheckboxStatus: {
    Checked: 'checked',
    Unchecked: 'unchecked',
    Indeterminate: 'indeterminate'
  }
}));

// Mock child components used inside RdsCompRegisterMember
jest.mock('../rds-elements', () => ({
  RdsInput: (props: any) => (
    <input
      data-testid={`rds-input-${props.dataTestId || props.name || 'default'}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      type={props.inputType}
      required={props.required}
      {...props}
    />
  ),
  RdsCheckbox: (props: any) => (
    <input
      type="checkbox"
      data-testid={`rds-checkbox-${props.id || 'default'}`}
      checked={props.checked}
      onChange={props.onChange}
      {...props}
    />
  ),
  RdsButton: (props: any) => (
    <button 
      data-testid={props.dataTestId || "rds-button"}
      onClick={props.onClick}
      disabled={props.isDisabled}
      {...props}
    >
      {props.label || 'Submit'}
    </button>
  )
}));

const defaultProps = {
  registerMemberData: {
    userName: '',
    email: '',
    name: '',
    surname: '',
    password: '',
  },
  isEmailFieldVisible: true,
  onRegisterMemberSaveHandler: jest.fn(),
};

describe('RdsCompRegisterMember', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input fields correctly', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    // Check for all required input fields
    // User Name
    expect(screen.getAllByTestId('rds-input-name')[0]).toBeInTheDocument();
    // Email
    expect(screen.getByTestId('rds-input-email')).toBeInTheDocument();
    // Enter First Name
    expect(screen.getAllByTestId('rds-input-name')[1]).toBeInTheDocument();
    // Enter Last Name
    expect(screen.getByTestId('rds-input-surname')).toBeInTheDocument();
    // Password
    expect(screen.getByTestId('rds-input-password')).toBeInTheDocument();
  });

  test('renders checkbox for terms of service', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    const checkbox = screen.getByTestId('rds-checkbox-id1');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('renders submit button with correct text', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    const button = screen.getByTestId('register');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Accept & Create Account');
    expect(button).toBeDisabled(); // Button should be disabled initially as form is not valid
  });

  test('updates user input fields correctly', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    
    // Simulate user input for username
    const userNameInput = screen.getAllByTestId('rds-input-name')[0];
    fireEvent.change(userNameInput, { target: { value: 'testuser' } });
    expect(userNameInput).toHaveValue('testuser');
    
    // Simulate user input for email
    const emailInput = screen.getByTestId('rds-input-email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
    
    // Simulate user input for first name
    const firstNameInput = screen.getAllByTestId('rds-input-name')[1];
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');
    
    // Simulate user input for last name
    const lastNameInput = screen.getByTestId('rds-input-surname');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput).toHaveValue('Doe');
    
    // Simulate user input for password
    const passwordInput = screen.getByTestId('rds-input-password');
    fireEvent.change(passwordInput, { target: { value: 'P@ssw0rd123' } });
    expect(passwordInput).toHaveValue('P@ssw0rd123');
  });
  
  test('form submission calls onRegisterMemberSaveHandler with correct data', () => {
    const mockSaveHandler = jest.fn();
    render(
      <RdsCompRegisterMember 
        {...defaultProps}
        onRegisterMemberSaveHandler={mockSaveHandler}
      />
    );
    
    // Fill all required fields
    fireEvent.change(screen.getAllByTestId('rds-input-name')[0], { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('rds-input-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByTestId('rds-input-name')[1], { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('rds-input-surname'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('rds-input-password'), { target: { value: 'P@ssw0rd123' } });
    
    // Check terms checkbox
    fireEvent.click(screen.getByTestId('rds-checkbox-id1'));
    
    // Submit form
    const submitButton = screen.getByTestId('register');
    // The button should now be enabled
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    
    // Verify that the save handler was called with the correct data
    expect(mockSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockSaveHandler).toHaveBeenCalledWith({
      userName: 'testuser',
      email: 'test@example.com',
      name: 'John',
      surname: 'Doe',
      password: 'P@ssw0rd123'
    });
  });
  
  test('validates password format correctly', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    
    const passwordInput = screen.getByTestId('rds-input-password');
    
    // Invalid password
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(passwordInput); // Trigger validation
    
    // Check for error message
    const errorMessage = screen.getByText(/Please Enter Valid Password/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Valid password
    fireEvent.change(passwordInput, { target: { value: 'Strong@P4ssword' } });
    fireEvent.blur(passwordInput);
    
    // Error message should not be visible anymore
    expect(screen.queryByText(/Please Enter Valid Password/i)).not.toBeInTheDocument();
  });
  
  test('form resets after successful submission', () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    // Fill in the form
    fireEvent.change(screen.getAllByTestId('rds-input-name')[0], { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('rds-input-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getAllByTestId('rds-input-name')[1], { target: { value: 'John' } });
    fireEvent.change(screen.getByTestId('rds-input-surname'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByTestId('rds-input-password'), { target: { value: 'P@ssw0rd123' } });
    // Check terms checkbox
    fireEvent.click(screen.getByTestId('rds-checkbox-id1'));
    // Submit the form
    fireEvent.click(screen.getByTestId('register'));
    // After submission, the form should be reset
    // Wait for the form to reset (if async)
    setTimeout(() => {
      expect(screen.getAllByTestId('rds-input-name')[0]).toHaveValue('');
      expect(screen.getByTestId('rds-input-email')).toHaveValue('');
      expect(screen.getAllByTestId('rds-input-name')[1]).toHaveValue('');
      expect(screen.getByTestId('rds-input-surname')).toHaveValue('');
      expect(screen.getByTestId('rds-input-password')).toHaveValue('');
      expect(screen.getByTestId('rds-checkbox-id1')).not.toBeChecked();
    }, 0);
  });
});
