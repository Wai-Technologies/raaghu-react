import { useEffect, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import type { InputProps } from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import clsx from 'clsx';
import './rds-search.scss';

export interface RdsSearchProps extends Omit<TextFieldProps, 'onChange' | 'component'> {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showClearButton?: boolean;
  showSearchIcon?: boolean;
  autoSearch?: boolean;
  searchDelay?: number;
  label?: string;
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
  iconPosition?: 'left' | 'right';
}

const RdsSearch = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = 'Search...',
  showClearButton = true,
  showSearchIcon = true,
  autoSearch = false,
  searchDelay = 300,
  label,
  labelPosition = 'top',
  iconPosition = 'left',
  disabled = false,
  fullWidth: fullWidthProp = false,
  InputProps: legacyInputProps,
  slotProps: consumerSlotProps,
  ...restProps
}: RdsSearchProps) => {
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = event.target.value;
    onChange(newValue);
    if (autoSearch && onSearch) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      const timeout = setTimeout(() => {
        onSearch(newValue);
      }, searchDelay);
      searchTimeoutRef.current = timeout;
    }
  };

  const handleSearch = () => {
    if (disabled) return;
    onSearch?.(value);
  };

  const handleClear = () => {
    if (disabled) return;

    onChange('');
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

  const inputSlotProps: InputProps = {
    ...legacyInputProps,
    ...consumerInputProps,
    startAdornment:
      showSearchIcon && iconPosition === 'left'
        ? (
          <InputAdornment position="start">
            <IconButton
              onClick={handleSearch}
              edge="start"
              size="small"
              aria-label="search"
              disabled={disabled}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        )
        : consumerInputProps?.startAdornment ?? legacyInputProps?.startAdornment,
    endAdornment:
      iconPosition === 'right' && showSearchIcon
        ? (
          <InputAdornment position="end">
            {showClearButton && value ? (
              <>
                <IconButton
                  onClick={handleClear}
                  edge="end"
                  size="small"
                  aria-label="clear"
                  disabled={disabled}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleSearch}
                  edge="end"
                  size="small"
                  aria-label="search"
                  disabled={disabled}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <IconButton
                onClick={handleSearch}
                edge="end"
                size="small"
                aria-label="search"
                disabled={disabled}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            )}
          </InputAdornment>
        )
        : showClearButton && value
          ? (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                edge="end"
                size="small"
                aria-label="clear"
                disabled={disabled}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          )
          : consumerInputProps?.endAdornment ?? legacyInputProps?.endAdornment,
  };

  return (
    <div className={containerClasses}>
      {typeof label === 'string' && label.trim() !== '' && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      <TextField
        className="rds-search__input"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        fullWidth={fullWidthProp}
        slotProps={{
          ...consumerSlotProps,
          input: inputSlotProps,
        }}
        {...restProps}
      />
    </div>
  );
};
RdsSearch.displayName = 'RdsSearch';
export default RdsSearch;
