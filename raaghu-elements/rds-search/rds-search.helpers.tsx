import React from 'react';
import { InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

export function getSearchLayoutClasses(
  labelPosition: 'top' | 'left' | 'right' | 'bottom',
  fullWidthProp: boolean
) {
  const layoutMap: Record<string, string> = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
  };

  const containerClasses = [
    'rds-search',
    `rds-search--${layoutMap[labelPosition] ?? 'column'}`,
    fullWidthProp ? 'rds-search--fullWidth' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelClasses = ['rds-search__label', `rds-search__label--${labelPosition}`].join(' ');

  return { containerClasses, labelClasses };
}

export interface SearchInputAdornmentsProps {
  showSearchIcon: boolean;
  showClearButton: boolean;
  iconPosition: 'left' | 'right';
  value: string;
  disabled?: boolean;
  onSearch: () => void;
  onClear: () => void;
}

export function SearchInputAdornments({
  showSearchIcon,
  showClearButton,
  iconPosition,
  value,
  disabled,
  onSearch,
  onClear,
}: SearchInputAdornmentsProps) {
  const searchButton = (edge: 'start' | 'end') => (
    <IconButton onClick={onSearch} edge={edge} aria-label="search" disabled={disabled}>
      <Search />
    </IconButton>
  );

  const clearButton = (edge: 'start' | 'end') => (
    <IconButton onClick={onClear} edge={edge} aria-label="clear" disabled={disabled}>
      <Clear />
    </IconButton>
  );

  if (showSearchIcon && iconPosition === 'left') {
    return {
      startAdornment: (
        <InputAdornment position="start">{searchButton('start')}</InputAdornment>
      ),
      endAdornment: undefined,
    };
  }

  if (iconPosition === 'right' && showSearchIcon) {
    return {
      startAdornment: undefined,
      endAdornment: (
        <InputAdornment position="end">
          {showClearButton && value ? (
            <>
              {clearButton('end')}
              {searchButton('end')}
            </>
          ) : (
            searchButton('end')
          )}
        </InputAdornment>
      ),
    };
  }

  if (showClearButton && value) {
    return {
      startAdornment: undefined,
      endAdornment: (
        <InputAdornment position="end">{clearButton('end')}</InputAdornment>
      ),
    };
  }

  return { startAdornment: undefined, endAdornment: undefined };
}
