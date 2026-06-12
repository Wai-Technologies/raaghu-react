import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';
import './rds-tag.scss';
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
  className,
  ...props
}) => {
  const combinedClassName = ['rds-tag', className].filter(Boolean).join(' ');

  return (
    <MuiChip
      className={combinedClassName}
      label={label}
      onDelete={removable ? (onRemove || onDelete) : undefined}
      {...props}
    />
  );
};
RdsTag.displayName = 'RdsTag';
export default RdsTag;
