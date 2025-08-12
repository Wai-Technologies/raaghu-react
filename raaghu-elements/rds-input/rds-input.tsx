import React from 'react';
import { TextField as MuiTextField, TextFieldProps, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIcon from '@mui/icons-material/Phone';
import './rds-input.scss';

export interface RdsInputProps extends Omit<TextFieldProps, 'variant' | 'style' | 'size'> {
  label?: string;
  placeholder?: string;
  hintText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  layout?: 'text' | 'password' | 'phone number' | 'number' | 'card number';
  showTitle?: boolean;
  style?: 'default' | 'pill' | 'bottom outline'; // Now using 'style' instead of 'inputStyle'
  state?: 'default'|'active' | 'selected' | 'error' | 'disabled';
  showIcon?: boolean; // New prop to control icon visibility
  iconPosition?: 'start' | 'end';
  iconName?: string; // Icon name if using custom icon
  icon?: React.ReactNode; // Custom icon component provided by the user
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
  showTitle = true,
  style = 'default',
  state = 'default',
  showIcon = false,
  iconPosition = 'end',
  iconName = 'search',
  icon,
  error,
  disabled,
  ...props
}) => {
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

  return (
    <div className={`rds-input ${sizeClass} ${pillClass} ${stateClass}`.trim()}>
      {!showTitle && label && (
        <label className="rds-input__label">
          {label}
          {isRequired === true && (<span className="rds-input__asterisk">*</span>)}
        </label>
      )}
      <MuiTextField
        label={showTitle ? label : ''}
        placeholder={placeholder}
        helperText={errorMessage || hintText}
        error={!!errorMessage || error || state === 'error'}
        disabled={disabled || state === 'disabled'}
        required={isRequired}
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
        }}
        {...props}
      />
    </div>
  );
};

export default RdsInput;
