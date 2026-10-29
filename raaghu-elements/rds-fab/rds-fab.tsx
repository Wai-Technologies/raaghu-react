import { type ReactNode, type CSSProperties, isValidElement } from 'react';
import { Fab as MuiFab, type FabProps } from '@mui/material';
import { warnDeprecatedProp } from '../shared/utils/deprecation';
import './rds-fab.scss';

export type RdsFabPlacement = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

export interface RdsFabProps extends Omit<FabProps, 'component'> {
  /** Icon shown in the button (before the label in the extended variant). */
  startIcon?: ReactNode;
  /** @deprecated Use `startIcon` instead. */
  icon?: ReactNode;
  /**
   * Text shown in the extended variant (or alone when there is no icon/children).
   * When only the icon is shown, it is used as the button's `aria-label`
   * unless an explicit `aria-label` is passed.
   */
  label?: string;
  /** Pins the button to a corner of the viewport (`position: fixed`). */
  placement?: RdsFabPlacement;
  /** @deprecated Use `placement` instead. */
  position?: RdsFabPlacement;
}

const POSITION_STYLES: Record<RdsFabPlacement, CSSProperties> = {
  'bottom-right': { position: 'fixed', bottom: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
  'bottom-left': { position: 'fixed', bottom: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
  'top-right': { position: 'fixed', top: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
  'top-left': { position: 'fixed', top: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
};

const isRenderableNode = (node: unknown): node is ReactNode =>
  node == null ||
  typeof node === 'string' ||
  typeof node === 'number' ||
  isValidElement(node);

const RdsFab = ({
  startIcon,
  icon,
  label,
  children,
  placement,
  position,
  sx,
  'aria-label': ariaLabel,
  ...props
}: RdsFabProps) => {
  if (icon !== undefined) warnDeprecatedProp('RdsFab', 'icon', '`startIcon`');
  if (position !== undefined) warnDeprecatedProp('RdsFab', 'position', '`placement`');
  const resolvedPlacement = placement ?? position;
  const positionStyles = resolvedPlacement ? (POSITION_STYLES[resolvedPlacement] ?? {}) : {};

  const isExtended = props.variant === 'extended';
  const iconNode = startIcon ?? icon;
  const resolvedIcon = isRenderableNode(iconNode) ? iconNode : undefined;
  const resolvedLabel = typeof label === 'string' ? label : undefined;
  const resolvedChildren = isRenderableNode(children) ? children : undefined;
  const arrayChildren = Array.isArray(children) ? children : undefined;

  let fabContent: ReactNode;
  let isIconOnly = false;
  if (isExtended && resolvedIcon && resolvedLabel) {
    fabContent = <><span>{resolvedIcon}</span><span>{resolvedLabel}</span></>;
  } else if (resolvedChildren) {
    fabContent = resolvedChildren;
  } else if (resolvedIcon) {
    fabContent = resolvedIcon;
    isIconOnly = true;
  } else if (resolvedLabel) {
    fabContent = resolvedLabel;
  } else if (arrayChildren) {
    fabContent = arrayChildren;
  } else {
    fabContent = null;
  }
  return (
    <MuiFab
      {...props}
      aria-label={ariaLabel ?? (isIconOnly && resolvedLabel ? resolvedLabel : undefined)}
      sx={[positionStyles, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {fabContent}
    </MuiFab>
  );
};
RdsFab.displayName = 'RdsFab';
export default RdsFab;
