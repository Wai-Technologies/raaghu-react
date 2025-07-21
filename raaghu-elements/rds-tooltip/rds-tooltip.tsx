import React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

export interface RdsTooltipProps extends TooltipProps {
  children: React.ReactElement;
  text?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
}

const RdsTooltip: React.FC<RdsTooltipProps> = ({
  children,
  text,
  position = 'top',
  title,
  placement,
  ...props
}) => {
  return (
    <MuiTooltip
      title={title || text}
      placement={placement || position}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
};

export default RdsTooltip;
