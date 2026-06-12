import React from 'react';
import { Fab as MuiFab, FabProps } from '@mui/material';
import './rds-fab.scss';

export interface RdsFabProps extends FabProps {
  icon?: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const RdsFab: React.FC<RdsFabProps> = ({
  icon,
  label,
  children,
  position,
  sx,
  ...props
}) => {
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
    <MuiFab
      sx={{
        ...getPositionStyles(),
        ...sx,
      }}
      {...props}
    >
      {fabContent}
    </MuiFab>
  );
};
RdsFab.displayName = 'RdsFab';
export default RdsFab;
