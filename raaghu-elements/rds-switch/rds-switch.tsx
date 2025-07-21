import React from 'react';
import { Switch as MuiSwitch, FormControlLabel, SwitchProps } from '@mui/material';

export interface RdsSwitchProps extends SwitchProps {
  label?: string;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const RdsSwitch: React.FC<RdsSwitchProps> = ({
  label,
  labelPlacement = 'end',
  ...props
}) => {
  if (label) {
    return (
      <FormControlLabel
        control={<MuiSwitch {...props} />}
        label={label}
        labelPlacement={labelPlacement}
      />
    );
  }

  return <MuiSwitch {...props} />;
};

export default RdsSwitch;
