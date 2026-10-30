import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import RdsFileUploader, { RdsFileUploaderProps, FileWithProgress } from './rds-file-uploader';

import { renderHook, act } from '@testing-library/react';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

jest.mock('./rds-file-uploader.scss', () => ({}));
jest.mock('../shared/utils/deprecation', () => ({ warnDeprecatedProp: jest.fn() }));

let mockStandardViewProps: any;
jest.mock('./RdsFileUploaderStandardView', () => {
  return function MockStandardView(props: any) {
    mockStandardViewProps = props;
    return (
      <div data-testid="standard-view">
        <input type="file" aria-label="Choose file" onChange={props.handleFileSelect} />
      </div>
    );
  };
});

jest.mock('./RdsFileUploaderComponents', () => ({
  RdsDropZoneSideIcon: ({ openFileDialog }: any) => (
    <button type="button" data-testid="drop-zone-side-icon" onClick={openFileDialog} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      Drop Zone Side Icon
    </button>
  ),
  RdsDropZoneWithButton: ({ openFileDialog }: any) => (
    <div data-testid="drop-zone-with-button" onClick={openFileDialog}>
      Drop Zone With Button
    </div>
  ),
  RdsDropZoneDefault: ({ openFileDialog, accept }: any) => (
    <button type="button" data-testid="drop-zone-default" data-accept={accept} onClick={openFileDialog} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      Drop Zone Default
    </button>
  ),
  RdsFileList: ({ files }: any) => (
    <div data-testid="file-list">
      {files.map((file: any) => (
        <div key={file.file.name} data-testid={`file-item-${file.file.name}`}>
          {file.file.name}
        </div>
      ))}
    </div>
  ),
  useFileUploader: () => ({
    files: [],
    isDragOver: false,
    isUploading: false,
    mandatoryError: '',
    selectedFileName: '',
    fileInputRef: React.createRef(),
    formatFileSize: (bytes: number) => `${(bytes / 1024).toFixed(2)} KB`,
    removeFile: jest.fn(),
    handleFileSelect: jest.fn(),
    handleDragOver: jest.fn(),
    handleDragLeave: jest.fn(),
    handleDrop: jest.fn(),
    openFileDialog: jest.fn(),
    setSelectedFileName: jest.fn(),
    setFiles: jest.fn(),
  }),
}));

