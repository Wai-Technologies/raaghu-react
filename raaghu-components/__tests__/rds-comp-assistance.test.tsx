import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompAssistance from '../src/rds-comp-assistance/rds-comp-assistance';

// Mock the rds-elements used in the component
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ 
    name, 
    label, 
    placeholder, 
    value, 
    onChange, 
    reset, 
    inputType, 
    required, 
    onKeyDown 
  }: {
    name?: string;
    label?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    reset?: boolean;
    inputType?: string;
    required?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  }) => (
    <div>
      {label && <label>{name}</label>}
      <input
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
        required={required}
        data-testid={`input-${name?.toLowerCase().replace(/\s+/g, '-')}`}
      />
    </div>
  ),
  RdsTextArea: ({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    rows, 
    reset 
  }: {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
    reset?: boolean;
  }) => (
    <div>
      {label && <label>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        rows={rows}
        data-testid="textarea-message"
      />
    </div>
  ),
  RdsButton: ({ 
    label, 
    onClick, 
    type, 
    isDisabled 
  }: {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    isDisabled?: boolean;
  }) => (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={`button-${label?.toLowerCase()}`}
    >
      {label}
    </button>
  )
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  }
}));

describe('RdsCompAssistance', () => {
  const mockOnSaveHandler = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<RdsCompAssistance onSaveHandler={mockOnSaveHandler} />);
    expect(container).toBeTruthy();
  });

  it('renders form inputs', () => {
    render(<RdsCompAssistance onSaveHandler={mockOnSaveHandler} />);
    
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-contact-number')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-message')).toBeInTheDocument();
    expect(screen.getByTestId('button-send')).toBeInTheDocument();
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument();
  });

  it('calls onSaveHandler with form data when Send button is clicked', () => {
    render(<RdsCompAssistance onSaveHandler={mockOnSaveHandler} />);
    
    // Fill the form
    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByTestId('input-contact-number'), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByTestId('textarea-message'), { target: { value: 'Test message' } });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('button-send'));
    
    // Check if onSaveHandler was called with the correct data
    expect(mockOnSaveHandler).toHaveBeenCalledWith({
      name: 'John Doe',
      Email: 'john@example.com',
      contactNumber: '1234567890',
      message: 'Test message'
    });
  });
});