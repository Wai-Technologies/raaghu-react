import { type ReactNode } from 'react';
import { Box, Container, type ContainerProps, type SxProps, type Theme } from '@mui/material';
import RdsHeader from '../rds-header/rds-header';

/** Props for {@link RdsLayout}. Extra props are forwarded to the inner MUI `Container`. */
export interface RdsLayoutProps extends Omit<ContainerProps, 'children' | 'component'> {
  /** Page content, rendered inside the inner `Container`. */
  children: ReactNode;
  /** Config for the optional top `RdsHeader`. */
  header?: {
    title?: string;
    showMenuButton?: boolean;
    onMenuClick?: () => void;
    actions?: ReactNode;
  };
  /** Render the header (requires `header`). Also offsets the content by `headerHeight`. @default true */
  showHeader?: boolean;
  /** Header height in px, exposed as `--rds-header-height` and used as the content top margin. @default 64 */
  headerHeight?: number;
  /** Content padding in theme spacing units. @default 3 */
  padding?: number;
}

/** Page layout shell: optional header above a padded, max-width content area. */
const RdsLayout= ({
  children,
  header,
  showHeader = true,
  headerHeight = 64,
  padding = 3,
  maxWidth = 'lg',
  ...props
}:RdsLayoutProps) => {
  const rootSx: SxProps<Theme> = { display: 'flex', flexDirection: 'column', minHeight: '100vh', '--rds-header-height': `${headerHeight}px` };
  return (
    <Box sx={rootSx}>
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
          // Keep the CSS var for runtime theming, but set an explicit px
          // value here so tests and inline-style consumers receive a
          // concrete `margin-top` value.
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
