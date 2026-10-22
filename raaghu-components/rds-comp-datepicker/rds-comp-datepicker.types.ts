import type { ReactNode } from "react";

export const DatePickerStyleType = {
  Dropdown: 'Dropdown',
  Selector: 'Selector',
} as const;
export type DatePickerStyleType = (typeof DatePickerStyleType)[keyof typeof DatePickerStyleType];

export const DatePickerLayout = {
  Default: 'Default',
  MonthPicker: 'Month Picker',
  YearPicker: 'Year Picker',
  MultiMonth: 'Multi Month',
} as const;
export type DatePickerLayout = (typeof DatePickerLayout)[keyof typeof DatePickerLayout];

export interface RdsCompDatepickerProps {
  selectedDate?: (date: Date | null) => void;
  /** Selected date; the picker re-syncs whenever it changes (`null` clears it). */
  value?: Date | string | null;
  /** Initial selected date. */
  defaultValue?: Date | string | null;
  /** Fires with the picked date, the picked range, or `[null, null]` when cleared. */
  onChange?: (value: Date | null | [Date | null, Date | null]) => void;
  /** Label text; shows the label unless `showTitle` / `controls.title` say otherwise. */
  label?: string;
  variant?: "dropdown" | "selector";
  placeholder?: string;
  /** Shows the clear-date button when a date is selected. */
  clearable?: boolean;
  /** Applies the selected appearance to the date picker. */
  selected?: boolean;
  /** Icon of the open-calendar button. */
  openPickerIcon?: ReactNode;
  /** @deprecated Use `value` instead. */
  dateForEdit?: string;
  titleText?: string;
  /** @deprecated Use `onChange` instead. */
  onDatePicker?: (date: Date | [Date | null, Date | null]) => void;
  datePickerStyleType?: DatePickerStyleType;
  layout?: DatePickerLayout;
  customDate?: (dates: [Date | null, Date | null]) => void;
  controls?: {
    title?: "visible" | "hidden";
    disabled?: "on" | "off";
    /** @deprecated Use `required` instead. */
    mandatory?: "required" | "optional";
    /** @deprecated Use `clearable` instead. */
    clearDate?: "visible" | "hidden";
    /** @deprecated Use `defaultValue` instead. */
    defaultDate?: "on" | "off";
  };
  /** @deprecated Use `placeholder` instead. */
  placeholderText?: string;
  DatePickerLabel?: string;
  type?: string;
  /** @deprecated Use `openPickerIcon` instead. */
  changeIcon?: "dashboard_settings" | string;
  /**
   * Disables the picker. When defined it wins over `controls.disabled` and the legacy `isDisabled`.
   */
  disabled?: boolean;
  /**
   * Marks the field as required (shows the `*` next to the title and sets `aria-required`).
   * When defined it wins over `controls.mandatory` and the legacy `isMandatory`.
   */
  required?: boolean;
  /** Shows the title label (`titleText`). `controls.title` wins when set. */
  showTitle?: boolean;
  /** @deprecated Use `clearable` instead. */
  showClearDate?: boolean;
  /** @deprecated Use `defaultValue` instead. */
  isDefaultDate?: boolean;
  /** @deprecated Use `disabled` instead. */
  isDisabled?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** Has no effect: the preset list manages its own open state. Kept for backwards compatibility. */
  isDropdownOpen?: boolean;
}
