import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RdsCompEditLanguageText, { RdsCompEditLanguageTextProps } from '../src/rds-comp-edit-language-text/rds-comp-edit-language-text';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock RDS elements
jest.mock('../src/rds-elements', () => ({
  RdsTextArea: ({ label, value, onChange, placeholder, isDisabled, dataTestId, ...props }: any) => (
    <div data-testid={`textarea-container-${dataTestId}`}>
      <label>{label}</label>
      <textarea
        data-testid={dataTestId}
        value={value || ''}
        onChange={(e) => onChange && onChange(e)}
        placeholder={placeholder}
        disabled={isDisabled}
        {...props}
      />
    </div>
  ),
  RdsButton: ({ label, onClick, type, colorVariant, size, isDisabled, dataTestId, ...props }: any) => (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      data-color-variant={colorVariant}
      data-size={size}
      {...props}
    >
      {label}
    </button>
  ),
}));

describe('RdsCompEditLanguageText', () => {
  const mockFormData = {
    baseLanguage: 'Hello World',
    targetLanguage: 'Hola Mundo'
  };

  const mockOnSaveHandler = jest.fn();

  const defaultProps: RdsCompEditLanguageTextProps = {
    formData: mockFormData,
    onSaveHandler: mockOnSaveHandler
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 1. Basic Rendering Tests
  it('should render the component without crashing', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    expect(screen.getByTestId('base-language')).toBeInTheDocument();
    expect(screen.getByTestId('target-language')).toBeInTheDocument();
    expect(screen.getByTestId('cancel')).toBeInTheDocument();
    expect(screen.getByTestId('save')).toBeInTheDocument();
  });

  it('should render with default empty form data', () => {
    render(<RdsCompEditLanguageText />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('');
    expect(targetLanguageTextarea).toHaveValue('');
  });

  // 2. Form Data Display Tests
  it('should display initial form data correctly', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('Hello World');
    expect(targetLanguageTextarea).toHaveValue('Hola Mundo');
  });

  it('should update form data when props change', () => {
    const { rerender } = render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const updatedFormData = {
      baseLanguage: 'Good Morning',
      targetLanguage: 'Buenos Días'
    };
    
    rerender(<RdsCompEditLanguageText formData={updatedFormData} onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('Good Morning');
    expect(targetLanguageTextarea).toHaveValue('Buenos Días');
  });

  // 3. Text Area Configuration Tests
  it('should configure base language textarea correctly', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const baseLanguageContainer = screen.getByTestId('textarea-container-base-language');
    const baseLanguageTextarea = screen.getByTestId('base-language');
    
    expect(baseLanguageContainer).toContainElement(screen.getByText('Base Language'));
    expect(baseLanguageTextarea).toHaveAttribute('placeholder', 'Enter Base Value');
    expect(baseLanguageTextarea).toBeDisabled(); // Base language should be disabled
  });

  it('should configure target language textarea correctly', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageContainer = screen.getByTestId('textarea-container-target-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(targetLanguageContainer).toContainElement(screen.getByText('Target Language'));
    expect(targetLanguageTextarea).toHaveAttribute('placeholder', 'Enter Target Language');
    expect(targetLanguageTextarea).not.toBeDisabled(); // Target language should be editable
  });

  // 4. User Interaction Tests
  it('should handle target language text changes', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    fireEvent.change(targetLanguageTextarea, { target: { value: 'Bonjour le Monde' } });
    
    expect(targetLanguageTextarea).toHaveValue('Bonjour le Monde');
  });

  it('should handle multiple text changes in target language', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    // First change
    fireEvent.change(targetLanguageTextarea, { target: { value: 'First Change' } });
    expect(targetLanguageTextarea).toHaveValue('First Change');
    
    // Second change
    fireEvent.change(targetLanguageTextarea, { target: { value: 'Second Change' } });
    expect(targetLanguageTextarea).toHaveValue('Second Change');
  });

  // 5. Button Configuration Tests
  it('should configure cancel button correctly', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('cancel');
    
    expect(cancelButton).toHaveTextContent('Cancel');
    expect(cancelButton).toHaveAttribute('type', 'button');
    expect(cancelButton).toHaveAttribute('data-color-variant', 'outline-primary');
    expect(cancelButton).toHaveAttribute('data-size', 'small');
    expect(cancelButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    expect(cancelButton).not.toBeDisabled();
  });

  it('should configure save button correctly', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    
    expect(saveButton).toHaveTextContent('Save');
    expect(saveButton).toHaveAttribute('type', 'submit');
    expect(saveButton).toHaveAttribute('data-color-variant', 'primary');
    expect(saveButton).toHaveAttribute('data-size', 'small');
    expect(saveButton).toHaveAttribute('data-bs-dismiss', 'offcanvas');
    expect(saveButton).not.toBeDisabled();
  });

  // 6. Form Submission Tests
  it('should call onSaveHandler when save button is clicked', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(mockOnSaveHandler).toHaveBeenCalledTimes(1);
    expect(mockOnSaveHandler).toHaveBeenCalledWith(mockFormData);
  });

  it('should call onSaveHandler with updated data after text changes', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    // Change the target language
    fireEvent.change(targetLanguageTextarea, { target: { value: 'Updated Translation' } });
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(mockOnSaveHandler).toHaveBeenCalledWith({
      baseLanguage: 'Hello World',
      targetLanguage: 'Updated Translation'
    });
  });

  it('should reset form data after successful save', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    // After save, form should be reset
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('');
    expect(targetLanguageTextarea).toHaveValue('');
  });

  // 7. Edge Cases and Error Handling Tests
  it('should handle missing onSaveHandler gracefully', () => {
    render(<RdsCompEditLanguageText formData={mockFormData} />);
    
    const saveButton = screen.getByTestId('save');
    
    expect(() => {
      fireEvent.click(saveButton);
    }).not.toThrow();
  });

  it('should handle undefined formData', () => {
    render(<RdsCompEditLanguageText onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('');
    expect(targetLanguageTextarea).toHaveValue('');
  });

  it('should handle null formData', () => {
    render(<RdsCompEditLanguageText formData={null} onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('');
    expect(targetLanguageTextarea).toHaveValue('');
  });

  it('should handle partial formData', () => {
    const partialFormData = {
      baseLanguage: 'Only Base Language'
    };
    
    render(<RdsCompEditLanguageText formData={partialFormData} onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue('Only Base Language');
    expect(targetLanguageTextarea).toHaveValue('');
  });

  // 8. State Management Tests
  it('should maintain independent state for multiple instances', () => {
    const formData1 = { baseLanguage: 'English 1', targetLanguage: 'Spanish 1' };
    const formData2 = { baseLanguage: 'English 2', targetLanguage: 'Spanish 2' };
    
    render(
      <div>
        <RdsCompEditLanguageText formData={formData1} onSaveHandler={jest.fn()} />
        <RdsCompEditLanguageText formData={formData2} onSaveHandler={jest.fn()} />
      </div>
    );
    
    const textareas = screen.getAllByTestId('target-language');
    
    expect(textareas[0]).toHaveValue('Spanish 1');
    expect(textareas[1]).toHaveValue('Spanish 2');
  });

  it('should update internal state when prop changes', () => {
    const initialData = { baseLanguage: 'Initial', targetLanguage: 'Inicial' };
    const updatedData = { baseLanguage: 'Updated', targetLanguage: 'Actualizado' };
    
    const { rerender } = render(
      <RdsCompEditLanguageText formData={initialData} onSaveHandler={mockOnSaveHandler} />
    );
    
    expect(screen.getByTestId('base-language')).toHaveValue('Initial');
    expect(screen.getByTestId('target-language')).toHaveValue('Inicial');
    
    rerender(
      <RdsCompEditLanguageText formData={updatedData} onSaveHandler={mockOnSaveHandler} />
    );
    
    expect(screen.getByTestId('base-language')).toHaveValue('Updated');
    expect(screen.getByTestId('target-language')).toHaveValue('Actualizado');
  });

  // 9. Accessibility Tests
  it('should have proper button accessibility', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const cancelButton = screen.getByTestId('cancel');
    const saveButton = screen.getByTestId('save');
    
    expect(cancelButton).toHaveAttribute('type', 'button');
    expect(saveButton).toHaveAttribute('type', 'submit');
    
    // Both buttons should be accessible
    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  // 10. Component Integration Tests
  it('should handle complex form data structures', () => {
    const complexFormData = {
      baseLanguage: 'Complex {variable} with special characters: àáâãäå æ ç èéêë',
      targetLanguage: 'Complejo {variable} con caracteres especiales: ñ ü ¿ ¡'
    };
    
    render(<RdsCompEditLanguageText formData={complexFormData} onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue(complexFormData.baseLanguage);
    expect(targetLanguageTextarea).toHaveValue(complexFormData.targetLanguage);
  });

  // 11. CSS Classes and Structure Tests
  it('should have proper spacing classes for text areas', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const customContentScroll = document.querySelector('.custom-content-scroll');
    const textAreaContainers = customContentScroll?.querySelectorAll('.mb-4');
    
    expect(textAreaContainers).toHaveLength(2);
  });

  // 12. Performance Tests
  it('should handle rapid text changes efficiently', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    // Simulate rapid typing
    for (let i = 0; i < 10; i++) {
      fireEvent.change(targetLanguageTextarea, { target: { value: `Rapid change ${i}` } });
    }
    
    expect(targetLanguageTextarea).toHaveValue('Rapid change 9');
  });

  // 13. Internationalization Tests
  it('should render correctly with different language content', () => {
    const multiLanguageData = {
      baseLanguage: 'Hello 你好 こんにちは مرحبا',
      targetLanguage: 'Hola 你好 こんにちは مرحبا'
    };
    
    render(<RdsCompEditLanguageText formData={multiLanguageData} onSaveHandler={mockOnSaveHandler} />);
    
    const baseLanguageTextarea = screen.getByTestId('base-language');
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    expect(baseLanguageTextarea).toHaveValue(multiLanguageData.baseLanguage);
    expect(targetLanguageTextarea).toHaveValue(multiLanguageData.targetLanguage);
  });

  // 14. Form Validation Scenarios
  it('should handle empty target language submission', () => {
    const emptyTargetData = {
      baseLanguage: 'Base Text',
      targetLanguage: ''
    };
    
    render(<RdsCompEditLanguageText formData={emptyTargetData} onSaveHandler={mockOnSaveHandler} />);
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(mockOnSaveHandler).toHaveBeenCalledWith(emptyTargetData);
  });

  it('should handle whitespace-only content', () => {
    render(<RdsCompEditLanguageText {...defaultProps} />);
    
    const targetLanguageTextarea = screen.getByTestId('target-language');
    
    fireEvent.change(targetLanguageTextarea, { target: { value: '   \n\t   ' } });
    
    const saveButton = screen.getByTestId('save');
    fireEvent.click(saveButton);
    
    expect(mockOnSaveHandler).toHaveBeenCalledWith({
      baseLanguage: 'Hello World',
      targetLanguage: '   \n\t   '
    });
  });
});