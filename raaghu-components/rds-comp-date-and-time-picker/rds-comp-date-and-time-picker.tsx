import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TimeRangePicker } from '@mui/x-date-pickers-pro/TimeRangePicker';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';
import './rds-comp-date-and-time-picker.scss';

// License configuration
try {
  const { LicenseInfo } = require('@mui/x-license-pro');
  LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');
} catch (e) {
  // Ignore if license module is not available
}

// Utility function to aggressively remove watermarks
const removeWatermarks = () => {
  const watermarkSelectors = [
    // Be more specific to avoid affecting input elements
    '.MuiDataGrid-watermark',
    'div[class*="MuiDataGrid-watermark"]',
    'span[class*="MuiDataGrid-watermark"]',
    '.MuiTypography-root[title*="MUI X"]:not(.MuiInputLabel-root)',
    '.MuiTypography-root[title*="evaluation"]:not(.MuiInputLabel-root)',
    'div[title*="MUI X"]:not([class*="MuiTextField"]):not([class*="MuiInput"])',
    'span[title*="MUI X"]:not([class*="MuiTextField"]):not([class*="MuiInput"])',
    '*[title*="Material-UI X"]:not([class*="MuiTextField"]):not([class*="MuiInput"])',
    // Target specific watermark patterns but exclude input elements
    '[class*="watermark"]:not([class*="MuiTextField"]):not([class*="MuiInput"]):not([class*="MuiFormControl"])',
    '[data-testid*="watermark"]:not([class*="MuiTextField"]):not([class*="MuiInput"])',
    '[class*="evaluation"]:not([class*="MuiTextField"]):not([class*="MuiInput"])',
    '[data-testid*="evaluation"]:not([class*="MuiTextField"]):not([class*="MuiInput"])'
  ];

  watermarkSelectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const htmlElement = element as HTMLElement;
        
        // Double check this isn't an input-related element
        if (!htmlElement.closest('.MuiTextField-root') && 
            !htmlElement.closest('.MuiFormControl-root') &&
            !htmlElement.closest('.MuiInputBase-root') &&
            !htmlElement.classList.contains('MuiInputLabel-root') &&
            !htmlElement.classList.contains('MuiInputBase-input')) {
          
          htmlElement.style.setProperty('display', 'none', 'important');
          htmlElement.style.setProperty('visibility', 'hidden', 'important');
          htmlElement.style.setProperty('opacity', '0', 'important');
          
          // Only remove if it's clearly a watermark element
          if (htmlElement.textContent?.includes('MUI X') || 
              htmlElement.textContent?.includes('evaluation')) {
            htmlElement.remove();
          }
        }
      });
    } catch (e) {
      // Ignore errors for invalid selectors
    }
  });

  // Be more careful with text content removal
  const potentialWatermarks = document.querySelectorAll('div, span, p');
  potentialWatermarks.forEach(element => {
    const htmlElement = element as HTMLElement;
    const text = htmlElement.textContent?.trim().toLowerCase();
    
    // Only target elements that are clearly watermarks and not input-related
    if ((text?.includes('mui x') || text?.includes('evaluation')) &&
        !htmlElement.closest('.MuiTextField-root') &&
        !htmlElement.closest('.MuiFormControl-root') &&
        !htmlElement.closest('.MuiInputBase-root') &&
        !htmlElement.classList.contains('MuiInputLabel-root') &&
        !htmlElement.classList.contains('MuiInputBase-input') &&
        htmlElement.children.length === 0) { // Only text nodes, not containers
      htmlElement.style.setProperty('display', 'none', 'important');
    }
  });
};

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
  newVariant?: 'default' | 'custom';
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
      
      {/* Calendar Panel */}
      <div className="rds-date-picker__calendar-panel">
        {children}
      </div>
    </div>
  );
});

