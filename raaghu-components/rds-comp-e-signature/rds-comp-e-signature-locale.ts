/** Overridable UI strings of `RdsCompESignature`. */
export interface RdsCompESignatureLocaleText {
  /** Heading of the draw mode. */
  drawSignature: string;
  /** Canvas hint when drawing initials. */
  drawInitial: string;
  /** Heading of the upload mode for a full signature. */
  uploadSignature: string;
  /** Heading of the upload mode for initials. */
  uploadInitial: string;
  /** Heading of the choose mode. */
  chooseSignature: string;
  /** Message shown over the canvas while draw mode is disabled. */
  drawDisabledMessage: string;
  /** Footer shown while another method is already selected. */
  anotherMethodSelected: string;
  /** Accessible label of the initials canvas. */
  initialsCanvasLabel: string;
  /** Accessible label of the signature canvas. */
  signatureCanvasLabel: string;
  /** Accessible label of the pen colour group. */
  penColourLabel: string;
  /** Accessible label of the black pen swatch. */
  penColorBlack: string;
  /** Accessible label of the blue pen swatch. */
  penColorBlue: string;
  /** Accessible label of the red pen swatch. */
  penColorRed: string;
  /** Accessible label of the undo button. */
  undoLabel: string;
  /** Accessible label of the save button. */
  saveLabel: string;
  /** Accessible label of the delete button. */
  deleteLabel: string;
  /** Error shown when the drawn signature is too short. */
  signatureNotClear: string;
  /** Accessible label of the initials file input. */
  uploadInitialFileLabel: string;
  /** Accessible label of the signature file input. */
  uploadSignatureFileLabel: string;
  /** Accessible label of the remove file button. */
  removeFileLabel: string;
  /** Error shown when the chosen file is too large; receives the limit in MB. */
  fileTooLarge: (maxMb: number) => string;
  /** Label above the file row. */
  fileFieldLabel: string;
  /** Text of the choose file button. */
  chooseFile: string;
  /** Placeholder shown while no file is chosen. */
  noFileChosen: string;
  /** Hint with the file size limit; receives the limit in MB. */
  maximumFileSize: (maxMb: number) => string;
  /** Error shown when several signature styles are selected. */
  selectOnlyOneStyle: string;
  /** Link text that switches to custom drawing. */
  createOwnSignature: string;
}

export const DEFAULT_RDS_COMP_E_SIGNATURE_LOCALE_TEXT: RdsCompESignatureLocaleText = {
  drawSignature: 'Draw Signature',
  drawInitial: 'Draw Initial',
  uploadSignature: 'Upload Signature',
  uploadInitial: 'Upload Initial',
  chooseSignature: 'Choose Signature',
  drawDisabledMessage: 'Draw option is currently disabled.\nClear uploaded signature to enable drawing.',
  anotherMethodSelected: 'Another method already selected',
  initialsCanvasLabel: 'Initials drawing area',
  signatureCanvasLabel: 'Signature drawing area',
  penColourLabel: 'Pen colour',
  penColorBlack: 'Black',
  penColorBlue: 'Blue',
  penColorRed: 'Red',
  undoLabel: 'undo',
  saveLabel: 'save',
  deleteLabel: 'delete',
  signatureNotClear: 'Signature not clear. Please draw again.',
  uploadInitialFileLabel: 'Upload initial file',
  uploadSignatureFileLabel: 'Upload signature file',
  removeFileLabel: 'Remove file',
  fileTooLarge: (maxMb) => `File too large. Max size is ${maxMb}MB`,
  fileFieldLabel: 'Title',
  chooseFile: 'Choose File',
  noFileChosen: 'No File Chosen',
  maximumFileSize: (maxMb) => `Maximum ${maxMb}MB`,
  selectOnlyOneStyle: 'Select only one signature style.',
  createOwnSignature: '⊕ Create your own signature',
};
