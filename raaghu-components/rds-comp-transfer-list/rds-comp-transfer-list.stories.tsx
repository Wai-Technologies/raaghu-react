import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompTransferList from './rds-comp-transfer-list';
import { TransferListItem } from './rds-comp-transfer-list';
import { Code as CodeIcon, Palette as DesignIcon, Storage as StorageIcon, Cloud as CloudIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const meta: Meta<typeof RdsCompTransferList> = {
  title: 'Components/Transfer List',
  component: RdsCompTransferList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The **Transfer List** component displays two lists side-by-side, allowing users to move items between them. It supports selection, icons, descriptions, and both controlled and uncontrolled modes. Perfect for managing items between available and selected sets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the transfer list',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be selected',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show select all checkbox in headers',
    },
    disableMoveButtons: {
      control: 'boolean',
      description: 'Disable the move buttons',
    },
    leftTitle: {
      control: 'text',
      description: 'Title of the left list',
    },
    rightTitle: {
      control: 'text',
      description: 'Title of the right list',
    },
  },
} satisfies Meta<typeof RdsCompTransferList>;

export default meta;
type Story = StoryObj<typeof RdsCompTransferList>;

// Sample transfer list items
const basicItems: TransferListItem[] = [
  { id: 'item-1', label: 'React', description: 'JavaScript library' },
  { id: 'item-2', label: 'TypeScript', description: 'Typed JavaScript' },
  { id: 'item-3', label: 'MUI', description: 'Material UI library' },
  { id: 'item-4', label: 'Storybook', description: 'Component playground' },
  { id: 'item-5', label: 'Jest', description: 'Testing framework' },
  { id: 'item-6', label: 'ESLint', description: 'Code quality tool' },
];

const skillItems: TransferListItem[] = [
  { id: 'skill-1', label: 'Frontend Development', description: 'React & TypeScript', icon: <CodeIcon /> },
  { id: 'skill-2', label: 'UI/UX Design', description: 'Design systems & components', icon: <DesignIcon /> },
  { id: 'skill-3', label: 'Backend Development', description: 'Node.js & databases', icon: <StorageIcon /> },
  { id: 'skill-4', label: 'DevOps', description: 'Deployment & infrastructure', icon: <CloudIcon /> },
  { id: 'skill-5', label: 'Code Review', description: 'Quality assurance', icon: <EditIcon /> },
  { id: 'skill-6', label: 'Debugging', description: 'Problem solving', disabled: true, icon: <DeleteIcon /> },
];

// ─── Default Story ──────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    items: basicItems,
    defaultLeftItems: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6'],
    size: 'medium',
    multiple: true,
    showSelectAll: true,
    leftTitle: 'Available',
    rightTitle: 'Selected',
  },
};


