import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsHeader from './rds-header';
import { Button, IconButton, Avatar } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const meta: Meta<typeof RdsHeader> = {
  title: 'Elements/Header',
  component: RdsHeader,
  parameters: {
    layout: 'fullscreen',
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

export const WithMenuButton: Story = {
  args: {
    title: 'Dashboard',
    showMenuButton: true,
    onMenuClick: () => alert('Menu clicked!'),
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

export const WithUserProfile: Story = {
  args: {
    title: 'User Dashboard',
    showMenuButton: true,
    actions: (
      <>
        <IconButton color="inherit">
          <Notifications />
        </IconButton>
        <Avatar sx={{ ml: 1 }}>JD</Avatar>
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Header',
    color: 'secondary',
    showMenuButton: true,
  },
};

export const Transparent: Story = {
  args: {
    title: 'Transparent Header',
    color: 'transparent',
    showMenuButton: true,
  },
};
