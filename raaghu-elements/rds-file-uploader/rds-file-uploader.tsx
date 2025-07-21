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
    <Box sx={{ width: '100%' }}>
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
        sx={{
          p: 3,
          textAlign: 'center',
          border: isDragOver ? 2 : 1,
          borderColor: isDragOver ? 'primary.main' : 'grey.300',
          borderStyle: 'dashed',
          backgroundColor: isDragOver ? 'primary.50' : 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: disabled ? 'grey.300' : 'primary.main',
            backgroundColor: disabled ? 'transparent' : 'primary.50',
          },
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!disabled ? openFileDialog : undefined}
      >
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {dragAndDrop ? 'Drag & drop files here' : 'Select files to upload'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {dragAndDrop && 'or '}
          <Button
            variant="contained"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              openFileDialog();
            }}
          >
            Browse Files
          </Button>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Max file size: {formatFileSize(maxSize)} | Max files: {maxFiles}
          {accept && ` | Accepted: ${accept}`}
        </Typography>
      </Paper>

      {/* File list */}
      {showPreview && files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Selected Files ({files.length})
          </Typography>
          {files.map((fileWithProgress, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{ p: 2, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <InsertDriveFile color="primary" />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" noWrap>
                    {fileWithProgress.file.name}
                  </Typography>
                  <Chip
                    label={formatFileSize(fileWithProgress.file.size)}
                    size="small"
                    variant="outlined"
                  />
                  {fileWithProgress.error && (
                    <Chip
                      label="Error"
                      size="small"
                      color="error"
                      variant="filled"
                    />
                  )}
                </Box>
                {fileWithProgress.error ? (
                  <Typography variant="caption" color="error">
                    {fileWithProgress.error}
                  </Typography>
                ) : (
                  <LinearProgress
                    variant="determinate"
                    value={fileWithProgress.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                )}
              </Box>
              <IconButton
                size="small"
                onClick={() => removeFile(index)}
                disabled={isUploading}
              >
                <Delete />
              </IconButton>
            </Paper>
          ))}

          {/* Upload button */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={isUploading || files.every(f => f.error)}
              startIcon={<CloudUpload />}
            >
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setFiles([]);
                onFilesChange?.([]);
              }}
              disabled={isUploading}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RdsFileUploader;
