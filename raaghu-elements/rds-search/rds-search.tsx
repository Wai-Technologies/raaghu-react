import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { TextField, InputAdornment, IconButton, type TextFieldProps } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import clsx from 'clsx';
import './rds-search.scss';

export interface RdsSearchProps extends Omit<TextFieldProps, 'onChange'> {
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
  ...props
}: RdsSearchProps) => {
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = event.target.value;
    onChange(newValue);
    if (autoSearch && onSearch) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      const timeout = setTimeout(() => {
        onSearch(newValue);
      }, searchDelay);
      setSearchTimeout(timeout);
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
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };  }, [searchTimeout]);

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
        InputProps={{
          startAdornment:
            showSearchIcon && iconPosition === 'left' ? (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleSearch}
                  edge="start"
                  aria-label="search"
                  disabled={disabled}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          endAdornment:
            iconPosition === 'right' && showSearchIcon ? (
              <InputAdornment position="end">
                {showClearButton && value ? (
                  <>
                    <IconButton
                      onClick={handleClear}
                      edge="end"
                      aria-label="clear"
                      disabled={disabled}
                    >
                      <Clear />
                    </IconButton>
                    <IconButton
                      onClick={handleSearch}
                      edge="end"
                      aria-label="search"
                      disabled={disabled}
                    >
                      <Search />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={handleSearch}
                    edge="end"
                    aria-label="search"
                    disabled={disabled}
                  >
                    <Search />
                  </IconButton>
                )}
              </InputAdornment>
            ) : (
              showClearButton && value ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear}
                    edge="end"
                    aria-label="clear"
                    disabled={disabled}
                  >
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : undefined
            ),
        }}
        {...props}
      />
    </div>
  );
};
RdsSearch.displayName = 'RdsSearch';
export default RdsSearch;
