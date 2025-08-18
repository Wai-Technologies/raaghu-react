import React from 'react';
import { Fab as MuiFab, FabProps } from '@mui/material';

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
      'bottom-right': { position: 'fixed', bottom: 16, right: 16 },
      'bottom-left': { position: 'fixed', bottom: 16, left: 16 },
      'top-right': { position: 'fixed', top: 16, right: 16 },
      'top-left': { position: 'fixed', top: 16, left: 16 },
    };
    
    return positions[position] || {};
  };

  return (
    <MuiFab
      sx={{
        ...getPositionStyles(),
        ...sx,
      }}
      {...props}
    >
      {icon || children || label}
    </MuiFab>
  );
};
RdsFab.displayName = 'RdsFab';
export default RdsFab;
