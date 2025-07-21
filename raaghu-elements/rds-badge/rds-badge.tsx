import React from 'react';
import { Badge as MuiBadge, BadgeProps } from '@mui/material';

export interface RdsBadgeProps extends BadgeProps {
  children: React.ReactNode;
  count?: number;
  showZero?: boolean;
  max?: number;
}

const RdsBadge: React.FC<RdsBadgeProps> = ({
  children,
  count,
  showZero = false,
  max = 99,
  badgeContent,
  ...props
}) => {
  const content = count !== undefined ? count : badgeContent;
  
  return (
    <MuiBadge
      badgeContent={content}
      showZero={showZero}
      max={max}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};

export default RdsBadge;
