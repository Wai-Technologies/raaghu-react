import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import RdsCompMenubar, { RdsCompMenubarProps, RdsCompMenubarItem } from './rds-comp-menubar';
import './rds-comp-menubar.stories.scss';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  FileDownload as FileDownloadIcon,
  Print as PrintIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
} from '@mui/icons-material';

const meta: Meta<typeof RdsCompMenubar> = {
  title: 'Components/Menubar',
  component: RdsCompMenubar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A horizontal menubar component that displays a list of menu items with support for nested submenus. Provides keyboard shortcuts, icons, and dividers for organizing menu items. Supports both click and hover interactions.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the menubar',
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'The variant of the menubar',
    },
    color: {
      control: 'select',
      options: ['inherit', 'primary', 'secondary', 'error', 'warning', 'info', 'success'],
      description: 'The color of the active menu items',
    },
    openOnHover: {
      control: 'boolean',
      description: 'If true, menus open on hover instead of click',
    },
    closeOnItemClick: {
      control: 'boolean',
      description: 'If true, menu closes after item selection',
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the menubar fills the available width',
    },
    elevation: {
      control: 'number',
      description: 'The elevation level of dropdown menus',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompMenubar>;

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE MENU STRUCTURES
// ─────────────────────────────────────────────────────────────────────────────

const fileMenuItems: RdsCompMenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    submenu: [
      { id: 'new', label: 'New', shortcut: 'Ctrl+N', icon: <SaveIcon /> },
      { id: 'open', label: 'Open', shortcut: 'Ctrl+O' },
      { id: 'save', label: 'Save', shortcut: 'Ctrl+S', icon: <SaveIcon /> },
      { id: 'save-as', label: 'Save As', shortcut: 'Ctrl+Shift+S' },
      { id: 'file-divider', label: '', divider: true },
      { id: 'print', label: 'Print', shortcut: 'Ctrl+P', icon: <PrintIcon /> },
      { id: 'export', label: 'Export', shortcut: 'Ctrl+E', icon: <FileDownloadIcon /> },
      { id: 'file-divider-2', label: '', divider: true },
      { id: 'exit', label: 'Exit', shortcut: 'Alt+F4' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    submenu: [
      { id: 'undo', label: 'Undo', shortcut: 'Ctrl+Z', icon: <UndoIcon /> },
      { id: 'redo', label: 'Redo', shortcut: 'Ctrl+Y', icon: <RedoIcon /> },
      { id: 'edit-divider', label: '', divider: true },
      { id: 'cut', label: 'Cut', shortcut: 'Ctrl+X' },
      { id: 'copy', label: 'Copy', shortcut: 'Ctrl+C' },
      { id: 'paste', label: 'Paste', shortcut: 'Ctrl+V' },
      { id: 'delete', label: 'Delete', shortcut: 'Del', icon: <DeleteIcon /> },
      { id: 'edit-divider-2', label: '', divider: true },
      { id: 'select-all', label: 'Select All', shortcut: 'Ctrl+A' },
    ],
  },
  {
    id: 'view',
    label: 'View',
    submenu: [
      { id: 'zoom-in', label: 'Zoom In', shortcut: 'Ctrl++' },
      { id: 'zoom-out', label: 'Zoom Out', shortcut: 'Ctrl+-' },
      { id: 'zoom-reset', label: 'Reset Zoom', shortcut: 'Ctrl+0' },
      { id: 'view-divider', label: '', divider: true },
      { id: 'fullscreen', label: 'Full Screen', shortcut: 'F11' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    submenu: [
      { id: 'documentation', label: 'Documentation', icon: <InfoIcon /> },
      { id: 'about', label: 'About', icon: <InfoIcon /> },
    ],
  },
];

const simpleItems: RdsCompMenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    submenu: [
      { id: 'new', label: 'New' },
      { id: 'open', label: 'Open' },
      { id: 'save', label: 'Save' },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    submenu: [
      { id: 'cut', label: 'Cut' },
      { id: 'copy', label: 'Copy' },
      { id: 'paste', label: 'Paste' },
    ],
  },
  {
    id: 'help',
    label: 'Help',
  },
];

const iconMenuItems: RdsCompMenubarItem[] = [
  {
    id: 'file',
    label: 'File',
    icon: <SaveIcon />,
    submenu: [
      { id: 'new', label: 'New', icon: <SaveIcon /> },
      { id: 'open', label: 'Open' },
      { id: 'save', label: 'Save', icon: <SaveIcon /> },
    ],
  },
  {
    id: 'edit',
    label: 'Edit',
    icon: <EditIcon />,
    submenu: [
      { id: 'undo', label: 'Undo', icon: <UndoIcon /> },
      { id: 'redo', label: 'Redo', icon: <RedoIcon /> },
      { id: 'delete', label: 'Delete', icon: <DeleteIcon /> },
    ],
  },
  {
    id: 'view',
    label: 'View',
    icon: <RefreshIcon />,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    submenu: [
      { id: 'preferences', label: 'Preferences', icon: <SettingsIcon /> },
      { id: 'about', label: 'About', icon: <InfoIcon /> },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BASIC STORIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ## Default Menubar
 * A basic menubar with standard menu items and submenus.
 */
export const Default: Story = {
  args: {
    items: simpleItems,
    size: 'medium',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => (
    <div className="rds-menubar-story">
      <RdsCompMenubar {...args} />
    </div>
  ),
};



/**
 * ## With Icons
 * Menubar with icons in menu items and submenus.
 */
export const WithIcons: Story = {
  args: {
    items: iconMenuItems,
    size: 'medium',
    variant: 'outlined',
  },
  render: (args) => (
    <div className="rds-menubar-story">
      <RdsCompMenubar {...args} />
    </div>
  ),
};



/**
 * ## Full Feature
 * Complete menubar with all features (icons, shortcuts, dividers).
 */
export const FullFeature: Story = {
  args: {
    items: fileMenuItems,
    size: 'medium',
    variant: 'outlined',
    color: 'primary',
  },
  render: (args) => (
    <div className="rds-menubar-story">
      <RdsCompMenubar {...args} />
    </div>
  ),
};
