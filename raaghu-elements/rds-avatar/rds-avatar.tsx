import React from 'react';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';

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
}
const sizeStyles = {
  smallest: { width: 24, height: 24, fontSize: 9 },
  small: { width: 32, height: 32, fontSize: 11 },
  medium: { width: 40, height: 40, fontSize: 14 },
  large: { width: 48, height: 48, fontSize: 18 },
  largest: { width: 64, height: 64, fontSize: 21 }
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
  ...props
}: RdsAvatarProps) => {

  if (displayStyle === 'stacking' && avatars && avatars.length > 0) {
    const visibleAvatars = avatars.slice(0, maxVisibleAvatars);
    const remainingCount = Math.max(0, avatars.length - maxVisibleAvatars);
    const overlapOffset = size === 'smallest' ? -12 : size === 'small' ? -14 : size === 'medium' ? -16 : size === 'largest' ? -26 : size === 'large' ? -20 : -22;

    return (
      <div className="rds-avatar__stacking avatar-container" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {visibleAvatars.map((avatar, idx) => (
    <MuiAvatar
      key={idx}
      src={avatar.src}
      sx={{
              ...sizeStyles[size],
              position: 'relative',
              zIndex: idx + 1, 
              marginLeft: idx === 0 ? 0 : `${overlapOffset}px`,
              border: '0px solid #fff',
              boxSizing: 'content-box',
              background: '#e0e0e0',
            }}
            className="rds-avatar__stacking-avatar"
          >
            {avatar.title ? avatar.title.charAt(0).toUpperCase() : null}
          </MuiAvatar>
        ))}
        {remainingCount > 0 && showRemainingCount && (
          <div
            className={`plus-indicator plus-indecator-${size}`}
            style={{
              marginLeft: `${overlapOffset}px`,
              zIndex: maxVisibleAvatars + 1, 
              fontSize: size === 'smallest' ? '8px' : size === 'small' ? '11px' : size === 'medium' ? '14px' : size === 'large' ? '16px' : '18px'
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
      <div
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
      </div>
    );
  }

  if (displayStyle === 'name-bottom') {
    return (
      <div
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
      </div>
    );
  }

  return (
    <span
      className={`rds-avatar${activityRing ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
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
    </span>
  );
};

RdsAvatar.displayName = 'RdsAvatar';
export default RdsAvatar;
