import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField, type AutocompleteProps } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './rds-autocomplete.scss';

export interface RdsAutocompleteProps<T> extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  label?: string;
  showTitle?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean; 
  variant?: 'standard' | 'outlined' | 'filled';
  isMandatory?: boolean;
  showHintText?: boolean;
  selectSize?: 'small' | 'medium' | 'large';
  controlStyle?: 'default' | 'bottom line';
  state?: 'default' | 'expanded' | 'selected' | 'disabled';
  isShowCheckbox?: boolean;
  isShowRadio?: boolean;
  isShowUser?: boolean;
  userIcon?: React.ReactNode;
  popupIcon?: React.ReactNode;
}

const RdsAutocomplete = <T extends { label?: string },>({
  label,
  showTitle = true,
  placeholder,
  helperText,
  error = false,
  variant = 'outlined',
  isMandatory = false,
  showHintText = false,
  selectSize = 'medium',
  controlStyle = 'default',
  state = 'default',
  isShowCheckbox = false,
  isShowRadio = false,
  isShowUser = false,
  userIcon,
  popupIcon,
  ...props
}: RdsAutocompleteProps<T>) => {
  const [selected, setSelected] = React.useState<T | null>(
    state === 'selected' && props.options ? (props.options[0] as T) : null
  );

  React.useEffect(() => {
    if (state === 'selected' && props.options) {
      setSelected(props.options[0] as T);
    } else if (state !== 'selected') {
      setSelected(null);
    }
  }, [state, props.options]);

  const [open, setOpen] = React.useState(state === 'expanded');
  React.useEffect(() => {
    if (state === 'expanded') setOpen(true);
    else setOpen(false);
  }, [state]);
  let sizeClass = '';
  if (selectSize === 'small') sizeClass = 'rds-autocomplete--small';
  else if (selectSize === 'large') sizeClass = 'rds-autocomplete--large';
  else sizeClass = 'rds-autocomplete--medium';

  // Determine class for control style
  const controlStyleClass = controlStyle === 'bottom line' ? 'rds-autocomplete__textfield--bottom-line' : '';

  return (
    <div className={`rds-autocomplete ${sizeClass} rds-autocomplete--root`}>
      {showTitle && label && (
        <label className={`rds-autocomplete__label rds-autocomplete__label--${selectSize}`}> 
          {label}
          {isMandatory && (
            <Typography
              component="span"
              className="rds-autocomplete__asterisk"
              sx={{ color: 'red', ml: '3px', fontSize: 'inherit', fontWeight: 700 }}
            >
              *
            </Typography>
          )}
        </label>
      )}
    <MuiAutocomplete
      {...props}
      sx={{ width: 230 }}
      open={open}
      onOpen={() => state !== 'expanded' && setOpen(true)}
      onClose={() => state !== 'expanded' && setOpen(false)}
      disabled={props.disabled || state === 'disabled'}
      value={selected}
      onChange={(_, value) => setSelected(value)}
        renderOption={(optionProps, option, { selected: checked }) => {
          const showDefault = !isShowCheckbox && !isShowRadio && !isShowUser;
          const singleMode = [isShowCheckbox, isShowRadio, isShowUser].filter(Boolean).length === 1;
          // Reduce gap specifically for user icon to minimize space
          const labelGap = singleMode && isShowUser ? 9 : (singleMode ? 28 : 8);
          // If all three are false, show only the label
          if (showDefault) {
            return (
              <li {...optionProps}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0, ml: 0.2, mr: 3, gap: 1.5 }}>
                  <span>{(option as any).label || option}</span>
                </Box>
              </li>
            );
          }
          // Otherwise, show icons as per logic
          return (
            <li {...optionProps} style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${labelGap}px`, ml: 1, mr: 1 }}>
                {(isShowCheckbox) && (
                  <Checkbox checked={checked} tabIndex={-1} disableRipple sx={{ p: '4px' }} />
                )}
                {(isShowUser) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', p: '5px' }}>
                    {userIcon}
                  </Box>
                )}
                {(isShowRadio) && (
                  <Radio checked={checked} tabIndex={-1} disableRipple sx={{ p: '4px' }} />
                )}
                <span>{(option as any).label || option}</span>
              </Box>
            </li>
          );
        }}

        popupIcon={popupIcon}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          helperText={showHintText ? helperText : ''}
          error={error}
          variant={controlStyle === 'bottom line' ? 'standard' : 'outlined'}
          className={`rds-autocomplete__textfield ${sizeClass} ${controlStyleClass}`}
        />
      )}
    />
    </div>
  );
};

export default RdsAutocomplete;
