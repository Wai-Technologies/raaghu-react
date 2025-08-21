import React from 'react';
import { Slider as MuiSlider, SliderProps } from '@mui/material';
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

const RdsSlider: React.FC<RdsSliderProps> = ({
  label,
  showValue = false,
  showLabel = false,
  unit,
  value,
  level,
  min = 0,
  max,
  controlType = 'one way',
  leftLabel = '0',
  rightLabel = '100',
  className,
  ...props
}) => {
  // Determine if this should be a range slider based on controlType
  const isRangeSlider = controlType === 'two way';
  
  // Initialize with appropriate default value
  const getInitialValue = () => {
    if (value !== undefined) {
      return value;
    }
    if (isRangeSlider) {
      const safeMax = typeof max === 'number' ? max : 100;
      const midPoint = min + (safeMax - min) * 0.5;
      const range = (safeMax - min) * 0.2;
      return [midPoint - range / 2, midPoint + range / 2];
    }
    return min + (typeof max === 'number' ? (max - min) * 0.3 : 30);
  };

  const [sliderValue, setSliderValue] = React.useState<number | number[]>(getInitialValue());

  React.useEffect(() => {
    // Handle level-based values
    if (level && typeof level === 'number' && level >= 1 && level <= 5) {
      const percent = (level - 1) * 25;
      const safeMax = typeof max === 'number' ? max : 100;
      const calculated = min + ((safeMax - min) * percent) / 100;
      
      if (isRangeSlider) {
        const range = (safeMax - min) * 0.1;
        const lowerValue = Math.max(min, calculated - range);
        const upperValue = Math.min(safeMax, calculated + range);
        setSliderValue([lowerValue, upperValue]);
      } else {
        setSliderValue(calculated);
      }
      return;
    }

    // Handle controlType changes when no level is set
    if (isRangeSlider && !Array.isArray(sliderValue)) {
      const currentVal = typeof sliderValue === 'number' ? sliderValue : min;
      const safeMax = typeof max === 'number' ? max : 100;
      const range = (safeMax - min) * 0.2;
      const lowerValue = Math.max(min, currentVal - range / 2);
      const upperValue = Math.min(safeMax, currentVal + range / 2);
      setSliderValue([lowerValue, upperValue]);
    } else if (!isRangeSlider && Array.isArray(sliderValue)) {
      const average = (sliderValue[0] + sliderValue[1]) / 2;
      setSliderValue(average);
    }
  }, [level, value, min, max, controlType, isRangeSlider]);

  const formatValue = (val: number | number[]) => {
    if (Array.isArray(val)) {
      return `${val[0]}${unit || ''} - ${val[1]}${unit || ''}`;
    }
    return `${val}${unit || ''}`;
  };

  const handleChange = (_: Event, newValue: number | number[], activeThumb?: number) => {
    setSliderValue(newValue);
    if (props.onChange) {
      // @ts-ignore
      props.onChange(_, newValue, activeThumb);
    }
  };

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
          max={max}
          {...props}
          valueLabelDisplay={props.showTooltip === 'tooltip' ? 'auto' : 'off'}
        />
        {rightLabel && <span className="rds-slider__right-label">{rightLabel}</span>}
      </div>
    </div>
  );
};

RdsSlider.displayName = 'RdsSlider';
export default RdsSlider;
