import React from 'react';
import {
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  FormControl as MuiFormControl,
  FormControlLabel as MuiFormControlLabel,
  FormLabel as MuiFormLabel,
  RadioProps,
  RadioGroupProps
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
}

const RdsRadio: React.FC<RdsRadioProps> = ({
  options,
  label,
  direction = 'column',
  radioProps,
  row,
  ...props
}) => {
  const radioRow = row !== undefined ? row : direction === 'row';

  return (
    <MuiFormControl component="fieldset">
      {label && <MuiFormLabel component="legend">{label}</MuiFormLabel>}
      <MuiRadioGroup row={radioRow} {...props}>
        {options.map((option) => (
          <MuiFormControlLabel
            key={option.value}
            value={option.value}
            control={<MuiRadio {...radioProps} />}
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </MuiRadioGroup>
    </MuiFormControl>
  );
};

export default RdsRadio;
