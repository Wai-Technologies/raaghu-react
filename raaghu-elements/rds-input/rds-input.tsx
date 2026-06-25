import React from 'react';
import { TextField as MuiTextField, type TextFieldProps, InputAdornment } from '@mui/material';
import {
  getSizeClass,
  getPillClass,
  getStateClass,
  getInputType,
  getPlaceholder,
  createNumericKeyDownHandler,
  createPhoneInputHandler,
  getNumericInputProps,
} from './rds-input.helpers';
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
  style?: 'default' | 'pill' | 'bottom outline';
  state?: 'default' | 'active' | 'selected' | 'error' | 'disabled';
  showIcon?: boolean;
  iconPosition?: 'start' | 'end';
  icon?: React.ReactNode;
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
  icon,
  error,
  disabled,
  value,
  onChange,
  onFocus,
  onBlur,
  ...props
}: RdsInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');
  const isControlled = value !== undefined;

  React.useEffect(() => {
    if (!isControlled) {
      setInternalValue('');
    }
  }, [layout, isControlled]);

  const handleInternalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const currentValue = isControlled ? value : internalValue;
  const active = state === 'active' || (state === 'default' && isFocused);
  const handleNumericKeyDown = React.useMemo(() => createNumericKeyDownHandler(layout), [layout]);
  const handlePhoneInput = React.useMemo(
    () => createPhoneInputHandler({ isControlled, setInternalValue, onChange }),
    [isControlled, onChange]
  );

  const renderIcon = () => {
    if (!showIcon) return null;
    return (
      <InputAdornment position={iconPosition} className={`rds-input__icon rds-input__icon--${iconPosition}`}>
        {icon}
      </InputAdornment>
    );
  };

  const inlineTitleClass = titlePosition === 'inline-title' ? 'rds-input--inline-title' : '';
  const computedPlaceholder = placeholder ?? getPlaceholder(layout);

  return (
    <div
      className={`rds-input ${getSizeClass(size)} ${getPillClass(style)} ${getStateClass(state, error, disabled, active)} ${inlineTitleClass}`.trim()}
    >
      {titlePosition === 'title-above' && label && (
        <label className="rds-input__label">
          {label}
          {isMandatory === true && <span className="rds-input__asterisk">*</span>}
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
        type={getInputType(layout, showPassword)}
        fullWidth
        focused={active}
        value={currentValue}
        onChange={handleInternalChange}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        InputProps={{
          className: 'rds-input__field',
          classes: {
            root: active ? 'Mui-focused' : '',
            focused: active ? 'Mui-focused' : '',
          },
          startAdornment: iconPosition === 'start' && showIcon ? renderIcon() : null,
          endAdornment: iconPosition === 'end' && showIcon ? renderIcon() : null,
          inputProps: {
            ...getNumericInputProps(layout, handleNumericKeyDown, handlePhoneInput),
          } as Record<string, unknown>,
          ...(props.InputProps || {}),
        }}
        {...props}
      />
    </div>
  );
};
RdsInput.displayName = 'RdsInput';
export default RdsInput;
