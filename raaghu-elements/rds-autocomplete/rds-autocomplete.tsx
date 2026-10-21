import { useId, useLayoutEffect, useState, useRef, type FocusEvent, type ReactNode, type SyntheticEvent } from 'react';
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  Chip,
  type AutocompleteProps,
  type AutocompleteValue,
  type AutocompleteRenderValueGetItemProps,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import RdsCheckbox from '../rds-checkbox/rds-checkbox';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-autocomplete.scss';

type RdsAutocompleteMuiProps<T> = AutocompleteProps<T, boolean, false, false>;

export interface RdsAutocompleteProps<T> extends Omit<RdsAutocompleteMuiProps<T>, 'renderInput' | 'component'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  /** Marks the field as required: shows an asterisk after the label and sets `aria-required` on the input. */
  required?: boolean;
  display?: {
    /** @deprecated Use `showTitle` instead. */
    title?: 'visible' | 'hidden';
    /** @deprecated Use `required` instead. */
    mandatory?: 'required' | 'optional';
    /** @deprecated Use `showHintText` instead. */
    hint?: 'visible' | 'hidden';
  };
  selectSize?: 'small' | 'medium' | 'large';
  controlStyle?: 'default' | 'bottom line';
  state?: 'default' | 'expanded' | 'selected' | 'disabled';
  /** Decoration shown before each option: a checkbox, a radio, the option icon (`avatar`) or nothing. Takes precedence over `optionDecorators`. */
  optionVariant?: 'checkbox' | 'radio' | 'avatar' | 'none';
  /** @deprecated Use `optionVariant` instead. */
  optionDecorators?: {
    checkbox?: 'visible' | 'hidden';
    radio?: 'visible' | 'hidden';
    user?: 'visible' | 'hidden';
  };
  /** @deprecated Use `getOptionIcon` instead. */
  userIcon?: ReactNode;
  /** Returns the icon shown before an option when `optionVariant` is `avatar`. Takes precedence over `userIcon`. */
  getOptionIcon?: (option: T) => ReactNode;
  popupIcon?: ReactNode;
  /** @deprecated Use `openOnFocus` and `multiple` instead. */
  behavior?: {
    openOnFocus?: 'on' | 'off';
    multiple?: 'on' | 'off';
  };
  /** Hides the clear-all control when the field width is at or below large mobile (414px). */
  hideClearAllOnMobile?: boolean;
  /** Shows the label above the field. Defaults to `true`. `display.title` takes precedence. */
  showTitle?: boolean;
  /** Shows the helper text. Defaults to `false`. `display.hint` takes precedence. */
  showHintText?: boolean;
  /** Shows a checkbox before each option. Defaults to `false`. `optionDecorators.checkbox` takes precedence. */
  isShowCheckbox?: boolean;
  /** Shows a radio before each option. Defaults to `false`. `optionDecorators.radio` takes precedence. */
  isShowRadio?: boolean;
  /** Shows `userIcon` before each option. Defaults to `false`. `optionDecorators.user` takes precedence. */
  isShowUser?: boolean;
  /** @deprecated Use `required` instead. */
  isMandatory?: boolean;
  /** @deprecated Use `multiple` instead. */
  allowMultiple?: boolean;
}

type SxArray = Extract<SxProps<Theme>, ReadonlyArray<unknown>>;
const toSxArray = (sx: SxProps<Theme> | undefined): SxArray =>
  (Array.isArray(sx) ? sx : sx ? [sx] : []) as SxArray;

const LISTBOX_BASE_SX = {
  '& .MuiAutocomplete-option': {
    minWidth: 'fit-content',
  },
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;

const shallowEqualObjects = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length && keysA.every((key) => Object.prototype.hasOwnProperty.call(b, key) && Object.is(a[key], b[key]));
};

/** True when both option lists hold the same options, even if the arrays (or option objects) are new instances. */
const sameOptions = (a: readonly unknown[] | undefined, b: readonly unknown[] | undefined) => {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((option, index) => {
    const other = b[index];
    return Object.is(option, other) || (isPlainObject(option) && isPlainObject(other) && shallowEqualObjects(option, other));
  });
};

