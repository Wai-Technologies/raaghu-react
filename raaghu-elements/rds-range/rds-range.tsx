import React from 'react';
import { Slider as MuiSlider, type SliderProps, Box, Typography } from '@mui/material';
import RdsTooltip from '../rds-tooltip/rds-tooltip';
import './rds-range.scss';

export interface RdsRangeProps extends Omit<SliderProps, 'value' | 'onChange'> {
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  label?: string;
  showValue?: boolean;
  range?: boolean;
  formatValue?: (value: number) => string;
  showLabel?: boolean;
  textLabel?: boolean;
  showTooltip?: boolean;
  type?: 'one-way' | 'two-way';
  level?: '1' | '2' | '3' | '4' | '5';
  leftLabel?: number;
  rightLabel?: number;
}

const RdsRange= ({
  value,
  onChange,
  label,
  showValue = false,
  range = false,
  formatValue,
  showLabel = false,
  textLabel = true,
  showTooltip = false,
  type = 'one-way',
  level = '1',
  leftLabel = 0,
  rightLabel = 100,
  ...props
}:RdsRangeProps) => {
  const min = leftLabel ?? props.min ?? 0;
  const max = rightLabel ?? props.max ?? 100;

  const calculateLevelValue = (level: string): number => {
    const levelNum = parseInt(level);
    if (levelNum < 1 || levelNum > 5) return min;
    const range = max - min;
    const step = range / 4;
    return min + (step * (levelNum - 1));
  };

  // Internal state for slider value (for interactive behavior)
  const [internalValue, setInternalValue] = React.useState<number | number[]>(
    value !== undefined && value !== null
      ? value
      : type === 'one-way'
        ? calculateLevelValue(level)
        : range
          ? [min, max]
          : min
  );

  // Sync internal value with external value prop
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      setInternalValue(value);
    }
  }, [value]);

  // Reset internal value when type or level changes
  React.useEffect(() => {
    if (type === 'one-way') {
      setInternalValue(calculateLevelValue(level));
    } else if (type === 'two-way') {
      setInternalValue([min, max]);
    }
  }, [type, level, min, max]);

  // Use internal value for slider
  const effectiveValue = internalValue;

  // Use original marks prop instead of generating level marks
  const marks = props.marks;

  // Generate CSS class names based on component state
  const generateClassName = () => {
    const baseClass = 'rds-range';
    const classes = [baseClass];
    
    // Add type modifier
    if (type === 'one-way') {
      classes.push(`${baseClass}--one-way`);
      if (level) {
        classes.push(`${baseClass}--level-${level}`);
      }
    } else {
      classes.push(`${baseClass}--two-way`);
    }
    
    // Add state modifiers
    if (props.disabled) {
      classes.push(`${baseClass}--disabled`);
    }
    
    if (showTooltip) {
      classes.push(`${baseClass}--with-tooltip`);
    }
    
    if (showLabel) {
      classes.push(`${baseClass}--with-labels`);
    }
    
    // Add size modifier if available
    if (props.size) {
      classes.push(`${baseClass}--${props.size}`);
    }
    
    // Add color modifier if available
    if (props.color) {
      classes.push(`${baseClass}--${props.color}`);
    }
    
    return classes.join(' ');
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const formatDisplayValue = (val: number | number[]) => {
    if (Array.isArray(val)) {
      return formatValue 
        ? `${formatValue(val[0])} - ${formatValue(val[1])}`
        : `${val[0]} - ${val[1]}`;
    }
    return formatValue ? formatValue(val) : val.toString();
  };

  const formatMinMaxValue = (val: number) => {
    return formatValue ? formatValue(val) : val.toString();
  };

  const formatTooltipValue = (val: number) => {
    return formatValue ? formatValue(val) : val.toString();
  };

  // Custom ValueLabelComponent for tooltip
  const ValueLabelComponent = (props: any) => {
    const { children, value } = props;
    
    if (!showTooltip) {
      return <span {...props}>{children}</span>;
    }

    return (
      <RdsTooltip
        arrow
        title={formatTooltipValue(value)}
        placement="top"
        open={true}
      >
        {children}
      </RdsTooltip>
    );
  };

  return (
    <Box className={generateClassName()} sx={{ width: '100%' }}>
      {((label && textLabel) || showValue) && (
        <Box className="rds-range__header" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          {label && textLabel && (
            <Typography variant="body2" color="text.secondary" className="rds-range__label">
              {label}
            </Typography>
          )}
          {showValue && effectiveValue !== undefined && (
            <Typography variant="body2" color="text.secondary" className="rds-range__value">
              {formatDisplayValue(effectiveValue)}
            </Typography>
          )}
        </Box>
      )}
      <MuiSlider
        className="rds-range__slider"
        value={effectiveValue}
        onChange={handleChange}
        valueLabelDisplay={showTooltip ? "on" : "off"}
        slots={showTooltip ? { valueLabel: ValueLabelComponent } : undefined}
        marks={marks}
        min={min}
        max={max}
        step={props.step}
        {...props}
      />
      {showLabel && (
        <Box className="rds-range__footer" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary" className="rds-range__min-label">
            {formatMinMaxValue(min)}
          </Typography>
          <Typography variant="caption" color="text.secondary" className="rds-range__max-label">
            {formatMinMaxValue(max)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
RdsRange.displayName = 'RdsRange';
export default RdsRange;
