import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridNoScss, { FluentGridColumn, FluentGridAction, ActionPosition, ActionColumnStyle } from './rds-comp-fluent-grid-no-scss';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const meta: Meta<typeof RdsFluentGridNoScss> = {
  title: 'Components/RdsFluentGridNoScss',
  component: RdsFluentGridNoScss,
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
};

export default meta;
type Story = StoryObj<typeof RdsFluentGridNoScss>;

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
];

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Manager',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'Active',
  },
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

// Grid with Pagination
export const WithPagination: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    pagination: true,
    recordsPerPage: 3,
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
