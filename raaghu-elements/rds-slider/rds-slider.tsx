import { useState, type JSX } from 'react';
import { Slider as MuiSlider, type SliderProps } from '@mui/material';
import './rds-slider.scss';

/** Props for {@link RdsSlider}. Extends MUI `SliderProps` (except `component`). */
export interface RdsSliderProps extends Omit<SliderProps, 'component'> {
  /** Text shown in the label row (when `showLabel`) and used as the default aria-label. */
  label?: string;
  /** Show the current value (with `unit`) in the label row. */
  showValue?: boolean;
  /** Show `label` in the label row. */
  showLabel?: boolean;
  /** `'tooltip'` shows MUI's value label on the thumb. */
  showTooltip?: 'default' | 'tooltip';
  /** Unit suffix appended to displayed values. */
  unit?: string;
  /** Initial position (1-5 maps to 0-100% of the range); re-applied when it changes. A controlled `value` wins. */
  level?: 1 | 2 | 3 | 4 | 5;
  /** `'two way'` renders a range slider with two thumbs. */
  controlType?: 'one way' | 'two way';
  /** Text left of the track. Defaults to `String(min)`; empty string hides it. */
  leftLabel?: string;
  /** Text right of the track. Defaults to `String(max)`; empty string hides it. */
  rightLabel?: string;
  className?: string;
}

/** Slider with optional label row, value readout, end labels and single/range modes. */
const RdsSlider = (sliderProps: RdsSliderProps): JSX.Element => {
  const {
    label,
    showValue = false,
    showLabel = false,
    showTooltip = 'default',
    unit,
    level,
    controlType = 'one way',
    leftLabel: leftLabelProp,
    rightLabel: rightLabelProp,
    className,
    value,
    onChange,
    ...props
  } = sliderProps;
  const min: number = props.min ?? 0;
  const max = props.max;
  const isRangeSlider = controlType === 'two way';

  let sliderStep = props.step;
  let sliderMarks = props.marks;

  const safeMax = typeof max === 'number' ? max : 100;
  const leftLabel: string = leftLabelProp ?? String(min);
  const rightLabel: string = rightLabelProp ?? String(safeMax);

  if (sliderMarks === true) {
    if (safeMax <= min) {
      sliderMarks = false;
    } else {
      if (sliderStep === undefined || sliderStep === null || sliderStep <= 0) {
        const range = safeMax - min;
        sliderStep = range <= 10 ? 1 : range <= 100 ? 10 : Math.ceil(range / 10);
      }

      const numberOfMarks = Math.floor((safeMax - min) / sliderStep) + 1;
      if (numberOfMarks > 100) {
        sliderStep = Math.ceil((safeMax - min) / 20);
      }
    }
  }

  const getLevelValue = (): number | number[] | undefined => {
    if (!level || typeof level !== 'number' || level < 1 || level > 5) {
      return undefined;
    }
    const percent = (level - 1) * 25;
    const calculated = min + ((safeMax - min) * percent) / 100;
    if (isRangeSlider) {
      const range = (safeMax - min) * 0.1;
      return [Math.max(min, calculated - range), Math.min(safeMax, calculated + range)];
    }
    return calculated;
  };

  const getInitialValue = (): number | number[] => {
    if (value !== undefined) {
      return value;
    }
    const fromLevel = getLevelValue();
    if (fromLevel !== undefined) {
      return fromLevel;
    }
    if (props.defaultValue !== undefined) {
      return props.defaultValue;
    }
    if (isRangeSlider) {
      const midPoint = min + (safeMax - min) * 0.5;
      const range = (safeMax - min) * 0.2;
      return [midPoint - range / 2, midPoint + range / 2];
    }
    return min + (safeMax - min) * 0.3;
  };

  const [internalSliderValue, setInternalSliderValue] = useState<number | number[]>(getInitialValue);

  // Re-sync the internal value when `level` changes (derived state, no effect needed).
  const [prevLevel, setPrevLevel] = useState(level);
  if (level !== prevLevel) {
    setPrevLevel(level);
    const fromLevel = getLevelValue();
    if (fromLevel !== undefined) {
      setInternalSliderValue(fromLevel);
    }
  }

  const normalizeValue = (current: number | number[]): number | number[] => {
    if (isRangeSlider) {
      if (Array.isArray(current)) {
        return current;
      }
      const range = (safeMax - min) * 0.2;
      return [Math.max(min, current - range / 2), Math.min(safeMax, current + range / 2)];
    }
    if (Array.isArray(current)) {
      return (current[0] + current[1]) / 2;
    }
    return current;
  };

  const sliderValue: number | number[] = value !== undefined ? value : normalizeValue(internalSliderValue);

  const formatValue = (val: number | number[]) => {
    if (Array.isArray(val)) {
      return `${val[0]}${unit || ''} - ${val[1]}${unit || ''}`;
    }
    return `${val}${unit || ''}`;
  };

  const handleChange: NonNullable<SliderProps['onChange']> = (event, newValue, activeThumb) => {
    setInternalSliderValue(newValue);
    onChange?.(event, newValue, activeThumb);
  };

  const ariaLabel = props['aria-label'] ?? label ?? 'Slider';
  const isRangeValue = Array.isArray(sliderValue);

  return (
    <div className={`rds-slider ${className || ''}`}>
      {(showLabel || showValue) && (
        <div className="rds-slider__label-row">
          {showLabel && <span className="rds-slider__label-text">{label}</span>}
          {showValue && (
            <span className="rds-slider__value">{formatValue(sliderValue)}</span>
          )}
        </div>
      )}
      <div className="rds-slider__container">
        {leftLabel && <span className="rds-slider__left-label">{leftLabel}</span>}
        <MuiSlider
          min={min}
          max={safeMax}
          {...props}
          value={sliderValue}
          onChange={handleChange}
          aria-label={isRangeValue ? undefined : ariaLabel}
          getAriaLabel={isRangeValue ? () => ariaLabel : undefined}
          step={sliderStep}
          marks={sliderMarks}
          valueLabelDisplay={showTooltip === 'tooltip' ? 'auto' : 'off'}
        />
        {rightLabel && <span className="rds-slider__right-label">{rightLabel}</span>}
      </div>
    </div>
  );
};

RdsSlider.displayName = 'RdsSlider';
export default RdsSlider;
