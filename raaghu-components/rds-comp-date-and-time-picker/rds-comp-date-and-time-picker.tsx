import { useState, useMemo, useCallback, type CSSProperties } from 'react';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import './rds-comp-date-and-time-picker.scss';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';

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
  /** MUI system styles applied to the date picker root. */
  sx?: SxProps<Theme>;
  size?: 'small' | 'medium';
  slotProps?: {
    textField?: {
      slotProps?: {
        inputLabel?: Record<string, unknown>;
      };
      /** @deprecated Use slotProps.textField.slotProps.inputLabel */
      InputLabelProps?: Record<string, unknown>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  changeIcon?: 'dashboard-settings' | 'date-picker';
  /** Picker appearance. */
  appearance?: 'default' | 'custom';
  /** @deprecated Passing a variant string is deprecated; use `appearance`. Pass CSSProperties for inline styles. */
  style?: 'default' | 'custom' | CSSProperties;
  type?: 'dropdown' | 'selector';
  showSeconds?: boolean;
  /** Shows the required indicator. */
  required?: boolean;
  /** @deprecated Use `required` instead. */
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
  sx,
  size = 'medium',
  slotProps,
  appearance,
  style: styleProp,
  showSeconds = true,
  required,
  isRequired: legacyRequired,
}: RdsCompDatePickerProps) {
  if (legacyRequired !== undefined) warnDeprecatedProp('RdsCompDatePicker', 'isRequired', '`required`');
  const legacyStyle = typeof styleProp === 'string' ? styleProp : undefined;
  if (legacyStyle !== undefined) warnDeprecatedProp('RdsCompDatePicker', 'style', '`appearance`');
  const style = appearance ?? legacyStyle ?? 'default';
  const isRequired = required ?? legacyRequired ?? false;
  const [dateValue, setDateValue] = useState<Dayjs | null>(
    Array.isArray(value) ? value[0] : (value as Dayjs | null) || null
  );
  const [rangeValue, setRangeValue] = useState<[Dayjs | null, Dayjs | null]>(
    Array.isArray(value) ? value : [null, null]
  );

  const [selectedPreset, setSelectedPreset] = useState<string>('custom');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePresetSelect = useCallback((preset: DateRangePreset) => {
    setSelectedPreset(preset.key);
    if (preset.key !== 'custom') {
      const newRange = preset.getValue();
      setRangeValue(newRange);
      onChange?.(newRange);
    }
  }, [onChange]);

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

  const formattedLabel = useMemo(() => {
    if (!label) return undefined;
    return isRequired ? (
      <span className="rds-date-picker__label">
        <span className="rds-date-picker__label-text">{label}</span>
        <span className="rds-date-picker__required-indicator" aria-label="required">*</span>
      </span>
    ) : label;
  }, [label, isRequired]);

  const baseProps = useMemo(() => {
    const {
      InputLabelProps: legacyInputLabelProps,
      slotProps: textFieldSlotProps,
      ...restTextFieldSlotProps
    } = slotProps?.textField ?? {};

    return {
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
        slotProps: {
          ...textFieldSlotProps,
          inputLabel: {
            ...(isRequired && {
              disableAnimation: false,
              shrink: undefined,
            }),
            ...legacyInputLabelProps,
            ...textFieldSlotProps?.inputLabel,
          },
        },
        ...restTextFieldSlotProps,
      },
      day: {
        className: 'rds-date-picker__day',
      },
      ...slotProps,
    },
  };
  }, [disabled, readOnly, size, minDate, maxDate, error, formattedLabel, placeholder, isRequired, slotProps]);

  const singlePickerProps = useMemo(() => ({
    ...baseProps,
    value: dateValue,
    onChange: handleDateChange,
    minTime,
    maxTime,
    format,
  }), [baseProps, dateValue, handleDateChange, minTime, maxTime, format]);

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
          slotProps={{
            input: {
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
            },
            htmlInput: {
              readOnly: true,
              style: { cursor: disabled ? 'default' : 'pointer' },
            },
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
              <RdsButton variant="transparent" size="small" text="Clear" onClick={handleClearRange} />
              <RdsButton variant="filled" size="small" text="Apply" onClick={handleClosePopover} />
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
      <Box className={containerClasses} sx={sx} style={typeof styleProp === 'object' ? styleProp : undefined}>
        <div className="rds-date-picker__field-wrapper">
          {getPickerComponent()}
          {helperText ? <div className="rds-date-picker__helper">{helperText}</div> : null}
        </div>
      </Box>
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
  appearance?: RdsCompDatePickerProps['appearance'];
  showSeconds?: boolean;
  required?: boolean;
};

const DEMO_CONFIGS: DemoConfig[] = [
  { label: 'Date Picker (Default)', variant: 'date', layout: 'Default', valueKey: 'date' },
  { label: 'Date Picker (Required)', variant: 'date', layout: 'Default', valueKey: 'date', required: true },
  { label: 'Year Picker', variant: 'date', layout: 'Year Picker', valueKey: 'year' },
  { label: 'Month Picker', variant: 'date', layout: 'Month Picker', valueKey: 'month' },
  { label: 'Multi Month', variant: 'date', layout: 'Multi Month', valueKey: 'multimonth' },
  { label: 'Time Picker (with seconds)', variant: 'time', layout: undefined, valueKey: 'time', showSeconds: true },
  { label: 'Date Time Picker (without seconds)', variant: 'datetime', layout: undefined, valueKey: 'datetime', showSeconds: false },
  { label: 'Date Range Picker', variant: 'daterange', layout: undefined, valueKey: 'daterange' },
  { label: 'Custom Date Range Picker', variant: 'daterange', layout: undefined, valueKey: 'daterange', appearance: 'custom' },
  { label: 'Time Range Picker (with seconds)', variant: 'timerange', layout: undefined, valueKey: 'timerange', showSeconds: true },
  { label: 'Date Time Range Picker (with seconds)', variant: 'datetimerange', layout: undefined, valueKey: 'datetimerange', showSeconds: true },
];

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="rds-date-picker__demo">
        <Typography variant="h6" component="h6" className="rds-date-picker__demo-title">
          Date Picker Components
        </Typography>

        <Stack spacing={3}>
          {demos.map(({ label, variant, layout, valueKey, appearance, showSeconds, required }) => (
            <Box
              key={`${valueKey}-${appearance || 'default'}-${showSeconds || 'default'}-${required || 'false'}`}
              className="rds-date-picker__demo-item"
            >
              <Typography variant="subtitle2" component="p" className="rds-date-picker__demo-label">
                {label}
              </Typography>
              <RdsCompDatePicker
                variant={variant}
                layout={layout}
                value={values[valueKey]}
                onChange={handleChange(valueKey)}
                appearance={appearance}
                showSeconds={showSeconds}
                required={required}
                label={required ? 'Required Field' : 'Optional Field'}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}

DatePickerDemo.displayName = 'DatePickerDemo';
RdsCompDatePicker.displayName = 'RdsCompDatePicker';
