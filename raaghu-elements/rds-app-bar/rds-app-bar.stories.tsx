import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { ProfileMenu } from './ProfileMenu';
import RdsAppBar from './rds-app-bar';
import { Button, IconButton, Avatar, Badge, Box, Divider, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { Dehaze as MenuIcon, Home, Search, Notifications, AccountCircle, Brightness5, Brightness2, Brightness4, Logout, Security, Close } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import RdsButton from '../rds-button/rds-button';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import './rds-app-bar.scss';
import { TextField } from '@mui/material';
import { useRaaghuLogoSrc } from '../shared/hooks/useRaaghuLogoSrc';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8.93C17 8.76 16.97 8.59 16.9 8.43C16.83 8.27 16.73 8.13 16.61 8.02L9 1L1.39 8.02C1.27 8.13 1.17 8.27 1.1 8.43C1.03 8.59 1 8.76 1 8.93V15.77C1 16.1 1.13 16.41 1.36 16.64C1.59 16.87 1.9 17 2.23 17H15.77C16.1 17 16.41 16.87 16.64 16.64C16.87 16.41 17 16.1 17 15.77V8.93Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CompassIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 17C13.42 17 17 13.42 17 9C17 4.58 13.42 1 9 1C4.58 1 1 4.58 1 9C1 13.42 4.58 17 9 17Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.62 13.31L12.08 5.92L4.69 8.38L7.77 10.23L9.62 13.31Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 5.31H17M5.31 5.31L7.15 1M10.85 5.31L12.69 1M2.23 1H15.77C16.45 1 17 1.55 17 2.23V15.77C17 16.45 16.45 17 15.77 17H2.23C1.55 17 1 16.45 1 15.77V2.23C1 1.55 1.55 1 2.23 1ZM7.14 13.38V8.67C7.15 8.6 7.17 8.52 7.2 8.46C7.24 8.4 7.29 8.35 7.35 8.31C7.42 8.27 7.49 8.25 7.56 8.25C7.63 8.24 7.7 8.26 7.77 8.29L11.86 10.64C11.92 10.68 11.98 10.73 12.02 10.8C12.05 10.87 12.07 10.95 12.07 11.02C12.07 11.1 12.05 11.18 12.02 11.25C11.98 11.31 11.92 11.37 11.86 11.41L7.77 13.78C7.7 13.8 7.63 13.81 7.56 13.81C7.49 13.8 7.42 13.78 7.36 13.74C7.29 13.7 7.24 13.65 7.21 13.59C7.17 13.52 7.15 13.45 7.14 13.38Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.01 17L2.22 9.63C-1.47 5.21 3.95 -3.28 9.01 3.59C14.06 -3.28 19.46 5.24 15.8 9.63L9.01 17Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.15 15.57C7.26 15.98 7.5 16.34 7.83 16.6C8.17 16.86 8.58 17 9 17C9.42 17 9.83 16.86 10.17 16.6C10.5 16.34 10.74 15.98 10.85 15.57M9 1C10.4 1 11.74 1.56 12.73 2.55C13.72 3.54 14.28 4.88 14.28 6.28C14.28 12.16 16.42 13.32 17 13.32H1C1.59 13.32 3.72 12.15 3.72 6.28C3.72 4.88 4.28 3.54 5.27 2.55C6.26 1.56 7.6 1 9 1Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CameraIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.35 3.77L15.37 6.69M1.39 8.05C3.51 6.05 4.78 4.79 8.22 1.66C8.54 1.36 8.79 1.12 8.92 1C9.04 1.11 9.2 1.26 9.4 1.44C9.5 1.53 9.57 1.59 9.59 1.61C10.17 2.13 11.75 3.54 12.65 4.35C14.14 5.71 15.17 6.67 16.55 7.94C16.68 8.06 16.78 8.2 16.85 8.35C16.92 8.51 16.95 8.68 16.95 8.85L17 15.67C17 15.83 16.97 15.99 16.91 16.14C16.85 16.29 16.76 16.43 16.65 16.54C16.53 16.65 16.4 16.75 16.25 16.81C16.1 16.87 15.94 16.9 15.78 16.91L6.77 16.97C6.77 16.94 6.78 16.91 6.78 16.88L6.73 10.54C6.73 10.35 6.7 10.15 6.63 9.97C6.55 9.79 6.44 9.63 6.31 9.49C6.17 9.35 6.01 9.24 5.83 9.17C5.65 9.09 5.45 9.06 5.26 9.06C5.06 9.06 4.87 9.1 4.69 9.18C4.51 9.25 4.35 9.36 4.22 9.5C4.08 9.64 3.98 9.81 3.91 9.99C3.84 10.17 3.8 10.37 3.81 10.56L3.85 16.9C3.85 16.93 3.86 16.96 3.86 16.99L2.29 17C2.13 17 1.97 16.97 1.82 16.91C1.67 16.85 1.53 16.76 1.42 16.65C1.3 16.53 1.21 16.4 1.15 16.25C1.09 16.1 1.05 15.94 1.05 15.78L1 8.96C1 8.79 1.03 8.62 1.1 8.46C1.16 8.31 1.26 8.16 1.39 8.05L1.39 8.05ZM10.25 11.63L13.3 11.61L13.32 14.66L10.27 14.68L10.25 11.63Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ActivitiesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 5.23H18.9C19.33 5.23 19.73 5.36 20.03 5.59C20.33 5.82 20.5 6.14 20.5 6.46V18.77C20.5 19.1 20.33 19.41 20.03 19.64C19.73 19.87 19.33 20 18.9 20H6.1C5.68 20 5.27 19.87 4.97 19.64C4.67 19.41 4.5 19.1 4.5 18.77V6.46C4.5 6.14 4.67 5.82 4.97 5.59C5.27 5.36 5.68 5.23 6.1 5.23H8.5M16.5 5.23C16.5 4.55 15.78 4 14.9 4H10.1C9.22 4 8.5 4.55 8.5 5.23M16.5 5.23L16.5 5.85C16.5 6.53 15.78 7.08 14.9 7.08H10.1C9.22 7.08 8.5 6.53 8.5 5.85L8.5 5.23M8.5 10.15H16.5M8.5 13.23H16.5M8.5 16.31H16.5" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DirectoryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.2 4.09V1.62C4.2 1.45 4.26 1.3 4.38 1.18C4.49 1.07 4.65 1 4.81 1H15.27C15.43 1 15.59 1.07 15.7 1.18C15.82 1.3 15.88 1.45 15.88 1.62V6.56M9.12 4.09H12.81M1.01 15.89L0.51 7.25C0.49 7.16 0.5 7.07 0.53 6.99C0.56 6.9 0.6 6.83 0.66 6.76C0.72 6.7 0.79 6.64 0.87 6.61C0.95 6.57 1.03 6.55 1.12 6.56H6.79C6.93 6.56 7.06 6.6 7.17 6.69C7.28 6.77 7.36 6.89 7.39 7.02L7.89 9.02H15.88C15.97 9.02 16.05 9.04 16.13 9.08C16.21 9.11 16.28 9.16 16.34 9.22C16.4 9.29 16.44 9.36 16.47 9.44C16.49 9.52 16.51 9.61 16.5 9.69L16.02 15.86C15.99 16.17 15.85 16.46 15.63 16.67C15.4 16.88 15.1 17 14.79 17H2.24C1.93 17 1.64 16.89 1.41 16.68C1.18 16.48 1.04 16.19 1.01 15.89Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.73 9.62H0.5V17H5.73M5.73 17V5.92H11.27M5.73 17L11.27 17M11.27 17L16.5 17V1H11.27V17Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M1.73 3.46C1.41 3.46 1.09 3.59 0.86 3.82C0.63 4.05 0.5 4.37 0.5 4.69V15.77C0.5 16.1 0.63 16.41 0.86 16.64C1.09 16.87 1.41 17 1.73 17H15.27C15.6 17 15.91 16.87 16.14 16.64C16.37 16.41 16.5 16.1 16.5 15.77V4.69C16.5 4.37 16.37 4.05 16.14 3.82C15.91 3.59 15.6 3.46 15.27 3.46H12.81M4.19 1V5.92M12.81 1V5.92M4.19 3.46H10.35M4.81 9.62C4.81 9.96 4.53 10.23 4.19 10.23C3.85 10.23 3.58 9.96 3.58 9.62C3.58 9.28 3.85 9 4.19 9C4.53 9 4.81 9.28 4.81 9.62ZM9.12 9.62C9.12 9.96 8.84 10.23 8.5 10.23C8.16 10.23 7.89 9.96 7.89 9.62C7.89 9.28 8.16 9 8.5 9C8.84 9 9.12 9.28 9.12 9.62ZM13.42 9.62C13.42 9.96 13.15 10.23 12.81 10.23C12.47 10.23 12.19 9.96 12.19 9.62C12.19 9.28 12.47 9 12.81 9C13.15 9 13.42 9.28 13.42 9.62ZM4.81 13.31C4.81 13.65 4.53 13.92 4.19 13.92C3.85 13.92 3.58 13.65 3.58 13.31C3.58 12.97 3.85 12.69 4.19 12.69C4.53 12.69 4.81 12.97 4.81 13.31Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoSearchTabsLeftActions = () => (
  <div className="rds-logo-search-tabs__left-actions">
    <HomeIcon />
    <CompassIcon />
    <VideoIcon />
    <HeartIcon />
    <BellIcon />
  </div>
);

const DashboardMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ fontWeight: 500 }}>Dashboard</div>
      <IconButton size="small" color="inherit" onClick={handleOpen} aria-label="theme">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M12 21v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 4.2l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 18.4l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M21 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem>
          <Brightness5 fontSize="small" style={{ marginRight: 8 }} />
          Light
        </MenuItem>
        <MenuItem>
          <Brightness2 fontSize="small" style={{ marginRight: 8 }} />
          Dark
        </MenuItem>
        <MenuItem>
          <Brightness4 fontSize="small" style={{ marginRight: 8 }} />
          Semi Dark
        </MenuItem>
      </Menu>
    </div>
  );
};

const ThemeMenuIcon = ({ showDropdown = true, onClick }: { showDropdown?: boolean; onClick?: (e: React.MouseEvent<HTMLElement>) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <>
      <IconButton
        size="small"
        color="inherit"
        onClick={(e) => {
          if (onClick) {
            onClick(e);
            return;
          }
          handleOpen(e);
        }}
        aria-label="theme"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M12 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M12 21v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 4.2l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 18.4l1.4 1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M1 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M21 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M4.2 19.8l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M18.4 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        {showDropdown ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : null}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem>
          <Brightness5 fontSize="small" style={{ marginRight: 8 }} />
          Light
        </MenuItem>
        <MenuItem>
          <Brightness2 fontSize="small" style={{ marginRight: 8 }} />
          Dark
        </MenuItem>
        <MenuItem>
          <Brightness4 fontSize="small" style={{ marginRight: 8 }} />
          Semi Dark
        </MenuItem>
      </Menu>
    </>
  );
};

