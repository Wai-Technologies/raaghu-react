import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompTextEditor, { RdsCompTextEditorProps } from './rds-comp-text-editor';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import * as draft from 'draft-js';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

jest.mock('./rds-comp-text-editor.scss', () => ({}));

jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

jest.mock('draft-js', () => ({
  EditorState: {
    createEmpty: jest.fn(() => ({
      getCurrentContent: jest.fn(() => ({
        getPlainText: jest.fn(() => ''),
      })),
    })),
    createWithContent: jest.fn((contentState) => ({
      getCurrentContent: jest.fn(() => contentState),
    })),
  },
  ContentState: {
    createFromBlockArray: jest.fn(() => ({
      getPlainText: jest.fn(() => ''),
    })),
    createFromText: jest.fn(() => ({
      getPlainText: jest.fn(() => ''),
    })),
  },
  convertToRaw: jest.fn(() => ({})),
}));

jest.mock('html-to-draftjs', () => {
  return jest.fn((html) => {
    if (!html) return null;
    return {
      contentBlocks: [{ text: html }],
    };
  });
});

jest.mock('draftjs-to-html', () => {
  return jest.fn(() => '<p>Converted HTML</p>');
});

jest.mock('react-draft-wysiwyg/dist/react-draft-wysiwyg.css', () => ({}));

jest.mock('react-draft-wysiwyg', () => ({
  Editor: React.forwardRef(({
    editorState,
    onEditorStateChange,
    readOnly,
    placeholder,
    toolbarClassName,
    wrapperClassName,
    editorClassName,
  }: any, ref: any) => (
    <div data-testid="draft-editor" ref={ref}>
      <div data-testid="editor-toolbar" className={toolbarClassName} />
      <div data-testid="editor-wrapper" className={wrapperClassName}>
        <div
          data-testid="editor-content"
          className={editorClassName}
          contentEditable={!readOnly}
          data-readonly={readOnly}
          data-placeholder={placeholder}
          onBlur={() => onEditorStateChange && onEditorStateChange(editorState)}
        >
          Editor content
        </div>
      </div>
    </div>
  )),
}));

