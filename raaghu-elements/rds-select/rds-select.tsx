import React, { useId } from 'react';
import { 
  Select as MuiSelect, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  SelectProps, 
  FormHelperText 
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './rds-select.scss';

export interface RdsSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RdsSelectProps extends Omit<SelectProps, 'children'> {
  label?: string;
  placeholder?: string;
  options: RdsSelectOption[];
  helperText?: string;
  errorMessage?: string;
  isRequired?: boolean;
  inputPlaceholder?: string;
  labelposition?: boolean;
  size?: 'small' | 'medium';
  className?: string;
}

const RdsSelect: React.FC<RdsSelectProps> = ({
  label,
  placeholder,
  options,
  helperText,
  errorMessage,
  isRequired = false,
  error,
  inputPlaceholder,
  labelposition = true,
  size = 'small',
  className,
  ...props
}) => {
  const labelId = useId();
  const hasError = !!errorMessage || error;
  
  return (
    <div className={`rds-select ${hasError ? 'rds-select--error' : ''} ${className || ''}`}>
      <FormControl 
        fullWidth 
        error={hasError} 
        size={size}
        className="rds-select__form-control"
      >
        {!labelposition && label && (
          <label className="rds-select__label">
            {label}
            {isRequired && <span className="rds-select__asterisk">*</span>}
          </label>
        )}
        {labelposition && label && (
          <InputLabel 
            id={labelId} 
            required={isRequired}
            className="rds-select__input-label"
          >
            {label}
          </InputLabel>
        )}
        <MuiSelect
          labelId={labelposition && label ? labelId : undefined}
          label={labelposition ? label : undefined}
          IconComponent={KeyboardArrowDownIcon}
          className="rds-select__field"
          {...(!labelposition && { displayEmpty: !!placeholder || !!inputPlaceholder })}
          renderValue={
            !labelposition
              ? (selected) => {
                  const value = Array.isArray(selected) ? selected[0] : selected;
                  if (value === undefined || value === null || value === "") {
                    return (
                      <span className="rds-select__placeholder">
                        {inputPlaceholder || placeholder || ''}
                      </span>
                    );
                  }
                  const selectedOption = options.find(opt => String(opt.value) === String(value));
                  return selectedOption ? selectedOption.label : value;
                }
              : undefined
          }
          {...props}
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
