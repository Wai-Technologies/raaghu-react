import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompRegisterMember from './rds-comp-register-member';

// Mock enums - we'll define them directly in the test since we're mocking the components
const LabelPosition = {
  Top: 'top',
  Bottom: 'bottom',
  Floating: 'floating',
  Right: 'right',
  Left: 'left',
};

const CheckboxStatus = {
  Checked: 'checked',
  Unchecked: 'unchecked',
  Indeterminate: 'indeterminate'
};

// Mock child components used inside RdsCompRegisterMember
jest.mock('../rds-elements', () => ({  RdsInput: (props: any) => {
    const { dataTestId, inputType, ...rest } = props;
    return (
      <input
        data-testid={`rds-input-${dataTestId || props.name || 'default'}`}
        type={inputType}
        {...rest}
      />
    );
  },  RdsCheckbox: (props: any) => {
    const { id, ...rest } = props;
    return (
      <input
        type="checkbox"
        data-testid={`rds-checkbox-${id || 'default'}`}
        {...rest}
      />
    );
  },  RdsButton: (props: any) => {
    const { dataTestId, isDisabled, ...rest } = props;
    return (
      <button 
        data-testid={dataTestId || "rds-button"}
        disabled={isDisabled}
        {...rest}
      >
        {props.label || 'Submit'}
      </button>
    );
  }
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
  test('updates user input fields correctly', async () => {
    render(<RdsCompRegisterMember {...defaultProps} />);
    
    // Test Username field
    const usernameInput = screen.getAllByTestId('rds-input-name')[0];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput).toHaveValue('testuser');

    // Test Email field 
    const emailInput = screen.getByTestId('rds-input-email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    // Test First Name field
    const firstNameInput = screen.getAllByTestId('rds-input-name')[1];
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput).toHaveValue('John');

    // Test Last Name field
    const lastNameInput = screen.getByTestId('rds-input-surname');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput).toHaveValue('Doe');

    // Test Password field
    const passwordInput = screen.getByTestId('rds-input-password');
    fireEvent.change(passwordInput, { target: { value: 'Test@123' } });
    expect(passwordInput).toHaveValue('Test@123');
  });

  test('validates form correctly and enables submit button when form is valid', async () => {
    render(<RdsCompRegisterMember {...defaultProps} />);

    // Fill out form with valid data
    const usernameInput = screen.getAllByTestId('rds-input-name')[0];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = screen.getByTestId('rds-input-email'); 
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const firstNameInput = screen.getAllByTestId('rds-input-name')[1];
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const lastNameInput = screen.getByTestId('rds-input-surname');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    const passwordInput = screen.getByTestId('rds-input-password');
    fireEvent.change(passwordInput, { target: { value: 'Test@123456' } });

    const checkbox = screen.getByTestId('rds-checkbox-id1');
    fireEvent.click(checkbox);

    // Submit button should be enabled when form is valid
    await waitFor(() => {
      expect(screen.getByTestId('register')).not.toBeDisabled();
    });
  });
  test('validates password format correctly', async () => {
    render(<RdsCompRegisterMember {...defaultProps} />);

    const passwordInput = screen.getByTestId('rds-input-password');

    // Test invalid password formats
    fireEvent.change(passwordInput, { target: { value: 'test' } });  // Too short
    expect(screen.getByTestId('register')).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'test12345' } });  // Missing uppercase & special char
    expect(screen.getByTestId('register')).toBeDisabled();

    // Test valid password format
    fireEvent.change(passwordInput, { target: { value: 'Test@123456' } });
    fireEvent.blur(passwordInput); // Trigger validation
    
    // Fill other required fields
    const usernameInput = screen.getAllByTestId('rds-input-name')[0];
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    const emailInput = screen.getByTestId('rds-input-email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const firstNameInput = screen.getAllByTestId('rds-input-name')[1];
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const lastNameInput = screen.getByTestId('rds-input-surname'); 
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    // Check terms checkbox
    const checkbox = screen.getByTestId('rds-checkbox-id1');
    fireEvent.click(checkbox);

    // Button should be enabled with valid data
    await waitFor(() => {
      expect(screen.getByTestId('register')).not.toBeDisabled();
    });
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
  });    test('form resets after successful submission', async () => {
      let resolveHandler: (value?: unknown) => void;
      const handlerPromise = new Promise(resolve => {
        resolveHandler = resolve;
      });
      
      const mockSaveHandler = jest.fn().mockImplementation(() => {
        // Return the promise that we can resolve later
        return handlerPromise;
      });

      const { rerender } = render(
        <RdsCompRegisterMember 
          {...defaultProps}
          onRegisterMemberSaveHandler={mockSaveHandler}
          registerMemberData={{
            userName: '',
            email: '',
            name: '',
            surname: '',
            password: '',
          }}
        />
      );

      // Fill in the form
      fireEvent.change(screen.getAllByTestId('rds-input-name')[0], { target: { value: 'testuser' } });
      fireEvent.change(screen.getByTestId('rds-input-email'), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getAllByTestId('rds-input-name')[1], { target: { value: 'John' } });
      fireEvent.change(screen.getByTestId('rds-input-surname'), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByTestId('rds-input-password'), { target: { value: 'P@ssw0rd123' } });
      
      // Check terms checkbox
      fireEvent.click(screen.getByTestId('rds-checkbox-id1'));
      
      // Submit form
      const submitButton = screen.getByTestId('register');
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);

      // Verify the save handler was called
      expect(mockSaveHandler).toHaveBeenCalledTimes(1);

      // Resolve the handler promise
      resolveHandler!();
      await handlerPromise;

      // Rerender with reset data to simulate form reset
      rerender(
        <RdsCompRegisterMember 
          {...defaultProps}
          onRegisterMemberSaveHandler={mockSaveHandler}
          registerMemberData={{
            userName: '',
            email: '',
            name: '',
            surname: '',
            password: '',
          }}
        />
      );

      // Verify form has been reset
      await waitFor(() => {
        expect(screen.getAllByTestId('rds-input-name')[0]).toHaveValue('');
        expect(screen.getByTestId('rds-input-email')).toHaveValue('');
        expect(screen.getAllByTestId('rds-input-name')[1]).toHaveValue('');
        expect(screen.getByTestId('rds-input-surname')).toHaveValue('');
        expect(screen.getByTestId('rds-input-password')).toHaveValue('');
        expect(screen.getByTestId('rds-checkbox-id1')).not.toBeChecked();
    }, { timeout: 1000 });
  });
});

