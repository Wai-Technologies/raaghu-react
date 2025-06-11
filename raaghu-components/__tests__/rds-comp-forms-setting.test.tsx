import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompFormsSettings, { RdsCompFormsSettingProps } from '../src/rds-comp-forms-setting/rds-comp-forms-setting';

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsCheckbox: ({ 
    labelText, 
    checked, 
    onChange, 
    dataTestId,
    isDisabled,
    ...props 
  }: any) => (
    <div data-testid={`checkbox-wrapper-${dataTestId}`}>
      <input
        type="checkbox"
        data-testid={dataTestId}
        checked={checked || false}
        onChange={onChange}
        disabled={isDisabled}
        {...props}
      />
      <label>{labelText}</label>
    </div>
  )
}));

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key })
}));

describe('RdsCompFormsSettings', () => {
  // Sample settings data
  const sampleSettingsData = {
    isAcceptingResponses: true,
    isCollectingEmail: false,
    isQuiz: true,
    requiresLogin: false,
    hasLimitOneResponsePerUser: true,
    canEditResponse: false
  };

  // Default props
  const defaultProps: RdsCompFormsSettingProps = {
    formsSettingData: sampleSettingsData,
    handleFormSettings: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the component with all checkboxes', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    // Check if all checkboxes are rendered
    expect(screen.getByTestId('accept-response')).toBeInTheDocument();
    expect(screen.getByTestId('collect-email')).toBeInTheDocument();
    expect(screen.getByTestId('quiz')).toBeInTheDocument();
    expect(screen.getByTestId('require-login')).toBeInTheDocument();
    expect(screen.getByTestId('limit-response')).toBeInTheDocument();
    expect(screen.getByTestId('edit-after-submit')).toBeInTheDocument();
    
    // Check the checkbox labels
    expect(screen.getByText('Is accepting responses')).toBeInTheDocument();
    expect(screen.getByText('Is collecting email')).toBeInTheDocument();
    expect(screen.getByText('Is a quiz')).toBeInTheDocument();
    expect(screen.getByText('Requires login')).toBeInTheDocument();
    expect(screen.getByText('Has limit one response per user')).toBeInTheDocument();
    expect(screen.getByText('Can edit after submit')).toBeInTheDocument();
  });

  it('should display the correct initial checkbox states based on props', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    // Check initial state matches props
    expect(screen.getByTestId('accept-response')).toBeChecked();
    expect(screen.getByTestId('collect-email')).not.toBeChecked();
    expect(screen.getByTestId('quiz')).toBeChecked();
    expect(screen.getByTestId('require-login')).not.toBeChecked();
    expect(screen.getByTestId('limit-response')).toBeChecked();
    expect(screen.getByTestId('edit-after-submit')).not.toBeChecked();
  });

  // 2. Interaction Tests
  it('should handle toggling "Is accepting responses" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('accept-response');
    
    // Initially checked, click to uncheck
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      isAcceptingResponses: false
    });
  });

  it('should handle toggling "Is collecting email" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('collect-email');
    
    // Initially unchecked, click to check
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      isCollectingEmail: true
    });
  });

  it('should handle toggling "Is a quiz" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('quiz');
    
    // Initially checked, click to uncheck
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      isQuiz: false
    });
  });

  it('should handle toggling "Requires login" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('require-login');
    
    // Initially unchecked, click to check
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      requiresLogin: true
    });
  });

  it('should handle toggling "Has limit one response per user" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('limit-response');
    
    // Initially checked, click to uncheck
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      hasLimitOneResponsePerUser: false
    });
  });

  it('should handle toggling "Can edit after submit" checkbox', () => {
    render(<RdsCompFormsSettings {...defaultProps} />);
    
    const checkbox = screen.getByTestId('edit-after-submit');
    
    // Initially unchecked, click to check
    fireEvent.click(checkbox);
    
    // Verify handleFormSettings called with updated data
    expect(defaultProps.handleFormSettings).toHaveBeenCalledWith({
      ...sampleSettingsData,
      canEditResponse: true
    });
  });

  // 3. Conditional Behavior Tests
  it('should disable "Has limit one response per user" when "Requires login" is checked', () => {
    const propsWithLoginRequired = {
      ...defaultProps,
      formsSettingData: {
        ...sampleSettingsData,
        requiresLogin: true
      }
    };
    
    render(<RdsCompFormsSettings {...propsWithLoginRequired} />);
    
    // "Has limit one response per user" should be disabled when "Requires login" is true
    expect(screen.getByTestId('limit-response')).toBeDisabled();
  });

  // 4. Props Update Test
  it('should update when formsSettingData props change', () => {
    const { rerender } = render(<RdsCompFormsSettings {...defaultProps} />);
    
    // Initial render with initial props
    expect(screen.getByTestId('accept-response')).toBeChecked();
    expect(screen.getByTestId('collect-email')).not.toBeChecked();
    
    // Update props
    const updatedProps = {
      ...defaultProps,
      formsSettingData: {
        ...sampleSettingsData,
        isAcceptingResponses: false,
        isCollectingEmail: true
      }
    };
    
    // Rerender with updated props
    rerender(<RdsCompFormsSettings {...updatedProps} />);
    
    // Check if component state updated with new props
    expect(screen.getByTestId('accept-response')).not.toBeChecked();
    expect(screen.getByTestId('collect-email')).toBeChecked();
  });
});