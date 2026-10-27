import { useId } from 'react';
import { 
  Select as MuiSelect, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  type SelectProps, 
  FormHelperText 
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

export interface RdsSelectProps extends Omit<SelectProps, 'children' | 'component'> {
  /** Visible label text. */
  label?: string;
  /** Placeholder shown when nothing is selected. */
  placeholder?: string;
  /** Options rendered as menu items. */
  options: RdsSelectOption[];
  /** Helper text shown below the select. */
  helperText?: string;
  /** @deprecated Use `error` with `helperText` instead. */
  errorMessage?: string;
  /** @deprecated Use `required` instead. */
  isRequired?: boolean;
  /** @deprecated Use `placeholder` instead. */
  inputPlaceholder?: string;
  /** `floating` (default) renders a floating label; `top` renders the label above the field. */
  labelPlacement?: 'floating' | 'top';
  /** `true` renders a floating label; `false` renders the label above the field. */
  labelPosition?: boolean;
  /** Size of the select. @default 'small' */
  size?: 'small' | 'medium';
}

const RdsSelect = ({
  label,
  placeholder,
  options,
  helperText,
  errorMessage,
  isRequired,
  required,
  error,
  inputPlaceholder,
  labelPlacement,
  labelPosition,
  size = 'small',
  className,
  'data-testid': dataTestId,
  ...props
}: RdsSelectProps) => {
  if (isRequired !== undefined) warnDeprecatedProp('RdsSelect', 'isRequired', '`required`');
  if (inputPlaceholder !== undefined) warnDeprecatedProp('RdsSelect', 'inputPlaceholder', '`placeholder`');
  if (errorMessage !== undefined) warnDeprecatedProp('RdsSelect', 'errorMessage', '`error` with `helperText`');
  const floatingLabel = labelPlacement
    ? labelPlacement === 'floating'
    : (labelPosition ?? true);
  const labelId = useId();
  const isFieldRequired = required ?? isRequired ?? false;
  const resolvedPlaceholder = inputPlaceholder || placeholder;
  const hasError = !!errorMessage || error;
  
  return (
    <div
      data-testid={dataTestId}
      className={clsx('rds-select', hasError && 'rds-select--error', className)}
    >
      <FormControl 
        fullWidth 
        error={hasError} 
        size={size}
        className="rds-select__form-control"
      >
        {!floatingLabel && label && (
          <label id={labelId} className="rds-select__label">
            {label}
            {isFieldRequired && <span className="rds-select__asterisk">*</span>}
          </label>
        )}
        {floatingLabel && label && (
          <InputLabel 
            id={labelId} 
            required={isFieldRequired}
            className="rds-select__input-label"
          >
            {label}
          </InputLabel>
        )}
        <MuiSelect
          labelId={label ? labelId : undefined}
          label={floatingLabel ? label : undefined}
          IconComponent={KeyboardArrowDownIcon}
          className="rds-select__field"
          {...(!!resolvedPlaceholder && { displayEmpty: true })}
          renderValue={
            resolvedPlaceholder || !floatingLabel
              ? (selected) => {
                  const labelFor = (v: unknown) => {
                    const opt = options.find(o => String(o.value) === String(v));
                    return opt ? opt.label : String(v);
                  };
                  if (Array.isArray(selected) && selected.length > 1) {
                    return selected.map(labelFor).join(', ');
                  }
                  const value = Array.isArray(selected) ? selected[0] : selected;
                  if (value === undefined || value === null || value === "") {
                    return (
                      <span className="rds-select__placeholder">
                        {resolvedPlaceholder || ''}
                      </span>
                    );
                  }
                  const selectedOption = options.find(opt => String(opt.value) === String(value));
                  return selectedOption ? selectedOption.label : value;
                }
              : undefined
          }
          {...(required !== undefined && { required })}
          {...props}
          {...(isFieldRequired && {
            SelectDisplayProps: { 'aria-required': true, ...props.SelectDisplayProps },
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
