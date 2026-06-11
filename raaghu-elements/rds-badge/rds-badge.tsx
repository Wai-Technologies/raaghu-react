import { type ReactNode } from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import clsx from 'clsx';
import './rds-badge.scss';

export interface RdsBadgeProps extends Omit<BadgeProps, 'showZero'> {
  children?: ReactNode;
  showZero?: boolean;
  max?: number;
  size?: 'small' | 'medium' | 'large';
  shape?: 'rectangle' | 'pill';
  layout?: 'text' | 'icon' | 'icon-text' | 'text-icon';
  styleType?: 'primary' | 'outline' | 'transparent';
  state?: 'default' | 'disabled';
  colorVariant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'light' | 'success';
}


const RdsBadge= ({
  children,
  showZero = false,
  max = 99,
  badgeContent,
  size = 'medium',
  color = 'primary',
  shape = 'pill',
  layout = 'text',
  styleType = 'primary',
  state = 'default',
  colorVariant = 'primary',
  ...props
}:RdsBadgeProps) => {
  const isZeroContent = badgeContent === 0 || badgeContent === '0';

  const bemClass = clsx(
    'rds-badge',
    `rds-badge--${size}`,
    `rds-badge--${shape}`,
    `rds-badge--${styleType}`,
    `rds-badge--${colorVariant || 'primary'}`,
    state === 'disabled' && 'rds-badge--disabled',
  );
  
  
  let badgeInner: ReactNode;
  switch (layout) {
    case 'icon':
      badgeInner = <Notifications fontSize="small" sx={{ marginRight: 0 }} />;
      break;
    case 'icon-text':
      badgeInner = <><Notifications fontSize="small" sx={{ marginRight: '6px' }} />{badgeContent?.toString()}</>;
      break;
    case 'text-icon':
      badgeInner = <>{badgeContent?.toString()}<Notifications fontSize="small" sx={{ marginLeft: '6px' }} /></>;
      break;
    case 'text':
    default:
      badgeInner = badgeContent?.toString();
      break;
  }
  
  if (!children) {
    if (isZeroContent && !showZero) {
      return null;
    }
    return (
      <span className={bemClass}>
        <span className="rds-badge__badge">{badgeInner}</span>
      </span>
    );
  }
  const shouldRenderBadge = !(isZeroContent && !showZero);
  
  if (!shouldRenderBadge) {
    return <>{children}</>;
  }
  
  return (
    <MuiBadge
      badgeContent={badgeContent}
      showZero={showZero}
      max={max}
      color={color}
      {...props}
      className={bemClass}
    >
      {children}
    </MuiBadge>
  );
};

RdsBadge.displayName = 'RdsBadge';
export default RdsBadge;
