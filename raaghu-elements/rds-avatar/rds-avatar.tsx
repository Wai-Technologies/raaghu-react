import React from 'react';
import { Avatar as MuiAvatar, AvatarProps } from '@mui/material';

export interface RdsAvatarProps extends AvatarProps {
  name?: string;
  size?: 'small' | 'medium' | 'large';
}

const RdsAvatar: React.FC<RdsAvatarProps> = ({
  name,
  size = 'medium',
  children,
  sx,
  ...props
}) => {
  const sizeStyles = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 56, height: 56 }
  };

  return (
    <MuiAvatar
      sx={{
        ...sizeStyles[size],
        ...sx
      }}
      {...props}
    >
      {name ? name.charAt(0).toUpperCase() : children}
    </MuiAvatar>
  );
};

export default RdsAvatar;
