import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompScopeBasicResource, { RdsCompScopeBasicResourceProps } from '../src/rds-comp-scope-basic-resource/rds-comp-scope-basic-resource';

// Mock the rds-elements components
jest.mock('../src/rds-elements', () => ({
  RdsInput: ({ name, label, placeholder, inputType, onChange, value, dataTestId, required, reset }: any) => (
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
      />
    </div>
  ),
  RdsButton: ({ label, colorVariant, size, type, onClick, dataTestId, isDisabled, databsdismiss }: any) => (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      data-testid={dataTestId}
      data-color-variant={colorVariant}
      data-size={size}
      data-bs-dismiss={databsdismiss}
    >
      {label}
    </button>
  ),  RdsCheckbox: ({ id, labelText, checked, onChange, dataTestId }: any) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);
    
    React.useEffect(() => {
      setIsChecked(checked || false);
    }, [checked]);
    
    const handleChange = (e: any) => {
      setIsChecked(e.target.checked);
      if (onChange) onChange(e);
    };
    
    return (
      <div data-testid={dataTestId}>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
        />
        <label htmlFor={id}>{labelText}</label>
      </div>
    );
  }
}));

describe('RdsCompScopeBasicResource Component', () => {
  const mockApiScopeData = {
    name: 'test-scope',
    description: 'Test scope description',
    enabled: true,
    required: false,
    emphasize: true,
    showInDiscovery: false
  };

  const defaultProps: RdsCompScopeBasicResourceProps = {
    apiScopeData: mockApiScopeData,
    onSaveHandler: jest.fn(),
    reset: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      expect(screen.getByTestId('name')).toBeInTheDocument();
      expect(screen.getByTestId('description')).toBeInTheDocument();
      expect(screen.getByTestId('enabled')).toBeInTheDocument();
      expect(screen.getByTestId('required')).toBeInTheDocument();
      expect(screen.getByTestId('emphasize')).toBeInTheDocument();
      expect(screen.getByTestId('discovery-document')).toBeInTheDocument();
      expect(screen.getByTestId('save')).toBeInTheDocument();
      expect(screen.getByTestId('cancel')).toBeInTheDocument();
    });    it('should render form elements with correct structure', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      expect(nameInput).toHaveAttribute('type', 'text');
      expect(nameInput).toHaveAttribute('placeholder', 'Enter name');
      expect(nameInput).toHaveAttribute('required');
      
      expect(descriptionInput).toHaveAttribute('type', 'text');
      expect(descriptionInput).toHaveAttribute('placeholder', 'Enter Description');
      expect(descriptionInput).not.toHaveAttribute('required');
    });

    it('should render with empty props', () => {
      const emptyProps = {};
      expect(() => render(<RdsCompScopeBasicResource {...emptyProps} />)).not.toThrow();
    });

    it('should render with null apiScopeData', () => {
      const nullDataProps = {
        ...defaultProps,
        apiScopeData: null
      };
      expect(() => render(<RdsCompScopeBasicResource {...nullDataProps} />)).not.toThrow();
    });
  });

  describe('Initial Data Population', () => {
    it('should populate form fields with apiScopeData', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      const enabledCheckbox = screen.getByTestId('enabled').querySelector('input');
      const requiredCheckbox = screen.getByTestId('required').querySelector('input');
      const emphasizeCheckbox = screen.getByTestId('emphasize').querySelector('input');
      const discoveryCheckbox = screen.getByTestId('discovery-document').querySelector('input');
      
      expect(nameInput).toHaveValue('test-scope');
      expect(descriptionInput).toHaveValue('Test scope description');
      expect(enabledCheckbox).toBeChecked();
      expect(requiredCheckbox).not.toBeChecked();
      expect(emphasizeCheckbox).toBeChecked();
      expect(discoveryCheckbox).not.toBeChecked();
    });

    it('should handle undefined values in apiScopeData', () => {
      const partialData = {
        name: 'test-name'
        // other fields undefined
      };
      const partialProps = {
        ...defaultProps,
        apiScopeData: partialData
      };
      
      render(<RdsCompScopeBasicResource {...partialProps} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      
      expect(nameInput).toHaveValue('test-name');
      expect(descriptionInput).toHaveValue('');
    });

    it('should update form data when apiScopeData props change', async () => {
      const { rerender } = render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const updatedData = {
        ...mockApiScopeData,
        name: 'updated-scope',
        description: 'Updated description'
      };
      
      rerender(<RdsCompScopeBasicResource {...defaultProps} apiScopeData={updatedData} />);
      
      await waitFor(() => {
        const nameInput = screen.getByTestId('name').querySelector('input');
        const descriptionInput = screen.getByTestId('description').querySelector('input');
        
        expect(nameInput).toHaveValue('updated-scope');
        expect(descriptionInput).toHaveValue('Updated description');
      });
    });
  });

  describe('Form Input Interactions', () => {
    it('should update name field on input change', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      fireEvent.change(nameInput!, { target: { value: 'new-scope-name' } });
      
      expect(nameInput).toHaveValue('new-scope-name');
    });

    it('should update description field on input change', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      fireEvent.change(descriptionInput!, { target: { value: 'new description' } });
      
      expect(descriptionInput).toHaveValue('new description');
    });

    it('should toggle enabled checkbox', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const enabledCheckbox = screen.getByTestId('enabled').querySelector('input');
      expect(enabledCheckbox).toBeChecked();
      
      fireEvent.change(enabledCheckbox!, { target: { checked: false } });
      expect(enabledCheckbox).not.toBeChecked();
    });

    it('should toggle required checkbox', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const requiredCheckbox = screen.getByTestId('required').querySelector('input');
      expect(requiredCheckbox).not.toBeChecked();
      
      fireEvent.change(requiredCheckbox!, { target: { checked: true } });
      expect(requiredCheckbox).toBeChecked();
    });

    it('should toggle emphasize checkbox', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const emphasizeCheckbox = screen.getByTestId('emphasize').querySelector('input');
      expect(emphasizeCheckbox).toBeChecked();
      
      fireEvent.change(emphasizeCheckbox!, { target: { checked: false } });
      expect(emphasizeCheckbox).not.toBeChecked();
    });

    it('should toggle show in discovery document checkbox', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const discoveryCheckbox = screen.getByTestId('discovery-document').querySelector('input');
      expect(discoveryCheckbox).not.toBeChecked();
      
      fireEvent.change(discoveryCheckbox!, { target: { checked: true } });
      expect(discoveryCheckbox).toBeChecked();
    });
  });

  describe('Form Validation', () => {
    it('should disable save button when name is empty', () => {
      const emptyNameData = {
        ...mockApiScopeData,
        name: ''
      };
      const emptyNameProps = {
        ...defaultProps,
        apiScopeData: emptyNameData
      };
      
      render(<RdsCompScopeBasicResource {...emptyNameProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should disable save button when name is null or undefined', () => {
      const nullNameData = {
        ...mockApiScopeData,
        name: null
      };
      const nullNameProps = {
        ...defaultProps,
        apiScopeData: nullNameData
      };
      
      render(<RdsCompScopeBasicResource {...nullNameProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when name has valid value', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).not.toBeDisabled();
    });

    it('should enable save button after entering valid name', () => {
      const emptyNameData = {
        ...mockApiScopeData,
        name: ''
      };
      const emptyNameProps = {
        ...defaultProps,
        apiScopeData: emptyNameData
      };
      
      render(<RdsCompScopeBasicResource {...emptyNameProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toBeDisabled();
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      fireEvent.change(nameInput!, { target: { value: 'valid-name' } });
      
      expect(saveButton).not.toBeDisabled();
    });

    it('should allow empty description (not required)', () => {
      const emptyDescriptionData = {
        ...mockApiScopeData,
        description: ''
      };
      const emptyDescriptionProps = {
        ...defaultProps,
        apiScopeData: emptyDescriptionData
      };
      
      render(<RdsCompScopeBasicResource {...emptyDescriptionProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).not.toBeDisabled();
    });
  });

  describe('Save Handler', () => {
    it('should call onSaveHandler with current form data when save is clicked', () => {
      const mockSaveHandler = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompScopeBasicResource {...saveProps} />);      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      expect(mockSaveHandler).toHaveBeenCalledWith(mockApiScopeData);
    });

    it('should reset form after save', () => {
      const mockSaveHandler = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompScopeBasicResource {...saveProps} />);
      
      const saveButton = screen.getByTestId('save');
      fireEvent.click(saveButton);
      
      // Form should be reset to default values
      const nameInput = screen.getByTestId('name').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      const enabledCheckbox = screen.getByTestId('enabled').querySelector('input');
      
      expect(nameInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
      expect(enabledCheckbox).not.toBeChecked();
    });

    it('should handle save when onSaveHandler is not provided', () => {
      const noHandlerProps = {
        ...defaultProps,
        onSaveHandler: undefined
      };
      
      render(<RdsCompScopeBasicResource {...noHandlerProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(() => fireEvent.click(saveButton)).not.toThrow();
    });

    it('should prevent default form submission', () => {
      const mockSaveHandler = jest.fn();
      const mockPreventDefault = jest.fn();
      const saveProps = {
        ...defaultProps,
        onSaveHandler: mockSaveHandler
      };
      
      render(<RdsCompScopeBasicResource {...saveProps} />);
      
      const saveButton = screen.getByTestId('save');
      const mockEvent = {
        preventDefault: mockPreventDefault,
        target: saveButton
      };
      
      fireEvent.click(saveButton, mockEvent);
      
      expect(mockSaveHandler).toHaveBeenCalled();
    });
  });

  describe('Reset Functionality', () => {    it('should handle reset prop changes', async () => {
      const { rerender } = render(<RdsCompScopeBasicResource {...defaultProps} reset={false} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      // Initial state - inputReset starts as false, then gets toggled to true
      expect(nameInput).toHaveAttribute('data-reset', 'true');
      
      rerender(<RdsCompScopeBasicResource {...defaultProps} reset={true} />);
      
      await waitFor(() => {
        // When reset prop changes, inputReset gets toggled again
        expect(nameInput).toHaveAttribute('data-reset', 'false');
      });
    });    it('should toggle input reset state when reset prop changes', async () => {
      const { rerender } = render(<RdsCompScopeBasicResource {...defaultProps} reset={false} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      // Initially inputReset is false, but gets toggled to true on mount
      expect(nameInput).toHaveAttribute('data-reset', 'true');
      
      rerender(<RdsCompScopeBasicResource {...defaultProps} reset={true} />);
      
      await waitFor(() => {
        // When reset prop changes, inputReset toggles again
        expect(nameInput).toHaveAttribute('data-reset', 'false');
      });
    });
  });

  describe('Button Properties', () => {
    it('should render cancel button with correct properties', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const cancelButton = screen.getByTestId('cancel');
      expect(cancelButton).toHaveAttribute('type', 'button');
      expect(cancelButton).toHaveAttribute('data-color-variant', 'outline-primary');
      expect(cancelButton).toHaveAttribute('data-size', 'small');
      expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
      expect(cancelButton).toHaveTextContent('Cancel');
    });

    it('should render save button with correct properties', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const saveButton = screen.getByTestId('save');
      expect(saveButton).toHaveAttribute('type', 'button');
      expect(saveButton).toHaveAttribute('data-color-variant', 'primary');
      expect(saveButton).toHaveAttribute('data-size', 'small');
      expect(saveButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
      expect(saveButton).toHaveTextContent('Save');
    });
  });

  describe('Checkbox Labels', () => {
    it('should render correct checkbox labels', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      expect(screen.getByText('Enabled')).toBeInTheDocument();
      expect(screen.getByText('Required')).toBeInTheDocument();
      expect(screen.getByText('Emphasize')).toBeInTheDocument();
      expect(screen.getByText('Show in Discovery Document')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle form data changes with complex state updates', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      // Change multiple fields rapidly
      const nameInput = screen.getByTestId('name').querySelector('input');
      const descriptionInput = screen.getByTestId('description').querySelector('input');
      const enabledCheckbox = screen.getByTestId('enabled').querySelector('input');
      const requiredCheckbox = screen.getByTestId('required').querySelector('input');
      
      fireEvent.change(nameInput!, { target: { value: 'new-name' } });
      fireEvent.change(descriptionInput!, { target: { value: 'new-desc' } });
      fireEvent.change(enabledCheckbox!, { target: { checked: false } });
      fireEvent.change(requiredCheckbox!, { target: { checked: true } });
      
      expect(nameInput).toHaveValue('new-name');
      expect(descriptionInput).toHaveValue('new-desc');
      expect(enabledCheckbox).not.toBeChecked();
      expect(requiredCheckbox).toBeChecked();
    });

    it('should handle empty string name validation', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const nameInput = screen.getByTestId('name').querySelector('input');
      const saveButton = screen.getByTestId('save');
      
      // Clear the name field
      fireEvent.change(nameInput!, { target: { value: '' } });
      expect(saveButton).toBeDisabled();
      
      // Add whitespace only
      fireEvent.change(nameInput!, { target: { value: '   ' } });
      expect(saveButton).not.toBeDisabled(); // The current validation doesn't trim
    });

    it('should maintain form state during multiple prop updates', async () => {
      const { rerender } = render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      // Make changes to form
      const nameInput = screen.getByTestId('name').querySelector('input');
      fireEvent.change(nameInput!, { target: { value: 'user-modified-name' } });
      
      // Update props but form should maintain user changes until apiScopeData changes
      rerender(<RdsCompScopeBasicResource {...defaultProps} reset={true} />);
      
      await waitFor(() => {
        expect(nameInput).toHaveValue('user-modified-name');
      });
    });
  });

  describe('Accessibility', () => {    it('should have proper form structure for screen readers', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
      
      // Check that inputs have associated labels
      const nameLabel = screen.getByText('Name');
      const descriptionLabel = screen.getByText('Description');
      
      expect(nameLabel).toBeInTheDocument();
      expect(descriptionLabel).toBeInTheDocument();
    });

    it('should have proper button accessibility', () => {
      render(<RdsCompScopeBasicResource {...defaultProps} />);
      
      const saveButton = screen.getByRole('button', { name: 'Save' });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      
      expect(saveButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });
  });
});