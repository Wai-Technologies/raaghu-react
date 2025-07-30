import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { ContentCut, ContentCopy, ContentPaste, Delete } from '@mui/icons-material';
import { useState } from 'react';
import RdsMenu from './rds-menu';

const meta: Meta<typeof RdsMenu> = {
  title: 'Elements/Menu',
  component: RdsMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    items: [
      {
        label: 'Profile',
        id: 1
      },
      {
        label: 'My account',
        id: 2
      },
      {
        label: 'Logout',
        id: 3
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    open: true,
    items: [
      {
        label: 'Cut', icon: <ContentCut fontSize="small" />,
        id: 1
      },
      {
        label: 'Copy', icon: <ContentCopy fontSize="small" />,
        id: 2
      },
      {
        label: 'Paste', icon: <ContentPaste fontSize="small" />,
        id: 3
      },
      {
        label: 'Delete', icon: <Delete fontSize="small" />,
        id: 4
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    open: true,
    items: [
      {
        label: 'Cut', icon: <ContentCut fontSize="small" />,
        id: 1
      },
      {
        label: 'Copy', icon: <ContentCopy fontSize="small" />,
        id: 2
      },
      {
        label: 'Paste', icon: <ContentPaste fontSize="small" />,
        id: 3
      },
      {
        label: 'Enabled Item',
        id: 4
      },
      {
        label: 'Disabled Item', disabled: true,
        id: 5
      },
      {
        label: 'Another Enabled Item',
        id: 6
      },
    ],
  },
};
