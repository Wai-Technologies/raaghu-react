import React, { useState } from 'react';
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

  showTitle?: boolean;
  isMandatory?: boolean;
  showHint?: boolean;
  hintText?: string;
  placeholderImage?: string;
  state?: 'default' | 'selected';
  mode?: 'standard';
  style?:'Drop Area - Side Icon' | 'Drop Area - Top Icon' |'Drop Area - With Upload Button';
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
  showTitle = false,
  isMandatory = false,
  showHint = false,
  hintText = '',
  placeholderImage = '',
  state = 'default',
  mode = 'default',
  style,
}) => {
  const [files, setFiles] = React.useState<FileWithProgress[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [mandatoryError, setMandatoryError] = React.useState<string | null>(null);
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
    // Mandatory validation
    if (isMandatory && updatedFiles.length === 0) {
      setMandatoryError('File is required.');
    } else {
      setMandatoryError(null);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    // Mandatory validation
    if (isMandatory && updatedFiles.length === 0) {
      setMandatoryError('File is required.');
    } else {
      setMandatoryError(null);
    }
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






const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileNames = Array.from(files).map(file => file.name).join(', ');
    setSelectedFileName(fileNames);

    if (onFilesChange) {
      const fileWithProgressArray: FileWithProgress[] = Array.from(files).map(file => ({
        file,
        progress: 0,
      }));
      onFilesChange(fileWithProgressArray);
    }
  };




return (
  <>
    {mode === 'standard' ? (
      <Box className="rds-file-uploader__standard" sx={{ width: '100%' }}>
        {/* Title row */}
        {showTitle && (
          <Box className="rds-file-uploader__title-row">
            <Typography className="rds-file-uploader__title" variant="body1" sx={{ fontWeight: 500 }}>
              Title{isMandatory && <span className="rds-file-uploader__mandatory">*</span>}
            </Typography>
          </Box>
        )}
        {/* Input row */}
        <Box
          className={`rds-file-uploader__input-row${isDragOver && dragAndDrop ? ' rds-file-uploader__input-row--drag-over' : ''}${disabled ? ' rds-file-uploader__input-row--disabled' : ''}`}
          sx={{
            display: 'flex',
            width: '100%',
            pointerEvents: disabled ? 'none' : 'auto',
            opacity: disabled ? 0.6 : 1,
          }}
          onDragOver={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setIsDragOver(true); } : undefined}
          onDragLeave={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setIsDragOver(false); } : undefined}
          onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setIsDragOver(false); const droppedFiles = Array.from(e.dataTransfer.files); handleFileChange({ target: { files: droppedFiles } } as any); } : undefined}
        >
          <Button
            variant="contained"
            component="label"
            className="rds-file-uploader__choose-btn"
            disabled={disabled}
            sx={{
              // borderTopRightRadius: 0,
              // borderBottomRightRadius: 0,
              minWidth: 120,
              fontSize: 15,
            fontWeight: 500,
            padding:'8px 16px',
            flexShrink: 0,
            }
          }
          >
            Choose File
            <input
              type="file"
              hidden
              multiple={multiple}
              disabled={disabled}
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            className="rds-file-uploader__filename"
            variant="body2"
            sx={{ color: selectedFileName ? '#222' : '#888',
            }}
          >
            {showPreview
              ? (selectedFileName ? selectedFileName : 'No file chosen')
              : 'No file chosen'}
          </Typography>
          {/* Delete icon for removing selected file (only if file is selected and showPreview is true) */}
          {showPreview && selectedFileName && (
            <IconButton
              className="rds-file-uploader__file-remove"
              size="small"
              aria-label="Remove file"
              onClick={() => {
                setSelectedFileName(null);
                setFiles([]);
                onFilesChange?.([]);
              }}
              disabled={disabled}
              sx={{ ml: 1 }}
            >
              {/* Custom SVG Delete Icon */}
              <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 3.80979H13M4.46201 3.75519V3.2968C4.46201 2.68765 4.73087 2.10346 5.20946 1.67273C5.68806 1.242 6.33718 1 7.01401 1C7.69084 1 8.33995 1.242 8.81854 1.67273C9.29714 2.10346 9.566 2.68765 9.566 3.2968V3.75581M5.51067 5.572V10.624M8.51733 5.572V10.624M2.53067 3.814H11.498V12.0814C11.4997 12.2006 11.4752 12.3189 11.4261 12.4296C11.3769 12.5403 11.304 12.6411 11.2115 12.7264C11.119 12.8118 11.0087 12.8798 10.887 12.9268C10.7653 12.9737 10.6344 12.9986 10.502 13H3.53C3.26259 12.997 3.00746 12.8986 2.82069 12.7263C2.63392 12.554 2.5308 12.3221 2.53401 12.0814V3.814H2.53067Z" stroke="#BD0D1D" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </IconButton>
          )}
        </Box>
        {/* Hint row: always rendered, styled like title row, right aligned */}
        <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1, minHeight: 20 , marginLeft:'10px'}}>
          <Typography
            className="rds-file-uploader__hint"
            variant="caption"
            sx={{ color: showHint ? '#222' : 'transparent', fontWeight: 400, textAlign: 'right', minWidth: 0 }}
          >
            {showHint ? hintText : '\u00A0'}
          </Typography>
        </Box>
        {/* Mandatory error message for standard mode */}
        {isMandatory && mandatoryError && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {mandatoryError}
          </Typography>
        )}
      </Box>
    ) : (
      <Box className={`rds-file-uploader rds-file-uploader--mode-${mode}`}>
        {/* Title and hint */}
        {showTitle && (
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            File Upload{isMandatory && <span style={{ color: 'red' }}> *</span>}
          </Typography>
        )}
        {/* Hint text will be rendered below the uploader instead of here */}

        {/* Placeholder image */}
        {placeholderImage && files.length === 0 && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <img src={placeholderImage} alt="placeholder" style={{ maxWidth: 120, opacity: 0.7 }} />
          </Box>
        )}

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
        {style === 'Drop Area - Side Icon' ? (
          <Paper
            variant={mode === 'standard' ? 'elevation' : 'outlined'}
            className={
              `rds-file-uploader__drop-zone rds-file-uploader__drop-zone--side-icon` +
              (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
              (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={!disabled ? openFileDialog : undefined}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 60, px: 3, py: 2, border: '1.5px dashed #2196F3', cursor: disabled ? 'not-allowed' : 'pointer', borderRadius: 2 }}
          >
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', pl: 1 }}>
              <Typography className="rds-file-uploader__title" variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#353535', mb: 0, textAlign: 'left', fontSize: 20 }}>
                Drag and Drop files or <span className="rds-file-uploader__browse-link" style={{ color: '#3390e6', fontWeight: 600, cursor: 'pointer' }} onClick={openFileDialog}>Browse</span>
              </Typography>
              <Typography className="rds-file-uploader__info" variant="caption" sx={{ color: '#646464', fontWeight: 400, textAlign: 'left', fontSize: 15, mt: 0.5 }}>
                (PNG, JPG, DOC, PDF, PPT)
              </Typography>
            </Box>
            <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
              {/* Custom upload arrow out of a box icon */}
              <svg className="rds-file-uploader__icon" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13.3077V14.5385C1 15.1913 1.25934 15.8174 1.72097 16.279C2.1826 16.7407 2.8087 17 3.46154 17H14.5385C15.1913 17 15.8174 16.7407 16.279 16.279C16.7407 15.8174 17 15.1913 17 14.5385V13.3077M5.30769 5.30769L9 1M9 1L12.6923 5.30769M9 1L9 12.0769" stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </Box>
          </Paper>
        ) : style === 'Drop Area - With Upload Button' ? (
          <Paper
            variant={mode === 'standard' ? 'elevation' : 'outlined'}
            className={
              `rds-file-uploader__drop-zone rds-file-uploader__drop-zone--with-upload-btn` +
              (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
              (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 60, px: 3, py: 2, border: '1.5px dashed #2196F3', background: '#fff', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            <Box className="rds-file-uploader__icon-box">
              {/* Custom upload arrow out of a box icon */}
              <svg className="rds-file-uploader__icon" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13.3077V14.5385C1 15.1913 1.25934 15.8174 1.72097 16.279C2.1826 16.7407 2.8087 17 3.46154 17H14.5385C15.1913 17 15.8174 16.7407 16.279 16.279C16.7407 15.8174 17 15.1913 17 14.5385V13.3077M5.30769 5.30769L9 1M9 1L12.6923 5.30769M9 1L9 12.0769" stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
              sx={{ ml: 2, minWidth: 120, fontWeight: 600, fontSize: 14, padding: '4px 14px', textTransform: 'uppercase', background: '#3390e6' }}
            >
              Upload Files
            </Button>
          </Paper>
        ) : (
          <Paper
            variant={mode === 'standard' ? 'elevation' : 'outlined'}
            className={
              `rds-file-uploader__drop-zone` +
              (isDragOver ? ' rds-file-uploader__drop-zone--drag-over' : '') +
              (disabled ? ' rds-file-uploader__drop-zone--disabled' : '')
            }
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={!disabled ? openFileDialog : undefined}
            sx={mode === 'standard' ? { boxShadow: 3 } : {}}
          >
            {/* Custom upload arrow out of a box icon */}
            <svg className="rds-file-uploader__icon" width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13.3077V14.5385C1 15.1913 1.25934 15.8174 1.72097 16.279C2.1826 16.7407 2.8087 17 3.46154 17H14.5385C15.1913 17 15.8174 16.7407 16.279 16.279C16.7407 15.8174 17 15.1913 17 14.5385V13.3077M5.30769 5.30769L9 1M9 1L12.6923 5.30769M9 1L9 12.0769" stroke="#7D7D7D" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <Typography className="rds-file-uploader__title" variant="h6" gutterBottom>
              Drag and Drop files or <span className="rds-file-uploader__browse-link" onClick={openFileDialog}>Browse</span>
            </Typography>
            <Typography className="rds-file-uploader__info" variant="caption" color="text.secondary">
              (PNG, JPG, DOC, PDF, PPT)
            </Typography>
          </Paper>
        )}

        {/* Hint row: always rendered, left aligned below uploader and above preview */}
        <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 1.5, minHeight: 20, ml: 0 }}>
          <Typography
            className="rds-file-uploader__hint"
            variant="caption"
            sx={{ color: showHint ? '#353535' : 'transparent', fontWeight: 400, textAlign: 'left', minWidth: 0 }}
          >
            {showHint ? (hintText || 'Maximum 5MB') : '\u00A0'}
          </Typography>
        </Box>
        {/* File list */}
        {showPreview && files.length > 0 && (
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
                  width: 500,
                  minWidth: 400,
                  height: 36,
                  background: '#E1E3EA',
                  borderRadius: 1,
                  border: '1px solid #7D7D7D',
                  px: 1,
                  py: 0,
                  mb: 1,
                  fontSize: 15,
                }}
              >
                {/* File name, left aligned, no icon */}
                <Typography
                  sx={{
                    color: '#353535',
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
                {/* File size, right side */}
                <Typography
                  sx={{
                    color: '#646464',
                    fontWeight: 400,
                    fontSize: 14,
                    ml: 2,
                    minWidth: 70,
                    textAlign: 'right',
                  }}
                >
                  {formatFileSize(fileWithProgress.file.size)}
                </Typography>
                {/* Remove (cross) icon, rightmost */}
                <IconButton
                  className="rds-file-uploader__file-remove"
                  size="small"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                  sx={{ ml: 1, color: '#7D7D7D', background: 'transparent', borderRadius: '50%', '&:hover': { background: '#D1D3DA' }, p: 0.5 }}
                  aria-label="Remove file"
                >
                  {/* Cross SVG icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 4.5L13.5 13.5" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M13.5 4.5L4.5 13.5" stroke="#7D7D7D" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        {/* Mandatory error message */}
        {isMandatory && mandatoryError && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {mandatoryError}
          </Typography>
        )}
      </Box>
    )}
  </>
);






};

export default RdsFileUploader;
