import { useState, type ReactElement } from 'react';
import { Slider as MuiSlider, type SliderProps, Box, Typography } from '@mui/material';
import RdsTooltip from '../rds-tooltip/rds-tooltip';
import clsx from 'clsx';
import './rds-range.scss';

/** Props for {@link RdsRange}. Extends MUI `SliderProps` (except `value`, `onChange`, `component`). */
export interface RdsRangeProps extends Omit<SliderProps, 'value' | 'onChange' | 'component'> {
  /** Controlled value: a number for one thumb, `[start, end]` for two. Omit for uncontrolled use. */
  value?: number | number[];
  /** Called with the new value while a thumb moves. */
  onChange?: (value: number | number[]) => void;
  /** Text shown above the slider; also the accessible name. */
  label?: string;
  /** Shows the current value above the slider. */
  showValue?: boolean;
  /** Uncontrolled two-thumb mode starting at `[min, max]` (when `type` is not `'one-way'`). */
  range?: boolean;
  /** Formats the values shown in the header, tooltips and min/max labels. */
  formatValue?: (value: number) => string;
  /** Shows the min and max values under the slider. */
  showLabel?: boolean;
  /** Shows `label` above the slider. */
  textLabel?: boolean;
  /** Shows an always-open value tooltip on each thumb. */
  showTooltip?: boolean;
  /** Figma variant: one thumb or two. */
  type?: 'one-way' | 'two-way';
  /** Figma level: initial one-way position in quarters of the range (`'1'` = min, `'5'` = max). */
  level?: '1' | '2' | '3' | '4' | '5';
  /** Minimum value; takes precedence over `min`. Falls back to `min`, then 0. */
  leftLabel?: number;
  /** Maximum value; takes precedence over `max`. Falls back to `max`, then 100. */
  rightLabel?: number;
}

interface RangeValueLabelProps {
  children: ReactElement;
  value: number;
  formatValue?: (value: number) => string;
}

const calculateLevelValue = (level: string, min: number, max: number): number => {
  const levelNum = parseInt(level);
  if (levelNum < 1 || levelNum > 5) return min;
  const span = max - min;
  const step = span / 4;
  return min + (step * (levelNum - 1));
};

const getDefaultRangeValue = (
  type: RdsRangeProps['type'],
  level: RdsRangeProps['level'],
  range: boolean,
  min: number,
  max: number,
): number | number[] => {
  if (type === 'one-way') {
    return calculateLevelValue(level ?? '1', min, max);
  }
  if (type === 'two-way' || range) {
    return [min, max];
  }
  return min;
};

const RangeValueLabel = ({ children, value, formatValue }: RangeValueLabelProps) => {
  const title = formatValue ? formatValue(value) : value.toString();
  return (
    <RdsTooltip
      arrow
      title={title}
      placement="top"
      open={true}
    >
      {children}
    </RdsTooltip>
  );
};

/**
 * Slider for picking one value or a range, built on MUI `Slider`, with an optional
 * header (label and value), min/max labels and always-open value tooltips.
 */
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
  leftLabel,
  rightLabel,
  slots,
  slotProps,
  ...props
}: RdsRangeProps) => {
  const min = leftLabel ?? props.min ?? 0;
  const max = rightLabel ?? props.max ?? 100;
  const isControlled = value !== undefined && value !== null;

  const [internalValue, setInternalValue] = useState<number | number[]>(() =>
    isControlled ? value : getDefaultRangeValue(type, level, range, min, max)
  );

  const [prevMode, setPrevMode] = useState(`${type}-${level}-${min}-${max}-${range}`);

  const modeKey = `${type}-${level}-${min}-${max}-${range}`;
  if (!isControlled && modeKey !== prevMode) {
    setPrevMode(modeKey);
    setInternalValue(getDefaultRangeValue(type, level, range, min, max));
  }

  const effectiveValue = isControlled ? value : internalValue;

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

  const ariaLabel = props['aria-label'] ?? label ?? 'Range slider';
  const isRangeValue = Array.isArray(effectiveValue);

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
        slots={showTooltip ? { ...slots, valueLabel: RangeValueLabel } : slots}
        slotProps={showTooltip ? ({ ...slotProps, valueLabel: { formatValue } } as SliderProps['slotProps']) : slotProps}
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
