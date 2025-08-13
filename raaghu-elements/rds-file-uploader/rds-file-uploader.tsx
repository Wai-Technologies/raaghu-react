import React from 'react';
import { Box, Typography } from '@mui/material';
import './rds-file-uploader.scss';
import RdsFileUploaderStandardView from './RdsFileUploaderStandardView';
import { 
  RdsDropZoneSideIcon, 
  RdsDropZoneWithButton, 
  RdsDropZoneDefault, 
  RdsFileList,
  useFileUploader
} from './RdsFileUploaderComponents';

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
  children?: React.ReactNode;
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
  children,
}) => {
  const {
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
  } = useFileUploader({
    maxSize,
    maxFiles,
    isMandatory,
    onFilesChange,
    onUpload,
  });




return (
  <>
    {mode === 'standard' ? (
    
      <RdsFileUploaderStandardView
    showTitle={showTitle}
    isMandatory={isMandatory}
    mandatoryError={mandatoryError}
    showHint={showHint}
    hintText={hintText}
    disabled={disabled}
    dragAndDrop={dragAndDrop}
    isDragOver={isDragOver}
    multiple={multiple}
    showPreview={showPreview}
    selectedFileName={selectedFileName}
    handleFileChange={handleFileChange}
    setSelectedFileName={setSelectedFileName}
    setFiles={setFiles}
    onFilesChange={onFilesChange}
    children={children}
    // ...add any other props you need
  />
    ) : (
      <Box className={`rds-file-uploader rds-file-uploader--mode-${mode}`}>
        {/* Title and hint */}
        {showTitle && (
          <Typography className="rds-file-uploader rds-file-uploader__form-title" variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            File Upload{isMandatory && <span style={{ color: 'red' }}> *</span>}
          </Typography>
        )}

        {/* Placeholder image */}
        {placeholderImage && files.length === 0 && (
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <img src={placeholderImage} alt="placeholder" style={{ maxWidth: 'var(--rds-spacing-3xl, 120px)', opacity: 0.7 }} />
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
          <RdsDropZoneSideIcon
            mode={mode || 'default'}
            isDragOver={isDragOver}
            disabled={disabled}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            openFileDialog={openFileDialog}
          />
        ) : style === 'Drop Area - With Upload Button' ? (
          <RdsDropZoneWithButton
            mode={mode || 'default'}
            isDragOver={isDragOver}
            disabled={disabled}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            openFileDialog={openFileDialog}
          />
        ) : (
          <RdsDropZoneDefault
            mode={mode || 'default'}
            isDragOver={isDragOver}
            disabled={disabled}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            openFileDialog={openFileDialog}
          />
        )}

        <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', mt: 1.5, minHeight: 20, ml: 0 }}>
          <Typography
            className="rds-file-uploader__hint"
            variant="caption"
            sx={{ color: showHint ? 'var(--rds-neutral-900, #353535)' : 'transparent', fontWeight: 400, textAlign: 'left', minWidth: 0 }}
          >
            {showHint ? (hintText || 'Maximum 5MB') : '\u00A0'}
          </Typography>
        </Box>
       
        {showPreview && files.length > 0 && (
          <RdsFileList
            files={files}
            isUploading={isUploading}
            removeFile={removeFile}
            formatFileSize={formatFileSize}
          />
        )}

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
