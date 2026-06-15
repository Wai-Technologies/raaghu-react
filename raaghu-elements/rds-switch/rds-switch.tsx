import { useEffect, useState, type ChangeEvent } from 'react';
import { Switch as MuiSwitch, FormControlLabel, type SwitchProps } from '@mui/material';
import clsx from 'clsx';
import './rds-switch.scss';

export interface RdsSwitchProps extends Omit<SwitchProps, 'style'> {
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
  layout?: 'switch+label' | 'label+switch' | 'toplabel+switch' | 'bottomlabel+switch';
  state?: 'off' | 'on' | 'disabled on' | 'disabled off';
  showLabel?: boolean;
  style?: 'style1' | 'style2' | 'style3' | 'style4' | 'style5' | 'style6';
}

const layoutToPlacement: Record<NonNullable<RdsSwitchProps['layout']>, RdsSwitchProps['labelPlacement']> = {
  'switch+label': 'end',
  'label+switch': 'start',
  'toplabel+switch': 'top',
  'bottomlabel+switch': 'bottom',
};

const normalizeLayout = (layout?: string): RdsSwitchProps['layout'] | undefined => {
  if (!layout) return undefined;
  return layout.trim().toLowerCase().replace(/ +/g, '').replace('toplabel', 'toplabel').replace('bottomlabel', 'bottomlabel') as RdsSwitchProps['layout'];
};

const normalizeState = (state?: string): RdsSwitchProps['state'] | undefined => {
  if (!state) return undefined;
  return state.trim().toLowerCase().replace(/ +/g, ' ') as RdsSwitchProps['state'];
};

const RdsSwitch = ({
  label,
  labelPlacement = 'end',
  layout,
  state,
  style: styleProp = 'style1',
  showLabel,
  ...props
}:RdsSwitchProps) => {
  const normalizedLayout = normalizeLayout(layout);
  const normalizedState = normalizeState(state);

  const effectivePlacement: RdsSwitchProps['labelPlacement'] = normalizedLayout ? layoutToPlacement[normalizedLayout] : labelPlacement;

  const disabled = normalizedState === 'disabled on' || normalizedState === 'disabled off' || props.disabled;

  const isControlled = typeof props.checked === 'boolean';

  const [internalChecked, setInternalChecked] = useState(() => {
    if (isControlled) return props.checked as boolean;
    if (normalizedState === 'on' || normalizedState === 'disabled on') return true;
    if (normalizedState === 'off' || normalizedState === 'disabled off') return false;
    return Boolean(props.defaultChecked);
  });

  useEffect(() => {
    if (!isControlled) {
      if (normalizedState) {
        if (normalizedState === 'on' || normalizedState === 'disabled on') setInternalChecked(true);
        if (normalizedState === 'off' || normalizedState === 'disabled off') setInternalChecked(false);
      } else {
        setInternalChecked(Boolean(props.defaultChecked));
      }
    }
  }, [normalizedState, props.defaultChecked, isControlled]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>, value: boolean) => {
    if (!isControlled && !disabled) {
      setInternalChecked(value);
    }
    if (props.onChange) {
      props.onChange(event, value);
    }
  };

  const normalizedStyleType = typeof styleProp === 'string' ? styleProp.replace(/\s+/g, '').toLowerCase() : 'style1';
  const normalizedColor = props.color ? String(props.color).toLowerCase().replace(/[^a-z0-9_-]/g, '-') : 'primary';
  const styleClass = clsx('rds-switch', `rds-switch--${normalizedStyleType}`, `rds-switch--color-${normalizedColor}`);

  const { defaultChecked: _, ...restProps } = props;

  const computedAriaLabel: string =
    (typeof props['aria-label'] === 'string' ? props['aria-label'] : undefined) ||
    (typeof label === 'string' ? label : undefined) ||
    'Switch';

  const switchProps = {
    ...restProps,
    checked: isControlled ? props.checked : internalChecked,
    disabled,
    onChange: handleChange,
    className: clsx(styleClass, props.className),
    inputProps: {
      ...(restProps.inputProps ?? {}),
      'aria-label': computedAriaLabel,
    },
  };

  if (showLabel === false) {
    return (
      <div className="rds-switch--row">
        <MuiSwitch {...switchProps} />
      </div>
    );
  }
  if (label) {
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