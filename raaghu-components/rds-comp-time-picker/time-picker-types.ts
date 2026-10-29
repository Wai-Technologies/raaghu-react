import type { CSSProperties, Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type TimePickerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export interface RdsTimePickerLocaleText {
  now?: string;
  cancel?: string;
  setTime?: string;
  placeholder?: string;
}

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
  /** Overrides for the visible texts. */
  localeText?: RdsTimePickerLocaleText;
  /** Extra CSS class applied to the root element. */
  className?: string;
  /** MUI system styles applied to the root element. */
  sx?: SxProps<Theme>;
  /** Ref to the root element. */
  ref?: Ref<HTMLDivElement>;
  [key: `data-${string}`]: string | number | undefined;
}
