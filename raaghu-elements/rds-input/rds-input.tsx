import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent,
  type FormEvent,
} from 'react';
import {
  TextField as MuiTextField,
  type TextFieldProps,
  InputAdornment,
} from '@mui/material';
import type { InputProps } from '@mui/material/Input';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-input.scss';

function getInputPlaceholder(
  layoutType: RdsInputProps['layout'] | undefined,
): string {
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
}

export interface RdsInputProps
  extends Omit<
    TextFieldProps,
    'variant' | 'style' | 'size' | 'component'
  > {
  /**
   * Field label. Shown above the field with `titlePosition="title-above"` or inside it with
   * `"inline-title"`; otherwise it is used as the input's accessible name only.
   */
  label?: string;
  placeholder?: string;
  /** Error text: shown as helper text and puts the field in the error state. */
  errorMessage?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  layout?: 'text' | 'password' | 'phone number' | 'number' | 'card number';
  titlePosition?: 'title-above' | 'inline-title' | (string & {});
  style?: 'default' | 'pill' | 'bottom outline';
  state?: 'default' | 'active' | 'selected' | 'error' | 'disabled';
  showIcon?: boolean;
  iconPosition?: 'start' | 'end';
  /** Icon shown when `showIcon` is set. */
  icon?: ReactNode;
  /** @deprecated Use `helperText`. */
  hintText?: string;
  mandatory?: boolean;
}

