import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsTable from './rds-table';

const meta: Meta<typeof RdsTable> = {
  title: 'Elements/Table',
  component: RdsTable,
  parameters: {
    layout: 'centered',
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

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator' },
];

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'role', label: 'Role', minWidth: 120 },
];

export const Default: Story = {
  args: {
    rows: sampleData,
    columns: columns,
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
