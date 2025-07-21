import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export interface RdsChipProps extends ChipProps {
  text?: string;
}

const RdsChip: React.FC<RdsChipProps> = ({
  text,
  label,
  ...props
}) => {
  return (
    <MuiChip
      label={text || label}
      {...props}
    />
  );
};

export default RdsChip;
