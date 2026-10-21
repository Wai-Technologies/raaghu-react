import { useId } from 'react';
import {
  Select as MuiSelect,
  FormControl,
  InputLabel,
  MenuItem,
  type SelectProps,
  FormHelperText,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-select.scss';

export interface RdsSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RdsSelectProps
  extends Omit<SelectProps, 'children' | 'component'> {
  /** Visible label text. */
  label?: string;
  /** Placeholder shown when nothing is selected (only with `labelposition={false}`). */
  placeholder?: string;
  /** Options rendered as menu items. */
  options: RdsSelectOption[];
  /** Helper text shown below the select. */
  helperText?: string;
  /** Error text shown below the select; also puts the select in the error state. */
  errorMessage?: string;
  /** Whether the select is required. */
  required?: boolean;
  /** @deprecated Use `placeholder` instead. */
  inputPlaceholder?: string;
  /** `true` (default) renders a floating label; `false` renders the label above the field. */
  labelposition?: boolean;
  /** Size of the select. @default 'small' */
  size?: 'small' | 'medium';
}

const RdsSelect = ({
  label,
  placeholder,
  options,
  helperText,
  errorMessage,
  required = false,
  error,
  inputPlaceholder,
  labelposition = true,
  size = 'small',
  className,
  ...props
}: RdsSelectProps) => {
  if (inputPlaceholder !== undefined) {
    warnDeprecatedProp('RdsSelect', 'inputPlaceholder', '`placeholder`');
  }

  const labelId = useId();
  const resolvedPlaceholder = inputPlaceholder || placeholder;
  const hasError = !!errorMessage || error;

  return (
    <div
      className={clsx(
        'rds-select',
        hasError && 'rds-select--error',
        className
      )}
    >
      <FormControl
        fullWidth
        error={hasError}
        required={required}
        size={size}
        className="rds-select__form-control"
      >
        {!labelposition && label && (
          <label id={labelId} className="rds-select__label">
            {label}
            {required && (
              <span className="rds-select__asterisk">*</span>
            )}
          </label>
        )}

        {labelposition && label && (
          <InputLabel
            id={labelId}
            required={required}
            className="rds-select__input-label"
          >
            {label}
          </InputLabel>
        )}

        <MuiSelect
          labelId={label ? labelId : undefined}
          label={labelposition ? label : undefined}
          required={required}
          IconComponent={KeyboardArrowDownIcon}
          className="rds-select__field"
          {...(!labelposition && {
            displayEmpty: !!resolvedPlaceholder,
          })}
          renderValue={
            !labelposition
              ? (selected) => {
                  const labelFor = (value: unknown) => {
                    const option = options.find(
                      (item) => String(item.value) === String(value)
                    );
                    return option ? option.label : String(value);
                  };

                  if (Array.isArray(selected) && selected.length > 1) {
                    return selected.map(labelFor).join(', ');
                  }

                  const value = Array.isArray(selected)
                    ? selected[0]
                    : selected;

                  if (
                    value === undefined ||
                    value === null ||
                    value === ''
                  ) {
                    return (
                      <span className="rds-select__placeholder">
                        {resolvedPlaceholder || ''}
                      </span>
                    );
                  }

                  const selectedOption = options.find(
                    (option) => String(option.value) === String(value)
                  );

                  return selectedOption ? selectedOption.label : value;
                }
              : undefined
          }
          {...props}
          {...(required && {
            SelectDisplayProps: {
              'aria-required': true,
              ...props.SelectDisplayProps,
            },
          })}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className="rds-select__option"
            >
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>

        {(helperText || errorMessage) && (
          <FormHelperText className="rds-select__helper-text">
            {errorMessage || helperText}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

RdsSelect.displayName = 'RdsSelect';

export default RdsSelect;
