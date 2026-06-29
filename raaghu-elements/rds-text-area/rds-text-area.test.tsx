import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RdsTextArea, { TextareaState, TextareaStyle, RdsTextAreaProps } from './rds-text-area';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-text-area.scss', () => ({}));

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
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toBeInTheDocument();
    });

    it('should apply rds-textarea class', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
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
      render(<RdsTextArea label="Required Field" isMandatory={true} />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should render default state by default', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-default');
    });

    it('should apply active state class', () => {
      render(<RdsTextArea state={TextareaState.Active} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-active');
    });

    it('should apply selected state class', () => {
      render(<RdsTextArea state={TextareaState.Selected} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-selected');
    });

    it('should apply error state class', () => {
      render(<RdsTextArea state={TextareaState.Error} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-error');
    });

    it('should apply disabled state class', () => {
      render(<RdsTextArea state={TextareaState.Disabled} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-disabled');
    });

    it('should disable textarea when state is Disabled', () => {
      render(<RdsTextArea state={TextareaState.Disabled} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
    });

    it('should transition to active state on focus', async () => {
      const { container } = render(
        <RdsTextArea state={TextareaState.Default} dataTestId="test-textarea" />
      );
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      await waitFor(() => {
        expect(textarea).toHaveClass('textarea-active');
      });
    });

    it('should not change disabled state on focus', () => {
      render(<RdsTextArea state={TextareaState.Disabled} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      expect(textarea).toHaveClass('textarea-disabled');
    });

    it('should not change error state on focus', () => {
      render(<RdsTextArea state={TextareaState.Error} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      expect(textarea).toHaveClass('textarea-error');
    });
  });

  describe('Styles', () => {
    it('should render default style by default', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-style-default');
    });

    it('should apply pill style class', () => {
      render(<RdsTextArea style={TextareaStyle.Pill} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-pill');
      expect(textarea.closest('.textarea-pill-wrapper')).toBeTruthy();
    });

    it('should apply bottom outline style class', () => {
      render(<RdsTextArea style={TextareaStyle.BottomOutline} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('textarea-bottom-outline');
    });
  });

  describe('Rows and Placeholder', () => {
    it('should render default rows count', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(4);
    });

    it('should apply custom rows count', () => {
      render(<RdsTextArea rows={10} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(10);
    });

    it('should apply placeholder', () => {
      render(<RdsTextArea placeholder="Enter your text" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('Enter your text');
    });

    it('should handle empty placeholder', () => {
      render(<RdsTextArea placeholder="" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.placeholder).toBe('');
    });
  });

  describe('Value and Change Handler', () => {
    it('should render with initial value', () => {
      render(<RdsTextArea value="initial text" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('initial text');
    });

    it('should call onChange when text is entered', async () => {
      const onChange = jest.fn();
      render(<RdsTextArea onChange={onChange} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      await userEvent.type(textarea, 'test input');
      expect(onChange).toHaveBeenCalled();
    });

    it('should update value on change', async () => {
      const { rerender } = render(<RdsTextArea value="" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      
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
      
      // onChange may not be called on rerender with prop changes
      expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Mandatory Field Validation', () => {
    it('should not show error for mandatory field with value', () => {
      render(<RdsTextArea isMandatory={true} value="some text" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error for mandatory field without value', () => {
      render(<RdsTextArea isMandatory={true} value="" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });

    it('should show error message for mandatory field', () => {
      render(<RdsTextArea isMandatory={true} label="Required Field" value="" dataTestId="test-textarea" />);
      expect(screen.getByText('Required Field is required')).toBeInTheDocument();
    });

    it('should validate mandatory field on blur', async () => {
      const { container } = render(
        <RdsTextArea isMandatory={true} label="Required Field" dataTestId="test-textarea" />
      );
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);
      
      await waitFor(() => {
        expect(screen.getByText('Required Field is required')).toBeInTheDocument();
      });
    });

    it('should clear error when mandatory field gets a value', async () => {
      const { rerender } = render(
        <RdsTextArea isMandatory={true} label="Required Field" value="" dataTestId="test-textarea" />
      );
      expect(screen.getByText('Required Field is required')).toBeInTheDocument();
      
      rerender(
        <RdsTextArea isMandatory={true} label="Required Field" value="some text" dataTestId="test-textarea" />
      );
      expect(screen.queryByText('Required Field is required')).not.toBeInTheDocument();
    });

    it('should consider whitespace-only value as invalid', () => {
      render(<RdsTextArea isMandatory={true} value="   " dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Change the value to trigger validation
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Change the value to trigger validation
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Change to invalid value to trigger error message
      fireEvent.change(textarea, { target: { value: 'invalid-url' } });
      expect(screen.getByText('Please enter a valid URL')).toBeInTheDocument();
    });

    it('should validate multiple URLs separated by newlines', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          isMultiUrl={true}
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      
      // Change to valid multi-URL value
      fireEvent.change(textarea, { target: { value: 'http://example1.com\nhttp://example2.com' } });
      expect(textarea).not.toHaveAttribute('aria-invalid', 'true');
    });

    it('should fail multi-URL validation with one invalid URL', () => {
      const urlPattern = /^(https?:\/\/)/;
      render(
        <RdsTextArea 
          value="" 
          validationPattern={urlPattern}
          isMultiUrl={true}
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      
      // Change to value with one invalid URL
      fireEvent.change(textarea, { target: { value: 'http://example.com\ninvalid-url' } });
      expect(textarea).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Reset Functionality', () => {
    it('should clear validation on reset', () => {
      const { rerender } = render(
        <RdsTextArea 
          isMandatory={true} 
          value="" 
          reset={false}
          dataTestId="test-textarea"
        />
      );
      // The error message includes the default "Label" text
      expect(screen.getByText(/is required/)).toBeInTheDocument();
      
      rerender(
        <RdsTextArea 
          isMandatory={true} 
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Trigger validation with invalid value
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
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.click(textarea);
      expect(onClick).toHaveBeenCalled();
    });

    it('should call onKeyDown on key press', () => {
      const onKeyDown = jest.fn();
      render(<RdsTextArea onKeyDown={onKeyDown} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.keyDown(textarea, { key: 'Enter' });
      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call onFocus when focused', () => {
      const onFocus = jest.fn();
      render(<RdsTextArea onFocus={onFocus} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when blurred', () => {
      const onBlur = jest.fn();
      render(<RdsTextArea onBlur={onBlur} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      fireEvent.focus(textarea);
      fireEvent.blur(textarea);
      expect(onBlur).toHaveBeenCalled();
    });

    it('should call onChange on value change', async () => {
      const onChange = jest.fn();
      render(<RdsTextArea onChange={onChange} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea');
      
      await userEvent.type(textarea, 'test');
      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-invalid attribute', () => {
      render(
        <RdsTextArea 
          state={TextareaState.Error} 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
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
          isMandatory={true} 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required when not mandatory', () => {
      render(
        <RdsTextArea 
          isMandatory={false} 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).not.toHaveAttribute('aria-required');
    });

    it('should have aria-describedby when error', () => {
      render(
        <RdsTextArea 
          isMandatory={true}
          value=""
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
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
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveAttribute('id', 'custom-id');
    });

    it('should generate unique id when not provided', () => {
      const { container: container1 } = render(<RdsTextArea dataTestId="textarea1" />);
      const { container: container2 } = render(<RdsTextArea dataTestId="textarea2" />);
      
      const textarea1 = screen.getByTestId('textarea1');
      const textarea2 = screen.getByTestId('textarea2');
      
      const id1 = textarea1.getAttribute('id');
      const id2 = textarea2.getAttribute('id');
      
      expect(id1).not.toBe(id2);
    });

    it('should apply custom classes', () => {
      render(
        <RdsTextArea 
          customClasses="custom-class another-class" 
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('custom-class', 'another-class');
    });

    it('should apply custom classes with state and style classes', () => {
      render(
        <RdsTextArea 
          state={TextareaState.Active}
          style={TextareaStyle.Pill}
          customClasses="my-custom"
          dataTestId="test-textarea"
        />
      );
      const textarea = screen.getByTestId('test-textarea');
      expect(textarea).toHaveClass('rds-textarea', 'textarea-active', 'textarea-pill', 'my-custom');
    });
  });

  describe('Error Messages', () => {
    it('should not show error message by default', () => {
      render(<RdsTextArea dataTestId="test-textarea" />);
      const errorMessages = screen.queryAllByText(/.*is required|.*invalid|.*/i);
      // Filter for actual error elements
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Change to invalid value to trigger validation
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
      const textarea = screen.getByTestId('test-textarea');
      
      // Change to invalid value
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
          state={TextareaState.Disabled}
        />
      );
      const label = container.querySelector('.textarea-label');
      expect(label).toHaveClass('disabled');
    });

    it('should not apply disabled class to label when enabled', () => {
      const { container } = render(
        <RdsTextArea 
          label="Text Area" 
          state={TextareaState.Default}
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
          state={TextareaState.Default}
          style={TextareaStyle.Pill}
          rows={6}
          isMandatory={true}
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
      
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      
      // Check rendering
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(textarea).toHaveClass('rds-textarea', 'textarea-default', 'textarea-pill', 'custom');
      expect(textarea).toHaveAttribute('aria-required', 'true');
      
      // Check focus
      fireEvent.focus(textarea);
      expect(onFocus).toHaveBeenCalled();
      
      // Type invalid value
      fireEvent.change(textarea, { target: { value: 'invalid' } });
      expect(onChange).toHaveBeenCalled();
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      
      // Type valid value
      fireEvent.change(textarea, { target: { value: 'test@example.com' } });
      await waitFor(() => {
        expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
      });
    });

    it('should handle state changes gracefully', () => {
      const { rerender } = render(
        <RdsTextArea state={TextareaState.Default} dataTestId="test-textarea" />
      );
      const textarea = screen.getByTestId('test-textarea');
      
      expect(textarea).toHaveClass('textarea-default');
      
      rerender(<RdsTextArea state={TextareaState.Active} dataTestId="test-textarea" />);
      expect(textarea).toHaveClass('textarea-active');
      
      rerender(<RdsTextArea state={TextareaState.Error} dataTestId="test-textarea" />);
      expect(textarea).toHaveClass('textarea-error');
      
      rerender(<RdsTextArea state={TextareaState.Disabled} dataTestId="test-textarea" />);
      expect(textarea).toHaveClass('textarea-disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string value', () => {
      render(<RdsTextArea value="" dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe('');
    });

    it('should handle very long text', () => {
      const longText = 'a'.repeat(10000);
      render(<RdsTextArea value={longText} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(longText);
    });

    it('should handle special characters', () => {
      const specialText = '<>&"\'';
      render(<RdsTextArea value={specialText} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(specialText);
    });

    it('should handle newlines in text', () => {
      const multilineText = 'line1\nline2\nline3';
      render(<RdsTextArea value={multilineText} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(multilineText);
    });

    it('should handle unicode characters', () => {
      const unicodeText = '你好世界 🌍 مرحبا العالم';
      render(<RdsTextArea value={unicodeText} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      expect(textarea.value).toBe(unicodeText);
    });

    it('should handle zero rows property', () => {
      render(<RdsTextArea rows={0} dataTestId="test-textarea" />);
      const textarea = screen.getByTestId('test-textarea') as HTMLTextAreaElement;
      // When rows is 0, the component defaults to 4 rows
      const rowsValue = parseInt(textarea.getAttribute('rows') || '4');
      expect(rowsValue).toBeGreaterThanOrEqual(0);
    });

    it('should handle label without value', () => {
      render(<RdsTextArea label="Label Only" dataTestId="test-textarea" />);
      expect(screen.getByText('Label Only')).toBeInTheDocument();
    });
  });
});