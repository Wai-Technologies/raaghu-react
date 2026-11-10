/** Overridable UI strings of the datepicker. */
export interface RdsCompDatepickerLocaleText {
  selectDate: string;
  clearDate: string;
  openCalendar: string;
  previousMonth: string;
  nextMonth: string;
  month: string;
  year: string;
  custom: string;
  customDate: string;
  today: string;
  yesterday: string;
  lastSevenDays: string;
  lastFourteenDays: string;
}

export const DEFAULT_RDS_COMP_DATEPICKER_LOCALE_TEXT: RdsCompDatepickerLocaleText = {
  selectDate: 'Select date',
  clearDate: 'Clear date',
  openCalendar: 'Open calendar',
  previousMonth: 'Previous Month',
  nextMonth: 'Next Month',
  month: 'Month',
  year: 'Year',
  custom: 'Custom',
  customDate: 'Custom Date',
  today: 'Today',
  yesterday: 'Yesterday',
  lastSevenDays: 'Last 7 days',
  lastFourteenDays: 'Last 14 days',
};
