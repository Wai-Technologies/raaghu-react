export interface RdsFileUploaderLocaleText {
  fileUploadLabel: string;
  defaultTitle: string;
  defaultFormTitle: string;
  chooseFile: string;
  chooseFileLabel: string;
  noFileChosen: string;
  removeFileNamedLabel: (name: string) => string;
  removeFileLabel: string;
  dragAndDropFiles: string;
  or: string;
  browse: string;
  uploadFiles: string;
  selectedFiles: (count: number) => string;
  maximumSize: (size: string) => string;
  fileSizeExceeds: (size: string) => string;
  fileRequired: string;
  uploadFailed: string;
  allFiles: string;
}

export const DEFAULT_RDS_FILE_UPLOADER_LOCALE_TEXT: RdsFileUploaderLocaleText = {
  fileUploadLabel: 'File upload',
  defaultTitle: 'File',
  defaultFormTitle: 'File Upload',
  chooseFile: 'Choose File',
  chooseFileLabel: 'Choose file',
  noFileChosen: 'No file chosen',
  removeFileNamedLabel: (name) => `Remove ${name}`,
  removeFileLabel: 'Remove file',
  dragAndDropFiles: 'Drag and Drop files',
  or: 'or',
  browse: 'Browse',
  uploadFiles: 'Upload Files',
  selectedFiles: (count) => `Selected Files (${count})`,
  maximumSize: (size) => `Maximum ${size}`,
  fileSizeExceeds: (size) => `File size exceeds ${size}`,
  fileRequired: 'File is required.',
  uploadFailed: 'Upload failed',
  allFiles: 'All files',
};
