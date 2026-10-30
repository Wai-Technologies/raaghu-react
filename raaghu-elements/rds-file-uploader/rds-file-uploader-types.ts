import type { CSSProperties, ImgHTMLAttributes, Ref, SyntheticEvent } from 'react';
import type { BoxProps } from '@mui/material';

/** Root `Box` props forwarded to the uploader's outer element (`className`, `sx`, `ref`, `id`, `aria-*`, `data-*`, handlers…). */
export type RdsFileUploaderRootProps = Omit<BoxProps, 'style' | 'title' | 'onChange' | 'children' | 'display' | 'component' | 'ref'> & {
  /** Ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
};

export type FileUploaderVariant = 'Drop Area - Side Icon' | 'Drop Area - Top Icon' | 'Drop Area - With Upload Button';

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
}

export interface RdsFileUploaderProps {
  /** Called with the triggering event and the new file list when files are added or removed. */
  onChange?: (event: SyntheticEvent | undefined, files: FileWithProgress[]) => void;
  /** @deprecated Use `onChange` instead. */
  onFilesChange?: (files: FileWithProgress[]) => void;
  /** Currently not called: the uploader only collects files and reports them through `onFilesChange`. */
  onUpload?: (files: File[]) => Promise<void>;
  /** Accepted file types, passed to the file input's `accept` attribute. */
  accept?: string;
  /** Field label shown above the uploader (when the title is visible) and used as the input's accessible name. */
  label?: string;
  /** @deprecated Use `label` instead. */
  title?: string;
  /** Allows selecting several files. When `false` (default), a new selection or drop replaces the current file. */
  multiple?: boolean;
  /** Maximum size of each file in bytes. @default 10 * 1024 * 1024 */
  maxSize?: number;
  /** Maximum number of files that can be added. @default 5 */
  maxFiles?: number;
  /** Disables the uploader. @default false */
  disabled?: boolean;
  /** Applies the selected appearance to the uploader. */
  selected?: boolean;
  /** Enables drag-and-drop of files onto the drop area. @default true */
  dragAndDrop?: boolean;
  /** Marks the field as required: shows an asterisk after the label and reports the empty-field error. */
  required?: boolean;
  /** Shows the selected-file list. Takes precedence over `display.preview` and `showPreview`. */
  showFileList?: boolean;
  /** @deprecated Use `showFileList`, `showTitle`, `showHint` and `required` instead. */
  display?: {
    preview?: 'visible' | 'hidden';
    title?: 'visible' | 'hidden';
    /** @deprecated Use `required` instead. */
    mandatory?: 'required' | 'optional';
    hint?: 'visible' | 'hidden';
  };
  /** Helper text shown below the uploader when the hint is visible. */
  helperText?: string;
  /** @deprecated Use `helperText` instead. */
  hintText?: string;
  /** @deprecated Use `slotProps.placeholder.src` instead. */
  placeholderImage?: string;
  /** Props for the inner parts. `placeholder` is the image shown before any file is chosen (default mode). */
  slotProps?: { placeholder?: ImgHTMLAttributes<HTMLImageElement> };
  /** Rendering mode: the standard view or the default drop-zone view. @default 'standard' */
  mode?: 'standard' | 'default';
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: FileUploaderVariant | CSSProperties;
  /** Drop-area style. */
  variant?: FileUploaderVariant;
}
