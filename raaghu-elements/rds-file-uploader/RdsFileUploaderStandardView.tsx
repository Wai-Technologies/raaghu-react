import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import type { FileWithProgress } from './rds-file-uploader';

interface RdsFileUploaderStandardViewProps {
  showTitle: boolean;
  isMandatory: boolean;
  mandatoryError: string | null;
  showHint: boolean;
  hintText: string;
  disabled: boolean;
  dragAndDrop: boolean;
  isDragOver: boolean;
  multiple: boolean;
  showPreview: boolean;
  selectedFileName: string | null;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFileName: (name: string | null) => void;
  setFiles: React.Dispatch<React.SetStateAction<FileWithProgress[]>>;
  onFilesChange?: (files: FileWithProgress[]) => void;
  children?: React.ReactNode;
  title?: string;
}

const RdsFileUploaderStandardView: React.FC<RdsFileUploaderStandardViewProps> = ({
  showTitle,
  isMandatory,
  mandatoryError,
  showHint,
  hintText,
  disabled,
  dragAndDrop,
  isDragOver,
  multiple,
  showPreview,
  selectedFileName,
  handleFileSelect,
  setSelectedFileName,
  setFiles,
  onFilesChange,
  children,
  title
}) => {
  const [internalDragOver, setInternalDragOver] = React.useState(false);

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
        onDragOver={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(true); } : undefined}
        onDragLeave={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(false); } : undefined}
        onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(false); const droppedFiles = Array.from(e.dataTransfer.files); handleFileSelect({ target: { files: droppedFiles as unknown as FileList } } as unknown as React.ChangeEvent<HTMLInputElement>); } : undefined}
      >
        <RdsButton
          style="filled"
          component="label"
          className="rds-file-uploader__choose-btn"
          disabled={disabled}
          sx={{
            minWidth: 'var(--rds-file-uploader-btn-min-width, 120px)',
            fontSize: 'var(--rds-font-size-md, 0.9375rem)',
            fontWeight: 'var(--rds-font-weight-medium, 500)',
            padding: 'var(--rds-file-uploader-upload-padding-y, 4px) var(--rds-file-uploader-upload-padding-x, 13px)',
            flexShrink: 0,
          }}
        >
          Choose File
          <input
            type="file"
            hidden
            multiple={multiple}
            disabled={disabled}
            onChange={handleFileSelect}
          />
        </RdsButton>
        <Typography
          className="rds-file-uploader__filename"
          variant="body2"
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

      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 'var(--rds-spacing-xs, 4px)', minHeight: 'var(--rds-file-uploader-hint-row-height, 20px)', marginLeft: 'var(--rds-file-uploader-hint-padding-right, 10px)' }}>
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
