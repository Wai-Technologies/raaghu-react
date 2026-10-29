import { useState } from 'react';
import { Slider as MuiSlider, type SliderProps, Box, Typography } from '@mui/material';
import { invokeValueFirstOnChange, warnDeprecatedProp } from '../shared/utils/deprecation';
import clsx from 'clsx';
import './rds-range.scss';

/** Props for {@link RdsRange}. Extends MUI `SliderProps` (except `value`, `onChange`, `component`). */
export interface RdsRangeProps extends Omit<SliderProps, 'value' | 'onChange' | 'component'> {
  /** Controlled value: a number for one thumb, `[start, end]` for two. Omit for uncontrolled use. */
  value?: number | number[];
  /**
   * Value-first change handler (canonical for custom Raaghu controls).
   * Signature: `(value, event) => void` — prefer reading `value`.
   */
  onChange?: (value: number | number[], event: Event) => void;
  /** Text shown above the slider; also the accessible name. */
  label?: string;
  /** Shows the current value above the slider. */
  showValue?: boolean;
  /** @deprecated Use `type="two-way"` instead. */
  range?: boolean;
  /** Formats the values shown in the header, tooltips and min/max labels. */
  formatValue?: (value: number) => string;
  /** Shows the min and max values under the slider. */
  showMinMax?: boolean;
  /** @deprecated Use `showMinMax` instead. */
  showLabel?: boolean;
  /** Shows `label` above the slider. */
  textLabel?: boolean;
  /** @deprecated Use `valueLabelDisplay="on"` instead. */
  showTooltip?: boolean;
  /** Figma variant: one thumb or two. */
  type?: 'one-way' | 'two-way';
  /** Figma level: initial one-way position in quarters of the range (`'1'` = min, `'5'` = max). */
  level?: '1' | '2' | '3' | '4' | '5';
  /** @deprecated Use `min` instead. */
  leftLabel?: number;
  /** @deprecated Use `max` instead. */
  rightLabel?: number;
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
  showMinMax,
  showLabel,
  textLabel = true,
  showTooltip,
  valueLabelDisplay,
  valueLabelFormat,
  defaultValue,
  type = 'one-way',
  level = '1',
  leftLabel,
  rightLabel,
  className,
  sx,
  ref,
  'data-testid': dataTestId,
  ...props
}: RdsRangeProps & { 'data-testid'?: string }) => {
  if (leftLabel !== undefined) warnDeprecatedProp('RdsRange', 'leftLabel', '`min`');
  if (rightLabel !== undefined) warnDeprecatedProp('RdsRange', 'rightLabel', '`max`');
  if (showLabel !== undefined) warnDeprecatedProp('RdsRange', 'showLabel', '`showMinMax`');
  if (showTooltip !== undefined) warnDeprecatedProp('RdsRange', 'showTooltip', '`valueLabelDisplay`');
  if (range) warnDeprecatedProp('RdsRange', 'range', '`type="two-way"`');
  const min = props.min ?? leftLabel ?? 0;
  const max = props.max ?? rightLabel ?? 100;
  const minMaxVisible = showMinMax ?? showLabel ?? false;
  const labelDisplay = valueLabelDisplay ?? (showTooltip ? 'on' : 'off');
  const initialValue = () => defaultValue ?? getDefaultRangeValue(type, level, range, min, max);
  const isControlled = value !== undefined && value !== null;

  const [internalValue, setInternalValue] = useState<number | number[]>(() =>
    isControlled ? value : initialValue()
  );

  const [prevMode, setPrevMode] = useState(`${type}-${level}-${min}-${max}-${range}`);

  const modeKey = `${type}-${level}-${min}-${max}-${range}`;
  if (!isControlled && modeKey !== prevMode) {
    setPrevMode(modeKey);
    setInternalValue(initialValue());
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
      labelDisplay === 'on' && 'rds-range--with-tooltip',
      minMaxVisible && 'rds-range--with-labels',
      props.size && `rds-range--${props.size}`,
      props.color && `rds-range--${props.color}`,
      className,
    );
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setInternalValue(newValue);
    invokeValueFirstOnChange(onChange, newValue, event);
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
    <Box
      ref={ref}
      className={generateClassName()}
      data-testid={dataTestId}
      sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : sx != null ? [sx] : [])]}
    >
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
        valueLabelDisplay={labelDisplay}
        valueLabelFormat={valueLabelFormat ?? formatValue}
        marks={marks}
        min={min}
        max={max}
        step={props.step}
        aria-label={isRangeValue ? undefined : ariaLabel}
        getAriaLabel={isRangeValue ? () => ariaLabel : undefined}
      />
      {minMaxVisible && (
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
