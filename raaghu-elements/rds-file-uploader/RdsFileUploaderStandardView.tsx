import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import type { FileWithProgress } from './rds-file-uploader';
import { joinClassNames, mergeSx, type RdsStylingPropsWithoutStyle } from '../shared/utils/styling-props';

interface RdsFileUploaderStandardViewProps extends RdsStylingPropsWithoutStyle {
  rootRef?: React.Ref<HTMLDivElement>;
  selected?: boolean;
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
  selected = false,
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
  title,
  rootRef,
  className,
  sx,
}) => {
  const [internalDragOver, setInternalDragOver] = React.useState(false);
  const canDrop = dragAndDrop && !disabled;
  const blockDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'none';
  };

  return (
    <Box ref={rootRef} className={joinClassNames('rds-file-uploader__standard', className)} sx={mergeSx({ width: '100%' }, sx)}>
      {showTitle && (
        <Box className="rds-file-uploader__title-row">
          <Typography className="rds-file-uploader__title" variant="body1" sx={{ fontWeight: 500 }}>
            {title || 'File'}{isMandatory && <span className="rds-file-uploader__mandatory">*</span>}
          </Typography>
        </Box>
      )}

      <Box
        className={`rds-file-uploader__input-row${(isDragOver || internalDragOver) && canDrop ? ' rds-file-uploader__input-row--drag-over' : ''}${disabled ? ' rds-file-uploader__input-row--disabled' : ''}${selected && !disabled ? ' rds-file-uploader__input-row--selected' : ''}`}
        sx={{
          display: 'flex',
          width: '100%',
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.6 : 1,
        }}
        onDragOver={canDrop ? (e) => { e.preventDefault(); setInternalDragOver(true); } : blockDrop}
        onDragLeave={canDrop ? (e) => { e.preventDefault(); setInternalDragOver(false); } : blockDrop}
        onDrop={canDrop ? (e) => { e.preventDefault(); setInternalDragOver(false); const droppedFiles = Array.from(e.dataTransfer.files); handleFileSelect({ target: { files: droppedFiles as unknown as FileList } } as unknown as React.ChangeEvent<HTMLInputElement>); } : blockDrop}
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
            padding: 'var(--rds-file-uploader-upload-padding-y, var(--rds-spacing-xs)) var(--rds-file-uploader-upload-padding-x, var(--rds-spacing-13))',
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
            sx={{ ml: 'var(--rds-spacing-xs)' }}
          >
            {children}
          </IconButton>
        )}
      </Box>

      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 'var(--rds-spacing-xs)', minHeight: 'var(--rds-file-uploader-hint-row-height, var(--rds-spacing-20-px))', marginLeft: 'var(--rds-file-uploader-hint-padding-right, var(--rds-spacing-cozy))' }}>
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
