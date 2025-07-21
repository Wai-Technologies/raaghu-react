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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badgeContent: 4,
    children: <Mail />,
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

export const WithAvatar: Story = {
  args: {
    badgeContent: 2,
    color: 'error',
    children: <Avatar>U</Avatar>,
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    color: 'success',
    children: <Mail />,
  },
};
