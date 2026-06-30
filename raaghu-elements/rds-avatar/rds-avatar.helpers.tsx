import React from 'react';
import { Avatar as MuiAvatar, type AvatarProps } from '@mui/material';

export const sizeStyles = {
  smallest: { width: 24, height: 24, fontSize: '0.5625rem' },
  small: { width: 32, height: 32, fontSize: '0.6875rem' },
  medium: { width: 40, height: 40, fontSize: '0.875rem' },
  large: { width: 48, height: 48, fontSize: '1.125rem' },
  largest: { width: 64, height: 64, fontSize: '1.3125rem' },
};

export const overflowFontSize: Record<string, string> = {
  smallest: '0.5rem',
  small: '0.6875rem',
  medium: '0.875rem',
  large: '1rem',
  largest: '1.125rem',
};

const overlapOffsets: Record<string, number> = {
  smallest: -12,
  small: -14,
  medium: -16,
  large: -20,
  largest: -26,
};

type AvatarSize = keyof typeof sizeStyles;

export function getAvatarModifierClasses(
  size: AvatarSize,
  activityRing: boolean,
  activeDotTop: boolean,
  activeDotBottom: boolean,
  colorVariant?: string,
  displayStyle?: string
): string {
  const base = displayStyle ? `rds-avatar rds-avatar--${displayStyle} rds-avatar--${size}` : 'rds-avatar';
  return `${base}${activityRing ? ' rds-avatar--with-ring' : ''}${activeDotTop ? ' rds-avatar--dot-top' : ''}${activeDotBottom ? ' rds-avatar--dot-bottom' : ''}${colorVariant ? ` rds-avatar--${colorVariant}` : ''}`;
}

export function getInitials(title?: string, children?: React.ReactNode): React.ReactNode {
  if (title) {
    return title.split(' ').map((n) => n[0]).join('').toUpperCase();
  }
  return children;
}

export interface AvatarCoreProps {
  size: AvatarSize;
  sx?: AvatarProps['sx'];
  activityRing: boolean;
  activeDotTop: boolean;
  activeDotBottom: boolean;
  avatarProps: AvatarProps;
  children?: React.ReactNode;
  title?: string;
  useFullInitials?: boolean;
}

export function AvatarCore({
  size,
  sx,
  activityRing,
  activeDotTop,
  activeDotBottom,
  avatarProps,
  children,
  title,
  useFullInitials = true,
}: AvatarCoreProps) {
  const avatarContent = useFullInitials
    ? getInitials(title, children)
    : title
      ? title.charAt(0).toUpperCase()
      : children;

  return (
    <>
      {activityRing && <span className="rds-avatar__ring" aria-hidden="true" />}
      <MuiAvatar sx={{ ...sizeStyles[size], ...sx }} {...avatarProps}>
        {avatarContent}
      </MuiAvatar>
      {activeDotTop && <span className="rds-avatar__dot rds-avatar__dot--top" aria-label="active status top" />}
      {activeDotBottom && (
        <span className="rds-avatar__dot rds-avatar__dot--bottom" aria-label="active status bottom" />
      )}
    </>
  );
}

export interface StackingAvatarsProps {
  avatars: Array<{ src?: string; title?: string; subText?: string; size?: AvatarSize }>;
  size: AvatarSize;
  maxVisibleAvatars: number;
  showRemainingCount: boolean;
}

export function StackingAvatarsView({
  avatars,
  size,
  maxVisibleAvatars,
  showRemainingCount,
}: StackingAvatarsProps) {
  const visibleAvatars = avatars.slice(0, maxVisibleAvatars);
  const remainingCount = Math.max(0, avatars.length - maxVisibleAvatars);
  const overlapOffset = overlapOffsets[size] ?? -22;
  const avatarSize = sizeStyles[size].width;
  const itemCount = visibleAvatars.length + (remainingCount > 0 && showRemainingCount ? 1 : 0);
  const stackWidth =
    itemCount > 0 ? avatarSize + Math.max(0, itemCount - 1) * (avatarSize + overlapOffset) : avatarSize;

  return (
    <div
      className={`rds-avatar rds-avatar--${size} rds-avatar__stacking avatar-container`}
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
          key={avatar.src ?? avatar.title ?? `avatar-${idx}`}
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

export interface NamedAvatarViewProps {
  displayStyle: 'with-name' | 'name-bottom';
  className: string;
  size: AvatarSize;
  sx?: AvatarProps['sx'];
  activityRing: boolean;
  activeDotTop: boolean;
  activeDotBottom: boolean;
  avatarProps: AvatarProps;
  title?: string;
  subText?: string;
  showName: boolean;
  showDesignation: boolean;
  children?: React.ReactNode;
}

export function NamedAvatarView({
  displayStyle,
  className,
  size,
  sx,
  activityRing,
  activeDotTop,
  activeDotBottom,
  avatarProps,
  title,
  subText,
  showName,
  showDesignation,
  children,
}: NamedAvatarViewProps) {
  const infoClass =
    displayStyle === 'name-bottom' ? 'rds-avatar__info rds-avatar__info--center' : 'rds-avatar__info';
  const wrapOuter = displayStyle === 'name-bottom';

  return (
    <div className={className}>
      {wrapOuter ? (
        <span className="rds-avatar__avatar-outer">
          <span className="rds-avatar__avatar-wrap">
            <AvatarCore
              size={size}
              sx={sx}
              activityRing={activityRing}
              activeDotTop={activeDotTop}
              activeDotBottom={activeDotBottom}
              avatarProps={avatarProps}
              title={title}
              children={children}
            />
          </span>
        </span>
      ) : (
        <span className="rds-avatar__avatar-wrap">
          <AvatarCore
            size={size}
            sx={sx}
            activityRing={activityRing}
            activeDotTop={activeDotTop}
            activeDotBottom={activeDotBottom}
            avatarProps={avatarProps}
            title={title}
            children={children}
          />
        </span>
      )}
      <div className={infoClass}>
        {showName && title && (
          <div className="rds-avatar__name" id={displayStyle === 'with-name' ? 'avatarname' : undefined}>
            {title}
          </div>
        )}
        {showDesignation && subText && <div className="rds-avatar__designation">{subText}</div>}
      </div>
    </div>
  );
}

export function SingleAvatarView({
  className,
  size,
  sx,
  activityRing,
  activeDotTop,
  activeDotBottom,
  avatarProps,
  title,
  children,
}: Omit<NamedAvatarViewProps, 'displayStyle' | 'subText' | 'showName' | 'showDesignation'>) {
  return (
    <span className={className}>
      <span className="rds-avatar__avatar-outer">
        <span className="rds-avatar__avatar-wrap">
          <AvatarCore
            size={size}
            sx={sx}
            activityRing={activityRing}
            activeDotTop={activeDotTop}
            activeDotBottom={activeDotBottom}
            avatarProps={avatarProps}
            title={title}
            children={children}
            useFullInitials={false}
          />
        </span>
      </span>
    </span>
  );
}
