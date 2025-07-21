import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export interface RdsInputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
}

const RdsInput: React.FC<RdsInputProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  isRequired = false,
  variant = 'outlined',
  error,
  ...props
}) => {
  return (
    <MuiTextField
      label={label}
      placeholder={placeholder}
      helperText={errorMessage || helperText}
      error={!!errorMessage || error}
      required={isRequired}
      variant={variant}
      fullWidth
      {...props}
    />
  );
};

export default RdsInput;
