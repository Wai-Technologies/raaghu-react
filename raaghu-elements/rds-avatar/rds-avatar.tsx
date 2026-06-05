import React from 'react';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';
import { motion, useReducedMotion } from 'motion/react';
import { useMotionTokens } from '../../raaghu-react-themes/src/motion';

export interface RdsAvatarProps extends AvatarProps {
  colorVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
  title?: string;
  subText?: string;
  size?: 'smallest' | 'small' | 'medium' | 'large' | 'largest';
  displayStyle?: 'with-name' | 'name-bottom' | 'stacking';
  avatars?: Array<{
    src?: string;
    title?: string;
    subText?: string;
    size?: 'smallest' | 'small' | 'medium' | 'large' | 'largest';
  }>;
  maxVisibleAvatars?: number;
  activityRing?: boolean;
  activeDotTop?: boolean;
  activeDotBottom?: boolean;
  showName?: boolean;
  showDesignation?: boolean;
  showRemainingCount?: boolean;
  animationDuration?: number;
}
const sizeStyles = {
  smallest: { width: 24, height: 24, fontSize: '0.5625rem' },  // 9px
  small:    { width: 32, height: 32, fontSize: '0.6875rem' },  // 11px
  medium:   { width: 40, height: 40, fontSize: '0.875rem'  },  // 14px
  large:    { width: 48, height: 48, fontSize: '1.125rem'  },  // 18px
  largest:  { width: 64, height: 64, fontSize: '1.3125rem' },  // 21px
};

/** Maps avatar size key to a rem font-size for the +N overflow badge */
const overflowFontSize: Record<string, string> = {
  smallest: '0.5rem',
  small:    '0.6875rem',
  medium:   '0.875rem',
  large:    '1rem',
  largest:  '1.125rem',
};

const RdsAvatar = ({
  colorVariant = 'primary',
  title,
  subText,
  size = 'medium',
  displayStyle = 'with-name',
  avatars,
  maxVisibleAvatars = 3,
  children,
  sx,
  activityRing = false,
  activeDotTop = false,
  activeDotBottom = false,
  showName = true,
  showDesignation = true,
  showRemainingCount = true,
  animationDuration,
  ...props
}: RdsAvatarProps) => {
  const shouldReduce = useReducedMotion();
  const motionTokens = useMotionTokens();
  const dur = typeof animationDuration === 'number' ? animationDuration / 1000 : motionTokens.fast;
  const mountProps = {
    initial: shouldReduce ? false as const : { scale: 0.7, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: shouldReduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 380, damping: 22, duration: dur },
  };

  if (displayStyle === 'stacking' && avatars && avatars.length > 0) {
    const visibleAvatars = avatars.slice(0, maxVisibleAvatars);
    const remainingCount = Math.max(0, avatars.length - maxVisibleAvatars);
    const overlapOffset = size === 'smallest' ? -12 : size === 'small' ? -14 : size === 'medium' ? -16 : size === 'largest' ? -26 : size === 'large' ? -20 : -22;

    return (
      <div className="rds-avatar__stacking avatar-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {visibleAvatars.map((avatar, idx) => (
          <motion.div
            key={idx}
            style={{ position: 'relative', zIndex: idx + 1, marginLeft: idx === 0 ? 0 : `${overlapOffset}px`, display: 'inline-flex' }}
            initial={shouldReduce ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={shouldReduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 22, delay: idx * 0.06 }}
          >
            <MuiAvatar
              src={avatar.src}
              sx={{
                ...sizeStyles[size],
                border: 'none',
                boxSizing: 'content-box',
                background: 'var(--rds-neutral-300, #e0e0e0)',
              }}
              className="rds-avatar__stacking-avatar"
            >
              {avatar.title ? avatar.title.charAt(0).toUpperCase() : null}
            </MuiAvatar>
          </motion.div>
        ))}
        {remainingCount > 0 && showRemainingCount && (
          <div
            className={`plus-indicator plus-indecator-${size}`}
            style={{
              marginLeft: `${overlapOffset}px`,
              zIndex: maxVisibleAvatars + 1,
              fontSize: overflowFontSize[size] ?? '0.875rem',
            }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }

  if (displayStyle === 'with-name') {
    return (
      <motion.div {...mountProps}
        className={`rds-avatar rds-avatar--with-name rds-avatar--${size}${activityRing ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
      >
        <span className={`rds-avatar__avatar-wrap`}>
          {activityRing && <span className="rds-avatar__ring" aria-hidden="true" />}
          <MuiAvatar sx={{ ...sizeStyles[size], ...sx }} {...props}>
            {title ? title.split(' ').map(n => n[0]).join('').toUpperCase() : children}
          </MuiAvatar>
          {activeDotTop && <span className="rds-avatar__dot rds-avatar__dot--top" aria-label="active status top" />}
          {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
        </span>

        <div className="rds-avatar__info">
          {showName && title && <div className="rds-avatar__name" id='avatarname'>{title}</div>}
          {showDesignation && subText && <div className="rds-avatar__designation">{subText}</div>}
        </div>
      </motion.div>
    );
  }

  if (displayStyle === 'name-bottom') {
    return (
      <motion.div {...mountProps}
        className={`rds-avatar rds-avatar--name-bottom rds-avatar--${size}${activityRing ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
      >
        <span className="rds-avatar__avatar-outer">
          {activityRing && <span className="rds-avatar__ring" aria-hidden="true" />}
          <span className="rds-avatar__avatar-wrap">
            <MuiAvatar
              sx={{ ...sizeStyles[size], ...sx }}
      {...props}
    >
      {title ? title.split(' ').map(n => n[0]).join('').toUpperCase() : children}
    </MuiAvatar>
            {activeDotTop && <span className="rds-avatar__dot rds-avatar__dot--top" aria-label="active status top" />}
            {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
          </span>
        </span>
        <div className="rds-avatar__info rds-avatar__info--center">
          {showName && title && <div className="rds-avatar__name">{title}</div>}
          {showDesignation && subText && <div className="rds-avatar__designation">{subText}</div>}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.span {...mountProps}
      className={`rds-avatar${activityRing ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
      style={{ display: 'inline-flex' }}
    >
      <span className="rds-avatar__avatar-outer">
        {activityRing && <span className="rds-avatar__ring" aria-hidden="true" />}
        <span className="rds-avatar__avatar-wrap">
          <MuiAvatar sx={{ ...sizeStyles[size], ...sx }} {...props}>
            {title ? title.charAt(0).toUpperCase() : children}
          </MuiAvatar>
          {activeDotTop && <span className="rds-avatar__dot rds-avatar__dot--top" aria-label="active status top" />}
          {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
        </span>
      </span>
    </motion.span>
  );
};

RdsAvatar.displayName = 'RdsAvatar';
export default RdsAvatar;
