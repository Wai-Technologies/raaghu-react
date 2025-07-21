import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField, AutocompleteProps } from '@mui/material';

export interface RdsAutocompleteProps<T> extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
}

const RdsAutocomplete = <T,>({
  label,
  placeholder,
  helperText,
  error = false,
  variant = 'outlined',
  ...props
}: RdsAutocompleteProps<T>) => {
  return (
    <MuiAutocomplete
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          variant={variant}
        />
      )}
    />
  );
};

export default RdsAutocomplete;
