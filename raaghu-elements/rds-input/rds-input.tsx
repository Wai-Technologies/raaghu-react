import React from 'react';
import { TextField as MuiTextField, type TextFieldProps, InputAdornment } from '@mui/material';
import './rds-input.scss';

export interface RdsInputProps extends Omit<TextFieldProps, 'variant' | 'style' | 'size'> {
  label?: string;
  placeholder?: string;
  hintText?: string;
  errorMessage?: string;
  isMandatory?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  layout?: 'text' | 'password' | 'phone number' | 'number' | 'card number';
  titlePosition?: string;
  style?: 'default' | 'pill' | 'bottom outline'; // Now using 'style' instead of 'inputStyle'
  state?: 'default'|'active' | 'selected' | 'error' | 'disabled';
  showIcon?: boolean; // New prop to control icon visibility
  iconPosition?: 'start' | 'end';
  iconName?: string; // Icon name if using custom icon
  icon?: React.ReactNode; // Custom icon component provided by the user
}

const RdsInput = ({
  label,
  placeholder,
  hintText,
  errorMessage,
  isMandatory = false,
  variant = 'outlined',
  size = 'small',
  layout = 'text',
  titlePosition,
  style = 'default',
  state = 'default',
  showIcon = false,
  iconPosition = 'end',
  iconName = 'search',
  icon,
  error,
  disabled,
  ...props
}: RdsInputProps) => {
  // State for password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Custom styles for input size
  // Determine size class
  const sizeClass = size === 'small' ? 'rds-input--small' : 
                     size === 'medium' ? 'rds-input--medium' : 
                     'rds-input--large';

  // Pill style class
  const pillClass = style === 'pill' ? 'rds-input--pill' : style === 'bottom outline' ? 'rds-input--bottom-outline' : '';
  
  // State class
  let stateClass = '';
  if (state === 'error' || error) {
    stateClass = 'rds-input--error';
  } else if (state === 'disabled' || disabled) {
    stateClass = 'rds-input--disabled';
  } else if (state === 'active') {
    stateClass = 'rds-input--active';
  } else if (state === 'selected') {
    stateClass = 'rds-input--selected';
  }

  // Map layout to MUI type
  let inputType: string = 'text';
  switch (layout) {
    case 'password':
      inputType = showPassword ? 'text' : 'password';
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
  
  // Choose appropriate custom icon
  const renderIcon = () => {
    if (!showIcon) return null;
    
    // If a custom icon is provided, use it
    if (icon) {
      return (
        <InputAdornment position={iconPosition} className={`rds-input__icon rds-input__icon--${iconPosition}`}>
          {icon}
        </InputAdornment>
      );
    }
    
    return (
      <InputAdornment position={iconPosition} className={`rds-input__icon rds-input__icon--${iconPosition}`}>
        {icon}
      </InputAdornment>
    );
  };

  // Handlers to enforce digits-only when layout is 'phone number'
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Home',
      'End',
      'Tab',
    ];
    // Allow shortcuts like Ctrl/Cmd + C/V/X/A
    if (e.ctrlKey || e.metaKey) return;

    const input = e.currentTarget;
    const selectionStart = input.selectionStart ?? input.value.length;
    const selectionEnd = input.selectionEnd ?? selectionStart;
    const hasPlus = input.value.startsWith('+');
    const isPlusKey = e.key === '+';
    const isDigit = /^[0-9]$/.test(e.key);

    // Only allow '+' at the very beginning and only once
    if (isPlusKey) {
      const atStart = selectionStart === 0;
      const replacingPlus = hasPlus && selectionStart === 0 && selectionEnd > 0;
      if (!atStart || (hasPlus && !replacingPlus)) {
        e.preventDefault();
      }
      return;
    }

    if (!isDigit && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Enforce max digits: 12 if starts with '+', otherwise 10
    if (isDigit) {
      const value = input.value;
      const selectedSegment = value.slice(selectionStart, selectionEnd);
      const digitsInValue = value.replace(/\D/g, '').length;
      const digitsInSelection = selectedSegment.replace(/\D/g, '').length;
      const maxDigits = hasPlus ? 12 : 10;
      if (digitsInValue - digitsInSelection >= maxDigits) {
        e.preventDefault();
      }
    }
  };

  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const orig = target.value;
    const startsWithPlus = orig.startsWith('+');
    let digits = orig.replace(/\D/g, '');
    const maxDigits = startsWithPlus ? 12 : 10;
    if (digits.length > maxDigits) digits = digits.slice(0, maxDigits);
    const next = (startsWithPlus ? '+' : '') + digits;
    if (orig !== next) {
      // Sanitize pasted/typed characters
      target.value = next;
    }
  };

  return (
    <div className={`rds-input ${sizeClass} ${pillClass} ${stateClass}`.trim()}>
      {titlePosition === 'title-above' && label && (
        <label className="rds-input__label">
          {label}
          {isMandatory === true && (<span className="rds-input__asterisk">*</span>)}
        </label>
      )}
      <MuiTextField
        label={titlePosition === 'inline-title' ? label : ''}
        placeholder={placeholder}
        helperText={errorMessage || hintText}
        error={!!errorMessage || error || state === 'error'}
        disabled={disabled || state === 'disabled'}
        required={isMandatory}
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        type={inputType}
        fullWidth
        focused={state === 'active'}
        InputProps={{
          className: 'rds-input__field',
          classes: {
            root: state === 'active' ? 'Mui-focused' : '',
            focused: state === 'active' ? 'Mui-focused' : '',
          },
          startAdornment: iconPosition === 'start' && showIcon ? renderIcon() : null,
          endAdornment: iconPosition === 'end' && showIcon ? renderIcon() : null,
          // Props for the underlying input element
          inputProps: {
            ...(layout === 'phone number'
              ? {
                  inputMode: 'tel',
                  pattern: '^(?:\\+\\d{12}|\\d{10})$',
                  onKeyDown: handlePhoneKeyDown,
                  onInput: handlePhoneInput,
                }
              : {}),
          },
          ...(props.InputProps || {}),
        }}
        {...props}
      />
    </div>
  );
};
RdsInput.displayName = 'RdsInput';
export default RdsInput;
