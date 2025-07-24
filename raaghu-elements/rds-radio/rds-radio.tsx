import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioProps,
  RadioGroupProps,
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

const RdsRadio: React.FC<RdsRadioProps> = ({
  options,
  label,
  direction = 'column',
  radioProps,
  layout = 'icon with label',
  state = 'default',
  row,
  ...props
}) => {
  const isDisabled = (optDisabled: boolean) => optDisabled || state === 'disabled';
  const isHoverable = state === 'hover' || state === 'default';
  const radioRow = row ?? direction === 'row';

  const renderOption = (option: RdsRadioOption) => {
    const commonProps = {
      value: option.value,
      control: <MuiRadio {...radioProps} disabled={isDisabled(option.disabled ?? false)} />,
      disabled: isDisabled(option.disabled ?? false),
    };

    if (layout === 'icon') {
      return <FormControlLabel key={option.value} {...commonProps} label="" className="rds-radio__option rds-radio__option--icon" />;
    }

    if (layout === 'icon with bottom label') {
      return (
        <Box
          key={option.value}
          className={`rds-radio__bottom-label-container ${isDisabled(option.disabled ?? false) ? 'rds-radio__bottom-label-container--disabled' : ''}`}
        >
          <MuiRadio 
            {...radioProps} 
            value={option.value}
            disabled={isDisabled(option.disabled ?? false)}
            checked={props.value === option.value}
            name={props.name}
            onChange={(event) => {
              if (!isDisabled(option.disabled ?? false) && props.onChange) {
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
              className={`rds-radio__bottom-label ${isDisabled(option.disabled ?? false) ? 'rds-radio__bottom-label--disabled' : ''}`}
              onClick={() => {
                if (!isDisabled(option.disabled ?? false) && props.onChange) {
                  const event = {
                    target: { value: option.value }
                  } as React.ChangeEvent<HTMLInputElement>;
                  props.onChange(event, option.value);
                }
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
