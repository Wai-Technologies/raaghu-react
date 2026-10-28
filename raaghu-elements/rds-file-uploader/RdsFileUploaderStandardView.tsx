import { useId, type CSSProperties, type ReactNode, type ChangeEvent, type SyntheticEvent, type Dispatch, type SetStateAction } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import Close from '@mui/icons-material/Close';
import clsx from 'clsx';
import RdsButton from '../rds-button/rds-button';
import type { FileWithProgress, RdsFileUploaderRootProps } from './rds-file-uploader-types';

interface RdsFileUploaderStandardViewProps {
  /** Props forwarded to the root `Box` (consumer `className`, `sx`, `ref`, `id`, `aria-*`…). */
  rootProps?: RdsFileUploaderRootProps & { style?: CSSProperties };
  accept?: string;
 viewConfig: {
  showTitle: boolean;
  mandatory: boolean;
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
  addFiles: (files: File[], event?: SyntheticEvent) => void;
  setSelectedFileName: (name: string | null) => void;
  setFiles: Dispatch<SetStateAction<FileWithProgress[]>>;
  onFilesChange?: (files: FileWithProgress[], event?: SyntheticEvent) => void;
  children?: ReactNode;
  title?: string;
}

type SxArray = Extract<SxProps<Theme>, ReadonlyArray<unknown>>;
const toSxArray = (sx: SxProps<Theme> | undefined): SxArray =>
  (Array.isArray(sx) ? sx : sx ? [sx] : []) as SxArray;

const RdsFileUploaderStandardView = ({
  rootProps,
  accept,
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
const { showTitle, mandatory, showHint, showPreview } = viewConfig;
  const { disabled, dragAndDrop, isDragOver, multiple } = interactionConfig;
  const { className, sx, ...restRootProps } = rootProps ?? {};
  const titleId = useId();

  return (
    <Box
      {...restRootProps}
      className={clsx('rds-file-uploader__standard', className)}
      sx={[{ width: '100%' }, ...toSxArray(sx)]}
    >
      {showTitle && (
        <Box className="rds-file-uploader__title-row">
          <Typography id={titleId} className="rds-file-uploader__title" variant="body1" sx={{ fontWeight: 500 }}>
            {title || 'File'}
{mandatory && (
  <span className="rds-file-uploader__mandatory">*</span>
)}
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
        onDrop={dragAndDrop && !disabled ? (e) => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files), e); } : undefined}
      >
        <RdsButton
          variant="filled"
          className="rds-file-uploader__choose-btn"
          disabled={disabled}
          sx={{
            minWidth: 'var(--rds-file-uploader-btn-min-width)',
            fontSize: 'var(--rds-font-size-md)',
            fontWeight: 'var(--rds-font-weight-medium, 500)',
            padding: 'var(--rds-file-uploader-upload-padding-y) var(--rds-file-uploader-upload-padding-x)',
            flexShrink: 0,
          }}
          aria-describedby={showTitle ? titleId : undefined}
          component="label"
        >
          Choose File
          <input
            type="file"
            hidden
            accept={accept}
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
          {selectedFileName || 'No file chosen'}
        </Typography>
        {showPreview && selectedFileName && (
          <IconButton
            className="rds-file-uploader__file-remove"
            size="small"
            aria-label={`Remove ${selectedFileName}`}
            onClick={(event) => {
              setSelectedFileName(null);
              setFiles([]);
              onFilesChange?.([], event);
            }}
            disabled={disabled}
            sx={{ ml: 'var(--rds-spacing-xs)' }}
          >
            {children ?? <Close />}
          </IconButton>
        )}
      </Box>

      <Box className="rds-file-uploader__hint-row" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 'var(--rds-spacing-xs)', minHeight: 'var(--rds-file-uploader-hint-row-height)' }}>
        <Typography
          className="rds-file-uploader__hint"
          variant="caption"
          sx={{ color: showHint ? 'var(--rds-text-primary)' : 'transparent', fontWeight: 400, textAlign: 'right', minWidth: 0 }}
        >
          {showHint ? hintText : '\u00A0'}
        </Typography>
      </Box>

   {mandatory && mandatoryError && (
  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
    {mandatoryError}
  </Typography>
)}
    
    </Box>
  );
};
export default RdsFileUploaderStandardView;

RdsFileUploaderStandardView.displayName = 'RdsFileUploaderStandardView';
