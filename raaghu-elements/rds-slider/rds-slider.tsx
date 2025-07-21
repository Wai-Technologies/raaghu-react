import React from 'react';
import { Slider as MuiSlider, SliderProps } from '@mui/material';

export interface RdsSliderProps extends SliderProps {
  label?: string;
  showValue?: boolean;
  unit?: string;
  range?: boolean;
}

const RdsSlider: React.FC<RdsSliderProps> = ({
  label,
  showValue = false,
  unit,
  range = false,
  value,
  ...props
}) => {
  const formatValue = (val: number | number[]) => {
    if (Array.isArray(val)) {
      return `${val[0]}${unit || ''} - ${val[1]}${unit || ''}`;
    }
    return `${val}${unit || ''}`;
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          {label && <span>{label}</span>}
          {showValue && value !== undefined && (
            <span>{formatValue(value)}</span>
          )}
        </div>
      )}
      <MuiSlider
        value={value}
        {...props}
      />
    </div>
  );
};

export default RdsSlider;
