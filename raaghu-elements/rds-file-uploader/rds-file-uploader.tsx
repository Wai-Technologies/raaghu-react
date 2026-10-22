import type { ReactNode, SyntheticEvent } from 'react';
import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
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
import { warnDeprecatedProp } from '../shared/utils/deprecation';
export type { FileWithProgress, FileUploaderVariant, RdsFileUploaderProps as RdsFileUploaderBaseProps, RdsFileUploaderRootProps } from './rds-file-uploader-types';
import type { FileWithProgress, RdsFileUploaderProps as RdsFileUploaderBaseProps, RdsFileUploaderRootProps } from './rds-file-uploader-types';

/**
 * Root props are forwarded to the outer `Box` (`className`, `sx`, `ref`, `id`, `aria-*`, `data-*`, event handlers…).
 */
export interface RdsFileUploaderProps extends RdsFileUploaderBaseProps, RdsFileUploaderRootProps {
  /** Standard mode: content of the remove-file button shown next to the chosen file name. */
  children?: ReactNode;
  /** Shows the selected-file preview. Defaults to `true`. `display.preview` takes precedence. */
  showPreview?: boolean;
  /** Shows the label above the uploader. Defaults to `false`. `display.title` takes precedence. */
  showTitle?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** Shows the helper text. Defaults to `false`. `display.hint` takes precedence. */
  showHint?: boolean;
}

type SxArray = Extract<SxProps<Theme>, ReadonlyArray<unknown>>;
const toSxArray = (sx: SxProps<Theme> | undefined): SxArray =>
  (Array.isArray(sx) ? sx : sx ? [sx] : []) as SxArray;

const RdsFileUploader = ({
  onChange,
  onFilesChange,
  label,
  title,
  onUpload,
  accept,
  multiple: multipleProp,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  disabled = false,
  dragAndDrop = true,
  required,
  display,
  showFileList,
  helperText,
  hintText,
  placeholderImage,
  slotProps,
  state: _state,
  mode = 'standard',
  style,
  variant,
  children,
  showPreview: showPreviewProp,
  showTitle: showTitleProp,
  isMandatory: isMandatoryProp,
  showHint: showHintProp,
  className,
  sx,
  ...rest
}: RdsFileUploaderProps) => {
  if (title !== undefined) warnDeprecatedProp('RdsFileUploader', 'title', '`label`');
  if (hintText !== undefined) warnDeprecatedProp('RdsFileUploader', 'hintText', '`helperText`');
  if (isMandatoryProp !== undefined) warnDeprecatedProp('RdsFileUploader', 'isMandatory', '`required`');
  if (onFilesChange !== undefined) warnDeprecatedProp('RdsFileUploader', 'onFilesChange', '`onChange`');
  if (display !== undefined) warnDeprecatedProp('RdsFileUploader', 'display', '`showFileList`, `showTitle`, `showHint` and `required`');
  if (placeholderImage !== undefined) warnDeprecatedProp('RdsFileUploader', 'placeholderImage', '`slotProps.placeholder.src`');
  if (display?.mandatory !== undefined) warnDeprecatedProp('RdsFileUploader', 'display.mandatory', '`required`');

  const legacyShowPreview = typeof showPreviewProp === 'boolean' ? showPreviewProp : undefined;
  const legacyShowTitle = typeof showTitleProp === 'boolean' ? showTitleProp : undefined;
  const legacyIsMandatory = typeof isMandatoryProp === 'boolean' ? isMandatoryProp : undefined;
  const legacyShowHint = typeof showHintProp === 'boolean' ? showHintProp : undefined;

  const showPreview = showFileList ?? (display?.preview ? display.preview === 'visible' : (legacyShowPreview ?? true));
  const legacyVariant = typeof style === 'string' ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsFileUploader', 'style', '`variant`');
  const styleObject = typeof style === 'object' ? style : undefined;
  const dropAreaStyle = variant ?? legacyVariant;
  const placeholderProps = { ...slotProps?.placeholder, src: slotProps?.placeholder?.src ?? placeholderImage };
  const emitFilesChange = (nextFiles: FileWithProgress[], event?: SyntheticEvent) => {
    onFilesChange?.(nextFiles);
    onChange?.(event, nextFiles);
  };
  const showTitle = display?.title ? display.title === 'visible' : (legacyShowTitle ?? false);
  const isMandatory = required ?? (display?.mandatory ? display.mandatory === 'required' : (legacyIsMandatory ?? false));
  const showHint = display?.hint ? display.hint === 'visible' : (legacyShowHint ?? false);
  const fieldLabel = label ?? title;
  const hint = helperText ?? hintText ?? '';
  const multiple = multipleProp ?? false;

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
    addFiles,
    openFileDialog,
    setSelectedFileName,
    setFiles,
  } = useFileUploader({
    maxSize,
    maxFiles,
    isMandatory,
    multiple: multipleProp !== false,
    onFilesChange: emitFilesChange,
    onUpload,
  });

  return (
    <>
      {mode === 'standard' ? (
        <RdsFileUploaderStandardView
          rootProps={{ ...rest, className, sx, style: styleObject }}
          accept={accept}
          viewConfig={{
            showTitle,
            mandatory: isMandatory,
            showHint,
            showPreview,
          }}
          interactionConfig={{
            disabled,
            dragAndDrop,
            isDragOver,
            multiple,
          }}
          mandatoryError={mandatoryError}
          hintText={hint}
          selectedFileName={selectedFileName}
          handleFileSelect={handleFileSelect}
          addFiles={addFiles}
          setSelectedFileName={setSelectedFileName}
          setFiles={setFiles}
          onFilesChange={emitFilesChange}

          title={fieldLabel}
        >{children}</RdsFileUploaderStandardView>
      ) : (
        <Box
          {...rest}
          style={styleObject}
          className={clsx('rds-file-uploader', `rds-file-uploader--mode-${mode}`, className)}
          sx={[{ width: '100%', maxWidth: '100%', minWidth: 0 }, ...toSxArray(sx)]}
        >
          {showTitle && (
            <Typography className="rds-file-uploader__form-title" variant="subtitle1">
              {fieldLabel || 'File Upload'}{isMandatory && <span className="rds-file-uploader__mandatory-asterisk"> *</span>}
            </Typography>
          )}

          {placeholderProps.src && files.length === 0 && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <img alt="placeholder" aria-hidden="true" {...placeholderProps} className={clsx('rds-file-uploader__placeholder-img', placeholderProps.className)} />
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
            aria-label={fieldLabel || 'File upload'}
          />

          {(() => {
            const dropZoneProps = {
              mode: mode || 'default',
              isDragOver,
              disabled,
              onDragOver: handleDragOver,
              onDragLeave: handleDragLeave,
              onDrop: handleDrop,
              openFileDialog,
            };
            if (dropAreaStyle === 'Drop Area - Side Icon') {
              return <RdsDropZoneSideIcon {...dropZoneProps} />;
            }
            if (dropAreaStyle === 'Drop Area - With Upload Button') {
              return <RdsDropZoneWithButton {...dropZoneProps} />;
            }
            return <RdsDropZoneDefault {...dropZoneProps} />;
          })()}

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
                {showHint ? (hint || 'Maximum 5MB') : ' '}
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
