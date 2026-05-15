import { StoryObj, Meta } from '@storybook/react-vite';
import React, { useState } from 'react';
import RdsCompDataGrid, { RdsCompDataGridProps } from './rds-comp-data-grid';
import { GridColDef, GridRowSelectionModel, GridRowId, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

// Sample columns
const mockColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 150 },
  { field: 'lastName', headerName: 'Last Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'salary', headerName: 'Salary', width: 120, type: 'number' },
  { field: 'status', headerName: 'Status', width: 120 },
];

// Sample data
const mockRows = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com', department: 'Engineering', salary: 120000, status: 'Active' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com', department: 'Design', salary: 95000, status: 'Active' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35, email: 'bob@example.com', department: 'Sales', salary: 85000, status: 'Active' },
  { id: 4, firstName: 'Alice', lastName: 'Williams', age: 28, email: 'alice@example.com', department: 'Engineering', salary: 110000, status: 'Active' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 32, email: 'charlie@example.com', department: 'Marketing', salary: 90000, status: 'Inactive' },
  { id: 6, firstName: 'David', lastName: 'Miller', age: 40, email: 'david@example.com', department: 'Engineering', salary: 130000, status: 'Active' },
  { id: 7, firstName: 'Emma', lastName: 'Davis', age: 26, email: 'emma@example.com', department: 'Design', salary: 92000, status: 'Active' },
  { id: 8, firstName: 'Frank', lastName: 'Garcia', age: 45, email: 'frank@example.com', department: 'Sales', salary: 95000, status: 'Active' },
  { id: 9, firstName: 'Grace', lastName: 'Rodriguez', age: 29, email: 'grace@example.com', department: 'Engineering', salary: 115000, status: 'Active' },
  { id: 10, firstName: 'Henry', lastName: 'Martinez', age: 33, email: 'henry@example.com', department: 'Operations', salary: 88000, status: 'Active' },
];

const meta: Meta<typeof RdsCompDataGrid> = {
  title: 'Components/DataGrid',
  component: RdsCompDataGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'DataGrid displays tabular data with support for sorting, filtering, pagination, and row selection. Fully theme-aware with light and dark mode support.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    columns: {
      description: 'Array of column definitions',
      table: { disable: true },
    },
    rows: {
      description: 'Array of row data',
      table: { disable: true },
    },
    variant: {
      control: 'select',
      options: ['standard', 'elevated', 'outlined'],
      description: 'Display variant - standard (bordered), elevated (shadow), or outlined',
    },
    striped: {
      control: 'boolean',
      description: 'If true, displays alternating row background colors',
    },
    hoverable: {
      control: 'boolean',
      description: 'If true, rows highlight on hover',
    },
    compact: {
      control: 'boolean',
      description: 'If true, uses compact row density (smaller rows)',
    },
    bordered: {
      control: 'boolean',
      description: 'If true, displays borders around all cells',
    },
    pagination: {
      control: 'boolean',
      description: 'If true, enables pagination',
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Array of page size options for the pagination selector (e.g. [5, 10, 25, 50])',
    },
    checkboxSelection: {
      control: 'boolean',
      description: 'If true, displays a checkbox column for row selection',
    },
    disableColumnFilter: {
      control: 'boolean',
      description: 'If true, disables column filtering',
    },
    disableColumnMenu: {
      control: 'boolean',
      description: 'If true, disables the column menu',
    },
    disableColumnSorting: {
      control: 'boolean',
      description: 'If true, disables column sorting',
    },
    autoHeight: {
      control: 'boolean',
      description: 'If true, the grid auto-sizes its height to fit the rows',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsCompDataGrid>;

// ─── Default Story ─────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    columns: mockColumns,
    rows: mockRows,
    variant: 'standard',
    striped: false,
    hoverable: true,
    compact: false,
    bordered: true,
    pagination: true,
    pageSizeOptions: [5, 10, 25, 50],
    checkboxSelection: false,
  },
  render: (args) => (
    <div style={{ padding: '20px', height: '600px' }}>
      <RdsCompDataGrid {...args} />
    </div>
  ),
};