const LanguageMenu = () => {
  const languages = [
    'العربية',
    'English (UK)',
    'English',
    'Čeština',
    'Magyar',
    'Français',
    'Finnish',
    'Italiano',
    'Português',
    'Hindi',
    'Русский',
    '繁體中文',
    'Türkçe',
    '简体中文',
    'Slovak',
    'Deutsch',
    'Español',
    'test',
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selected, setSelected] = React.useState('English (UK)');
  const open = Boolean(anchorEl);
  const menuHeightCss = 'calc(100vh - 120px)';
  const shortCode = React.useMemo(() => {
    if (!selected) return 'EN';
    if (selected.includes('English')) return 'EN';
    if (selected.includes('Türkçe')) return 'TR';
    if (selected.includes('Français')) return 'FR';
    if (selected.includes('Español')) return 'ES';
    if (selected === 'العربية') return 'AR';
    return selected.slice(0, 2).toUpperCase();
  }, [selected]);
  return (
    <>
      <Button className="rds-language-button" color="inherit" onClick={e => setAnchorEl(e.currentTarget)} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontWeight: 600 }}>{shortCode}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        slotProps={{ paper: { className: 'rds-language-menu-paper' } }}
        MenuListProps={{ className: 'rds-language-menu-list' }}
      >
        {languages.map(l => (
          <MenuItem key={l} onClick={() => setSelected(l)} style={{ width: '100%' }}>
            {l}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ChatBubbleIconSmall = () => (
  <IconButton size="small" color="inherit" aria-label="chat">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="15.5" cy="11.5" r="0.8" fill="currentColor" />
    </svg>
  </IconButton>
);

const AdminProfileMenu = ({ name = 'Admin User', email = 'admin@example.com', onLogout }: { name?: string; email?: string; onLogout?: () => void }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const avatarTextColor = theme?.palette?.mode === 'dark' ? theme.palette.common.white : undefined;
  return (
    <>
      <Button className="rds-admin-profile__button" color="inherit" onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, textTransform: 'none' }}>
        <Avatar sx={{ width: 32, height: 32, color: avatarTextColor }}>AU</Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>Hi, {name.toLowerCase()}</Typography>
          <Typography sx={{ fontSize: 11, color: 'inherit' }}>{email}</Typography>
        </Box>
        <svg className="rds-admin-profile__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 6 }} xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: 320 } } }}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setOpen(false)} aria-label="close">
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 80, height: 80, color: avatarTextColor }}>AU</Avatar>
            <Typography sx={{ fontWeight: 700, textTransform: 'lowercase' }}>{name}</Typography>
            <Typography sx={{ fontSize: 12, color: 'inherit' }}>{email}</Typography>
          </Box>

          <Divider />

          <Box sx={{ flex: 1, overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Linked Accounts" secondary="Manage linked accounts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Authority Delegation" secondary="Manage authority accounts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Security />
                  </ListItemIcon>
                  <ListItemText primary="My Account" secondary="Manage your account settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Notifications />
                  </ListItemIcon>
                  <ListItemText primary="Security Logs" secondary="See recent login attempts" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Personal Data" secondary="Change your account settings" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          <Box sx={{ p: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setOpen(false);
                if (onLogout) onLogout();
              }}
              startIcon={<Logout />}
            >
              LOGOUT
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};
const meta: Meta<typeof RdsAppBar> = {
  title: 'Elements/AppBar',
  component: RdsAppBar,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
    exclude: ['component', 'onMenuClick', 'actions', 'onSearchChange', 'leftActions', 'rightActions', 'centerContent', 'tabs', 'tabValue', 'onTabChange', 'subHeader', 'logo'],
  },
  },
  tags: ['autodocs', 'stable'],
  argTypes: ({
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the AppBar',
      defaultValue: 'medium',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the AppBar (used if centerContent is not provided)',
      defaultValue: 'App Title',
    },
    showMenuButton: {
      control: 'boolean',
      description: 'Whether to show the hamburger menu button',
    },
    showLogo: {
      control: 'boolean',
      description: 'Toggle to show or hide logo',
      defaultValue: true,
    },
    showSearch: {
      control: 'boolean',
      description: 'Show or hide the search bar',
      defaultValue: true,
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'transparent'],
      description: 'Color variant of the header',
    },
    variantStyle: {
      name: 'style',
      control: 'select',
      options: [
        'default',
        'withSearch',
        'headerDefault',
        'logoSearchActions',
        'LogoSearchTabs',
        'LogoTabsActions',
        'LogoSearchTabsActions',
        'LogoSearchTabsActionsSubHeader',
        'Minimal',
        'Transparent',
        'withLogo',
        'HeaderWithSearch',
        'withTabs',
        'withSubHeader',
        'WithNotificationBadge',
        'WithLogoAndTabs',
        'WithUserProfile',
        'withActions',
        'WithLoginButton',
        'WithMenuButton',
        'DashboardWithLang',
      ],
    },
    userName: {
      control: 'text',
      description: 'User name displayed in the profile menu',
      defaultValue: 'John Doe',
    },
    userEmail: {
      control: 'text',
      description: 'User email displayed in the profile menu',
      defaultValue: 'john.doe@example.com',
    }
  } as any),
};

export default meta;
type Story = StoryObj<typeof meta>;

