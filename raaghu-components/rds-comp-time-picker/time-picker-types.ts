import type { Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type TimePickerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export interface RdsTimePickerLocaleText {
  now?: string;
  cancel?: string;
  setTime?: string;
  placeholder?: string;
}

export interface RdsTimePickerProps {
  /** Figma prop: layout variant of the picker. */
  style?: 'default' | 'compact';
  /** Alias of `style`; wins over `style` when both are passed. */
  variant?: 'default' | 'compact';
  /** @deprecated Use `color` instead. */
  colorVariant?: TimePickerColor;
  color?: TimePickerColor;
  /** Applies the selected appearance to the input. */
  selected?: boolean;
  /** Popup open state (controlled). */
  open?: boolean;
  /** Initial popup open state (uncontrolled). */
  defaultOpen?: boolean;
  onChange?: (time: string) => void;
  /** Fired when the popup opens. */
  onOpen?: () => void;
  /** Fired when the popup closes. */
  onClose?: () => void;
  value?: string;
  disabled?: boolean;
  /** Overrides for the visible texts. */
  localeText?: RdsTimePickerLocaleText;
  className?: string;
  sx?: SxProps<Theme>;
  ref?: Ref<HTMLDivElement>;
  [key: `data-${string}`]: string | number | undefined;
}
