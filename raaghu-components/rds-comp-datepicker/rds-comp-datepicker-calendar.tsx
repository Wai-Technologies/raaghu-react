import { useState, type KeyboardEvent, type MouseEvent } from "react";
import dayjs, { type Dayjs } from "dayjs";
import clsx from "clsx";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, type PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import type { PickersCalendarHeaderProps } from "@mui/x-date-pickers/PickersCalendarHeader";
import { DatePickerLayout, DatePickerStyleType } from "./rds-comp-datepicker.types";

interface DayExtraProps {
  rangeStart?: Dayjs | null;
  rangeEnd?: Dayjs | null;
  selectedDay?: Dayjs | null;
  isRange?: boolean;
  onPick?: (day: Dayjs) => void;
}

interface HeaderExtraProps {
  withNav?: boolean;
  locale?: string;
}

const getShortMonths = (locale?: string) =>
  Array.from({ length: 12 }, (_, month) => new Date(2000, month, 1).toLocaleString(locale, { month: "short" }));

const DatepickerDay = (props: PickersDayProps & DayExtraProps) => {
  const { rangeStart, rangeEnd, selectedDay, isRange, onPick, onClick, onKeyDown, ...dayProps } = props;
  const day = dayProps.day as Dayjs;
  const isStart = !!rangeStart && day.isSame(rangeStart, "day");
  const isEnd = !!rangeEnd && day.isSame(rangeEnd, "day");
  const inRange = !!rangeStart && !!rangeEnd && day.isAfter(rangeStart, "day") && day.isBefore(rangeEnd, "day");
  const isSelected = isRange ? isStart || isEnd : !!selectedDay && day.isSame(selectedDay, "day");

  return (
    <PickersDay
      {...dayProps}
      selected={isSelected}
      aria-selected={isSelected || inRange}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!dayProps.disabled) onPick?.(day);
      }}
      onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === "Enter" || event.key === " ") && !dayProps.disabled) onPick?.(day);
        onKeyDown?.(event, dayProps.day);
      }}
      className={clsx(
        dayProps.className,
        isSelected && "rds-datepicker__day--selected",
        inRange && "rds-datepicker__day--in-range",
        isRange && isStart && "rds-datepicker__day--range-start",
        isRange && isEnd && "rds-datepicker__day--range-end"
      )}
    />
  );
};

const DatepickerHeader = ({
  currentMonth,
  onMonthChange,
  minDate,
  maxDate,
  disabled,
  withNav,
  locale,
}: PickersCalendarHeaderProps & HeaderExtraProps) => {
  const month = currentMonth as Dayjs;
  const min = minDate as Dayjs | undefined;
  const max = maxDate as Dayjs | undefined;
  const months = getShortMonths(locale);
  const currentYear = new Date().getFullYear();
  const startYear = min ? min.year() : currentYear - 100;
  const endYear = max ? max.year() : currentYear + 100;
  const years = Array.from({ length: Math.max(0, endYear - startYear) + 1 }, (_, i) => startYear + i);
  const prevDisabled = disabled || (!!min && !month.subtract(1, "month").endOf("month").isAfter(min));
  const nextDisabled = disabled || (!!max && !month.add(1, "month").startOf("month").isBefore(max));

  const selects = (
    <>
      <select
        value={month.month()}
        onChange={(event) => onMonthChange(month.month(Number(event.target.value)))}
        className="rds-datepicker__header-select rds-datepicker__header-select--month"
        aria-label="Month"
        disabled={disabled}
      >
        {months.map((name, index) => (
          <option key={name} value={index}>
            {name}
          </option>
        ))}
      </select>
      <select
        value={month.year()}
        onChange={(event) => onMonthChange(month.year(Number(event.target.value)))}
        className="rds-datepicker__header-select rds-datepicker__header-select--year"
        aria-label="Year"
        disabled={disabled}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <div className={clsx("rds-datepicker__custom-header", withNav && "rds-datepicker__custom-header--with-nav")}>
      {withNav ? (
        <div className="rds-datepicker__custom-header-group">
          <button
            type="button"
            className="rds-datepicker__nav-btn rds-datepicker__nav-btn--previous"
            onClick={() => onMonthChange(month.subtract(1, "month"))}
            disabled={prevDisabled}
            aria-label="Previous Month"
          >
            <span className="rds-datepicker__nav-icon rds-datepicker__nav-icon--previous" aria-hidden="true" />
          </button>
          {selects}
          <button
            type="button"
            className="rds-datepicker__nav-btn rds-datepicker__nav-btn--next"
            onClick={() => onMonthChange(month.add(1, "month"))}
            disabled={nextDisabled}
            aria-label="Next Month"
          >
            <span className="rds-datepicker__nav-icon rds-datepicker__nav-icon--next" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="rds-datepicker__custom-header-controls">{selects}</div>
      )}
    </div>
  );
};

