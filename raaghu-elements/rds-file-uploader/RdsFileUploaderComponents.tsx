import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { CloudUpload, Close, InsertDriveFileOutlined } from '@mui/icons-material';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';

interface RdsDropZoneSideIconProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  dragAndDrop?: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneWithButtonProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  dragAndDrop?: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneDefaultProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  dragAndDrop?: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsFileListProps {
  files: FileWithProgress[];
  isUploading: boolean;
  removeFile: (index: number) => void;
  formatFileSize: (bytes: number) => string;
}

interface UseFileUploaderProps {
  maxSize: number;
  maxFiles: number;
  isMandatory: boolean;
  multiple?: boolean;
  onFilesChange?: (files: FileWithProgress[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

export const useFileUploader = ({
  maxSize,
  maxFiles,
  isMandatory,
  multiple = true,
  onFilesChange,
  onUpload,
}: UseFileUploaderProps) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [mandatoryError, setMandatoryError] = React.useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  const addFiles = (newFiles: File[]) => {
    const baseFiles = multiple ? files : [];
    const incoming = multiple ? newFiles : newFiles.slice(0, 1);
    const limit = multiple ? maxFiles : Math.min(maxFiles, 1);
    const validFiles: FileWithProgress[] = [];
    for (const file of incoming) {
      if (baseFiles.length + validFiles.length >= limit) break;
      const error = validateFile(file);
      validFiles.push({ file, progress: 0, error: error || undefined });
    }
    const updatedFiles = [...baseFiles, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    setMandatoryError(isMandatory && updatedFiles.length === 0 ? 'File is required.' : null);

    if (updatedFiles.length > 0) {
      const names = updatedFiles.map(fwp => fwp.file.name).join(', ');
      setSelectedFileName(names);
    } else {
      setSelectedFileName(null);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    setMandatoryError(isMandatory && updatedFiles.length === 0 ? 'File is required.' : null);

    if (updatedFiles.length === 0) {
      setSelectedFileName(null);
    } else {
      const names = updatedFiles.map(fwp => fwp.file.name).join(', ');
      setSelectedFileName(names);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = event.target.files;
    const selectedFiles: File[] = Array.isArray(incoming) ? incoming : Array.from(incoming || []);
    if (selectedFiles.length === 0) return;

    const fileNames = selectedFiles.map(file => file.name).join(', ');
    setSelectedFileName(fileNames);

    addFiles(selectedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return {
    files,
    isDragOver,
    isUploading,
    mandatoryError,
    selectedFileName,
    fileInputRef,
    formatFileSize,
    removeFile,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFileDialog,
    setSelectedFileName,
    setFiles,
  };
};

export const RdsDropZoneSideIcon: React.FC<RdsDropZoneSideIconProps> = ({
  mode,
  isDragOver,
  disabled,
  dragAndDrop = true,
  onDragOver,
  onDragLeave,
  onDrop,
  openFileDialog,
}) => {
  const tokens = useRdsTokens();

  return (
    <Paper
      variant={mode === 'standard' ? 'elevation' : 'outlined'}
      className={
        `rds-file-uploader__drop-zone rds-file-uploader__drop-zone--side-icon` +
        (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
        (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
      }
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={!disabled ? openFileDialog : undefined}
    >
      <Box className="rds-file-uploader__side-content">
        <Typography className="rds-file-uploader__title rds-file-uploader__title--left" variant="h6" gutterBottom>
          {dragAndDrop && 'Drag and Drop files or '}<span className="rds-file-uploader__browse-link rds-file-uploader__browse-link--left" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!disabled) openFileDialog(); } }}>Browse</span>{!dragAndDrop && ' files'}
        </Typography>
        <Typography className="rds-file-uploader__info rds-file-uploader__info--left" variant="caption">
          (PNG, JPG, DOC, PDF, PPT)
        </Typography>
      </Box>
      <Box sx={{ ml: tokens.space(2), display: 'flex', alignItems: 'center' }}>
        <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: tokens.cssVar('file-uploader-icon-color') }} />
      </Box>
    </Paper>
  );
};

export const RdsDropZoneWithButton: React.FC<RdsDropZoneWithButtonProps> = ({
  mode,
  isDragOver,
  disabled,
  dragAndDrop = true,
  onDragOver,
  onDragLeave,
  onDrop,
  openFileDialog,
}) => {
  const tokens = useRdsTokens();

  return (
    <Paper
      variant={mode === 'standard' ? 'elevation' : 'outlined'}
      className={
        `rds-file-uploader__drop-zone rds-file-uploader__drop-zone--with-upload-btn` +
        (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
        (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
      }
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        minHeight: 'var(--rds-file-uploader-dropzone-min-height, var(--rds-spacing-60))',
        px: 'var(--rds-file-uploader-dropzone-padding-x, var(--rds-spacing-lg))',
        py: 'var(--rds-file-uploader-dropzone-padding-y, var(--rds-spacing-xl))',
        border: 'var(--rds-file-uploader-dropzone-border-width, 1.5px) dashed var(--rds-color-primary)',
        background: tokens.color.surface,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <Box className="rds-file-uploader__icon-box">
        <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: tokens.cssVar('file-uploader-icon-color') }} />
      </Box>
      {dragAndDrop && (
        <Box className="rds-file-uploader__title-box">
          <Typography className="rds-file-uploader__title rds-file-uploader__title--inline" variant="h6" gutterBottom>
            Drag and Drop files<span className="rds-file-uploader__title-or">or</span>
          </Typography>
        </Box>
      )}
      <RdsButton
        style="filled"
        text="Upload Files"
        className="rds-file-uploader__upload-btn"
        onClick={openFileDialog}
        disabled={disabled}
        sx={{ ml: tokens.space(2), minWidth: 'var(--rds-spacing-2xl, 120px)', fontWeight: 600, fontSize: 'var(--rds-font-size-md, var(--rds-spacing-14))', p: `${tokens.space(0.5)} ${tokens.space(1.75)}` }}
      />
    </Paper>
  );
};

export const RdsDropZoneDefault: React.FC<RdsDropZoneDefaultProps> = ({
  mode,
  isDragOver,
  disabled,
  dragAndDrop = true,
  onDragOver,
  onDragLeave,
  onDrop,
  openFileDialog,
}) => {
  const tokens = useRdsTokens();

  return (
    <Paper
      variant={mode === 'standard' ? 'elevation' : 'outlined'}
      className={
        `rds-file-uploader__drop-zone` +
        (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
        (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
      }
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={!disabled ? openFileDialog : undefined}
      sx={mode === 'standard' ? { boxShadow: 3 } : {}}
    >
      <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: tokens.cssVar('file-uploader-icon-color') }} />
      <Typography className="rds-file-uploader__title" variant="h6" gutterBottom>
        {dragAndDrop && 'Drag and Drop files or '}<span className="rds-file-uploader__browse-link" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!disabled) openFileDialog(); } }}>Browse</span>{!dragAndDrop && ' files'}
      </Typography>
      <Typography className="rds-file-uploader__info" variant="caption" color="text.secondary">
        (PNG, JPG, DOC, PDF, PPT)
      </Typography>
    </Paper>
  );
};