const deriveSelection = <T,>(state: RdsAutocompleteProps<T>['state'], options: readonly T[] | undefined, multiple: boolean): T | T[] | null => {
  if (state === 'selected' && options && options.length > 0) {
    return multiple ? [options[0]] : options[0];
  }
  return multiple ? [] : null;
};

const RdsAutocomplete = <T extends { label?: string },>({
  label,
  placeholder,
  helperText,
  error = false,
  variant = 'outlined',
  required,
  display,
  selectSize = 'medium',
  controlStyle = 'default',
  state = 'default',
  optionDecorators,
  optionVariant,
  userIcon,
  getOptionIcon,
  popupIcon,
  behavior,
  hideClearAllOnMobile = false,
  showTitle: showTitleProp,
  showHintText: showHintTextProp,
  isShowCheckbox: isShowCheckboxProp,
  isShowRadio: isShowRadioProp,
  isShowUser: isShowUserProp,
  isMandatory,
  allowMultiple,
  openOnFocus: openOnFocusProp,
  multiple: multipleProp,
  id,
  value,
  defaultValue,
  onChange,
  open: openProp,
  onOpen,
  onClose,
  sx,
  slotProps,
  ListboxProps,
  getOptionLabel,
  renderValue,
  clearIcon,
  disabled,
  ...muiAutocompleteProps
}: RdsAutocompleteProps<T>) => {
  if (display?.mandatory !== undefined) warnDeprecatedProp('RdsAutocomplete', 'display.mandatory', '`required`');
  if (behavior !== undefined) warnDeprecatedProp('RdsAutocomplete', 'behavior', '`openOnFocus` and `multiple`');
  if (optionDecorators !== undefined) warnDeprecatedProp('RdsAutocomplete', 'optionDecorators', '`optionVariant`');
  if (userIcon !== undefined) warnDeprecatedProp('RdsAutocomplete', 'userIcon', '`getOptionIcon`');
  if (isMandatory !== undefined) warnDeprecatedProp('RdsAutocomplete', 'isMandatory', '`required`');
  if (allowMultiple !== undefined) warnDeprecatedProp('RdsAutocomplete', 'allowMultiple', '`multiple`');

  const showTitle = display?.title ? display.title === 'visible' : (showTitleProp ?? true);
  const isRequired = required ?? (display?.mandatory ? display.mandatory === 'required' : (isMandatory ?? false));
  const showHintText = display?.hint ? display.hint === 'visible' : (showHintTextProp ?? false);
  const showDecorator = (variant: 'checkbox' | 'radio' | 'avatar', key: 'checkbox' | 'radio' | 'user', legacy?: boolean) => {
    if (optionVariant !== undefined) return optionVariant === variant;
    const decorator = optionDecorators?.[key];
    return decorator ? decorator === 'visible' : (legacy ?? false);
  };
  const isShowCheckbox = showDecorator('checkbox', 'checkbox', isShowCheckboxProp);
  const isShowRadio = showDecorator('radio', 'radio', isShowRadioProp);
  const isShowUser = showDecorator('avatar', 'user', isShowUserProp);
  const openOnFocus = openOnFocusProp ?? (behavior?.openOnFocus ? behavior.openOnFocus === 'on' : false);
  const allowMultipleResolved = multipleProp ?? (behavior?.multiple ? behavior.multiple === 'on' : (allowMultiple ?? false));

  const options = muiAutocompleteProps.options;
  const generatedId = useId();
  const inputId = id ?? `rds-autocomplete-${generatedId}`;

  const isValueControlled = value !== undefined;
  const [selected, setSelected] = useState<T | T[] | null>(() =>
    defaultValue !== undefined ? defaultValue : deriveSelection(state, options, allowMultipleResolved),
  );
  const [prevSelectionState, setPrevSelectionState] = useState({ state, options, allowMultiple: allowMultipleResolved });

  if (
    state !== prevSelectionState.state ||
    allowMultipleResolved !== prevSelectionState.allowMultiple ||
    !sameOptions(options, prevSelectionState.options)
  ) {
    setPrevSelectionState({ state, options, allowMultiple: allowMultipleResolved });
    setSelected(deriveSelection(state, options, allowMultipleResolved));
  }

  const currentValue = isValueControlled ? value : selected;

  const handleChange = (
    event: SyntheticEvent,
    newValue: AutocompleteValue<T, boolean, false, false>,
    reason: Parameters<NonNullable<RdsAutocompleteMuiProps<T>['onChange']>>[2],
    details?: Parameters<NonNullable<RdsAutocompleteMuiProps<T>['onChange']>>[3],
  ) => {
    if (!isValueControlled) setSelected(newValue);
    onChange?.(event, newValue, reason, details);
  };

  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(state === 'expanded');
  const [prevExpandedState, setPrevExpandedState] = useState(state);

  if (state !== prevExpandedState) {
    setPrevExpandedState(state);
    setInternalOpen(state === 'expanded');
  }

  const open = isOpenControlled ? openProp : internalOpen;

  let sizeClass = '';
  if (selectSize === 'small') sizeClass = 'rds-autocomplete--small';
  else if (selectSize === 'large') sizeClass = 'rds-autocomplete--large';
  else sizeClass = 'rds-autocomplete--medium';

  const controlStyleClass = controlStyle === 'bottom line' ? 'rds-autocomplete__textfield--bottom-line' : '';

  const selectedCount = allowMultipleResolved && Array.isArray(currentValue) ? currentValue.length : 0;
  const hideClearAll = allowMultipleResolved && selectedCount <= 1;

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

  const responsiveLimitTags = containerWidth <= 200 ? 1 : containerWidth <= 320 ? 2 : 3;

  const optionText = (option: T) => (getOptionLabel ? getOptionLabel(option) : option.label || String(option));

  const renderChips: RdsAutocompleteMuiProps<T>['renderValue'] = (chipValue, getItemProps) => {
    const values = Array.isArray(chipValue) ? chipValue : [chipValue];
    const getChipProps = getItemProps as AutocompleteRenderValueGetItemProps<true>;
    const limit = responsiveLimitTags;
    const visibleTags = values.slice(0, limit);
    const remainingCount = values.length - limit;

    return (
      <>
        {visibleTags.map((option, index) => {
          const { key: tagKey, ...restTagProps } = getChipProps({ index });
          return (
            <Chip
              variant="filled"
              label={optionText(option)}
              size="small"
              {...restTagProps}
              key={tagKey ?? index}
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
  };

  type ListboxSlotProps = NonNullable<NonNullable<RdsAutocompleteMuiProps<T>['slotProps']>['listbox']>;
  type ListboxSlotPropsObject = Exclude<ListboxSlotProps, (...args: never[]) => unknown>;
  const consumerListbox = slotProps?.listbox;
  const mergeListbox = (consumer: ListboxSlotPropsObject | undefined) =>
    ({
      ...ListboxProps,
      ...consumer,
      sx: [LISTBOX_BASE_SX, ...toSxArray(ListboxProps?.sx), ...toSxArray(consumer?.sx)],
    }) as ListboxSlotPropsObject;
  const listboxSlotProps: ListboxSlotProps =
    typeof consumerListbox === 'function'
      ? (ownerState) => mergeListbox(consumerListbox(ownerState) as ListboxSlotPropsObject)
      : mergeListbox(consumerListbox);

  return (
    <div ref={containerRef} className={`rds-autocomplete ${sizeClass} rds-autocomplete--root`}>
      {showTitle && label && (
        <label htmlFor={inputId} className={`rds-autocomplete__label rds-autocomplete__label--${selectSize}`}>
          {label}
          {isRequired && (
            <Typography
              component="span"
              aria-hidden="true"
              className="rds-autocomplete__asterisk"
              sx={{ color: 'var(--rds-error-main)', ml: 'var(--rds-spacing-micro)', fontSize: 'inherit', fontWeight: 700 }}
            >
              *
            </Typography>
          )}
        </label>
      )}
    <MuiAutocomplete
      {...muiAutocompleteProps}
      id={inputId}
      getOptionLabel={getOptionLabel}
      multiple={allowMultipleResolved}
      limitTags={allowMultipleResolved ? responsiveLimitTags : undefined}
      clearIcon={hideClearAll || shouldHideClearAll ? null : clearIcon}
      renderValue={renderValue ?? (allowMultipleResolved ? renderChips : undefined)}
      sx={[{ width: '100%' }, ...toSxArray(sx)]}
      slotProps={{ ...slotProps, listbox: listboxSlotProps }}
      open={open}
      onOpen={(event) => {
        if (!isOpenControlled && state !== 'expanded') {
          setInternalOpen(true);
        }
        onOpen?.(event);
      }}
      onClose={(event, reason) => {
        if (!isOpenControlled && state !== 'expanded') {
          setInternalOpen(false);
        }
        onClose?.(event, reason);
      }}
      disabled={disabled || state === 'disabled'}
      value={currentValue}
      onChange={handleChange}
        renderOption={(optionProps, option, { selected: checked }) => {
          const { key: optionKey, ...optionLiProps } = optionProps;
          const showDefault = !isShowCheckbox && !isShowRadio && !isShowUser;
          const singleMode = [isShowCheckbox, isShowRadio, isShowUser].filter(Boolean).length === 1;
          const multiMode = [isShowCheckbox, isShowRadio, isShowUser].filter(Boolean).length > 1;
          const labelGap = multiMode ? 2 : (singleMode && isShowUser ? 6 : (singleMode ? 4 : 8));
          if (showDefault) {
            return (
              <li {...optionLiProps} key={optionKey}>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0, ml: 0.2, mr: 3, gap: 1.5 }}>
                  <span>{optionText(option)}</span>
                </Box>
              </li>
            );
          }
          return (
            <li {...optionLiProps} style={{ display: 'flex', alignItems: 'center', padding: 0, width: '100%' }} key={optionKey}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: `${labelGap}px`, ml: 0.5, mr: 0.5, width: '100%', overflow: 'hidden' }}>
                {(isShowCheckbox) && (
                  <RdsCheckbox status={checked ? 'checked' : 'unchecked'} tabIndex={-1} disableRipple sx={{ p: '2px', flexShrink: 0 }} />
                )}
                {(isShowUser) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', p: '2px', flexShrink: 0 }}>
                    {getOptionIcon ? getOptionIcon(option) : userIcon}
                  </Box>
                )}
                {(isShowRadio) && (
                  <Radio checked={checked} tabIndex={-1} disableRipple sx={{ p: '2px', flexShrink: 0 }} />
                )}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{optionText(option)}</span>
              </Box>
            </li>
          );
        }}

        popupIcon={popupIcon}
        renderInput={(params) => {
          const { inputProps: paramsInputProps, ...textFieldParams } = params;
          const shouldShowPlaceholder = allowMultipleResolved
            ? (Array.isArray(currentValue) ? currentValue.length === 0 : !currentValue)
            : !currentValue;

          return (
            <TextField
              {...textFieldParams}
              placeholder={shouldShowPlaceholder ? placeholder : ''}
              helperText={helperText ?? ' '}
              error={error}
              variant={variant}
              className={`rds-autocomplete__textfield ${sizeClass} ${controlStyleClass} ${!showHintText ? 'rds-autocomplete__textfield--hidden-helper' : ''}`}
              slotProps={{
                htmlInput: {
                  ...paramsInputProps,
                  'aria-label': label || placeholder || 'Autocomplete',
                  ...(isRequired ? { 'aria-required': true } : {}),
                },
              }}
              onFocus={(e) => {
                if (openOnFocus && state !== 'expanded' && !open) {
                  if (!isOpenControlled) {
                    setInternalOpen(true);
                  }
                  onOpen?.(e);
                }
                if (paramsInputProps?.onFocus) {
                  paramsInputProps.onFocus(e as FocusEvent<HTMLInputElement>);
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
