import React from 'react';
import { Fab as MuiFab, FabProps } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import './rds-fab.scss';

export interface RdsFabProps extends FabProps {
  icon?: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  animationDuration?: number;
}

const RdsFab: React.FC<RdsFabProps> = ({
  icon,
  label,
  children,
  position,
  sx,
  animationDuration,
  ...props
}) => {
  const shouldReduce = useReducedMotion();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : 0.25;
  const getPositionStyles = () => {
    if (!position) return {};
    
    const positions = {
      'bottom-right': { position: 'fixed', bottom: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
      'bottom-left': { position: 'fixed', bottom: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
      'top-right': { position: 'fixed', top: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
      'top-left': { position: 'fixed', top: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
    };
    
    return positions[position] || {};
  };

  const isExtended = props.variant === 'extended';
  let fabContent;
  if (isExtended && icon && label) {
    fabContent = <><span>{icon}</span><span>{label}</span></>;
  } else if (children) {
    fabContent = children;
  } else if (icon) {
    fabContent = icon;
  } else if (label) {
    fabContent = label;
  } else {
    fabContent = null;
  }
  return (
    <motion.div
      initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={shouldReduce ? {} : { scale: 1.08 }}
      whileTap={shouldReduce ? {} : { scale: 0.94 }}
      transition={shouldReduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 22, duration: dur }}
      style={{ display: 'inline-flex' }}
    >
      <MuiFab
        sx={{
          ...getPositionStyles(),
          ...sx,
        }}
        {...props}
      >
        {fabContent}
      </MuiFab>
    </motion.div>
  );
};
RdsFab.displayName = 'RdsFab';
export default RdsFab;
