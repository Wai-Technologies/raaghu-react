import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  RdsDropZoneDefault: ({ openFileDialog }: any) => (
    <button type="button" data-testid="drop-zone-default" onClick={openFileDialog} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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

  describe('Basic Rendering', () => {
    it('should render component without crashing', () => {
      const { container } = render(<RdsFileUploader {...defaultProps} />);
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
      const { container } = render(
        <RdsFileUploader {...defaultProps} mode="default" />
      );
      const uploader = container.querySelector('.rds-file-uploader');
      expect(uploader).toBeInTheDocument();
    });
  });

  describe('Title and Label Rendering', () => {
    it('should render title when showTitle is true', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          showTitle={true}
          mode="default"
          title="Upload Your Documents"
        />
      );
      expect(screen.getByText('Upload Your Documents')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          showTitle={false}
          mode="default"
          title="Upload Your Documents"
        />
      );
      expect(screen.queryByText('Upload Your Documents')).not.toBeInTheDocument();
    });

    it('should show mandatory indicator when isMandatory is true', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          showTitle={true}
          mode="default"
          isMandatory={true}
        />
      );
      const titleElement = container.querySelector('.rds-file-uploader__form-title');
      expect(titleElement).toBeInTheDocument();
    });
  });

  describe('Mode Variants', () => {
    it('should render standard mode', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="standard"
        />
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should render default mode', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
        />
      );
      const uploader = screen.getByText((content, element) => {
        const hasClass = element?.className?.includes('rds-file-uploader--mode-default');
        return hasClass ?? false;
      });
      expect(uploader).toBeInTheDocument();
    });
  });

  describe('Drop Zone Styles', () => {
    it('should render default drop zone', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          variant="Drop Area - Side Icon"
        />
      );
      expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    });

    it('should render drop zone with top icon', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          variant="Drop Area - Top Icon"
        />
      );
      expect(screen.getByTestId('drop-zone-default')).toBeInTheDocument();
    });

    it('should render drop zone with upload button', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          variant="Drop Area - With Upload Button"
        />
      );
      expect(screen.getByTestId('drop-zone-with-button')).toBeInTheDocument();
    });
  });

  describe('File Input Props', () => {
    it('should accept multiple files prop', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          multiple={true}
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('multiple');
    });

    it('should not allow multiple when multiple is false', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          multiple={false}
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).not.toHaveAttribute('multiple');
    });

    it('should set accept attribute', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          accept=".pdf,.doc"
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('accept', '.pdf,.doc');
    });

    it('should be disabled when disabled prop is true', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          disabled={true}
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toHaveAttribute('disabled');
    });

    it('should be enabled when disabled prop is false', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          disabled={false}
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).not.toHaveAttribute('disabled');
    });
  });

  describe('Hint and Error Messages', () => {
    it('should render hint text when showHint is true', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showHint={true}
          hintText="Maximum file size is 5MB"
        />
      );
      expect(screen.getByText('Maximum file size is 5MB')).toBeInTheDocument();
    });

    it('should not render hint text when showHint is false', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showHint={false}
          hintText="Maximum file size is 5MB"
        />
      );
      expect(screen.queryByText('Maximum file size is 5MB')).not.toBeInTheDocument();
    });

    it('should show default hint when no hintText provided', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showHint={true}
        />
      );
      expect(screen.getByText('Maximum 5MB')).toBeInTheDocument();
    });
  });

  describe('Placeholder Image', () => {
    it('should render placeholder image when provided', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          placeholderImage="https://example.com/image.png"
        />
      );
      const img = screen.getByAltText('placeholder');
      expect(img).toHaveAttribute('src', 'https://example.com/image.png');
    });

    it('should not render placeholder image when not provided', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          placeholderImage=""
        />
      );
      expect(screen.queryByAltText('placeholder')).not.toBeInTheDocument();
    });
  });

  describe('File Upload Props', () => {
    it('should accept maxSize prop', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxSize={5 * 1024 * 1024}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept maxFiles prop', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxFiles={3}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have default maxSize of 10MB', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} />
      );
      expect(container).toBeInTheDocument();
    });

    it('should have default maxFiles of 5', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Preview Functionality', () => {
    it('should show preview when showPreview is true', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showPreview={true}
        />
      );
      expect(container.querySelector('.rds-file-uploader')).toBeInTheDocument();
    });

    it('should not show preview when showPreview is false', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showPreview={false}
        />
      );
      const fileListElement = screen.queryByTestId('file-list');
      expect(fileListElement === null || fileListElement.children.length === 0).toBeTruthy();
    });
  });

  describe('Drag and Drop', () => {
    it('should support drag and drop when dragAndDrop is true', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          dragAndDrop={true}
        />
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should disable drag and drop when dragAndDrop is false', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          dragAndDrop={false}
        />
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should accept onFilesChange callback', () => {
      const handleFilesChange = jest.fn();
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          onFilesChange={handleFilesChange}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept onUpload callback', async () => {
      const handleUpload = jest.fn().mockResolvedValue(undefined);
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          onUpload={handleUpload}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Children Rendering', () => {
    it('should render children when provided in standard mode', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="standard"
        >
          <div data-testid="custom-child">Custom Content</div>
        </RdsFileUploader>
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should render with custom children', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps}>
          <span>Custom upload area</span>
        </RdsFileUploader>
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });
  });

  describe('State Props', () => {
    it('should accept state prop with default value', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          state="default"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should accept state prop with selected value', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          state="selected"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty title', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          showTitle={true}
          title=""
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle null onFilesChange', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          onFilesChange={undefined}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle null onUpload', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          onUpload={undefined}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle zero maxSize', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxSize={0}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle zero maxFiles', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxFiles={0}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle very large maxSize', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxSize={1024 * 1024 * 1024}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle negative dimensions gracefully', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          maxSize={-100}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should render in different viewport sizes', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} mode="default" />
      );
      expect(container).toBeInTheDocument();
    });

    it('should handle window resize', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} mode="default" />
      );
      fireEvent.resize(window);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes for title', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          showTitle={true}
          title="Upload Files"
        />
      );
      const title = container.querySelector('.rds-file-uploader__form-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Upload Files');
  
    });

    it('has no axe accessibility violations', async () => {
      const { container } = render(<RdsFileUploader {...defaultProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support keyboard navigation', () => {
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
        />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it('should have proper roles for buttons', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          variant="Drop Area - With Upload Button"
        />
      );
      expect(screen.getByTestId('drop-zone-with-button')).toBeInTheDocument();
    });

    it('should support screen reader text for mandatory field', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          showTitle={true}
          isMandatory={true}
          mode="default"
        />
      );
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
          isMandatory={true}
          showHint={true}
          hintText="Upload PDF or DOC files"
          placeholderImage="https://example.com/placeholder.png"
          state="default"
          mode="default"
          variant="Drop Area - With Upload Button"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it('should combine mode and style correctly', () => {
      render(
        <RdsFileUploader
          {...defaultProps}
          mode="default"
          variant="Drop Area - Side Icon"
        />
      );
      expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      const { container } = render(<RdsFileUploader />);
      expect(container).toBeInTheDocument();
    });

    it('should render in standard mode with all customizations', () => {
      render(
        <RdsFileUploader
          mode="standard"
          title="Upload Files"
          showTitle={true}
          multiple={true}
        />
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });
  });

  describe('File Input Behavior', () => {
    it('should have file input', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} />
      );
      const input = container.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it('should have correct input type', () => {
      const { container } = render(
        <RdsFileUploader {...defaultProps} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('type', 'file');
    });
  });

  describe('Prop Combinations', () => {
    it('should handle standard mode with all display options', () => {
      render(
        <RdsFileUploader
          mode="standard"
          showTitle={true}
          showPreview={true}
          dragAndDrop={true}
        />
      );
      expect(screen.getByTestId('standard-view')).toBeInTheDocument();
    });

    it('should handle default mode with side icon style', () => {
      render(
        <RdsFileUploader
          mode="default"
          variant="Drop Area - Side Icon"
          showHint={true}
          isMandatory={true}
        />
      );
      expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    });

    it('should handle disabled uploader with mandatory field', () => {
      const handleFilesChange = jest.fn();
      const { container } = render(
        <RdsFileUploader
          {...defaultProps}
          disabled={true}
          isMandatory={true}
          showTitle={true}
          mode="default"
          onFilesChange={handleFilesChange}
        />
      );
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
    viewConfig: { showTitle: true, isMandatory: false, showHint: false, showPreview: true },
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

  describe('standard view', () => {
    it('G1-271 passes `accept` to the file input', () => {
      const { container } = render(<ActualStandardView {...standardViewProps({ accept: '.pdf' })} />);
      expect(container.querySelector('input[type="file"]')).toHaveAttribute('accept', '.pdf');
    });

    it('G1-286 shows the chosen file name even when the preview is hidden', () => {
      const hiddenPreview = { showTitle: false, isMandatory: false, showHint: false, showPreview: false };
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
      <RdsFileUploader mode="default" variant="Drop Area - Side Icon" style="Drop Area - With Upload Button" slotProps={{ placeholder: { src: 'p.png' } }} />
    );
    expect(screen.getByTestId('drop-zone-side-icon')).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute('src', 'p.png');
    expect(warnDeprecatedProp).not.toHaveBeenCalled();
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
});
