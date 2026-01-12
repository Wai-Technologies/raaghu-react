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
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}: RdsInputProps) => {
  // State for password visibility
  const [showPassword, setShowPassword] = React.useState(false);
  // Internal focus tracking to auto-apply active class when state is default
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');
  const isControlled = value !== undefined;
  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue('');
    }
  }, [layout, isControlled]);
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInternalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const currentValue = isControlled ? value : internalValue;
  // Custom styles for input size
  // Determine size class
  const sizeClass = size === 'small' ? 'rds-input--small' : 
                     size === 'medium' ? 'rds-input--medium' : 
                     'rds-input--large';

  // Pill style class
  const pillClass = style === 'pill' ? 'rds-input--pill' : style === 'bottom outline' ? 'rds-input--bottom-outline' : '';
  
  // Active visuals when prop state='active' OR default + focused
  const active = (state === 'active') || (state === 'default' && isFocused);

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
  } else if (active) {
    stateClass = 'rds-input--active';
  }

  // Map layout to MUI type
  let inputType: string = 'text';
  switch (layout) {
    case 'password':
      inputType = showPassword ? 'text' : 'password';
      break;
    case 'number':
    case 'card number':
      inputType = 'tel';
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

  const handleNumericKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

    if (isPlusKey && layout === 'phone number') {
      const atStart = selectionStart === 0;
      const replacingPlus = hasPlus && selectionStart === 0 && selectionEnd > 0;
      if (!atStart || (hasPlus && !replacingPlus)) {
        e.preventDefault();
      }
      return;
    } else if (isPlusKey && layout !== 'phone number') {
      e.preventDefault();
      return;
    }

    if (!isDigit && !allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (isDigit && layout === 'phone number') {
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
      if (!isControlled) {
        setInternalValue(next);
      }
      if (onChange) {
        const event = {
          ...e,
          target: { ...target, value: next }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };
  const getPlaceholder = (layoutType: RdsInputProps['layout'] | undefined) => {
    switch (layoutType) {
      case 'password':
        return '••••••••';
      case 'phone number':
        return 'Enter Phone Number';
      case 'number':
        return 'Enter Number';
      case 'card number':
        return 'XXXX XXXX XXXX XXXX';
      case 'text':
      default:
        return 'Placeholder Text';
    }
  };
  const computedPlaceholder = placeholder ?? getPlaceholder(layout);
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
        placeholder={computedPlaceholder}
        helperText={errorMessage || hintText}
        error={!!errorMessage || error || state === 'error'}
        disabled={disabled || state === 'disabled'}
        required={isMandatory}
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        type={inputType}
        fullWidth
        focused={active}
        value={currentValue}
        onChange={handleInternalChange}
        onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
        onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
        InputProps={{ 
          className: 'rds-input__field',
          classes: {
            root: active ? 'Mui-focused' : '',
            focused: active ? 'Mui-focused' : '',
          },
          startAdornment: iconPosition === 'start' && showIcon ? renderIcon() : null,
          endAdornment: iconPosition === 'end' && showIcon ? renderIcon() : null,
              // Props for the underlying input element
              // Props for the underlying input element
          inputProps: {
            ...(layout === 'phone number' || layout === 'number' || layout === 'card number'
              ? {
                  inputMode: layout === 'phone number' ? 'tel' : 'numeric',
                  ...(layout === 'phone number' ? { pattern: '^(?:\+\d{12}|\d{10})$' } : {}),
                  onKeyDown: handleNumericKeyDown,
                  ...(layout === 'phone number' ? { onInput: handlePhoneInput } : {}),
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
