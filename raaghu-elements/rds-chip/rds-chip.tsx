import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export interface RdsChipProps extends ChipProps {}

const RdsChip = React.forwardRef<HTMLDivElement, RdsChipProps>(function RdsChip({
  label,
  ...props
}, ref) {
  return (
    <MuiChip
      ref={ref}
      label={label}
      {...props}
    />
  );
});

RdsChip.displayName = 'RdsChip';
export default RdsChip;
