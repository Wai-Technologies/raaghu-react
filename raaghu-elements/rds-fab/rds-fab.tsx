import React from 'react';
import { Fab as MuiFab, FabProps } from '@mui/material';
import './rds-fab.scss';

export interface RdsFabProps extends FabProps {
  icon?: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const RdsFab: React.FC<RdsFabProps> = ({
  icon,
  label,
  children,
  position,
  sx,
  ...props
}) => {
  const getPositionStyles = () => {
    if (!position) return {};
    
    const positions = {
      'bottom-right': { position: 'fixed', bottom: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
      'bottom-left': { position: 'fixed', bottom: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
      'top-right': { position: 'fixed', top: 'var(--rds-spacing-md)', right: 'var(--rds-spacing-md)' },
      'top-left': { position: 'fixed', top: 'var(--rds-spacing-md)', left: 'var(--rds-spacing-md)' },
    };
    
    return positions[position] || {};
  };

  const isRenderableNode = (node: unknown): node is React.ReactNode =>
    node == null ||
    typeof node === 'string' ||
    typeof node === 'number' ||
    React.isValidElement(node);

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
        ...getPositionStyles(),
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
