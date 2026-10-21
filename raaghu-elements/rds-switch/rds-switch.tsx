import { useState, type ChangeEvent } from 'react';
import { Switch as MuiSwitch, FormControlLabel, type SwitchProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-switch.scss';

/** Props for {@link RdsSwitch}. Extends MUI `SwitchProps` (except `style`/`component`). */
export interface RdsSwitchProps extends Omit<SwitchProps, 'style' | 'component'> {
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  layout?: 'switch+label' | 'label+switch' | 'toplabel+switch' | 'bottomlabel+switch';
  state?: 'off' | 'on' | 'disabled on' | 'disabled off';
  /** @deprecated Omit `label` instead. */
  showLabel?: boolean;
  /** Visual style; wins over `style` when both are set. */
  variant?: 'style1' | 'style2' | 'style3' | 'style4' | 'style5';
  style?: 'style1' | 'style2' | 'style3' | 'style4' | 'style5';
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

const normalizeState = (state?: string): RdsSwitchProps['state'] | undefined => {
  if (!state) return undefined;
  return state.trim().toLowerCase().replace(/ +/g, ' ') as RdsSwitchProps['state'];
};

/**
 * Switch toggle with optional label, built on MUI `Switch`.
 * Supports controlled (`checked`) and uncontrolled (`defaultChecked` / `state`) usage;
 * `labelPlacement` takes priority over `layout`.
 */
const RdsSwitch = ({
  label,
  labelPlacement,
  layout,
  state,
  style,
  variant,
  showLabel,
  ...props
}:RdsSwitchProps) => {
  if (showLabel !== undefined) warnDeprecatedProp('RdsSwitch', 'showLabel', 'omitting `label`');
  const styleProp = variant ?? style ?? 'style1';
  const normalizedLayout = normalizeLayout(layout);
  const normalizedState = normalizeState(state);

  const effectivePlacement: RdsSwitchProps['labelPlacement'] =
    labelPlacement
      ? labelPlacement
      : normalizedLayout
        ? layoutToPlacement[normalizedLayout]
        : 'end';

  const disabled = normalizedState === 'disabled on' || normalizedState === 'disabled off' || props.disabled;

  const isControlled = typeof props.checked === 'boolean';

  const [internalChecked, setInternalChecked] = useState(() => {
    if (isControlled) return props.checked as boolean;
    if (normalizedState === 'on' || normalizedState === 'disabled on') return true;
    if (normalizedState === 'off' || normalizedState === 'disabled off') return false;
    return Boolean(props.defaultChecked);
  });

  const [prevNormalizedState, setPrevNormalizedState] = useState(normalizedState);
  const [prevDefaultChecked, setPrevDefaultChecked] = useState(props.defaultChecked);

  if (!isControlled && (normalizedState !== prevNormalizedState || props.defaultChecked !== prevDefaultChecked)) {
    setPrevNormalizedState(normalizedState);
    setPrevDefaultChecked(props.defaultChecked);
    if (normalizedState === 'on' || normalizedState === 'disabled on') setInternalChecked(true);
    else if (normalizedState === 'off' || normalizedState === 'disabled off') setInternalChecked(false);
    else setInternalChecked(Boolean(props.defaultChecked));
  }

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

  const computedAriaLabel: string =
    (typeof props['aria-label'] === 'string' ? props['aria-label'] : undefined) ||
    (typeof label === 'string' ? label : undefined) ||
    'Switch';

  const mergeInput = (consumerInput: object | undefined) => ({
    ...consumerInput,
    ...(inputProps ?? {}),
    'aria-label': computedAriaLabel,
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
    className: clsx(styleClass, props.className),
    slotProps: {
      ...restProps.slotProps,
      input: mergedInput,
    },
  };

  if (label && showLabel !== false) {
    return (
      <div className="rds-switch--row">
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
    <div className="rds-switch--row">
      <MuiSwitch {...switchProps} />
    </div>
  );
};
RdsSwitch.displayName = 'RdsSwitch';
export default RdsSwitch;