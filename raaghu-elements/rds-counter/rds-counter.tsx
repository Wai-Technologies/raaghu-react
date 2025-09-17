import React from 'react';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./rds-counter.scss";

export interface RdsCounterProps {
  value?: number;
  onChange?: (value: number) => void;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showInput?: boolean;
  titleText?: string;
  variant?: 'default' | 'compact';
  controlsClassName?: string;
  showTitle?: boolean;
  isMandatory?: boolean;
  selected?: boolean;
  // optional convenience prop for Storybook/demo only: 'default' | 'selected' | 'disabled'
  state?: 'default' | 'selected' | 'disabled';
}

const RdsCounter = ({
  value,
  onChange,
  defaultValue,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  size = 'medium',
  showInput = true,
  titleText,
  variant = 'default',
  controlsClassName,
  showTitle = true,
  isMandatory = false,
  selected = false,
  state = 'default',
}: RdsCounterProps) => {
  const isControlled = typeof value === 'number' && typeof onChange === 'function';
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? min);
  const currentValue = isControlled ? value : internalValue;


  const updateValue = (newValue: number) => {
    if (isControlled) {
      onChange && onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(currentValue + step, max);
    updateValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(currentValue - step, min);
    updateValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      updateValue(newValue);
    }
  };

  const isCompact = variant === 'compact';

  // if state prop is provided, map to selected/disabled for demo usage
  const demoSelected = state === 'selected' || selected;
  const demoDisabled = state === 'disabled' || disabled;
  const effectiveSelected = demoSelected;
  const effectiveDisabled = demoDisabled;

  if (isCompact) {
    return (
      <Box className={`rds-counter rds-counter--compact rds-counter--${size}${demoSelected ? ' rds-counter--selected' : ''}${demoDisabled ? ' rds-counter--disabled' : ''}`}> 
        {showTitle && titleText && (
          <Typography className={`rds-counter__label rds-counter__label--compact rds-counter__label--${size}`}>
            {titleText}
            <span
              className="rds-counter__mandatory"
              style={{ visibility: isMandatory ? 'visible' : 'hidden' }}
            >
              *
            </span>
          </Typography>
        )}
        <Box className={`rds-counter__controls rds-counter__controls--compact rds-counter__controls--${size}${controlsClassName ? ' ' + controlsClassName : ''}`}> 
          <IconButton
            onClick={handleDecrement}
            disabled={effectiveDisabled || currentValue <= min}
            size={size === 'small' ? 'small' : 'medium'}
            className={`rds-counter__button rds-counter__button--decrement rds-counter__button--compact rds-counter__button--${size}${effectiveDisabled || currentValue <= min ? ' rds-counter__button--disabled' : ''}`}
          >
            <RemoveIcon className={`rds-counter__icon rds-counter__icon--compact rds-counter__icon--${size}`} />
          </IconButton>
          {showInput ? (
            <InputBase
              value={currentValue}
              onChange={handleInputChange}
              disabled={effectiveDisabled}
              className={`rds-counter__input rds-counter__input--compact rds-counter__input--${size}${effectiveDisabled ? ' rds-counter__input--disabled' : ''}`}inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                min,
                max,
                'aria-label': titleText ? `${titleText} value` : 'counter value',
                sx: { textAlign: 'center' }
              }}
            />
          ) : (
            <Typography className={`rds-counter__value rds-counter__value--compact rds-counter__value--${size}${effectiveDisabled ? ' rds-counter__value--disabled' : ''}`}>  {currentValue}
            </Typography>
          )}
          <IconButton
            onClick={handleIncrement}
            disabled={effectiveDisabled  || currentValue >= max}
            size={size === 'small' ? 'small' : 'medium'}
            className={`rds-counter__button rds-counter__button--increment rds-counter__button--compact rds-counter__button--${size}${effectiveDisabled || currentValue >= max ? ' rds-counter__button--disabled' : ''}`}
          >
            <AddIcon className={`rds-counter__icon rds-counter__icon--compact rds-counter__icon--${size}`} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
  <Box className={`rds-counter rds-counter--${variant} rds-counter--${size}${demoSelected ? ' rds-counter--selected' : ''}${demoDisabled ? ' rds-counter--disabled' : ''}`}> 
        <Typography className={`rds-counter__label rds-counter__label--${size}`}>
          {titleText}
          <span
            className="rds-counter__mandatory"
            style={{ visibility: isMandatory ? 'visible' : 'hidden' }}
          >
            *
          </span>
        </Typography>
      <Box 
        className={`rds-counter__controls rds-counter__controls--${variant} rds-counter__controls--${size}${controlsClassName ? ' ' + controlsClassName : ''}`}
      >
        <IconButton
          onClick={handleDecrement}
          disabled={effectiveDisabled  || currentValue <= min}
          size={size === 'small' ? 'small' : 'medium'}
          className={`rds-counter__button rds-counter__button--decrement rds-counter__button--${variant} rds-counter__button--${size}${effectiveDisabled || currentValue <= min ? ' rds-counter__button--disabled' : ''}`}
        >
          <RemoveIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
        </IconButton>
        {showInput ? (
          <InputBase
            value={currentValue}
            onChange={handleInputChange}
            disabled={effectiveDisabled}
            className={`rds-counter__input rds-counter__input--${variant} rds-counter__input--${size}${effectiveDisabled ? ' rds-counter__input--disabled' : ''}`}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              min,
              max,
              'aria-label': titleText ? `${titleText} value` : 'counter value',
              style: { textAlign: 'center' }
            }}
          />
        ) : (
          <Typography className={`rds-counter__value rds-counter__value--${variant} rds-counter__value--${size}${effectiveDisabled ? ' rds-counter__value--disabled' : ''}`}>
            {currentValue}
          </Typography>
        )}
        <IconButton
          onClick={handleIncrement}
          disabled={effectiveDisabled  || currentValue >= max}
          size={size === 'small' ? 'small' : 'medium'}
          className={`rds-counter__button rds-counter__button--increment rds-counter__button--${variant} rds-counter__button--${size}${effectiveDisabled || currentValue >= max ? ' rds-counter__button--disabled' : ''}`}
        >
          <AddIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
        </IconButton>
      </Box>
    </Box>
  );
};

RdsCounter.displayName = 'RdsCounter';
export default RdsCounter;