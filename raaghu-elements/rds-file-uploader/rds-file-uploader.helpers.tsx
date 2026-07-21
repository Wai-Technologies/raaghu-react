import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  RdsDropZoneSideIcon,
  RdsDropZoneWithButton,
  RdsDropZoneDefault,
  RdsFileList,
} from './RdsFileUploaderComponents';

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
}

export interface DefaultModeViewProps {
  mode?: 'standard' | 'default';
  style?: 'Drop Area - Side Icon' | 'Drop Area - Top Icon' | 'Drop Area - With Upload Button';
  showTitle: boolean;
  title?: string;
  isMandatory: boolean;
  placeholderImage: string;
  files: FileWithProgress[];
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  accept?: string;
  multiple: boolean;
  disabled: boolean;
  isDragOver: boolean;
  isUploading: boolean;
  showHint: boolean;
  hintText: string;
  mandatoryError?: string | null;
  showPreview: boolean;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (event: React.DragEvent) => void;
  handleDragLeave: (event: React.DragEvent) => void;
  handleDrop: (event: React.DragEvent) => void;
  openFileDialog: () => void;
  removeFile: (index: number) => void;
  formatFileSize: (bytes: number) => string;
}

export function DefaultModeView({
  mode,
  style,
  showTitle,
  title,
  isMandatory,
  placeholderImage,
  files,
  fileInputRef,
  accept,
  multiple,
  disabled,
  isDragOver,
  isUploading,
  showHint,
  hintText,
  mandatoryError,
  showPreview,
  handleFileSelect,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  openFileDialog,
  removeFile,
  formatFileSize,
}: DefaultModeViewProps) {
  const dropZoneProps = {
    mode: mode || 'default',
    isDragOver,
    disabled,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop,
    openFileDialog,
  };

  return (
    <Box className={`rds-file-uploader rds-file-uploader--mode-${mode}`}>
      {showTitle && (
        <Typography className="rds-file-uploader__form-title" variant="subtitle1">
          {title || 'File Upload'}
          {isMandatory && <span className="rds-file-uploader__mandatory-asterisk"> *</span>}
        </Typography>
      )}

      {placeholderImage && files.length === 0 && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img className="rds-file-uploader__placeholder-img" src={placeholderImage} alt="placeholder" />
        </Box>
      )}

      <input
        ref={fileInputRef as React.RefObject<HTMLInputElement>}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {style === 'Drop Area - Side Icon' ? (
        <RdsDropZoneSideIcon {...dropZoneProps} />
      ) : style === 'Drop Area - With Upload Button' ? (
        <RdsDropZoneWithButton {...dropZoneProps} />
      ) : (
        <RdsDropZoneDefault {...dropZoneProps} />
      )}

      <Box className="rds-file-uploader__hint-row">
        <Typography
          variant="caption"
          className={`rds-file-uploader__error-inline ${isMandatory && mandatoryError ? 'is-visible' : ''}`}
        >
          {mandatoryError || 'placeholder'}
        </Typography>
        <div className="rds-file-uploader__hint-wrapper">
          <Typography
            className={`rds-file-uploader__hint ${showHint ? '' : 'is-hidden'}`}
            variant="caption"
          >
            {showHint ? hintText || 'Maximum 5MB' : '\u00A0'}
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
  );
}
