import * as React from 'react';
import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import clsx from 'clsx';
import './rds-tooltip.scss';
export interface RdsTooltipProps extends  Omit<TooltipProps,'style'> {
  children: React.ReactElement;
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
  style = 'top',
  title,
  className,
  tooltipStyle,
  arrow = false,
  ...props
}:RdsTooltipProps) => {
  const tooltipClass = clsx(
    'rds-tooltip',
    `rds-tooltip--${(style).replace(/-.*/, '')}`,
    className
  );

  const customStyle = {
    ...(tooltipStyle || {}),
  } as React.CSSProperties;

  return (
    <MuiTooltip
      title={title}
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
RdsTooltip.displayName = 'RdsTooltip';
export default RdsTooltip;

/* Summary of Removed Items:
 * ❌ Unused props - None found
 * ❌ Unused imports - None found
 * ❌ Commented code - None found
 * ❌ Empty callbacks - None found
 * ✅ Formatting cleanup - Code is clean and production-ready
 */
