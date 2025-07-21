import React from 'react';
import { 
  Select as MuiSelect, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  SelectProps, 
  FormHelperText 
} from '@mui/material';

export interface RdsSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RdsSelectProps extends Omit<SelectProps, 'children'> {
  label?: string;
  placeholder?: string;
  options: RdsSelectOption[];
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
}

const RdsSelect: React.FC<RdsSelectProps> = ({
  label,
  placeholder,
  options,
  helperText,
  errorMessage,
  isRequired = false,
  error,
  ...props
}) => {
  return (
    <FormControl fullWidth error={!!errorMessage || error}>
      {label && (
        <InputLabel required={isRequired}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        displayEmpty={!!placeholder}
        {...props}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
      {(helperText || errorMessage) && (
        <FormHelperText>
          {errorMessage || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RdsSelect;
