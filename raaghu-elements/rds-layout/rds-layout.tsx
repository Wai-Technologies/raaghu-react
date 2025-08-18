import React from 'react';
import { Box, Container, ContainerProps } from '@mui/material';
import RdsHeader from '../rds-header/rds-header';

export interface RdsLayoutProps extends Omit<ContainerProps, 'children'> {
  children: React.ReactNode;
  header?: {
    title?: string;
    showMenuButton?: boolean;
    onMenuClick?: () => void;
    actions?: React.ReactNode;
  };
  showHeader?: boolean;
  headerHeight?: number;
  padding?: number;
}

const RdsLayout: React.FC<RdsLayoutProps> = ({
  children,
  header,
  showHeader = true,
  headerHeight = 64,
  padding = 3,
  maxWidth = 'lg',
  ...props
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showHeader && header && (
        <RdsHeader
          title={header.title}
          showMenuButton={header.showMenuButton}
          onMenuClick={header.onMenuClick}
          actions={header.actions}
        />
      )}
      <Box
        component="main"
        sx={{
          marginTop: showHeader ? `${headerHeight}px` : 0,
          flexGrow: 1,
          padding: padding,
        }}
      >
        <Container maxWidth={maxWidth} {...props}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
RdsLayout.displayName = 'RdsLayout';
export default RdsLayout;
