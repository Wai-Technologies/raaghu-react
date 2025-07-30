import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsHeader from './rds-header';
import { Button, IconButton, Avatar, Badge, Menu, Box, MenuItem } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const meta: Meta<typeof RdsHeader> = {
  title: 'Elements/Header',
  component: RdsHeader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed in the header',
    },
    showMenuButton: {
      control: 'boolean',
      description: 'Whether to show the hamburger menu button',
    },
    position: {
      control: 'select',
      options: ['fixed', 'absolute', 'sticky', 'static', 'relative'],
      description: 'Position of the header',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'transparent'],
      description: 'Color variant of the header',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'My Application',
  },
};
// ProfileMenu component for profile dropdown UI
interface ProfileMenuProps {
  name: string;
  shortName: string;
  email: string;
}
const ProfileMenu = ({ name, shortName, email }: ProfileMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        size="small"
        sx={{ ml: 1, pl: 0.5, pr: 1, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <Avatar sx={{ width: 32, height: 32, bgcolor: '#e0d7fa', color: '#7c4dff', fontWeight: 600 }}>{shortName}</Avatar>
        <span style={{
          marginLeft: 8,
          fontWeight: 600,
          fontSize: 15,
          color: '#3d2461',
          fontFamily: 'inherit',
          letterSpacing: 0.1,
          textTransform: 'none',
        }}>{name}</span>
        <svg style={{ marginLeft: 4 }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8L10 12L14 8" stroke="#7c4dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 260,
            borderRadius: 2,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
            p: 0,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 2, bgcolor: '#ede7f6', borderRadius: '8px 8px 0 0', mb: 1 }}>
          <Avatar sx={{ width: 44, height: 44, mr: 1.5, bgcolor: '#e0d7fa', color: '#7c4dff', fontWeight: 600 }}>{shortName}</Avatar>
          <Box>
            <Box sx={{ fontWeight: 700, fontSize: 16, color: '#3d2461', lineHeight: 1.2 }}>{name}</Box>
            <Box sx={{ fontSize: 13, color: '#7c4dff', fontWeight: 500 }}>{email}</Box>
          </Box>
        </Box>
        <MenuItem onClick={handleClose} sx={{ py: 1.2, fontSize: 15 }}>My Profile</MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 1.2, fontSize: 15 }}>Theme</MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 1.2, fontSize: 15 }}>Setting</MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 1.2, fontSize: 15 }}>Help</MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 1.2, fontSize: 15, borderRadius: '0 0 8px 8px' }}>Logout</MenuItem>
      </Menu>
    </>
  );
};
export const LogoSearchActions: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <IconButton color="inherit"><AccountCircle /></IconButton>
      </>
    ),
    onSearchChange: () => {},
  },
  render: (args) => (
    <RdsHeader {...args} onSearchChange={v => { args.searchValue = v; }} />
  ),
};

export const LogoSearchTabs: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'Jobs', 'Marketplace'],
    tabValue: 0,
    onSearchChange: () => {},
    onTabChange: () => {},
  },
  render: (args) => (
    <RdsHeader {...args} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
  ),
};

export const LogoTabsActions: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    tabs: ['Dashboard', 'Projects', 'Calendar'],
    tabValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <Avatar sx={{ ml: 1 }}>JD</Avatar>
      </>
    ),
    onTabChange: () => {},
  },
  render: (args) => (
    <RdsHeader {...args} onTabChange={v => { args.tabValue = v; }} />
  ),
};

export const LogoSearchTabsActions: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'News', 'Marketplace', 'Jobs'],
    tabValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <IconButton color="inherit"><AccountCircle /></IconButton>
      </>
    ),
    onSearchChange: () => {},
    onTabChange: () => {},
  },
  render: (args) => (
    <RdsHeader {...args} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
  ),
};

export const LogoSearchTabsActionsSubHeader: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'News', 'Marketplace', 'Jobs'],
    tabValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <IconButton color="inherit"><AccountCircle /></IconButton>
      </>
    ),
    subHeader: <div>Sub-header content (filters, breadcrumbs, etc.)</div>,
    onSearchChange: () => {},
    onTabChange: () => {},
  },
  render: (args) => (
    <RdsHeader {...args} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
  ),
};

export const Minimal: Story = {
  args: {
    title: '',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
  },
};
export const Secondary: Story = {
  args: {
    color: 'secondary',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <Avatar sx={{ ml: 1 }}>JD</Avatar>
      </>
    ),
    tabs: ['Overview', 'Settings', 'Team'],
    tabValue: 0,
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <RdsHeader {...args} tabValue={tabValue} onTabChange={setTabValue} />
    );
  },
};

export const Transparent: Story = {
  args: {
    color: 'transparent',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    actions: (
      <IconButton color="inherit"><AccountCircle /></IconButton>
    ),
    tabs: ['Home', 'Explore', 'Profile'],
    tabValue: 0,
  },
  parameters: {
    backgrounds: { default: 'transparent' },
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <div style={{ minHeight: 100 }}>
        <RdsHeader {...args} tabValue={tabValue} onTabChange={setTabValue} />
      </div>
    );
  },
};
export const WithLogo: Story = {
  args: {
    title: '',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    actions: (
      <IconButton color="inherit">
        <Notifications />
      </IconButton>
    ),
  },
  render: (args) => (
    <RdsHeader {...args} />
  ),
};

export const WithSearch: Story = {
  args: {
    title: '',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    searchValue: '',
    searchPlaceholder: 'Search…',
    actions: (
      <IconButton color="inherit">
        <AccountCircle />
      </IconButton>
    ),
  },
  render: (args) => {
    const [searchValue, setSearchValue] = React.useState(args.searchValue ?? '');
    return (
      <RdsHeader
        {...args}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
    );
  },
};

export const WithTabs: Story = {
  args: {
    title: '',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    tabs: ['HOME', 'NEWS', 'MARKETPLACE', 'JOBS'],
    tabValue: 0,
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <RdsHeader {...args} tabValue={tabValue} onTabChange={setTabValue} />
    );
  },
};

export const WithSubHeader: Story = {
  args: {
    title: 'Header with SubHeader',
    subHeader: <div>Sub-header content (filters, breadcrumbs, etc.)</div>,
  },
};

export const WithNotificationBadge: Story = {
  args: {
    title: 'Header with Badge',
    actions: (
      <IconButton color="inherit">
        <Badge badgeContent={4} color="error">
          <Notifications />
        </Badge>
      </IconButton>
    ),
  },
};

export const WithLogoAndTabs: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    tabs: ['Dashboard', 'Projects', 'Calendar'],
    tabValue: 0,
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <RdsHeader {...args} tabValue={tabValue} onTabChange={setTabValue} />
    );
  },
};

export const WithUserProfile: Story = {
  args: {
    title: 'User Dashboard',
    showMenuButton: true,
    userName: 'John Doe',
    userShortName: 'JD',
    userEmail: 'Janedoe...'
  },
};

export const WithActions: Story = {
  args: {
    title: 'Application Title',
    showMenuButton: true,
    actions: (
      <>
        <IconButton color="inherit">
          <Search />
        </IconButton>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </>
    ),
  },
};

export const WithLoginButton: Story = {
  args: {
    title: 'Public Site',
    actions: (
      <Button color="inherit">
        Login
      </Button>
    ),
  },
};

export const WithMenuButton: Story = {
  args: {
    title: 'Dashboard',
    showMenuButton: true,
    onMenuClick: () => alert('Menu clicked!'),
  },
};