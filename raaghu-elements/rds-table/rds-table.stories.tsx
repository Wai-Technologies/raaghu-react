
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
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
        status: { type: 'stable' },
    layout: 'padded',
    controls: {
      exclude: ['rows', 'columns','onRowAction','onPageChange','onPageSizeChange','selectedRows','onRowSelect','className','component'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    sortDirection: { control: 
      { type: 'select' }, 
      options: ['asc', 'desc'] 
    },
     defaultSortDirection: { 
      control: 
      { type: 'select' }, 
      options: ['asc', 'desc'] 
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
    sortable: true,
    align: 'center' as const
  },
  { 
    id: 'text1', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    sortable: true
  },
  { 
    id: 'badge1', 
    label: 'Text', 
    minWidth: 60,
    type: 'text' as const,
    sortable: true,
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
    type: 'text' as const,
    sortable: true
  },
  { 
    id: 'textColumn', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    sortable: true,
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
    sortable: true,
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
    type: 'text' as const,
    sortable: true
  },
  { 
    id: 'linkText', 
    label: 'Text', 
    minWidth: 80,
    type: 'text' as const,
    sortable: true,
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
    sortable: true,
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
    sortable: true,
    format: () => (
      <div className="rds-table__badge-group">
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
    sortable: true,
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
    sortable: true,
    format: () => (
      <div className="rds-table__badge-group">
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
  }
];

const columns = [
  { id: 'id', label: 'ID', minWidth: 70, sortable: true },
  { id: 'name', label: 'Name', minWidth: 150, sortable: true },
  { id: 'email', label: 'Email', minWidth: 200, sortable: true },
  { id: 'role', label: 'Role', minWidth: 120, sortable: true },
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
  },
  { 
    id: 'status', 
    label: 'Status', 
    type: 'badge' as const,
    minWidth: 100,
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
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: defaultTableData,
    columns: defaultColumns,
    selectable: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table');
    await expect(table).toBeVisible();
  },
};

export const SmallSize: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: sampleData,
    columns: columns,
    size: 'small',
    selectable: false,
  },
};

export const StickyHeader: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: sampleData,
    columns: columns,
    stickyHeader: true,
    selectable: false,
  },
};

export const LargeDataset: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: Array.from({ length: 20 }, (_, index) => ({
      id: (index + 1).toString(),
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: index % 3 === 0 ? 'Admin' : index % 2 === 0 ? 'Moderator' : 'User',
    })),
    columns: columns,
    stickyHeader: true,
    selectable: false,
  },
};

export const WithActions: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: sampleData,
    columns: [
      ...columns,
      { 
        id: 'actions', 
        label: 'Actions', 
        minWidth: 150,
        format: () => 'Edit | Delete',
        sortable: false
      },
    ],
    selectable: false,
  },
};

export const Empty: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<string[]>([]);
    return (
      <RdsTable
        {...args}
        selectedRows={selected}
        onRowSelect={setSelected}
        defaultSortBy="id"
        defaultSortDirection="asc"
      />
    );
  },
  args: {
    rows: [],
    columns: columns,
    selectable: false,
  },
};
