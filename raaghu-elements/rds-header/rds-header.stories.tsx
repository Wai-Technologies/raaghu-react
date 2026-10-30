import React from 'react';
import { expect } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsHeader from './rds-header';
import { RaaghuLogoImg } from '../shared/components/RaaghuLogoImg';
import { Button, IconButton, Avatar, Badge } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const headerThemeLogo = <RaaghuLogoImg alt="Logo" style={{ height: 32 }} />;

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
  play: async ({ canvasElement }) => {
    const h = canvasElement.querySelector('header, .MuiAppBar-root') || canvasElement.firstElementChild;
    expect(h).toBeTruthy();
  },
};
export const LogoSearchActions: Story = {
  args: {
    logo: headerThemeLogo,
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
    logo: headerThemeLogo,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'Jobs', 'Marketplace'],
    tabsValue: 0,
    onSearchChange: () => {},
    onTabsChange: () => {},
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabsChange={(_, v) => { args.tabsValue = v; }} />
  ),
};

export const LogoTabsActions: Story = {
  args: {
    logo: headerThemeLogo,
    title: '',
    tabs: ['Dashboard', 'Projects', 'Calendar'],
    tabsValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <Avatar sx={{ ml: 1 }}>JD</Avatar>
      </>
    ),
    onTabsChange: () => {},
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onTabsChange={(_, v) => { args.tabsValue = v; }} />
  ),
};

export const LogoSearchTabsActions: Story = {
  args: {
    logo: headerThemeLogo,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'News', 'Marketplace', 'Jobs'],
    tabsValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <IconButton color="inherit"><AccountCircle /></IconButton>
      </>
    ),
    onSearchChange: () => {},
    onTabsChange: () => {},
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabsChange={(_, v) => { args.tabsValue = v; }} />
  ),
};

export const LogoSearchTabsActionsSubHeader: Story = {
  args: {
    logo: headerThemeLogo,
    title: '',
    searchValue: '',
    searchPlaceholder: 'Search…',
    tabs: ['Home', 'News', 'Marketplace', 'Jobs'],
    tabsValue: 0,
    actions: (
      <>
        <IconButton color="inherit"><Notifications /></IconButton>
        <IconButton color="inherit"><AccountCircle /></IconButton>
      </>
    ),
    subHeader: <div>Sub-header content (filters, breadcrumbs, etc.)</div>,
    onSearchChange: () => {},
    onTabsChange: () => {},
    color: 'default',
  },
  render: (args) => (
    <RdsHeader {...args} color={args.color} onSearchChange={v => { args.searchValue = v; }} onTabsChange={(_, v) => { args.tabsValue = v; }} />
  ),
};

export const Minimal: Story = {
  args: {
    title: '',
    logo: headerThemeLogo,
    color: 'default',
  },
};

export const Transparent: Story = {
  args: {
    color: 'transparent',
    logo: headerThemeLogo,
    actions: (
      <IconButton color="inherit"><AccountCircle /></IconButton>
    ),
    tabs: ['Home', 'Explore', 'Profile'],
    tabsValue: 0,
  },
  parameters: {
    backgrounds: { default: 'transparent' },
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabsValue ?? 0);
    return (
      <div style={{ minHeight: 100 }}>
        <RdsHeader {...args} color={args.color} tabsValue={tabValue} onTabsChange={(_, v) => setTabValue(v)} />
      </div>
    );
  },
};
export const WithLogo: Story = {
  args: {
    title: '',
    logo: headerThemeLogo,
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
    logo: headerThemeLogo,
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
    logo: headerThemeLogo,
    tabs: ['HOME', 'NEWS', 'MARKETPLACE', 'JOBS'],
    tabsValue: 0,
    color: 'default',
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabsValue ?? 0);
    return (
      <RdsHeader {...args} color={args.color} tabsValue={tabValue} onTabsChange={(_, v) => setTabValue(v)} />
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
    logo: headerThemeLogo,
    title: '',
    tabs: ['Dashboard', 'Projects', 'Calendar'],
    tabsValue: 0,
    color: 'default',
  },
  render: (args) => {
    const [tabValue, setTabValue] = React.useState(args.tabsValue ?? 0);
    return (
      <RdsHeader {...args} color={args.color} tabsValue={tabValue} onTabsChange={(_, v) => setTabValue(v)} />
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