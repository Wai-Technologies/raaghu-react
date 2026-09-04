import { Chip as MuiChip, type ChipProps } from '@mui/material';
import clsx from 'clsx';
import './rds-tag.scss';
export interface RdsTagProps extends Omit<ChipProps, 'label' | 'component'> {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
}

const RdsTag = ({
  label,
  removable = false,
  onRemove,
  onDelete,
  className,
  ...props
}: RdsTagProps) => {
  const combinedClassName = clsx('rds-tag', className);

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
