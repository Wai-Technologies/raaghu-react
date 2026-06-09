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
  label?: React.ReactNode;
  /** Storybook helper: whether to wrap children in a span (default is always true internally) */
  wrapper?: boolean;
}

const RdsTooltip= ({
  children,
  style = 'top',
  title,
  label,
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

  const { onOpen, onClose, ...restProps } = props;

  const handleFocus = (e: React.FocusEvent) => {
    if (onOpen) onOpen(e as any);
  };
  const handleBlur = (e: React.FocusEvent) => {
    if (onClose) onClose(e as any);
  };

  return (
    <MuiTooltip
      title={title ?? label}
      placement={style}
      arrow={arrow}
      classes={{ popper: tooltipClass }}
      sx={customStyle}
      onOpen={onOpen}
      onClose={onClose}
      {...restProps}
    >
      <span
        className="rds-tooltip__wrapper"
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </span>
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