const DynamicTemplate = (args: any) => {
  const logoSrc = useRaaghuLogoSrc();
  const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
  const [searchValue, setSearchValue] = React.useState(args.searchValue ?? '');
  const [selectedSubTab, setSelectedSubTab] = React.useState(0);
  const [activeMenuTab, setActiveMenuTab] = React.useState(0);

  const buildSubHeader = () => (
    <div className="rds-header__sub-header-layout">
      <div className="rds-header__sub-tabs">
        <Button
          variant="text"
          color={selectedSubTab === 0 ? 'primary' : 'inherit'}
          startIcon={<Home />}
          onClick={() => setSelectedSubTab(0)}
        >
          Dashboard
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 1 ? 'primary' : 'inherit'}
          startIcon={<ActivitiesIcon />}
          onClick={() => setSelectedSubTab(1)}
        >
          Activities
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 2 ? 'primary' : 'inherit'}
          startIcon={<DirectoryIcon />}
          onClick={() => setSelectedSubTab(2)}
        >
          Directory
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 3 ? 'primary' : 'inherit'}
          startIcon={<ProjectsIcon />}
          onClick={() => setSelectedSubTab(3)}
        >
          Projects
        </Button>
        <Button
          variant="text"
          color={selectedSubTab === 4 ? 'primary' : 'inherit'}
          startIcon={<CalendarIcon />}
          onClick={() => setSelectedSubTab(4)}
        >
          Calendar
        </Button>
      </div>
    </div>
  );

  const logoImg = (
    <img
      src={logoSrc}
      alt="Logo"
      className="rds-story-logo"
    />
  );

  const variantStyle = (args.variantStyle || 'default') as string;
  const normalized = variantStyle.toLowerCase();

  const normalizedShowLogo = typeof args.showLogo === 'boolean' ? args.showLogo : true;
  let config: any = {
    ...args,
    showLogo: normalizedShowLogo,
    tabValue,
    onTabChange: (v: number) => setTabValue(v),
    searchValue,
    onSearchChange: (v: string) => setSearchValue(v),
  };

  switch (normalized) {
    case 'default':
      config = {
        ...config,
        title: 'App Title',
  
        rightActions: <Button color="inherit">Login</Button>,
      };
      break;
    case 'withsearch':
      config = {
        ...config,
        title: 'My App',
        leftActions: (
          <IconButton edge="start" color="inherit">
            <Home />
          </IconButton>
        ),
        searchValue,
        searchPlaceholder: args.searchPlaceholder || 'Search…',
        rightActions: undefined,
      };
      break;
    case 'logosearchactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        searchPlaceholder: 'Search…',
        actions: (
          <>
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </>
        ),
      };
      break;
    case 'logosearchtabs':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: ' ',
        leftActions: <LogoSearchTabsLeftActions />,
        rightActions: <ProfileMenu name="John Doe" email="john.doe@example.com" />,
        userName: undefined,
        userShortName: undefined,
        userEmail: undefined,
        overflowContent: (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <HomeIcon />
            <CompassIcon />
            <VideoIcon />
            <HeartIcon />
            <BellIcon />
          </div>
        ),
      };
      break;
    case 'logotabsactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        actions: (
          <div className="rds-story-nav-actions">
            <span className="rds-story-nav-action"><HomeIcon /></span>
            <span className="rds-story-nav-action"><CompassIcon /></span>
            <span className="rds-story-nav-action"><VideoIcon /></span>
            <span className="rds-story-nav-action"><HeartIcon /></span>
            <span className="rds-story-nav-action"><BellIcon /></span>
            <ProfileMenu name={args.userName || 'John Doe'} email={args.userEmail || 'john.doe@example.com'} />
          </div>
        ),
        overflowContent: (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <HomeIcon />
            <CompassIcon />
            <VideoIcon />
            <HeartIcon />
            <BellIcon />
          </div>
        ),
      };
      break;
    case 'logosearchtabsactions':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        actions: (
          <div className="rds-story-nav-actions">
            <span className="rds-story-nav-action"><CameraIcon /></span>
            <span className="rds-story-nav-action"><CompassIcon /></span>
            <span className="rds-story-nav-action"><VideoIcon /></span>
            <span className="rds-story-nav-action"><HeartIcon /></span>
            <span className="rds-story-nav-action"><BellIcon /></span>
          </div>
        ),
        overflowContent: (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <CameraIcon />
            <CompassIcon />
            <VideoIcon />
            <HeartIcon />
            <BellIcon />
          </div>
        ),
      };
      break;
    case 'logosearchtabsactionssubheader':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        subHeader: buildSubHeader(),
      };
      break;
    case 'minimal':
      config = { ...config, logo: logoImg, showLogo: config.showLogo, title: '' };
      break;
    case 'transparent':
      config = { ...config, logo: logoImg, showLogo: config.showLogo, color: 'transparent', __wrapTransparent: true };
      break;
    case 'withlogo':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        actions: (
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
        ),
      };
      break;
    case 'headerwithsearch':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        searchPlaceholder: 'Search…',
        actions: (
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        ),
      };
      break;
    case 'withtabs':
      config = {
        ...config,
        title: '',
        logo: logoImg,
        showLogo: config.showLogo,
        tabs: ['HOME', 'NEWS', 'MARKETPLACE', 'JOBS'],
        overflowContent: (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="text" size="small">HOME</Button>
            <Button variant="text" size="small">NEWS</Button>
            <Button variant="text" size="small">MARKETPLACE</Button>
            <Button variant="text" size="small">JOBS</Button>
          </div>
        ),
      };
      break;
    case 'withsubheader':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        subHeader: buildSubHeader(),
        actions: (
          <>
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </>
        ),
      };
      break;
    case 'withnotificationbadge':
      config = {
        ...config,
        showLogo: config.showLogo,
        logo: logoImg,
        rightActions: (
          <div className="rds-appbar-tabs-container">
            <div className="rds-appbar-separator" />
            <div className="rds-appbar-tabs">
              <Button variant="text" color="inherit" className={`rds-appbar-tab-btn${activeMenuTab === 0 ? ' rds-appbar-tab-btn-active' : ''}`} onClick={() => setActiveMenuTab(0)}>Home</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className={`rds-appbar-tab-btn${activeMenuTab === 1 ? ' rds-appbar-tab-btn-active' : ''}`} onClick={() => setActiveMenuTab(1)}>News</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className={`rds-appbar-tab-btn${activeMenuTab === 2 ? ' rds-appbar-tab-btn-active' : ''}`} onClick={() => setActiveMenuTab(2)}>Marketplace</Button>
              <div className="rds-appbar-separator" />
              <Button variant="text" color="inherit" className={`rds-appbar-tab-btn${activeMenuTab === 3 ? ' rds-appbar-tab-btn-active' : ''}`} onClick={() => setActiveMenuTab(3)}>Jobs</Button>
            </div>
          </div>
        ),
        overflowContent: (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="text" color="inherit" size="small">Home</Button>
            <Button variant="text" color="inherit" size="small">News</Button>
            <Button variant="text" color="inherit" size="small">Marketplace</Button>
            <Button variant="text" color="inherit" size="small">Jobs</Button>
          </div>
        ),
      };
      break;
    case 'withlogoandtabs':
      config = {
        ...config,
        logo: logoImg,
        showLogo: config.showLogo,
        title: '',
        tabs: ['Dashboard', 'Projects', 'Calendar'],
        overflowContent: (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Button variant="text" size="small">Dashboard</Button>
            <Button variant="text" size="small">Projects</Button>
            <Button variant="text" size="small">Calendar</Button>
          </div>
        ),
      };
      break;
    case 'withuserprofile':
      config = {
        ...config,
        title: (
          <span className="rds-appbar-title">
            <span className="rds-appbar-title__user">User </span>Dashboard
          </span>
        ),
        showLogo: config.showLogo,
        
        rightActions: <ProfileMenu name={args.userName || 'John Doe'} email={args.userEmail || 'john.doe@example.com'} />,
        userName: undefined,
        userShortName: undefined,
        userEmail: undefined,
      };
      break;
    case 'withactions':
      config = {
        ...config,
        showLogo: config.showLogo,
       
        tabs: ['Community', 'Jobs', 'Resources'],
        logo: logoImg,
        leftActions: (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        ),
        centerContent: (
          <div className="rds-withactions-center-buttons">
            <span className="rds-withactions-findjobs-topnav">
              <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="filled" text="Find Jobs" textCase="uppercase" />
            </span>
            <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="transparent" text="Login" textCase="uppercase" />
            <RdsButton color="primary" layout="text-only" shape="rectangle" size="medium" state="default" style="transparent" text="Employers" textCase="uppercase" />
          </div>
        ),
        
        showSearch: false,
        searchValue: undefined,
        onSearchChange: undefined,
        overflowContent: (
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <span className="rds-withactions-findjobs-mobile">
              <RdsButton color="primary" layout="text-only" shape="rectangle" size="small" state="default" style="filled" text="Find Jobs" textCase="uppercase" />
            </span>
            <Button variant="text" size="small">Community</Button>
            <Button variant="text" size="small">Jobs</Button>
            <Button variant="text" size="small">Resources</Button>
          </div>
        ),
      };
      break;
    case 'withloginbutton':
      config = {
        ...config,
        title: 'Public Site',
        showLogo: config.showLogo,
        actions: <Button color="inherit">Login</Button>,
      };
      break;
    case 'withmenubutton':
      config = {
        ...config,
      
        logo: (
          <span className="rds-appbar-logo-group">
            <svg width="35" height="35" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_20819_18212)">
                <rect x="1" width="43.44" height="44" rx="21.72" fill="#2E43FF" />
                <path fillRule="evenodd" clipRule="evenodd" d="M13.64 27.5H16.13C16.74 27.5 17.31 27.29 17.77 26.93C18.07 26.7 18.32 26.4 18.5 26.06C18.52 26.04 18.53 26.01 18.54 25.98L20.88 21.41L20.9 21.37L22.6 18.06C22.6 18.05 22.6 18.04 22.61 18.02L22.66 17.92C22.92 17.45 23.31 17.06 23.79 16.81C24.16 16.61 24.58 16.5 25.03 16.5H22.55C21.93 16.5 21.36 16.71 20.9 17.07C20.6 17.3 20.35 17.6 20.17 17.94L17.79 22.59L17.77 22.63L16.02 26.06C15.76 26.54 15.36 26.94 14.88 27.19C14.51 27.39 14.09 27.5 13.64 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M22.55 27.5H25.04C25.66 27.5 26.23 27.29 26.68 26.93C26.99 26.7 27.24 26.4 27.42 26.06C27.43 26.04 27.45 26.01 27.46 25.98L29.79 21.41L29.82 21.37L31.51 18.06C31.52 18.05 31.52 18.04 31.53 18.02L31.58 17.92C31.84 17.45 32.23 17.06 32.7 16.81C33.08 16.61 33.5 16.5 33.95 16.5H31.46C30.84 16.5 30.27 16.71 29.82 17.07C29.52 17.3 29.27 17.6 29.08 17.94L26.71 22.59L26.68 22.63L24.93 26.06C24.67 26.54 24.28 26.94 23.8 27.19C23.43 27.39 23 27.5 22.55 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M31.31 27.5H33.8C34.41 27.5 34.98 27.29 35.44 26.94C35.74 26.71 35.99 26.41 36.17 26.07C36.19 26.05 38.28 21.88 38.28 21.88C38.28 21.87 38.35 21.74 38.35 21.74C38.6 21.27 39 20.89 39.47 20.64C39.84 20.44 40.27 20.33 40.72 20.33H38.23C37.61 20.33 37.04 20.54 36.58 20.89C36.28 21.13 36.03 21.42 35.85 21.76L33.68 26.07C33.43 26.55 33.03 26.94 32.55 27.19C32.18 27.39 31.75 27.5 31.31 27.5Z" fill="white" />
                <path fillRule="evenodd" clipRule="evenodd" d="M16.12 27.5H13.63C13.01 27.5 12.44 27.29 11.99 26.93C11.69 26.7 11.43 26.4 11.25 26.06C11.24 26.04 11.22 26.01 11.21 25.98L8.88 21.41L8.85 21.37L7.16 18.06C7.16 18.05 7.15 18.04 7.14 18.02L7.09 17.92C6.83 17.45 6.44 17.06 5.97 16.81C5.6 16.61 5.17 16.5 4.72 16.5H7.21C7.83 16.5 8.4 16.71 8.85 17.07C9.15 17.3 9.4 17.6 9.59 17.94L11.96 22.59L11.99 22.63L13.74 26.06C14 26.54 14.39 26.94 14.87 27.19C15.24 27.39 15.67 27.5 16.12 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M25.03 27.5H22.54C21.93 27.5 21.36 27.29 20.9 26.93C20.6 26.7 20.35 26.4 20.17 26.06C20.15 26.04 20.14 26.01 20.13 25.98L17.79 21.41L17.77 21.37L16.08 18.06C16.07 18.05 16.07 18.04 16.06 18.02L16.01 17.92C15.75 17.45 15.36 17.06 14.88 16.81C14.51 16.61 14.09 16.5 13.64 16.5H16.13C16.74 16.5 17.31 16.71 17.77 17.07C18.07 17.3 18.32 17.6 18.5 17.94L20.88 22.59L20.9 22.63L22.65 26.06C22.91 26.54 23.31 26.94 23.79 27.19C24.16 27.39 24.58 27.5 25.03 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M33.95 27.5H31.46C30.84 27.5 30.27 27.29 29.82 26.93C29.52 26.7 29.27 26.4 29.08 26.06C29.07 26.04 29.06 26.01 29.04 25.98L26.71 21.41L26.68 21.37L24.99 18.06C24.99 18.05 24.98 18.04 24.98 18.02L24.92 17.92C24.66 17.45 24.27 17.06 23.8 16.81C23.43 16.61 23 16.5 22.55 16.5H25.04C25.66 16.5 26.23 16.71 26.68 17.07C26.98 17.3 27.24 17.6 27.42 17.94L29.79 22.59L29.82 22.63L31.57 26.06C31.83 26.54 32.22 26.94 32.7 27.19C33.08 27.39 33.5 27.5 33.95 27.5Z" fill="#FF6600" />
                <path fillRule="evenodd" clipRule="evenodd" d="M39.31 19C38.63 19 38.07 18.44 38.07 17.75C38.07 17.06 38.63 16.5 39.31 16.5C40 16.5 40.55 17.06 40.55 17.75C40.55 18.44 40 19 39.31 19Z" fill="#FF6600" />
              </g>
              <defs>
                <clipPath id="clip0_20819_18212">
                  <rect x="1" width="43.44" height="44" rx="21.72" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="rds-appbar-logo-label">e-Signature</span>
          </span>
        ),
        showLogo: config.showLogo,
        tabs: ['Home', 'Agreement'],
        rightActions: (
          <div className="rds-appbar-actions-group">
            <span className="rds-appbar-badge">28 Days Left</span>
            <RdsButton style='filled' color="primary" sx={{ minWidth: 100, fontWeight: 500, fontSize: 14, boxShadow: 'none', textTransform: 'none' }}>
              View Plans
            </RdsButton>
            <IconButton color="default" sx={{ ml: 1 }} className="rds-withmenubutton-settings">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.45 2.8C11.82 3.21 12.34 3.46 12.89 3.49C13.44 3.52 13.99 3.33 14.4 2.96C14.45 2.91 14.5 2.86 14.55 2.8L15.56 1.69C15.85 1.37 16.23 1.15 16.65 1.05C17.08 0.96 17.52 0.99 17.92 1.16C18.32 1.32 18.65 1.61 18.88 1.98C19.12 2.34 19.23 2.77 19.2 3.2L19.12 4.69C19.11 4.96 19.15 5.24 19.24 5.5C19.33 5.76 19.48 5.99 19.66 6.2C19.84 6.4 20.07 6.57 20.31 6.68C20.56 6.8 20.83 6.87 21.1 6.88C21.17 6.89 21.24 6.89 21.31 6.88L22.8 6.81C23.23 6.79 23.66 6.9 24.03 7.13C24.39 7.36 24.67 7.7 24.84 8.1C25 8.5 25.04 8.94 24.95 9.36C24.85 9.78 24.63 10.16 24.31 10.45L23.2 11.45C22.79 11.82 22.54 12.34 22.51 12.9C22.48 13.45 22.68 13.99 23.05 14.4C23.1 14.46 23.15 14.51 23.2 14.55L24.31 15.56C24.63 15.85 24.85 16.23 24.95 16.65C25.04 17.07 25.01 17.51 24.84 17.91C24.68 18.31 24.39 18.65 24.03 18.88C23.66 19.11 23.23 19.22 22.8 19.2L21.31 19.12C20.76 19.09 20.21 19.29 19.8 19.66C19.39 20.03 19.14 20.55 19.12 21.1C19.11 21.17 19.11 21.24 19.12 21.32L19.19 22.81C19.21 23.24 19.1 23.66 18.87 24.02C18.64 24.39 18.3 24.67 17.9 24.83C17.51 25 17.07 25.03 16.65 24.94C16.23 24.85 15.85 24.63 15.56 24.31L14.56 23.2C14.19 22.79 13.67 22.54 13.11 22.51C12.56 22.49 12.02 22.68 11.61 23.05C11.55 23.1 11.5 23.15 11.45 23.2L10.45 24.31C10.16 24.63 9.78 24.85 9.36 24.95C8.94 25.04 8.5 25.01 8.1 24.84C7.7 24.68 7.36 24.39 7.13 24.03C6.9 23.66 6.79 23.24 6.81 22.81L6.89 21.31C6.91 20.76 6.72 20.22 6.35 19.81C5.98 19.4 5.46 19.15 4.91 19.12C4.84 19.12 4.77 19.12 4.7 19.12L3.2 19.2C2.77 19.22 2.34 19.11 1.98 18.88C1.61 18.65 1.33 18.31 1.16 17.92C0.99 17.52 0.96 17.08 1.05 16.66C1.14 16.24 1.37 15.85 1.69 15.56L2.8 14.56C3.21 14.19 3.46 13.67 3.48 13.12C3.51 12.56 3.32 12.02 2.95 11.61C2.9 11.56 2.85 11.51 2.8 11.46L1.69 10.45C1.37 10.16 1.15 9.78 1.05 9.36C0.96 8.94 0.99 8.5 1.16 8.1C1.32 7.7 1.61 7.37 1.97 7.13C2.34 6.9 2.76 6.79 3.19 6.81L4.69 6.89C5.24 6.92 5.78 6.73 6.19 6.36C6.61 5.99 6.85 5.47 6.88 4.92C6.88 4.84 6.88 4.77 6.88 4.69L6.81 3.2C6.79 2.77 6.9 2.34 7.14 1.98C7.37 1.61 7.7 1.33 8.1 1.17C8.5 1 8.94 0.96 9.36 1.06C9.78 1.15 10.16 1.37 10.45 1.69L11.45 2.8H11.45Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.45 13.01C7.45 14.1 7.78 15.18 8.39 16.09C9 17 9.86 17.71 10.88 18.13C11.89 18.55 13.01 18.66 14.08 18.45C15.16 18.24 16.15 17.71 16.92 16.93C17.7 16.15 18.23 15.17 18.44 14.09C18.66 13.01 18.55 11.9 18.13 10.88C17.71 9.87 17 9 16.08 8.39C15.17 7.78 14.1 7.46 13 7.46C11.53 7.46 10.12 8.04 9.08 9.08C8.04 10.12 7.45 11.54 7.45 13.01Z" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconButton>
            <ProfileMenu name={args.userName || 'Jane Doe'} email={args.userEmail || 'jane.doe@example.com'} />
          </div>
        ),
        userName: undefined,
        userShortName: undefined,
        userEmail: undefined,
        overflowContent: (
          <div style={{ display: 'flex', flexDirection: 'row', gap: 12, padding: 12, width: '100%', boxSizing: 'border-box', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Button variant="text" size="small">HOME</Button>
              <Button variant="text" size="small">AGREEMENT</Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="rds-appbar-badge">28 Days Left</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" color="primary" sx={{ minWidth: 90, fontWeight: 500, fontSize: 13, boxShadow: 'none', textTransform: 'none' }}>
                View Plans
              </Button>
            </div>
          </div>
        ),
      };
      break;
    case 'dashboardwithlang':
  config = {
    ...config,
    logo: logoImg,
    showLogo: config.showLogo,
  title: <span className="rds-dashboard-title" style={{ fontWeight: 500, fontSize: 16 }}>Dashboard</span>,
        rightActions: (
          <div className="rds-appbar-tabs-container" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="rds-dashboard-top-icons" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ThemeMenuIcon showDropdown={false} />
                <div className="rds-appbar-separator" />
                <ChatBubbleIconSmall />
                <div className="rds-appbar-separator" />
                <LanguageMenu />
                <div className="rds-appbar-separator" />
              </div>
              <AdminProfileMenu name={args.userName || 'Admin User'} email={args.userEmail || 'admin@example.com'} onLogout={() => {}} />
            </div>
          </div>
        ),
        overflowContent: (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', width: '100%', padding: '4px 0' }}>
            <div style={{ transform: 'scale(0.8)' }}>
              <ThemeMenuIcon showDropdown={false} />
            </div>
            <div style={{ transform: 'scale(0.8)' }}>
              <ChatBubbleIconSmall />
            </div>
            <div style={{ transform: 'scale(0.8)' }}>
              <LanguageMenu />
            </div>
          </div>
        ),
        userName: undefined,
        userShortName: undefined,
        userEmail: undefined,
      };
      break;
    default:
      config = {
        ...config,
        title: 'App Title',
        leftActions: (
          <IconButton edge="start" color="inherit">
            <MenuIcon />
          </IconButton>
        ),
        rightActions: <Button color="inherit">Login</Button>,
      };
  }

  const { __wrapTransparent, ...finalConfig } = config;
  
  finalConfig.onMenuClick = () => {
  };
  
  if (config.__wrapTransparent) {
    return (
      <div className="rds-story-min-height-container">
        <RdsAppBar {...finalConfig} />
      </div>
    );
  }

  return <RdsAppBar {...finalConfig} />;
};

