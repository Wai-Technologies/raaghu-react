import React from 'react';
import { Badge as MuiBadge, type BadgeProps } from '@mui/material';
import Notifications from '@mui/icons-material/Notifications';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import './rds-badge.scss';

export interface RdsBadgeProps extends Omit<BadgeProps, 'showZero'> {
  children?: React.ReactNode;
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
  const shouldReduce = useReducedMotion();
  const content = badgeContent;
  
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
  
  if (!children) {
    if (isZeroContent && !showZero) {
      return null;
    }
    return (
      <motion.span
        className={bemClass}
        initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={shouldReduce ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={String(content)}
            className="rds-badge__badge"
            initial={shouldReduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={shouldReduce ? {} : { scale: 0.6, opacity: 0 }}
            transition={shouldReduce ? { duration: 0 } : { duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            {badgeInner}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  }
  const shouldRenderBadge = !(isZeroContent && !showZero);
  
  if (!shouldRenderBadge) {
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
