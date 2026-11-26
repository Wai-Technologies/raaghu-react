import React from 'react';
import { Box, Slider as MuiSlider, SliderProps } from '@mui/material';
import {
  resolveSliderMarksAndStep,
  getInitialSliderValue,
  hasExternalValueChanged,
  getLevelBasedSliderValue,
  normalizeRangeSliderValue,
  formatSliderValue,
} from './rds-slider.helpers';
import './rds-slider.scss';

export interface RdsSliderProps extends SliderProps {
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

const RdsSlider = React.forwardRef<HTMLDivElement, RdsSliderProps>(function RdsSlider({
  label,
  showValue: showValueProp = false,
  showLabel: showLabelProp = false,
  unit: unitProp,
  value,
  defaultValue,
  level,
  min = 0,
  max,
  controlType = 'one way',
  leftLabel = '0',
  rightLabel = '100',
  className,
  sx,
  style,
  ...props
}, ref) {
  const showValue = showValueProp === true;
  const showLabel = showLabelProp === true;
  const unit = typeof unitProp === 'string' ? unitProp : undefined;
  const isRangeSlider = controlType === 'two way';
  const safeMax = typeof max === 'number' ? max : 100;
  const { sliderStep, sliderMarks } = resolveSliderMarksAndStep(props.marks, props.step, min, safeMax);

  const [sliderValue, setSliderValue] = React.useState<number | number[]>(() =>
    getInitialSliderValue(value, defaultValue, isRangeSlider, min, safeMax)
  );

  React.useEffect(() => {
    if (hasExternalValueChanged(value, sliderValue)) {
      setSliderValue(value as number | number[]);
      return;
    }

    if (!props.disabled && level && typeof level === 'number' && level >= 1 && level <= 5) {
      setSliderValue(getLevelBasedSliderValue(level, isRangeSlider, min, safeMax));
      return;
    }

    const normalized = normalizeRangeSliderValue(sliderValue, isRangeSlider, min, safeMax);
    if (normalized !== null) {
      setSliderValue(normalized);
    }
  }, [level, value, min, max, controlType, isRangeSlider, safeMax, props.disabled]);

  const handleChange = (_: Event, newValue: number | number[], activeThumb?: number) => {
    setSliderValue(newValue);
    props.onChange?.(_, newValue, activeThumb ?? 0);
  };

  return (
    <Box ref={ref} className={`rds-slider ${className || ''}`} sx={sx} style={style}>
      {(showLabel || showValue) && (
        <div className="rds-slider__label-row">
          {showLabel && <span className="rds-slider__label-text">{label}</span>}
          {showValue && sliderValue !== undefined && (
            <span className="rds-slider__value">{formatSliderValue(sliderValue, unit)}</span>
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
          step={sliderStep}
          marks={sliderMarks}
          valueLabelDisplay={props.showTooltip === 'tooltip' ? 'auto' : 'off'}
        />
        {rightLabel && <span className="rds-slider__right-label">{rightLabel}</span>}
      </div>
    </Box>
  );
});

RdsSlider.displayName = 'RdsSlider';
export default RdsSlider;
