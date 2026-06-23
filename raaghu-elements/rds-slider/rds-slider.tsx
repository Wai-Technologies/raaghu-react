// @ts-nocheck
import { useMemo, useState, type JSX } from 'react';
import { Slider as MuiSlider, SliderProps } from '@mui/material';
import './rds-slider.scss';

export interface RdsSliderProps extends Omit<SliderProps, 'component'> {
  label?: string;
  showValue?: boolean;
  showLabel?: boolean;
  showTooltip?: 'default' | 'tooltip';
  unit?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  controlType?: 'one way' | 'two way';
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

const RdsSlider: (sliderProps: RdsSliderProps) => JSX.Element = (sliderProps) => {
  const label: string | undefined = sliderProps.label;
  const showValue: boolean = sliderProps.showValue ?? false;
  const showLabel: boolean = sliderProps.showLabel ?? false;
  const showTooltip: 'default' | 'tooltip' = sliderProps.showTooltip ?? 'default';
  const unit: string | undefined = sliderProps.unit;
  const value = sliderProps.value;
  const level = sliderProps.level;
  const min: number = sliderProps.min ?? 0;
  const max = sliderProps.max;
  const controlType: 'one way' | 'two way' = sliderProps.controlType ?? 'one way';
  const leftLabel: string = sliderProps.leftLabel ?? '0';
  const rightLabel: string = sliderProps.rightLabel ?? '100';
  const className: string | undefined = sliderProps.className;

  const props: SliderProps = { ...sliderProps };
  delete (props as Record<string, unknown>).label;
  delete (props as Record<string, unknown>).showValue;
  delete (props as Record<string, unknown>).showLabel;
  delete (props as Record<string, unknown>).showTooltip;
  delete (props as Record<string, unknown>).unit;
  delete (props as Record<string, unknown>).level;
  delete (props as Record<string, unknown>).controlType;
  delete (props as Record<string, unknown>).leftLabel;
  delete (props as Record<string, unknown>).rightLabel;
  const isRangeSlider = controlType === 'two way';

  let sliderStep = props.step;
  let sliderMarks = props.marks;

  const safeMax = typeof max === 'number' ? max : 100;

  if (sliderMarks === true) {
    if (typeof min !== 'number' || typeof safeMax !== 'number' || safeMax <= min) {
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
  const getInitialValue = () => {
    if (value !== undefined) {
      return value;
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

  const [internalSliderValue, setInternalSliderValue] = useState<number | number[]>(() => getInitialValue());

  const normalizedInternalValue = useMemo(() => {
    if (isRangeSlider) {
      if (Array.isArray(internalSliderValue)) {
        return internalSliderValue;
      }
      const currentVal = typeof internalSliderValue === 'number' ? internalSliderValue : min;
      const range = (safeMax - min) * 0.2;
      const lowerValue = Math.max(min, currentVal - range / 2);
      const upperValue = Math.min(safeMax, currentVal + range / 2);
      return [lowerValue, upperValue];
    }

    if (Array.isArray(internalSliderValue)) {
      return (internalSliderValue[0] + internalSliderValue[1]) / 2;
    }

    return internalSliderValue;
  }, [internalSliderValue, isRangeSlider, min, safeMax]);

  const levelValue = useMemo(() => {
    if (!level || typeof level !== 'number' || level < 1 || level > 5) {
      return undefined;
    }
    const percent = (level - 1) * 25;
    const calculated = min + ((safeMax - min) * percent) / 100;
    if (isRangeSlider) {
      const range = (safeMax - min) * 0.1;
      const lowerValue = Math.max(min, calculated - range);
      const upperValue = Math.min(safeMax, calculated + range);
      return [lowerValue, upperValue] as number[];
    }
    return calculated;
  }, [isRangeSlider, level, min, safeMax]);

  const sliderValue = value !== undefined
    ? (value as number | number[])
    : (levelValue ?? normalizedInternalValue);

  const formatValue = (val: number | number[]) => {
    if (Array.isArray(val)) {
      return `${val[0]}${unit || ''} - ${val[1]}${unit || ''}`;
    }
    return `${val}${unit || ''}`;
  };

  const handleChange = (_: Event, newValue: number | number[], activeThumb?: number) => {
    setInternalSliderValue(newValue);
    if (props.onChange) {
      props.onChange(_, newValue, activeThumb ?? 0);
    }
  };

  const ariaLabel = props['aria-label'] ?? label ?? 'Slider';
  const isRangeValue = Array.isArray(sliderValue);

  return (
    <div className={`rds-slider ${className || ''}`}>
      {(showLabel || showValue) && (
        <div className="rds-slider__label-row">
          {showLabel && <span className="rds-slider__label-text">{label}</span>}
          {showValue && sliderValue !== undefined && (
            <span className="rds-slider__value">{formatValue(sliderValue)}</span>
          )}
        </div>
      )}
      <div className="rds-slider__container">
        {leftLabel && <span className="rds-slider__left-label">{leftLabel}</span>}
      <MuiSlider
        value={sliderValue}
        onChange={handleChange}
          min={min}
          max={safeMax}
          {...props}
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
