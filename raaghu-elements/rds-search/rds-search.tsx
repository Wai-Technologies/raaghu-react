import React from 'react';
import { 
  TextField, 
  InputAdornment, 
  IconButton,
  TextFieldProps
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

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
  ...props
}) => {
  const [searchTimeout, setSearchTimeout] = React.useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    onSearch?.(value);
  };

  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
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

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={placeholder}
      InputProps={{
        startAdornment: showSearchIcon ? (
          <InputAdornment position="start">
            <IconButton
              onClick={handleSearch}
              edge="start"
              aria-label="search"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        ) : undefined,
        endAdornment: showClearButton && value ? (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClear}
              edge="end"
              aria-label="clear"
            >
              <Clear />
            </IconButton>
          </InputAdornment>
        ) : undefined,
      }}
      {...props}
    />
  );
};

export default RdsSearch;
