import { useState, type ChangeEvent, type CSSProperties } from 'react';
import { Switch as MuiSwitch, FormControlLabel, type SwitchProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-switch.scss';

type SwitchVariant = 'style1' | 'style2' | 'style3' | 'style4' | 'style5';

/** Props for {@link RdsSwitch}. Extends MUI `SwitchProps` (except `style`/`component`). */
export interface RdsSwitchProps extends Omit<SwitchProps, 'style' | 'component'> {
  /** Label text shown next to the switch. */
  label?: string;
  /** Position of the label relative to the switch; takes priority over `layout`. */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  /** Arrangement of label and switch, mapped to a label placement. */
  layout?: 'switch+label' | 'label+switch' | 'toplabel+switch' | 'bottomlabel+switch';
  /** @deprecated Omit `label` instead. */
  showLabel?: boolean;
  /** Visual variant. */
  variant?: SwitchVariant;
  /** @deprecated Passing a variant string is deprecated; use `variant`. Pass CSSProperties for inline styles. */
  style?: SwitchVariant | CSSProperties;
}

const layoutToPlacement: Record<NonNullable<RdsSwitchProps['layout']>, RdsSwitchProps['labelPlacement']> = {
  'switch+label': 'end',
  'label+switch': 'start',
  'toplabel+switch': 'top',
  'bottomlabel+switch': 'bottom',
};

const normalizeLayout = (layout?: string): RdsSwitchProps['layout'] | undefined => {
  if (!layout) return undefined;
  return layout.trim().toLowerCase().replace(/ +/g, '') as RdsSwitchProps['layout'];
};

/**
 * Switch toggle with optional label, built on MUI `Switch`.
 * Supports controlled (`checked`) and uncontrolled (`defaultChecked`) usage;
 * `labelPlacement` takes priority over `layout`.
 */
const RdsSwitch = ({
  label,
  labelPlacement,
  layout,
  style,
  variant,
  showLabel,
  className,
  'data-testid': dataTestId,
  ...props
}:RdsSwitchProps) => {
  if (showLabel !== undefined) warnDeprecatedProp('RdsSwitch', 'showLabel', 'omitting `label`');
  const legacyVariant = typeof style === 'string' ? style : undefined;
  if (legacyVariant !== undefined) warnDeprecatedProp('RdsSwitch', 'style', '`variant`');
  const styleProp = variant ?? legacyVariant ?? 'style1';
  const rowStyle = typeof style === 'object' ? style : undefined;
  const normalizedLayout = normalizeLayout(layout);

  const effectivePlacement: RdsSwitchProps['labelPlacement'] =
    labelPlacement
      ? labelPlacement
      : normalizedLayout
        ? layoutToPlacement[normalizedLayout]
        : 'end';

  const disabled = props.disabled ?? false;

  const isControlled = typeof props.checked === 'boolean';

  const [internalChecked, setInternalChecked] = useState(Boolean(props.defaultChecked));

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    if (!isControlled && !disabled) {
      setInternalChecked(value);
    }
    if (props.onChange) {
      props.onChange(event, value);
    }
  };

  const normalizedStyleRaw = typeof styleProp === 'string' ? styleProp.replace(/\s+/g, '').toLowerCase() : 'style1';
  const normalizedStyleType = normalizedStyleRaw === 'style6' ? 'style5' : normalizedStyleRaw;
  const normalizedColor = props.color ? String(props.color).toLowerCase().replace(/[^a-z0-9_-]/g, '-') : 'primary';
  const styleClass = clsx('rds-switch', `rds-switch--${normalizedStyleType}`, `rds-switch--color-${normalizedColor}`);

  const { defaultChecked: _, inputProps, ...restProps } = props;
  const slotInput = restProps.slotProps?.input;

  const computedAriaLabel: string | undefined =
    (typeof props['aria-label'] === 'string' ? props['aria-label'] : undefined) ||
    (typeof label === 'string' && label ? label : undefined);

  const mergeInput = (consumerInput: object | undefined) => ({
    ...consumerInput,
    ...(inputProps ?? {}),
    ...(computedAriaLabel !== undefined && { 'aria-label': computedAriaLabel }),
  });
  const mergedInput =
    typeof slotInput === 'function'
      ? (ownerState: Parameters<typeof slotInput>[0]) => mergeInput(slotInput(ownerState))
      : mergeInput(slotInput);

  const switchProps = {
    ...restProps,
    checked: isControlled ? props.checked : internalChecked,
    disabled,
    onChange: handleChange,
    className: styleClass,
    slotProps: {
      ...restProps.slotProps,
      input: mergedInput,
    },
  };

  const rootClassName = clsx('rds-switch--row', className);

  if (label && showLabel !== false) {
    return (
      <div className={rootClassName} style={rowStyle} data-testid={dataTestId}>
        <FormControlLabel
          className={styleClass}
          control={<MuiSwitch {...switchProps} />}
          label={label}
          labelPlacement={effectivePlacement}
        />
      </div>
    );
  }
  return (
    <div className={rootClassName} style={rowStyle} data-testid={dataTestId}>
      <MuiSwitch {...switchProps} />
    </div>
  );
};
RdsSwitch.displayName = 'RdsSwitch';
export default RdsSwitch;