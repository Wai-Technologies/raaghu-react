import React from 'react';
import { Box, Paper, Typography, Button, IconButton } from '@mui/material';
import { CloudUpload, Close } from '@mui/icons-material';
import RdsFileUploader, { FileWithProgress } from './rds-file-uploader';

// ============= INTERFACES =============
interface RdsDropZoneSideIconProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneWithButtonProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  openFileDialog: () => void;
}

interface RdsDropZoneDefaultProps {
  mode: string;
  isDragOver: boolean;
  disabled: boolean;
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
  onFilesChange?: (files: FileWithProgress[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
}

// ============= CUSTOM HOOK =============
export const useFileUploader = ({
  maxSize,
  maxFiles,
  isMandatory,
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = event.target.files as any;
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles || selectedFiles.length === 0) return;
    const fileNames = selectedFiles.map(file => file.name).join(', ');
    setSelectedFileName(fileNames);

    addFiles(selectedFiles);

    if (fileInputRef.current) fileInputRef.current.value = '';
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
    handleFileChange,
    openFileDialog,
    setSelectedFileName,
    setFiles,
  };
};

// ============= COMPONENTS =============

export const RdsDropZoneSideIcon: React.FC<RdsDropZoneSideIconProps> = ({
  mode,
  isDragOver,
  disabled,
  onDragOver,
  onDragLeave,
  onDrop,
  openFileDialog,
}) => {
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
          Drag and Drop files or <span className="rds-file-uploader__browse-link rds-file-uploader__browse-link--left" onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }}>Browse</span>
        </Typography>
        <Typography className="rds-file-uploader__info rds-file-uploader__info--left" variant="caption">
          (PNG, JPG, DOC, PDF, PPT)
        </Typography>
      </Box>
      <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
        <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: 'var(--rds-neutral-main, #7D7D7D)' }} />
      </Box>
    </Paper>
  );
};

export const RdsDropZoneWithButton: React.FC<RdsDropZoneWithButtonProps> = ({
  mode,
  isDragOver,
  disabled,
  onDragOver,
  onDragLeave,
  onDrop,
  openFileDialog,
}) => {
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
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 60, px: 3, py: 2, border: '1.5px dashed #2196F3', background: '#fff', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <Box className="rds-file-uploader__icon-box">
        <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: '#7D7D7D' }} />
      </Box>
      <Box className="rds-file-uploader__title-box">
        <Typography className="rds-file-uploader__title rds-file-uploader__title--inline" variant="h6" gutterBottom>
          Drag and Drop files <span className="rds-file-uploader__title-or">or</span>
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={openFileDialog}
        disabled={disabled}
        sx={{ ml: 'var(--rds-spacing-md, 16px)', minWidth: 'var(--rds-spacing-2xl, 120px)', fontWeight: 600, fontSize: 'var(--rds-font-size-md, 14px)', p: 'var(--rds-spacing-xs, 4px) var(--rds-spacing-lg, 14px)', textTransform: 'uppercase', background: 'var(--rds-color-primary-hover, #3390e6)' }}
      >
        Upload Files
      </Button>
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
      <CloudUpload className="rds-file-uploader__icon" fontSize="large" sx={{ color: 'var(--rds-neutral-main, #7D7D7D)' }} />
      <Typography className="rds-file-uploader__title" variant="h6" gutterBottom>
        Drag and Drop files or <span className="rds-file-uploader__browse-link" onClick={(e) => { e.stopPropagation(); if (!disabled) openFileDialog(); }}>Browse</span>
      </Typography>
      <Typography className="rds-file-uploader__info" variant="caption" color="text.secondary">
        (PNG, JPG, DOC, PDF, PPT)
      </Typography>
    </Paper>
  );
};

export const renderFileUploader = (args: any) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);  
  return <RdsFileUploader {...args} onFilesChange={setFiles} />;
};

export const RdsFileList: React.FC<RdsFileListProps> = ({
  files,
  isUploading,
  removeFile,
  formatFileSize,
}) => {
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
            background: 'var(--rds-background-surface, #E1E3EA)',
            borderRadius: 'var(--rds-border-radius-sm, 4px)',
            border: '1px solid var(--rds-neutral-main, #7D7D7D)',
            px: 'var(--rds-spacing-xs, 4px)',
            py: 0,
            mb: 'var(--rds-spacing-xs, 4px)',
            fontSize: { xs: 'var(--rds-font-size-sm, 13px)', sm: 'var(--rds-font-size-md, 14px)', md: 'var(--rds-font-size-md, 15px)' },
          }}
        >
          <Typography
            sx={{
              color: 'var(--rds-neutral-900, #353535)',
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
              color: 'var(--rds-neutral-700, #646464)',
              fontWeight: 400,
              fontSize: 'var(--rds-font-size-md, 14px)',
              ml: 'var(--rds-spacing-md, 16px)',
              minWidth: 'var(--rds-spacing-xl, 70px)',
              textAlign: 'right',
            }}
          >
            {formatFileSize(fileWithProgress.file.size)}
          </Typography>
          <IconButton
            className="rds-file-uploader__file-remove"
            size="small"
            onClick={() => removeFile(index)}
            disabled={isUploading}
            sx={{ ml: 'var(--rds-spacing-xs, 4px)', color: 'var(--rds-neutral-main, #7D7D7D)', background: 'transparent', borderRadius: '50%', '&:hover': { background: 'var(--rds-neutral-300, #D1D3DA)' }, p: 'var(--rds-spacing-xxs, 4px)' }}
            aria-label="Remove file"
          >
            <Close fontSize="small" sx={{ color: 'var(--rds-neutral-main, #7D7D7D)' }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};