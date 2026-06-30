import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { getSearchLayoutClasses, SearchInputAdornments } from './rds-search.helpers';
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
  const fullWidthProp = Boolean((props as { fullWidth?: boolean }).fullWidth);
  const disabled = Boolean((props as { disabled?: boolean }).disabled);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const { containerClasses, labelClasses } = getSearchLayoutClasses(labelPosition, fullWidthProp);
  const adornments = SearchInputAdornments({
    showSearchIcon,
    showClearButton,
    iconPosition,
    value,
    disabled,
    onSearch: handleSearch,
    onClear: handleClear,
  });

  return (
    <div className={containerClasses}>
      {typeof label === 'string' && label.trim() !== '' && (
        <label className={labelClasses}>{label}</label>
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
          startAdornment: adornments.startAdornment,
          endAdornment: adornments.endAdornment,
        }}
        {...props}
      />
    </div>
  );
};
RdsSearch.displayName = 'RdsSearch';
export default RdsSearch;
