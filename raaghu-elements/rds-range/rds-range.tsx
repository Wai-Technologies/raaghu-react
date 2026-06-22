import { useEffect, useState, type ReactElement } from 'react';
import { Slider as MuiSlider, type SliderProps, Box, Typography } from '@mui/material';
import RdsTooltip from '../rds-tooltip/rds-tooltip';
import clsx from 'clsx';
import './rds-range.scss';

export interface RdsRangeProps extends Omit<SliderProps, 'value' | 'onChange' | 'component'> {
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

interface ValueLabelComponentProps {
  children: ReactElement;
  value: number;
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
}: RdsRangeProps) => {
  const min = leftLabel ?? props.min ?? 0;
  const max = rightLabel ?? props.max ?? 100;

  const calculateLevelValue = (level: string): number => {
    const levelNum = parseInt(level);
    if (levelNum < 1 || levelNum > 5) return min;
    const range = max - min;
    const step = range / 4;
    return min + (step * (levelNum - 1));
  };

  const [internalValue, setInternalValue] = useState<number | number[]>(
    value !== undefined && value !== null
      ? value
      : type === 'one-way'
        ? calculateLevelValue(level)
        : range
          ? [min, max]
          : min
  );

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (type === 'one-way') {
      setInternalValue(calculateLevelValue(level));
    } else if (type === 'two-way') {
      setInternalValue([min, max]);
    }
  }, [type, level, min, max]);

  const effectiveValue = internalValue;

  const marks = props.marks;

  const generateClassName = () => {
    return clsx(
      'rds-range',
      type === 'one-way' && 'rds-range--one-way',
      type === 'one-way' && level && `rds-range--level-${level}`,
      type !== 'one-way' && 'rds-range--two-way',
      props.disabled && 'rds-range--disabled',
      showTooltip && 'rds-range--with-tooltip',
      showLabel && 'rds-range--with-labels',
      props.size && `rds-range--${props.size}`,
      props.color && `rds-range--${props.color}`,
    );
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

  const ariaLabel = props['aria-label'] ?? label ?? 'Range slider';
  const isRangeValue = Array.isArray(effectiveValue);

  const ValueLabelComponent = ({ children, value }: ValueLabelComponentProps) => {
    
    if (!showTooltip) {
      return <span>{children}</span>;
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
        {...props}
        valueLabelDisplay={showTooltip ? "on" : "off"}
        slots={showTooltip ? { valueLabel: ValueLabelComponent } : undefined}
        marks={marks}
        min={min}
        max={max}
        step={props.step}
        aria-label={isRangeValue ? undefined : ariaLabel}
        getAriaLabel={isRangeValue ? () => ariaLabel : undefined}
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
