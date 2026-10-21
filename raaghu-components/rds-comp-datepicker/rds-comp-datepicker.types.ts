export enum DatePickerStyleType {
  Dropdown = "Dropdown",
  Selector = "Selector",
}

export enum DatePickerLayout {
  Default = "Default",
  MonthPicker = "Month Picker",
  YearPicker = "Year Picker",
  MultiMonth = "Multi Month",
}

export enum DatePickerState {
  Default = "Default",
  Expanded = "Expanded",
  Selected = "Selected",
}

export interface RdsCompDatepickerProps {
  selectedDate?: (date: Date | null) => void;
  dateForEdit?: string;
  titleText?: string;
  onDatePicker?: (date: Date | [Date | null, Date | null]) => void;
  datePickerStyleType?: DatePickerStyleType;
  state?: DatePickerState;
  layout?: DatePickerLayout;
  customDate?: (dates: [Date | null, Date | null]) => void;
  controls?: {
    title?: "visible" | "hidden";
    disabled?: "on" | "off";
    mandatory?: "required" | "optional";
    clearDate?: "visible" | "hidden";
    defaultDate?: "on" | "off";
  };
  placeholderText?: string;
  DatePickerLabel?: string;
  type?: string;
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
  /** Shows the clear-date button when a date is selected. `controls.clearDate` wins when set. */
  showClearDate?: boolean;
  /** Pre-selects today's date. `controls.defaultDate` wins when set. */
  isDefaultDate?: boolean;
  /** @deprecated Use `disabled` instead. */
  isDisabled?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** Has no effect: the preset list manages its own open state. Kept for backwards compatibility. */
  isDropdownOpen?: boolean;
}
