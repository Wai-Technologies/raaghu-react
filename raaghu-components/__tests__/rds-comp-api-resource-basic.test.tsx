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
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
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
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
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
    
    // Check if onSaveHandler was called
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
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
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
    );
    
    // Save button should be disabled
    expect(screen.getByTestId('rds-button-save')).toBeDisabled();
  });

  // Test 4: Check if save button is enabled when name is provided
  it('enables save button when name is provided', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
    );
    
    // Save button should be enabled when name is provided
    expect(screen.getByTestId('rds-button-save')).not.toBeDisabled();
  });

  // Test 5: Check if form updates when apiResourceBasic prop changes
  it('updates form when apiResourceBasic prop changes', () => {
    const { rerender } = render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
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
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
    );
    
    // Check if fields were updated with new props
    expect(screen.getByTestId('input-name')).toHaveValue('New API');
    expect(screen.getByTestId('input-displayName')).toHaveValue('New Display');
    expect(screen.getByTestId('textarea-desc')).toHaveValue('New description');
    expect(screen.getByTestId('input-allowed-access-token')).toHaveValue('HS256');
  });

  // Test 6: Check if component doesn't render without correct apiType
  it('does not render when apiType prop is missing', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
      />
    );
    
    // Component should not render any form elements
    expect(screen.queryByTestId('input-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rds-button-save')).not.toBeInTheDocument();
  });

  // Test 7: Check if component doesn't render with wrong apiType
  it('does not render when apiType prop is incorrect', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="wrongType"
      />
    );
    
    // Component should not render any form elements
    expect(screen.queryByTestId('input-name')).not.toBeInTheDocument();
    expect(screen.queryByTestId('rds-button-save')).not.toBeInTheDocument();
  });

  // Test 8: Check form field updates correctly
  it('updates individual form fields correctly', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
    );
    
    // Update name field and verify it changes
    const nameInput = screen.getByTestId('input-name');
    fireEvent.change(nameInput, { target: { value: 'Changed Name' } });
    expect(nameInput).toHaveValue('Changed Name');
    
    // Update display name field and verify it changes
    const displayNameInput = screen.getByTestId('input-displayName');
    fireEvent.change(displayNameInput, { target: { value: 'Changed Display' } });
    expect(displayNameInput).toHaveValue('Changed Display');
  });

  // Test 9: Check cancel button functionality
  it('renders cancel button correctly', () => {
    render(
      <RdsCompApiResourceBasic 
        apiResourceBasic={mockApiResourceBasic}
        onSaveHandler={mockOnSaveHandler} 
        scopeData={undefined}
        apiType="resourceBasic"
      />
    );
    
    const cancelButton = screen.getByTestId('rds-button-cancel');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');
  });
});