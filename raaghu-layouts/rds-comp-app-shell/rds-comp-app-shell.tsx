import React from 'react';
import { Box, BoxProps } from '@mui/material';
import './rds-comp-app-shell.css';

export interface RdsCompAppShellProps extends BoxProps {
  topNav?: React.ReactNode;
  sideNav?: React.ReactNode;
  children?: React.ReactNode;
  layout?: 'default' | 'triPane' | 'minimal';
  sideNavCollapsed?: boolean;
  onSideNavToggle?: () => void;
}

const RdsCompAppShell: React.FC<RdsCompAppShellProps> = ({
  topNav,
  sideNav,
  children,
  layout = 'default',
  sideNavCollapsed = false,
  onSideNavToggle,
  className,
  ...props
}) => {
  const shellClass = `rds-app-shell ${layout} ${sideNavCollapsed ? 'collapsed' : ''} ${className || ''}`;

  return (
    <Box className={shellClass} {...props}>
      {topNav && (
        <Box className="rds-app-shell__top-nav">
          {topNav}
        </Box>
      )}
      
      <Box className="rds-app-shell__body">
        {sideNav && (
          <Box className="rds-app-shell__side-nav">
            {sideNav}
          </Box>
        )}
        
        <Box className="rds-app-shell__content">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default RdsCompAppShell;
