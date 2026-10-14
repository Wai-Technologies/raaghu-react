import clsx from 'clsx';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';
import type { ReactNode } from 'react';

type AvatarSize = 'smallest' | 'small' | 'medium' | 'large' | 'largest';

export interface RdsAvatarProps extends Omit<AvatarProps, 'component'> {
  colorVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
  title?: string;
  subText?: string;
  size?: AvatarSize;
  displayStyle?: 'with-name' | 'name-bottom' | 'stacking';
  avatars?: Array<{
    src?: string;
    title?: string;
    subText?: string;
    /** Has no effect: stacked avatars use the group's `size`. */
    size?: AvatarSize;
    alt?: string;
    /** Has no effect. */
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

const toSxArray = (sx: AvatarProps['sx']) => (Array.isArray(sx) ? sx : sx ? [sx] : []);

const allInitials = (title: string) => title.split(' ').map(n => n[0]).join('').toUpperCase();

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
  className,
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
        className={clsx('rds-avatar', `rds-avatar--${size}`, 'rds-avatar__stacking', 'avatar-container', className)}
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
            alt={avatar.alt ?? avatar.title}
            sx={[
              {
                ...sizeStyles[size],
                position: 'relative',
                zIndex: idx + 1,
                marginLeft: idx === 0 ? 0 : `${overlapOffset}px`,
                border: 'none',
                boxSizing: 'content-box',
                background: 'var(--rds-neutral-300, #e0e0e0)',
              },
              ...toSxArray(sx),
            ]}
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

  const rootClassName = clsx(
    'rds-avatar',
    displayStyle === 'with-name' && 'rds-avatar--with-name',
    displayStyle === 'name-bottom' && 'rds-avatar--name-bottom',
    (displayStyle === 'with-name' || displayStyle === 'name-bottom') && `rds-avatar--${size}`,
    activityRing && 'rds-avatar--with-ring',
    activeDotTop && 'rds-avatar--dot-top',
    activeDotBottom && 'rds-avatar--dot-bottom',
    colorVariant && `rds-avatar--${colorVariant}`,
  );

  const ring = activityRing && <span className="rds-avatar__ring" aria-hidden="true" />;

  // `ringInside`: the with-name layout renders the ring inside the avatar wrap, the others outside it.
  const renderAvatar = (initials: ReactNode, ringInside = false) => (
    <span className="rds-avatar__avatar-wrap">
      {ringInside && ring}
      <MuiAvatar sx={[sizeStyles[size], ...toSxArray(sx)]} className={className} {...props}>
        {initials}
      </MuiAvatar>
      {activeDotTop && <span className="rds-avatar__dot rds-avatar__dot--top" role="img" aria-label="active status top" />}
      {activeDotBottom && <span className="rds-avatar__dot rds-avatar__dot--bottom" role="img" aria-label="active status bottom" />}
    </span>
  );
  if (displayStyle === 'with-name') {
    return (
      <div className={rootClassName}>
        {renderAvatar(title ? allInitials(title) : children, true)}

        <div className="rds-avatar__info">
          {/* `#avatarname` is a styling hook in rds-avatar.scss and rds-app-bar.scss. */}
          {showName && title && <div className="rds-avatar__name" id='avatarname'>{title}</div>}
          {showDesignation && subText && <div className="rds-avatar__designation">{subText}</div>}
        </div>
      </div>
    );
  }

  if (displayStyle === 'name-bottom') {
    return (
      <div className={rootClassName}>
        <span className="rds-avatar__avatar-outer">
          {ring}
          {renderAvatar(title ? allInitials(title) : children)}
        </span>
        <div className="rds-avatar__info rds-avatar__info--center">
          {showName && title && <div className="rds-avatar__name">{title}</div>}
          {showDesignation && subText && <div className="rds-avatar__designation">{subText}</div>}
        </div>
      </div>
    );
  }

  return (
    <span className={rootClassName}>
      <span className="rds-avatar__avatar-outer">
        {ring}
        {renderAvatar(title ? title.charAt(0).toUpperCase() : children)}
      </span>
    </span>
  );
};

RdsAvatar.displayName = 'RdsAvatar';
export default RdsAvatar;
