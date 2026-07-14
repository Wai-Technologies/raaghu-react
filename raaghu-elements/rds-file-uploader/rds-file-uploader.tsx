import { type ReactNode } from 'react';
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
export { type FileWithProgress, type RdsFileUploaderProps as RdsFileUploaderBaseProps } from './rds-file-uploader-types';
import { type FileWithProgress, type RdsFileUploaderProps as RdsFileUploaderBaseProps } from './rds-file-uploader-types';

export interface RdsFileUploaderProps extends RdsFileUploaderBaseProps {
  children?: ReactNode;
  /** Legacy aliases still accepted by some consumers. */
  showPreview?: boolean;
  showTitle?: boolean;
  isMandatory?: boolean;
  showHint?: boolean;
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
  dragAndDrop = true,
  display,
  hintText = '',
  placeholderImage = '',
  state = 'default',
  mode = 'standard',
  style,
  children,
  ...legacyProps
}: RdsFileUploaderProps) => {
  const legacyShowPreview = typeof legacyProps['showPreview'] === 'boolean' ? (legacyProps['showPreview'] as boolean) : undefined;
  const legacyShowTitle = typeof legacyProps['showTitle'] === 'boolean' ? (legacyProps['showTitle'] as boolean) : undefined;
  const legacyIsMandatory = typeof legacyProps['isMandatory'] === 'boolean' ? (legacyProps['isMandatory'] as boolean) : undefined;
  const legacyShowHint = typeof legacyProps['showHint'] === 'boolean' ? (legacyProps['showHint'] as boolean) : undefined;

  const showPreview = display?.preview ? display.preview === 'visible' : (legacyShowPreview ?? true);
  const showTitle = display?.title ? display.title === 'visible' : (legacyShowTitle ?? false);
  const isMandatory = display?.mandatory ? display.mandatory === 'required' : (legacyIsMandatory ?? false);
  const showHint = display?.hint ? display.hint === 'visible' : (legacyShowHint ?? false);

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
    onFilesChange,
    onUpload,
  });

  return (
    <>
      {mode === 'standard' ? (
        <RdsFileUploaderStandardView
          viewConfig={{
            showTitle,
            isMandatory,
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
          hintText={hintText}
          selectedFileName={selectedFileName}
          handleFileSelect={handleFileSelect}
          addFiles={addFiles}
          setSelectedFileName={setSelectedFileName}
          setFiles={setFiles}
          onFilesChange={onFilesChange}
         
          title={title}
        >{children}</RdsFileUploaderStandardView>
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
