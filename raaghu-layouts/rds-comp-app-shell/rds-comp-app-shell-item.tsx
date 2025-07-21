import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface RdsCompAppShellItemProps extends Omit<BoxProps, 'position'> {
  shellPosition?: 'topNav' | 'sideNav' | 'content';
  children?: React.ReactNode;
}

const RdsCompAppShellItem: React.FC<RdsCompAppShellItemProps> = ({
  shellPosition = 'content',
  children,
  className,
  ...props
}) => {
  const itemClass = `rds-app-shell-item rds-app-shell-item--${shellPosition} ${className || ''}`;

  return (
    <Box className={itemClass} {...props}>
      {children}
    </Box>
  );
};

export default RdsCompAppShellItem;
