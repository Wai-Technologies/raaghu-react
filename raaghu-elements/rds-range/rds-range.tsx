import React from 'react';
import { Slider as MuiSlider, SliderProps, Box, Typography } from '@mui/material';

export interface RdsRangeProps extends Omit<SliderProps, 'value' | 'onChange'> {
  value?: number | number[];
  onChange?: (value: number | number[]) => void;
  label?: string;
  showValue?: boolean;
  range?: boolean;
  formatValue?: (value: number) => string;
}

const RdsRange: React.FC<RdsRangeProps> = ({
  value,
  onChange,
  label,
  showValue = false,
  range = false,
  formatValue,
  ...props
}) => {
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

  return (
    <Box sx={{ width: '100%' }}>
      {(label || showValue) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          {label && (
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
          )}
          {showValue && value !== undefined && (
            <Typography variant="body2" color="text.secondary">
              {formatDisplayValue(value)}
            </Typography>
          )}
        </Box>
      )}
      <MuiSlider
        value={value}
        onChange={handleChange}
        {...props}
      />
    </Box>
  );
};

export default RdsRange;
