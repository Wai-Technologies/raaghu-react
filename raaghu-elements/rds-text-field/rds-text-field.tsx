import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export interface RdsTextFieldProps extends Omit<TextFieldProps, 'required'> {
  isRequired?: boolean;
  errorMessage?: string;
}

const RdsTextField: React.FC<RdsTextFieldProps> = ({
  isRequired = false,
  errorMessage,
  error,
  helperText,
  ...props
}) => {
  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={isRequired}
      {...props}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
