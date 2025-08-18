import React from 'react';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';

export interface RdsAvatarProps extends AvatarProps {
  /** Color variant for activity ring and dot */
  colorVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
  name?: string;
  designation?: string;
  size?: 'small' | 'medium' | 'large';
  displayStyle?: 'with-name' | 'name-bottom' | 'stacking';
  avatars?: Array<{
    src?: string;
    name?: string;
    designation?: string;
    size?: 'small' | 'medium' | 'large';
  }>;
  ring?: boolean;
  /** Show activity dot on top of avatar */
  activeDotTop?: boolean;
  /** Show activity dot on bottom of avatar */
  activeDotBottom?: boolean;
  showName?: boolean;
  showDesignation?: boolean;
}
const sizeStyles = {
  small: { width: 32, height: 32, fontSize: 16 },
  medium: { width: 40, height: 40, fontSize: 20 },
  large: { width: 56, height: 56, fontSize: 28 }
};

const RdsAvatar = ({
  colorVariant = 'primary',
  name,
  designation,
  size = 'medium',
  displayStyle = 'with-name',
  avatars,
  children,
  sx,
  ring = false,
  activeDotTop = false,
  activeDotBottom = false,
  showName = true,
  showDesignation = true,
  ...props
}:RdsAvatarProps) => {

  if (displayStyle === 'stacking' && avatars && avatars.length > 0) {
    return (
      <div className="rds-avatar__stacking">
        {avatars.map((avatar, idx) => (
    <MuiAvatar
      key={idx}
      src={avatar.src}
      sx={{
              ...sizeStyles[avatar.size || size],
              zIndex: avatars.length - idx,
              left: idx * 20,
              position: 'absolute',
              border: '2px solid #fff',
              boxSizing: 'content-box',
              background: '#e0e0e0',
            }}
            className="rds-avatar__stacking-avatar"
          >
            {avatar.name ? avatar.name.charAt(0).toUpperCase() : null}
          </MuiAvatar>
        ))}
        <div className="rds-avatar__stacking-container" style={{ position: 'relative', height: sizeStyles[size].height, width: 20 * (avatars.length - 1) + sizeStyles[size].width }} />
      </div>
    );
  }

  // With name (horizontal)
  if (displayStyle === 'with-name') {
    return (
      <div
        className={`rds-avatar rds-avatar--with-name${ring ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
      >
        <span className={`rds-avatar__avatar-wrap`}>
          {ring && <span className="rds-avatar__ring" aria-hidden="true" />}
          <MuiAvatar sx={{ ...sizeStyles[size], ...sx }} {...props}>
            {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : children}
          </MuiAvatar>
          {activeDotTop && <span className="rds-avatar__dot" aria-label="active status top" />}
          {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
        </span>

        <div className="rds-avatar__info">
          {showName && name && <div className="rds-avatar__name">{name}</div>}
          {showDesignation && designation && <div className="rds-avatar__designation">{designation}</div>}
        </div>
      </div>
    );
  }

  // Name on bottom (vertical)
  if (displayStyle === 'name-bottom') {
    return (
      <div
        className={`rds-avatar rds-avatar--name-bottom${ring ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
      >
        <span className="rds-avatar__avatar-outer">
          {ring && <span className="rds-avatar__ring" aria-hidden="true" />}
          <span className="rds-avatar__avatar-wrap">
            <MuiAvatar
              sx={{ ...sizeStyles[size], ...sx }}
      {...props}
    >
      {name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : children}
    </MuiAvatar>
            {activeDotTop && <span className="rds-avatar__dot" aria-label="active status top" />}
            {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
          </span>
        </span>
        <div className="rds-avatar__info rds-avatar__info--center">
          {showName && name && <div className="rds-avatar__name">{name}</div>}
          {showDesignation && designation && <div className="rds-avatar__designation">{designation}</div>}
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <span
      className={`rds-avatar${ring ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`}
    >
      <span className="rds-avatar__avatar-outer">
        {ring && <span className="rds-avatar__ring" aria-hidden="true" />}
        <span className="rds-avatar__avatar-wrap">
          <MuiAvatar sx={{ ...sizeStyles[size], ...sx }} {...props}>
            {name ? name.charAt(0).toUpperCase() : children}
          </MuiAvatar>
          {activeDotTop && <span className="rds-avatar__dot" aria-label="active status top" />}
          {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />}
        </span>
      </span>
    </span>
  );
};

export default RdsAvatar;
