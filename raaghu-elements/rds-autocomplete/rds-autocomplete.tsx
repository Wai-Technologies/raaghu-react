import { useEffect, useState, type FocusEvent, type ReactNode } from 'react';
import { Autocomplete as MuiAutocomplete, TextField, Chip, type AutocompleteProps } from '@mui/material';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './rds-autocomplete.scss';

export interface RdsAutocompleteProps<T> extends Omit<AutocompleteProps<T, boolean, false, false>, 'renderInput'> {
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
  userIcon?: ReactNode;
  popupIcon?: ReactNode;
  openOnFocus?: boolean;
  allowMultiple?: boolean;
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
  openOnFocus = false,
  allowMultiple = false,
  ...props
}: RdsAutocompleteProps<T>) => {
  const [selected, setSelected] = useState<T | T[] | null>(
    allowMultiple
      ? (state === 'selected' && props.options ? [props.options[0] as T] : [])
      : (state === 'selected' && props.options ? (props.options[0] as T) : null)
  );

  useEffect(() => {
    if (state === 'selected' && props.options) {
      setSelected(allowMultiple ? [props.options[0] as T] : (props.options[0] as T));
    } else if (state !== 'selected') {
      setSelected(allowMultiple ? [] : null);
    }
  }, [state, props.options, allowMultiple]);

  const [open, setOpen] = useState(state === 'expanded');

  useEffect(() => {
    setOpen(state === 'expanded');
  }, [state]);
  let sizeClass = '';
  if (selectSize === 'small') sizeClass = 'rds-autocomplete--small';
  else if (selectSize === 'large') sizeClass = 'rds-autocomplete--large';
  else sizeClass = 'rds-autocomplete--medium';

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
              sx={{ color: 'var(--rds-error-main)', ml: 'var(--rds-spacing-micro)', fontSize: 'inherit', fontWeight: 700 }}
            />
          )}
        </label>
      )}
    <MuiAutocomplete
      {...props}
      multiple={allowMultiple}
      limitTags={allowMultiple ? 4 : undefined}
      renderTags={allowMultiple ? (value, getTagProps) => {
        const visibleTags = value.slice(0, 4);
        const remainingCount = value.length - 4;
        
        return (
          <>
            {visibleTags.map((option, index) => {
              const { key: tagKey, ...restTagProps } = getTagProps({ index });
              return (
              <Chip
                key={tagKey ?? index}
                variant="filled"
                label={option.label || String(option)}
                size="small"
                {...restTagProps}
                className={`rds-autocomplete__chip rds-autocomplete__chip--${selectSize}`}
              />
              );
            })}
            {remainingCount > 0 && (
              <Chip
                variant="filled"
                label={`+${remainingCount} more`}
                size="small"
                className={`rds-autocomplete__chip rds-autocomplete__chip--${selectSize} rds-autocomplete__chip--overflow`}
              />
            )}
          </>
        );
      } : undefined}
      sx={{ width: '100%' }}
      ListboxProps={{
        sx: {
          '& .MuiAutocomplete-option': {
            minWidth: 'fit-content',
          }
        }
      }}
      open={open}
      onOpen={() => {
        if (state !== 'expanded') {
          setOpen(true);
        }
      }}
      onClose={(event, reason) => {
        if (state !== 'expanded') {
          setOpen(false);
        }
      }}
      disabled={props.disabled || state === 'disabled'}
  value={selected}
  onChange={(_, value) => setSelected(value)}
        renderOption={(optionProps, option, { selected: checked }) => {
          const { key: optionKey, ...optionLiProps } = optionProps;
          const showDefault = !isShowCheckbox && !isShowRadio && !isShowUser;
          const singleMode = [isShowCheckbox, isShowRadio, isShowUser].filter(Boolean).length === 1;
          const multiMode = [isShowCheckbox, isShowRadio, isShowUser].filter(Boolean).length > 1;
          const labelGap = multiMode ? 2 : (singleMode && isShowUser ? 6 : (singleMode ? 4 : 8));
          if (showDefault) {
            return (
              <li key={optionKey} {...optionLiProps}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0, ml: 0.2, mr: 3, gap: 1.5 }}>
                  <span>{option.label || String(option)}</span>
                </Box>
              </li>
            );
          }
          return (
            <li key={optionKey} {...optionLiProps} style={{ display: 'flex', alignItems: 'center', padding: 0, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${labelGap}px`, ml: 0.5, mr: 0.5, width: '100%', overflow: 'hidden' }}>
                {(isShowCheckbox) && (
                  <RdsCheckbox status={checked ? 'checked' : 'unchecked'} tabIndex={-1} disableRipple sx={{ p: '2px', flexShrink: 0 }} />
                )}
                {(isShowUser) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', p: '2px', flexShrink: 0 }}>
                    {userIcon}
                  </Box>
                )}
                {(isShowRadio) && (
                  <Radio checked={checked} tabIndex={-1} disableRipple sx={{ p: '2px', flexShrink: 0 }} />
                )}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{option.label || String(option)}</span>
              </Box>
            </li>
          );
        }}

        popupIcon={popupIcon}
        renderInput={(params) => {
          const shouldShowPlaceholder = allowMultiple
            ? (Array.isArray(selected) ? selected.length === 0 : !selected)
            : true;

          return (
            <TextField
              {...params}
              placeholder={shouldShowPlaceholder ? placeholder : ''}
              helperText={helperText ?? '\u00A0'}
              error={error}
              variant={variant}
              className={`rds-autocomplete__textfield ${sizeClass} ${controlStyleClass} ${!showHintText ? 'rds-autocomplete__textfield--hidden-helper' : ''}`}
              inputProps={{
                ...params.inputProps,
                'aria-label': label || placeholder || 'Autocomplete',
              }}
              onFocus={(e) => {
                if (openOnFocus && state !== 'expanded') {
                  setOpen(true);
                }
                if (params.inputProps?.onFocus) {
                  params.inputProps.onFocus(e as FocusEvent<HTMLInputElement>);
                }
              }}
            />
          );
        }}
    />
    </div>
  );
};

RdsAutocomplete.displayName = 'RdsAutocomplete';
export default RdsAutocomplete;
