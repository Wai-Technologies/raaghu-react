import type { ReactNode } from 'react';
import { Chip as MuiChip, type ChipProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-tag.scss';

/** Compact label built on MUI `Chip`. Set `removable` with `onDelete` to show the delete icon. */
export interface RdsTagProps extends Omit<ChipProps, 'label' | 'component'> {
  label: ReactNode;
  /** Shows the delete icon (needs `onDelete` or `onRemove`). Without it, `onDelete` is ignored. */
  removable?: boolean;
  /** @deprecated Use `onDelete` instead. */
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
  if (onRemove !== undefined) warnDeprecatedProp('RdsTag', 'onRemove', '`onDelete`');
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
