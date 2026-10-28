import React, { useEffect, useState } from 'react';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSidebar from './rds-sidebar';
import { useRaaghuLogoSrc } from '../shared/hooks/useRaaghuLogoSrc';
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
        status: { type: 'stable' },
    layout: 'padded',
    docs: {
      story: {
        height: '450px',
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
      // Whitelist only interactive, design-relevant props (hides MUI Drawer noise + slots).
      include: [
        'isOpen',
        'width',
        'variant',
        'anchor',
        'layout',
        'typeOf',
        'showLogo',
        'showSearch',
        'user',
      ],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open. Has no effect when `variant` is `permanent`.',
    },
    width: {
      control: { type: 'number', min: 64, max: 400, step: 8 },
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
      description: 'Sidebar layout style',
    },
    typeOf: {
      control: 'select',
      options: ['collapse', 'expanded', 'fixed'],
      description: 'Collapse / expand behavior',
    },
    showSearch: {
      control: 'boolean',
      description: 'Toggle whether the search box is shown in the sidebar',
    },
    showLogo: {
      control: 'boolean',
      description: 'Show the default logo in the sidebar header',
    },
    user: {
      control: 'object',
      description: 'User shown in the avatar area (`name`, `subtitle`, `avatarSrc`)',
    },
  },
  args: {
    isOpen: true,
    width: 240,
    variant: 'permanent',
    anchor: 'left',
    layout: 'raaghu',
    typeOf: 'expanded',
    showLogo: true,
    showSearch: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { label: 'Home', icon: <Home />, onClick: () => {} },
  {
    label: 'Dashboard',
    icon: <Dashboard />,
    selected: true,
    children: [
      { label: 'Overview', icon: <Star />, onClick: () => {} },
      { label: 'Stats', icon: <Inbox />, onClick: () => {} },
      { label: 'Reports', icon: <Send />, onClick: () => {} },
    ],
  },
  { label: 'Profile', icon: <Person />, onClick: () => {} },
  { label: 'Settings', icon: <Settings />, onClick: () => {} },
  { label: 'Requests', icon: <Drafts />,
    selected: true,
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
  const logoSrc = useRaaghuLogoSrc();
  const [open, setOpen] = useState(!!args.isOpen);
  const [drawerContainer, setDrawerContainer] = useState<HTMLDivElement | null>(null);
  const { hideMainParagraph, hideToggleButton, ...sidebarArgs } = args;
  const sidebarWidth = sidebarArgs.width ?? 240;
  const variant = sidebarArgs.variant ?? 'permanent';
  const isPermanent = variant === 'permanent';
  const reserveSidebarColumn = open && (isPermanent || variant === 'temporary' || variant === 'persistent');

  useEffect(() => {
    setOpen(!!args.isOpen);
  }, [args.isOpen]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        minHeight: 400,
        bgcolor: 'background.default',
        overflow: 'hidden',
        borderRadius: 1,
        color: 'text.primary',
      }}
    >
      <Box
        ref={setDrawerContainer}
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: reserveSidebarColumn ? (isPermanent ? 'auto' : sidebarWidth) : 0,
          minWidth: isPermanent && open ? sidebarWidth : undefined,
          minHeight: 400,
          overflow: 'hidden',
        }}
      >
        <RdsSidebar
          {...sidebarArgs}
          avatarCollapsedSrc={logoSrc}
          isOpen={open}
          onClose={() => setOpen(false)}
          container={drawerContainer}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          minWidth: 0,
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        {!hideToggleButton && (
          <Button
            variant="contained"
            onClick={() => setOpen((prev: boolean) => !prev)}
            sx={{ flexShrink: 0, whiteSpace: 'nowrap' }}
          >
            {open ? 'Close' : 'Open'} Sidebar
          </Button>
        )}
        {!hideMainParagraph && (
          <Box
            component="p"
            sx={{
              m: 0,
              flex: '1 1 14rem',
              minWidth: 0,
            }}
          >
            Main content area. The sidebar will slide over this content.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const Default = {
  render: SidebarTemplate,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const nav = canvasElement.querySelector('.MuiDrawer-root, [role="navigation"], nav') || canvasElement.firstElementChild;
    expect(nav).toBeTruthy();
  },
  args: {
    items: basicItems,
    isOpen: true,
    variant: 'persistent',
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
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
    isOpen: true,
    variant: 'permanent',
    showLogo: true,
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    showSearch: true,
    hideMainParagraph: false,
    hideToggleButton: false,
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
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
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
  render: (args) => {
    const logoSrc = useRaaghuLogoSrc();
    return <RdsSidebar {...args} avatarCollapsedSrc={logoSrc} />;
  },
  args: {
    items: basicItems,
    isOpen: true,
    variant: 'permanent',
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    showLogo: true,
  },
};

export const WideSidebar = {
  render: SidebarTemplate,
  args: {
    items: basicItems,
    width: 250,
    showLogo: true,
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  },
};

export const WithDisabledItems = {
  render: SidebarTemplate,
  args: {
    items: [
      { label: 'Home', icon: <Home />, onClick: () => {} },
      { label: 'Dashboard', icon: <Dashboard />, onClick: () => {}, selected: true },
      { label: 'Profile', icon: <Person />, disabled: true },
      { label: 'Settings', icon: <Settings />, onClick: () => {} },
      { label: 'Help (Coming Soon)', icon: <Help />, disabled: true },
    ],
    showLogo: true,
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  },
};

export const WithoutIcons: Story = {
  render: (args) => {
    const logoSrc = useRaaghuLogoSrc();
    return <RdsSidebar {...args} avatarCollapsedSrc={logoSrc} />;
  },
  args: {
    items: [
      { label: 'Home', onClick: () => {} },
      { label: 'About', onClick: () => {}, selected: true },
      { label: 'Services', onClick: () => {} },
      { label: 'Contact', onClick: () => {} },
    ],
    isOpen: true,
    variant: 'permanent',
    showLogo: true,
    user: { avatarSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  },
};