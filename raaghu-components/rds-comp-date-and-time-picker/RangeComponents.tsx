import * as React from 'react';
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

export const CustomDateRangeLayout = React.forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
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
                className={`rds-date-picker__preset-button ${
                  selectedPreset === preset.key ? 'rds-date-picker__preset-button--selected' : ''
                }`}
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
  const [draft, setDraft] = React.useState<[Dayjs | null, Dayjs | null]>(value);
  const [currentMonth, setCurrentMonth] = React.useState(draft[0] || dayjs());

  React.useEffect(() => setDraft(value), [value[0]?.valueOf(), value[1]?.valueOf()]);

  const handleSelect = (day: Dayjs) => {
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
  };

  const handleMonthChange = (newMonth: Dayjs) => setCurrentMonth(newMonth);

  const renderDaySlot = (dayProps: any) => {
    const day = dayProps.day as Dayjs;
    const [start, end] = draft;
    const inRange = isBetween(day, start, end);
    const isStart = isSameDay(day, start);
    const isEnd = isSameDay(day, end);
    return (
      <PickersDay
        {...dayProps}
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

  const calendars = (
    <Box display="flex" gap={2}>
      <DateCalendar
        value={currentMonth}
        onChange={(newMonth: any) => newMonth && handleMonthChange(newMonth as Dayjs)}
        onMonthChange={(newMonth: any) => setCurrentMonth(newMonth as Dayjs)}
        minDate={minDate}
        maxDate={maxDate}
        slots={{ day: renderDaySlot }}
        views={['year', 'month', 'day']}
        displayWeekNumber
        slotProps={{
          calendarHeader: {
            format: 'MMMM YYYY',
          },
        }}
      />
      {multiMonth && (
        <DateCalendar
          value={currentMonth.add(1, 'month')}
          onChange={(newMonth: any) => newMonth && handleMonthChange((newMonth as Dayjs).subtract(1, 'month'))}
          onMonthChange={(newMonth: any) => setCurrentMonth((newMonth as Dayjs).subtract(1, 'month'))}
          minDate={minDate}
          maxDate={maxDate}
          slots={{ day: renderDaySlot }}
          views={['year', 'month', 'day']}
          displayWeekNumber
          slotProps={{
            calendarHeader: {
              format: 'MMMM YYYY',
            },
          }}
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

  const handleStartTimeChange = (newStart: Dayjs | null) => onChange([newStart, end]);
  const handleEndTimeChange = (newEnd: Dayjs | null) => onChange([start, newEnd]);

  const endMinTime = React.useMemo(() => (start ? start : minTime), [start, minTime]);
  const startMaxTime = React.useMemo(() => (end ? end : maxTime), [end, maxTime]);

  return (
    <Stack direction="row" spacing={2}>
      <Box flex={1}>
        <TimePicker
          label="Start Time"
          value={start}
          onChange={handleStartTimeChange as any}
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
          onChange={handleEndTimeChange as any}
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
