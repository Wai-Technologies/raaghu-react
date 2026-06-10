import React from 'react';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
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
  title?: string;
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
  mode?: 'standard' | 'default';
  style?: 'Drop Area - Side Icon' | 'Drop Area - Top Icon' | 'Drop Area - With Upload Button';
  children?: React.ReactNode;
}

const RdsFileUploader = ({
  onFilesChange,
  title,
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
  mode = 'standard',
  style,
  children,
}: RdsFileUploaderProps) => {
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
          handleFileSelect={handleFileSelect}
          setSelectedFileName={setSelectedFileName}
          setFiles={setFiles}
          onFilesChange={onFilesChange}
          children={children}
          title={title}
        />
      ) : (
        <Box className={clsx('rds-file-uploader', `rds-file-uploader--mode-${mode}`)}>
          {showTitle && (
            <Typography className="rds-file-uploader__form-title" variant="subtitle1">
              {title || 'File Upload'}{isMandatory && <span className="rds-file-uploader__mandatory-asterisk"> *</span>}
            </Typography>
          )}

          {placeholderImage && files.length === 0 && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <img className="rds-file-uploader__placeholder-img" src={placeholderImage} alt="placeholder" />
            </Box>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            disabled={disabled}
            aria-label={title || 'File upload'}
          />

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

          <Box className="rds-file-uploader__hint-row">
            <Typography
              variant="caption"
              className={clsx('rds-file-uploader__error-inline', isMandatory && mandatoryError && 'is-visible')}
            >
              {mandatoryError || 'placeholder'}
            </Typography>
            <div className="rds-file-uploader__hint-wrapper">
              <Typography
                className={clsx('rds-file-uploader__hint', !showHint && 'is-hidden')}
                variant="caption"
              >
                {showHint ? (hintText || 'Maximum 5MB') : '\u00A0'}
              </Typography>
            </div>
          </Box>
          {showPreview && files.length > 0 && (
            <RdsFileList
              files={files}
              isUploading={isUploading}
              removeFile={removeFile}
              formatFileSize={formatFileSize}
            />
          )}
        </Box>
      )}
    </>
  );
};

RdsFileUploader.displayName = 'RdsFileUploader';
export default RdsFileUploader;
