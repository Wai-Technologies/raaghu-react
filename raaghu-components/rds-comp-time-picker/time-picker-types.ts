import type { CSSProperties, Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';
import type { RdsCompTimePickerLocaleText } from './rds-comp-time-picker-locale';

/** @deprecated Use `RdsCompTimePickerLocaleText` instead. */
export type RdsTimePickerLocaleText = Partial<RdsCompTimePickerLocaleText>;

export type TimePickerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export interface RdsTimePickerProps {
  /** Layout variant of the picker. */
  variant?: 'default' | 'compact';
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: 'default' | 'compact' | CSSProperties;
  /** @deprecated Use `color` instead. */
  colorVariant?: TimePickerColor;
  /** Palette color of the picker. */
  color?: TimePickerColor;
  /** Applies the selected appearance to the input. */
  selected?: boolean;
  /** Popup open state (controlled). */
  open?: boolean;
  /** Initial popup open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Called with the formatted time string when a time is set. */
  onChange?: (time: string) => void;
  /** Fired when the popup opens. */
  onOpen?: () => void;
  /** Fired when the popup closes. */
  onClose?: () => void;
  /** Selected time as a formatted string. */
  value?: string;
  /** Disables the picker. */
  disabled?: boolean;
  /** Overrides for the built-in English UI strings. */
  localeText?: Partial<RdsCompTimePickerLocaleText>;
  /** Extra CSS class applied to the root element. */
  className?: string;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  /** Id of the root element. */
  id?: string;
  /** Accessible label of the root element. */
  'aria-label'?: string;
  [key: `data-${string}`]: string | number | undefined;
}
