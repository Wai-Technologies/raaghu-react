import { useEffect, useId, useRef, type ChangeEvent, type KeyboardEvent, type MouseEvent } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import type { InputProps } from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import clsx from 'clsx';
import { invokeValueFirstOnChange, warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-search.scss';

export interface RdsSearchProps extends Omit<TextFieldProps, 'onChange' | 'component'> {
  value: string;
  /**
   * Value-first change handler (canonical for custom Raaghu controls).
   * Signature: `(value, event) => void` — prefer reading `value`.
   */
  onChange: (value: string, event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => void;
  /** Called with the current value on Enter, on the search button, and after `debounce` ms when it is set. */
  onSearch?: (value: string) => void;
  /** Called when the clear button is clicked. */
  onClear?: () => void;
  placeholder?: string;
  /** Shows the clear button. @default true */
  showClearButton?: boolean;
  /** Shows the search icon. @default true */
  showSearchIcon?: boolean;
  /** Calls `onSearch` automatically while typing, debounced by this many ms. */
  debounce?: number;
  /** @deprecated Use `debounce` instead. */
  autoSearch?: boolean;
  /** @deprecated Use `debounce` instead. */
  searchDelay?: number;
  label?: string;
  /** Position of the label relative to the field. @default 'top' */
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
  /** Side of the search icon. `left`/`right` are deprecated aliases of `start`/`end`. */
  iconPosition?: 'left' | 'right' | 'start' | 'end';
}

const RdsSearch = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  showClearButton = true,
  showSearchIcon = true,
  debounce,
  autoSearch,
  searchDelay,
  label,
  labelPosition = 'top',
  iconPosition,
  disabled = false,
  fullWidth: fullWidthProp = false,
  InputProps: legacyInputProps,
  slotProps: consumerSlotProps,
  className,
  id,
  'data-testid': dataTestId,
  ...restProps
}: RdsSearchProps) => {
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const generatedId = useId();
  const inputId = id ?? `rds-search-${generatedId}`;
  if (autoSearch !== undefined) warnDeprecatedProp('RdsSearch', 'autoSearch', '`debounce`');
  if (searchDelay !== undefined) warnDeprecatedProp('RdsSearch', 'searchDelay', '`debounce`');
  if (iconPosition === 'left' || iconPosition === 'right') {
    warnDeprecatedProp('RdsSearch', `iconPosition="${iconPosition}"`, '`iconPosition="start"` or `"end"`');
  }
  const autoSearchOn = debounce !== undefined || autoSearch === true;
  const delay = debounce ?? searchDelay ?? 300;
  const iconAtEnd = iconPosition === 'right' || iconPosition === 'end';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = event.target.value;
    invokeValueFirstOnChange(onChange, newValue, event);
    if (autoSearchOn && onSearch) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(newValue);
      }, delay);
    }
  };

  const handleSearch = () => {
    if (disabled) return;
    onSearch?.(value);
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    invokeValueFirstOnChange(onChange, '', event);
    onClear?.();
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch?.(value);
    }
  };

  useEffect(() => {
    const timeoutRef = searchTimeoutRef;
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const containerClasses = clsx(
    'rds-search',
    `rds-search--${
      labelPosition === 'top' ? 'column'
      : labelPosition === 'bottom' ? 'column-reverse'
      : labelPosition === 'left' ? 'row'
      : labelPosition === 'right' ? 'row-reverse'
      : 'column'
    }`,
    fullWidthProp && 'rds-search--fullWidth',
  );

  const labelClasses = clsx('rds-search__label', `rds-search__label--${labelPosition}`);
  const consumerInputProps =
    typeof consumerSlotProps?.input === 'object' && consumerSlotProps?.input !== null
      ? (consumerSlotProps.input as InputProps)
      : undefined;

  const searchButton = (edge: 'start' | 'end') => (
    <IconButton onClick={handleSearch} edge={edge} size="small" aria-label="search" disabled={disabled}>
      <SearchIcon fontSize="small" />
    </IconButton>
  );
  const clearButton = (
    <IconButton onClick={handleClear} edge="end" size="small" aria-label="clear" disabled={disabled}>
      <ClearIcon fontSize="small" />
    </IconButton>
  );
  const showClear = showClearButton && Boolean(value);

  const renderEndAdornment = () => {
    if (showSearchIcon && iconAtEnd) {
      return (
        <InputAdornment position="end">
          {showClear && clearButton}
          {searchButton('end')}
        </InputAdornment>
      );
    }
    if (showClear) {
      return <InputAdornment position="end">{clearButton}</InputAdornment>;
    }
    return consumerInputProps?.endAdornment ?? legacyInputProps?.endAdornment;
  };

  const inputSlotProps: InputProps = {
    ...legacyInputProps,
    ...consumerInputProps,
    startAdornment:
      showSearchIcon && !iconAtEnd
        ? <InputAdornment position="start">{searchButton('start')}</InputAdornment>
        : consumerInputProps?.startAdornment ?? legacyInputProps?.startAdornment,
    endAdornment: renderEndAdornment(),
  };

  return (
    <div className={containerClasses} data-testid={dataTestId}>
      {typeof label === 'string' && label.trim() !== '' && (
        <label className={labelClasses} htmlFor={inputId}>
          {label}
        </label>
      )}
      <TextField
        id={inputId}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth={fullWidthProp}
        hiddenLabel
        slotProps={{
          ...consumerSlotProps,
          input: inputSlotProps,
        }}
        {...restProps}
        className={clsx('rds-search__input', className)}
      />
    </div>
  );
};
RdsSearch.displayName = 'RdsSearch';
export default RdsSearch;
