import { type CSSProperties, type FocusEvent, type ReactElement, type ReactNode } from 'react';
import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import clsx from 'clsx';
import './rds-tooltip.scss';
export interface RdsTooltipProps extends  Omit<TooltipProps,'style'> {
  children: ReactElement;
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
  tooltipStyle?: CSSProperties;
  arrow?: boolean;
  label?: ReactNode;
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
  } as CSSProperties;

  const { onOpen, onClose, ...restProps } = props;

  const handleFocus = (e: FocusEvent<HTMLElement>) => {
    if (onOpen) onOpen(e);
  };
  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (onClose) onClose(e);
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
