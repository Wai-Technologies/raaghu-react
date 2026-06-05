import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import './rds-tag.scss';

export interface RdsTagProps extends Omit<ChipProps, 'label'> {
  label: string;
  removable?: boolean;
  onRemove?: () => void;
  animationDuration?: number;
}

const RdsTag: React.FC<RdsTagProps> = ({
  label,
  removable = false,
  onRemove,
  onDelete,
  className,
  animationDuration,
  ...props
}) => {
  const shouldReduce = useReducedMotion();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : 0.2;
  const combinedClassName = ['rds-tag', className].filter(Boolean).join(' ');

  return (
    <motion.span
      initial={shouldReduce ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={shouldReduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 22, duration: dur }}
      style={{ display: 'inline-flex' }}
    >
      <MuiChip
        className={combinedClassName}
        label={label}
        onDelete={removable ? (onRemove || onDelete) : undefined}
        {...props}
      />
    </motion.span>
  );
};

RdsTag.displayName = 'RdsTag';
export default RdsTag;
