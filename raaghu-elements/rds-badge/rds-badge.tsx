import React from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import './rds-badge.scss';

export interface RdsBadgeProps extends Omit<BadgeProps, 'showZero'> {
  children?: React.ReactNode;
  count?: number;
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
  count,
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
  const content = count !== undefined ? count : badgeContent;
  
  const bemClass = `rds-badge rds-badge--${size} rds-badge--${shape} rds-badge--${styleType} rds-badge--${colorVariant || 'primary'}${state === 'disabled' ? ' rds-badge--disabled' : ''}`;
  
  const isZeroContent = content === 0 || content === '0';
  
  
  let badgeInner: React.ReactNode;
  switch (layout) {
    case 'icon':
      badgeInner = <Notifications fontSize="small" sx={{ marginRight: 0 }} />;
      break;
    case 'icon-text':
      badgeInner = <><Notifications fontSize="small" sx={{ marginRight: '6px' }} />{content?.toString()}</>;
      break;
    case 'text-icon':
      badgeInner = <>{content?.toString()}<Notifications fontSize="small" sx={{ marginLeft: '6px' }} /></>;
      break;
    case 'text':
    default:
      badgeInner = content?.toString();
      break;
  }
  
  // If children is undefined, render badge pill directly
  if (!children) {
    // Handle showZero logic for standalone badge
    if (isZeroContent && !showZero) {
      return null;
    }
    return (
      <span className={bemClass}>
        <span className="rds-badge__badge">{badgeInner}</span>
      </span>
    );
  }
  
  // Otherwise, use MUI Badge for overlays
  // Handle showZero explicitly - if content is 0 and showZero is false, hide the badge
  const shouldRenderBadge = !(isZeroContent && !showZero);
  
  if (!shouldRenderBadge) {
    // Return children without badge if we shouldn't show zero
    return <>{children}</>;
  }
  
  return (
    <MuiBadge
      badgeContent={content}
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