export interface DatepickerCalendarProps {
  mode: "single" | "range";
  start: Date | null;
  end?: Date | null;
  onSelect: (start: Date | null, end: Date | null) => void;
  layout?: string;
  datePickerStyleType?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  autoFocus?: boolean;
}

export const DatepickerCalendar = ({
  mode,
  start,
  end = null,
  onSelect,
  layout = DatePickerLayout.Default,
  datePickerStyleType = DatePickerStyleType.Selector,
  minDate,
  maxDate,
  locale,
  autoFocus,
}: DatepickerCalendarProps) => {
  const startDay = start ? dayjs(start) : null;
  const endDay = end ? dayjs(end) : null;
  const [anchor, setAnchor] = useState<Dayjs>(() => (startDay ?? dayjs()).startOf("month"));
  const startStamp = start?.getTime() ?? null;
  const [prevStamp, setPrevStamp] = useState(startStamp);
  if (startStamp !== prevStamp) {
    setPrevStamp(startStamp);
    if (startDay) setAnchor(startDay.startOf("month"));
  }

  const isRange = mode === "range";
  const multiMonth = layout === DatePickerLayout.MultiMonth;
  const pickerOnly = layout === DatePickerLayout.MonthPicker || layout === DatePickerLayout.YearPicker;
  const customHeader = !pickerOnly && (multiMonth || (layout === DatePickerLayout.Default && datePickerStyleType === DatePickerStyleType.Dropdown));
  const views: ("year" | "month" | "day")[] =
    layout === DatePickerLayout.MonthPicker ? ["month"] : layout === DatePickerLayout.YearPicker ? ["year"] : customHeader ? ["day"] : ["year", "day"];
  const panes = multiMonth ? 3 : 1;
  const min = minDate ? dayjs(minDate) : undefined;
  const max = maxDate ? dayjs(maxDate) : undefined;

  const pick = (day: Dayjs) => {
    if (!isRange) {
      onSelect(day.startOf("day").toDate(), null);
      return;
    }
    if (!startDay || endDay) {
      onSelect(day.startOf("day").toDate(), null);
    } else if (day.isBefore(startDay, "day")) {
      onSelect(day.startOf("day").toDate(), startDay.startOf("day").toDate());
    } else {
      onSelect(startDay.toDate(), day.startOf("day").toDate());
    }
  };

  return (
    <div className="rds-datepicker__calendar-panes">
      {Array.from({ length: panes }, (_, index) => (
        <DateCalendar
          key={index}
          value={pickerOnly && !isRange ? startDay : anchor.add(index, "month")}
          onChange={(next) => {
            if (!next) return;
            if (pickerOnly) pick(next as Dayjs);
            else setAnchor((next as Dayjs).subtract(index, "month").startOf("month"));
          }}
          onMonthChange={(next) => setAnchor((next as Dayjs).subtract(index, "month").startOf("month"))}
          views={views}
          openTo={views[views.length - 1]}
          minDate={min}
          maxDate={max}
          autoFocus={autoFocus && index === 0}
          slots={{
            day: DatepickerDay,
            ...(customHeader ? { calendarHeader: DatepickerHeader } : {}),
          }}
          slotProps={{
            day: {
              rangeStart: startDay,
              rangeEnd: endDay,
              selectedDay: startDay,
              isRange,
              onPick: pick,
            } as Partial<PickersDayProps>,
            ...(customHeader ? { calendarHeader: { withNav: !multiMonth, locale } as object } : {}),
          }}
        />
      ))}
    </div>
  );
};
