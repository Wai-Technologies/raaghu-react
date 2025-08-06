import React from 'react';
import { Autocomplete as MuiAutocomplete, TextField, AutocompleteProps } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './rds-autocomplete.scss';

export interface RdsAutocompleteProps<T> extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean; 
  variant?: 'standard' | 'outlined' | 'filled';
  isMandatory?: boolean;
  showHint?: boolean;
  selectSize?: 'small' | 'medium' | 'large';
  controlStyle?: 'default' | 'bottom line';
  state?: 'default' | 'expanded' | 'selected' | 'disabled';
  isShowCheckbox?: boolean;
  isShowRadio?: boolean;
  isShowUser?: boolean;
}

const RdsAutocomplete = <T extends { label?: string },>({
  label,
  placeholder,
  helperText,
  error = false,
  variant = 'outlined',
  isMandatory = false,
  showHint = false,
  selectSize = 'medium',
  controlStyle = 'default',
  state = 'default',
  isShowCheckbox = false,
  isShowRadio = false,
  isShowUser = false,
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
      {label && (
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                      xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <circle cx="10" cy="10" r="9.9"
                        fill="url(#pattern0_22479_5668)" stroke="#B1B1B1" strokeWidth="0.2" />
                      <defs>
                        <pattern id="pattern0_22479_5668" patternContentUnits="objectBoundingBox"
                          width="1" height="1">
                          <use xlinkHref="#image0_22479_5668" transform="scale(0.0133333)" />
                        </pattern>
                        <image id="image0_22479_5668" width="75" height="75"
                          preserveAspectRatio="none"
                          xlinkHref="data:image/png;base64,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" />
                    </defs>
                    </svg>
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

        popupIcon={
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.5L5.731 5.37991C5.75919 5.41535 5.79707 5.4447 5.84154 5.46554C5.88601 5.48638 5.93578 5.49812 5.98675 5.49979C6.03773 5.50146 6.08845 5.49302 6.13474 5.47515C6.18103 5.45728 6.22157 5.43048 6.253 5.397L6.2695 5.37991L11 0.5" stroke="#7D7D7D" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          helperText={showHint ? helperText : ''}
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
