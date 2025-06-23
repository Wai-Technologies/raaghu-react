import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompSecrets, { RdsCompSecretsProps } from '../src/rds-comp-secrets/rds-comp-secrets';

// Mock the translation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, placeholder, inputType, onChange, value, dataTestId, required, reset, isDisabled, readonly }: any) => (
    <div data-testid={dataTestId}>
      <label>{name}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        required={required}
        data-reset={reset}
        data-label={label}
        disabled={isDisabled}
        readOnly={readonly}
      />
    </div>
  ),
  RdsButton: ({ label, colorVariant, size, type, onClick, dataTestId, isDisabled, isOutline, 'data-bs-dismiss': dataBsDismiss }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={dataTestId}
      data-color-variant={colorVariant}
      data-size={size}
      data-outline={isOutline}
      data-bs-dismiss={dataBsDismiss}
    >
      {label}
    </button>
  )
}));

describe('RdsCompSecrets Component', () => {
  const mockDefaultData = {
    type: 'test-type',
    val: 'test-value',
    expiration: '2025-12-31',
    description: 'Test secret description'
  };

  const defaultProps: RdsCompSecretsProps = {
    default: mockDefaultData,
    onSaveHandler: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      expect(screen.getByTestId('type')).toBeInTheDocument();
      expect(screen.getByTestId('value')).toBeInTheDocument();
      expect(screen.getByTestId('expiration')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
      expect(screen.getByTestId('add')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
      expect(screen.getByTestId('create')).toBeInTheDocument();
    });

    it('should render with proper form structure', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const secretsDiv = document.querySelector('.secrets');
      expect(secretsDiv).toBeInTheDocument();
      
      const rows = document.querySelectorAll('.row');
      expect(rows.length).toBeGreaterThan(0);
      
      const formGroups = document.querySelectorAll('.form-group');
      expect(formGroups.length).toBeGreaterThan(0);
    });

    it('should render with default values', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      const expirationInput = screen.getByTestId('expiration').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      expect(typeInput).toHaveValue('test-type');
      expect(valueInput).toHaveValue('test-value');
      expect(expirationInput).toHaveValue('2025-12-31');
      expect(descriptionInput).toHaveValue('Test secret description');
    });

    it('should render with empty values when defaults are not provided', () => {
      const emptyProps = {
        default: {},
        onSaveHandler: jest.fn()
      };
      
      render(<RdsCompSecrets {...emptyProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      const expirationInput = screen.getByTestId('expiration').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      expect(typeInput).toHaveValue('');
      expect(valueInput).toHaveValue('');
      expect(expirationInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });
  });

  describe('Form Inputs', () => {
    it('should update type field on input change', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      fireEvent.change(typeInput!, { target: { value: 'new-type' } });
      
      expect(typeInput).toHaveValue('new-type');
    });

    it('should update value field on input change', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const valueInput = screen.getByTestId('value').querySelector('input');
      fireEvent.change(valueInput!, { target: { value: 'new-value' } });
      
      expect(valueInput).toHaveValue('new-value');
    });

    it('should update expiration field on input change', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const expirationInput = screen.getByTestId('expiration').querySelector('input');
      fireEvent.change(expirationInput!, { target: { value: '2026-01-01' } });
      
      expect(expirationInput).toHaveValue('2026-01-01');
    });

    it('should update description field on input change', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      fireEvent.change(descriptionInput!, { target: { value: 'Updated description' } });
      
      expect(descriptionInput).toHaveValue('Updated description');
    });

    it('should maintain state between input changes', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      
      fireEvent.change(typeInput!, { target: { value: 'new-type' } });
      fireEvent.change(valueInput!, { target: { value: 'new-value' } });
      
      expect(typeInput).toHaveValue('new-type');
      expect(valueInput).toHaveValue('new-value');
    });
  });

  describe('Form Validation', () => {
    it('should disable create button when type is empty', () => {
      const invalidData = {
        ...mockDefaultData,
        type: ''
      };
      const invalidProps = {
        ...defaultProps,
        default: invalidData
      };
      
      render(<RdsCompSecrets {...invalidProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toBeDisabled();
    });

    it('should disable create button when value is empty', () => {
      const invalidData = {
        ...mockDefaultData,
        val: ''
      };
      const invalidProps = {
        ...defaultProps,
        default: invalidData
      };
      
      render(<RdsCompSecrets {...invalidProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toBeDisabled();
    });

    it('should disable create button when expiration is empty', () => {
      const invalidData = {
        ...mockDefaultData,
        expiration: ''
      };
      const invalidProps = {
        ...defaultProps,
        default: invalidData
      };
      
      render(<RdsCompSecrets {...invalidProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toBeDisabled();
    });

    it('should disable create button when description is empty', () => {
      const invalidData = {
        ...mockDefaultData,
        description: ''
      };
      const invalidProps = {
        ...defaultProps,
        default: invalidData
      };
      
      render(<RdsCompSecrets {...invalidProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toBeDisabled();
    });

    it('should enable create button when all required fields are filled', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).not.toBeDisabled();
    });

    it('should update button state when form becomes valid', () => {
      const invalidData = {
        type: '',
        val: '',
        expiration: '',
        description: ''
      };
      const invalidProps = {
        ...defaultProps,
        default: invalidData
      };
      
      render(<RdsCompSecrets {...invalidProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toBeDisabled();
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      const expirationInput = screen.getByTestId('expiration').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      fireEvent.change(typeInput!, { target: { value: 'new-type' } });
      fireEvent.change(valueInput!, { target: { value: 'new-value' } });
      fireEvent.change(expirationInput!, { target: { value: '2026-01-01' } });
      fireEvent.change(descriptionInput!, { target: { value: 'New description' } });
      
      expect(createButton).not.toBeDisabled();
    });
  });

  describe('Save Handler', () => {
    it('should call onSaveHandler with form data when create is clicked', () => {
      const mockSaveHandler = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompSecrets {...saveProps} />);
      
      const createButton = screen.getByTestId('create');
      fireEvent.click(createButton);
      
      expect(mockSaveHandler).toHaveBeenCalledWith(mockDefaultData);
    });

    it('should call onSaveHandler with updated form data', () => {
      const mockSaveHandler = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompSecrets {...saveProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      fireEvent.change(typeInput!, { target: { value: 'updated-type' } });
      
      const createButton = screen.getByTestId('create');
      fireEvent.click(createButton);
      
      expect(mockSaveHandler).toHaveBeenCalledWith({
        ...mockDefaultData,
        type: 'updated-type'
      });
    });

    it('should reset form after save', () => {
      const mockSaveHandler = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompSecrets {...saveProps} />);
      
      const createButton = screen.getByTestId('create');
      fireEvent.click(createButton);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      const expirationInput = screen.getByTestId('expiration').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      expect(typeInput).toHaveValue('');
      expect(valueInput).toHaveValue('');
      expect(expirationInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });

    it('should handle missing onSaveHandler gracefully', () => {
      const noHandlerProps = {
        ...defaultProps,
        onSaveHandler: undefined
      };
      
      render(<RdsCompSecrets {...noHandlerProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(() => fireEvent.click(createButton)).not.toThrow();
    });
  });
  describe('Reset Functionality', () => {
    it('should update when default data changes', async () => {
      const { rerender } = render(<RdsCompSecrets {...defaultProps} />);
      
      const updatedData = {
        ...mockDefaultData,
        type: 'updated-type',
        val: 'updated-value'
      };
      
      rerender(<RdsCompSecrets {...defaultProps} default={updatedData} />);
      
      await waitFor(() => {
        const typeInput = screen.getByTestId('type').querySelector('input');
        const valueInput = screen.getByTestId('value').querySelector('input');
        
        expect(typeInput).toHaveValue('updated-type');
        expect(valueInput).toHaveValue('updated-value');
      });
    });
  });

  describe('Button Properties', () => {
    it('should render add button with correct properties', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const addButton = screen.getByTestId('add');
      expect(addButton).toHaveAttribute('type', 'button');
      expect(addButton).toHaveAttribute('data-color-variant', 'primary');
      expect(addButton).toHaveAttribute('data-size', 'small');
      expect(addButton).toHaveTextContent('Add');
    });

    it('should render cancel button with correct properties', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-color-variant', 'primary');
      expect(cancelButton).toHaveAttribute('data-size', 'small');
      expect(cancelButton).toHaveAttribute('data-outline', 'true');
      expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
      expect(cancelButton).toHaveTextContent('Cancel');
    });

    it('should render create button with correct properties', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const createButton = screen.getByTestId('create');
      expect(createButton).toHaveAttribute('type', 'button');
      expect(createButton).toHaveAttribute('data-color-variant', 'primary');
      expect(createButton).toHaveAttribute('data-size', 'small');
      expect(createButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
      expect(createButton).toHaveTextContent('Create');
    });
  });

  describe('Accessibility', () => {
    it('should have proper label associations for inputs', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeLabel = screen.getByText('Type');
      const valueLabel = screen.getByText('Value');
      const expirationLabel = screen.getByText('Expiration');
      const descriptionLabel = screen.getByText('Description');
      
      expect(typeLabel).toBeInTheDocument();
      expect(valueLabel).toBeInTheDocument();
      expect(expirationLabel).toBeInTheDocument();
      expect(descriptionLabel).toBeInTheDocument();
    });

    it('should have appropriate button labels', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create' })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty default prop', () => {
      const emptyProps = {
        default: undefined,
        onSaveHandler: jest.fn()
      };
      
      expect(() => render(<RdsCompSecrets {...emptyProps} />)).not.toThrow();
    });

    it('should handle rapid input changes', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const valueInput = screen.getByTestId('value').querySelector('input');
      
      // Rapid changes
      fireEvent.change(typeInput!, { target: { value: 'type1' } });
      fireEvent.change(valueInput!, { target: { value: 'value1' } });
      fireEvent.change(typeInput!, { target: { value: 'type2' } });
      fireEvent.change(valueInput!, { target: { value: 'value2' } });
      fireEvent.change(typeInput!, { target: { value: 'type3' } });
      fireEvent.change(valueInput!, { target: { value: 'value3' } });
      
      expect(typeInput).toHaveValue('type3');
      expect(valueInput).toHaveValue('value3');
    });

    it('should preserve non-changed values when updating form', () => {
      render(<RdsCompSecrets {...defaultProps} />);
      
      const typeInput = screen.getByTestId('type').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      // Change only one field
      fireEvent.change(typeInput!, { target: { value: 'updated-type' } });
      
      // Description should remain unchanged
      expect(descriptionInput).toHaveValue('Test secret description');
      
      const createButton = screen.getByTestId('create');
      fireEvent.click(createButton);
      
      expect(defaultProps.onSaveHandler).toHaveBeenCalledWith({
        ...mockDefaultData,
        type: 'updated-type'
      });
    });
  });
});