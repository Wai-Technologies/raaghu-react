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
    children: (
      <>
        <MenuItem>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>My account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    open: true,
    children: (
      <>
        <MenuItem>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </>
    ),
  },
};

export const Dense: Story = {
  args: {
    open: true,
    dense: true,
    children: (
      <>
        <MenuItem dense>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem dense>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem dense>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
      </>
    ),
  },
};

export const WithDisabled: Story = {
  args: {
    open: true,
    children: (
      <>
        <MenuItem>
          <ListItemText>Enabled Item</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemText>Disabled Item</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText>Another Enabled Item</ListItemText>
        </MenuItem>
      </>
    ),
  },
};
