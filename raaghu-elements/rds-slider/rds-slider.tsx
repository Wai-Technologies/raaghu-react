import React from 'react';
import { Slider as MuiSlider, SliderProps } from '@mui/material';
import './rds-slider.scss';

export interface RdsSliderProps extends SliderProps {
  label?: string;
  showValue?: boolean;
  showLabel?: boolean;
  showTooltip?: 'default' | 'tooltip';
  unit?: string;
  range?: boolean;
  level?: 1 | 2 | 3 | 4 | 5;
}

const RdsSlider: React.FC<RdsSliderProps> = ({
  label,
  showValue = false,
  showLabel = false,
  unit,
  range = false,
  value,
  level,
  min = 0,
  max = 100,
  ...props
}) => {
  const [sliderValue, setSliderValue] = React.useState<number | number[]>(value ?? min);

  React.useEffect(() => {
    if (level && typeof level === 'number' && level >= 1 && level <= 5) {
      const percent = (level - 1) * 25;
      const calculated = min + ((max - min) * percent) / 100;
      setSliderValue(calculated);
    } else if (value !== undefined) {
      setSliderValue(value);
    }
  }, [level, value, min, max]);

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
    <div className="rds-slider">
      {(showLabel || showValue) && (
        <div className="rds-slider__label-row">
          {showLabel && <span className="rds-slider__label-text">{label}</span>}
          {showValue && sliderValue !== undefined && (
            <span className="rds-slider__value">{formatValue(sliderValue)}</span>
          )}
        </div>
      )}
      <MuiSlider
        value={sliderValue}
        onChange={handleChange}
        {...props}
        valueLabelDisplay={props.showTooltip === 'tooltip' ? 'auto' : 'off'}
      />
    </div>
  );
};

export default RdsSlider;
