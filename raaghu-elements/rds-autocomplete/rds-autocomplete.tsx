import { useEffect, useLayoutEffect, useMemo, useState, useRef, type FocusEvent, type ReactNode } from 'react';
import { Autocomplete as MuiAutocomplete, TextField, Chip, type AutocompleteProps } from '@mui/material';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './rds-autocomplete.scss';

export interface RdsAutocompleteProps<T> extends Omit<AutocompleteProps<T, boolean, false, false>, 'renderInput' | 'component'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean; 
  variant?: 'standard' | 'outlined' | 'filled';
  display?: {
    title?: 'visible' | 'hidden';
    mandatory?: 'required' | 'optional';
    hint?: 'visible' | 'hidden';
  };
  selectSize?: 'small' | 'medium' | 'large';
  controlStyle?: 'default' | 'bottom line';
  state?: 'default' | 'expanded' | 'selected' | 'disabled';
  optionDecorators?: {
    checkbox?: 'visible' | 'hidden';
    radio?: 'visible' | 'hidden';
    user?: 'visible' | 'hidden';
  };
  userIcon?: ReactNode;
  popupIcon?: ReactNode;
  behavior?: {
    openOnFocus?: 'on' | 'off';
    multiple?: 'on' | 'off';
  };
  /** Hides the clear-all control when the field width is at or below large mobile (414px). */
  hideClearAllOnMobile?: boolean;
  [key: string]: unknown;
}

const RdsAutocomplete = <T extends { label?: string },>({
  label,
  placeholder,
  helperText,
  error = false,
  variant = 'outlined',
  display,
  selectSize = 'medium',
  controlStyle = 'default',
  state = 'default',
  optionDecorators,
  userIcon,
  popupIcon,
  behavior,
  hideClearAllOnMobile = false,
  ...props
}: RdsAutocompleteProps<T>) => {
  const legacyShowTitle = typeof props['showTitle'] === 'boolean' ? (props['showTitle'] as boolean) : undefined;
  const legacyIsMandatory = typeof props['isMandatory'] === 'boolean' ? (props['isMandatory'] as boolean) : undefined;
  const legacyShowHintText = typeof props['showHintText'] === 'boolean' ? (props['showHintText'] as boolean) : undefined;
  const legacyIsShowCheckbox = typeof props['isShowCheckbox'] === 'boolean' ? (props['isShowCheckbox'] as boolean) : undefined;
  const legacyIsShowRadio = typeof props['isShowRadio'] === 'boolean' ? (props['isShowRadio'] as boolean) : undefined;
  const legacyIsShowUser = typeof props['isShowUser'] === 'boolean' ? (props['isShowUser'] as boolean) : undefined;
  const legacyOpenOnFocus = typeof props['openOnFocus'] === 'boolean' ? (props['openOnFocus'] as boolean) : undefined;
  const legacyAllowMultiple = typeof props['allowMultiple'] === 'boolean' ? (props['allowMultiple'] as boolean) : undefined;

  const showTitle = display?.title ? display.title === 'visible' : (legacyShowTitle ?? true);
  const isMandatory = display?.mandatory ? display.mandatory === 'required' : (legacyIsMandatory ?? false);
  const showHintText = display?.hint ? display.hint === 'visible' : (legacyShowHintText ?? false);
  const isShowCheckbox = optionDecorators?.checkbox ? optionDecorators.checkbox === 'visible' : (legacyIsShowCheckbox ?? false);
  const isShowRadio = optionDecorators?.radio ? optionDecorators.radio === 'visible' : (legacyIsShowRadio ?? false);
  const isShowUser = optionDecorators?.user ? optionDecorators.user === 'visible' : (legacyIsShowUser ?? false);
  const openOnFocus = behavior?.openOnFocus ? behavior.openOnFocus === 'on' : (legacyOpenOnFocus ?? false);
  const allowMultiple = behavior?.multiple ? behavior.multiple === 'on' : (legacyAllowMultiple ?? false);

  const {
    showTitle: _legacyShowTitle,
    isMandatory: _legacyIsMandatory,
    showHintText: _legacyShowHintText,
    isShowCheckbox: _legacyIsShowCheckbox,
    isShowRadio: _legacyIsShowRadio,
    isShowUser: _legacyIsShowUser,
    openOnFocus: _legacyOpenOnFocus,
    allowMultiple: _legacyAllowMultiple,
    ...muiAutocompleteProps
  } = props as typeof props & {
    showTitle?: boolean;
    isMandatory?: boolean;
    showHintText?: boolean;
    isShowCheckbox?: boolean;
    isShowRadio?: boolean;
    isShowUser?: boolean;
    openOnFocus?: boolean;
    allowMultiple?: boolean;
  };

  const initialSelected = useMemo<T | T[] | null>(() => {
    if (state === 'selected' && props.options && props.options.length > 0) {
      return allowMultiple ? [props.options[0] as T] : (props.options[0] as T);
    }
    return allowMultiple ? [] : null;
  }, [allowMultiple, props.options, state]);

  const [selected, setSelected] = useState<T | T[] | null>(initialSelected);

  useEffect(() => {
    if (state === 'selected' && props.options && props.options.length > 0) {
      setSelected(allowMultiple ? [props.options[0] as T] : (props.options[0] as T));
      return;
    }
    setSelected(allowMultiple ? [] : null);
  }, [allowMultiple, props.options, state]);

  const [open, setOpen] = useState(state === 'expanded');

  useEffect(() => {
    setOpen(state === 'expanded');
  }, [state]);

  let sizeClass = '';
  if (selectSize === 'small') sizeClass = 'rds-autocomplete--small';
  else if (selectSize === 'large') sizeClass = 'rds-autocomplete--large';
  else sizeClass = 'rds-autocomplete--medium';

  const controlStyleClass = controlStyle === 'bottom line' ? 'rds-autocomplete__textfield--bottom-line' : '';

  const selectedCount = allowMultiple && Array.isArray(selected) ? selected.length : 0;
  const hideClearAll = allowMultiple && selectedCount <= 1;

  // Measure the actual rendered width of this component via ResizeObserver
  // so the chip limit works correctly inside Storybook iframes and any container
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1024);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? el.offsetWidth;
      setContainerWidth(width);
    });
    ro.observe(el);
    setContainerWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  const MOBILE_LG_MAX_WIDTH = 414;
  const shouldHideClearAll = hideClearAllOnMobile && containerWidth <= MOBILE_LG_MAX_WIDTH;

  // ≤200px → 1 chip, ≤320px → 2 chips, >320px → 3 chips
  const responsiveLimitTags = containerWidth <= 200 ? 1 : containerWidth <= 320 ? 2 : 3;

  return (
    <div ref={containerRef} className={`rds-autocomplete ${sizeClass} rds-autocomplete--root`}>
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
      {...muiAutocompleteProps}
      multiple={allowMultiple}
      limitTags={allowMultiple ? responsiveLimitTags : undefined}
      clearIcon={hideClearAll || shouldHideClearAll ? null : undefined}
      renderTags={allowMultiple ? (value, getTagProps) => {
        const limit = responsiveLimitTags;
        const visibleTags = value.slice(0, limit);
        const remainingCount = value.length - limit;
        
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
                label={`+${remainingCount}`}
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
            : !selected;

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
