import React from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  IconButton,
  Chip,
  Paper,
} from '@mui/material';
import { CloudUpload, Delete, InsertDriveFile } from '@mui/icons-material';
import './rds-file-uploader.scss';

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
}

export interface RdsFileUploaderProps {
  onFilesChange?: (files: FileWithProgress[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  dragAndDrop?: boolean;
}

const RdsFileUploader: React.FC<RdsFileUploaderProps> = ({
  onFilesChange,
  onUpload,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  showPreview = true,
  dragAndDrop = true,
}) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
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
      if (files.length + validFiles.length >= maxFiles) {
        break;
      }
      
      const error = validateFile(file);
      validFiles.push({
        file,
        progress: 0,
        error: error || undefined,
      });
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    addFiles(selectedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled && dragAndDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (!disabled && dragAndDrop) {
      const droppedFiles = Array.from(event.dataTransfer.files);
      addFiles(droppedFiles);
    }
  };

  const handleUpload = async () => {
    if (!onUpload || isUploading) return;

    const validFiles = files.filter(f => !f.error);
    if (validFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(f => ({ ...f, progress: i })));
      }
      
      await onUpload(validFiles.map(f => f.file));
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

 return (
  <Box className="rds-file-uploader">
    {/* Hidden file input */}
    <input
      ref={fileInputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleFileSelect}
      style={{ display: 'none' }}
      disabled={disabled}
    />

    {/* Drop zone */}
    <Paper
      variant="outlined"
      className={
        `rds-file-uploader__drop-zone` +
        (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
        (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={!disabled ? openFileDialog : undefined}
    >
      <CloudUpload className="rds-file-uploader__icon" />
      <Typography className="rds-file-uploader__title" variant="h6" gutterBottom>
        Drag and Drop files or <span className="rds-file-uploader__browse-link" onClick={openFileDialog}>Browse</span>
      </Typography>
      <Typography className="rds-file-uploader__info" variant="caption" color="text.secondary">
        (PNG, JPG, DOC, PDF, PPT)
      </Typography>
    </Paper>

    {/* File list */}
    {showPreview && files.length > 0 && (
      <Box className="rds-file-uploader__file-list">
        <Typography className="rds-file-uploader__file-list-title" variant="subtitle2" gutterBottom>
          Selected Files ({files.length})
        </Typography>
        {files.map((fileWithProgress, index) => (
          <Paper
            key={index}
            variant="outlined"
            className="rds-file-uploader__file-item"
          >
            <InsertDriveFile className="rds-file-uploader__file-icon" color="primary" />
            <Box className="rds-file-uploader__file-details">
              <Box className="rds-file-uploader__file-meta">
                <Typography className="rds-file-uploader__file-name" variant="body2" noWrap>
                  {fileWithProgress.file.name}
                </Typography>
                <Chip
                  className="rds-file-uploader__file-size"
                  label={formatFileSize(fileWithProgress.file.size)}
                  size="small"
                  variant="outlined"
                />
                {fileWithProgress.error && (
                  <Chip
                    className="rds-file-uploader__file-error"
                    label="Error"
                    size="small"
                    color="error"
                    variant="filled"
                  />
                )}
              </Box>
              {fileWithProgress.error ? (
                <Typography className="rds-file-uploader__file-error-msg" variant="caption" color="error">
                  {fileWithProgress.error}
                </Typography>
              ) : (
                <LinearProgress
                  className="rds-file-uploader__file-progress"
                  variant="determinate"
                  value={fileWithProgress.progress}
                />
              )}
            </Box>
            <IconButton
              className="rds-file-uploader__file-remove"
              size="small"
              onClick={() => removeFile(index)}
              disabled={isUploading}
            >
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Box>
    )}
  </Box>
);
};

export default RdsFileUploader;
