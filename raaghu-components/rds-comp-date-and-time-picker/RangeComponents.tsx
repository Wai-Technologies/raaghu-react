import { forwardRef, memo, useCallback, useEffect, useMemo, useState, type ReactElement, type ReactNode } from 'react';
import clsx from 'clsx';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export interface DateRangePreset {
  key: string;
  label: string;
  getValue: () => [Dayjs | null, Dayjs | null];
}

export const dateRangePresets: DateRangePreset[] = [
  {
    key: 'today',
    label: 'Today',
    getValue: () => [dayjs().startOf('day'), dayjs().endOf('day')],
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    getValue: () => [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
  },
  {
    key: 'last7days',
    label: 'Last 7 days',
    getValue: () => [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    key: 'last14days',
    label: 'Last 14 days',
    getValue: () => [dayjs().subtract(13, 'day').startOf('day'), dayjs().endOf('day')],
  },
  {
    key: 'custom',
    label: 'Custom',
    getValue: () => [null, null],
  },
];

export const formatRangeText = (
  variant: 'daterange' | 'timerange' | 'datetimerange',
  value: [Dayjs | null, Dayjs | null],
  showSeconds: boolean
) => {
  const [start, end] = value;
  if (!start && !end) return '';
  const timeFmt = showSeconds ? 'hh:mm:ss a' : 'hh:mm a';
  switch (variant) {
    case 'daterange':
      return `${start ? start.format('MM/DD/YYYY') : ''} - ${end ? end.format('MM/DD/YYYY') : ''}`;
    case 'timerange':
      return `${start ? start.format(timeFmt) : ''} - ${end ? end.format(timeFmt) : ''}`;
    case 'datetimerange':
    default:
      return `${start ? start.format(`MM/DD/YYYY ${timeFmt}`) : ''} - ${end ? end.format(`MM/DD/YYYY ${timeFmt}`) : ''}`;
  }
};

const isSameDay = (a: Dayjs | null, b: Dayjs | null) => !!a && !!b && a.isSame(b, 'day');
const isBetween = (day: Dayjs, start: Dayjs | null, end: Dayjs | null) =>
  !!start && !!end && day.isAfter(start, 'day') && day.isBefore(end, 'day');

const DateCalendarPanel = memo(function DateCalendarPanel({
  value,
  onChange,
  onMonthChange,
  minDate,
  maxDate,
  daySlot,
}: {
  value: Dayjs;
  onChange: (newMonth: Dayjs | null) => void;
  onMonthChange: (newMonth: Dayjs) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  daySlot: React.ElementType<PickersDayProps>;
}) {
  return (
    <DateCalendar
      value={value}
      onChange={(newValue) => onChange(newValue as Dayjs | null)}
      onMonthChange={(newMonth) => onMonthChange(newMonth as Dayjs)}
      minDate={minDate}
      maxDate={maxDate}
      slots={{ day: daySlot }}
      views={['year', 'month', 'day']}
      displayWeekNumber
      slotProps={{
        calendarHeader: {
          format: 'MMMM YYYY',
        },
      }}
    />
  );
});

export const CustomDateRangeLayout = forwardRef<
  HTMLDivElement,
  {
    children: ReactNode;
    selectedPreset: string;
    onPresetSelect: (preset: DateRangePreset) => void;
    rangeValue: [Dayjs | null, Dayjs | null];
  }
>(({ children, selectedPreset, onPresetSelect, rangeValue }, ref) => {
  return (
    <div
      ref={ref}
      className="rds-date-picker__custom-layout"
    >
      <div className="rds-date-picker__preset-panel">
        <ul className="rds-date-picker__preset-list">
          {dateRangePresets.map((preset) => (
            <li key={preset.key} className="rds-date-picker__preset-item">
              <button
                type="button"
                className={clsx(
                  "rds-date-picker__preset-button",
                  selectedPreset === preset.key && "rds-date-picker__preset-button--selected"
                )}
                onClick={() => onPresetSelect(preset)}
              >
                {preset.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="rds-date-picker__calendar-panel">{children}</div>
    </div>
  );
});

export function RangeCalendar({ value, onChange, minDate, maxDate, multiMonth }: {
  value: [Dayjs | null, Dayjs | null];
  onChange: (v: [Dayjs | null, Dayjs | null]) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  multiMonth?: boolean;
}) {
  const [draft, setDraft] = useState<[Dayjs | null, Dayjs | null]>(value);
  const [currentMonth, setCurrentMonth] = useState(draft[0] || dayjs());

  useEffect(() => setDraft(value), [value[0]?.valueOf(), value[1]?.valueOf()]);

  const handleSelect = useCallback((day: Dayjs) => {
    const [start, end] = draft;
    if (!start || (start && end)) {
      setDraft([day.startOf('day'), null]);
      onChange([day.startOf('day'), null]);
    } else if (day.isBefore(start, 'day')) {
      setDraft([day.startOf('day'), start.endOf('day')]);
      onChange([day.startOf('day'), start.endOf('day')]);
    } else {
      setDraft([start, day.endOf('day')]);
      onChange([start, day.endOf('day')]);
    }
  }, [draft, onChange]);

  const handleMonthChange = useCallback((newMonth: Dayjs) => setCurrentMonth(newMonth), []);

  const RangeDaySlot: React.ElementType<PickersDayProps> = (dayProps: PickersDayProps): ReactElement => {
    const day = dayProps.day as Dayjs;
    const [start, end] = draft;
    const inRange = isBetween(day, start, end);
    const isStart = isSameDay(day, start);
    const isEnd = isSameDay(day, end);
    return (
      <PickersDay
        {...(dayProps as PickersDayProps)}
        onClick={() => handleSelect(day)}
        sx={{
          borderRadius: '4px !important',
          ...(inRange && {
            backgroundColor: 'var(--rds-color-primary-hover, #E3F2FD) !important',
            color: 'var(--rds-color-primary, #1976d2) !important',
          }),
          ...(isStart || isEnd ? {
            backgroundColor: 'var(--rds-color-primary, #2196F3) !important',
            color: 'var(--rds-color-on-primary, #fff) !important',
          } : {}),
        }}
      />
    );
  };

  const handlePrimaryCalendarChange = useCallback((newMonth: Dayjs | null) => {
    if (newMonth) {
      handleMonthChange(newMonth);
    }
  }, [handleMonthChange]);

  const handleSecondaryCalendarChange = useCallback((newMonth: Dayjs | null) => {
    if (newMonth) {
      handleMonthChange(newMonth.subtract(1, 'month'));
    }
  }, [handleMonthChange]);

  const handleSecondaryMonthChange = useCallback((newMonth: Dayjs) => {
    setCurrentMonth(newMonth.subtract(1, 'month'));
  }, []);

  const calendars = (
    <Box display="flex" gap={2}>
      <DateCalendarPanel
        value={currentMonth}
        onChange={handlePrimaryCalendarChange}
        onMonthChange={handleMonthChange}
        minDate={minDate}
        maxDate={maxDate}
        daySlot={RangeDaySlot}
      />
      {multiMonth && (
        <DateCalendarPanel
          value={currentMonth.add(1, 'month')}
          onChange={handleSecondaryCalendarChange}
          onMonthChange={handleSecondaryMonthChange}
          minDate={minDate}
          maxDate={maxDate}
          daySlot={RangeDaySlot}
        />
      )}
    </Box>
  );

  return calendars;
}

export function RangeTime({
  value,
  onChange,
  showSeconds,
  minTime,
  maxTime,
  size = 'medium',
}: {
  value: [Dayjs | null, Dayjs | null];
  onChange: (v: [Dayjs | null, Dayjs | null]) => void;
  showSeconds: boolean;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  size?: 'small' | 'medium';
}) {
  const [start, end] = value;

  const handleStartTimeChange = useCallback((newStart: Dayjs | null) => onChange([newStart, end]), [onChange, end]);
  const handleEndTimeChange = useCallback((newEnd: Dayjs | null) => onChange([start, newEnd]), [onChange, start]);

  const endMinTime = useMemo(() => (start ? start : minTime), [start, minTime]);
  const startMaxTime = useMemo(() => (end ? end : maxTime), [end, maxTime]);

  return (
    <Stack direction="row" spacing={2}>
      <Box flex={1}>
        <TimePicker
          label="Start Time"
          value={start}
          onChange={(newValue) => handleStartTimeChange(newValue as Dayjs | null)}
          ampm={true}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          minTime={minTime}
          maxTime={startMaxTime}
          slotProps={{
            textField: {
              size: size,
              fullWidth: true,
            },
          }}
        />
      </Box>
      <Box flex={1}>
        <TimePicker
          label="End Time"
          value={end}
          onChange={(newValue) => handleEndTimeChange(newValue as Dayjs | null)}
          ampm={true}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          minTime={endMinTime}
          maxTime={maxTime}
          slotProps={{
            textField: {
              size: size,
              fullWidth: true,
            },
          }}
        />
      </Box>
    </Stack>
  );
}

export function RangeDateTime(props: {
  value: [Dayjs | null, Dayjs | null];
  onChange: (v: [Dayjs | null, Dayjs | null]) => void;
  showSeconds: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  multiMonth?: boolean;
  size?: 'small' | 'medium';
}) {
  const { value, onChange, showSeconds, minDate, maxDate, minTime, maxTime, multiMonth, size } = props;
  return (
    <Stack direction="column" spacing={2}>
      <RangeCalendar value={value} onChange={onChange} minDate={minDate} maxDate={maxDate} multiMonth={multiMonth} />
      <RangeTime value={value} onChange={onChange} showSeconds={showSeconds} minTime={minTime} maxTime={maxTime} size={size} />
    </Stack>
  );
}

CustomDateRangeLayout.displayName = 'CustomDateRangeLayout';
RangeCalendar.displayName = 'RangeCalendar';
RangeTime.displayName = 'RangeTime';
RangeDateTime.displayName = 'RangeDateTime';
DateCalendarPanel.displayName = 'DateCalendarPanel';
