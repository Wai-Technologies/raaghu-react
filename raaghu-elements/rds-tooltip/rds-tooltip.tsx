
import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
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
  /** Styles passed to the tooltip as `sx`. */
  tooltipStyle?: CSSProperties;
  arrow?: boolean;
  /** Tooltip placement. */
  placement?: Placement;
  /** @deprecated Passing a placement string is deprecated; use `placement`. Pass CSSProperties for inline styles. */
  style?: Placement | CSSProperties;
  /** @deprecated Use `title`. */
  label?: ReactNode;
  /** @deprecated Has no effect; children are wrapped only when disabled. */
  wrapper?: boolean;
}

function childNeedsWrapper(child: ReactElement): boolean {
  const props = child.props as { disabled?: boolean };
  return Boolean(props.disabled);
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
}: RdsTooltipProps & { 'data-testid'?: string }) => {
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

  const objectStyle = typeof style === 'object' ? style : undefined;

  const trigger = isValidElement(children) && !childNeedsWrapper(children) ? (
    cloneElement(children as ReactElement<Record<string, unknown>>, {
      ...(dataTestId !== undefined ? { 'data-testid': dataTestId } : {}),
      ...(objectStyle !== undefined
        ? {
            style: {
              ...((children.props as { style?: CSSProperties }).style ?? {}),
              ...objectStyle,
            },
          }
        : {}),
    })
  ) : (
    <span
      className="rds-tooltip__child-wrapper"
      style={objectStyle}
      data-testid={dataTestId}
      tabIndex={0}
    >
      {children}
    </span>
  );

  return (
    <MuiTooltip
      title={title ?? label}
      placement={resolvedPlacement}
      arrow={arrow}
      classes={{ popper: tooltipClass }}
      sx={tooltipStyle}
      describeChild
      {...props}
    >
      {trigger}
    </MuiTooltip>
  );
};

RdsTooltip.displayName = 'RdsTooltip';

export default RdsTooltip;
