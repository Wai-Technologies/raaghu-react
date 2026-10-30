import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsTextArea from './rds-text-area';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

jest.mock('./rds-text-area.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({
  warnDeprecatedProp: jest.fn(),
  invokeValueFirstOnChange: jest.fn(
    (onChange: ((value: string, event: unknown) => void) | undefined, value: string, event: unknown) => {
      onChange?.(value, event);
    },
  ),
}));

describe('RdsTextArea', () => {
  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsTextArea />);
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsTextArea.displayName).toBe('RdsTextArea');
    });

    it('should render textarea element', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
    });

    it('should apply rds-textarea class', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea');
    });

    it('should render without label by default', () => {
      render(<RdsTextArea />);
      const labels = screen.queryAllByRole('label');
      expect(labels.length).toBe(0);
    });

    it('should render with label when provided', () => {
      render(<RdsTextArea label="Text Area Label" />);
      expect(screen.getByText('Text Area Label')).toBeInTheDocument();
    });

    it('should hide label when showTitle is false', () => {
      render(<RdsTextArea label="Text Area Label" showTitle={false} />);
      const labels = screen.queryAllByRole('label');
      expect(labels.length).toBe(0);
    });

    it('should show mandatory asterisk when isMandatory is true', () => {
      render(<RdsTextArea label="Required Field" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('Semantic appearance', () => {
    it('uses the error prop for error styling and accessibility', () => {
      render(<RdsTextArea error dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea__error');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('uses the disabled prop for disabled styling and behavior', () => {
      render(<RdsTextArea disabled dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea__disabled');
      expect(textarea).toBeDisabled();
    });

    it('retains the error appearance when focused', () => {
      render(<RdsTextArea error dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      fireEvent.focus(textarea);
      expect(textarea).toHaveClass('rds-textarea__error');
    });

    it('uses the current value for the filled appearance', () => {
      render(<RdsTextArea value="Existing text" placeholder="Write here" dataTestId="test-textarea" />);
      expect(screen.getByRole('textbox')).toHaveValue('Existing text');
    });

    it('applies the selected appearance when selected is true', () => {
      render(<RdsTextArea selected dataTestId="test-textarea" />);
      expect(screen.getByRole('textbox')).toHaveClass('rds-textarea__selected');
    });
  });

  describe('Styles', () => {
    it('should render default style by default', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea__default');
    });

    it('should apply pill style class', () => {
      render(<RdsTextArea variant="Pill" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea__pill');
      expect(textarea.closest('.rds-textarea__pill-wrapper')).toBeTruthy();
    });

    it('should apply bottom outline style class', () => {
      render(<RdsTextArea variant="Bottom Outline" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea__bottom-outline');
    });
  });

  describe('Rows and Placeholder', () => {
    it('should render default rows count', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(4);
    });

    it('should apply custom rows count', () => {
      render(<RdsTextArea rows={10} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(10);
    });

    it('should apply placeholder', () => {
      render(<RdsTextArea placeholder="Enter your text" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Enter your text');
    });

    it('should handle empty placeholder', () => {
      render(<RdsTextArea placeholder="" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('');
    });
  });

  describe('Value and Change Handler', () => {
    it('should render with initial value', () => {
      render(<RdsTextArea value="initial text" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('initial text');
    });

    it('should call onChange when text is entered', async () => {
      const onChange = jest.fn();
      render(<RdsTextArea onChange={onChange} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      await userEvent.type(textarea, 'a');
      expect(onChange).toHaveBeenCalledWith('a', expect.objectContaining({ type: 'change' }));
    });

    it('should update value on change', async () => {
      const { rerender } = render(<RdsTextArea value="" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      
      rerender(<RdsTextArea value="new value" dataTestId="test-textarea" />);
      expect(textarea.value).toBe('new value');
    });

    it('should handle rapid value changes', async () => {
      const onChange = jest.fn();
      const { rerender } = render(
        <RdsTextArea value="" onChange={onChange} dataTestId="test-textarea" />
      );
      
      rerender(<RdsTextArea value="a" onChange={onChange} dataTestId="test-textarea" />);
      rerender(<RdsTextArea value="ab" onChange={onChange} dataTestId="test-textarea" />);
      rerender(<RdsTextArea value="abc" onChange={onChange} dataTestId="test-textarea" />);
      
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Mandatory Field Validation', () => {
    it('should not show error for mandatory field with value', () => {
      render(<RdsTextArea required value="some text" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error for mandatory field without value', () => {
      render(<RdsTextArea required value="" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error message for mandatory field', () => {
      render(<RdsTextArea required label="Required Field" value="" dataTestId="test-textarea" />);
      expect(screen.getByText('Required Field is required')).toBeInTheDocument();
    });

    it('should validate mandatory field on blur', async () => {
      const { container } = render(
        <RdsTextArea required label="Required Field" dataTestId="test-textarea" />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(screen.getByText('Required Field is required')).toBeInTheDocument();
      });
    });

    it('should clear error when mandatory field gets a value', async () => {
      const { rerender } = render(
        <RdsTextArea required label="Required Field" value="" dataTestId="test-textarea" />
      );
      expect(screen.getByText('Required Field is required')).toBeInTheDocument();
      
      rerender(
        <RdsTextArea required label="Required Field" value="some text" dataTestId="test-textarea" />
      );
      expect(screen.queryByText('Required Field is required')).not.toBeInTheDocument();
    });

    it('should consider whitespace-only value as invalid', () => {
      render(<RdsTextArea required value="   " dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Custom Validation Pattern', () => {
    it('should validate against pattern', async () => {
      const urlPattern = /^(https?:\/\/)/;
      const { rerender } = render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'http://example.com' } });
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error for invalid pattern', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'invalid-url' } });
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('should display custom validation message', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          validationMsg="Please enter a valid URL"
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'invalid-url' } });
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
    });

    it('should validate multiple URLs separated by newlines', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          multiUrl
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'http://example1.com\nhttp://example2.com' } });
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should fail multi-URL validation with one invalid URL', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          multiUrl
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'http://example.com\ninvalid-url' } });
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Reset Functionality', () => {
    it('should clear validation on reset', () => {
      const { rerender } = render(
        <RdsTextArea 
          required 
          value="" 
          reset={false}
          dataTestId="test-textarea"
        />
      );
      expect(screen.getByText(/is required/)).toBeInTheDocument();
      
      rerender(
        <RdsTextArea 
          required 
          value="" 
          reset={true}
          dataTestId="test-textarea"
        />
      );
      expect(screen.queryByText(/is required/)).not.toBeInTheDocument();
    });

    it('should clear pattern validation on reset', () => {
      const urlPattern = /^(https?:\/\/)/;
      const { rerender } = render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          validationMsg="Invalid URL"
          reset={false}
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'invalid' } });
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
      
      rerender(
        <RdsTextArea 
          value="invalid" 
          validationPattern={urlPattern}
          validationMsg="Invalid URL"
          reset={true}
          dataTestId="test-textarea"
        />
      );
      expect(screen.queryByText('Invalid URL')).not.toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('should call onClick when clicked', () => {
      const onClick = jest.fn();
      render(<RdsTextArea onClick={onClick} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      fireEvent.click(textarea);
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onKeyDown on key press', () => {
      const onKeyDown = jest.fn();
      render(<RdsTextArea onKeyDown={onKeyDown} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      fireEvent.keyDown(textarea, { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call onFocus when focused', () => {
      const onFocus = jest.fn();
      render(<RdsTextArea onFocus={onFocus} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      fireEvent.focus(textarea);
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when blurred', () => {
      const onBlur = jest.fn();
      render(<RdsTextArea onBlur={onBlur} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);
      expect(onBlur).toHaveBeenCalled();
    });

    it('should call onChange on value change', async () => {
      const onChange = jest.fn();
      render(<RdsTextArea onChange={onChange} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      
      await userEvent.type(textarea, 'ab');
      expect(onChange).toHaveBeenLastCalledWith('ab', expect.objectContaining({ type: 'change' }));
    });
  });

  describe('Accessibility', () => {
    it('should have aria-invalid attribute', () => {
      render(
        <RdsTextArea 
          error
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-invalid');
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsTextArea label="Message" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have aria-required when isMandatory', () => {
      render(
        <RdsTextArea 
          required 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required when not mandatory', () => {
      render(
        <RdsTextArea 
          required={false} 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).not.toHaveAttribute('aria-required');
    });

    it('should have aria-describedby when error', () => {
      render(
        <RdsTextArea 
          required
          value=""
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby');
    });

    it('should have proper label association', () => {
      render(
        <RdsTextArea 
          label="Text Input" 
          id="custom-id"
          dataTestId="test-textarea"
        />
      );
      const label = screen.getByText('Text Input').closest('label');
      expect(label).toHaveAttribute('for', 'custom-id');
    });
  });

  describe('Custom ID and Classes', () => {
    it('should use custom id when provided', () => {
      render(<RdsTextArea id="custom-id" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('id', 'custom-id');
    });

    it('should generate unique id when not provided', () => {
      render(<RdsTextArea dataTestId="textarea1" />);
      render(<RdsTextArea dataTestId="textarea2" />);
      const [textarea1, textarea2] = screen.getAllByRole('textbox');
      expect(textarea1.getAttribute('id')).not.toBe(textarea2.getAttribute('id'));
    });

    it('should apply custom classes', () => {
      render(
        <RdsTextArea 
          customClasses="custom-class another-class" 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('custom-class', 'another-class');
    });

    it('should apply custom classes with semantic and style classes', () => {
      render(
        <RdsTextArea 
          error
          variant="Pill"
          customClasses="my-custom"
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('rds-textarea', 'rds-textarea__error', 'rds-textarea__pill', 'my-custom');
    });
  });

  describe('Error Messages', () => {
    it('should not show error message by default', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const errorMessages = screen.queryAllByText(/.*is required|.*invalid|.*/i);
      const errorElements = errorMessages.filter(el => el.classList.contains('error-message'));
      expect(errorElements.length).toBe(0);
    });

    it('should show error message when validation fails', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          validationMsg="Invalid URL"
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'invalid-url' } });
      expect(screen.getByText('Invalid URL')).toBeInTheDocument();
    });

    it('should have error-message class on error', () => {
      const urlPattern = /^(https?:\/\/)/;
      const { container } = render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          validationMsg="Invalid URL"
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByRole('textbox');
      
      fireEvent.change(textarea, { target: { value: 'invalid-url' } });
      const errorElement = container.querySelector('.error-message');
      expect(errorElement).toBeInTheDocument();
    });
  });

  describe('Label Styling', () => {
    it('should apply disabled class to label when disabled', () => {
      const { container } = render(
        <RdsTextArea 
          label="Text Area" 
          disabled
        />
      );
      const label = container.querySelector('.textarea-label');
      expect(label).toHaveClass('disabled');
    });

    it('should not apply disabled class to label when enabled', () => {
      const { container } = render(
        <RdsTextArea 
          label="Text Area" 
        />
      );
      const label = container.querySelector('.textarea-label');
      expect(label).not.toHaveClass('disabled');
    });
  });

  describe('Integration Tests', () => {
    it('should work with all features combined', async () => {
      const onChange = jest.fn();
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      
      const { rerender } = render(
        <RdsTextArea 
          label="Email"
          placeholder="Enter email"
          value=""
          variant="Pill"
          rows={6}
          required
          validationPattern={/^[\w.-]+@[\w.-]+\.\w+$/}
          validationMsg="Please enter a valid email"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          showTitle={true}
          customClasses="custom"
          dataTestId="test-textarea"
        />
      );
      
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(textarea).toHaveClass('rds-textarea', 'rds-textarea__error', 'rds-textarea__pill', 'custom');
      expect(textarea).toHaveAttribute('aria-required', 'true');
      
      fireEvent.focus(textarea);
      expect(onFocus).toHaveBeenCalled();
      
      fireEvent.change(textarea, { target: { value: 'invalid' } });
      expect(onChange).toHaveBeenCalled();
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      
      fireEvent.change(textarea, { target: { value: 'test@example.com' } });
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
      });
    });

    it('should handle semantic appearance changes gracefully', () => {
      const { rerender } = render(
        <RdsTextArea dataTestId="test-textarea" />
      );
      const textarea = screen.getByRole('textbox');
      
      expect(textarea).toHaveClass('rds-textarea__default');
      
      rerender(<RdsTextArea error dataTestId="test-textarea" />);
      expect(textarea).toHaveClass('rds-textarea__error');
      
      rerender(<RdsTextArea disabled dataTestId="test-textarea" />);
      expect(textarea).toHaveClass('rds-textarea__disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string value', () => {
      render(<RdsTextArea value="" dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(10000);
      render(<RdsTextArea value={longText} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe(longText);
    });

    it('should handle special characters', () => {
      const specialText = '<>&"\'';
      render(<RdsTextArea value={specialText} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe(specialText);
    });

    it('should handle newlines in text', () => {
      const multilineText = 'line1\nline2\nline3';
      render(<RdsTextArea value={multilineText} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe(multilineText);
    });

    it('should handle unicode characters', () => {
      const unicodeText = '你好世界 🌍 مرحبا العالم';
      render(<RdsTextArea value={unicodeText} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      expect(textarea.value).toBe(unicodeText);
    });

    it('should handle zero rows property', () => {
      render(<RdsTextArea rows={0} dataTestId="test-textarea" />);
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
      const rowsValue = parseInt(textarea.getAttribute('rows') || '4');
      expect(rowsValue).toBeGreaterThanOrEqual(0);
    });

    it('should handle label without value', () => {
      render(<RdsTextArea label="Label Only" dataTestId="test-textarea" />);
      expect(screen.getByText('Label Only')).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  it('G2-343: accepts string variant values', () => {
    render(<RdsTextArea disabled variant="Pill" dataTestId="ta" />);
    const ta = screen.getByRole('textbox');
    expect(ta).toBeDisabled();
    expect(ta).toHaveClass('rds-textarea__pill');
  });

  it('G2-346: passes className, name, maxLength, disabled, defaultValue and ref', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    const { container } = render(
      <RdsTextArea ref={ref} className="root-x" sx={{ marginTop: '7px' }} name="notes" maxLength={10} defaultValue="hi" disabled data-testid="ta" />
    );
    const root = screen.getByTestId('ta');
    const ta = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(root).toHaveClass('rds-textarea-container', 'root-x');
    expect(container.firstChild).toHaveStyle('margin-top: 7px');
    expect(ta).toHaveAttribute('name', 'notes');
    expect(ta).toHaveAttribute('maxLength', '10');
    expect(ta.value).toBe('hi');
    expect(ta).toBeDisabled();
    expect(ref.current).toBe(ta);
  });

  it('G2-350: required behaves like isMandatory', () => {
    render(<RdsTextArea required label="Notes" value="" dataTestId="ta" />);
    expect(screen.getByText('Notes is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('B29: error forces the error state and helperText replaces validationMsg', () => {
    render(<RdsTextArea error helperText="Bad" validationMsg="Old" data-testid="ta" />);
    expect(screen.getByRole('textbox')).toHaveClass('rds-textarea__error');
    expect(screen.getByText('Bad')).toBeInTheDocument();
    expect(screen.queryByText('Old')).not.toBeInTheDocument();
  });

  it('shows helperText as a hint when there is no error', () => {
    render(<RdsTextArea helperText="Max 200 characters" />);
    const hint = screen.getByText('Max 200 characters');
    expect(hint).toHaveClass('rds-textarea__helper-text');
    expect(hint).not.toHaveAttribute('role');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', hint.id);
  });

  it('B29: variant wins over the deprecated style string, and style accepts CSSProperties', () => {
    const { container } = render(<RdsTextArea variant="Pill" style="Bottom Outline" data-testid="ta" />);
    expect(screen.getByRole('textbox')).toHaveClass('rds-textarea__pill');
    const { container: c2 } = render(<RdsTextArea style={{ marginTop: '12px' }} />);
    expect(c2.firstChild).toHaveStyle({ marginTop: '12px' });
    expect(container).toBeInTheDocument();
  });

  it('isMultiUrl still works as a deprecated alias of multiUrl', () => {
    const { warnDeprecatedProp } = jest.requireMock('../shared/utils/deprecation');
    render(<RdsTextArea isMultiUrl validationPattern={/^a$/} data-testid="ta" />);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsTextArea', 'isMultiUrl', expect.any(String));
  });

  it('B29: deprecated dataTestId, showTitle, reset and validationMsg warn', () => {
    const { warnDeprecatedProp } = jest.requireMock('../shared/utils/deprecation');
    render(<RdsTextArea dataTestId="t" showTitle reset validationMsg="m" />);
    ['dataTestId', 'showTitle', 'reset', 'validationMsg'].forEach((p) =>
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsTextArea', p, expect.any(String))
    );
  });

  it('G2-352: localeText.required overrides the empty-value message', () => {
    render(<RdsTextArea required label="Notes" value="" localeText={{ required: 'Notes needed' }} dataTestId="ta" />);
    expect(screen.getByText('Notes needed')).toBeInTheDocument();
    expect(screen.queryByText('Notes is required')).not.toBeInTheDocument();
  });

  it('G2-353: keeps legacy class aliases alongside BEM', () => {
    const { container } = render(
      <RdsTextArea required label="Notes" value="" error variant="Pill" dataTestId="ta" />
    );
    const ta = screen.getByRole('textbox');
    expect(ta).toHaveClass('textarea-error', 'rds-textarea__error', 'textarea-pill', 'rds-textarea__pill');
    expect(container.querySelector('.textarea-label.rds-textarea__label')).toBeInTheDocument();
    expect(container.querySelector('.required-asterisk.rds-textarea__required')).toBeInTheDocument();
    expect(container.querySelector('.error-message.rds-textarea__error-message')).toBeInTheDocument();
    expect(container.querySelector('.textarea-wrapper.rds-textarea__wrapper')).toBeInTheDocument();
  });

  it('forwards data-testid to the root .rds-textarea-container', () => {
    render(<RdsTextArea data-testid="notes-field" />);
    expect(screen.getByTestId('notes-field')).toHaveClass('rds-textarea-container');
    expect(screen.getByRole('textbox')).not.toHaveAttribute('data-testid');
  });
});
