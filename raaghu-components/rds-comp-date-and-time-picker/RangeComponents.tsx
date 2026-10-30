import { useMemo, useState, type ComponentType, type ReactElement, type ReactNode, type Ref } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, type PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';

export interface DateRangePreset {
  key: string;
  label: string;
  getValue: () => [Dayjs | null, Dayjs | null];
}

const dateRangePresets: DateRangePreset[] = [
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

export const CustomDateRangeLayout = ({ ref, children, selectedPreset, onPresetSelect, rangeValue }: {
    children: ReactNode;
    selectedPreset: string;
    onPresetSelect: (preset: DateRangePreset) => void;
    rangeValue: [Dayjs | null, Dayjs | null];
    ref?: Ref<HTMLDivElement>;
}) => {
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
      
      <div className="rds-date-picker__calendar-panel">
        {children}
      </div>
    </div>
  );
};

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

export function RangeCalendar({
  value,
  onChange,
  minDate,
  maxDate,
  multiMonth,
}: {
  value: [Dayjs | null, Dayjs | null];
  onChange: (v: [Dayjs | null, Dayjs | null]) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  multiMonth?: boolean;
}) {
  const [draft, setDraft] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [currentMonth, setCurrentMonth] = useState(() => dayjs());
  const [prevValue0, setPrevValue0] = useState(value[0]?.valueOf());
  const [prevValue1, setPrevValue1] = useState(value[1]?.valueOf());
  if (value[0]?.valueOf() !== prevValue0 || value[1]?.valueOf() !== prevValue1) {
    setPrevValue0(value[0]?.valueOf());
    setPrevValue1(value[1]?.valueOf());
    setDraft(value);
    if (value[0]) {
      setCurrentMonth(value[0]);
    }
  }

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

  const handleMonthChange = (newMonth: Dayjs) => {
    setCurrentMonth(newMonth);
  };

  const RangeDaySlot: ComponentType<PickersDayProps> = (dayProps: PickersDayProps): ReactElement => {
    const day = dayProps.day as Dayjs;
    const [start, end] = draft;
    const inRange = isBetween(day, start, end);
    const isStart = isSameDay(day, start);
    const isEnd = isSameDay(day, end);
    return (
      <PickersDay
        {...dayProps}
        day={day}
        onClick={() => handleSelect(day)}
        className={[
          dayProps.className,
          inRange ? 'rds-date-picker__day--in-range' : '',
          (isStart || isEnd) ? 'rds-date-picker__day--range-end-point' : '',
        ].filter(Boolean).join(' ')}
      />
    );
  };

  const calendars = (
    <Box className="rds-date-picker__range-calendar-row">
      <DateCalendar
        value={currentMonth}
        onChange={(newMonth) => newMonth && handleMonthChange(newMonth as Dayjs)}
        onMonthChange={(newMonth) => setCurrentMonth(newMonth as Dayjs)}
        minDate={minDate}
        maxDate={maxDate}
        slots={{ day: RangeDaySlot }}
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
          onChange={(newMonth) => newMonth && handleMonthChange((newMonth as Dayjs).subtract(1, 'month'))}
          onMonthChange={(newMonth) => setCurrentMonth((newMonth as Dayjs).subtract(1, 'month'))}
          minDate={minDate}
          maxDate={maxDate}
          slots={{ day: RangeDaySlot }}
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
  
  const handleStartTimeChange = (newStart: Dayjs | Date | null) => {
    onChange([newStart as Dayjs | null, end]);
  };

  const handleEndTimeChange = (newEnd: Dayjs | Date | null) => {
    onChange([start, newEnd as Dayjs | null]);
  };

  const endMinTime = useMemo(() => {
    if (start) {
      return start; // Allow same time or later
    }
    return minTime;
  }, [start, minTime]);
  
  const startMaxTime = useMemo(() => {
    if (end) {
      return end; // Allow same time or earlier
    }
    return maxTime;
  }, [end, maxTime]);
  
  return (
    <div className="rds-date-picker__time-range-stack" data-testid="stack">
      <div className="rds-date-picker__time-range-item">
        <TimePicker
          label="Start Time"
          value={start}
          onChange={handleStartTimeChange}
          ampm={true}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          minTime={minTime}
          maxTime={startMaxTime} // Use end time as maximum for start time (allows same time)
          slotProps={{
            textField: {
              size: size,
              fullWidth: true,
            },
            popper: {
              placement: 'bottom-start',
              modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
            },
            desktopPaper: {
              className: 'rds-date-picker__picker-paper',
            },
          }}
        />
      </div>
      <div className="rds-date-picker__time-range-item">
        <TimePicker
          label="End Time"
          value={end}
          onChange={handleEndTimeChange}
          ampm={true}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          minTime={endMinTime} // Use start time as minimum for end time (allows same time)
          maxTime={maxTime}
          slotProps={{
            textField: {
              size: size,
              fullWidth: true,
            },
            popper: {
              placement: 'bottom-start',
              modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
            },
            desktopPaper: {
              className: 'rds-date-picker__picker-paper',
            },
          }}
        />
      </div>
    </div>
  );
}

export function RangeDateTime({
  value,
  onChange,
  showSeconds,
  minDate,
  maxDate,
  minTime,
  maxTime,
  multiMonth,
}: {
  value: [Dayjs | null, Dayjs | null];
  onChange: (v: [Dayjs | null, Dayjs | null]) => void;
  showSeconds: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  multiMonth?: boolean;
}) {
  const [start, end] = value;

  const handleStartTimeChange = (newStart: Dayjs | Date | null) => {
    onChange([newStart as Dayjs | null, end]);
  };

  const handleEndTimeChange = (newEnd: Dayjs | Date | null) => {
    onChange([start, newEnd as Dayjs | null]);
  };

  return (
    <Box className="rds-date-picker__range-datetime">
      <RangeCalendar value={value} onChange={onChange} minDate={minDate} maxDate={maxDate} multiMonth={multiMonth} />
      <Box className="rds-date-picker__range-datetime-divider" />
      <Box>
        <Box className="rds-date-picker__range-datetime-time-label">Start Time</Box>
        <TimeClock
          value={start}
          onChange={handleStartTimeChange}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          ampm
          minTime={minTime}
          maxTime={end ?? maxTime}
        />
      </Box>
      <Box className="rds-date-picker__range-datetime-spacer" />
      <Box>
        <Box className="rds-date-picker__range-datetime-time-label">End Time</Box>
        <TimeClock
          value={end}
          onChange={handleEndTimeChange}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          ampm
          minTime={start ?? minTime}
          maxTime={maxTime}
        />
      </Box>
    </Box>
  );
}
