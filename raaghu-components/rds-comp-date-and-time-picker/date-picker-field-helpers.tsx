import React from 'react';
import { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import Popover from '@mui/material/Popover';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Box from '@mui/material/Box';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import {
  DateRangePreset,
  formatRangeText,
  CustomDateRangeLayout,
  RangeCalendar,
  RangeTime,
  RangeDateTime,
} from './RangeComponents';

export function SingleDateTime({
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

export interface RangeFieldRendererProps {
  variant: string;
  layout: string;
  rangeValue: [Dayjs | null, Dayjs | null];
  showSeconds: boolean;
  placeholder?: string;
  formattedLabel?: React.ReactNode;
  size: 'small' | 'medium';
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  isRequired: boolean;
  style: 'default' | 'custom';
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  selectedPreset: string;
  anchorEl: HTMLElement | null;
  inputContainerRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (el: HTMLElement | null) => void;
  onClose: () => void;
  onRangeChange: (v: [Dayjs | null, Dayjs | null]) => void;
  onPresetSelect: (preset: DateRangePreset) => void;
  onChange?: (value: Dayjs | null | [Dayjs | null, Dayjs | null]) => void;
}

export function RangeFieldRenderer({
  variant,
  layout,
  rangeValue,
  showSeconds,
  placeholder,
  formattedLabel,
  size,
  disabled,
  readOnly,
  error,
  isRequired,
  style,
  minDate,
  maxDate,
  minTime,
  maxTime,
  selectedPreset,
  anchorEl,
  inputContainerRef,
  onOpen,
  onClose,
  onRangeChange,
  onPresetSelect,
  onChange,
}: RangeFieldRendererProps) {
  const effectiveRangeVariant = (variant === 'date' && layout === 'Multi Month') ? 'daterange' : variant as 'daterange' | 'timerange' | 'datetimerange';
  const inputValue = formatRangeText(effectiveRangeVariant, rangeValue, showSeconds);
  const isMultiMonth = layout === 'Multi Month';

  return (
    <>
      <div ref={inputContainerRef} className="rds-date-picker__range-input-container">
        <TextField
          onClick={() => { if (!disabled) onOpen(inputContainerRef.current); }}
          value={inputValue}
          placeholder={placeholder}
          label={formattedLabel}
          size={size}
          disabled={disabled}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Draw"
                  edge="end"
                  size={size === 'small' ? 'small' : 'medium'}
                  onClick={(e) => { e.stopPropagation(); if (!disabled) onOpen(inputContainerRef.current); }}
                  disabled={disabled || readOnly}
                  aria-label="open calendar"
                >
                  <EventIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={error}
          className={`rds-date-picker__input${disabled ? ' rds-date-picker__input--disabled' : ''}${readOnly ? ' rds-date-picker__input--readonly' : ''}${isRequired ? ' rds-date-picker__input--required' : ''}${anchorEl ? ' rds-date-picker__input--open' : ''}`}
        />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
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
              onPresetSelect={onPresetSelect}
              rangeValue={rangeValue}
            >
              <RangeCalendar
                value={rangeValue}
                onChange={onRangeChange}
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
                  onChange={onRangeChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  multiMonth={isMultiMonth}
                />
              )}
              {variant === 'timerange' && (
                <RangeTime
                  value={rangeValue}
                  onChange={onRangeChange}
                  showSeconds={showSeconds}
                  minTime={minTime}
                  maxTime={maxTime}
                  size={size}
                />
              )}
              {variant === 'datetimerange' && (
                <RangeDateTime
                  value={rangeValue}
                  onChange={onRangeChange}
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
          <Box display="flex" justifyContent="flex-end" gap={1} mt={2} width="100%">
            <RdsButton style="transparent" size="small" text="Clear" onClick={() => { onRangeChange([null, null]); onChange?.([null, null]); }} />
            <RdsButton style="filled" size="small" text="Apply" onClick={onClose} />
          </Box>
        </Paper>
      </Popover>
    </>
  );
}

export interface DateTimeFieldRendererProps {
  dateValue: Dayjs | null;
  showSeconds: boolean;
  format?: string;
  placeholder?: string;
  formattedLabel?: React.ReactNode;
  helperText?: string;
  size: 'small' | 'medium';
  disabled: boolean;
  readOnly: boolean;
  error: boolean;
  isRequired: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  anchorEl: HTMLElement | null;
  datetimeRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (el: HTMLElement | null) => void;
  onClose: () => void;
  onDateTimeChange: (v: Dayjs | null) => void;
  onChange?: (value: Dayjs | null | [Dayjs | null, Dayjs | null]) => void;
}

export function DateTimeFieldRenderer({
  dateValue,
  showSeconds,
  format,
  placeholder,
  formattedLabel,
  helperText,
  size,
  disabled,
  readOnly,
  error,
  isRequired,
  minDate,
  maxDate,
  minTime,
  maxTime,
  anchorEl,
  datetimeRef,
  onOpen,
  onClose,
  onDateTimeChange,
  onChange,
}: DateTimeFieldRendererProps) {
  const inputValue = dateValue ? dateValue.format(format || (showSeconds ? 'MM/DD/YYYY hh:mm:ss a' : 'MM/DD/YYYY hh:mm a')) : '';

  return (
    <>
      <div ref={datetimeRef} className="rds-date-picker__range-input-container">
        <TextField
          onClick={() => { if (!disabled) onOpen(datetimeRef.current); }}
          value={inputValue}
          placeholder={placeholder}
          label={formattedLabel}
          size={size}
          disabled={disabled}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size={size === 'small' ? 'small' : 'medium'}
                  onClick={(e) => { e.stopPropagation(); if (!disabled) onOpen(datetimeRef.current); }}
                  disabled={disabled || readOnly}
                  aria-label="open calendar"
                >
                  <EventIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={error}
          helperText={helperText}
          className={`rds-date-picker__input${disabled ? ' rds-date-picker__input--disabled' : ''}${readOnly ? ' rds-date-picker__input--readonly' : ''}${isRequired ? ' rds-date-picker__input--required' : ''}${anchorEl ? ' rds-date-picker__input--open' : ''}`}
        />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        className="MuiPickersPopper-root"
        marginThreshold={8}
        slotProps={{ paper: { className: 'rds-date-picker__popover-paper-gap' } }}
      >
        <Paper elevation={3} className="rds-date-picker__range-paper">
          <SingleDateTime
            value={dateValue}
            onChange={onDateTimeChange}
            showSeconds={showSeconds}
            minDate={minDate}
            maxDate={maxDate}
            minTime={minTime}
            maxTime={maxTime}
          />
          <Box className="rds-date-picker__range-actions">
            <RdsButton style="transparent" size="small" text="Clear" onClick={() => { onDateTimeChange(null); onChange?.(null); }} />
            <RdsButton style="filled" size="small" text="Apply" onClick={onClose} />
          </Box>
        </Paper>
      </Popover>
    </>
  );
}

SingleDateTime.displayName = 'SingleDateTime';
RangeFieldRenderer.displayName = 'RangeFieldRenderer';
DateTimeFieldRenderer.displayName = 'DateTimeFieldRenderer';
