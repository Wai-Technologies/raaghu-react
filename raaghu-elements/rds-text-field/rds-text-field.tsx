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
  InputLabelProps: inputLabelProps,
  multiline,
  rows,
  minRows,
  maxRows,
  ...props
}) => {
  const isPassword = props.type === 'password';
  const multilineProps = isPassword ? {} : { multiline, rows, minRows, maxRows };
  const mergedLabelProps = {
    ...inputLabelProps,
    shrink: inputLabelProps?.shrink ?? (props.placeholder ? true : undefined),
  };

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
  
  const fieldProps = defaultValue !== undefined && props.value === undefined
    ? { defaultValue } 
    : {};
    
  return (
    <MuiTextField
      error={error || !!errorMessage}
      helperText={errorMessage || helperText}
      required={isRequired}
      FormHelperTextProps={mergedHelperTextProps}
      InputLabelProps={mergedLabelProps}
      {...multilineProps}
      {...fieldProps}
      {...props}
      className={rootClassName}
    />
  );
};
RdsTextField.displayName = 'RdsTextField';
export default RdsTextField;
