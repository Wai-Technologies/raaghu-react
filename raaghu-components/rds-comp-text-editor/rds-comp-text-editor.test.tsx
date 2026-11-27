import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { $createParagraphNode, $createTextNode, $getRoot, type LexicalEditor } from 'lexical';
import RdsCompTextEditor, { type RdsCompTextEditorProps } from './rds-comp-text-editor';
import { sanitizeEditorHtml, isSafeUrl } from './sanitize-html';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';

jest.mock('./rds-comp-text-editor.scss', () => ({}));
jest.mock('../../raaghu-elements/shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

const renderEditor = async (props: RdsCompTextEditorProps) => {
  let result!: ReturnType<typeof render>;
  await act(async () => {
    result = render(<RdsCompTextEditor {...props} />);
  });
  return result;
};

const root = (container: HTMLElement) => container.querySelector('.rds-comp-text-editor') as HTMLElement;
const content = () => document.querySelector('.rds-comp-text-editor__content') as HTMLElement;

describe('RdsCompTextEditor', () => {
  const defaultProps: RdsCompTextEditorProps = {
    id: 'test-editor',
    placeholder: 'Enter text here',
    label: 'Test Label',
    readOnly: false,
    resizable: true,
    showTitle: true,
    rows: 6,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('renders the editor, toolbar and content area', async () => {
      const { container } = await renderEditor(defaultProps);
      expect(root(container)).toBeInTheDocument();
      expect(screen.getByRole('toolbar', { name: 'Text formatting' })).toHaveClass('rds-comp-text-editor__toolbar');
      expect(container.querySelector('.rds-comp-text-editor__wrapper')).toBeInTheDocument();
      expect(content()).toHaveClass('rds-comp-text-editor__content');
    });

    it('has the displayName', () => {
      expect(RdsCompTextEditor.displayName).toBe('RdsCompTextEditor');
    });

    it('applies id, className and style to the root', async () => {
      const { container } = await renderEditor({ ...defaultProps, id: 'custom-id', className: 'extra', style: { opacity: 0.5 } });
      expect(root(container)).toHaveAttribute('id', 'custom-id');
      expect(root(container)).toHaveClass('extra');
      expect(root(container)).toHaveStyle({ opacity: '0.5' });
    });

    it('shows the placeholder', async () => {
      await renderEditor({ ...defaultProps, placeholder: 'Type something...' });
      expect(screen.getByText('Type something...')).toHaveClass('rds-comp-text-editor__placeholder');
    });

    it('renders toolbar controls for every formatting feature', async () => {
      await renderEditor(defaultProps);
      for (const name of ['Undo', 'Redo', 'Bold', 'Italic', 'Underline', 'Strikethrough', 'Bullet list', 'Numbered list', 'Align left', 'Align center', 'Align right', 'Justify', 'Link', 'Insert image']) {
        expect(screen.getByRole('button', { name })).toBeInTheDocument();
      }
      expect(screen.getByRole('combobox', { name: 'Block type' })).toBeInTheDocument();
    });
  });

  describe('Label and required', () => {
    it('renders the label only when showTitle and label are set', async () => {
      const { unmount } = await renderEditor({ ...defaultProps, labelClass: 'custom-class' });
      expect(screen.getByText('Test Label')).toHaveClass('rds-comp-text-editor-label', 'custom-class');
      unmount();
      await renderEditor({ ...defaultProps, showTitle: false });
      expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
    });

    it('labels the content area by the visible label', async () => {
      await renderEditor(defaultProps);
      const labelId = screen.getByText('Test Label').getAttribute('id');
      expect(content()).toHaveAttribute('aria-labelledby', labelId);
      expect(document.querySelector('.rds-comp-text-editor')).toHaveAttribute('aria-labelledby', labelId);
    });

    it('falls back to aria-label without a visible label', async () => {
      await renderEditor({ label: 'Notes' });
      expect(content()).toHaveAttribute('aria-label', 'Notes');
    });

    it('shows the asterisk and aria-required for required', async () => {
      await renderEditor({ ...defaultProps, required: true });
      expect(screen.getByText('*')).toHaveClass('rds-comp-text-editor__required');
      expect(content()).toHaveAttribute('aria-required', 'true');
      expect(warnDeprecatedProp).not.toHaveBeenCalled();
    });

    it('warns for the deprecated isMandatory prop', async () => {
      await renderEditor({ ...defaultProps, isMandatory: true });
      expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsCompTextEditor', 'isMandatory', '`required`');
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('shows the required error after blur when empty', async () => {
      await renderEditor({ ...defaultProps, required: true });
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      fireEvent.blur(content());
      const alert = await screen.findByRole('alert');
      expect(alert).toHaveTextContent('Test Label is required');
      expect(alert).toHaveClass('rds-comp-text-editor__error', 'Mui-error');
      expect(content()).toHaveAttribute('aria-describedby', alert.getAttribute('id'));
      expect(content()).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not show the required error when not required', async () => {
      await renderEditor(defaultProps);
      fireEvent.blur(content());
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('does not show the required error when the value has text', async () => {
      await renderEditor({ ...defaultProps, required: true, value: '<p>Filled</p>' });
      fireEvent.blur(content());
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('State classes', () => {
    it.each([
      ['Selected', 'rds-comp-text-editor--selected'],
      ['Error', 'rds-comp-text-editor--error'],
      ['Active', 'rds-comp-text-editor--active'],
      ['Disabled', 'rds-comp-text-editor--disabled'],
    ])('state %s applies %s', async (state, className) => {
      const { container } = await renderEditor({ ...defaultProps, state });
      expect(root(container)).toHaveClass(className);
    });

    it('applies no state class without state', async () => {
      const { container } = await renderEditor(defaultProps);
      ['selected', 'error', 'active', 'disabled'].forEach((s) =>
        expect(root(container)).not.toHaveClass(`rds-comp-text-editor--${s}`),
      );
    });

    it('error and disabled props win over state', async () => {
      const { container } = await renderEditor({ state: 'Active', error: true, disabled: true });
      expect(root(container)).toHaveClass('rds-comp-text-editor--error', 'rds-comp-text-editor--disabled');
      expect(content()).toHaveAttribute('contenteditable', 'false');
    });

    it('focused applies the active class', async () => {
      const { container } = await renderEditor({ focused: true });
      expect(root(container)).toHaveClass('rds-comp-text-editor--active');
    });

    it('resizable is on by default and can be turned off', async () => {
      const { container, unmount } = await renderEditor({ resizable: undefined });
      expect(root(container)).toHaveClass('rds-comp-text-editor--resizable');
      unmount();
      const second = await renderEditor({ resizable: false });
      expect(root(second.container)).not.toHaveClass('rds-comp-text-editor--resizable');
    });
  });

  describe('Editable state', () => {
    it('is editable by default', async () => {
      await renderEditor(defaultProps);
      expect(content()).toHaveAttribute('contenteditable', 'true');
    });

    it('readOnly makes the content non-editable and disables the toolbar', async () => {
      await renderEditor({ ...defaultProps, readOnly: true });
      expect(content()).toHaveAttribute('contenteditable', 'false');
      expect(screen.getByRole('button', { name: 'Bold' })).toBeDisabled();
    });

    it('updates editability when readOnly changes after mount', async () => {
      const { rerender } = await renderEditor({ ...defaultProps, readOnly: false });
      expect(content()).toHaveAttribute('contenteditable', 'true');
      await act(async () => {
        rerender(<RdsCompTextEditor {...defaultProps} readOnly />);
      });
      expect(content()).toHaveAttribute('contenteditable', 'false');
    });

    it('state Disabled makes the content non-editable', async () => {
      await renderEditor({ ...defaultProps, state: 'Disabled' });
      expect(content()).toHaveAttribute('contenteditable', 'false');
    });
  });

  describe('Value', () => {
    it('seeds the editor from value', async () => {
      await renderEditor({ value: '<p>Initial content</p>' });
      await waitFor(() => expect(content()).toHaveTextContent('Initial content'));
    });

    it('seeds the editor from defaultValue', async () => {
      await renderEditor({ defaultValue: '<p>seed</p>' });
      await waitFor(() => expect(content()).toHaveTextContent('seed'));
    });

    it('replaces the content when a controlled value changes', async () => {
      const { rerender } = await renderEditor({ value: '<p>First</p>' });
      await waitFor(() => expect(content()).toHaveTextContent('First'));
      await act(async () => {
        rerender(<RdsCompTextEditor value="<p>Second</p>" />);
      });
      await waitFor(() => expect(content()).toHaveTextContent('Second'));
      expect(content()).not.toHaveTextContent('First');
    });

    it('sanitises incoming HTML', async () => {
      await renderEditor({ value: '<p>Safe</p><img src="x" onerror="alert(1)"><script>alert(2)</script>' });
      await waitFor(() => expect(content()).toHaveTextContent('Safe'));
      expect(content().innerHTML).not.toContain('onerror');
      expect(content().innerHTML).not.toContain('<script');
    });

    it('does not emit onChange for programmatic value updates', async () => {
      const onChange = jest.fn();
      const { rerender } = await renderEditor({ onChange, value: '<p>One</p>' });
      await act(async () => {
        rerender(<RdsCompTextEditor onChange={onChange} value="<p>Two</p>" />);
      });
      await waitFor(() => expect(content()).toHaveTextContent('Two'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('emits sanitised HTML with the legacy signature when the user edits', async () => {
      const onChange = jest.fn();
      await renderEditor({ ...defaultProps, onChange });
      const editor = (content() as HTMLElement & { __lexicalEditor: LexicalEditor }).__lexicalEditor;
      await act(async () => {
        editor.update(() => {
          $getRoot().append($createParagraphNode().append($createTextNode('Hello <script>x</script>')));
        });
      });
      await waitFor(() => expect(onChange).toHaveBeenCalled());
      const [html, delta, source] = onChange.mock.calls.at(-1)!;
      expect(html).toContain('Hello');
      expect(html).not.toContain('<script');
      expect(delta).toEqual(expect.objectContaining({ ops: expect.any(Array) }));
      expect(source).toBe('user');
    });

    it('does not re-import the HTML it just emitted', async () => {
      const onChange = jest.fn();
      const { rerender } = await renderEditor({ onChange });
      const editor = (content() as HTMLElement & { __lexicalEditor: LexicalEditor }).__lexicalEditor;
      await act(async () => {
        editor.update(() => {
          $getRoot().append($createParagraphNode().append($createTextNode('Typed')));
        });
      });
      await waitFor(() => expect(onChange).toHaveBeenCalled());
      const emitted = onChange.mock.calls.at(-1)![0] as string;
      const calls = onChange.mock.calls.length;
      await act(async () => {
        rerender(<RdsCompTextEditor onChange={onChange} value={emitted} />);
      });
      expect(onChange).toHaveBeenCalledTimes(calls);
      expect(content()).toHaveTextContent('Typed');
    });

    it('renders without onChange', async () => {
      await expect(renderEditor({ ...defaultProps, onChange: undefined })).resolves.toBeDefined();
    });
  });

  describe('Toolbar', () => {
    it('opens the link dialog and rejects unsafe URLs', async () => {
      await renderEditor(defaultProps);
      fireEvent.click(screen.getByRole('button', { name: 'Link' }));
      const field = await screen.findByLabelText('Link URL');
      const apply = screen.getByRole('button', { name: 'Apply' });
      expect(apply).toBeDisabled();
      fireEvent.change(field, { target: { value: 'javascript:alert(1)' } });
      expect(apply).toBeDisabled();
      fireEvent.change(field, { target: { value: 'https://example.com' } });
      expect(apply).toBeEnabled();
    });

    it('reads images through onImageUpload', async () => {
      const onImageUpload = jest.fn().mockResolvedValue('https://cdn.example.com/a.png');
      await renderEditor({ ...defaultProps, onImageUpload });
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      await act(async () => {
        fireEvent.change(screen.getByTestId('rds-comp-text-editor-image-input'), { target: { files: [file] } });
      });
      expect(onImageUpload).toHaveBeenCalledWith(file);
    });
  });

  describe('Sanitiser', () => {
    it('strips script tags and javascript URLs', () => {
      expect(sanitizeEditorHtml('<p>ok</p><script>alert(1)</script>')).toBe('<p>ok</p>');
      expect(sanitizeEditorHtml('<img src="javascript:alert(1)">')).not.toContain('javascript:');
    });

    it.each([
      ['https://example.com', true],
      ['mailto:a@b.c', true],
      ['/relative/path', true],
      ['#anchor', true],
      ['javascript:alert(1)', false],
      [' java\tscript:alert(1)', false],
      ['data:text/html,x', false],
      ['vbscript:x', false],
      ['', false],
    ])('isSafeUrl(%j) is %s', (url, expected) => {
      expect(isSafeUrl(url)).toBe(expected);
    });
  });

  describe('Accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = await renderEditor(defaultProps);
      expect(await axe(container)).toHaveNoViolations();
    }, 15000);
  });
});
