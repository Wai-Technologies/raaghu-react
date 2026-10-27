
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
  placement?: Placement;
  /** @deprecated Passing a placement string is deprecated; use `placement`. Pass CSSProperties for inline styles. */
  style?: Placement | CSSProperties;
  /** @deprecated Use `title`. */
  label?: ReactNode;
  /** @deprecated Has no effect; children are always wrapped in a span. */
  wrapper?: boolean;
}

const RdsTooltip = ({
  children,
  style,
  placement,
  title,
  label,
  className,
  tooltipStyle,
  arrow = false,
  wrapper: _wrapper,
  'data-testid': dataTestId,
  ...props
}: RdsTooltipProps) => {
  const legacyPlacement = typeof style === 'string' ? style : undefined;
  if (legacyPlacement !== undefined) {
    warnDeprecatedProp('RdsTooltip', 'style', '`placement`');
  }
  if (label !== undefined) {
    warnDeprecatedProp('RdsTooltip', 'label', '`title`');
  }

  const resolvedPlacement: Placement = placement ?? legacyPlacement ?? 'top';

  const tooltipClass = clsx(
    'rds-tooltip',
    `rds-tooltip--${resolvedPlacement.replace(/-.*/, '')}`,
    className
  );

  return (
    <MuiTooltip
      title={title ?? label}
      placement={resolvedPlacement}
      arrow={arrow}
      classes={{ popper: tooltipClass }}
      sx={tooltipStyle}
      {...props}
    >
      <span
        className="rds-tooltip__wrapper"
        style={typeof style === 'object' ? style : undefined}
        data-testid={dataTestId}
      >
        {children}
      </span>
    </MuiTooltip>
  );
};

RdsTooltip.displayName = 'RdsTooltip';

export default RdsTooltip;
