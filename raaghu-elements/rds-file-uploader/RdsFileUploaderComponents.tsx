import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { CloudUpload, Close } from '@mui/icons-material';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';

interface RdsDropZoneSideIconProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneWithButtonProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneDefaultProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
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
  onFilesChange?: (files: FileWithProgress[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

export const useFileUploader = ({
  maxSize,
  maxFiles,
  isMandatory,
  onFilesChange,
  onUpload,
}: UseFileUploaderProps) => {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mandatoryError, setMandatoryError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles: FileWithProgress[] = [];
    for (const file of newFiles) {
      if (files.length + validFiles.length >= maxFiles) break;
      const error = validateFile(file);
      validFiles.push({ file, progress: 0, error: error || undefined });
    }
    const updatedFiles = [...files, ...validFiles];
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

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const incoming = event.target.files as any;
    const selectedFiles: File[] = Array.isArray(incoming) ? incoming : Array.from(incoming || []);
    if (selectedFiles.length === 0) return;

    const fileNames = selectedFiles.map(file => file.name).join(', ');
    setSelectedFileName(fileNames);

    addFiles(selectedFiles);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent) => {
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

export const RdsDropZoneSideIcon = ({
  mode,
  isDragOver,
  disabled,
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
          Drag and Drop files or <span className="rds-file-uploader__browse-link rds-file-uploader__browse-link--left" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!disabled) openFileDialog(); } }}>Browse</span>
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

export const RdsDropZoneWithButton = ({
  mode,
  isDragOver,
  disabled,
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
        minHeight: 'var(--rds-file-uploader-dropzone-min-height, 60px)',
        px: 'var(--rds-file-uploader-dropzone-padding-x, 24px)',
        py: 'var(--rds-file-uploader-dropzone-padding-y, 32px)',
        border: 'var(--rds-file-uploader-dropzone-border-width, 1.5px) dashed var(--rds-color-primary)',
        background: tokens.color.surface,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <Box className="rds-file-uploader__icon-box">
        <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: tokens.cssVar('file-uploader-icon-color') }} />
      </Box>
      <Box className="rds-file-uploader__title-box">
        <Typography className="rds-file-uploader__title rds-file-uploader__title--inline" variant="h6" gutterBottom>
          Drag and Drop files<span className="rds-file-uploader__title-or">or</span>
        </Typography>
      </Box>
      <RdsButton
        style="filled"
        text="Upload Files"
        className="rds-file-uploader__upload-btn"
        onClick={openFileDialog}
        disabled={disabled}
        sx={{ ml: tokens.space(2), minWidth: 'var(--rds-spacing-2xl, 120px)', fontWeight: 600, fontSize: 'var(--rds-font-size-md, 14px)', p: `${tokens.space(0.5)} ${tokens.space(1.75)}` }}
      />
    </Paper>
  );
};

export const RdsDropZoneDefault: React.FC<RdsDropZoneDefaultProps> = ({
  mode,
  isDragOver,
  disabled,
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
        Drag and Drop files or <span className="rds-file-uploader__browse-link" role="button" tabIndex={0} onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (!disabled) openFileDialog(); } }}>Browse</span>
      </Typography>
      <Typography className="rds-file-uploader__info" variant="caption" color="text.secondary">
        (PNG, JPG, DOC, PDF, PPT)
      </Typography>
    </Paper>
  );
};

export const RenderFileUploader = (args: any) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);  
  return <RdsFileUploader {...args} onFilesChange={setFiles} />;
};

export const RdsFileList: React.FC<RdsFileListProps> = ({
  files,
  isUploading,
  removeFile,
  formatFileSize,
}) => {
  const tokens = useRdsTokens();

  return (
    <Box className="rds-file-uploader__file-list">
      <Typography className="rds-file-uploader__file-list-title" variant="subtitle2" gutterBottom>
        Selected Files ({files.length})
      </Typography>
      {files.map((fileWithProgress, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: { xs: '100%', sm: '100%', md: 'var(--rds-spacing-3xl, 500px)' },
            minWidth: { xs: 0, sm: 0, md: 'var(--rds-spacing-2xl, 400px)' },
            maxWidth: { xs: '98vw', sm: '98vw', md: 'var(--rds-spacing-3xl, 500px)' },
            height: 'var(--rds-spacing-xl, 36px)',
            background: tokens.color.surface,
            borderRadius: tokens.radius.sm,
            border: `1px solid ${tokens.color.textMuted}`,
            px: tokens.space(0.5),
            py: 0,
            mb: tokens.space(0.5),
            fontSize: { xs: 'var(--rds-font-size-sm, 13px)', sm: 'var(--rds-font-size-md, 14px)', md: 'var(--rds-font-size-md, 15px)' },
          }}
        >
          <Typography
            sx={{
              color: tokens.color.text,
              fontWeight: 500,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            title={fileWithProgress.file.name}
          >
            {fileWithProgress.file.name}
          </Typography>
          <Typography
            sx={{
              color: tokens.color.textMuted,
              fontWeight: 400,
              fontSize: 'var(--rds-font-size-md, 14px)',
              ml: tokens.space(2),
              minWidth: 'var(--rds-spacing-xl, 70px)',
              textAlign: 'right',
            }}
          >
            {formatFileSize(fileWithProgress.file.size)}
          </Typography>
          <IconButton
            aria-label="Remove file"
            className="rds-file-uploader__file-remove"
            size="small"
            onClick={() => removeFile(index)}
            disabled={isUploading}
            sx={{ ml: tokens.space(0.5), color: tokens.color.textMuted, background: 'transparent', borderRadius: tokens.radius.full, '&:hover': { background: tokens.color.divider }, p: tokens.space(0.5) }}
          >
            <Close fontSize="small" sx={{ color: tokens.color.textMuted }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

RdsDropZoneSideIcon.displayName = 'RdsDropZoneSideIcon';
RdsDropZoneWithButton.displayName = 'RdsDropZoneWithButton';
RdsDropZoneDefault.displayName = 'RdsDropZoneDefault';
RdsFileList.displayName = 'RdsFileList';
