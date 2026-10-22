import type { CSSProperties } from "react";

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
  style?: CSSProperties;
  /** @deprecated Use `color` instead. */
  colorVariant?: TimePickerColor;
  color?: TimePickerColor;
  /** Figma prop. */
  state?: 'default' | 'expanded' | 'selected';
  onChange?: (time: string) => void;
  /** Fired when the popup opens. */
  onOpen?: () => void;
  /** Fired when the popup closes. */
  onClose?: () => void;
  value?: string;
  disabled?: boolean;
  /** Overrides for the visible texts. */
  localeText?: RdsTimePickerLocaleText;
}
