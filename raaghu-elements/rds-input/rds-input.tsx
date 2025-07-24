import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';


export interface RdsInputProps extends Omit<TextFieldProps, 'variant'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  inputSize?: 'small' | 'medium';
  layout?: 'text' | 'password' | 'phone number' |'number' | 'card number';
  labelposition?: boolean;
}

const RdsInput: React.FC<RdsInputProps> = ({
  label,
  placeholder,
  helperText,
  errorMessage,
  isRequired = false,
  variant = 'outlined',
  inputSize = 'small',
  layout = 'text',
  labelposition = true,
  error,
  ...props
}) => {
  // Custom styles for input size
  // Determine size class
  const sizeClass = inputSize === 'small' ? 'rds-input--small' : 'rds-input--medium';

  // Map layout to MUI type
  let inputType: string = 'text';
  switch (layout) {
    case 'password':
      inputType = 'password';
      break;
    case 'number':
    case 'card number':
      inputType = 'number';
      break;
    case 'phone number':
      inputType = 'tel';
      break;
    default:
      inputType = 'text';
  }

  return (
    <div className={`rds-input ${sizeClass}`}>
      {!labelposition && label && (
        <label className="rds-input__label">
          {label}
          {isRequired === true && (<span className="rds-input__asterisk">*</span>)}
        </label>
      )}
      <MuiTextField
        label={labelposition ? label : ''}
        placeholder={placeholder}
        helperText={errorMessage || helperText}
        error={!!errorMessage || error}
        required={isRequired}
        variant={variant}
        size={inputSize}
        type={inputType}
        fullWidth
        InputProps={{ className: 'rds-input__field' }}
        {...props}
      />
    </div>
  );
};

export default RdsInput;
