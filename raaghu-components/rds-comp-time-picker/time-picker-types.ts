import type { CSSProperties, Ref } from 'react';
import type { SxProps, Theme } from '@mui/material';

export type TimePickerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

/** Overridable UI strings of the time picker. */
export interface RdsTimePickerLocaleText {
  now?: string;
  cancel?: string;
  setTime?: string;
  placeholder?: string;
  selectedTime?: string;
  toggleTimePicker?: string;
  timePicker?: string;
  hours?: string;
  minutes?: string;
  amPm?: string;
  incrementHour?: string;
  decrementHour?: string;
  incrementMinute?: string;
  decrementMinute?: string;
  toggleAmPmUp?: string;
  toggleAmPm?: string;
  toggleAmPmDown?: string;
}

export const DEFAULT_RDS_TIME_PICKER_LOCALE_TEXT: Required<RdsTimePickerLocaleText> = {
  now: 'NOW',
  cancel: 'Cancel',
  setTime: 'Set Time',
  placeholder: '12:00 AM',
  selectedTime: 'Selected time',
  toggleTimePicker: 'Toggle time picker',
  timePicker: 'Time picker',
  hours: 'Hours',
  minutes: 'Minutes',
  amPm: 'AM/PM',
  incrementHour: 'Increment hour',
  decrementHour: 'Decrement hour',
  incrementMinute: 'Increment minute',
  decrementMinute: 'Decrement minute',
  toggleAmPmUp: 'Toggle AM/PM up',
  toggleAmPm: 'Toggle AM/PM',
  toggleAmPmDown: 'Toggle AM/PM down',
};

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
  localeText?: Partial<RdsTimePickerLocaleText>;
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