export const Default: Story = {
  args: {
    size: 'medium',
    variantStyle: 'default',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
  },
  render: DynamicTemplate,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstChild).toBeTruthy();
  },
};
Default.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'userName', 'userEmail'] } };

export const WithSearch: Story = {
  args: {
    size: 'medium',
    variantStyle: 'withSearch',
    color: 'default',
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
  } as any,
  render: DynamicTemplate,
};
WithSearch.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'title'] } };

export const HeaderDefault: Story = {
  args: { variantStyle: 'headerDefault', color: 'default' } as any,
  render: DynamicTemplate,
};
HeaderDefault.parameters = { controls: { include: ['color', 'style', 'size', 'showMenuButton', 'title', 'showLogo'] } };

export const LogoSearchActions: Story = {
  args: { variantStyle: 'logoSearchActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchActions.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style'] } };

export const LogoSearchTabs: Story = {
  args: { variantStyle: 'LogoSearchTabs', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabs.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style', 'userName', 'userEmail'] } };

export const LogoTabsActions: Story = {
  args: { variantStyle: 'LogoTabsActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoTabsActions.parameters = { controls: { include: ['showLogo', 'title', 'color', 'size', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const LogoSearchTabsActions: Story = {
  args: { variantStyle: 'LogoSearchTabsActions', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabsActions.parameters = { controls: { include: ['showLogo', 'title', 'color', 'size', 'showMenuButton', 'style'] } };

export const LogoSearchTabsActionsSubHeader: Story = {
  args: { variantStyle: 'LogoSearchTabsActionsSubHeader', color: 'default' } as any,
  render: DynamicTemplate,
};
LogoSearchTabsActionsSubHeader.parameters = { controls: { include: ['showLogo', 'title', 'searchPlaceholder', 'color', 'size', 'showMenuButton', 'showSearch', 'style'] } };

export const Minimal: Story = { args: { variantStyle: 'Minimal', color: 'default' } as any, render: DynamicTemplate };
Minimal.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };

export const Transparent: Story = {
  args: { variantStyle: 'Transparent', color: 'transparent' } as any,
  parameters: { backgrounds: { default: 'transparent' } },
  render: DynamicTemplate,
};
Transparent.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };

export const WithLogo: Story = { args: { variantStyle: 'withLogo', color: 'default' } as any, render: DynamicTemplate };
WithLogo.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };

export const HeaderWithSearch: Story = { args: { variantStyle: 'HeaderWithSearch', color: 'default' } as any, render: DynamicTemplate };
HeaderWithSearch.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'searchPlaceholder', 'showSearch', 'showMenuButton', 'style'] } };

