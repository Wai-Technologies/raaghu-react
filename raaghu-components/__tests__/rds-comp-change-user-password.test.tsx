import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompChangeUserPassword from '../src/rds-comp-change-user-password/rds-comp-change-user-password';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

// Mock InputSize enum
jest.mock('../../raaghu-elements/src/rds-input/rds-input', () => ({
  InputSize: {
    Medium: 'medium',
    Small: 'small',
    Large: 'large'
  },
  LabelPosition: {
    Top: 'top',
    Left: 'left'
  }
}));

// Mock the RdsElements
jest.mock('../src/rds-elements', () => ({
  RdsInput: React.forwardRef(({ 
    name, 
    value, 
    onChange, 
    placeholder, 
    inputType, 
    showIcon, 
    reset, 
    label, 
    required, 
    size, 
    validationMsg,
    isDisabled,
    readonly
  }: {
    name: string;
    value?: string;
    onChange: (e: any) => void;
    placeholder?: string;
    inputType?: string;
    showIcon?: boolean;
    reset?: boolean;
    label?: boolean;
    required?: boolean;
    size?: any;
    validationMsg?: string;
    isDisabled?: boolean;
    readonly?: boolean;
  }, ref: any) => {
    // Track reset prop changes to update input value
    const [inputValue, setInputValue] = React.useState(value || '');
    const [resetFlag, setResetFlag] = React.useState(reset);
    
    // Update input value when component value prop changes
    React.useEffect(() => {
      setInputValue(value || '');
    }, [value]);
    
    // Handle reset prop changes
    React.useEffect(() => {
      if (reset !== resetFlag) {
        setResetFlag(reset);
        setInputValue('');
      }
    }, [reset]);
    
    // Handle change event
    const handleChange = (e: any) => {
      setInputValue(e.target.value);
      onChange(e);
    };
    
    return (
      <div>
        {label && <label htmlFor={name}>{name}</label>}
        <input 
          ref={ref}
          data-testid={`input-${name.replace(/\s+/g, '-').toLowerCase()}`}
          type={inputType || 'text'} 
          placeholder={placeholder} 
          value={inputValue} 
          onChange={handleChange}
          required={required}
          disabled={isDisabled}
          readOnly={readonly}
          aria-label={name}
        />
        {showIcon && <span data-testid={`toggle-icon-${name.replace(/\s+/g, '-').toLowerCase()}`}>👁️</span>}
        {validationMsg && <div data-testid={`validation-msg-${name.replace(/\s+/g, '-').toLowerCase()}`} className="text-danger">{validationMsg}</div>}
      </div>
    );
  }),  RdsButton: React.forwardRef(({ 
    label, 
    onClick, 
    isDisabled, 
    type, 
    colorVariant,
    block,
    size
  }: {
    label: string;
    onClick?: (e: any) => void;
    isDisabled?: boolean;
    type?: "button" | "submit" | "reset";
    colorVariant?: string;
    block?: boolean;
    size?: string;
  }, ref: any) => (
    <button 
      ref={ref}
      data-testid={`button-${label.toLowerCase()}`} 
      onClick={onClick} 
      disabled={isDisabled}
      type={type}
      className={`btn-${colorVariant || 'primary'} ${block ? 'btn-block' : ''} btn-${size || 'md'}`}
    >
      {label}
    </button>
  )),
}));

describe('RdsCompChangeUserPassword', () => {
    const mockOnSaveHandler = jest.fn();

    const defaultProps = {
        changePasswordData: {
            currentPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        },
        reset: false,
        onSaveHandler: mockOnSaveHandler
    };

    beforeEach(() => {
        mockOnSaveHandler.mockClear();
    });    it('renders correctly with all required inputs', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Check for key elements
        expect(screen.getByTestId('input-current-password')).toBeInTheDocument();
        expect(screen.getByTestId('input-new-password')).toBeInTheDocument();
        expect(screen.getByTestId('input-confirm-new-password')).toBeInTheDocument();
        expect(screen.getByTestId('button-save')).toBeInTheDocument();
    });

    it('disables Save button when form is not valid', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        const saveButton = screen.getByTestId('button-save');
        expect(saveButton).toBeDisabled();
    });

    it('enables Save button when form is valid', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Fill in all required fields
        fireEvent.change(screen.getByTestId('input-current-password'), { target: { value: 'CurrentPass123!' } });
        fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'NewPass123!' } });
        fireEvent.change(screen.getByTestId('input-confirm-new-password'), { target: { value: 'NewPass123!' } });
        
        // Check if Save button is enabled
        const saveButton = screen.getByTestId('button-save');
        expect(saveButton).not.toBeDisabled();
    });

    it('calls onSaveHandler with correct data when form is submitted', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Fill in the form
        fireEvent.change(screen.getByTestId('input-current-password'), { target: { value: 'CurrentPass123!' } });
        fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'NewPass123!' } });
        fireEvent.change(screen.getByTestId('input-confirm-new-password'), { target: { value: 'NewPass123!' } });
        
        // Submit the form
        const saveButton = screen.getByTestId('button-save');
        fireEvent.click(saveButton);
        
        // Check if onSaveHandler was called with correct data
        expect(mockOnSaveHandler).toHaveBeenCalledWith({
            currentPassword: 'CurrentPass123!',
            newPassword: 'NewPass123!',
            newPasswordConfirm: 'NewPass123!'
        });
    });    it('shows error when new password and confirm password do not match', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Fill in the form with mismatched passwords
        fireEvent.change(screen.getByTestId('input-current-password'), { target: { value: 'CurrentPass123!' } });
        fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'NewPass123!' } });
        fireEvent.change(screen.getByTestId('input-confirm-new-password'), { target: { value: 'DifferentPass123!' } });
        
        // Save button should be disabled when passwords don't match
        const saveButton = screen.getByTestId('button-save');
        expect(saveButton).toBeDisabled();
        
        // Error message should be displayed
        expect(screen.getByTestId('validation-msg-confirm-new-password')).toBeInTheDocument();
        expect(screen.getByTestId('validation-msg-confirm-new-password').textContent).toBe('New password and confirm new password do not match');
    });

    it('clears form after successful submission', () => {
        render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Fill in the form
        fireEvent.change(screen.getByTestId('input-current-password'), { target: { value: 'CurrentPass123!' } });
        fireEvent.change(screen.getByTestId('input-new-password'), { target: { value: 'NewPass123!' } });
        fireEvent.change(screen.getByTestId('input-confirm-new-password'), { target: { value: 'NewPass123!' } });
        
        // Submit the form
        const saveButton = screen.getByTestId('button-save');
        fireEvent.click(saveButton);
        
        // Form should be reset after submission
        expect(screen.getByTestId('input-current-password')).toHaveValue('');
        expect(screen.getByTestId('input-new-password')).toHaveValue('');
        expect(screen.getByTestId('input-confirm-new-password')).toHaveValue('');
    });    it('handles reset prop properly', async () => {
        const { rerender } = render(<RdsCompChangeUserPassword {...defaultProps} />);
        
        // Fill in the form
        fireEvent.change(screen.getByTestId('input-current-password'), { target: { value: 'CurrentPass123!' } });
        expect(screen.getByTestId('input-current-password')).toHaveValue('CurrentPass123!');
        
        // Trigger reset through props
        rerender(<RdsCompChangeUserPassword {...defaultProps} reset={true} />);
        
        // Allow the component to update with the new reset prop
        await waitFor(() => {
            // Form should be reset
            expect(screen.getByTestId('input-current-password')).toHaveValue('');
        });
    });
});