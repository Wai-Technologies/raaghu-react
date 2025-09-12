import React from 'react';
import { TextField, InputAdornment, IconButton, TextFieldProps } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
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

const RdsSearch: React.FC<RdsSearchProps> = ({
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
  ...props
}) => {
  const [searchTimeout, setSearchTimeout] = React.useState<ReturnType<typeof setTimeout> | null>(null);

  // read fullWidth explicitly so we can toggle container class
  const fullWidthProp = Boolean((props as any).fullWidth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // If the consumer passed disabled via props, respect it
    if ((props as any).disabled) return;

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
    if ((props as any).disabled) return;
    onSearch?.(value);
  };

  const handleClear = () => {
    if ((props as any).disabled) return;

    onChange('');
    onClear?.();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch?.(value);
    }
  };

  React.useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Generate CSS classes based on props
  const containerClasses = [
    'rds-search',
    `rds-search--${labelPosition === 'top' ? 'column'
      : labelPosition === 'bottom' ? 'column-reverse'
      : labelPosition === 'left' ? 'row'
      : labelPosition === 'right' ? 'row-reverse'
      : 'column'}`,
    fullWidthProp ? 'rds-search--fullWidth' : ''
  ].filter(Boolean).join(' ');

  const labelClasses = [
    'rds-search__label',
    `rds-search__label--${labelPosition}`
  ].join(' ');

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
        disabled={(props as any).disabled}
        fullWidth={fullWidthProp}
        InputProps={{
          startAdornment:
            showSearchIcon && iconPosition === 'left' ? (
              <InputAdornment position="start">
                <IconButton
                  onClick={handleSearch}
                  edge="start"
                  aria-label="search"
                  disabled={(props as any).disabled}
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
                      disabled={(props as any).disabled}
                    >
                      <Clear />
                    </IconButton>
                    <IconButton
                      onClick={handleSearch}
                      edge="end"
                      aria-label="search"
                      disabled={(props as any).disabled}
                    >
                      <Search />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    onClick={handleSearch}
                    edge="end"
                    aria-label="search"
                    disabled={(props as any).disabled}
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
                    disabled={(props as any).disabled}
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