export const WithTabs: Story = { args: { variantStyle: 'withTabs', color: 'default', userName: 'John Doe', userEmail: 'john.doe@example.com' } as any, render: DynamicTemplate };
WithTabs.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const WithSubHeader: Story = { args: { variantStyle: 'withSubHeader', color: 'default' } as any, render: DynamicTemplate };
WithSubHeader.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style'] } };

export const WithNotificationBadge: Story = { args: { variantStyle: 'WithNotificationBadge', color: 'default', userName: 'John Doe', userEmail: 'john.doe@example.com' } as any, render: DynamicTemplate };
WithNotificationBadge.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const WithLogoAndTabs: Story = { args: { variantStyle: 'WithLogoAndTabs', color: 'default', userName: 'John Doe', userEmail: 'john.doe@example.com' } as any, render: DynamicTemplate };
WithLogoAndTabs.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const WithUserProfile: Story = { args: { variantStyle: 'WithUserProfile', color: 'default' } as any, render: DynamicTemplate };
WithUserProfile.parameters = { controls: { include: ['title', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const WithActions: Story = { args: { variantStyle: 'withActions', color: 'default', userName: 'John Doe', userEmail: 'john.doe@example.com' } as any, render: DynamicTemplate };
WithActions.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const WithLoginButton: Story = { args: { variantStyle: 'WithLoginButton', color: 'default' } as any, render: DynamicTemplate };
WithLoginButton.parameters = { controls: { include: ['title', 'size', 'color', 'showMenuButton', 'style'] } };

export const WithMenuButton: Story = { args: { variantStyle: 'WithMenuButton', color: 'default' } as any, render: DynamicTemplate };
WithMenuButton.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };

export const DashboardWithLang: Story = { args: { variantStyle: 'dashboardWithLang', color: 'default', showSearch: false } as any, render: DynamicTemplate };
DashboardWithLang.parameters = { controls: { include: ['title', 'showLogo', 'size', 'color', 'showMenuButton', 'style', 'userName', 'userEmail'] } };


