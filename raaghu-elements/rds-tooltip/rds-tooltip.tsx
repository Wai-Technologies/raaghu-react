import * as React from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import clsx from 'clsx';
import './rds-tooltip.scss';
export interface RdsTooltipProps extends TooltipProps {
  children: React.ReactElement;
  text?: string;
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
}

const RdsTooltip: React.FC<RdsTooltipProps> = ({
  children,
  text,
  position = 'top',
  title,
  className,
  style,
  arrow = false,
  ...props
}) => {
  // Compose BEM class for position
  const tooltipClass = clsx(
    'rds-tooltip',
    `rds-tooltip--${(position).replace(/-.*/, '')}`,
    className
  );

  // Inline style for custom colors
  const customStyle = {
    ...(style || {}),
  } as React.CSSProperties;

  return (
    <MuiTooltip
      title={title || text}
      placement={position}
      arrow={arrow}
      classes={{ popper: tooltipClass }}
      sx={customStyle}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
};

export default RdsTooltip;
