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
  /** Layout of buttons relative to the value/input */
  layout?: 'right-side' | 'side-to-side' | 'bottom';
  /** Placeholder text shown when input is empty (only when showInput = true) */
  placeholder?: string;
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
  layout = 'side-to-side',
  placeholder='00',
  controlsClassName,
  showTitle = true,
  isMandatory = false,
  selected = false,
  state = 'default',
}: RdsCounterProps) => {
  const isControlled = typeof value === 'number' && typeof onChange === 'function';
  const [internalValue, setInternalValue] = React.useState<number | undefined>(
    typeof defaultValue === 'number' ? defaultValue : undefined
  );
  const currentValue = isControlled ? value : internalValue;


  const updateValue = (newValue: number | undefined) => {
    if (isControlled) {
      if (typeof newValue === 'number') onChange && onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleIncrement = () => {
    const base = typeof currentValue === 'number' ? currentValue : min;
    const newValue = Math.min(base + step, max);
    updateValue(newValue);
  };

  const handleDecrement = () => {
    const base = typeof currentValue === 'number' ? currentValue : min;
    const newValue = Math.max(base - step, min);
    updateValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value.trim();
    if (raw === '') {
      updateValue(undefined);
      return;
    }
    const newValue = parseInt(raw, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) updateValue(newValue);
  };

  const isCompact = variant === 'compact';

  // if state prop is provided, map to selected/disabled for demo usage
  const demoSelected = state === 'selected' || selected;
  const demoDisabled = state === 'disabled' || disabled;
  const effectiveSelected = demoSelected;
  const effectiveDisabled = demoDisabled;

  // unified render path for both variants with layout logic
  const containerClasses = `rds-counter rds-counter--${variant} rds-counter--${size}${demoSelected ? ' rds-counter--selected' : ''}${demoDisabled ? ' rds-counter--disabled' : ''} rds-counter--layout-${layout}`;

  const buildValue = (valueVariant: 'compact' | 'default') => (
    showInput ? (
      <InputBase
        value={typeof currentValue === 'number' ? currentValue : ''}
        onChange={handleInputChange}
        disabled={effectiveDisabled}
        className={`rds-counter__input rds-counter__input--${valueVariant} rds-counter__input--${size}${effectiveDisabled ? ' rds-counter__input--disabled' : ''}`}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          min,
          max,
          'aria-label': titleText ? `${titleText} value` : 'counter value',
          placeholder: placeholder,
          style: { textAlign: 'center' }
        }}
      />
    ) : (
      <Typography className={`rds-counter__value rds-counter__value--${valueVariant} rds-counter__value--${size}${effectiveDisabled ? ' rds-counter__value--disabled' : ''}`}>
        {typeof currentValue === 'number' ? currentValue : placeholder}
      </Typography>
    )
  );

  const decButton = (
    <IconButton
      onClick={handleDecrement}
  disabled={effectiveDisabled || (typeof currentValue === 'number' ? currentValue <= min : false)}
      size={size === 'small' ? 'small' : 'medium'}
      className={`rds-counter__button rds-counter__button--decrement rds-counter__button--${variant} rds-counter__button--${size}${effectiveDisabled || (typeof currentValue === 'number' && currentValue <= min) ? ' rds-counter__button--disabled' : ''}`}
    >
      <RemoveIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
    </IconButton>
  );
  const incButton = (
    <IconButton
      onClick={handleIncrement}
  disabled={effectiveDisabled || (typeof currentValue === 'number' ? currentValue >= max : false)}
      size={size === 'small' ? 'small' : 'medium'}
      className={`rds-counter__button rds-counter__button--increment rds-counter__button--${variant} rds-counter__button--${size}${effectiveDisabled || (typeof currentValue === 'number' && currentValue >= max) ? ' rds-counter__button--disabled' : ''}`}
    >
      <AddIcon className={`rds-counter__icon rds-counter__icon--${variant} rds-counter__icon--${size}`} />
    </IconButton>
  );

  const renderControls = () => {
    const base = `rds-counter__controls rds-counter__controls--${variant} rds-counter__controls--${size} rds-counter__controls--layout-${layout}${controlsClassName ? ' ' + controlsClassName : ''}`;
    const valueNode = buildValue(variant === 'compact' ? 'compact' : 'default');
    if (layout === 'right-side') {
      return <Box className={base}>{valueNode}{decButton}{incButton}</Box>;
    }
    if (layout === 'bottom') {
      return (
        <Box className={base}>
          <Box className="rds-counter__value-wrapper">{valueNode}</Box>
            <Box className="rds-counter__button-group">{decButton}{incButton}</Box>
        </Box>
      );
    }
    // side-to-side
    return <Box className={base}>{decButton}{valueNode}{incButton}</Box>;
  };

  return (
    <Box className={containerClasses}>
      {showTitle && titleText && (
        <Typography className={`rds-counter__label ${isCompact ? 'rds-counter__label--compact' : ''} rds-counter__label--${size}`}>
          {titleText}
          <span className="rds-counter__mandatory" style={{ visibility: isMandatory ? 'visible' : 'hidden' }}>*</span>
        </Typography>
      )}
      {renderControls()}
    </Box>
  );
};

RdsCounter.displayName = 'RdsCounter';
export default RdsCounter;