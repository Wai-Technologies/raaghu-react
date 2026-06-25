import React from 'react';

type RdsInputSize = 'small' | 'medium' | 'large';
type RdsInputStyle = 'default' | 'pill' | 'bottom outline';
type RdsInputState = 'default' | 'active' | 'selected' | 'error' | 'disabled';
type RdsInputLayout = 'text' | 'password' | 'phone number' | 'number' | 'card number';

const NUMERIC_ALLOWED_KEYS = [
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

export function getSizeClass(size: RdsInputSize | undefined): string {
  if (size === 'small') return 'rds-input--small';
  if (size === 'medium') return 'rds-input--medium';
  return 'rds-input--large';
}

export function getPillClass(style: RdsInputStyle | undefined): string {
  if (style === 'pill') return 'rds-input--pill';
  if (style === 'bottom outline') return 'rds-input--bottom-outline';
  return '';
}

export function getStateClass(
  state: RdsInputState | undefined,
  error: boolean | undefined,
  disabled: boolean | undefined,
  active: boolean
): string {
  if (state === 'error' || error) return 'rds-input--error';
  if (state === 'disabled' || disabled) return 'rds-input--disabled';
  if (state === 'active') return 'rds-input--active';
  if (state === 'selected') return 'rds-input--selected';
  if (active) return 'rds-input--active';
  return '';
}

export function getInputType(
  layout: RdsInputLayout | undefined,
  showPassword: boolean
): string {
  switch (layout) {
    case 'password':
      return showPassword ? 'text' : 'password';
    case 'number':
    case 'card number':
    case 'phone number':
      return 'tel';
    default:
      return 'text';
  }
}

export function getPlaceholder(layoutType: RdsInputLayout | undefined): string {
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

export function createNumericKeyDownHandler(layout: RdsInputLayout | undefined) {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    }
    if (isPlusKey && layout !== 'phone number') {
      e.preventDefault();
      return;
    }

    if (!isDigit && !NUMERIC_ALLOWED_KEYS.includes(e.key)) {
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
}

export interface PhoneInputHandlerOptions {
  isControlled: boolean;
  setInternalValue: (value: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function createPhoneInputHandler({
  isControlled,
  setInternalValue,
  onChange,
}: PhoneInputHandlerOptions) {
  return (e: React.FormEvent<HTMLInputElement>) => {
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
      if (onChange) {
        const event = {
          ...e,
          target: { ...target, value: next },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    }
  };
}

export function getNumericInputProps(
  layout: RdsInputLayout | undefined,
  handleNumericKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handlePhoneInput: (e: React.FormEvent<HTMLInputElement>) => void
) {
  if (layout !== 'phone number' && layout !== 'number' && layout !== 'card number') {
    return {};
  }
  return {
    inputMode: layout === 'phone number' ? ('tel' as const) : ('numeric' as const),
    ...(layout === 'phone number' ? { pattern: '^(?:\\+\\d{12}|\\d{10})$' } : {}),
    onKeyDown: handleNumericKeyDown,
    ...(layout === 'phone number' ? { onInput: handlePhoneInput } : {}),
  };
}
