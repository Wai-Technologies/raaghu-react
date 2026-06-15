import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RdsCompTextEditor, { RdsCompTextEditorProps } from './rds-comp-text-editor';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';

// Mock SCSS
jest.mock('./rds-comp-text-editor.scss', () => ({}));

// Mock draft-js
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

// Mock html-to-draftjs
jest.mock('html-to-draftjs', () => {
  return jest.fn((html) => {
    if (!html) return null;
    return {
      contentBlocks: [{ text: html }],
    };
  });
});

// Mock draftjs-to-html
jest.mock('draftjs-to-html', () => {
  return jest.fn(() => '<p>Converted HTML</p>');
});

// Mock react-draft-wysiwyg CSS
jest.mock('react-draft-wysiwyg/dist/react-draft-wysiwyg.css', () => ({}));

// Mock react-draft-wysiwyg
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

// Mock MUI InputLabel
jest.mock('@mui/material', () => ({
  InputLabel: ({ children, className }: any) => (
    <label data-testid="input-label" className={className}>
      {children}
    </label>
  ),
}));

// Helper: render and wait for the editor to finish async loading
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
      expect(asterisk).toHaveClass('text-danger');
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
        expect(error).toHaveClass('text-danger');
      });
    });
  });

  describe('State Variants', () => {
    it('should apply selected state class', async () => {
      await renderEditor({ ...defaultProps, State: 'Selected' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--selected');
    });

    it('should apply error state class', async () => {
      await renderEditor({ ...defaultProps, State: 'Error' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--error');
    });

    it('should apply active state class', async () => {
      await renderEditor({ ...defaultProps, State: 'Active' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--active');
    });

    it('should apply disabled state class', async () => {
      await renderEditor({ ...defaultProps, State: 'Disabled' });
      const container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--disabled');
    });

    it('should set readOnly when State is Disabled', async () => {
      await renderEditor({ ...defaultProps, State: 'Disabled' });
      const editor = screen.getByTestId('editor-content');
      expect(editor).toHaveAttribute('data-readonly', 'true');
    });

    it('should not apply state class when State is not provided', async () => {
      await renderEditor({ ...defaultProps, State: undefined });
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
      await renderEditor({ ...defaultProps, readOnly: false, State: 'Disabled' });
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
        State: 'Active',
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
      await renderEditor({ ...defaultProps, State: 'Error', resizable: true });
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
        State: 'Active',
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
      const { rerender } = await renderEditor({ ...defaultProps, State: 'Active' });

      let container = screen.getByTestId('draft-editor').parentElement;
      expect(container).toHaveClass('rds-comp-text-editor--active');
      expect(container).not.toHaveClass('rds-comp-text-editor--disabled');

      rerender(<RdsCompTextEditor {...defaultProps} State="Disabled" />);

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
      const { container } = await renderEditor({ ...defaultProps, State: undefined });
      expect(container).toBeInTheDocument();
    });

    it('should handle rapid prop changes', async () => {
      const { rerender } = await renderEditor({ ...defaultProps, State: 'Active' });

      rerender(<RdsCompTextEditor {...defaultProps} State="Error" />);
      rerender(<RdsCompTextEditor {...defaultProps} State="Disabled" />);
      rerender(<RdsCompTextEditor {...defaultProps} State="Selected" />);

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
});
