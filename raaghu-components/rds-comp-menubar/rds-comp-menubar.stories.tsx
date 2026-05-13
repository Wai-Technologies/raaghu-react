import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompMenubar, { MenubarItem } from './rds-comp-menubar';
import {
  Home,
  Edit,
  Visibility,
  ContentCut,
  ContentCopy,
  ContentPaste,
  Delete,
  Settings,
  Help,
  Info,
  Logout,
  Add,
  Refresh,
  Save,
  Close,
  NavigateNext,
} from '@mui/icons-material';
import './rds-comp-menubar.scss';

const meta: Meta<typeof RdsCompMenubar> = {
  title: 'Components/Menubar',
  component: RdsCompMenubar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The **Menubar** component provides a navigation menu bar with support for submenus, icons, and badges. 
It supports both horizontal and vertical orientations with multiple size, color, and variant options. 
Features include automatic dark/light theme support, keyboard accessibility, and flexible menu structures.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of menubar items',
      defaultValue: 'medium',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Menubar orientation',
      defaultValue: 'horizontal',
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text'],
      description: 'Visual variant style',
      defaultValue: 'text',
    },
    layout: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Menubar layout',
      defaultValue: 'default',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark', 'auto'],
      description: 'Theme mode',
      defaultValue: 'auto',
    },
    clickable: {
      control: 'boolean',
      description: 'Enable clickable menu items',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompMenubar>;

// Basic menubar items
const basicItems: MenubarItem[] = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'view', label: 'View' },
];

// Menubar with submenus
const itemsWithSubmenus: MenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    icon: <Home fontSize="small" />,
    submenu: [
      { id: 'new', label: 'New', icon: <Add fontSize="small" /> },
      { id: 'open', label: 'Open' },
      { id: 'save', label: 'Save', icon: <Save fontSize="small" /> },
      { id: 'save-as', label: 'Save As...' },
      { divider: true, id: 'divider-1' },
      { id: 'exit', label: 'Exit' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <Edit fontSize="small" />,
    submenu: [
      { id: 'undo', label: 'Undo' },
      { id: 'redo', label: 'Redo' },
      { divider: true, id: 'divider-2' },
      { id: 'cut', label: 'Cut', icon: <ContentCut fontSize="small" /> },
      { id: 'copy', label: 'Copy', icon: <ContentCopy fontSize="small" /> },
      { id: 'paste', label: 'Paste', icon: <ContentPaste fontSize="small" /> },
    ],
  },
  {
    id: 'view',
    label: 'View',
    icon: <Visibility fontSize="small" />,
    submenu: [
      { id: 'zoom-in', label: 'Zoom In' },
      { id: 'zoom-out', label: 'Zoom Out' },
      { divider: true, id: 'divider-3' },
      { id: 'fullscreen', label: 'Full Screen' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: <Settings fontSize="small" />,
    submenu: [
      { id: 'settings', label: 'Settings', icon: <Settings fontSize="small" /> },
      { id: 'preferences', label: 'Preferences' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    icon: <Help fontSize="small" />,
    submenu: [
      { id: 'about', label: 'About', icon: <Info fontSize="small" /> },
      { id: 'documentation', label: 'Documentation' },
      { divider: true, id: 'divider-4' },
      { id: 'contact', label: 'Contact Support' },
    ],
  },
];

// Default story
export const Default: Story = {
  args: {
    items: basicItems,
    orientation: 'horizontal',
    size: 'medium',
    variant: 'text',
    color: 'primary',
  },
};

// Badges
export const WithBadges: Story = {
  render: () => {
    const itemsWithBadges: MenubarItem[] = [
      { id: 'file', label: 'File', badge: 3 },
      { id: 'edit', label: 'Edit' },
      { id: 'view', label: 'View', badge: '2' },
      { id: 'tools', label: 'Tools', badge: '!' },
    ];
    return <RdsCompMenubar items={itemsWithBadges} orientation="horizontal" />;
  },
};

// Vertical orientation
export const VerticalOrientation: Story = {
  args: {
    items: itemsWithSubmenus,
    orientation: 'vertical',
    size: 'medium',
    variant: 'text',
    color: 'primary',
  },
};


