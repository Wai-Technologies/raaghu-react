import React from 'react';
import './rds-avatar.scss';
import { type AvatarProps } from '@mui/material';
import {
  getAvatarModifierClasses,
  StackingAvatarsView,
  NamedAvatarView,
  SingleAvatarView,
} from './rds-avatar.helpers';
import { resolveDeprecatedProp, warnDeprecatedProp } from '../shared/utils/deprecation';
import { normalizePaletteColor } from '../shared/utils/palette-color';

type AvatarColor = 'primary' | 'success' | 'error' | 'danger' | 'warning' | 'light' | 'info' | 'secondary' | 'dark';

export interface RdsAvatarProps extends Omit<AvatarProps, 'color'> {
  /** Color of the activity ring and status dot. `'danger'` is deprecated; use `'error'`. */
  color?: AvatarColor;
  /** @deprecated Use `color`. `'danger'` is deprecated; use `'error'`. */
  colorVariant?: AvatarColor;
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

const RdsAvatar = ({
  color,
  colorVariant,
  title: titleProp,
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
  const title = typeof titleProp === 'string' ? titleProp : undefined;
  const paletteColor = resolveDeprecatedProp(color, colorVariant, 'RdsAvatar', 'colorVariant', '`color`') ?? 'primary';
  if (paletteColor === 'danger' || color === 'danger' || colorVariant === 'danger') {
    warnDeprecatedProp('RdsAvatar', 'color="danger"', '`color: "error"`');
  }
  const resolvedColorVariant = normalizePaletteColor(paletteColor) ?? 'primary';

  if (displayStyle === 'stacking' && avatars && avatars.length > 0) {
    return (
      <StackingAvatarsView
        avatars={avatars}
        size={size}
        maxVisibleAvatars={maxVisibleAvatars}
        showRemainingCount={showRemainingCount}
      />
    );
  }

  const avatarProps = props;
  const modifierClasses = getAvatarModifierClasses(
    size,
    activityRing,
    activeDotTop,
    activeDotBottom,
    resolvedColorVariant,
    displayStyle === 'with-name' || displayStyle === 'name-bottom' ? displayStyle : undefined
  );

  if (displayStyle === 'with-name') {
    return (
      <NamedAvatarView
        displayStyle="with-name"
        className={modifierClasses}
        size={size}
        sx={sx}
        activityRing={activityRing}
        activeDotTop={activeDotTop}
        activeDotBottom={activeDotBottom}
        avatarProps={avatarProps}
        title={title}
        subText={subText}
        showName={showName}
        showDesignation={showDesignation}
        children={children}
      />
    );
  }

  if (displayStyle === 'name-bottom') {
    return (
      <NamedAvatarView
        displayStyle="name-bottom"
        className={modifierClasses}
        size={size}
        sx={sx}
        activityRing={activityRing}
        activeDotTop={activeDotTop}
        activeDotBottom={activeDotBottom}
        avatarProps={avatarProps}
        title={title}
        subText={subText}
        showName={showName}
        showDesignation={showDesignation}
        children={children}
      />
    );
  }

  return (
    <SingleAvatarView
      className={getAvatarModifierClasses(size, activityRing, activeDotTop, activeDotBottom, resolvedColorVariant)}
      size={size}
      sx={sx}
      activityRing={activityRing}
      activeDotTop={activeDotTop}
      activeDotBottom={activeDotBottom}
      avatarProps={avatarProps}
      title={title}
      children={children}
    />
  );
};

RdsAvatar.displayName = 'RdsAvatar';
export default RdsAvatar;
