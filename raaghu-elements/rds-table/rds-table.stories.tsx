
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import RdsTable from './rds-table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RdsProgress from '../rds-progress/rds-progress';
import RdsAvatar from '../rds-avatar/rds-avatar';
import RdsBadge from '../rds-badge/rds-badge';
import RdsIconButton from '../rds-icon-button/rds-icon-button';

const meta: Meta<typeof RdsTable> = {
  title: 'Elements/Table',
  component: RdsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    stickyHeader: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTableData = [
  {
    id: '1',
    text1: 'Text',
    badge1: 'Badge',
    radio1: 'radio',
    checkbox1: 'checkbox',
    text2: 'Text',
    menuIcon: '⋮',
    textColumn: 'Text\nText',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar1.jpg'
    },
    sampleText: 'This is a sample text',
    linkText: 'Text',
    progressBar1: 'progress',
    textNew1: 'Text',
    badge6: 'Badge',
    badge7: 'Badge',
    progressText: 'Text',
    text3: 'Text',
    badge2: 'Badge',
    badge3: 'Badge',
    textNew2: 'Text',
    badge4: 'Badge',
    badge5: 'Badge',
    text5: 'Text',
    text6: 'Text',
    deleteAction: 'delete'
  },
  {
    id: '2',
    text1: 'Text',
    badge1: 'Badge',
    radio1: 'radio',
    checkbox1: 'checkbox',
    text2: 'Text',
    menuIcon: '⋮',
    textColumn: 'Text\nText',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar2.jpg'
    },
    sampleText: 'This is a sample text',
    linkText: 'Text',
    progressBar1: 'progress',
    textNew1: 'Text',
    badge6: 'Badge',
    badge7: 'Badge',
    progressText: 'Text',
    text3: 'Text',
    badge2: 'Badge',
    badge3: 'Badge',
    textNew2: 'Text',
    badge4: 'Badge',
    badge5: 'Badge',
    text5: 'Text',
    text6: 'Text',
    deleteAction: 'delete'
  },
  {
    id: '3',
    text1: 'Text',
    badge1: 'Badge',
    radio1: 'radio',
    checkbox1: 'checkbox',
    text2: 'Text',
    menuIcon: '⋮',
    textColumn: 'Text\nText',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar3.jpg'
    },
    sampleText: 'This is a sample text',
    linkText: 'Text',
    progressBar1: 'progress',
    textNew1: 'Text',
    badge6: 'Badge',
    badge7: 'Badge',
    progressText: 'Text',
    text3: 'Text',
    badge2: 'Badge',
    badge3: 'Badge',
    textNew2: 'Text',
    badge4: 'Badge',
    badge5: 'Badge',
    text5: 'Text',
    text6: 'Text',
    deleteAction: 'delete'
  },
  {
    id: '4',
    text1: 'Text',
    badge1: 'Badge',
    radio1: 'radio',
    checkbox1: 'checkbox',
    text2: 'Text',
    menuIcon: '⋮',
    textColumn: 'Text\nText',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar4.jpg'
    },
    sampleText: 'This is a sample text',
    linkText: 'Text',
    progressBar1: 'progress',
    textNew1: 'Text',
    badge6: 'Badge',
    badge7: 'Badge',
    progressText: 'Text',
    text3: 'Text',
    badge2: 'Badge',
    badge3: 'Badge',
    textNew2: 'Text',
    badge4: 'Badge',
    badge5: 'Badge',
    text5: 'Text',
    text6: 'Text',
    deleteAction: 'delete'
  }
];


const sampleData = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'Admin',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar1.jpg'
    },
    badge: 'Badge',
    status: 'Active'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'User',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar2.jpg'
    },
    badge: 'Image',
    status: 'Inactive'
  },
  { 
    id: '3', 
    name: 'Bob Johnson', 
    email: 'bob@example.com', 
    role: 'Moderator',
    user: {
      name: 'Jane Doe',
      subtitle: 'Designation',
      src: '/path/to/avatar3.jpg'
    },
    badge: 'Badge',
    status: 'Active'
  },
];

