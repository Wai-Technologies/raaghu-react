import { useState, type ReactNode, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import { type FileWithProgress } from './rds-file-uploader';

interface RdsFileUploaderStandardViewProps {
  viewConfig: {
    showTitle: boolean;
    isMandatory: boolean;
    showHint: boolean;
    showPreview: boolean;
  };
  interactionConfig: {
    disabled: boolean;
    dragAndDrop: boolean;
    isDragOver: boolean;
    multiple: boolean;
  };
  mandatoryError: string | null;
  hintText: string;
  selectedFileName: string | null;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  addFiles: (files: File[]) => void;
  setSelectedFileName: (name: string | null) => void;
  setFiles: Dispatch<SetStateAction<FileWithProgress[]>>;
  onFilesChange?: (files: FileWithProgress[]) => void;
  children?: ReactNode;
  title?: string;
}

const RdsFileUploaderStandardView = ({
  viewConfig,
  interactionConfig,
  mandatoryError,
  hintText,
  selectedFileName,
  handleFileSelect,
  addFiles,
  setSelectedFileName,
  setFiles,
  onFilesChange,
  children,
  title
}: RdsFileUploaderStandardViewProps) => {
  const { showTitle, isMandatory, showHint, showPreview } = viewConfig;
  const { disabled, dragAndDrop, isDragOver, multiple } = interactionConfig;

  return (
    <Box className="rds-file-uploader__standard" sx={{ width: '100%' }}>
      {showTitle && (
        <Box className="rds-file-uploader__title-row">
          <Typography className="rds-file-uploader__title" variant="body1" sx={{ fontWeight: 500 }}>
            {title || 'File'}{isMandatory && <span className="rds-file-uploader__mandatory">*</span>}
          </Typography>
        </Box>
      )}

      <Box
        className={`rds-file-uploader__input-row${isDragOver && dragAndDrop ? ' rds-file-uploader__input-row--drag-over' : ''}${disabled ? ' rds-file-uploader__input-row--disabled' : ''}`}
        sx={{
          display: 'flex',
          width: '100%',
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.6 : 1,
        }}
        onDragOver={dragAndDrop && !disabled ? (e) => { e.preventDefault(); } : undefined}
        onDragLeave={dragAndDrop && !disabled ? (e) => { e.preventDefault(); } : undefined}
        onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files)); } : undefined}
      >
        <RdsButton
          style="filled"
          className="rds-file-uploader__choose-btn"
          disabled={disabled}
          sx={{
            minWidth: 'var(--rds-file-uploader-btn-min-width, 120px)',
            fontSize: 'var(--rds-font-size-md, 0.9375rem)',
            fontWeight: 'var(--rds-font-weight-medium, 500)',
            padding: 'var(--rds-file-uploader-upload-padding-y, 4px) var(--rds-file-uploader-upload-padding-x, 13px)',
            flexShrink: 0,
          }}
          {...({ component: 'label' } as Record<string, unknown>)}
        >
          Choose File
          <input
            type="file"
            hidden
            multiple={multiple}
            disabled={disabled}
            onChange={handleFileSelect}
            aria-label="Choose file"
          />
        </RdsButton>
        <Typography
          className="rds-file-uploader__filename"
          variant="body2"
          noWrap
          sx={{ color: selectedFileName ? 'var(--rds-text-primary)' : 'var(--rds-text-secondary)' }}
        >
          {showPreview
            ? (selectedFileName ? selectedFileName : 'No file chosen')
            : 'No file chosen'}
        </Typography>
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
            sx={{ ml: 'var(--rds-spacing-xs, 4px)' }}
          >
            {children}
          </IconButton>
        )}
      </Box>

      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 'var(--rds-spacing-xs, 4px)', minHeight: 'var(--rds-file-uploader-hint-row-height, 20px)' }}>
        <Typography
          className="rds-file-uploader__hint"
          variant="caption"
          sx={{ color: showHint ? 'var(--rds-text-primary)' : 'transparent', fontWeight: 400, textAlign: 'right', minWidth: 0 }}
        >
          {showHint ? hintText : '\u00A0'}
        </Typography>
      </Box>

      {isMandatory && mandatoryError && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {mandatoryError}
        </Typography>
      )}
    </Box>
  );
};
export default RdsFileUploaderStandardView;

RdsFileUploaderStandardView.displayName = 'RdsFileUploaderStandardView';