describe('RdsFileUploader', () => {
  const defaultProps: RdsFileUploaderProps = {
    title: 'Upload Files',
    accept: '.pdf,.doc,.docx',
    multiple: true,
  };
  const setup = (p: RdsFileUploaderProps = {}) => render(<RdsFileUploader {...defaultProps} {...p} />);
  const fileInput = (container: HTMLElement) => container.querySelector('input[type="file"]');

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = setup();
      expect(container).toBeInTheDocument();
    });

    it('should have correct displayName', () => {
      expect(RdsFileUploader.displayName).toBe('RdsFileUploader');
    });

    it('should render with default props', () => {
      const { container } = render(<RdsFileUploader />);
      expect(container).toBeInTheDocument();
    });

    it('should render with className', () => {
      const { container } = setup({ mode: 'default' });
      expect(container.querySelector('.rds-file-uploader')).toBeInTheDocument();
    });

    it('should apply the selected appearance in standard mode', () => {
      render(<RdsFileUploader selected />);
      expect(mockStandardViewProps.rootProps.className).toContain('rds-file-uploader--selected');
    });

    it('should apply the selected appearance in default mode', () => {
      const { container } = render(<RdsFileUploader selected mode="default" />);
      expect(container.querySelector('.rds-file-uploader')).toHaveClass('rds-file-uploader--selected');
    });
  });

  describe('Title and Label Rendering', () => {
    it('should render title when showTitle is true', () => {
      setup({ showTitle: true, mode: 'default', title: 'Upload Your Documents' });
      expect(screen.getByText('Upload Your Documents')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      setup({ showTitle: false, mode: 'default', title: 'Upload Your Documents' });
      expect(screen.queryByText('Upload Your Documents')).not.toBeInTheDocument();
    });

    it('should show mandatory indicator when isMandatory is true', () => {
      const { container } = setup({ showTitle: true, mode: 'default', required: true });
      expect(container.querySelector('.rds-file-uploader__form-title')).toBeInTheDocument();
    });
  });

  describe('Mode Variants', () => {
    it('should render standard mode', () => {
      setup({ mode: 'standard' });
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should render default mode', () => {
      setup({ mode: 'default' });
      const uploader = screen.getByText((content, element) => {
        const hasClass = element?.className?.includes('rds-file-uploader--mode-default');
        return hasClass ?? false;
      });
      expect(uploader).toBeInTheDocument();
    });
  });

  describe('Drop Zone Styles', () => {
    it.each([
      ['Drop Area - Side Icon', 'drop-zone-side-icon'],
      ['Drop Area - Top Icon', 'drop-zone-default'],
      ['Drop Area - With Upload Button', 'drop-zone-with-button'],
    ])('should render %s', (variant, testId) => {
      setup({ mode: 'default', variant: variant as any });
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    });
  });

  describe('File Input Props', () => {
    it.each([
      ['multiple', { multiple: true }, 'multiple', true],
      ['not multiple', { multiple: false }, 'multiple', false],
      ['disabled', { disabled: true }, 'disabled', true],
      ['enabled', { disabled: false }, 'disabled', false],
    ])('input attribute for %s', (_n, props, attr, present) => {
      const { container } = setup({ mode: 'default', ...props });
      const input = expect(fileInput(container));
      if (present) input.toHaveAttribute(attr);
      else input.not.toHaveAttribute(attr);
    });

    it('should set accept attribute', () => {
      const { container } = setup({ mode: 'default', accept: '.pdf,.doc' });
      expect(fileInput(container)).toHaveAttribute('accept', '.pdf,.doc');
    });
  });

  describe('Hint and Error Messages', () => {
    it('should render hint text when showHint is true', () => {
      setup({ mode: 'default', showHint: true, hintText: 'Maximum file size is 5MB' });
      expect(screen.getByText('Maximum file size is 5MB')).toBeInTheDocument();
    });

    it('should not render hint text when showHint is false', () => {
      setup({ mode: 'default', showHint: false, hintText: 'Maximum file size is 5MB' });
      expect(screen.queryByText('Maximum file size is 5MB')).not.toBeInTheDocument();
    });

    it('should show default hint when no hintText provided', () => {
      setup({ mode: 'default', showHint: true });
      expect(screen.getByText('Maximum 10 MB')).toBeInTheDocument();
    });

    it('derives the default hint from maxSize', () => {
      setup({ mode: 'default', showHint: true, maxSize: 2 * 1024 * 1024 });
      expect(screen.getByText('Maximum 2 MB')).toBeInTheDocument();
    });
  });

  describe('Placeholder Image', () => {
    it('should render placeholder image when provided', () => {
      setup({ mode: 'default', placeholderImage: 'https://example.com/image.png' });
      expect(screen.getByAltText('placeholder')).toHaveAttribute('src', 'https://example.com/image.png');
    });

    it('should not render placeholder image when not provided', () => {
      setup({ mode: 'default', placeholderImage: '' });
      expect(screen.queryByAltText('placeholder')).not.toBeInTheDocument();
    });
  });

  describe('Standard Props Acceptance', () => {
    it.each([
      [{ maxSize: 5 * 1024 * 1024 }],
      [{ maxFiles: 3 }],
      [{}],
      [{ showTitle: true, title: '' }],
      [{ onFilesChange: jest.fn() }],
      [{ onFilesChange: undefined }],
      [{ onUpload: jest.fn().mockResolvedValue(undefined) }],
      [{ onUpload: undefined }],
      [{ maxSize: 0 }],
      [{ maxFiles: 0 }],
      [{ maxSize: 1024 * 1024 * 1024 }],
      [{ maxSize: -100 }],
      [{ mode: 'default' }],
    ])('should render with %p', (props) => {
      const { container } = setup(props as any);
      expect(container).toBeInTheDocument();
    });

    it('should handle window resize', () => {
      const { container } = setup({ mode: 'default' });
      fireEvent.resize(window);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Preview Functionality', () => {
    it('should show preview when showPreview is true', () => {
      const { container } = setup({ mode: 'default', showPreview: true });
      expect(container.querySelector('.rds-file-uploader')).toBeInTheDocument();
    });

    it('should not show preview when showPreview is false', () => {
      setup({ mode: 'default', showPreview: false });
      const fileListElement = screen.queryByTestId('file-list');
      expect(fileListElement === null || fileListElement.children.length === 0).toBeTruthy();
    });
  });

  describe('Standard view rendering', () => {
    it.each([[{ dragAndDrop: true }], [{ dragAndDrop: false }], [{}]])('renders standard view for %j', (props) => {
      render(<RdsFileUploader {...defaultProps} {...props}><span>Custom upload area</span></RdsFileUploader>);
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should render children when provided in standard mode', () => {
      render(
        <RdsFileUploader {...defaultProps} mode="standard">
          <div data-testid="custom-child">Custom Content</div>
        </RdsFileUploader>
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes for title', () => {
      const { container } = setup({ mode: 'default', showTitle: true, title: 'Upload Files' });
      const title = container.querySelector('.rds-file-uploader__form-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Upload Files');
    });

    it('has no axe accessibility violations', async () => {
      const { container } = setup();
      expect(await axe(container)).toHaveNoViolations();
    });

    it('should support keyboard navigation', () => {
      const { container } = setup({ mode: 'default' });
      expect(fileInput(container)).toBeInTheDocument();
    });

    it('should support screen reader text for mandatory field', () => {
      setup({ showTitle: true, required: true, mode: 'default' });
      const titleElement = screen.getByText((content, element) => {
        const hasClass = element?.className?.includes('rds-file-uploader__form-title');
        return hasClass ?? false;
      });
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('should render with all props', () => {
      const { container } = render(
        <RdsFileUploader
          title="Upload Documents"
          accept=".pdf,.doc,.docx"
          multiple={true}
          maxSize={5 * 1024 * 1024}
          maxFiles={3}
          disabled={false}
          showPreview={true}
          dragAndDrop={true}
          showTitle={true}
          required
          showHint={true}
          hintText="Upload PDF or DOC files"
          placeholderImage="https://example.com/placeholder.png"
          mode="default"
          variant="Drop Area - With Upload Button"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should render in standard mode with all customizations', () => {
      render(<RdsFileUploader mode="standard" title="Upload Files" showTitle={true} multiple={true} />);
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });
  });

  describe('File Input Behavior', () => {
    it('should have file input with correct type', () => {
      const { container } = setup();
      expect(fileInput(container)).toBeInTheDocument();
      expect(container.querySelector('input')).toHaveAttribute('type', 'file');
    });
  });

  describe('Prop Combinations', () => {
    it('should handle standard mode with all display options', () => {
      render(<RdsFileUploader mode="standard" showTitle={true} showPreview={true} dragAndDrop={true} />);
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should handle default mode with side icon style', () => {
      render(<RdsFileUploader mode="default" variant="Drop Area - Side Icon" showHint={true} required />);
      expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    });

    it('should handle disabled uploader with mandatory field', () => {
      const { container } = setup({ disabled: true, required: true, showTitle: true, mode: 'default', onFilesChange: jest.fn() });
      expect(container).toBeInTheDocument();
    });
  });
});

describe('audit fixes', () => {
  const { useFileUploader: useActualFileUploader } = jest.requireActual('./RdsFileUploaderComponents');
  const ActualStandardView = jest.requireActual('./RdsFileUploaderStandardView').default;
  const mockedWarn = warnDeprecatedProp as jest.Mock;
  const makeFile = (name: string) => new File(['x'], name, { type: 'application/pdf' });
  const fileNames = (files: FileWithProgress[]) => files.map((f) => f.file.name);

  const standardViewProps = (overrides: Record<string, unknown> = {}) => ({
    viewConfig: { showTitle: true, mandatory: false, showHint: false, showPreview: true },
    interactionConfig: { disabled: false, dragAndDrop: true, isDragOver: false, multiple: false },
    mandatoryError: null,
    hintText: '',
    selectedFileName: null,
    handleFileSelect: jest.fn(),
    addFiles: jest.fn(),
    setSelectedFileName: jest.fn(),
    setFiles: jest.fn(),
    title: 'Documents',
    ...overrides,
  });

  beforeEach(() => mockedWarn.mockClear());

  describe('G1-276 root props', () => {
    it('forwards className, sx, ref and rest props to the default-mode root', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = render(
        <RdsFileUploader mode="default" className="custom" sx={{ mt: 2 }} style={{ marginTop: '12px' }} data-testid="root" id="uploader" ref={ref} />
      );
      const root = container.querySelector('.rds-file-uploader') as HTMLElement;
      expect(root).toBe(screen.getByTestId('root'));
      expect(root).toHaveClass('rds-file-uploader', 'rds-file-uploader--mode-default', 'custom');
      expect(root).toHaveAttribute('id', 'uploader');
      expect(root.style.marginTop).toBe('12px');
      expect(ref.current).toBe(root);
    });

    it('keeps the default root classes when nothing is passed', () => {
      const { container } = render(<RdsFileUploader mode="default" />);
      expect(container.querySelector('.rds-file-uploader')?.className).not.toContain('undefined');
    });

    it('forwards root props to the standard-view root', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ActualStandardView {...standardViewProps({ rootProps: { className: 'custom', 'data-testid': 'std-root', ref, sx: [{ mt: 1 }], style: { marginTop: '12px' } } })} />);
      const root = screen.getByTestId('std-root');
      expect(root).toHaveClass('rds-file-uploader__standard', 'custom');
      expect(root).toHaveStyle({ marginTop: '12px' });
      expect(ref.current).toBe(root);
    });
  });

  describe('G1-279/281/282 renames', () => {
    it('renders `label`, `helperText` and `required` without warnings', () => {
      const { container } = render(
        <RdsFileUploader mode="default" showTitle showHint label="Docs" helperText="PDF only" required />
      );
      expect(screen.getByText('Docs')).toBeInTheDocument();
      expect(screen.getByText('PDF only')).toBeInTheDocument();
      expect(container.querySelector('.rds-file-uploader__mandatory-asterisk')).toBeInTheDocument();
      expect(screen.getByLabelText('Docs')).toHaveAttribute('type', 'file');
      expect(mockedWarn).not.toHaveBeenCalled();
    });

    it('warns for the deprecated names and keeps them working', () => {
      const { container } = render(
        <RdsFileUploader mode="default" showTitle showHint title="Old" hintText="Old hint" isMandatory />
      );
      expect(screen.getByText('Old')).toBeInTheDocument();
      expect(screen.getByText('Old hint')).toBeInTheDocument();
      expect(container.querySelector('.rds-file-uploader__mandatory-asterisk')).toBeInTheDocument();
      expect(mockedWarn).toHaveBeenCalledWith('RdsFileUploader', 'title', '`label`');
      expect(mockedWarn).toHaveBeenCalledWith('RdsFileUploader', 'hintText', '`helperText`');
      expect(mockedWarn).toHaveBeenCalledWith('RdsFileUploader', 'isMandatory', '`required`');
    });

    it('warns for display.mandatory and lets `required` win', () => {
      const { container } = render(
        <RdsFileUploader mode="default" display={{ title: 'visible', mandatory: 'required' }} required={false} />
      );
      expect(mockedWarn).toHaveBeenCalledWith('RdsFileUploader', 'display.mandatory', '`required`');
      expect(container.querySelector('.rds-file-uploader__mandatory-asterisk')).not.toBeInTheDocument();
    });

    it('prefers the new names over the deprecated ones', () => {
      render(<RdsFileUploader mode="default" showTitle showHint label="New" title="Old" helperText="New hint" hintText="Old hint" />);
      expect(screen.getByText('New')).toBeInTheDocument();
      expect(screen.queryByText('Old')).not.toBeInTheDocument();
      expect(screen.getByText('New hint')).toBeInTheDocument();
      expect(screen.queryByText('Old hint')).not.toBeInTheDocument();
    });
  });

  describe('G1-288 placeholder image', () => {
    it('hides the decorative placeholder image from assistive technology', () => {
      const { container } = render(<RdsFileUploader mode="default" placeholderImage="https://example.com/p.png" />);
      expect(container.querySelector('img')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('G1-273 multiple', () => {
    const setup = (multiple?: boolean, onFilesChange = jest.fn()) =>
      renderHook(() => useActualFileUploader({ maxSize: 1024 * 1024, maxFiles: 5, isMandatory: false, multiple, onFilesChange }));

    it('replaces the current file when multiple is false', () => {
      const onFilesChange = jest.fn();
      const { result } = setup(false, onFilesChange);
      act(() => result.current.addFiles([makeFile('a.pdf')]));
      act(() => result.current.addFiles([makeFile('b.pdf'), makeFile('c.pdf')]));
      expect(fileNames(result.current.files)).toEqual(['b.pdf']);
      expect(result.current.selectedFileName).toBe('b.pdf');
      expect(fileNames(onFilesChange.mock.lastCall[0])).toEqual(['b.pdf']);
    });

    it('keeps the current file when an empty drop arrives and multiple is false', () => {
      const { result } = setup(false);
      act(() => result.current.addFiles([makeFile('a.pdf')]));
      act(() => result.current.addFiles([]));
      expect(fileNames(result.current.files)).toEqual(['a.pdf']);
    });

    it('appends files when multiple is true', () => {
      const { result } = setup(true);
      act(() => result.current.addFiles([makeFile('a.pdf')]));
      act(() => result.current.addFiles([makeFile('b.pdf')]));
      expect(fileNames(result.current.files)).toEqual(['a.pdf', 'b.pdf']);
    });
  });

  describe('G1-283 rapid drops', () => {
    it('keeps every file when several drops are handled before a re-render', () => {
      const onFilesChange = jest.fn();
      const { result } = renderHook(() =>
        useActualFileUploader({ maxSize: 1024 * 1024, maxFiles: 5, isMandatory: false, multiple: true, onFilesChange })
      );
      act(() => {
        result.current.addFiles([makeFile('a.pdf')]);
        result.current.addFiles([makeFile('b.pdf')]);
      });
      expect(fileNames(result.current.files)).toEqual(['a.pdf', 'b.pdf']);
      expect(fileNames(onFilesChange.mock.lastCall[0])).toEqual(['a.pdf', 'b.pdf']);
    });

    it('builds on the cleared list after setFiles([])', () => {
      const { result } = renderHook(() =>
        useActualFileUploader({ maxSize: 1024 * 1024, maxFiles: 5, isMandatory: false, multiple: true })
      );
      act(() => {
        result.current.addFiles([makeFile('a.pdf')]);
        result.current.setFiles([]);
        result.current.addFiles([makeFile('b.pdf')]);
      });
      expect(fileNames(result.current.files)).toEqual(['b.pdf']);
    });
  });

  describe('G1-285 input reset', () => {
    it('clears the input that fired so the same file can be chosen again', () => {
      const { result } = renderHook(() =>
        useActualFileUploader({ maxSize: 1024 * 1024, maxFiles: 5, isMandatory: false })
      );
      const target = { files: [makeFile('a.pdf')], value: 'C:\\fakepath\\a.pdf' };
      act(() => result.current.handleFileSelect({ target } as unknown as React.ChangeEvent<HTMLInputElement>));
      expect(target.value).toBe('');
      expect(fileNames(result.current.files)).toEqual(['a.pdf']);
    });
  });

  describe('G1-274 oversize files', () => {
    const { RdsFileList: ActualFileList } = jest.requireActual('./RdsFileUploaderComponents');

    it('flags an oversize file with an error', () => {
      const { result } = renderHook(() => useActualFileUploader({ maxSize: 0, maxFiles: 5, isMandatory: false }));
      act(() => result.current.addFiles([makeFile('big.pdf')]));
      expect(result.current.files[0].error).toBe('File size exceeds 0 Bytes');
    });

    it('shows the error under the file name in the file list', () => {
      const files = [
        { file: makeFile('big.pdf'), progress: 0, error: 'File size exceeds 0 Bytes' },
        { file: makeFile('ok.pdf'), progress: 0 },
      ];
      render(<ActualFileList files={files} isUploading={false} removeFile={jest.fn()} formatFileSize={() => '1 KB'} />);
      expect(screen.getByRole('alert')).toHaveTextContent('File size exceeds 0 Bytes');
      expect(screen.getAllByRole('alert')).toHaveLength(1);
    });
  });

  describe('G1-275 accept label', () => {
    const { RdsDropZoneDefault: ActualDropZone, RdsDropZoneSideIcon: ActualSideIcon } = jest.requireActual('./RdsFileUploaderComponents');
    const dropProps = { mode: 'default', isDragOver: false, disabled: false, onDragOver: jest.fn(), onDragLeave: jest.fn(), onDrop: jest.fn(), openFileDialog: jest.fn() };

    it.each([
      ['.png,.jpg', '(PNG, JPG)'],
      ['image/*', '(IMAGE)'],
      ['application/pdf, .pdf', '(PDF)'],
      [undefined, '(All files)'],
    ])('derives the label for accept=%s', (accept, label) => {
      render(<ActualDropZone {...dropProps} accept={accept} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.queryByText(/DOC, PDF, PPT/)).not.toBeInTheDocument();
    });

    it('derives the label in the side-icon drop zone', () => {
      render(<ActualSideIcon {...dropProps} accept=".docx" />);
      expect(screen.getByText('(DOCX)')).toBeInTheDocument();
    });

    it('passes accept to the drop zones', () => {
      render(<RdsFileUploader mode="default" accept=".pdf" />);
      expect(screen.getByTestId('drop-zone-default')).toHaveAttribute('data-accept', '.pdf');
    });
  });

  describe('standard view', () => {
    it('G1-271 passes `accept` to the file input', () => {
      const { container } = render(<ActualStandardView {...standardViewProps({ accept: '.pdf' })} />);
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('accept', '.pdf');
    });

    it('G1-286 shows the chosen file name even when the preview is hidden', () => {
      const hiddenPreview = { showTitle: false, mandatory: false, showHint: false, showPreview: false };
      const { rerender } = render(<ActualStandardView {...standardViewProps({ viewConfig: hiddenPreview })} />);
      expect(screen.getByText('No file chosen')).toBeInTheDocument();
      rerender(<ActualStandardView {...standardViewProps({ viewConfig: hiddenPreview, selectedFileName: 'a.pdf' })} />);
      expect(screen.getByText('a.pdf')).toBeInTheDocument();
      expect(screen.queryByText('No file chosen')).not.toBeInTheDocument();
    });

    it('G1-270 names the remove button after the file', () => {
      render(<ActualStandardView {...standardViewProps({ selectedFileName: 'a.pdf' })} />);
      expect(screen.getByRole('button', { name: 'Remove a.pdf' })).toBeInTheDocument();
    });

    it('G1-270 renders a Close icon in the remove button by default and lets children override it', () => {
      const { rerender } = render(<ActualStandardView {...standardViewProps({ selectedFileName: 'a.pdf' })} />);
      expect(screen.getByRole('button', { name: 'Remove a.pdf' }).querySelector('svg[data-testid="CloseIcon"]')).toBeInTheDocument();
      rerender(<ActualStandardView {...standardViewProps({ selectedFileName: 'a.pdf', children: <span data-testid="custom-remove" /> })} />);
      expect(screen.getByTestId('custom-remove')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove a.pdf' }).querySelector('svg[data-testid="CloseIcon"]')).not.toBeInTheDocument();
    });

    it('describes the Choose File control with the visible label', () => {
      render(<ActualStandardView {...standardViewProps()} />);
      const title = screen.getByText('Documents');
      expect(screen.getByRole('button', { name: /choose file/i })).toHaveAttribute('aria-describedby', title.id);
    });

    it('works end to end with the hook: a single-file selection replaces the previous one', () => {
      const Harness = () => {
        const hook = useActualFileUploader({ maxSize: 1024 * 1024, maxFiles: 5, isMandatory: false, multiple: false });
        return (
          <ActualStandardView
            {...standardViewProps({
              accept: '.pdf',
              selectedFileName: hook.selectedFileName,
              handleFileSelect: hook.handleFileSelect,
              addFiles: hook.addFiles,
              setSelectedFileName: hook.setSelectedFileName,
              setFiles: hook.setFiles,
            })}
          />
        );
      };
      const { container } = render(<Harness />);
      const input = container.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, { target: { files: [makeFile('a.pdf')] } });
      fireEvent.change(input, { target: { files: [makeFile('b.pdf')] } });
      expect(screen.getByText('b.pdf')).toBeInTheDocument();
      expect(screen.queryByText('a.pdf')).not.toBeInTheDocument();
    });
  });
});

describe('RdsFileUploader additive renames', () => {
  beforeEach(() => (warnDeprecatedProp as jest.Mock).mockClear());

  it('uses variant over style and slotProps.placeholder', () => {
    const { container } = render(
      <RdsFileUploader mode="default" variant="Drop Area - Side Icon" slotProps={{ placeholder: { src: 'p.png' } }} />
    );
    expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('src', 'p.png');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
  });

  it('still accepts a variant string through the deprecated style prop', () => {
    render(<RdsFileUploader mode="default" style="Drop Area - Side Icon" />);
    expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsFileUploader', 'style', expect.any(String));
  });

  it('calls onChange with the event and files, and warns for onFilesChange', () => {
    const onChange = jest.fn();
    const onFilesChange = jest.fn();
    render(<RdsFileUploader mode="standard" onChange={onChange} onFilesChange={onFilesChange} />);
    const event = { type: 'click' };
    act(() => mockStandardViewProps.onFilesChange([], event));
    expect(onChange).toHaveBeenCalledWith(event, []);
    expect(onFilesChange).toHaveBeenCalledWith([]);
    expect(warnDeprecatedProp).toHaveBeenCalledWith('RdsFileUploader', 'onFilesChange', '`onChange`');
  });

  it('forwards data-testid to the root .rds-file-uploader', () => {
    render(<RdsFileUploader mode="default" data-testid="avatar-upload" />);
    expect(screen.getByTestId('avatar-upload')).toHaveClass('rds-file-uploader');
  });

  it('passes data-testid through rootProps in standard mode', () => {
    render(<RdsFileUploader mode="standard" data-testid="avatar-upload" />);
    expect(mockStandardViewProps.rootProps['data-testid']).toBe('avatar-upload');
  });
});
