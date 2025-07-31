import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material'


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
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFileName: (name: string | null) => void;
  setFiles: (files: any[]) => void;
  onFilesChange?: (files: any[]) => void;
  // Add any other props you need from the parent
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
  handleFileChange,
  setSelectedFileName,
  setFiles,
  onFilesChange,
}) => {
  const [internalDragOver, setInternalDragOver] = React.useState(false);
  // Use internalDragOver if you want to manage drag state locally, otherwise use isDragOver from props
  return (
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
        onDragOver={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(true); } : undefined}
        onDragLeave={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(false); } : undefined}
        onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); setInternalDragOver(false); const droppedFiles = Array.from(e.dataTransfer.files); handleFileChange({ target: { files: droppedFiles } } as any); } : undefined}
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
            onChange={handleFileChange}
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
      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1, minHeight: 20, marginLeft: '10px' }}>
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
  );
};
export default RdsFileUploaderStandardView;