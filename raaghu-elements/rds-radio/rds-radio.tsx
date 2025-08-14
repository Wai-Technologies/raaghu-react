import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  type RadioProps,
  type RadioGroupProps,
  Box,
  Typography
} from '@mui/material';

export interface RdsRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RdsRadioProps extends Omit<RadioGroupProps, 'children'> {
  options: RdsRadioOption[];
  label?: string;
  direction?: 'row' | 'column';
  radioProps?: RadioProps;
  layout?: 'icon' | 'icon with label' | 'icon with bottom label';
  state?: 'default' | 'hover' | 'disabled';
}

const RdsRadio= ({
  options,
  label,
  direction = 'column',
  radioProps,
  layout = 'icon with label',
  state = 'default',
  row,
  ...props
}:RdsRadioProps) => {
  const isDisabled = (optDisabled: boolean) => optDisabled || state === 'disabled';
  const isHoverable = state === 'hover' || state === 'default';
  const radioRow = row ?? direction === 'row';

  const renderOption = (option: RdsRadioOption) => {
    const optionDisabled = option.disabled ?? false;
    const finalDisabled = optionDisabled || state === 'disabled';
    
    const commonProps = {
      value: option.value,
      control: <MuiRadio {...radioProps} disabled={finalDisabled} />,
      disabled: finalDisabled,
    };

    if (layout === 'icon') {
      return <FormControlLabel key={option.value} {...commonProps} label="" className="rds-radio__option rds-radio__option--icon" />;
    }

    if (layout === 'icon with bottom label') {
      return (
        <Box
          key={option.value}
          className={`rds-radio__bottom-label-container ${finalDisabled ? 'rds-radio__bottom-label-container--disabled' : ''}`}
        >
          <MuiRadio 
            {...radioProps} 
            value={option.value}
            disabled={finalDisabled}
            checked={props.value === option.value}
            name={props.name}
            onChange={(event) => {
              if (!finalDisabled && props.onChange) {
                props.onChange(event, option.value);
              }
            }}
            className="rds-radio__option"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 0,
              padding: '4px'
            }}
          />
          {option.label && (
            <Typography
              component="span"
              className={`rds-radio__bottom-label ${finalDisabled ? 'rds-radio__bottom-label--disabled' : ''}`}
              onClick={() => {
                if (!finalDisabled && props.onChange) {
                  const event = {
                    target: { value: option.value }
                  } as React.ChangeEvent<HTMLInputElement>;
                  props.onChange(event, option.value);
                }
              }}
              sx={{
                pointerEvents: finalDisabled ? 'none' : 'auto',
                opacity: finalDisabled ? 0.6 : 1,
                color: finalDisabled ? 'var(--rds-text-disabled, #9e9e9e)' : 'inherit'
              }}
            >
              {option.label}
            </Typography>
          )}
        </Box>
      );
    }

    // Default: icon with label
    return (
      <FormControlLabel
        key={option.value}
        {...commonProps}
        label={option.label}
        className={`rds-radio__option rds-radio__option--with-label ${isHoverable ? 'rds-radio__option--hoverable' : ''}`}
      />
    );
  };

  return (
    <FormControl 
      component="fieldset" 
      className={`rds-radio rds-radio--${layout.replace(/ /g, '-')} ${state !== 'default' ? `rds-radio--${state}` : ''}`}
    >
      {label && <FormLabel component="legend" className="rds-radio__label">{label}</FormLabel>}
      {layout === 'icon with bottom label' ? (
        <Box className="rds-radio__group" sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          {options.map(renderOption)}
        </Box>
      ) : (
        <RadioGroup
          row={radioRow}
          className="rds-radio__group"
          {...props}
        >
          {options.map(renderOption)}
        </RadioGroup>
      )}
    </FormControl>
  );
};

export default RdsRadio;
