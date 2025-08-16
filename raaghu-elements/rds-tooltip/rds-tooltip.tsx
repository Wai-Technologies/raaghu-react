import * as React from 'react';
import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import clsx from 'clsx';
import './rds-tooltip.scss';
export interface RdsTooltipProps extends  Omit<TooltipProps,'style'> {
  children: React.ReactElement;
  label?: string;
  style?:
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
  tooltipStyle?: React.CSSProperties;
  arrow?: boolean;
}

const RdsTooltip= ({
  children,
  label,
  style = 'top',
  title,
  className,
  tooltipStyle,
  arrow = false,
  ...props
}:RdsTooltipProps) => {
  // Compose BEM class for position
  const tooltipClass = clsx(
    'rds-tooltip',
    `rds-tooltip--${(style).replace(/-.*/, '')}`,
    className
  );

  // Inline style for custom colors
  const customStyle = {
    ...(tooltipStyle || {}),
  } as React.CSSProperties;

  return (
    <MuiTooltip
      title={title || label}
      placement={style}
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
