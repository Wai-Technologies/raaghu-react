import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';

export interface RdsTagProps extends Omit<ChipProps, 'label'> {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
}

const RdsTag: React.FC<RdsTagProps> = ({
  label,
  removable = false,
  onRemove,
  onDelete,
  ...props
}) => {
  return (
    <MuiChip
      label={label}
      onDelete={removable ? (onRemove || onDelete) : undefined}
      {...props}
    />
  );
};
RdsTag.displayName = 'RdsTag';
export default RdsTag;
