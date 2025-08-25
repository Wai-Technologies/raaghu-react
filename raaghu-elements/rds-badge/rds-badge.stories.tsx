import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBadge from './rds-badge';
import { Avatar, IconButton } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';

const meta: Meta<typeof RdsBadge> = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
      defaultValue: 'medium',
    },
    shape: {
      control: { type: 'select' },
      options: ['rectangle', 'pill'],
      description: 'Badge shape',
      defaultValue: 'pill',
    },
    layout: {
      control: { type: 'select' },
      options: ['text', 'icon', 'icon-text', 'text-icon'],
      description: 'Badge layout',
      defaultValue: 'text',
    },
    styleType: {
      control: { type: 'select' },
      options: ['primary', 'outline', 'transparent'],
      description: 'Badge style',
      defaultValue: 'primary',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'disabled'],
      description: 'Badge state',
      defaultValue: 'default',
    },
    colorVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'danger', 'warning', 'light', 'success'],
      description: 'Badge color variant',
      defaultValue: 'primary',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badgeContent: 4,
    children: <Mail />,
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    color: 'success',
    children: <Mail />,
  },
};

export const WithAvatar: Story = {
  args: {
    badgeContent: 2,
    color: 'error',
    children: <Avatar>U</Avatar>,
  },
};

export const WithIcon: Story = {
  args: {
    badgeContent: 10,
    color: 'primary',
    children: (
      <IconButton>
        <Notifications />
      </IconButton>
    ),
  },
};

export const WithText: Story = {
  args: {
    badgeContent: 'Badge',
    color: 'secondary',
    size: 'medium',
  },
};
