import React from 'react';
import { Switch as MuiSwitch, FormControlLabel, SwitchProps } from '@mui/material';
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
  // Normalize: remove spaces, lowercase
  return layout.trim().toLowerCase().replace(/ +/g, '').replace('toplabel', 'toplabel').replace('bottomlabel', 'bottomlabel') as RdsSwitchProps['layout'];
};

const normalizeState = (state?: string): RdsSwitchProps['state'] | undefined => {
  if (!state) return undefined;
  // Normalize: lowercase, single spaces
  return state.trim().toLowerCase().replace(/ +/g, ' ') as RdsSwitchProps['state'];
};

const RdsSwitch: React.FC<RdsSwitchProps> = ({
  label,
  labelPlacement = 'end',
  layout,
  state,
  style: styleProp = 'style1',
  showLabel,
  ...props
}) => {
  // Normalize props for internal logic
  const normalizedLayout = normalizeLayout(layout);
  const normalizedState = normalizeState(state);

  // Determine label placement from layout
  const effectivePlacement: RdsSwitchProps['labelPlacement'] = normalizedLayout ? layoutToPlacement[normalizedLayout] : labelPlacement;

  // Determine if switch is disabled
  const disabled = normalizedState === 'disabled on' || normalizedState === 'disabled off' || props.disabled;

  // Controlled mode if checked is provided by parent
  const isControlled = typeof props.checked === 'boolean';

  // Internal state for uncontrolled switch
  const [internalChecked, setInternalChecked] = React.useState(() => {
    if (isControlled) return props.checked as boolean;
    if (normalizedState === 'on' || normalizedState === 'disabled on') return true;
    if (normalizedState === 'off' || normalizedState === 'disabled off') return false;
    return Boolean(props.defaultChecked);
  });

  // Sync internal state with normalizedState changes
  React.useEffect(() => {
    if (!isControlled && normalizedState) {
      if (normalizedState === 'on' || normalizedState === 'disabled on') setInternalChecked(true);
      if (normalizedState === 'off' || normalizedState === 'disabled off') setInternalChecked(false);
    }
  }, [normalizedState, isControlled]);

  // Change handler for switch
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: boolean) => {
    if (!isControlled && !disabled) {
      setInternalChecked(value);
    }
    if (props.onChange) {
      props.onChange(event, value);
    }
  };

  // Map Storybook values like 'Style 1' to 'style1'
  const normalizedStyleType = typeof styleProp === 'string' ? styleProp.replace(/\s+/g, '').toLowerCase() : 'style1';
  // BEM class for style variant
  const styleClass = `rds-switch rds-switch--${normalizedStyleType}`;

  // Props for MuiSwitch
  const switchProps: SwitchProps = {
    ...props,
    checked: isControlled ? props.checked : internalChecked,
    disabled,
    onChange: handleChange,
    className: styleClass + (props.className ? ` ${props.className}` : ''),
  };

  // Render switch with or without label
  if (showLabel === false) {
    return <MuiSwitch {...switchProps} />;
  }
  if (label) {
    return (
      <FormControlLabel
        className={styleClass}
        control={<MuiSwitch {...switchProps} />}
        label={label}
        labelPlacement={effectivePlacement}
      />
    );
  }
  return <MuiSwitch {...switchProps} />;
};

export default RdsSwitch;
