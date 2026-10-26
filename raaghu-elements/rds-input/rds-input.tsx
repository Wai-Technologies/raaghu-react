import { useId, useState, type CSSProperties, type InputHTMLAttributes,type ReactNode, type ChangeEvent, type KeyboardEvent, type FormEvent } from 'react';
import { TextField as MuiTextField, type TextFieldProps, InputAdornment } from '@mui/material';
import type { InputProps } from '@mui/material/Input';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-input.scss';

function getInputPlaceholder(layoutType: RdsInputProps['layout'] | undefined): string {
  switch (layoutType) {
    case 'password': return '••••••••';
    case 'phone number': return 'Enter Phone Number';
    case 'number': return 'Enter Number';
    case 'card number': return 'XXXX XXXX XXXX XXXX';
    case 'text':
    default: return 'Placeholder Text';
  }
}

export interface RdsInputProps extends Omit<TextFieldProps, 'variant' | 'style' | 'size' | 'component' | 'focused'> {
  /**
   * Field label. Shown above the field with `titlePosition="title-above"`; otherwise it is shown
   * inside the field (floating label).
   */
  label?: string;
  placeholder?: string;
  /** @deprecated Use `error` with `helperText` instead. */
  errorMessage?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  layout?: 'text' | 'password' | 'phone number' | 'number' | 'card number';
  /** @deprecated Use `labelPlacement` instead. */
  titlePosition?: 'title-above' | 'inline-title' | (string & {});
  /** Label placement: `top` shows it above the field, `inline` inside it. */
  labelPlacement?: 'top' | 'inline';
  /** @deprecated Passing a variant string is deprecated; use `shape`. Pass CSSProperties for inline styles. */
  style?: 'default' | 'pill' | 'bottom outline' | CSSProperties;
  /** Field shape. */
  shape?: 'default' | 'pill' | 'bottom outline';
  selected?: boolean;
  /** Icon shown at the start of the field. */
  startIcon?: ReactNode;
  /** Icon shown at the end of the field. */
  endIcon?: ReactNode;
  /** @deprecated Use `startIcon` / `endIcon` instead. */
  showIcon?: boolean;
  /** @deprecated Use `startIcon` / `endIcon` instead. */
  iconPosition?: 'start' | 'end';
  /** @deprecated Use `startIcon` / `endIcon` instead. */
  icon?: ReactNode;
  /** @deprecated Use `helperText`. */
  hintText?: string;
  /** @deprecated Use `required`. */
  isMandatory?: boolean;
}

const labelPlacementMap = { top: 'title-above', inline: 'inline-title' } as const;

const renderAdornment = (node: ReactNode, position: 'start' | 'end') => (
  <InputAdornment position={position} className={`rds-input__icon rds-input__icon--${position}`}>
    {node}
  </InputAdornment>
);

