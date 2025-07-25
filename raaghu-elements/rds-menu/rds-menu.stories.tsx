import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentCut, ContentCopy, ContentPaste, Delete } from '@mui/icons-material';
import RdsMenu from './rds-menu';

const meta: Meta<typeof RdsMenu> = {
  title: 'Elements/Menu',
  component: RdsMenu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: { type: 'boolean' },
            description: 'Controls the open state of the menu'
          },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;


// Note: Set open: false for Docs. Enable open in Canvas/Preview for live demo.
export const Default: Story = {
  args: {
    open: false,
    items: [
      { id: 1, label: 'Profile' },
      { id: 2, label: 'My account' },
      { id: 3, label: 'Logout' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    open: false,
    items: [
      { id: 1, label: 'Cut', icon: <ContentCut fontSize="small" /> },
      { id: 2, label: 'Copy', icon: <ContentCopy fontSize="small" /> },
      { id: 3, label: 'Paste', icon: <ContentPaste fontSize="small" /> },
      { id: 4, label: 'Delete', icon: <Delete fontSize="small" /> },
    ],
  },
};

export const Dense: Story = {
  args: {
    open: false,
    items: [
      { id: 1, label: 'Cut', icon: <ContentCut fontSize="small" /> },
      { id: 2, label: 'Copy', icon: <ContentCopy fontSize="small" /> },
      { id: 3, label: 'Paste', icon: <ContentPaste fontSize="small" /> },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    open: false,
    items: [
      { id: 1, label: 'Enabled Item' },
      { id: 2, label: 'Disabled Item', disabled: true },
      { id: 3, label: 'Another Enabled Item' },
    ],
  },
};