export const RenderFileUploader = (args: React.ComponentProps<typeof RdsFileUploader>) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);  
  return <RdsFileUploader {...args} onFilesChange={setFiles} />;
};

export const RdsFileList: React.FC<RdsFileListProps> = ({
  files,
  isUploading,
  removeFile,
  formatFileSize,
}) => (
  <Box className="rds-file-uploader__file-list">
    <Typography className="rds-file-uploader__file-list-title" variant="subtitle2">
      Selected Files ({files.length})
    </Typography>
    {files.map((fileWithProgress, index) => (
      <Box
        key={`file-${fileWithProgress.file.name}-${fileWithProgress.file.size}`}
        className={`rds-file-uploader__file-item${fileWithProgress.error ? ' rds-file-uploader__file-item--error' : ''}`}
      >
        <InsertDriveFileOutlined className="rds-file-uploader__file-icon" />
        <Box className="rds-file-uploader__file-details">
          <Typography className="rds-file-uploader__file-name" title={fileWithProgress.file.name}>
            {fileWithProgress.file.name}
          </Typography>
          <Typography className="rds-file-uploader__file-size" variant="caption">
            {formatFileSize(fileWithProgress.file.size)}
          </Typography>
          {fileWithProgress.error && (
            <Typography className="rds-file-uploader__file-error-msg" variant="caption">
              {fileWithProgress.error}
            </Typography>
          )}
        </Box>
        <IconButton
          aria-label="Remove file"
          className="rds-file-uploader__file-remove"
          size="small"
          onClick={() => removeFile(index)}
          disabled={isUploading}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
    ))}
  </Box>
);

RdsDropZoneSideIcon.displayName = 'RdsDropZoneSideIcon';
RdsDropZoneWithButton.displayName = 'RdsDropZoneWithButton';
RdsDropZoneDefault.displayName = 'RdsDropZoneDefault';
RdsFileList.displayName = 'RdsFileList';
