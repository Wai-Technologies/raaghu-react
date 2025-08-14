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
  showTooltip?: boolean;
  type?: 'one-way' | 'two-way';
  level?: '1' | '2' | '3' | '4' | '5';
}

const RdsRange= ({
  value,
  onChange,
  label,
  showValue = false,
  range = false,
  formatValue,
  showLabel = false,
  showTooltip = false,
  type = 'one-way',
  level = '1',
  ...props
}:RdsRangeProps) => {
  // Extract min and max from props with defaults
  const min = props.min ?? 0;
  const max = props.max ?? 100;

  // Calculate value based on level for one-way type
  const calculateLevelValue = (level: string): number => {
    const levelNum = parseInt(level);
    if (levelNum < 1 || levelNum > 5) return min;
    
    // Calculate value based on level (1-5 scale)
    // Level 1 = min, Level 5 = max, levels 2-4 are evenly distributed
    const range = max - min;
    const step = range / 4; // 4 steps between 5 levels
    return min + (step * (levelNum - 1));
  };

  // Use level-based value for one-way type when no explicit value is provided
  // or when value is undefined/null
  const effectiveValue = type === 'one-way' && (value === undefined || value === null) 
    ? calculateLevelValue(level) 
    : value;

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
      {(label || showValue) && (
        <Box className="rds-range__header" sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          {label && (
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
        step={type === 'one-way' ? null : props.step}
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

export default RdsRange;
