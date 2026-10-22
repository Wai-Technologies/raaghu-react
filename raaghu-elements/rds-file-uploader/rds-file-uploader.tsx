import { type ReactNode } from 'react';
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
  useFileUploader,
} from './RdsFileUploaderComponents';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

export type {
  FileWithProgress,
  RdsFileUploaderProps as RdsFileUploaderBaseProps,
  RdsFileUploaderRootProps,
} from './rds-file-uploader-types';

import type {
  RdsFileUploaderProps as RdsFileUploaderBaseProps,
  RdsFileUploaderRootProps,
} from './rds-file-uploader-types';

export interface RdsFileUploaderProps
  extends RdsFileUploaderBaseProps,
    RdsFileUploaderRootProps {
  /** Standard mode: content of the remove-file button shown next to the chosen file name. */
  children?: ReactNode;

  /** Shows the selected-file preview. Defaults to true. `display.preview` takes precedence. */
  showPreview?: boolean;

  /** Shows the label above the uploader. Defaults to false. `display.title` takes precedence. */
  showTitle?: boolean;

  /** Marks the uploader as required. */
  required?: boolean;

  /** Shows the helper text. Defaults to false. `display.hint` takes precedence. */
  showHint?: boolean;
}

type SxArray = Extract<SxProps<Theme>, ReadonlyArray<unknown>>;

const toSxArray = (sx: SxProps<Theme> | undefined): SxArray =>
  (Array.isArray(sx) ? sx : sx ? [sx] : []) as SxArray;

const RdsFileUploader = ({
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
  required = false,
  display,
  helperText,
  hintText,
  placeholderImage = '',
  state: _state,
  mode = 'standard',
  style,
  children,
  showPreview: showPreviewProp,
  showTitle: showTitleProp,
  showHint: showHintProp,
  className,
  sx,
  ...rest
}: RdsFileUploaderProps) => {
  if (title !== undefined) {
    warnDeprecatedProp('RdsFileUploader', 'title', '`label`');
  }

  if (hintText !== undefined) {
    warnDeprecatedProp('RdsFileUploader', 'hintText', '`helperText`');
  }

  const showPreview = display?.preview
    ? display.preview === 'visible'
    : (showPreviewProp ?? true);

  const showTitle = display?.title
    ? display.title === 'visible'
    : (showTitleProp ?? false);

  const showHint = display?.hint
    ? display.hint === 'visible'
    : (showHintProp ?? false);

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
    required,
    multiple: multipleProp !== false,
    onFilesChange,
    onUpload,
  });

  return (
    <>
      {mode === 'standard' ? (
        <RdsFileUploaderStandardView
          rootProps={{ ...rest, className, sx }}
          accept={accept}
          viewConfig={{
            showTitle,
            required,
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
          onFilesChange={onFilesChange}
          title={fieldLabel}
        >
          {children}
        </RdsFileUploaderStandardView>
      ) : (
        <Box
          {...rest}
          className={clsx(
            'rds-file-uploader',
            `rds-file-uploader--mode-${mode}`,
            className,
          )}
          sx={[{ width: '100%', maxWidth: '100%', minWidth: 0 }, ...toSxArray(sx)]}
        >
          {showTitle && (
            <Typography
              className="rds-file-uploader__form-title"
              variant="subtitle1"
            >
              {fieldLabel || 'File Upload'}
              {required && (
                <span className="rds-file-uploader__mandatory-asterisk">
                  {' '}*
                </span>
              )}
            </Typography>
          )}

          {placeholderImage && files.length === 0 && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <img
                className="rds-file-uploader__placeholder-img"
                src={placeholderImage}
                alt="placeholder"
                aria-hidden="true"
              />
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
              className={clsx(
                'rds-file-uploader__error-inline',
                required && mandatoryError && 'is-visible',
              )}
            >
              {mandatoryError || 'placeholder'}
            </Typography>

            <div className="rds-file-uploader__hint-wrapper">
              <Typography
                className={clsx(
                  'rds-file-uploader__hint',
                  !showHint && 'is-hidden',
                )}
                variant="caption"
              >
                {showHint ? (hint || 'Maximum 5MB') : '\u00A0'}
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
