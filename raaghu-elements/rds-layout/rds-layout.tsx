import React from 'react';
import { Box, Container, type ContainerProps } from '@mui/material';
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

const RdsLayout= React.forwardRef<HTMLDivElement, RdsLayoutProps>(function RdsLayout({
  children,
  header,
  showHeader = true,
  headerHeight = 64,
  padding = 3,
  maxWidth = 'lg',
  ...props
}, ref) {
  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', '--rds-header-height': `${headerHeight}px` } as any}>
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
        style={showHeader ? { marginTop: `${headerHeight}px` } : undefined}
      >
        <Container maxWidth={maxWidth} {...props}>
          {children}
        </Container>
      </Box>
    </Box>
  );
});
RdsLayout.displayName = 'RdsLayout';
export default RdsLayout;
