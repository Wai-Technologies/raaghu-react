import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import './rds-input.scss';

export interface RdsInputProps extends Omit<TextFieldProps, 'variant' | 'style'> {
  label?: string;
  placeholder?: string;
  hintText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium';
  layout?: 'text' | 'password' | 'phone number' | 'number' | 'card number';
  labelposition?: boolean;
  style?: 'default' | 'pill' | 'bottom outline'; // Now using 'style' instead of 'inputStyle'
  state?: 'default'|'active' | 'selected' | 'error' | 'disabled';
}

const RdsInput: React.FC<RdsInputProps> = ({
  label,
  placeholder,
  hintText,
  errorMessage,
  isRequired = false,
  variant = 'outlined',
  size = 'small',
  layout = 'text',
  labelposition = true,
  style = 'default',
  state = 'default',
  error,
  disabled,
  ...props
}) => {
  // Custom styles for input size
  // Determine size class
  const sizeClass = size === 'small' ? 'rds-input__small' : 'rds-input__medium';

  // Pill style class
  const pillClass = style === 'pill' ? 'rds-input__pill' : style === 'bottom outline' ? 'rds-input__bottom-outline' : '';
  
  // State class
  let stateClass = '';
  if (state === 'error' || error) {
    stateClass = 'rds-input__error';
  } else if (state === 'disabled' || disabled) {
    stateClass = 'rds-input__disabled';
  } else if (state === 'active') {
    stateClass = 'rds-input__active';
  } else if (state === 'selected') {
    stateClass = 'rds-input__selected';
  }

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
    <div className={`rds-input ${sizeClass} ${pillClass} ${stateClass}`.trim()}>
      {!labelposition && label && (
        <label className="rds-input__label">
          {label}
          {isRequired === true && (<span className="rds-input__asterisk">*</span>)}
        </label>
      )}
      <MuiTextField
        label={labelposition ? label : ''}
        placeholder={placeholder}
        helperText={errorMessage || hintText}
        error={!!errorMessage || error || state === 'error'}
        disabled={disabled || state === 'disabled'}
        required={isRequired}
        variant={variant}
        size={size}
        type={inputType}
        fullWidth
        focused={state === 'active'}
        InputProps={{ 
          className: 'rds-input__field',
          classes: {
            root: state === 'active' ? 'Mui-focused' : '',
            focused: state === 'active' ? 'Mui-focused' : '',
          },
        }}
        {...props}
      />
    </div>
  );
};

export default RdsInput;
