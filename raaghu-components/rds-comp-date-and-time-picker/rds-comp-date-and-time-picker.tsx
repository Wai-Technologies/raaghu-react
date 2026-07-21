import * as React from 'react';
import './rds-comp-date-and-time-picker.scss';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateRangePreset, RangeTime } from './RangeComponents';
import { RangeFieldRenderer, DateTimeFieldRenderer } from './date-picker-field-helpers';

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
  slotProps?: Record<string, Record<string, unknown>>;
  state?: 'default' | 'expanded' | 'selected';
  changeIcon?: 'dashboard-settings' | 'date-picker';
  style?: 'default' | 'custom';
  type?: 'dropdown' | 'selector';
  showSeconds?: boolean; // New prop to control seconds display
  isRequired?: boolean; // New prop to show required indicator
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
  const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    Array.isArray(value) ? value[0] : (value as Dayjs | null) || null
  );
  const [rangeValue, setRangeValue] = React.useState<[Dayjs | null, Dayjs | null]>(
    Array.isArray(value) ? value : [null, null]
  );

  const [selectedPreset, setSelectedPreset] = React.useState<string>('custom');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const inputContainerRef = React.useRef<HTMLDivElement>(null);
  const datetimeRef = React.useRef<HTMLDivElement>(null);

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
        fullWidth: false,
        size,
        required: isRequired,
        className: `rds-date-picker__input ${disabled ? 'rds-date-picker__input--disabled' : ''} ${readOnly ? 'rds-date-picker__input--readonly' : ''} ${isRequired ? 'rds-date-picker__input--required' : ''}`,
        InputLabelProps: {
          ...(isRequired && { 
            disableAnimation: false,
            shrink: undefined,
          }),
          ...((slotProps?.textField?.InputLabelProps as object) ?? {}),
        },
        ...slotProps?.textField,
      },
      day: {
        className: 'rds-date-picker__day',
      },
      ...slotProps,
      popper: {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
          ...((slotProps?.popper?.modifiers as unknown[]) ?? []),
        ],
        ...slotProps?.popper,
      },
      desktopPaper: {
        className: 'rds-date-picker__picker-paper',
        ...slotProps?.desktopPaper,
      },
    },
  };

  // Props specific to single value pickers
   
  const singlePickerProps: Record<string, unknown> = {
    ...baseProps,
    value: dateValue,
    onChange: handleDateChange,
    minTime,
    maxTime,
    format,
  };

  const rangeField = (
    <RangeFieldRenderer
      variant={variant}
      layout={layout}
      rangeValue={rangeValue}
      showSeconds={showSeconds}
      placeholder={placeholder}
      formattedLabel={formattedLabel}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      isRequired={isRequired}
      style={style}
      minDate={minDate}
      maxDate={maxDate}
      minTime={minTime}
      maxTime={maxTime}
      selectedPreset={selectedPreset}
      anchorEl={anchorEl}
      inputContainerRef={inputContainerRef}
      onOpen={setAnchorEl}
      onClose={() => setAnchorEl(null)}
      onRangeChange={handleRangeChange}
      onPresetSelect={handlePresetSelect}
      onChange={onChange}
    />
  );

  const dateTimeField = (
    <DateTimeFieldRenderer
      dateValue={dateValue}
      showSeconds={showSeconds}
      format={format}
      placeholder={placeholder}
      formattedLabel={formattedLabel}
      helperText={helperText}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      isRequired={isRequired}
      minDate={minDate}
      maxDate={maxDate}
      minTime={minTime}
      maxTime={maxTime}
      anchorEl={anchorEl}
      datetimeRef={datetimeRef}
      onOpen={setAnchorEl}
      onClose={() => setAnchorEl(null)}
      onDateTimeChange={handleDateChange}
      onChange={onChange}
    />
  );

  const getPickerComponent = () => {
    switch (variant) {
      case 'time':
        return (
          <TimePicker
            {...singlePickerProps}
            format={format || (showSeconds ? 'hh:mm:ss a' : 'hh:mm a')}
            views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
            ampm={true}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
          />
        );

      case 'datetime':
        return dateTimeField;

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
        return rangeField;

      case 'datetimerange':
        return rangeField;

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
            key="year-picker"
            {...singlePickerProps}
            format={format || 'YYYY'}
            views={['year']}
            openTo="year"
            slots={{ actionBar: () => null }}
            slotProps={{
              ...((singlePickerProps.slotProps as object) ?? {}),
              desktopPaper: {
                className: 'rds-date-picker__picker-paper rds-date-picker__year-picker-paper',
              },
            }}
          />
        );
      
      case 'Month Picker':
        return (
          <DatePicker
            key="month-picker"
            {...singlePickerProps}
            format={format || 'MMMM YYYY'}
            views={['year', 'month']}
            openTo="month"
            slots={{ actionBar: () => null }}
            slotProps={{
              ...((singlePickerProps.slotProps as object) ?? {}),
              desktopPaper: {
                className: 'rds-date-picker__picker-paper rds-date-picker__month-picker-paper',
              },
            }}
          />
        );
      
      case 'Multi Month':
        return rangeField;
      
      case 'Default':
      default:
        return (
          <DatePicker
            key="default-picker"
            {...singlePickerProps}
            views={['year', 'month', 'day']}
            openTo="day"
            displayWeekNumber
            slotProps={{
              ...((singlePickerProps.slotProps as object) ?? {}),
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

  const handleChange = (key: string) => (value: unknown) => {
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
