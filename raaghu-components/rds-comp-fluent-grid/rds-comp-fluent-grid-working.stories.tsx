import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RdsFluentGrid, { FluentGridColumn, FluentGridAction } from './rds-comp-fluent-grid';
import RdsFluentGridBasic from './rds-comp-fluent-grid-basic';

const meta: Meta<typeof RdsFluentGrid> = {
  title: 'Components/RdsFluentGrid/Working Examples',
  component: RdsFluentGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Working Fluent Grid components with functional filter popups and column visibility controls.',
      },
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    isSort: {
      control: { type: 'boolean' },
    },
    isFilter: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RdsFluentGrid>;

// Sample data
const sampleHeaders: FluentGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    isSort: true,
    isFilter: true,
    minWidth: 80,
    maxWidth: 100,
  },
  {
    key: 'name',
    name: 'Name',
    isSort: true,
    isFilter: true,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    key: 'email',
    name: 'Email',
    isSort: true,
    isFilter: true,
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: 'role',
    name: 'Role',
    isSort: true,
    isFilter: true,
    minWidth: 120,
    maxWidth: 150,
  },
  {
    key: 'status',
    name: 'Status',
    isSort: true,
    isFilter: true,
    minWidth: 100,
    maxWidth: 120,
  },
  {
    key: 'lastLogin',
    name: 'Last Login',
    isSort: true,
    isFilter: true,
    minWidth: 120,
    maxWidth: 150,
  },
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Manager', status: 'Inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-13' },
  { id: 6, name: 'Diana Lee', email: 'diana.lee@example.com', role: 'User', status: 'Pending', lastLogin: '2024-01-12' },
  { id: 7, name: 'Eve Davis', email: 'eve.davis@example.com', role: 'Manager', status: 'Active', lastLogin: '2024-01-11' },
  { id: 8, name: 'Frank Miller', email: 'frank.miller@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-09' },
  { id: 9, name: 'Grace Taylor', email: 'grace.taylor@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-08' },
  { id: 10, name: 'Henry Wilson', email: 'henry.wilson@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-07' },
];

const sampleActions: FluentGridAction[] = [
  { id: 'edit', displayName: 'Edit' },
  { id: 'delete', displayName: 'Delete' },
  { id: 'view', displayName: 'View' },
];

// Main Fluent Grid (Fluent UI)
export const FluentGridWorking: Story = {
  args: {
    tableHeaders: sampleHeaders,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    enableCheckboxSelection: true,
    showHeader: true,
    showSubHeader: true,
    pagination: true,
    recordsPerPage: 5,
    pageSizeOptions: [5, 10, 25, 50],
    showRecordsPerPage: true,
    actions: sampleActions,
    noDataHeaderTitle: 'User Management',
    theme: 'light',
  },
  render: (args) => {
    const handleActionSelection = (rowData: any, actionId: string) => {
      console.log('Action selected:', { rowData, actionId });
      alert(`Action: ${actionId} on row: ${rowData.name}`);
    };

    const handleRowSelect = (data: any) => {
      console.log('Row selected:', data);
    };

    const handlePagination = (currentPage: number, recordsPerPage: number) => {
      console.log('Pagination changed:', { currentPage, recordsPerPage });
    };

    const handleSortChange = (sortState: any) => {
      console.log('Sort changed:', sortState);
    };

    const handleFilterChange = (filterState: any) => {
      console.log('Filter changed:', filterState);
    };

    const handleColumnVisibilityChange = (visibleColumns: string[]) => {
      console.log('Column visibility changed:', visibleColumns);
    };

    return (
      <RdsFluentGrid
        {...args}
        onActionSelection={handleActionSelection}
        onRowSelect={handleRowSelect}
        onPaginationHandler={handlePagination}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onColumnVisibilityChange={handleColumnVisibilityChange}
      />
    );
  },
};

// Basic Fluent Grid (Material-UI)
export const BasicFluentGridWorking: Story = {
  args: {
    tableHeaders: sampleHeaders,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    enableCheckboxSelection: true,
    showHeader: true,
    showSubHeader: true,
    pagination: true,
    recordsPerPage: 5,
    actions: sampleActions,
    noDataHeaderTitle: 'User Management (Basic)',
    theme: 'light',
  },
  render: (args) => {
    const handleActionSelection = (rowData: any, actionId: string) => {
      console.log('Action selected:', { rowData, actionId });
      alert(`Action: ${actionId} on row: ${rowData.name}`);
    };

    const handleRowSelect = (data: any) => {
      console.log('Row selected:', data);
    };

    const handlePagination = (currentPage: number, recordsPerPage: number) => {
      console.log('Pagination changed:', { currentPage, recordsPerPage });
    };

    const handleSortChange = (sortState: any) => {
      console.log('Sort changed:', sortState);
    };

    const handleFilterChange = (filterState: any) => {
      console.log('Filter changed:', filterState);
    };

    return (
      <RdsFluentGridBasic
        {...args}
        onActionSelection={handleActionSelection}
        onRowSelect={handleRowSelect}
        onPaginationHandler={handlePagination}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
    );
  },
};

// Instructions story
export const Instructions: Story = {
  render: () => (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Filter Popup Instructions</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>How to Test the Filter Popup:</h3>
        <ol>
          <li><strong>Test Button:</strong> Click the "Test Popup" button in the header to verify the popup works</li>
          <li><strong>Filter Icons:</strong> Click any filter icon (three horizontal lines) in the column headers</li>
          <li><strong>Column Visibility:</strong> Use checkboxes to show/hide columns</li>
          <li><strong>Filters:</strong> Apply text filters with different operators (contains, equals, etc.)</li>
          <li><strong>Console Logs:</strong> Check browser console for click events and state changes</li>
        </ol>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Features Available:</h3>
        <ul>
          <li>✅ Sortable columns (click column headers)</li>
          <li>✅ Filterable columns (click filter icons)</li>
          <li>✅ Column visibility control (checkboxes in popup)</li>
          <li>✅ Pagination with page size options</li>
          <li>✅ Row selection (checkboxes)</li>
          <li>✅ Action buttons (Edit, Delete, View)</li>
          <li>✅ Search functionality</li>
          <li>✅ Responsive design</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Troubleshooting:</h3>
        <ul>
          <li>If filter icons don't work, try the "Test Popup" button first</li>
          <li>Check browser console for error messages</li>
          <li>Ensure you're clicking directly on the filter icon, not the column header</li>
          <li>Try refreshing the page if the popup doesn't appear</li>
        </ul>
      </div>
    </div>
  ),
};