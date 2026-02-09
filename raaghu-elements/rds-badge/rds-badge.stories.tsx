import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsBadge from './rds-badge';
import { Avatar, IconButton } from '@mui/material';
import { Mail, Notifications } from '@mui/icons-material';

const meta: Meta<typeof RdsBadge> = {
  title: 'Elements/Badge',
  component: RdsBadge,
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['component', 'slots', 'slotProps', 'color', 'children'],
    },
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
  component: { control: { disable: true }, table: { disable: true } },
  slots: { control: { disable: true }, table: { disable: true } },
  slotProps: { control: { disable: true }, table: { disable: true } },
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
Default.parameters = {
  controls: { exclude: ['shape', 'layout'] },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    children: <Mail />,
  },
};
Dot.parameters = {
  controls: { exclude: ['shape', 'layout'] },
};

export const WithAvatar: Story = {
  args: {
    badgeContent: 2,
    children: <Avatar>U</Avatar>,
  },
};
WithAvatar.parameters = {
  controls: { exclude: ['shape', 'layout', 'badgeContent'] },
};

export const WithIcon: Story = {
  args: {
    badgeContent: 10,
    children: (
      <IconButton>
        <Notifications />
      </IconButton>
    ),
  },
};
WithIcon.parameters = {
  controls: { exclude: ['shape', 'layout'] },
};

export const WithText: Story = {
  args: {
    badgeContent: 'Badge',
    color: 'secondary',
    size: 'medium',
  },
};

export const ShowZeroTrue: Story = {
  args: {
    badgeContent: 0,
    showZero: true,
    children: <Mail />,
  },
};
ShowZeroTrue.parameters = {
  controls: { exclude: ['shape', 'layout'] },
};

export const ShowZeroFalse: Story = {
  args: {
    badgeContent: 0,
    showZero: false,
    children: <Mail />,
  },
};
ShowZeroFalse.parameters = {
  controls: { exclude: ['shape', 'layout'] },
};
