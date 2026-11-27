import React from 'react';
import './rds-file-uploader.scss';
import RdsFileUploaderStandardView from './RdsFileUploaderStandardView';
import { useFileUploader } from './RdsFileUploaderComponents';
import { DefaultModeView } from './rds-file-uploader.helpers';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import type { RdsStylingPropsWithoutStyle } from '../shared/utils/styling-props';

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
}

export interface RdsFileUploaderProps extends RdsStylingPropsWithoutStyle {
  onFilesChange?: (files: FileWithProgress[]) => void;
  onUpload?: (files: File[]) => Promise<void>;
  accept?: string;
  title?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  dragAndDrop?: boolean;
  showTitle?: boolean;
  isMandatory?: boolean;
  showHint?: boolean;
  hintText?: string;
  /** Image shown inside the drop area in place of the default upload icon. */
  placeholderImage?: string;
  /** Shows the drop area in its selected (highlighted) style. */
  selected?: boolean;
  /** @deprecated Use `selected` instead. */
  state?: 'default' | 'selected';
  mode?: 'standard' | 'default';
  style?: 'Drop Area - Side Icon' | 'Drop Area - Top Icon' | 'Drop Area - With Upload Button';
  children?: React.ReactNode;
}

const RdsFileUploader = React.forwardRef<HTMLDivElement, RdsFileUploaderProps>(function RdsFileUploader({
  onFilesChange,
  title,
  onUpload,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 5,
  disabled = false,
  showPreview = true,
  dragAndDrop = true,
  showTitle = false,
  isMandatory = false,
  showHint = false,
  hintText = '',
  placeholderImage = '',
  selected,
  state,
  mode = 'standard',
  style,
  children,
  className,
  sx,
}, ref) {
  if (state !== undefined) warnDeprecatedProp('RdsFileUploader', 'state', '`selected`');
  const isSelected = selected ?? state === 'selected';
  const uploader = useFileUploader({
    maxSize,
    maxFiles,
    isMandatory,
    multiple,
    onFilesChange,
    onUpload,
  });

  if (mode === 'standard') {
    return (
      <RdsFileUploaderStandardView
        rootRef={ref}
        className={className}
        sx={sx}
        showTitle={showTitle}
        isMandatory={isMandatory}
        mandatoryError={uploader.mandatoryError}
        showHint={showHint}
        hintText={hintText}
        selected={isSelected}
        disabled={disabled}
        dragAndDrop={dragAndDrop}
        isDragOver={uploader.isDragOver}
        multiple={multiple}
        showPreview={showPreview}
        selectedFileName={uploader.selectedFileName}
        handleFileSelect={uploader.handleFileSelect}
        setSelectedFileName={uploader.setSelectedFileName}
        setFiles={uploader.setFiles}
        onFilesChange={onFilesChange}
        title={title}
      >
        {children}
      </RdsFileUploaderStandardView>
    );
  }

  return (
    <DefaultModeView
      rootRef={ref}
      className={className}
      sx={sx}
      mode={mode}
      style={style}
      showTitle={showTitle}
      title={title}
      isMandatory={isMandatory}
      placeholderImage={placeholderImage}
      selected={isSelected}
      files={uploader.files}
      fileInputRef={uploader.fileInputRef}
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      dragAndDrop={dragAndDrop}
      isDragOver={uploader.isDragOver}
      isUploading={uploader.isUploading}
      showHint={showHint}
      hintText={hintText}
      mandatoryError={uploader.mandatoryError}
      showPreview={showPreview}
      handleFileSelect={uploader.handleFileSelect}
      handleDragOver={uploader.handleDragOver}
      handleDragLeave={uploader.handleDragLeave}
      handleDrop={uploader.handleDrop}
      openFileDialog={uploader.openFileDialog}
      removeFile={uploader.removeFile}
      formatFileSize={uploader.formatFileSize}
    />
  );
});

RdsFileUploader.displayName = 'RdsFileUploader';
export default RdsFileUploader;
