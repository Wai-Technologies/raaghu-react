import type { Ref } from 'react';
import type { BoxProps } from '@mui/material';

/** Root `Box` props forwarded to the uploader's outer element (`className`, `sx`, `ref`, `id`, `aria-*`, `data-*`, handlers…). */
export type RdsFileUploaderRootProps = Omit<BoxProps, 'style' | 'title' | 'onChange' | 'children' | 'display' | 'component' | 'ref'> & {
  ref?: Ref<HTMLDivElement>;
};

export interface FileWithProgress {
  file: File;
  progress: number;
  error?: string;
}

export interface RdsFileUploaderProps {
  onFilesChange?: (files: FileWithProgress[]) => void;
  /** Currently not called: the uploader only collects files and reports them through `onFilesChange`. */
  onUpload?: (files: File[]) => Promise<void>;
  accept?: string;
  /** Field label shown above the uploader (when the title is visible) and used as the input's accessible name. */
  label?: string;
  /** @deprecated Use `label` instead. */
  title?: string;
  /** Allows selecting several files. When `false` (default), a new selection or drop replaces the current file. */
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  dragAndDrop?: boolean;
  /** Marks the field as required: shows an asterisk after the label and reports the empty-field error. */
  required?: boolean;
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
  placeholderImage?: string;
  /** @deprecated – has no effect */
  state?: 'default' | 'selected';
  mode?: 'standard' | 'default';
  style?: 'Drop Area - Side Icon' | 'Drop Area - Top Icon' | 'Drop Area - With Upload Button';
}
