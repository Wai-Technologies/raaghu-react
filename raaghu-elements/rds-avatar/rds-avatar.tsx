import clsx from 'clsx';
import './rds-avatar.scss';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';
import type { HTMLAttributes, ReactNode } from 'react';
import { warnDeprecatedProp } from '../shared/utils/deprecation';

type AvatarColor = 'primary' | 'success' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';
const avatarColors: readonly string[] = ['primary', 'success', 'danger', 'warning', 'light', 'info', 'secondary', 'dark'];
type AvatarSize = 'smallest' | 'small' | 'medium' | 'large' | 'largest';

export interface RdsAvatarProps extends Omit<AvatarProps, 'component' | 'color'> {
  /** Color of the activity ring and status dot. Other strings are passed through to the root element, as before. */
  color?: AvatarColor | (string & {});
  /** @deprecated Use `color` instead. */
  colorVariant?: AvatarColor;
  /** Name shown beside/below the avatar; its initials fill the avatar. */
  name?: string;
  /** @deprecated Use `name` instead. */
  title?: string;
  /** Secondary text (e.g. designation) shown beside/below the avatar. */
  description?: string;
  /** @deprecated Use `description` instead. */
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
  /** Maximum avatars shown in stacking mode. */
  max?: number;
  /** @deprecated Use `max` instead. */
  maxVisibleAvatars?: number;
  activityRing?: boolean;
  /** Shows a status dot when `'online'`; `'offline'` shows none. */
  status?: 'online' | 'offline';
  /** Which corner(s) the status dot is shown on. Use `'both'` for top and bottom dots. */
  statusPosition?: 'top' | 'bottom' | 'both';
  /**
   * Show the top status dot. Can be combined with `activeDotBottom` to show both.
   * When `status` is set, prefer `statusPosition` (`'top' | 'bottom' | 'both'`).
   * @deprecated Prefer `status="online"` with `statusPosition`.
   */
  activeDotTop?: boolean;
  /**
   * Show the bottom status dot. Can be combined with `activeDotTop` to show both.
   * @deprecated Prefer `status="online"` with `statusPosition`.
   */
  activeDotBottom?: boolean;
  /** @deprecated Omit `name` to hide the name. */
  showName?: boolean;
  /** @deprecated Omit `description` to hide the designation. */
  showDesignation?: boolean;
  /** @deprecated Keep `max` at or above the avatar count to hide the +N badge. */
  showRemainingCount?: boolean;
  /** Props for named layout slots (avoids consumers piercing BEM internals). */
  slotProps?: {
    wrap?: HTMLAttributes<HTMLSpanElement>;
    info?: HTMLAttributes<HTMLDivElement>;
    designation?: HTMLAttributes<HTMLDivElement>;
  };
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
  color,
  colorVariant: colorVariantProp,
  name,
  title: titleProp,
  description,
  subText,
  size = 'medium',
  displayStyle = 'with-name',
  avatars,
  max,
  maxVisibleAvatars,
  children,
  sx,
  className,
  activityRing = false,
  status,
  statusPosition = 'bottom',
  activeDotTop: activeDotTopProp,
  activeDotBottom: activeDotBottomProp,
  showName = true,
  showDesignation = true,
  showRemainingCount = true,
  slotProps,
  ...props
}: RdsAvatarProps) => {
  const { className: wrapClassName, ...wrapSlotRest } = slotProps?.wrap ?? {};
  const { className: infoClassName, ...infoSlotRest } = slotProps?.info ?? {};
  const { className: designationClassName, ...designationSlotRest } = slotProps?.designation ?? {};
  if (colorVariantProp !== undefined) warnDeprecatedProp('RdsAvatar', 'colorVariant', '`color`');
  if (titleProp !== undefined) warnDeprecatedProp('RdsAvatar', 'title', '`name`');
  if (subText !== undefined) warnDeprecatedProp('RdsAvatar', 'subText', '`description`');
  if (maxVisibleAvatars !== undefined) warnDeprecatedProp('RdsAvatar', 'maxVisibleAvatars', '`max`');
  if (activeDotTopProp !== undefined) warnDeprecatedProp('RdsAvatar', 'activeDotTop', '`status` and `statusPosition`');
  if (activeDotBottomProp !== undefined) warnDeprecatedProp('RdsAvatar', 'activeDotBottom', '`status` and `statusPosition`');

  const isPaletteColor = color !== undefined && avatarColors.includes(color);
  const colorVariant = (isPaletteColor ? (color as AvatarColor) : colorVariantProp) ?? 'primary';
  const title = name ?? titleProp;
  const subTextResolved = description ?? subText;
  const maxResolved = max ?? maxVisibleAvatars ?? 3;
  const showDot = (position: 'top' | 'bottom', legacy?: boolean) => {
    if (status !== undefined) {
      if (status !== 'online') return false;
      return statusPosition === 'both' || statusPosition === position;
    }
    return !!legacy;
  };
  const activeDotTop = showDot('top', activeDotTopProp);
  const activeDotBottom = showDot('bottom', activeDotBottomProp);

  if (displayStyle === 'stacking' && avatars && avatars.length > 0) {
    const visibleAvatars = avatars.slice(0, maxResolved);
    const remainingCount = Math.max(0, avatars.length - maxResolved);
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
              zIndex: maxResolved + 1,
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

  const renderAvatar = (initials: ReactNode, ringInside = false) => (
    <span {...wrapSlotRest} className={clsx('rds-avatar__avatar-wrap', wrapClassName)}>
      {ringInside && ring}
      <MuiAvatar sx={[sizeStyles[size], ...toSxArray(sx)]} className={className} color={isPaletteColor ? undefined : color} {...props}>
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

        <div {...infoSlotRest} className={clsx('rds-avatar__info', infoClassName)}>
          {showName && title && <div className="rds-avatar__name" id='avatarname'>{title}</div>}
          {showDesignation && subTextResolved && (
            <div {...designationSlotRest} className={clsx('rds-avatar__designation', designationClassName)}>
              {subTextResolved}
            </div>
          )}
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
        <div {...infoSlotRest} className={clsx('rds-avatar__info', 'rds-avatar__info--center', infoClassName)}>
          {showName && title && <div className="rds-avatar__name">{title}</div>}
          {showDesignation && subTextResolved && (
            <div {...designationSlotRest} className={clsx('rds-avatar__designation', designationClassName)}>
              {subTextResolved}
            </div>
          )}
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