const defaultColumns = [
  { 
    id: 'menuIcon', 
    label: 'Text', 
    minWidth: 60,
    type: 'text' as const,
    align: 'center' as const
  },
  { 
    id: 'text1', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const
  },
  { 
    id: 'badge1', 
    label: 'Text', 
    minWidth: 60,
    type: 'text' as const,
    format: (value: string) => (
        <RdsBadge 
          badgeContent="Badge" 
          color="secondary" 
          size="small" 
          shape="rectangle" 
          colorVariant="secondary"
        />
    )
  },
  { 
    id: 'radio1', 
    label: 'Text', 
    type: 'radio' as const,
    minWidth: 80,
    align: 'center' as const
  },
  { 
    id: 'checkbox1', 
    label: 'Text', 
    type: 'checkbox' as const,
    minWidth: 80,
    align: 'center' as const
  },
  { 
    id: 'text2', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const
  },
  { 
    id: 'textColumn', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    format: (value: string) => {
      const lines = value.split('\n');
      return (
        <div className="rds-table__multiline-text">
          <div className="rds-table__multiline-text-primary">{lines[0]}</div>
          {lines[1] && <div className="rds-table__multiline-text-secondary">{lines[1]}</div>}
        </div>
      );
    }
  },
  { 
    id: 'user', 
    label: 'Text', 
    type: 'text' as const,
    minWidth: 250,
    format: () => (
      <RdsAvatar
        alt="User Avatar"
        subText="Developer"
        displayStyle="with-name"
        title="Wai Technologies"
        showDesignation
        showName
        size="small"
      />
    )
  },
  { 
    id: 'sampleText', 
    label: 'Text', 
    minWidth: 165,
    type: 'text' as const
  },
  { 
    id: 'linkText', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    format: (value: string) => (
      <span className="rds-table__link-text">
        {value}
      </span>
    )
  },
  { 
    id: 'progressBar1', 
    label: 'Text', 
    minWidth: 120,
    type: 'text' as const,
    format: () => (
      <div className="rds-table__progress-container">
        <RdsProgress
          color="primary"
          stepperType="circle"
          steps={4}
          style="line"
          variant="determinate"
        />
        <span className="rds-table__progress-text">Text</span>
      </div>
    )
  },
  { 
    id: 'text5', 
    label: 'Text', 
    minWidth: 180,
    type: 'text' as const,
    format: (value: string) => (
      <div className="rds-table__content-row">
        <span className="rds-table__content-text">Text</span>
        <RdsBadge 
          badgeContent="Active" 
          color="secondary" 
          size="small" 
          shape="rectangle" 
          colorVariant="secondary"
        />
        <RdsBadge 
          badgeContent="Pending" 
          color="secondary" 
          size="small" 
          shape="rectangle" 
          colorVariant="secondary"
        />
      </div>
    )
  },
  { 
    id: 'deleteAction', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    align: 'center' as const,
    format: () => (
      <RdsIconButton color="error">
        <DeleteIcon />
      </RdsIconButton>
    )
  },
  { 
    id: 'text6', 
    label: 'Text', 
    minWidth: 180,
    type: 'text' as const,
    format: (value: string) => (
      <div className="rds-table__content-row">
        <RdsBadge 
          badgeContent="Active" 
          color="secondary" 
          size="small" 
          shape="rectangle" 
          colorVariant="secondary"
        />
        <RdsBadge 
          badgeContent="Pending" 
          color="secondary" 
          size="small" 
          shape="rectangle" 
          colorVariant="secondary"
        />
        <span className="rds-table__content-text">Text</span>
      </div>
    )
  }
];

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 120 },
];

const advancedColumns = [
  { 
    id: 'checkbox', 
    label: '', 
    type: 'checkbox' as const,
    minWidth: 50
  },
  { 
    id: 'user', 
    label: 'User', 
    type: 'avatar' as const,
    minWidth: 200
  },
  { 
    id: 'badge', 
    label: 'Badge', 
    type: 'badge' as const,
    minWidth: 100,
    // align: 'center' as const
  },
  { 
    id: 'status', 
    label: 'Status', 
    type: 'badge' as const,
    minWidth: 100,
    // align: 'center' as const
  },
  { 
    id: 'actions', 
    label: 'Actions', 
    type: 'actions' as const,
    minWidth: 120,
    align: 'right' as const,
    format: () => [
      { type: 'edit', icon: <EditIcon fontSize="small" /> },
      { type: 'delete', icon: <DeleteIcon fontSize="small" /> }
    ]
  },
];

export const Default: Story = {
  args: {
    rows: defaultTableData,
    columns: defaultColumns,
    selectable: false,
    onRowAction: (action, rowId) => console.log('Action:', action, 'Row:', rowId),
  },
};

export const SmallSize: Story = {
  args: {
    rows: sampleData,
    columns: columns,
    size: 'small',
  },
};

export const StickyHeader: Story = {
  args: {
    rows: sampleData,
    columns: columns,
    stickyHeader: true,
  },
};

export const LargeDataset: Story = {
  args: {
    rows: Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: index % 3 === 0 ? 'Admin' : index % 2 === 0 ? 'Moderator' : 'User',
    })),
    columns: columns,
    stickyHeader: true,
  },
};

export const WithActions: Story = {
  args: {
    rows: sampleData,
    columns: [
      ...columns,
      { 
        id: 'actions', 
        label: 'Actions', 
        minWidth: 150,
        format: () => 'Edit | Delete'
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    rows: [],
    columns: columns,
  },
};
