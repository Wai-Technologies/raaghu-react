import { useId, useState, type ChangeEvent } from 'react';
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
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-radio.scss';

export interface RdsRadioOption {
  value: string;
  /** Option label. */
  label?: string;
  /** @deprecated Use `label`. */
  text?: string;
  disabled?: boolean;
}

export interface RdsRadioProps extends Omit<RadioGroupProps, 'children' | 'component'> {
  /** Radio options to render. */
  options: RdsRadioOption[];
  /** Legend label shown above the radio group. */
  label?: string;
  /** @deprecated Use `slotProps.radio` instead. */
  radioProps?: RadioProps;
  /** Props forwarded to the MUI radio, via `radio`. */
  slotProps?: { radio?: RadioProps };
  /** Where the option label sits: `none` (icon only), `end` or `bottom`. */
  labelPlacement?: 'none' | 'end' | 'bottom';
  /** Figma variant; `labelPlacement` takes precedence. */
  layout?: 'icon' | 'icon with label' | 'icon with bottom label';
  /** Preselects the `value` option, or the first enabled option when no value is set; false clears the selection. */
  selected?: boolean;
  /** Disables all radio options. @default false */
  disabled?: boolean;
  /** @deprecated Use `row`. */
  direction?: 'row' | 'column';
}

const placementLayouts = {
  none: 'icon',
  end: 'icon with label',
  bottom: 'icon with bottom label',
} as const;

const RdsRadio = ({
  options,
  label,
  direction,
  row,
  radioProps,
  slotProps,
  labelPlacement,
  defaultValue,
  layout: layoutProp = 'icon with label',
  disabled = false,
  selected,
  'data-testid': dataTestId,
  ...props
}: RdsRadioProps & { 'data-testid'?: string }) => {
  if (direction !== undefined) warnDeprecatedProp('RdsRadio', 'direction', '`row`');
  if (options.some(option => option.text !== undefined)) {
    warnDeprecatedProp('RdsRadio', 'options[].text', '`options[].label`');
  }

  if (radioProps !== undefined) warnDeprecatedProp('RdsRadio', 'radioProps', '`slotProps.radio`');
  const layout = labelPlacement ? placementLayouts[labelPlacement] : layoutProp;
  const mergedRadioProps = { ...radioProps, ...slotProps?.radio };
  const [innerValue, setInnerValue] = useState<string | undefined>(defaultValue);
  const isRow = row ?? direction === 'row';
  const groupId = useId();
  const groupName = props.name ?? `rds-radio-${groupId}`;

  const getEffectiveValue = (): string | undefined => {
    if (typeof selected === 'undefined') return (props.value as string | undefined) ?? (layout === 'icon with bottom label' ? innerValue : undefined);
    if (selected === false) return undefined;
    if (props.value) return props.value as string;
    return options.find(o => !o.disabled)?.value;
  };
  const effectiveValue = getEffectiveValue();

  const renderOption = (option: RdsRadioOption) => {
    const optionLabel = option.label ?? option.text;
    const finalDisabled = (option.disabled ?? false) || disabled;

    const commonProps = {
      value: option.value,
      control: <MuiRadio disableRipple {...mergedRadioProps} disabled={finalDisabled} />,
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
              disableRipple
              {...mergedRadioProps}
              id={radioId}
              value={option.value}
              disabled={finalDisabled}
              checked={effectiveValue === option.value}
              name={groupName}
              onChange={(event) => {
                if (finalDisabled || typeof selected !== 'undefined') return;
                if (props.value === undefined && defaultValue !== undefined) setInnerValue(option.value);
                props.onChange?.(event, option.value);
              }}
              className="rds-radio__option"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 'var(--rds-spacing-xs)'
              }}
            />
            {optionLabel && (
              <Typography
                component="span"
                className={clsx(
                  'rds-radio__bottom-label',
                  finalDisabled && 'rds-radio__bottom-label--disabled',
                )}
                sx={{
                  pointerEvents: finalDisabled ? 'none' : 'auto',
                  opacity: finalDisabled ? 0.6 : 1,
                  color: finalDisabled ? 'var(--rds-text-disabled)' : 'inherit',
                  marginTop: 'var(--rds-spacing-xxs)',
                  textAlign: 'center'
                }}
              >
                {optionLabel}
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
        label={optionLabel}
        className={clsx(
          'rds-radio__option',
          'rds-radio__option--with-label',
        )}
      />
    );
  };

  const { value: _ignoredValue, ...restProps } = props;
  const labelId = label ? `${groupName}-label` : undefined;

  return (
    <FormControl
      component="fieldset"
      data-testid={dataTestId}
      className={clsx(
        'rds-radio',
        `rds-radio--${layout.replace(/ /g, '-')}`,
        disabled && 'rds-radio--disabled',
      )}
    >
      {label && <FormLabel component="legend" id={labelId} className="rds-radio__label">{label}</FormLabel>}
      {layout === 'icon with bottom label' ? (
        <Box
          className="rds-radio__group"
          role="radiogroup"
          aria-labelledby={labelId}
          sx={{ display: 'flex', flexDirection: isRow ? 'row' : 'column', gap: 'var(--rds-spacing-md)' }}
        >
          {options.map(renderOption)}
        </Box>
      ) : (
        <RadioGroup
          row={isRow}
          className="rds-radio__group"
          value={effectiveValue}
          defaultValue={defaultValue}
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
