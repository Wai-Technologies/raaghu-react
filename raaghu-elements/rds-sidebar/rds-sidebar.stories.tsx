import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSidebar from './rds-sidebar';
import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { 
  Home, 
  Dashboard, 
  Person, 
  Settings, 
  Help,
  Inbox,
  Star,
  Send,
  Drafts
} from '@mui/icons-material';

const meta: Meta<typeof RdsSidebar> = {
  title: 'Elements/Sidebar',
  component: RdsSidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open',
    },
    width: {
      control: 'number',
      description: 'Width of the sidebar in pixels',
    },
    variant: {
      control: 'select',
      options: ['permanent', 'persistent', 'temporary'],
      description: 'Variant of the drawer',
    },
    anchor: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Side from which the drawer will appear',
    },
    layout: {
      control: 'select',
      options: ['raaghu', 'list', 'toolbar'],
    },
    typeOf: {
      control: 'select',
      options: ['collapse', 'expanded', 'fixed'],
    },
    platform: {
      control: 'select',
      options: ['abp-list', 'anz-list'],
      description: 'Platform type for the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', icon: <Home />, onClick: () => alert('Home clicked') },
  { label: 'Dashboard', icon: <Dashboard />, onClick: () => alert('Dashboard clicked'), active: true },
  { label: 'Profile', icon: <Person />, onClick: () => alert('Profile clicked') },
  { label: 'Settings', icon: <Settings />, onClick: () => alert('Settings clicked') },
  { label: 'Help', icon: <Help />, onClick: () => alert('Help clicked') },
];

const mailItems = [
  { label: 'Inbox', icon: <Inbox />, onClick: () => alert('Inbox clicked') },
  { label: 'Starred', icon: <Star />, onClick: () => alert('Starred clicked') },
  { label: 'Send email', icon: <Send />, onClick: () => alert('Send clicked') },
  { label: 'Drafts', icon: <Drafts />, onClick: () => alert('Drafts clicked') },
];

// Interactive template
const SidebarTemplate = (args: any) => {
  const [open, setOpen] = useState(args.isOpen || false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Button 
        variant="contained" 
        onClick={() => setOpen(!open)}
        sx={{ mb: 2 }}
      >
        {open ? 'Close' : 'Open'} Sidebar
      </Button>
      <RdsSidebar
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <p>Main content area. The sidebar will slide over this content.</p>
      </Box>
    </Box>
  );
};

export const Default = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    showLogo: true,
  },
};

export const MailApp = {
  render: SidebarTemplate,
  args: {
    items: mailItems,
    width: 280,
    showLogo: true,
  },
};

export const NarrowSidebar = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    width: 180,
    showLogo: true,
  },
};

export const Permanent: Story = {
  args: {
    items: basicItems,
    isOpen: true,
    variant: 'permanent',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
    showLogo: true,
  },
};

export const WideSidebar = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    width: 320,
    showLogo: true,
  },
};

export const WithDisabledItems = {
  render: SidebarTemplate,
  args: {
    items: [
      { label: 'Home', icon: <Home />, onClick: () => alert('Home clicked') },
      { label: 'Dashboard', icon: <Dashboard />, onClick: () => alert('Dashboard clicked'), active: true },
      { label: 'Profile', icon: <Person />, disabled: true },
      { label: 'Settings', icon: <Settings />, onClick: () => alert('Settings clicked') },
      { label: 'Help (Coming Soon)', icon: <Help />, disabled: true },
    ],
    showLogo: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => alert('Home clicked') },
      { label: 'About', onClick: () => alert('About clicked'), active: true },
      { label: 'Services', onClick: () => alert('Services clicked') },
      { label: 'Contact', onClick: () => alert('Contact clicked') },
    ],
    isOpen: true,
    variant: 'permanent',
    showLogo: true,
  },
};