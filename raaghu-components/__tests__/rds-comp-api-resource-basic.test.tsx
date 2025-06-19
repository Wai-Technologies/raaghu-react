import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompApiResourceBasic from '../src/rds-comp-api-resource-basic/rds-comp-api-resource-basic';

// Define interfaces for mock components
interface RdsInputProps {
  label?: boolean;
  placeholder?: string;
  inputType?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  required?: boolean;
  reset?: boolean;
  dataTestId?: string;
}

interface RdsTextAreaProps {
  label?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  value?: string;
  'data-testId'?: string;
}

interface RdsButtonProps {
  label: string;
  colorVariant: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  class?: string;
  size?: string;
  type?: "submit" | "reset" | "button";
  tooltipTitle?: string;
  databsdismiss?: string;
  dataTestId?: string;
}

// Mock the child components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ label, placeholder, inputType, onChange, value, name, required, reset, dataTestId }: RdsInputProps) => (
    <div data-testid={`rds-input-${dataTestId}`} className="input-wrapper">
      {label && <label>{name}</label>}
      <input
        data-testid={`input-${dataTestId}`}
        type={inputType || 'text'}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
      />
    </div>
  ),
  RdsTextArea: ({ label, placeholder, onChange, rows, value, 'data-testId': dataTestId }: RdsTextAreaProps) => (
    <div data-testid={`rds-textarea-${dataTestId}`} className="textarea-wrapper">
      {label && <label>{label}</label>}
      <textarea
        data-testid={`textarea-${dataTestId}`}
        placeholder={placeholder}
        rows={rows}
        value={value || ''}
        onChange={onChange}
      />
    </div>
  ),
  RdsButton: ({ label, colorVariant, onClick, isDisabled, class: className, dataTestId }: RdsButtonProps) => (
    <button
      data-testid={`rds-button-${dataTestId}`}
      className={`${colorVariant} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompApiResourceBasic Component', () => {
  const mockApiResourceBasic = {
    name: 'Test API',
    displayName: 'Test API Display',
    description: 'This is a test API resource',
    accessTokenSigningAlgorithm: 'RS256'
  };

  const mockOnSaveHandler = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Check if component renders correctly
  it('renders with provided API resource data', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} scopeData={undefined}      />
    );
    
    // Check if all fields are rendered with correct values
    expect(screen.getByTestId('input-name')).toHaveValue('Test API');
    expect(screen.getByTestId('input-displayName')).toHaveValue('Test API Display');
    expect(screen.getByTestId('textarea-desc')).toHaveValue('This is a test API resource');
    expect(screen.getByTestId('input-allowed-access-token')).toHaveValue('RS256');
    
    // Check if buttons are rendered
    expect(screen.getByTestId('rds-button-save')).toBeInTheDocument();
    expect(screen.getByTestId('rds-button-cancel')).toBeInTheDocument();
  });

  // Test 2: Check if form updates state when fields change
  it('updates state when input fields change', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} scopeData={undefined}      />
    );
    
    // Change name field
    fireEvent.change(screen.getByTestId('input-name'), {
      target: { value: 'Updated API Name' }
    });
    
    // Change display name field
    fireEvent.change(screen.getByTestId('input-displayName'), {
      target: { value: 'Updated Display Name' }
    });
    
    // Change description field
    fireEvent.change(screen.getByTestId('textarea-desc'), {
      target: { value: 'Updated description' }
    });
    
    // Change access token signing algorithm field
    fireEvent.change(screen.getByTestId('input-allowed-access-token'), {
      target: { value: 'ES256' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByTestId('rds-button-save'));
    
    // Check if onSaveHandler was called with updated data
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSaveHandler).toHaveBeenCalledWith({
      name: 'Updated API Name',
      displayName: 'Updated Display Name',
      description: 'Updated description',
      accessTokenSigningAlgorithm: 'ES256'
    });
  });

  // Test 3: Check if save button is disabled when name is empty
  it('disables save button when name is empty', () => {
    const emptyNameData = {
      ...mockApiResourceBasic,
      name: ''
    };
    
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={emptyNameData}
        onSaveHandler={mockOnSaveHandler} scopeData={undefined}      />
    );
    
    // Save button should be disabled
    expect(screen.getByTestId('rds-button-save')).toBeDisabled();
    
    // Enter a name
    fireEvent.change(screen.getByTestId('input-name'), {
      target: { value: 'New API Name' }
    });
    
    // Save button should be enabled
    expect(screen.getByTestId('rds-button-save')).not.toBeDisabled();
  });  // Test 4: Verify reset prop behavior
  it('maintains form values when only reset prop changes', () => {
    // Create a fresh mock of the API resource
    const initialApiResource = { ...mockApiResourceBasic };
    
    const { rerender } = render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={initialApiResource}
        onSaveHandler={mockOnSaveHandler}
        reset={false} scopeData={undefined}      />
    );
    
    // Change name field
    fireEvent.change(screen.getByTestId('input-name'), {
      target: { value: 'Changed API Name' }
    });
    
    // Toggle the reset prop without changing apiResourceBasic
    rerender(
      <RdsCompApiResourceBasic 
        apiResourceBasic={initialApiResource}
        onSaveHandler={mockOnSaveHandler}
        reset={true} scopeData={undefined}      />
    );
    
    // The component maintains the modified value when only reset prop changes
    // This reflects the actual component behavior
    expect(screen.getByTestId('input-name')).toHaveValue('Changed API Name');
  });

  // Test 5: Check if form updates when apiResourceBasic prop changes
  it('updates form when apiResourceBasic prop changes', () => {
    const { rerender } = render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} scopeData={undefined}      />
    );
    
    const updatedApiResource = {
      name: 'New API',
      displayName: 'New Display',
      description: 'New description',
      accessTokenSigningAlgorithm: 'HS256'
    };
    
    rerender(
      <RdsCompApiResourceBasic 
        apiResourceBasic={updatedApiResource}
        onSaveHandler={mockOnSaveHandler} scopeData={undefined}      />
    );
    
    // Check if fields were updated with new props
    expect(screen.getByTestId('input-name')).toHaveValue('New API');
    expect(screen.getByTestId('input-displayName')).toHaveValue('New Display');
    expect(screen.getByTestId('textarea-desc')).toHaveValue('New description');
    expect(screen.getByTestId('input-allowed-access-token')).toHaveValue('HS256');
  });
});