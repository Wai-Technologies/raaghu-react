import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';

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
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  onFilesChange?: (files: any[]) => void;
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
        onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(false); const droppedFiles = Array.from(e.dataTransfer.files); handleFileSelect({ target: { files: droppedFiles } } as any); } : undefined}
      >
        <Button
          variant="contained"
          component="label"
          className="rds-file-uploader__choose-btn"
          disabled={disabled}
          sx={{
            minWidth: 120,
            fontSize: 15,
            fontWeight: 500,
            padding: '8px 16px',
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
        </Button>
        <Typography
          className="rds-file-uploader__filename"
          variant="body2"
          sx={{ color: selectedFileName ? '#222' : '#888' }}
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
            sx={{ ml: 1 }}
          >
            {children}
          </IconButton>
        )}
      </Box>

      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1, minHeight: 20, marginLeft: '10px' }}>
        <Typography
          className="rds-file-uploader__hint"
          variant="caption"
          sx={{ color: showHint ? '#222' : 'transparent', fontWeight: 400, textAlign: 'right', minWidth: 0 }}
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