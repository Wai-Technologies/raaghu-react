import { useMemo, type ChangeEvent } from 'react';
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  type RadioProps,
  type RadioGroupProps,
  Box,
  Typography
} from '@mui/material';
import clsx from 'clsx';
import './rds-radio.scss';

export interface RdsRadioOption {
  value: string;
  text: string;
  disabled?: boolean;
}

export interface RdsRadioProps extends Omit<RadioGroupProps, 'children' | 'component'> {
  options: RdsRadioOption[];
  label?: string;
  direction?: 'row' | 'column';
  radioProps?: RadioProps;
  layout?: 'icon' | 'icon with label' | 'icon with bottom label';
  state?: 'default' | 'hover' | 'disabled';
  selected?: boolean;
}

const RdsRadio= ({
  options,
  label,
  direction = 'column',
  radioProps,
  layout = 'icon with label',
  state = 'default',
  selected,
  ...props
}:RdsRadioProps) => {
  const radioRow = direction === 'row';

  const effectiveValue: string | undefined = useMemo(() => {
    if (typeof selected === 'undefined') return props.value as string | undefined;
    if (selected === false) return undefined;
    if (props.value) return props.value as string;
    const first = options.find(o => !o.disabled);
    return first ? first.value : undefined;
  }, [selected, props.value, options]);

  const renderOption = (option: RdsRadioOption) => {
    const optionDisabled = option.disabled ?? false;
    const finalDisabled = optionDisabled || state === 'disabled';
    
    const commonProps = {
      value: option.value,
      control: <MuiRadio {...radioProps} disabled={finalDisabled} disableRipple />,
      disabled: finalDisabled,
    };

    if (layout === 'icon') {
      return <FormControlLabel {...commonProps} key={option.value} label="" className="rds-radio__option rds-radio__option--icon" />;
    }

    if (layout === 'icon with bottom label') {
      const radioId = `rds-radio-${option.value}`;
      return (
        <Box
          key={option.value}
          className={clsx(
            'rds-radio__bottom-label-container',
            finalDisabled && 'rds-radio__bottom-label-container--disabled',
          )}
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <label htmlFor={radioId} style={{ cursor: finalDisabled ? 'not-allowed' : 'pointer', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MuiRadio 
              {...radioProps} 
              id={radioId}
              value={option.value}
              disabled={finalDisabled}
              checked={effectiveValue === option.value}
              name={props.name}
              onChange={(event) => {
                if (!finalDisabled) {
                  if (typeof selected === 'undefined' && props.onChange) {
                    props.onChange(event, option.value);
                  }
                }
              }}
              className="rds-radio__option"
              disableRipple
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 'var(--rds-spacing-xs, 4px)'
              }}
            />
            {option.text && (
              <Typography
                component="span"
                className={clsx(
                  'rds-radio__bottom-label',
                  finalDisabled && 'rds-radio__bottom-label--disabled',
                )}
                sx={{
                  pointerEvents: finalDisabled ? 'none' : 'auto',
                  opacity: finalDisabled ? 0.6 : 1,
                  color: finalDisabled ? 'var(--rds-text-disabled, #9e9e9e)' : 'inherit',
                  marginTop: 'var(--rds-spacing-xxs, 2px)',
                  textAlign: 'center'
                }}
              >
                {option.text}
              </Typography>
            )}
          </label>
        </Box>
      );
    }

    return (
      <FormControlLabel
        {...commonProps}
        key={option.value}
        label={option.text}
        className={clsx(
          'rds-radio__option',
          'rds-radio__option--with-label',
        )}
      />
    );
  };

  const { value: _ignoredValue, ...restProps } = props;

  return (
    <FormControl 
      component="fieldset" 
      className={clsx(
        'rds-radio',
        `rds-radio--${layout.replace(/ /g, '-')}`,
        state !== 'default' && `rds-radio--${state}`,
      )}
    >
      {label && <FormLabel component="legend" className="rds-radio__label">{label}</FormLabel>}
      {layout === 'icon with bottom label' ? (
        <Box className="rds-radio__group" sx={{ display: 'flex', flexDirection: direction, gap: 'var(--rds-spacing-md, 16px)' }}>
          {options.map(renderOption)}
        </Box>
      ) : (
        <RadioGroup
          row={radioRow}
          className="rds-radio__group"
          value={effectiveValue}
          onChange={(e, val) => {
            if (typeof selected === 'undefined' && props.onChange) {
              props.onChange(e as ChangeEvent<HTMLInputElement>, val);
            }
          }}
          {...restProps}
        >
          {options.map(renderOption)}
        </RadioGroup>
      )}
    </FormControl>
  );
};
RdsRadio.displayName = 'RdsRadio';
export default RdsRadio;