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
  [key: string]: unknown;
}
