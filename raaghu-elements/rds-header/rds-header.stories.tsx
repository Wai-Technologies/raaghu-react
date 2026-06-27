import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsHeader from './rds-header';
import { Button, IconButton, Avatar, Badge, Menu, Box, MenuItem } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const meta: Meta<typeof RdsHeader> = {
  title: 'Elements/Header',
  component: RdsHeader,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
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
    color: 'default',
  },
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} />
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onTabChange={v => { args.tabValue = v; }} />
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabChange={v => { args.tabValue = v; }} />
  ),
};

export const Minimal: Story = {
  args: {
    title: '',
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    color: 'default',
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
        <RdsHeader {...args} color={args.color} tabValue={tabValue} onTabChange={setTabValue} />
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
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} />
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
    color: 'default',
  },
  render: (args) => {
    const [searchValue, setSearchValue] = React.useState(args.searchValue ?? '');
    return (
      <RdsHeader
        {...args}
        color={args.color}
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
    color: 'default',
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <RdsHeader {...args} color={args.color} tabValue={tabValue} onTabChange={setTabValue} />
    );
  },
};

export const WithSubHeader: Story = {
  args: {
    title: 'Header with SubHeader',
    subHeader: <div>Sub-header content (filters, breadcrumbs, etc.)</div>,
    color: 'default',
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
    color: 'default',
  },
};

export const WithLogoAndTabs: Story = {
  args: {
    logo: <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png" alt="Logo" style={{ height: 32 }} />,
    title: '',
    tabs: ['Dashboard', 'Projects', 'Calendar'],
    tabValue: 0,
    color: 'default',
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabValue ?? 0);
    return (
      <RdsHeader {...args} color={args.color} tabValue={tabValue} onTabChange={setTabValue} />
    );
  },
};

export const WithUserProfile: Story = {
  args: {
    title: 'User Dashboard',
    showMenuButton: true,
    userName: 'John Doe',
    userShortName: 'JD',
    userEmail: 'Janedoe...',
    color: 'default',
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
    color: 'default',
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
    color: 'default',
  },
};

export const WithMenuButton: Story = {
  args: {
    title: 'Dashboard',
    showMenuButton: true,
    onMenuClick: () => alert('Menu clicked!'),
    color: 'default',
  },
};