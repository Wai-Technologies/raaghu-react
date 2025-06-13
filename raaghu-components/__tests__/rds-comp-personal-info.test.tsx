import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import RdsCompPersonalInfo from '../src/rds-comp-personal-info/rds-comp-personal-info';

// Mock the RdsInput and RdsButton components
jest.mock('../src/rds-elements', () => ({
  RdsInput: React.forwardRef<HTMLInputElement, any>(({ dataTestId, value, onChange, onKeyDown, isDisabled, ...props }, ref) => (
    <input
      ref={ref}
      data-testid={dataTestId}
      value={value || ''}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
      {...props}
    />
  )),
  RdsButton: React.forwardRef<HTMLButtonElement, any>(({ dataTestId, label, onClick, isDisabled, ...props }, ref) => (
    <button
      ref={ref}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {label}
    </button>
  ))
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

describe('RdsCompPersonalInfo', () => {
  const defaultProps = {
    personalInfo: {
      userName: 'testuser',
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890'
    },
    onEmail: jest.fn(),
    onSaveHandler: jest.fn(),
    reset: false
  };

  const emptyProps = {
    personalInfo: {
      userName: '',
      name: '',
      surname: '',
      email: '',
      phoneNumber: ''
    },
    onEmail: jest.fn(),
    onSaveHandler: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompPersonalInfo {...defaultProps} />);
    expect(container).toBeTruthy();
  });

  it('renders all form fields with correct values', () => {
    render(<RdsCompPersonalInfo {...defaultProps} />);
    
    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument();
  });

  it('renders all buttons', () => {
    render(<RdsCompPersonalInfo {...defaultProps} />);
    
    expect(screen.getByTestId('verify-email')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
  });

  it('updates input fields', async () => {
    const user = userEvent.setup();
    render(<RdsCompPersonalInfo {...emptyProps} />);
    
    const userNameInput = screen.getByTestId('admin');
    await user.type(userNameInput, 'newuser');
    expect(userNameInput).toHaveValue('newuser');
  });

  it('validates email and enables/disables Verify Email button', async () => {
    const user = userEvent.setup();
    render(<RdsCompPersonalInfo {...emptyProps} />);
    
    const emailInput = screen.getByTestId('email');
    const verifyEmailButton = screen.getByTestId('verify-email');
    
    // Initially disabled with empty email
    expect(verifyEmailButton).toBeDisabled();
    
    // Enabled with valid email
    await user.type(emailInput, 'test@example.com');
    expect(verifyEmailButton).not.toBeDisabled();
  });

  it('calls onEmail when Verify Email button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnEmail = jest.fn();
    
    render(<RdsCompPersonalInfo {...{ ...defaultProps, onEmail: mockOnEmail }} />);
    
    const verifyEmailButton = screen.getByTestId('verify-email');
    await user.click(verifyEmailButton);
    
    expect(mockOnEmail).toHaveBeenCalledWith(true);
  });

  it('calls onSaveHandler when Save button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSaveHandler = jest.fn();
    
    render(<RdsCompPersonalInfo {...{ ...defaultProps, onSaveHandler: mockOnSaveHandler }} />);
    
    const saveButton = screen.getByTestId('save');
    await user.click(saveButton);
    
    expect(mockOnSaveHandler).toHaveBeenCalledWith(defaultProps.personalInfo);
  });
});