const RdsInput = ({
  label,
  placeholder,
  hintText,
  helperText,
  errorMessage,
  mandatory,
  required,
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
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  id,
  InputProps: legacyInputProps,
  slotProps: consumerSlotProps,
  ...props
}: RdsInputProps) => {
  if (hintText !== undefined) {
    warnDeprecatedProp('RdsInput', 'hintText', '`helperText`');
  }

  const isRequired = mandatory ?? required ?? false;

  const generatedId = useId();
  const inputId = id ?? `rds-input-${generatedId}`;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(
    defaultValue == null ? '' : String(defaultValue),
  );
  const [prevLayout, setPrevLayout] = useState(layout);

  const isControlled = value !== undefined;

  if (layout !== prevLayout) {
    setPrevLayout(layout);
    if (!isControlled) {
      setInternalValue('');
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInternalChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const currentValue = isControlled ? value : internalValue;

  const sizeClass =
    size === 'small'
      ? 'rds-input--small'
      : size === 'medium'
        ? 'rds-input--medium'
        : 'rds-input--large';

  const pillClass =
    style === 'pill'
      ? 'rds-input--pill'
      : style === 'bottom outline'
        ? 'rds-input--bottom-outline'
        : '';

  const isFocusedDefault = state === 'default' && isFocused;
  const active = state === 'active' || isFocusedDefault;

  let stateClass = '';

  if (state === 'error' || error) {
    stateClass = 'rds-input--error';
  } else if (state === 'disabled' || disabled) {
    stateClass = 'rds-input--disabled';
  } else if (state === 'selected' || isFocusedDefault) {
    stateClass = 'rds-input--selected';
  } else if (state === 'active') {
    stateClass = 'rds-input--active';
  }

  let inputType: string = 'text';

  switch (layout) {
    case 'password':
      inputType = showPassword ? 'text' : 'password';
      break;
    case 'number':
    case 'card number':
    case 'phone number':
      inputType = 'tel';
      break;
    default:
      inputType = 'text';
  }

  const renderIcon = () => {
    if (!showIcon) return null;

    return (
      <InputAdornment
        position={iconPosition}
        className={`rds-input__icon rds-input__icon--${iconPosition}`}
      >
        {icon}
      </InputAdornment>
    );
  };

  const handleNumericKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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

    if (e.ctrlKey || e.metaKey) return;

    const input = e.currentTarget;
    const selectionStart = input.selectionStart ?? input.value.length;
    const selectionEnd = input.selectionEnd ?? selectionStart;
    const hasPlus = input.value.startsWith('+');
    const isPlusKey = e.key === '+';
    const isDigit = /^[0-9]$/.test(e.key);

    if (isPlusKey && layout === 'phone number') {
      const atStart = selectionStart === 0;
      const replacingPlus =
        hasPlus && selectionStart === 0 && selectionEnd > 0;

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

  const handlePhoneInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const orig = target.value;
    const startsWithPlus = orig.startsWith('+');

    let digits = orig.replace(/\D/g, '');
    const maxDigits = startsWithPlus ? 12 : 10;

    if (digits.length > maxDigits) {
      digits = digits.slice(0, maxDigits);
    }

    const next = (startsWithPlus ? '+' : '') + digits;

    if (orig !== next) {
      target.value = next;

      if (!isControlled) {
        setInternalValue(next);
      }

      // Pass the real event so name and id are preserved.
      onChange?.(e as ChangeEvent<HTMLInputElement>);
    }
  };

  const computedPlaceholder = placeholder ?? getInputPlaceholder(layout);
  const inlineTitleClass =
    titlePosition === 'inline-title' ? 'rds-input--inline-title' : '';

  const showsLabel =
    titlePosition === 'title-above' ||
    titlePosition === 'inline-title';

  const hiddenLabelProps: InputHTMLAttributes<HTMLInputElement> =
    label && !showsLabel && !props['aria-label']
      ? { 'aria-label': label }
      : {};

  const numericInputProps: InputHTMLAttributes<HTMLInputElement> =
    layout === 'phone number' ||
    layout === 'number' ||
    layout === 'card number'
      ? {
          inputMode: layout === 'phone number' ? 'tel' : 'numeric',
          ...(layout === 'phone number'
            ? { pattern: '^(?:\\+\\d{12}|\\d{10})$' }
            : {}),
          onKeyDown: handleNumericKeyDown,
          ...(layout === 'phone number'
            ? { onInput: handlePhoneInput }
            : {}),
        }
      : {};

  const consumerInputProps =
    typeof consumerSlotProps?.input === 'object' &&
    consumerSlotProps?.input !== null
      ? (consumerSlotProps.input as InputProps)
      : undefined;

  const inputSlotProps: InputProps = {
    ...legacyInputProps,
    ...consumerInputProps,
    className: clsx(
      'rds-input__field',
      legacyInputProps?.className,
      consumerInputProps?.className,
    ),
    classes: {
      root: active ? 'Mui-focused' : '',
      focused: active ? 'Mui-focused' : '',
      ...legacyInputProps?.classes,
      ...consumerInputProps?.classes,
    },
    startAdornment:
      iconPosition === 'start' && showIcon
        ? renderIcon()
        : consumerInputProps?.startAdornment ??
          legacyInputProps?.startAdornment,
    endAdornment:
      iconPosition === 'end' && showIcon
        ? renderIcon()
        : consumerInputProps?.endAdornment ??
          legacyInputProps?.endAdornment,
  };

  return (
    <div
      className={clsx(
        'rds-input',
        sizeClass,
        pillClass,
        stateClass,
        inlineTitleClass,
      )}
    >
      {titlePosition === 'title-above' && label && (
        <label className="rds-input__label" htmlFor={inputId}>
          {label}
          {isRequired && <span className="rds-input__asterisk">*</span>}
        </label>
      )}

      <MuiTextField
        id={inputId}
        label={titlePosition === 'inline-title' ? label : ''}
        placeholder={computedPlaceholder}
        helperText={helperText ?? (errorMessage || hintText)}
        error={!!errorMessage || error || state === 'error'}
        disabled={disabled || state === 'disabled'}
        required={isRequired}
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        type={inputType}
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
        slotProps={{
          ...consumerSlotProps,
          input: inputSlotProps,
          htmlInput: {
            ...hiddenLabelProps,
            ...numericInputProps,
            ...consumerSlotProps?.htmlInput,
          },
        }}
        {...props}
      />
    </div>
  );
};

RdsInput.displayName = 'RdsInput';

export default RdsInput;