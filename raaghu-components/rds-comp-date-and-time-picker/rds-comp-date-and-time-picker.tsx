import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import Stack from '@mui/material/Stack';
import './rds-comp-date-and-time-picker.scss';

import {
  DateRangePreset,
  dateRangePresets,
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
  slotProps?: Record<string, any>;
  state?: 'default' | 'expanded' | 'selected';
  changeIcon?: 'dashboard-settings' | 'date-picker';
  style?: 'default' | 'custom';
  type?: 'dropdown' | 'selector';
  showSeconds?: boolean;
  isRequired?: boolean;
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
  // Determine if we need range values
  const isRangeVariant = variant.includes('range') || layout === 'Multi Month';

  // State management
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    Array.isArray(value) ? value[0] : (value as Dayjs | null) || null
  );
  const [rangeValue, setRangeValue] = React.useState<[Dayjs | null, Dayjs | null]>(
    Array.isArray(value) ? value : [null, null]
  );

  const [selectedPreset, setSelectedPreset] = React.useState<string>('custom');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  // Handle preset selection
  const handlePresetSelect = (preset: DateRangePreset) => {
    setSelectedPreset(preset.key);
    if (preset.key !== 'custom') {
      const newRange = preset.getValue();
      setRangeValue(newRange);
      onChange?.(newRange);
    }
  };

  // Event handlers
  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
    onChange?.(newValue);
  };

  const handleRangeChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    setRangeValue(newValue);
    onChange?.(newValue);
  };

  // Format label with required indicator
  const formattedLabel = React.useMemo(() => {
    if (!label) return undefined;
    return isRequired ? (
      <span className="rds-date-picker__label">
        <span className="rds-date-picker__label-text">{label}</span>
        <span className="rds-date-picker__required-indicator" aria-label="required">*</span>
      </span>
    ) : label;
  }, [label, isRequired]);

  // Common props for all pickers
  const baseProps = {
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
        fullWidth: true,
        size,
        required: isRequired,
        className: `rds-date-picker__input ${disabled ? 'rds-date-picker__input--disabled' : ''} ${readOnly ? 'rds-date-picker__input--readonly' : ''} ${isRequired ? 'rds-date-picker__input--required' : ''}`,
        InputLabelProps: {
          ...(isRequired && { 
            disableAnimation: false,
            shrink: undefined,
            sx: {
              '&::after': {
                content: '""',
                display: 'none !important'
              },
              '& .MuiFormLabel-asterisk': {
                display: 'none !important'
              }
            }
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
  };

  // Props specific to single value pickers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const singlePickerProps: any = {
    ...baseProps,
    value: dateValue,
    onChange: handleDateChange,
    minTime,
    maxTime,
    format,
  };

  // Custom combined field for range variants
  const renderRangeField = () => {
    const inputValue = formatRangeText(variant as any, rangeValue, showSeconds);
    const isMultiMonth = layout === 'Multi Month';

    return (
      <>
        <TextField
          onClick={(e) => { if (!disabled) setAnchorEl(e.currentTarget as HTMLElement); }}
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
                  aria-label="Draw"
                  edge="end"
                  size={size === 'small' ? 'small' : 'medium'}
                  onClick={(e) => { e.stopPropagation(); if (!disabled) setAnchorEl(e.currentTarget as HTMLElement); }}
                  disabled={disabled || readOnly}
                  aria-label="open calendar"
                >
                  <EventIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={error}
          className={`rds-date-picker__input ${disabled ? 'rds-date-picker__input--disabled' : ''} ${readOnly ? 'rds-date-picker__input--readonly' : ''} ${isRequired ? 'rds-date-picker__input--required' : ''}`}
        />
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          className="MuiPickersPopper-root"
        >
          <Paper elevation={3} sx={{ p: 2 }}>
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
                {variant === 'daterange' && (
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
                    size={size}
                  />
                )}
              </>
            )}
            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <RdsButton style="transparent" size="small" text="Clear" onClick={() => { setRangeValue([null, null]); onChange?.([null, null]); }} />
              <RdsButton style="filled" size="small" text="Apply" onClick={() => setAnchorEl(null)} />
            </Box>
          </Paper>
        </Popover>
      </>
    );
  };

  // Get the appropriate picker component
  const getPickerComponent = () => {
    switch (variant) {
      case 'time':
        return (
          <TimePicker
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
  };

  // Handle different layouts for date picker
  const getDatePickerByLayout = () => {
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
  };

  const containerClasses = [
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
    className,
  ].filter(Boolean).join(' ');

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

// Demo component showing all variants
export function DatePickerDemo() {
  const [values, setValues] = React.useState({
    date: dayjs(),
    time: dayjs(),
    datetime: dayjs(),
    year: dayjs(),
    month: dayjs(),
    daterange: [dayjs(), dayjs().add(7, 'day')] as [Dayjs | null, Dayjs | null],
    timerange: [dayjs().hour(9).minute(0), dayjs().hour(17).minute(0)] as [Dayjs | null, Dayjs | null],
    datetimerange: [dayjs(), dayjs().add(3, 'day')] as [Dayjs | null, Dayjs | null],
    multimonth: [dayjs(), dayjs().add(7, 'day')] as [Dayjs | null, Dayjs | null],
  });

  const handleChange = (key: string) => (value: any) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const demos = [
    { label: 'Date Picker (Default)', variant: 'date', layout: 'Default', valueKey: 'date' },
    { label: 'Date Picker (Required)', variant: 'date', layout: 'Default', valueKey: 'date', isRequired: true },
    { label: 'Year Picker', variant: 'date', layout: 'Year Picker', valueKey: 'year' },
    { label: 'Month Picker', variant: 'date', layout: 'Month Picker', valueKey: 'month' },
    { label: 'Multi Month', variant: 'date', layout: 'Multi Month', valueKey: 'multimonth' },
    { label: 'Time Picker (with seconds)', variant: 'time', valueKey: 'time', showSeconds: true },
    { label: 'Date Time Picker (without seconds)', variant: 'datetime', valueKey: 'datetime', showSeconds: false },
    { label: 'Date Range Picker', variant: 'daterange', valueKey: 'daterange' },
    { label: 'Custom Date Range Picker', variant: 'daterange', valueKey: 'daterange', style: 'custom' },
    { label: 'Time Range Picker (with seconds)', variant: 'timerange', valueKey: 'timerange', showSeconds: true },
    { label: 'Date Time Range Picker (with seconds)', variant: 'datetimerange', valueKey: 'datetimerange', showSeconds: true },
  ];

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
              variant={variant as any}
              layout={layout as any}
              value={values[valueKey as keyof typeof values]}
              onChange={handleChange(valueKey)}
              style={style as any}
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
