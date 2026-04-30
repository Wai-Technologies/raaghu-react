import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import './rds-text-field.scss';

export interface RdsTextFieldProps extends Omit<TextFieldProps, 'required'> {
  isRequired?: boolean;
  errorMessage?: string;
}

const RdsTextField: React.FC<RdsTextFieldProps> = ({
  isRequired = false,
  errorMessage,
  error,
  helperText,
  defaultValue,
  className,
  FormHelperTextProps: formHelperTextProps,
  ...props
}) => {
  const rootClassName = [
    'rds-text-field',
    className,
  ].filter(Boolean).join(' ');

  const mergedHelperTextProps = {
    ...formHelperTextProps,
    className: [
      'rds-text-field__helper-text',
      formHelperTextProps?.className,
    ].filter(Boolean).join(' '),
  };
  
  // Handle defaultValue - only pass it if explicitly provided and no value prop is present
  // to prevent React warnings about controlled/uncontrolled components
  const fieldProps = defaultValue !== undefined && props.value === undefined
    ? { defaultValue } 
    : {};
    
  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={isRequired}
      FormHelperTextProps={mergedHelperTextProps}
      {...fieldProps}
      {...props}
      className={rootClassName}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
