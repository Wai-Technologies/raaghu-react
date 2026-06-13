import { useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import './rds-comp-date-and-time-picker.scss';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import './rds-comp-date-and-time-picker.scss';

import {
  DateRangePreset,
  formatRangeText,
  CustomDateRangeLayout,
  RangeCalendar,
  RangeTime,
  RangeDateTime,
} from './RangeComponents';

export interface RdsCompDatePickerProps {
  variant?: 'date' | 'time' | 'datetime' | 'daterange' | 'timerange' | 'datetimerange';
  layout?: 'Default' | 'Year Picker' | 'Month Picker' | 'Multi Month';
  label?: string;
  value?: Dayjs | null | [Dayjs | null, Dayjs | null];
  onChange?: (value: Dayjs | null | [Dayjs | null, Dayjs | null]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  format?: string;
  className?: string;
  size?: 'small' | 'medium';
  slotProps?: {
    textField?: {
      InputLabelProps?: Record<string, unknown>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  state?: 'default' | 'expanded' | 'selected';
  changeIcon?: 'dashboard-settings' | 'date-picker';
  style?: 'default' | 'custom';
  type?: 'dropdown' | 'selector';
  showSeconds?: boolean; // New prop to control seconds display
  isRequired?: boolean; // New prop to show required indicator
}

interface DateRangePreset {
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

// Custom Layout Component for Date Range Picker with Presets
const CustomDateRangeLayout = React.forwardRef<
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
      {/* Preset Options Panel */}
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
      
      {/* Calendar/Content Panel */}
      <div className="rds-date-picker__calendar-panel">
        {children}
      </div>
    </div>
  );
});

// Utility helpers
const formatRangeText = (
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

function RangeCalendar({
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
  const [draft, setDraft] = React.useState<[Dayjs | null, Dayjs | null]>(value);
  
  // Add state for current month being viewed
  const [currentMonth, setCurrentMonth] = React.useState(
    draft[0] || dayjs()
  );
  
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

  // Handle month navigation
  const handleMonthChange = (newMonth: Dayjs) => {
    setCurrentMonth(newMonth);
  };

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
        onChange={(newMonth) => newMonth && handleMonthChange(newMonth)}
        onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
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
          onChange={(newMonth) => newMonth && handleMonthChange(newMonth.subtract(1, 'month'))}
          onMonthChange={(newMonth) => setCurrentMonth(newMonth.subtract(1, 'month'))}
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

function RangeTime({
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
  
  // Handle start time change with validation
  const handleStartTimeChange = (newStart: Dayjs | null) => {
    onChange([newStart, end]);
  };
  
  // Handle end time change with validation
  const handleEndTimeChange = (newEnd: Dayjs | null) => {
    onChange([start, newEnd]);
  };
  
  // Calculate dynamic minTime for end time picker based on start time
  // Allow selecting the same time or any time after start time
  const endMinTime = React.useMemo(() => {
    if (start) {
      return start; // Allow same time or later
    }
    return minTime;
  }, [start, minTime]);
  
  // Calculate dynamic maxTime for start time picker based on end time
  // Allow selecting the same time or any time before end time
  const startMaxTime = React.useMemo(() => {
    if (end) {
      return end; // Allow same time or earlier
    }
    return maxTime;
  }, [end, maxTime]);
  
  return (
    <div className="rds-date-picker__time-range-stack">
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

function SingleDateTime({
  value,
  onChange,
  showSeconds,
  minDate,
  maxDate,
  minTime,
  maxTime,
}: {
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  showSeconds: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
}) {
  const handleTimeChange = (newTime: Dayjs | null) => {
    onChange(newTime);
  };

  return (
    <Box className="rds-date-picker__range-datetime">
      <DateCalendar
        value={value}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        displayWeekNumber
        slotProps={{
          calendarHeader: {
            format: 'MMMM YYYY',
          },
        }}
      />
      <Box className="rds-date-picker__range-datetime-divider" />
      <Box>
        <Box className="rds-date-picker__range-datetime-time-label">Time</Box>
        <MultiSectionDigitalClock
          value={value}
          onChange={handleTimeChange}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          ampm
          minTime={minTime}
          maxTime={maxTime}
        />
      </Box>
    </Box>
  );
}

function RangeDateTime({
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

  const handleStartTimeChange = (newStart: Dayjs | null) => {
    onChange([newStart, end]);
  };

  const handleEndTimeChange = (newEnd: Dayjs | null) => {
    onChange([start, newEnd]);
  };

  return (
    <Box className="rds-date-picker__range-datetime">
      <RangeCalendar value={value} onChange={onChange} minDate={minDate} maxDate={maxDate} multiMonth={multiMonth} />
      <Box className="rds-date-picker__range-datetime-divider" />
      <Box>
        <Box className="rds-date-picker__range-datetime-time-label">Start Time</Box>
        <MultiSectionDigitalClock
          value={start}
          onChange={handleStartTimeChange}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          ampm
          minTime={minTime}
          maxTime={end ?? maxTime}
        />
      </Box>
      <Box className="rds-date-picker__range-datetime-spacer" />
      <Box>
        <Box className="rds-date-picker__range-datetime-time-label">End Time</Box>
        <MultiSectionDigitalClock
          value={end}
          onChange={handleEndTimeChange}
          views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
          timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          ampm
          minTime={start ?? minTime}
          maxTime={maxTime}
        />
      </Box>
    </Box>
  );
}

export default function RdsCompDatePicker({
  variant = 'date',
  layout = 'Default',
  label,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  error = false,
  helperText,
  placeholder,
  minDate,
  maxDate,
  minTime,
  maxTime,
  format,
  className,
  size = 'medium',
  slotProps,
  style = 'default',
  showSeconds = true,
  isRequired = false,
}: RdsCompDatePickerProps) {
  // State management
  const [dateValue, setDateValue] = useState<Dayjs | null>(
    Array.isArray(value) ? value[0] : (value as Dayjs | null) || null
  );
  const [rangeValue, setRangeValue] = useState<[Dayjs | null, Dayjs | null]>(
    Array.isArray(value) ? value : [null, null]
  );

  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset: DateRangePreset) => {
    setSelectedPreset(preset.key);
    if (preset.key !== 'custom') {
      const newRange = preset.getValue();
      setRangeValue(newRange);
      onChange?.(newRange);
    }
  }, [onChange]);

  // Event handlers
  const handleDateChange = useCallback((newValue: Dayjs | Date | null) => {
    const normalizedValue =
      newValue === null ? null : dayjs.isDayjs(newValue) ? newValue : dayjs(newValue);
    setDateValue(normalizedValue);
    onChange?.(normalizedValue);
  }, [onChange]);

  const handleRangeChange = useCallback((newValue: [Dayjs | null, Dayjs | null]) => {
    setRangeValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  // Format label with required indicator
  const formattedLabel = useMemo(() => {
    if (!label) return undefined;
    return isRequired ? (
      <span className="rds-date-picker__label">
        <span className="rds-date-picker__label-text">{label}</span>
        <span className="rds-date-picker__required-indicator" aria-label="required">*</span>
      </span>
    ) : label;
  }, [label, isRequired]);

  // Common props for all pickers
  const baseProps = useMemo(() => ({
    disabled,
    readOnly,
    size,
    minDate,
    maxDate,
    slotProps: {
      textField: {
        error,
        label: formattedLabel,
        placeholder: placeholder,
        fullWidth: false,
        size,
        required: isRequired,
        className: `rds-date-picker__input ${disabled ? 'rds-date-picker__input--disabled' : ''} ${readOnly ? 'rds-date-picker__input--readonly' : ''} ${isRequired ? 'rds-date-picker__input--required' : ''}`,
        InputLabelProps: {
          ...(isRequired && { 
            disableAnimation: false,
            shrink: undefined,
          }),
          ...slotProps?.textField?.InputLabelProps,
        },
        ...slotProps?.textField,
      },
      day: {
        className: 'rds-date-picker__day',
      },
      ...slotProps,
    },
  }), [disabled, readOnly, size, minDate, maxDate, error, formattedLabel, placeholder, isRequired, slotProps]);

  // Props specific to single value pickers
  const singlePickerProps = useMemo(() => ({
    ...baseProps,
    value: dateValue,
    onChange: handleDateChange,
    minTime,
    maxTime,
    format,
  }), [baseProps, dateValue, handleDateChange, minTime, maxTime, format]);

  // Custom combined field for range variants
  const handleRangeFieldOpen = useCallback((anchor: HTMLElement) => {
    if (!disabled) {
      setAnchorEl(anchor);
    }
  }, [disabled]);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleClearRange = useCallback(() => {
    setRangeValue([null, null]);
    onChange?.([null, null]);
  }, [onChange]);

  const renderRangeField = useCallback(() => {
    const rangeVariant =
      variant === 'daterange' || variant === 'timerange' || variant === 'datetimerange'
        ? variant
        : 'daterange';
    const inputValue = formatRangeText(rangeVariant, rangeValue, showSeconds);
    const isMultiMonth = layout === 'Multi Month';

    return (
      <>
        <TextField
          onClick={(e) => handleRangeFieldOpen(e.currentTarget as HTMLElement)}
          value={inputValue}
          placeholder={placeholder}
          label={formattedLabel}
          size={size}
          fullWidth
          disabled={disabled}
          InputProps={{ readOnly: true, style: { cursor: disabled ? 'default' : 'pointer' },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="open calendar"
                  edge="end"
                  size={size === 'small' ? 'small' : 'medium'}
                  onClick={(e) => { e.stopPropagation(); handleRangeFieldOpen(e.currentTarget as HTMLElement); }}
                  disabled={disabled || readOnly}
                >
                  <EventIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={error}
          className={clsx(
            "rds-date-picker__input",
            disabled && "rds-date-picker__input--disabled",
            readOnly && "rds-date-picker__input--readonly",
            isRequired && "rds-date-picker__input--required"
          )}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className="MuiPickersPopper-root"
          marginThreshold={8}
          slotProps={{ paper: { className: 'rds-date-picker__popover-paper-gap' } }}
        >
          <Paper elevation={3} className="rds-date-picker__range-paper">
            {style === 'custom' && variant === 'daterange' ? (
              <CustomDateRangeLayout
                selectedPreset={selectedPreset}
                onPresetSelect={handlePresetSelect}
                rangeValue={rangeValue}
              >
                <RangeCalendar
                  value={rangeValue}
                  onChange={handleRangeChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  multiMonth={isMultiMonth}
                />
              </CustomDateRangeLayout>
            ) : (
              <>
                {(variant === 'daterange' || (variant === 'date' && layout === 'Multi Month')) && (
                  <RangeCalendar
                    value={rangeValue}
                    onChange={handleRangeChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    multiMonth={isMultiMonth}
                  />
                )}
                {variant === 'timerange' && (
                  <RangeTime
                    value={rangeValue}
                    onChange={handleRangeChange}
                    showSeconds={showSeconds}
                    minTime={minTime}
                    maxTime={maxTime}
                    size={size}
                  />
                )}
                {variant === 'datetimerange' && (
                  <RangeDateTime
                    value={rangeValue}
                    onChange={handleRangeChange}
                    showSeconds={showSeconds}
                    minDate={minDate}
                    maxDate={maxDate}
                    minTime={minTime}
                    maxTime={maxTime}
                    multiMonth={isMultiMonth}
                  />
                )}
              </>
            )}
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <RdsButton style="transparent" size="small" text="Clear" onClick={handleClearRange} />
              <RdsButton style="filled" size="small" text="Apply" onClick={handleClosePopover} />
            </Box>
          </Paper>
        </Popover>
      </>
    );
  }, [
    variant, rangeValue, showSeconds, layout, placeholder, formattedLabel, size, disabled, readOnly, error, isRequired,
    anchorEl, style, selectedPreset, minDate, maxDate, minTime, maxTime, handleRangeFieldOpen, handleClosePopover,
    handlePresetSelect, handleRangeChange, handleClearRange,
  ]);

  // Get the appropriate picker component
  const getDatePickerByLayout = useCallback(() => {
    switch (layout) {
      case 'Year Picker':
        return (
          <DatePicker
            {...singlePickerProps}
            format={format || 'YYYY'}
            views={['year']}
          />
        );
      
      case 'Month Picker':
        return (
          <DatePicker
            {...singlePickerProps}
            format={format || 'MMMM'}
            views={['month']}
          />
        );
      
      case 'Multi Month':
        // Use range field with two calendars to mimic multi-month range selection
        return renderRangeField();
      
      case 'Default':
      default:
        return (
          <DatePicker
            {...singlePickerProps}
            views={['year', 'month', 'day']}
            openTo="day"
            displayWeekNumber
            slotProps={{
              ...singlePickerProps.slotProps,
              calendarHeader: {
                format: 'MMMM YYYY',
              },
            }}
          />
        );
    }
  }, [layout, singlePickerProps, format, renderRangeField]);

  // Get the appropriate picker component
  const getPickerComponent = useCallback(() => {
    switch (variant) {
      case 'time':
        return (
          <DatePicker
            {...singlePickerProps}
            format={format || (showSeconds ? 'HH:mm:ss a' : 'HH:mm a')}
            views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
            ampm={true}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          />
        );

      case 'datetime':
        return (
          <DateTimePicker
            {...singlePickerProps}
            format={format || (showSeconds ? 'MM/DD/YYYY HH:mm:ss a' : 'MM/DD/YYYY HH:mm a')}
            ampm={true}
            views={showSeconds ? ['year', 'month', 'day', 'hours', 'minutes', 'seconds'] : ['year', 'month', 'day', 'hours', 'minutes']}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            displayWeekNumber
            slotProps={{
              ...singlePickerProps.slotProps,
              calendarHeader: {
                format: 'MMMM YYYY',
              },
              day: {
                ...singlePickerProps.slotProps?.day,
              },
            }}
          />
        );

      case 'timerange':
        return (
          <RangeTime
            value={rangeValue}
            onChange={handleRangeChange}
            showSeconds={showSeconds}
            minTime={minTime}
            maxTime={maxTime}
            size={size}
          />
        );

      case 'daterange':
        return renderRangeField();

      case 'datetimerange':
        return renderRangeField();

      case 'date':
      default:
        return getDatePickerByLayout();
    }
  }, [variant, singlePickerProps, showSeconds, format, rangeValue, minTime, maxTime, size, handleRangeChange, renderRangeField, getDatePickerByLayout]);

  const containerClasses = clsx(
    'rds-date-picker',
    disabled && 'rds-date-picker--disabled',
    readOnly && 'rds-date-picker--readonly',
    error && 'rds-date-picker--error',
    isRequired && 'rds-date-picker--required',
    variant === 'datetimerange' && 'rds-date-picker--datetimerange',
    variant === 'timerange' && 'rds-date-picker--timerange',
    variant === 'daterange' && 'rds-date-picker--daterange',
    variant === 'datetime' && 'rds-date-picker--datetime',
    variant === 'time' && 'rds-date-picker--time',
    variant === 'date' && 'rds-date-picker--date',
    layout === 'Multi Month' && 'rds-date-picker--multi-month',
    layout === 'Year Picker' && 'rds-date-picker--year-picker',
    layout === 'Month Picker' && 'rds-date-picker--month-picker',
    size === 'small' && 'rds-date-picker--small',
    size === 'medium' && 'rds-date-picker--medium',
    className
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={containerClasses}>
        <div className="rds-date-picker__field-wrapper">
          {getPickerComponent()}
          {helperText ? <div className="rds-date-picker__helper">{helperText}</div> : null}
        </div>
      </div>
    </LocalizationProvider>
  );
}

type DemoValues = {
  date: Dayjs;
  time: Dayjs;
  datetime: Dayjs;
  year: Dayjs;
  month: Dayjs;
  daterange: [Dayjs | null, Dayjs | null];
  timerange: [Dayjs | null, Dayjs | null];
  datetimerange: [Dayjs | null, Dayjs | null];
  multimonth: [Dayjs | null, Dayjs | null];
};

type DemoConfig = {
  label: string;
  variant: RdsCompDatePickerProps['variant'];
  layout?: RdsCompDatePickerProps['layout'];
  valueKey: keyof DemoValues;
  style?: RdsCompDatePickerProps['style'];
  showSeconds?: boolean;
  isRequired?: boolean;
};

const DEMO_CONFIGS: DemoConfig[] = [
  { label: 'Date Picker (Default)', variant: 'date', layout: 'Default', valueKey: 'date' },
  { label: 'Date Picker (Required)', variant: 'date', layout: 'Default', valueKey: 'date', isRequired: true },
  { label: 'Year Picker', variant: 'date', layout: 'Year Picker', valueKey: 'year' },
  { label: 'Month Picker', variant: 'date', layout: 'Month Picker', valueKey: 'month' },
  { label: 'Multi Month', variant: 'date', layout: 'Multi Month', valueKey: 'multimonth' },
  { label: 'Time Picker (with seconds)', variant: 'time', layout: undefined, valueKey: 'time', showSeconds: true },
  { label: 'Date Time Picker (without seconds)', variant: 'datetime', layout: undefined, valueKey: 'datetime', showSeconds: false },
  { label: 'Date Range Picker', variant: 'daterange', layout: undefined, valueKey: 'daterange' },
  { label: 'Custom Date Range Picker', variant: 'daterange', layout: undefined, valueKey: 'daterange', style: 'custom' },
  { label: 'Time Range Picker (with seconds)', variant: 'timerange', layout: undefined, valueKey: 'timerange', showSeconds: true },
  { label: 'Date Time Range Picker (with seconds)', variant: 'datetimerange', layout: undefined, valueKey: 'datetimerange', showSeconds: true },
];

// Demo component showing all variants
export function DatePickerDemo() {
  const [values, setValues] = useState<DemoValues>({
    date: dayjs(),
    time: dayjs(),
    datetime: dayjs(),
    year: dayjs(),
    month: dayjs(),
    daterange: [dayjs(), dayjs().add(7, 'day')],
    timerange: [dayjs().hour(9).minute(0), dayjs().hour(17).minute(0)],
    datetimerange: [dayjs(), dayjs().add(3, 'day')],
    multimonth: [dayjs(), dayjs().add(7, 'day')],
  });

  const handleChange = (key: keyof DemoValues) => (value: Dayjs | null | [Dayjs | null, Dayjs | null]) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const demos = DEMO_CONFIGS;

  // Define a default minDate for demo purposes
  const minDate = dayjs().subtract(1, 'year');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker', 
          'DateTimePicker',
          'DateRangePicker',
          'TimeRangePicker',
          'DateTimeRangePicker',
        ]}
      >
        <h6 className="rds-date-picker__demo-title">
          Date Picker Components
        </h6>
        
        {demos.map(({ label, variant, layout, valueKey, style, showSeconds, isRequired }) => (
          <DemoItem key={`${valueKey}-${style || 'default'}-${showSeconds || 'default'}-${isRequired || 'false'}`} label={label}>
            <RdsCompDatePicker
              variant={variant}
              layout={layout}
              value={values[valueKey]}
              onChange={handleChange(valueKey)}
              style={style}
              showSeconds={showSeconds}
              isRequired={isRequired}
              label={isRequired ? 'Required Field' : 'Optional Field'}
            />
          </DemoItem>
        ))}
      </DemoContainer>
    </LocalizationProvider>
  );
}

DatePickerDemo.displayName = 'DatePickerDemo';
RdsCompDatePicker.displayName = 'RdsCompDatePicker';
