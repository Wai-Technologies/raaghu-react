import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export interface RdsChipProps extends ChipProps {}

const RdsChip: React.FC<RdsChipProps> = ({
  label,
  ...props
}) => {
  return (
    <MuiChip
      label={label}
      {...props}
    />
  );
};

RdsChip.displayName = 'RdsChip';
export default RdsChip;
