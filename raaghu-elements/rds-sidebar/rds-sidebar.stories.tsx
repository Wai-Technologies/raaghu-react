import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSidebar from './rds-sidebar';
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
  Drafts,
  Business,
  AdminPanelSettings,
  Widgets,
  Receipt,
  ConfirmationNumber,
  Chat,
  Campaign,
  Assignment
} from '@mui/icons-material';

const meta: Meta<typeof RdsSidebar> = {
  title: 'Elements/Sidebar',
  component: RdsSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      story: {
        height: '450px'
      },
      description: {
        component: `
The Sidebar component supports different platforms with predefined menu items:

- **ABP Platform** (\`platform="abp-list"\`): Shows Dashboard, Saas, Administration, Demo UI Components
- **ANZ Platform** (\`platform="anz-list"\`): Shows Dashboard, Saas, Invoices, Ticket Allocation, Communication, Advertisements, Requests

When a platform is specified, the component automatically displays the appropriate menu items regardless of the \`items\` prop.
        `
      }
    },
    controls: {
    exclude: ['component', 'slots', 'slotProps', 'onClose'],
    },
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
      options: ['left', 'right'],
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
    showSearch: {
      control: 'boolean',
      description: 'Toggle whether the search box is shown in the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', icon: <Home />, onClick: () => alert('Home clicked') },
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    active: true,
    children: [
      { label: 'Overview', icon: <Star />, onClick: () => alert('Overview clicked') },
      { label: 'Stats', icon: <Inbox />, onClick: () => alert('Stats clicked') },
      { label: 'Reports', icon: <Send />, onClick: () => alert('Reports clicked') },
    ],
  },
  { label: 'Profile', icon: <Person />, onClick: () => alert('Profile clicked') },
  { label: 'Settings', icon: <Settings />, onClick: () => alert('Settings clicked') },
  { label: 'Requests', icon: <Drafts />,
    active: true,
    children: [
      { label: 'New Requests', icon: <Star />, onClick: () => alert('New Requests clicked') },
      { label: 'Pending', icon: <Drafts />, onClick: () => alert('Pending clicked') },
      { label: 'Approved', icon: <Send />, onClick: () => alert('Approved clicked') },
    ], 
  },
  { label: 'Help', icon: <Help />, onClick: () => alert('Help clicked') },
];

const mailItems = [
  { label: 'Inbox', icon: <Inbox />, onClick: () => alert('Inbox clicked') },
  { label: 'Starred', icon: <Star />, onClick: () => alert('Starred clicked') },
  { label: 'Send email', icon: <Send />, onClick: () => alert('Send clicked') },
  { label: 'Drafts', icon: <Drafts />, onClick: () => alert('Drafts clicked') },
];

const anzMenuItems = [
  { label: 'Dashboard', icon: <Dashboard />, onClick: () => alert('Dashboard clicked') },
  { label: 'Saas', icon: <Business />, onClick: () => alert('Saas clicked') },
  { label: 'Administration', icon: <AdminPanelSettings />, onClick: () => alert('Administration clicked') },
  { label: 'Demo UI Components', icon: <Widgets />, onClick: () => alert('Demo UI Components clicked') },
];

const abpMenuItems = [
  { label: 'Dashboard', icon: <Dashboard />, onClick: () => alert('Dashboard clicked') },
  { label: 'Saas', icon: <Business />, onClick: () => alert('Saas clicked') },
  { label: 'Invoices', icon: <Receipt />, onClick: () => alert('Invoices clicked') },
  { label: 'Ticket Allocation', icon: <ConfirmationNumber />, onClick: () => alert('Ticket Allocation clicked') },
  { label: 'Communication', icon: <Chat />, onClick: () => alert('Communication clicked') },
  { label: 'Advertisements', icon: <Campaign />, onClick: () => alert('Advertisements clicked') },
  { label: 'Requests', icon: <Assignment />, onClick: () => alert('Requests clicked') },
];

const SidebarTemplate = (args: any) => {
  const [open, setOpen] = useState(args.isOpen || false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ display: 'flex' }} ref={containerRef}>
      {!args.hideToggleButton && (
        <Button 
          variant="contained" 
          onClick={() => setOpen(!open)}
          sx={{ mb: 2 }}
        >
          {open ? 'Close' : 'Open'} Sidebar
        </Button>
      )}
      <RdsSidebar
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        container={containerRef.current}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {!args.hideMainParagraph && <p>Main content area. The sidebar will slide over this content.</p>}
      </Box>
    </Box>
  );
};

export const Default = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    isOpen: true,
    variant: 'permanent',
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
    showLogo: true,
    showSearch: true,
    hideMainParagraph: true,
    hideToggleButton: true,
  },
};

export const MailApp = {
  render: SidebarTemplate,
  args: {
    items: mailItems,
    width: 280,
    showLogo: true,
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
  },
};

export const NarrowSidebar = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    width: 200, 
    isOpen: true,
    variant: 'permanent',
    showLogo: true,
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
    hideToggleButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: ``
      }
    }
  }
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
    width: 250,
    showLogo: true,
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
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
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
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
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
  },
};