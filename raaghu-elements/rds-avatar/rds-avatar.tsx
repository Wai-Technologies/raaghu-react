import React from 'react';
import './rds-avatar.scss';
import { type AvatarProps } from '@mui/material';
import {
  getAvatarModifierClasses,
  StackingAvatarsView,
  NamedAvatarView,
  SingleAvatarView,
} from './rds-avatar.helpers';

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
    colorVariant,
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
      className={getAvatarModifierClasses(size, activityRing, activeDotTop, activeDotBottom, colorVariant)}
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