const RdsInput = ({
  label,
  placeholder,
  hintText,
  helperText,
  errorMessage,
  isMandatory,
  required,
  variant = 'outlined',
  size = 'small',
  layout = 'text',
  titlePosition: legacyTitlePosition,
  labelPlacement,
  style,
  shape,
  selected = false,
  startIcon,
  endIcon,
  showIcon = false,
  iconPosition,
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
  if (hintText !== undefined) warnDeprecatedProp('RdsInput', 'hintText', '`helperText`');
  if (isMandatory !== undefined) warnDeprecatedProp('RdsInput', 'isMandatory', '`required`');
  if (errorMessage !== undefined) warnDeprecatedProp('RdsInput', 'errorMessage', '`error` with `helperText`');
  if (legacyTitlePosition !== undefined) warnDeprecatedProp('RdsInput', 'titlePosition', '`labelPlacement`');
  if (showIcon) warnDeprecatedProp('RdsInput', 'showIcon', '`startIcon` / `endIcon`');
  if (icon !== undefined) warnDeprecatedProp('RdsInput', 'icon', '`startIcon` / `endIcon`');
  if (iconPosition !== undefined) warnDeprecatedProp('RdsInput', 'iconPosition', '`startIcon` / `endIcon`');

  const titlePosition = labelPlacement ? labelPlacementMap[labelPlacement] : legacyTitlePosition;
  const legacyShape = typeof style === 'string' ? style : undefined;
  if (legacyShape !== undefined) warnDeprecatedProp('RdsInput', 'style', '`shape`');
  const resolvedStyle = shape ?? legacyShape ?? 'default';
  const legacyIconPosition = showIcon ? iconPosition ?? 'end' : undefined;
  const adornment = (position: 'start' | 'end', node: ReactNode) =>
    node != null ? renderAdornment(node, position) : legacyIconPosition === position ? renderAdornment(icon, position) : undefined;

  const isRequired = required ?? isMandatory ?? false;
  const generatedId = useId();
  const inputId = id ?? `rds-input-${generatedId}`;
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue == null ? '' : String(defaultValue));
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
  const sizeClass = size === 'small' ? 'rds-input--small' : 
                     size === 'medium' ? 'rds-input--medium' : 
                     'rds-input--large';

  const pillClass = resolvedStyle === 'pill' ? 'rds-input--pill' : resolvedStyle === 'bottom outline' ? 'rds-input--bottom-outline' : '';
  
  const resolvedError = !!errorMessage || !!error;

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

  const handlePhoneInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const orig = target.value;
    const startsWithPlus = orig.startsWith('+');
    let digits = orig.replace(/\D/g, '');
    const maxDigits = startsWithPlus ? 12 : 10;
    if (digits.length > maxDigits) digits = digits.slice(0, maxDigits);
    const next = (startsWithPlus ? '+' : '') + digits;
    if (orig !== next) {
      target.value = next;
      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(e as ChangeEvent<HTMLInputElement>);
    }
  };
  const computedPlaceholder = placeholder ?? getInputPlaceholder(layout);
  const isInlineLabel = titlePosition !== 'title-above';
  const inlineTitleClass = titlePosition === 'inline-title' || (isInlineLabel && label) ? 'rds-input--inline-title' : '';
  const numericInputProps: InputHTMLAttributes<HTMLInputElement> =
    layout === 'phone number' || layout === 'number' || layout === 'card number'
      ? {
          inputMode: layout === 'phone number' ? 'tel' : 'numeric',
          ...(layout === 'phone number' ? { pattern: '^(?:\\+\\d{12}|\\d{10})$' } : {}),
          onKeyDown: handleNumericKeyDown,
          ...(layout === 'phone number' ? { onInput: handlePhoneInput } : {}),
        }
      : {};

  const consumerInputProps =
    typeof consumerSlotProps?.input === 'object' && consumerSlotProps?.input !== null
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
      ...legacyInputProps?.classes,
      ...consumerInputProps?.classes,
    },
    startAdornment: adornment('start', startIcon) ?? consumerInputProps?.startAdornment ?? legacyInputProps?.startAdornment,
    endAdornment: adornment('end', endIcon) ?? consumerInputProps?.endAdornment ?? legacyInputProps?.endAdornment,
  };

  return (
    <div
      style={typeof style === 'object' ? style : undefined}
      className={clsx(
      'rds-input',
      sizeClass,
      pillClass,
      inlineTitleClass,
      resolvedError && 'rds-input--error',
      disabled && 'rds-input--disabled',
      selected && 'rds-input--selected',
    )}>
      {titlePosition === 'title-above' && label && (
        <label className="rds-input__label" htmlFor={inputId}>
          {label}
          {isRequired && (<span className="rds-input__asterisk">*</span>)}
        </label>
      )}
      <MuiTextField
        id={inputId}
        label={isInlineLabel ? label : ''}
        placeholder={computedPlaceholder}
        helperText={helperText ?? (errorMessage || hintText)}
        error={resolvedError}
        disabled={disabled}
        required={isRequired}
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        type={inputType}
        fullWidth
        value={currentValue}
        onChange={handleInternalChange}
        onFocus={onFocus}
        onBlur={onBlur}
        slotProps={{
          ...consumerSlotProps,
          input: inputSlotProps,
          htmlInput: {
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
