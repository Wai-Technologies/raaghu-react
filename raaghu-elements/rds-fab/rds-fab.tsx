import { type ReactNode, type CSSProperties, isValidElement } from 'react';
import { Fab as MuiFab, type FabProps } from '@mui/material';
import './rds-fab.scss';

export interface RdsFabProps extends Omit<FabProps, 'component'> {
  icon?: ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const POSITION_STYLES: Record<NonNullable<RdsFabProps['position']>, CSSProperties> = {
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
  icon,
  label,
  children,
  position,
  sx,
  ...props
}: RdsFabProps) => {
  const positionStyles = position ? (POSITION_STYLES[position] ?? {}) : {};

  const isExtended = props.variant === 'extended';
  const resolvedIcon = isRenderableNode(icon) ? icon : undefined;
  const resolvedLabel = typeof label === 'string' ? label : undefined;
  const resolvedChildren = isRenderableNode(children) ? children : undefined;

  let fabContent;
  if (isExtended && resolvedIcon && resolvedLabel) {
    fabContent = <><span>{resolvedIcon}</span><span>{resolvedLabel}</span></>;
  } else if (resolvedChildren) {
    fabContent = resolvedChildren;
  } else if (resolvedIcon) {
    fabContent = resolvedIcon;
  } else if (resolvedLabel) {
    fabContent = resolvedLabel;
  } else {
    fabContent = null;
  }
  return (
    <MuiFab
      sx={{
        ...positionStyles,
        ...sx,
      }}
      {...props}
    >
      {fabContent}
    </MuiFab>
  );
};
RdsFab.displayName = 'RdsFab';
export default RdsFab;