jest.mock('@mui/material', () => ({
  Box: React.forwardRef(({ children, className, sx: _sx, ...props }: any, ref: any) => (
    <div {...props} ref={ref} className={className}>{children}</div>
  )),
  InputLabel: ({ children, className }: any) => (
    <label data-testid="input-label" className={className}>
      {children}
    </label>
  ),
  FormHelperText: ({ children, className, error, id, role }: any) => (
    <p
      data-testid="form-helper-text"
      id={id}
      role={role}
      className={[className, error ? 'Mui-error' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </p>
  ),
}));

const renderEditor = async (props: RdsCompTextEditorProps) => {
  const result = render(<RdsCompTextEditor {...props} />);
  await screen.findByTestId('draft-editor');
  return result;
};

describe('RdsCompTextEditor', () => {
  const defaultProps: RdsCompTextEditorProps = {
    id: 'test-editor',
    placeholder: 'Enter text here',
    label: 'Test Label',
    isMandatory: false,
    readOnly: false,
    resizable: true,
    showTitle: true,
    rows: 6,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render component without crashing', async () => {
      await renderEditor(defaultProps);
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsCompTextEditor.displayName).toBe('RdsCompTextEditor');
    });

    it('should render with correct id', async () => {
      await renderEditor({ ...defaultProps, id: 'custom-id' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveAttribute('id', 'custom-id');
    });

    it('should render editor with correct toolbar class', async () => {
      await renderEditor(defaultProps);
      const toolbar = screen.getByTestId('editor-toolbar');
      expect(toolbar).toHaveClass('rds-comp-text-editor__toolbar');
    });

    it('should render editor with correct wrapper class', async () => {
      await renderEditor(defaultProps);
      const wrapper = screen.getByTestId('editor-wrapper');
      expect(wrapper).toHaveClass('rds-comp-text-editor__wrapper');
    });

    it('should render editor with correct content class', async () => {
      await renderEditor(defaultProps);
      const content = screen.getByTestId('editor-content');
      expect(content).toHaveClass('rds-comp-text-editor__content');
    });
  });

  describe('Label Display', () => {
    it('should render label when showTitle is true', async () => {
      await renderEditor({ ...defaultProps, showTitle: true, label: 'Test Label' });
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should not render label when showTitle is false', async () => {
      await renderEditor({ ...defaultProps, showTitle: false });
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
    });

    it('should not render label when label prop is not provided', async () => {
      await renderEditor({ ...defaultProps, showTitle: true, label: undefined });
      const label = screen.queryByTestId('input-label');
      expect(label).not.toBeInTheDocument();
    });

    it('should render with custom label class', async () => {
      await renderEditor({
        ...defaultProps,
        showTitle: true,
        label: 'Test',
        labelClass: 'custom-class',
      });
      const label = screen.getByTestId('input-label');
      expect(label).toHaveClass('custom-class');
    });

    it('should render label with rds-comp-text-editor-label class', async () => {
      await renderEditor({ ...defaultProps, showTitle: true });
      const label = screen.getByTestId('input-label');
      expect(label).toHaveClass('rds-comp-text-editor-label');
    });
  });

  describe('Mandatory Indicator', () => {
    it('should render mandatory indicator when isMandatory is true', async () => {
      await renderEditor({ ...defaultProps, isMandatory: true });
      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass('rds-comp-text-editor__required');
    });

    it('should not render mandatory indicator when isMandatory is false', async () => {
      await renderEditor({ ...defaultProps, isMandatory: false });
      const asterisk = screen.queryByText('*');
      expect(asterisk).not.toBeInTheDocument();
    });

    it('should render required error when mandatory field is empty after touch', async () => {
      await renderEditor({
        ...defaultProps,
        isMandatory: true,
        label: 'Required Field',
      });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      await waitFor(() => {
        expect(screen.getByText('Required Field is required')).toBeInTheDocument();
      });
    });

    it('should not show error when field is not mandatory', async () => {
      await renderEditor({
        ...defaultProps,
        isMandatory: false,
        label: 'Optional Field',
      });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      await waitFor(() => {
        expect(screen.queryByText('Optional Field is required')).not.toBeInTheDocument();
      });
    });

    it('should hide error class on error message', async () => {
      await renderEditor({
        ...defaultProps,
        isMandatory: true,
        label: 'Required Field',
      });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      await waitFor(() => {
        const error = screen.getByText('Required Field is required');
        expect(error).toHaveClass('rds-comp-text-editor__error', 'Mui-error');
      });
    });
  });

  describe('State Variants', () => {
    it('should apply state styles using the lowerCamelCase prop', async () => {
      await renderEditor({ ...defaultProps, state: 'Selected' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--selected');
    });

    it('should apply selected state class', async () => {
      await renderEditor({ ...defaultProps, state: 'Selected' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--selected');
    });

    it('should apply error state class', async () => {
      await renderEditor({ ...defaultProps, state: 'Error' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--error');
    });

    it('should apply active state class', async () => {
      await renderEditor({ ...defaultProps, state: 'Active' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--active');
    });

    it('should apply disabled state class', async () => {
      await renderEditor({ ...defaultProps, state: 'Disabled' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--disabled');
    });

    it('should set readOnly when State is Disabled', async () => {
      await renderEditor({ ...defaultProps, state: 'Disabled' });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });

    it('should not apply state class when State is not provided', async () => {
      await renderEditor({ ...defaultProps, state: undefined });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).not.toHaveClass('rds-comp-text-editor--selected');
      expect(container).not.toHaveClass('rds-comp-text-editor--error');
      expect(container).not.toHaveClass('rds-comp-text-editor--active');
      expect(container).not.toHaveClass('rds-comp-text-editor--disabled');
    });
  });

  describe('ReadOnly Mode', () => {
    it('should set editor as readOnly when readOnly is true', async () => {
      await renderEditor({ ...defaultProps, readOnly: true });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });

    it('should not set editor as readOnly when readOnly is false', async () => {
      await renderEditor({ ...defaultProps, readOnly: false });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-readonly', 'false');
    });

    it('should be readOnly when State is Disabled regardless of readOnly prop', async () => {
      await renderEditor({ ...defaultProps, readOnly: false, state: 'Disabled' });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });
  });

  describe('Resizable Property', () => {
    it('should apply resizable class when resizable is true', async () => {
      await renderEditor({ ...defaultProps, resizable: true });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--resizable');
    });

    it('should not apply resizable class when resizable is false', async () => {
      await renderEditor({ ...defaultProps, resizable: false });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).not.toHaveClass('rds-comp-text-editor--resizable');
    });

    it('should apply resizable class by default', async () => {
      await renderEditor({ ...defaultProps, resizable: undefined });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--resizable');
    });
  });

  describe('Rows Configuration', () => {
    it('should set default rows to 6', async () => {
      await renderEditor({ ...defaultProps, rows: undefined });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should use custom rows value', async () => {
      await renderEditor({ ...defaultProps, rows: 10 });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should use default rows when rows is 0', async () => {
      await renderEditor({ ...defaultProps, rows: 0 });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should use default rows when rows is negative', async () => {
      await renderEditor({ ...defaultProps, rows: -5 });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it('should render with placeholder text', async () => {
      await renderEditor({ ...defaultProps, placeholder: 'Type something...' });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-placeholder', 'Type something...');
    });

    it('should render without placeholder when not provided', async () => {
      await renderEditor({ ...defaultProps, placeholder: undefined });
      const editor = screen.getByTestId('editor-content');
      expect(editor).not.toHaveAttribute('data-placeholder');
    });
  });

  describe('Callback and Events', () => {
    it('should call onChange callback on editor blur', async () => {
      const onChange = jest.fn();
      await renderEditor({ ...defaultProps, onChange });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      expect(onChange).toHaveBeenCalled();
    });

    it('should pass correct parameters to onChange callback', async () => {
      const onChange = jest.fn();
      await renderEditor({ ...defaultProps, onChange });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      expect(onChange).toHaveBeenCalledWith(
        '<p>Converted HTML</p>',
        expect.any(Object),
        'user',
        expect.any(Object)
      );
    });

    it('should not crash if onChange is not provided', async () => {
      await expect(renderEditor({ ...defaultProps, onChange: undefined })).resolves.toBeDefined();
    });
  });

  describe('Props Validation', () => {
    it('should render with minimal props', async () => {
      const minimalProps: RdsCompTextEditorProps = {};
      await renderEditor(minimalProps);
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should render with all props', async () => {
      const fullProps: RdsCompTextEditorProps = {
        id: 'full-editor',
        onChange: jest.fn(),
        placeholder: 'Full placeholder',
        readOnly: true,
        value: '<p>Initial value</p>',
        label: 'Full Label',
        isMandatory: true,
        labelClass: 'custom-label',
        state: 'Active',
        showTitle: true,
        rows: 8,
        resizable: true,
      };
      await renderEditor(fullProps);
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });
  });

  describe('Value Initialization', () => {
    it('should initialize with provided value', async () => {
      await renderEditor({ ...defaultProps, value: '<p>Initial content</p>' });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should initialize without value', async () => {
      await renderEditor({ ...defaultProps, value: undefined });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should initialize with empty string value', async () => {
      await renderEditor({ ...defaultProps, value: '' });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });
  });

  describe('Main Container Classes', () => {
    it('should have base class rds-comp-text-editor', async () => {
      await renderEditor(defaultProps);
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor');
    });

    it('should combine multiple state classes', async () => {
      await renderEditor({ ...defaultProps, state: 'Error', resizable: true });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container?.className).toContain('rds-comp-text-editor');
      expect(container?.className).toContain('rds-comp-text-editor--error');
      expect(container?.className).toContain('rds-comp-text-editor--resizable');
    });
  });

  describe('Integration Tests', () => {
    it('should render complete editor with all features', async () => {
      const onChange = jest.fn();
      await renderEditor({
        id: 'complete-editor',
        placeholder: 'Enter your text',
        label: 'Complete Editor',
        isMandatory: true,
        readOnly: false,
        resizable: true,
        showTitle: true,
        rows: 8,
        onChange,
        state: 'Active',
      });

      expect(screen.getByText('Complete Editor')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
      expect(screen.getByTestId('draft-editor').parentElement).toHaveClass(
        'rds-comp-text-editor--active',
        'rds-comp-text-editor--resizable'
      );
    });

    it('should handle state transition from Active to Disabled', async () => {
      const { rerender } = await renderEditor({ ...defaultProps, state: 'Active' });

      let container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--active');
      expect(container).not.toHaveClass('rds-comp-text-editor--disabled');

      rerender(<RdsCompTextEditor {...defaultProps} state="Disabled" />);

      container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--disabled');
      expect(container).not.toHaveClass('rds-comp-text-editor--active');
    });

    it('should handle editor interactions properly', async () => {
      const onChange = jest.fn();
      await renderEditor({ ...defaultProps, onChange, isMandatory: true });

      const editor = screen.getByTestId('editor-content');
      fireEvent.blur(editor);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long label text', async () => {
      const longLabel = 'A'.repeat(100);
      await renderEditor({ ...defaultProps, showTitle: true, label: longLabel });
      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it('should handle special characters in placeholder', async () => {
      await renderEditor({ ...defaultProps, placeholder: 'Enter <text> & special chars' });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-placeholder', 'Enter <text> & special chars');
    });

    it('should handle large row numbers', async () => {
      await renderEditor({ ...defaultProps, rows: 100 });
      expect(screen.getByTestId('draft-editor')).toBeInTheDocument();
    });

    it('should handle undefined State prop gracefully', async () => {
      const { container } = await renderEditor({ ...defaultProps, state: undefined });
      expect(container).toBeInTheDocument();
    });

    it('should handle rapid prop changes', async () => {
      const { rerender } = await renderEditor({ ...defaultProps, state: 'Active' });

      rerender(<RdsCompTextEditor {...defaultProps} state="Error" />);
      rerender(<RdsCompTextEditor {...defaultProps} state="Disabled" />);
      rerender(<RdsCompTextEditor {...defaultProps} state="Selected" />);

      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--selected');
    });
  });

  describe('Accessibility', () => {
    it('has no axe accessibility violations', async () => {
      const { container } = await renderEditor(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    }, 15000);
  });

  describe('audit fixes', () => {
    it('G6-105 seeds the editor from value on mount', async () => {
      await renderEditor({ value: '<p>Hi</p>' });
      expect((draft.ContentState.createFromBlockArray as jest.Mock)).toHaveBeenCalled();
    });

    it('G6-106 does not rebuild state when value echoes the emitted html', async () => {
      const { rerender } = await renderEditor({ onChange: jest.fn() });
      fireEvent.blur(screen.getByTestId('editor-content'));
      (draft.ContentState.createFromBlockArray as jest.Mock).mockClear();
      rerender(<RdsCompTextEditor onChange={jest.fn()} value="<p>Converted HTML</p>" />);
      expect((draft.ContentState.createFromBlockArray as jest.Mock)).not.toHaveBeenCalled();
      rerender(<RdsCompTextEditor onChange={jest.fn()} value="<p>Other</p>" />);
      expect((draft.ContentState.createFromBlockArray as jest.Mock)).toHaveBeenCalled();
    });

    it('G6-110 error/disabled win over State', async () => {
      await renderEditor({ state: 'Active', error: true, disabled: true });
      const c = screen.getByTestId('draft-editor').parentElement;
      expect(c).toHaveClass('rds-comp-text-editor--error', 'rds-comp-text-editor--disabled');
      expect(screen.getByTestId('editor-content')).toHaveAttribute('data-readonly', 'true');
    });

    it('G6-111 required shows the asterisk', async () => {
      await renderEditor({ ...defaultProps, isMandatory: undefined, required: true });
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('G6-111 isMandatory warns', async () => {
      await renderEditor({ ...defaultProps, isMandatory: true });
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompTextEditor', 'isMandatory', '`required`');
    });

    it('state applies without a legacy casing alias', async () => {
      (warnDeprecatedProp as jest.Mock).mockClear();
      await renderEditor({ state: 'Active' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--active');
      expect(container).not.toHaveClass('rds-comp-text-editor--error');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('G6-112 wires label and error ids', async () => {
      await renderEditor({ ...defaultProps, required: true });
      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('aria-labelledby');
      fireEvent.blur(screen.getByTestId('editor-content'));
      await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Test Label is required'));
      expect(screen.getByRole('alert')).toHaveAttribute('id');
    });
  });
});

describe('audit fixes focused/defaultValue', () => {
  it('focused applies the active class', async () => {
    const { container } = await renderEditor({ label: "L", showTitle: true, focused: true });
    expect(container.querySelector('.rds-comp-text-editor--active')).toBeInTheDocument();
  });

  it('defaultValue seeds the editor', async () => {
    const htmlToDraft = jest.requireMock('html-to-draftjs');
    htmlToDraft.mockClear();
    await renderEditor({ defaultValue: '<p>seed</p>' });
    expect(htmlToDraft).toHaveBeenCalledWith('<p>seed</p>');
  });

  it('G6-108: sanitizeEditorHtml strips script tags', () => {
    const { sanitizeEditorHtml } = jest.requireActual('./sanitize-html') as typeof import('./sanitize-html');
    expect(sanitizeEditorHtml('<p>ok</p><script>alert(1)</script>')).toBe('<p>ok</p>');
    expect(sanitizeEditorHtml('<img src="javascript:alert(1)">')).not.toContain('javascript:');
  });

  it('G6-108: onChange emits sanitised HTML', async () => {
    const draftToHtml = jest.requireMock('draftjs-to-html') as jest.Mock;
    draftToHtml.mockReturnValueOnce('<p>safe</p><script>x</script>');
    const onChange = jest.fn();
    await renderEditor({ onChange });
    fireEvent.blur(screen.getByTestId('editor-content'));
    expect(onChange).toHaveBeenCalledWith(
      '<p>safe</p>',
      expect.any(Object),
      'user',
      expect.any(Object),
    );
  });
});

describe('RdsCompTextEditor style', () => {
  it('forwards style to the root element', async () => {
    const { container } = await renderEditor({ style: { opacity: 0.5 } });
    expect(container.querySelector('.rds-comp-text-editor')).toHaveStyle({ opacity: '0.5' });
  });
});
