/** Overridable UI strings of the time picker. */
export interface RdsCompTimePickerLocaleText {
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

export const DEFAULT_RDS_COMP_TIME_PICKER_LOCALE_TEXT: Required<RdsCompTimePickerLocaleText> = {
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
