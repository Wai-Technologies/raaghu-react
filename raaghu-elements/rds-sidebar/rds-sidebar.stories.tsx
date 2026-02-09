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
  { label: 'Home', icon: <Home />, onClick: () => {} },
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    active: true,
    children: [
      { label: 'Overview', icon: <Star />, onClick: () => {} },
      { label: 'Stats', icon: <Inbox />, onClick: () => {} },
      { label: 'Reports', icon: <Send />, onClick: () => {} },
    ],
  },
  { label: 'Profile', icon: <Person />, onClick: () => {} },
  { label: 'Settings', icon: <Settings />, onClick: () => {} },
  { label: 'Requests', icon: <Drafts />,
    active: true,
    children: [
      { label: 'New Requests', icon: <Star />, onClick: () => {} },
      { label: 'Pending', icon: <Drafts />, onClick: () => {} },
      { label: 'Approved', icon: <Send />, onClick: () => {} },
    ], 
  },
  { label: 'Help', icon: <Help />, onClick: () => {} },
];

const mailItems = [
  { label: 'Inbox', icon: <Inbox />, onClick: () => {} },
  { label: 'Starred', icon: <Star />, onClick: () => {} },
  { label: 'Send email', icon: <Send />, onClick: () => {} },
  { label: 'Drafts', icon: <Drafts />, onClick: () => {} },
];

const anzMenuItems = [
  { label: 'Dashboard', icon: <Dashboard />, onClick: () => {} },
  { label: 'Saas', icon: <Business />, onClick: () => {} },
  { label: 'Administration', icon: <AdminPanelSettings />, onClick: () => {} },
  { label: 'Demo UI Components', icon: <Widgets />, onClick: () => {} },
];

const abpMenuItems = [
  { label: 'Dashboard', icon: <Dashboard />, onClick: () => {} },
  { label: 'Saas', icon: <Business />, onClick: () => {} },
  { label: 'Invoices', icon: <Receipt />, onClick: () => {} },
  { label: 'Ticket Allocation', icon: <ConfirmationNumber />, onClick: () => {} },
  { label: 'Communication', icon: <Chat />, onClick: () => {} },
  { label: 'Advertisements', icon: <Campaign />, onClick: () => {} },
  { label: 'Requests', icon: <Assignment />, onClick: () => {} },
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
      { label: 'Home', icon: <Home />, onClick: () => {} },
      { label: 'Dashboard', icon: <Dashboard />, onClick: () => {}, active: true },
      { label: 'Profile', icon: <Person />, disabled: true },
      { label: 'Settings', icon: <Settings />, onClick: () => {} },
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
      { label: 'Home', onClick: () => {} },
      { label: 'About', onClick: () => {}, active: true },
      { label: 'Services', onClick: () => {} },
      { label: 'Contact', onClick: () => {} },
    ],
    isOpen: true,
    variant: 'permanent',
    showLogo: true,
    avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    avatarCollapsedSrc: 'https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/raaghu-design-system-lightmode.png',
  },
};