import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar as MuiToolbar,
  type AppBarProps,
  IconButton,
  Box,
} from '@mui/material';
import { Dehaze as DehazeIcon } from '@mui/icons-material';
import { useRdsTokens } from '../shared/hooks/useRdsTokens';
import {
  toolbarHeights,
  getAppBarColorClass,
  getAppBarVariantClass,
  useAppBarScreenSize,
  AppBarSearch,
  AppBarInlineTabs,
  AppBarOverflowDrawer,
  AppBarBottomNavigation,
  AppBarUserActions,
} from './rds-app-bar.helpers';
import './rds-app-bar.scss';

export type RdsAppBarSize = 'small' | 'medium' | 'large';
export interface RdsAppBarProps extends AppBarProps {
  title?: string;
  rightActions?: React.ReactNode;
  centerContent?: React.ReactNode;
  size?: RdsAppBarSize;
  logo?: React.ReactNode;
  showLogo?: boolean;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  actions?: React.ReactNode;
  userName?: string;
  userEmail?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  tabs?: Array<string | { label: string; [key: string]: unknown }>;
  tabValue?: number;
  onTabChange?: (value: number) => void;
  subHeader?: React.ReactNode;
  showSearch?: boolean;
  variantStyle?: string;
  overflowContent?: React.ReactNode;
}

const RdsAppBar = ({
  title,
  rightActions,
  centerContent,
  children,
  size = 'medium',
  logo,
  showLogo = true,
  onMenuClick,
  showMenuButton = false,
  actions,
  userName,
  userEmail,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  tabs,
  tabValue,
  onTabChange,
  subHeader,
  showSearch = true,
  variantStyle,
  overflowContent,
  ...props
}: RdsAppBarProps) => {
  const tokens = useRdsTokens();
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  const [localBottomActive, setLocalBottomActive] = React.useState(0);
  const isSmallScreen = useAppBarScreenSize(variantStyle);

  const colorClass = getAppBarColorClass(props.color);
  const variantClass = getAppBarVariantClass(variantStyle);
  const hasInlineTabs =
    Array.isArray(tabs) && typeof tabValue === 'number' && typeof onTabChange === 'function';
  const hasSearch =
    showSearch && typeof searchValue === 'string' && typeof onSearchChange === 'function';

  return (
    <MuiAppBar
      {...props}
      className={[
        `rds-app-bar--size-${size}`,
        `rds-header${colorClass}${variantClass}${props.className ? ' ' + props.className : ''}`,
      ]
        .filter(Boolean)
        .join(' ')}
      color={props.color === 'transparent' ? 'transparent' : 'default'}
      elevation={0}
    >
      <MuiToolbar
        className={`rds-app-bar--size-${size}`}
        style={{
          minHeight: toolbarHeights[size],
          height: toolbarHeights[size],
          padding: 0,
        }}
      >
        <Box className="rds-header__toolbar" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {showMenuButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{ mr: tokens.space(2) }}
            >
              <DehazeIcon />
            </IconButton>
          )}

          {showLogo && logo && <span className="rds-header__logo">{logo}</span>}
          {centerContent && <span className="rds-header__center-content">{centerContent}</span>}
          {hasInlineTabs && (
            <AppBarInlineTabs tabs={tabs!} tabValue={tabValue!} onTabChange={onTabChange!} />
          )}
          <span className="rds-header__title">{title}</span>

          {hasSearch && (
            <AppBarSearch
              searchValue={searchValue!}
              searchPlaceholder={searchPlaceholder}
              onSearchChange={onSearchChange!}
            />
          )}
          {rightActions && <span className="rds-header__right-actions">{rightActions}</span>}

          <AppBarUserActions userName={userName} userEmail={userEmail} actions={actions} />
          {children}

          <AppBarOverflowDrawer
            open={overflowOpen}
            onOpen={() => setOverflowOpen(true)}
            onClose={() => setOverflowOpen(false)}
            overflowContent={overflowContent}
            drawerWidth={tokens.space(40)}
            isSmallScreen={isSmallScreen}
          />

          <AppBarBottomNavigation
            isSmallScreen={isSmallScreen}
            variantStyle={variantStyle}
            tabs={tabs}
            tabValue={tabValue}
            onTabChange={onTabChange}
            overflowContent={overflowContent}
            localBottomActive={localBottomActive}
            setLocalBottomActive={setLocalBottomActive}
            tokens={tokens}
          />
        </Box>
      </MuiToolbar>

      {subHeader && <div className="rds-header__sub-header">{subHeader}</div>}
    </MuiAppBar>
  );
};
RdsAppBar.displayName = 'RdsAppBar';
export default RdsAppBar;
