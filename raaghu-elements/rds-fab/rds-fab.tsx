import { type ReactNode, type CSSProperties } from 'react';
import { Fab as MuiFab, type FabProps } from '@mui/material';
import './rds-fab.scss';

export interface RdsFabProps extends FabProps {
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
  let fabContent;
  if (isExtended && icon && label) {
    fabContent = <><span>{icon}</span><span>{label}</span></>;
  } else if (children) {
    fabContent = children;
  } else if (icon) {
    fabContent = icon;
  } else if (label) {
    fabContent = label;
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
