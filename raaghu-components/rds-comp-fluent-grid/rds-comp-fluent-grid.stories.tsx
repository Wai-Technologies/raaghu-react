import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridNoScss, { FluentGridColumn, FluentGridAction, ActionPosition, State, ActionColumnStyle } from './rds-comp-fluent-grid-no-scss';

const RdsFluentGrid = RdsFluentGridNoScss;

// Create MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const meta: Meta<typeof RdsFluentGrid> = {
  title: 'Components/RdsFluentGrid',
  component: RdsFluentGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data grid component built with Fluent UI, featuring sorting, filtering, resizing, and more advanced features.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ height: '400px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    isSort: {
      control: 'boolean',
      description: 'Enable sorting functionality for columns',
      defaultValue: true,
    },
    isFilter: {
      control: 'boolean',
      description: 'Enable filtering functionality for columns',
      defaultValue: true,
    },
    isResizable: {
      control: 'boolean',
      description: 'Enable column resizing functionality',
      defaultValue: true,
    },
    enableCheckboxSelection: {
      control: 'boolean',
      description: 'Enable checkbox selection for rows',
      defaultValue: false,
    },
    enableRadioButtonSelection: {
      control: 'boolean',
      description: 'Enable radio button selection for rows',
      defaultValue: false,
    },
    showHeader: {
      control: 'boolean',
      description: 'Show the header with search and controls',
      defaultValue: true,
    },
    showSubHeader: {
      control: 'boolean',
      description: 'Show the subheader with title and toggle',
      defaultValue: true,
    },
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
      defaultValue: false,
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme variant',
      defaultValue: 'light',
    },
    state: {
      control: 'select',
      options: [State.Default, State.Collapsed],
      description: 'Initial state of the grid',
      defaultValue: State.Default,
    },
    actionPosition: {
      control: 'select',
      options: [ActionPosition.Left, ActionPosition.Right],
      description: 'Position of action buttons',
      defaultValue: ActionPosition.Right,
    },
    actionColumnStyle: {
      control: 'select',
      options: [ActionColumnStyle.ShowDots, ActionColumnStyle.ShowButtonsDirectly],
      description: 'Style of action column',
      defaultValue: ActionColumnStyle.ShowDots,
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RdsFluentGrid>;

// Sample data
const sampleColumns: FluentGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    dataType: 'number',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: 'name',
    name: 'Name',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 150,
    maxWidth: 300,
    isBold: true,
  },
  {
    key: 'email',
    name: 'Email',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 200,
    maxWidth: 400,
  },
  {
    key: 'role',
    name: 'Role',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 120,
    maxWidth: 200,
  },
  {
    key: 'status',
    name: 'Status',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 100,
    maxWidth: 150,
  },
  {
    key: 'lastLogin',
    name: 'Last Login',
    dataType: 'date',
    isSort: true,
    isFilter: true,
    isResizable: true,
    minWidth: 150,
    maxWidth: 200,
  },
];

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-14',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Manager',
    status: 'Inactive',
    lastLogin: '2024-01-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-16',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-13',
  },
  {
    id: 6,
    name: 'Diana Lee',
    email: 'diana.lee@example.com',
    role: 'User',
    status: 'Pending',
    lastLogin: '2024-01-12',
  },
  {
    id: 7,
    name: 'Eve Davis',
    email: 'eve.davis@example.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2024-01-11',
  },
  {
    id: 8,
    name: 'Frank Miller',
    email: 'frank.miller@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-01-09',
  },
  {
    id: 9,
    name: 'Grace Taylor',
    email: 'grace.taylor@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-17',
  },
  {
    id: 10,
    name: 'Henry Wilson',
    email: 'henry.wilson@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-01-18',
  },
  {
    id: 11,
    name: 'Ivy Brown',
    email: 'ivy.brown@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-19',
  },
  {
    id: 12,
    name: 'Jack Wilson',
    email: 'jack.wilson@example.com',
    role: 'User',
    status: 'Pending',
    lastLogin: '2024-01-20',
  },
  {
    id: 13,
    name: 'Kate Miller',
    email: 'kate.miller@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2024-01-21',
  }
];

const sampleActions: FluentGridAction[] = [
  {
    id: 'edit',
    displayName: 'Edit',
  },
  {
    id: 'delete',
    displayName: 'Delete',
  },
  {
    id: 'view',
    displayName: 'View Details',
  },
];

// Basic Grid
export const Default: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid with Checkbox Selection
export const WithCheckboxSelection: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableCheckboxSelection: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid with Radio Selection
export const WithRadioSelection: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableRadioButtonSelection: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid with Actions
export const WithActions: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    actions: sampleActions,
    actionPosition: ActionPosition.Right,
    actionColumnStyle: ActionColumnStyle.ShowDots,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid with Button Actions
export const WithButtonActions: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    actions: sampleActions,
    actionPosition: ActionPosition.Right,
    actionColumnStyle: ActionColumnStyle.ShowButtonsDirectly,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid with Pagination
export const WithPagination: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    pagination: true,
    recordsPerPage: 5,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Dark Theme Grid
export const DarkTheme: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'dark',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// Collapsed Grid
export const Collapsed: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    state: State.Collapsed,
    theme: 'light',
  },
};

// Grid without Header
export const WithoutHeader: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: false,
    showSubHeader: false,
    theme: 'light',
  },
};

// Grid without Sorting
export const WithoutSorting: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: false,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid without Filtering
export const WithoutFiltering: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: false,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Grid without Resizing
export const WithoutResizing: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: false,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};

// Empty State Grid
export const EmptyState: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: [],
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    noDataTitle: 'No users found',
    noDataHeaderTitle: 'User Management',
    theme: 'light',
  },
};

// Loading State Grid
export const Loading: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
    isLoading: true,
    theme: 'light',
  },
};

// Large Dataset Grid
export const LargeDataset: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Manager'][i % 3],
      status: ['Active', 'Inactive', 'Pending'][i % 3],
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })),
    isSort: true,
    isFilter: true,
    isResizable: true,
    pagination: true,
    recordsPerPage: 10,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};
