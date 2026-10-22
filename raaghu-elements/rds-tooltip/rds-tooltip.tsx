
import { type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { Tooltip as MuiTooltip, type TooltipProps } from '@mui/material';
import clsx from 'clsx';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-tooltip.scss';

type Placement = NonNullable<TooltipProps['placement']>;

export interface RdsTooltipProps extends Omit<TooltipProps, 'style' | 'title'> {
  children: ReactElement;
  /** Tooltip content. */
  title?: ReactNode;
  /** Applied to the tooltip popper (not to the child). */
  className?: string;
  tooltipStyle?: CSSProperties;
  arrow?: boolean;
  /** Tooltip placement. */
  variant?: Placement;
  /** @deprecated Use `placement`. */
  style?: Placement;
  /** @deprecated Use `title`. */
  label?: ReactNode;
  /** @deprecated Has no effect; children are always wrapped in a span. */
  wrapper?: boolean;
}

const RdsTooltip = ({
  children,
  variant,
  style,
  placement,
  title,
  label,
  className,
  tooltipStyle,
  arrow = false,
  wrapper: _wrapper,
  ...props
}: RdsTooltipProps) => {
  if (style !== undefined) {
    warnDeprecatedProp('RdsTooltip', 'style', '`variant`');
  }
  if (label !== undefined) {
    warnDeprecatedProp('RdsTooltip', 'label', '`title`');
  }

  const resolvedPlacement: Placement = placement ?? variant ?? style ?? 'top';

  const tooltipClass = clsx(
    'rds-tooltip',
    `rds-tooltip--${resolvedPlacement.replace(/-.*/, '')}`,
    className
  );

  // MUI opens on focus/hover of the child, so no extra focus handlers are needed.
  return (
    <MuiTooltip
      title={title ?? label}
      placement={resolvedPlacement}
      arrow={arrow}
      classes={{ popper: tooltipClass }}
      sx={tooltipStyle}
      {...props}
    >
      <span className="rds-tooltip__wrapper">
        {children}
      </span>
    </MuiTooltip>
  );
};

RdsTooltip.displayName = 'RdsTooltip';

export default RdsTooltip;