// Removed StyledContainer - using CSS classes instead

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
  newVariant = 'default',
  showSeconds = true, // Default to true to show seconds by default
  isRequired = false, // Default to false
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

  const [open, setOpen] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState<string>('custom');

  // Handle preset selection
  const handlePresetSelect = (preset: DateRangePreset) => {
    setSelectedPreset(preset.key);
    if (preset.key !== 'custom') {
      const newRange = preset.getValue();
      setRangeValue(newRange);
      onChange?.(newRange);
    }
  };

  // Effect to remove watermarks only for range pickers (which show watermarks)
  React.useEffect(() => {
    // Only run watermark removal for range picker variants
    if (!variant.includes('range') && layout !== 'Multi Month') {
      return;
    }

    // Remove watermarks immediately
    removeWatermarks();

    // Set up a mutation observer to remove watermarks when they're added dynamically
    const observer = new MutationObserver((mutations) => {
      let shouldRemove = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain watermark-related content
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.textContent?.includes('MUI X') || 
                  element.textContent?.includes('evaluation')) {
                shouldRemove = true;
              }
            }
          });
        }
      });
      
      if (shouldRemove) {
        setTimeout(removeWatermarks, 0);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Remove watermarks when the picker opens (less frequent)
    let interval: NodeJS.Timeout;
    if (open) {
      interval = setInterval(removeWatermarks, 1000);
    }

    return () => {
      observer.disconnect();
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [open, variant, layout]);

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
        helperText,
        label: formattedLabel, // Use formatted label with required indicator
        placeholder: placeholder, // Keep placeholder for when no label is provided
        fullWidth: true,
        size,
        required: isRequired, // Keep for form validation and accessibility
        className: `rds-date-picker__input ${disabled ? 'rds-date-picker__input--disabled' : ''} ${readOnly ? 'rds-date-picker__input--readonly' : ''} ${isRequired ? 'rds-date-picker__input--required' : ''}`,
        InputLabelProps: {
          // Disable MUI's built-in required asterisk since we use custom one
          ...(isRequired && { 
            disableAnimation: false,
            shrink: undefined,
            // Override any asterisk styling
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
  const singlePickerProps = {
    ...baseProps,
    value: dateValue,
    onChange: handleDateChange,
    minTime,
    maxTime,
    format,
  };

  // Props specific to range pickers with watermark hiding
  const rangePickerProps = {
    disabled,
    readOnly,
    size,
    value: rangeValue,
    onChange: handleRangeChange,
    slotProps: {
      textField: {
        error,
        helperText,
        label: label, // Use label as floating label
        placeholder: placeholder, // Keep placeholder for when no label is provided
        fullWidth: true,
        size,
        InputProps: {
          style: { cursor: disabled ? 'default' : 'pointer' },
        },
        style: { 
          cursor: disabled ? 'default' : 'pointer',
          width: '100%', // Ensure full width
        },
        ...slotProps?.textField,
      },
      day: {
        sx: {
          borderRadius: '4px !important',
          '&:hover': {
            borderRadius: '4px !important',
          },
          '&.Mui-selected': {
            borderRadius: '4px !important',
            '&:hover': {
              borderRadius: '4px !important',
            },
          },
          '&.MuiPickersDay-today': {
            borderRadius: '4px !important',
          },
          '&.MuiDateRangePickerDay-rangeIntervalDayHighlight': {
            borderRadius: '4px !important',
          },
          '&.MuiDateRangePickerDay-rangeIntervalDayHighlightStart': {
            borderRadius: '4px !important',
          },
          '&.MuiDateRangePickerDay-rangeIntervalDayHighlightEnd': {
            borderRadius: '4px !important',
          },
        },
      },
      layout: {
        sx: {
          // Hide any watermark elements in the layout
          '& [class*="watermark"]': {
            display: 'none !important',
          },
          '& [data-testid*="watermark"]': {
            display: 'none !important',
          },
        },
      },
      popper: {
        sx: {
          // Hide watermarks in the popper
          '& [class*="watermark"]': {
            display: 'none !important',
          },
          '& [data-testid*="watermark"]': {
            display: 'none !important',
          },
        },
      },
      ...slotProps,
    },
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
          />
        );

      case 'datetime':
        return (
          <DateTimePicker
            {...singlePickerProps}
            format={format || (showSeconds ? 'MM/DD/YYYY HH:mm:ss a' : 'MM/DD/YYYY HH:mm a')}
            ampm={true}
            views={showSeconds ? ['year', 'month', 'day', 'hours', 'minutes', 'seconds'] : ['year', 'month', 'day', 'hours', 'minutes']}
            timeSteps={{ hours: 1, minutes: 1, seconds: showSeconds ? 1 : undefined }}
          />
        );

      case 'daterange':
        // If newVariant is custom, use custom layout with presets
        if (newVariant === 'custom') {
          return (
            <DateRangePicker
              {...rangePickerProps}
              slotProps={{
                ...rangePickerProps.slotProps,
                layout: {
                  sx: {
                    // Hide default layout and use custom one
                    '& .MuiPickersLayout-root': {
                      display: 'none',
                    },
                  },
                },
                popper: {
                  ...rangePickerProps.slotProps?.popper,
                  sx: {
                    ...rangePickerProps.slotProps?.popper?.sx,
                    '& .MuiPaper-root': {
                      overflow: 'visible',
                    },
                  },
                },
              }}
              slots={{
                layout: (layoutProps: any) => (
                  <CustomDateRangeLayout
                    selectedPreset={selectedPreset}
                    onPresetSelect={handlePresetSelect}
                    rangeValue={rangeValue}
                    {...layoutProps}
                  />
                ),
              }}
            />
          );
        }
        return (
          <DateRangePicker
            {...rangePickerProps}
          />
        );

      case 'timerange':
        return (
          <TimeRangePicker
            {...rangePickerProps}
            minTime={minTime}
            maxTime={maxTime}
            format={format || (showSeconds ? 'HH:mm:ss a' : 'HH:mm a')}
            views={showSeconds ? ['hours', 'minutes', 'seconds'] : ['hours', 'minutes']}
            ampm={true}
            timeSteps={{ hours: 1, minutes: 1, seconds: showSeconds ? 1 : undefined }}
          />
        );

      case 'datetimerange':
        return (
          <DateTimeRangePicker
            {...rangePickerProps}
            minTime={minTime}
            maxTime={maxTime}
            format={format || (showSeconds ? 'MM/DD/YYYY HH:mm:ss a' : 'MM/DD/YYYY HH:mm a')}
            ampm={true}
            timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
            slotProps={{
              ...rangePickerProps.slotProps,
              textField: {
                ...rangePickerProps.slotProps?.textField,
                inputProps: {
                  placeholder: showSeconds ? 'MM/DD/YYYY HH:mm:ss a' : 'MM/DD/YYYY HH:mm a',
                },
              },
            }}
          />
        );

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
        return (
          <DateRangePicker
            {...rangePickerProps}
            calendars={2}
          />
        );
      
      case 'Default':
      default:
        return (
          <DatePicker
            {...singlePickerProps}
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
    // Add specific variant classes for better styling
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
        {getPickerComponent()}
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
    { label: 'Custom Date Range Picker', variant: 'daterange', valueKey: 'daterange', newVariant: 'custom' },
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
        
        {demos.map(({ label, variant, layout, valueKey, newVariant, showSeconds, isRequired }) => (
          <DemoItem key={`${valueKey}-${newVariant || 'default'}-${showSeconds || 'default'}-${isRequired || 'false'}`} label={label}>
            <RdsCompDatePicker
              variant={variant as any}
              layout={layout as any}
              value={values[valueKey as keyof typeof values]}
              onChange={handleChange(valueKey)}
              newVariant={newVariant as any}
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