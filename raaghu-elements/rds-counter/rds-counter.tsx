import React from 'react';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./rds-counter.scss";

export interface RdsCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showInput?: boolean;
  label?: string;
  variant?: 'default' | 'compact';
  controlsClassName?: string;
}

const RdsCounter: React.FC<RdsCounterProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  size = 'medium',
  showInput = true,
  label,
  variant = 'default',
  controlsClassName,
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'small':
        return {
          buttonSize: 'small' as const,
          inputWidth: 60,
          fontSize: '0.875rem',
        };
      case 'large':
        return {
          buttonSize: 'large' as const,
          inputWidth: 100,
          fontSize: '1.25rem',
        };
      default:
        return {
          buttonSize: 'medium' as const,
          inputWidth: 80,
          fontSize: '1rem',
        };
    }
  };

  const sizeProps = getSizeProps();

  const isCompact = variant === 'compact';

  if (isCompact) {
    return (
      <Box className={`rds-counter rds-counter--compact rds-counter--${size}${disabled ? ' rds-counter--disabled' : ''}`}> 
        {label && (
          <Typography className={`rds-counter__label rds-counter__label--compact rds-counter__label--${size}`}>{label}</Typography>
        )}
        <Box className={`rds-counter__controls rds-counter__controls--compact rds-counter__controls--${size}${controlsClassName ? ' ' + controlsClassName : ''}`}> 
          <IconButton
            onClick={handleDecrement}
            disabled={disabled || value <= min}
            size={size === 'small' ? 'small' : 'medium'}
            className={`rds-counter__button rds-counter__button--decrement rds-counter__button--compact rds-counter__button--${size}`}
          >
            <RemoveIcon className="rds-counter__icon" />
          </IconButton>
          {showInput ? (
            <InputBase
              value={value}
              onChange={handleInputChange}
              disabled={disabled}
              className={`rds-counter__input rds-counter__input--compact rds-counter__input--${size}${disabled ? ' rds-counter__input--disabled' : ''}`}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min,
                max,
                'aria-label': label ? `${label} value` : 'counter value',
              }}
            />
          ) : (
            <Typography className={`rds-counter__value rds-counter__value--compact rds-counter__value--${size}${disabled ? ' rds-counter__value--disabled' : ''}`}>{value}</Typography>
          )}
          <IconButton
            onClick={handleIncrement}
            disabled={disabled || value >= max}
            size={size === 'small' ? 'small' : 'medium'}
            className={`rds-counter__button rds-counter__button--increment rds-counter__button--compact rds-counter__button--${size}`}
          >
            <AddIcon className="rds-counter__icon" />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={`rds-counter rds-counter--${size}${disabled ? ' rds-counter--disabled' : ''}`}> 
      {label && (
        <Typography className={`rds-counter__label rds-counter__label--${size}`}>{label}</Typography>
      )}
      <Box 
        className={`rds-counter__controls rds-counter__controls--${size}`}
        sx={
          !isCompact && size === 'small' ? { width: 120, gap: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } :
          !isCompact && size === 'medium' ? { width: 200, gap: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } :
          !isCompact && size === 'large' ? { width: 240, gap: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' } :
          {}
        }
      >
        <IconButton
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          size={size === 'small' ? 'small' : 'medium'}
          className={`rds-counter__button rds-counter__button--decrement rds-counter__button--${size}`}
        >
          <RemoveIcon className="rds-counter__icon" />
        </IconButton>
        {showInput ? (
          <InputBase
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            className={`rds-counter__input rds-counter__input--${size}${disabled ? ' rds-counter__input--disabled' : ''}`}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min,
              max,
              'aria-label': label ? `${label} value` : 'counter value',
            }}
          />
        ) : (
          <Typography className={`rds-counter__value rds-counter__value--${size}`}>{value}</Typography>
        )}
        <IconButton
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          size={size === 'small' ? 'small' : 'medium'}
          className={`rds-counter__button rds-counter__button--increment rds-counter__button--${size}`}
        >
          <AddIcon className="rds-counter__icon" />
        </IconButton>
      </Box>
    </Box>
  );
};
RdsCounter.displayName = 'RdsCounter';
export default RdsCounter;
