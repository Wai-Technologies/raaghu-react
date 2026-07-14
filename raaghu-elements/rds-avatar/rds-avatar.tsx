import clsx from 'clsx';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';

export interface RdsAvatarProps extends Omit<AvatarProps, 'component'> {
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
    alt?: string;
    colorVariant?: string;
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

const overlapOffsets: Record<string, number> = {
  smallest: -12,
  small: -14,
  medium: -16,
  large: -20,
  largest: -26,
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
    const overlapOffset = overlapOffsets[size] ?? -22;
    const avatarSize = sizeStyles[size].width;
    const itemCount = visibleAvatars.length + (remainingCount > 0 && showRemainingCount ? 1 : 0);
    const stackWidth =
      itemCount > 0 ? avatarSize + Math.max(0, itemCount - 1) * (avatarSize + overlapOffset) : avatarSize;

    return (
      <div
        className={clsx('rds-avatar', `rds-avatar--${size}`, 'rds-avatar__stacking', 'avatar-container')}
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          flexShrink: 0,
          minHeight: avatarSize,
          width: stackWidth,
        }}
      >
        {visibleAvatars.map((avatar, idx) => (
    <MuiAvatar
      key={avatar.src || avatar.title || avatar.alt || `${avatar.colorVariant || 'avatar'}-${idx + 1}`}
      src={avatar.src}
      sx={{
              ...sizeStyles[size],
              position: 'relative',
              zIndex: idx + 1, 
              marginLeft: idx === 0 ? 0 : `${overlapOffset}px`,
              border: 'none',
              boxSizing: 'content-box',
              background: 'var(--rds-neutral-300, #e0e0e0)',
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
      <div
        className={clsx(
        'rds-avatar',
        'rds-avatar--with-name',
        `rds-avatar--${size}`,
        activityRing && 'rds-avatar--with-ring',
        activeDotTop && 'rds-avatar--dot-top',
        activeDotBottom && 'rds-avatar--dot-bottom',
        colorVariant && `rds-avatar--${colorVariant}`,
      )}
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
        className={clsx(
        'rds-avatar',
        'rds-avatar--name-bottom',
        `rds-avatar--${size}`,
        activityRing && 'rds-avatar--with-ring',
        activeDotTop && 'rds-avatar--dot-top',
        activeDotBottom && 'rds-avatar--dot-bottom',
        colorVariant && `rds-avatar--${colorVariant}`,
      )}
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
      className={clsx(
        'rds-avatar',
        activityRing && 'rds-avatar--with-ring',
        activeDotTop && 'rds-avatar--dot-top',
        activeDotBottom && 'rds-avatar--dot-bottom',
        colorVariant && `rds-avatar--${colorVariant}`,
      )}
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
