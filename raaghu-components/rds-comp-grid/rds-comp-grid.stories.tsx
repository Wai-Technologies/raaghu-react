import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Box, Stack, Typography, Divider } from '@mui/material';
// import RdsCompGridNoScss, { RdsCompGridColumn, RdsCompGridAction, ActionPosition, State, ActionColumnStyle } from './rds-comp-grid-no-scss';
import RdsCompGrid, { RdsCompGridColumn, RdsCompGridAction, ActionPosition, State, ActionColumnStyle, RdsCompGridRef } from './rds-comp-grid';

// const RdsCompGrid = RdsCompGridNoScss;

const meta: Meta<typeof RdsCompGrid> = {
  title: 'Components/Grid',
  component: RdsCompGrid,
  parameters: {
    layout: 'padded',
  },
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
    enableInlineEdit: {
      control: 'boolean',
      description: 'Enable inline editing functionality globally',
      defaultValue: true,
    },
    inlineEditMode: {
      control: 'select',
      options: ['cell', 'row'],
      description: 'Inline edit mode: cell-by-cell editing (default) or row-based editing',
      defaultValue: 'cell',
      type: { name: 'string', required: false },
    },
    enableRowSwapping: {
      control: 'boolean',
      description: 'Enable row drag and drop functionality for reordering',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
    enableColumnSwapping: {
      control: 'boolean',
      description: 'Enable column drag and drop functionality for reordering',
      defaultValue: false,
      type: { name: 'boolean', required: false },
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
type Story = StoryObj<typeof RdsCompGrid>;

// Sample data
const sampleColumns: RdsCompGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    dataType: 'number',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: false,
    minWidth: 80,
    maxWidth: 120,
    colWidth: '100px',
  },
  {
    key: 'name',
    name: 'Name',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: true,
    required: true,
    minWidth: 150,
    maxWidth: 300,
    isBold: true,
    colWidth: '200px',
  },
  {
    key: 'email',
    name: 'Email',
    dataType: 'email',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: true,
    required: true,
    minWidth: 80, // Very small minWidth to allow significant reduction
    maxWidth: 400,
    colWidth: '200px',
  },
  {
    key: 'role',
    name: 'Role',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: true,
    minWidth: 120,
    maxWidth: 200,
    colWidth: '150px',
  },
  {
    key: 'status',
    name: 'Status',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: false, // Status is typically not editable
    minWidth: 100,
    maxWidth: 150,
    colWidth: '120px',
  },
  {
    key: 'lastLogin',
    name: 'Last Login',
    dataType: 'date',
    isSort: true,
    isFilter: true,
    isResizable: true,
    isEditable: true,
    minWidth: 150,
    maxWidth: 200,
    colWidth: '180px',
  },
];

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
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
    role: 'Project Manager',
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
    role: 'Administrator',
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
    role: 'Project Manager',
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

const sampleActions: RdsCompGridAction[] = [
  {
    id: 'edit',
    displayName: 'Edit',
    variant: 'contained',
    color: 'primary',
    size: 'small',
  },
  {
    id: 'delete',
    displayName: 'Delete',
    variant: 'contained',
    color: 'error',
    size: 'small',
  },
  {
    id: 'view',
    displayName: 'View',
    variant: 'outlined',
    color: 'info',
    size: 'small',
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Data updated:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic grid with inline editing enabled. Click on any editable cell to start editing. Changes are automatically saved when you click outside or press Enter, and immediately reflected in the grid.',
      },
    },
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Data updated with selection:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Edit completed with selection:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with checkbox selection and inline editing. You can select rows and edit cells simultaneously. All changes are automatically saved and reflected in the grid.',
      },
    },
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Data updated with actions:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Edit completed with actions:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with action buttons and inline editing. Edit cells and use action buttons simultaneously. All data changes are automatically saved and immediately visible.',
      },
    },
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Button actions - Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Button actions - Edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with button actions and inline editing. Edit cells and use action buttons simultaneously. All data changes are automatically saved and immediately visible.',
      },
    },
  },
};

// Grid with Custom Button Styles
export const WithCustomButtonStyles: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData.slice(0, 5), // Show only first 5 rows for better visibility
    isSort: true,
    isFilter: true,
    isResizable: true,
    actions: [
      {
        id: 'edit',
        displayName: 'Edit',
        variant: 'contained',
        color: 'primary',
        size: 'small',
      },
      {
        id: 'delete',
        displayName: 'Delete',
        variant: 'contained',
        color: 'error',
        size: 'small',
      },
      {
        id: 'view',
        displayName: 'View',
        variant: 'outlined',
        color: 'info',
        size: 'small',
      },
      {
        id: 'approve',
        displayName: 'Approve',
        variant: 'contained',
        color: 'success',
        size: 'small',
      },
      {
        id: 'reject',
        displayName: 'Reject',
        variant: 'outlined',
        color: 'error',
        size: 'small',
        disabled: true,
      },
    ],
    actionPosition: ActionPosition.Right,
    actionColumnStyle: ActionColumnStyle.ShowButtonsDirectly,
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    showHeader: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Custom buttons - Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Custom buttons - Edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates custom button styles for actions with inline editing. Each button can have different appearances and colors. Edit cells and use action buttons simultaneously. All data changes are automatically saved and immediately visible.',
      },
    },
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    showHeader: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Data updated with pagination:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Edit completed with pagination:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Grid with pagination and inline editing. Edit cells across different pages. All changes are automatically saved and persist when navigating between pages.',
      },
    },
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
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: false,
    showSubHeader: false,
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
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showSubHeader: true,
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
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showSubHeader: true,
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
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showSubHeader: true,
    noDataTitle: 'No users found',
    noDataHeaderTitle: 'User Management',
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
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Large dataset - Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Large dataset - Edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Large dataset grid with pagination and inline editing. Edit cells across different pages. All changes are automatically saved and persist when navigating between pages.',
      },
    },
  },
};

// Column Resizing Demo
export const ColumnResizing: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Column resizing - Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Column resizing - Edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates column resizing functionality with inline editing. Hover over column borders to resize columns and click cells to edit them. All changes are automatically saved and immediately visible.',
      },
    },
  },
};

// Complex HTML Combinations Demo
export const ComplexHtmlDemo: Story = {
  args: {
    tableHeaders: [
      {
        key: 'employee',
        name: 'Employee Profile',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 250,
        colWidth: '300px',
      },
      {
        key: 'status',
        name: 'Work Status',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 300,
        colWidth: '350px',
      },
      {
        key: 'performance',
        name: 'Performance Metrics',
        dataType: 'string',
        isSort: false,
        isFilter: false,
        isResizable: true,
        allowHtml: true,
        minWidth: 200,
        colWidth: '250px',
      },
    ],
    tableData: [
      {
        id: 1,
        employee: `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="position: relative;">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face" alt="Sarah Johnson" style="width: 48px; height: 48px; border-radius: 50%; border: 3px solid #e0e0e0;">
              <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; background: #4caf50; border-radius: 50%; border: 2px solid white;"></div>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #333;">Sarah Johnson</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Senior Employee</div>
              <div style="display: flex; gap: 4px;">
                <span style="background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Leadership</span>
                <span style="background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Management</span>
                <span style="background: #fff3e0; color: #f57c00; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Strategy</span>
              </div>
            </div>
          </div>
        `,
        status: `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
              <span class="status-pill status-qualified">qualified</span>
              <span style="background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">ACTIVE</span>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=16&h=16&fit=crop&crop=face" alt="Success" style="width: 16px; height: 16px; border-radius: 2px;">
              <span style="background: #f3e5f5; color: #7b1fa2; padding: 2px 6px; border-radius: 8px; font-size: 10px;">SENIOR</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #666;">
              <span>Last active: 2 hours ago</span>
              <span style="background: #e0f2f1; color: #00695c; padding: 1px 4px; border-radius: 4px;">Online</span>
            </div>
          </div>
        `,
        performance: `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px; color: #666;">
                <span>Work Completion</span>
                <span>85%</span>
              </div>
              <div class="progress-bar" style="height: 6px;">
                <div class="progress-fill" style="width: 85%; background: linear-gradient(90deg, #4caf50, #8bc34a);"></div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px;">
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">24</div>
                <div style="color: #666; font-size: 10px;">Tasks</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">18</div>
                <div style="color: #666; font-size: 10px;">Completed</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">6</div>
                <div style="color: #666; font-size: 10px;">Pending</div>
              </div>
            </div>
          </div>
        `,
      },
      {
        id: 2,
        employee: `
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="position: relative;">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face" alt="Michael Chen" style="width: 48px; height: 48px; border-radius: 50%; border: 3px solid #e0e0e0;">
              <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; background: #ff9800; border-radius: 50%; border: 2px solid white;"></div>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 14px; color: #333;">Michael Chen</div>
              <div style="font-size: 12px; color: #666; margin-bottom: 4px;">Team Lead</div>
              <div style="display: flex; gap: 4px;">
                <span style="background: #e8eaf6; color: #3f51b5; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Planning</span>
                <span style="background: #fce4ec; color: #c2185b; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Coordination</span>
                <span style="background: #f3e5f5; color: #7b1fa2; padding: 2px 6px; border-radius: 4px; font-size: 10px;">Reporting</span>
              </div>
            </div>
          </div>
        `,
        status: `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
              <span class="status-pill status-negotiation">negotiation</span>
              <span style="background: #fff3e0; color: #f57c00; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">PENDING</span>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face" alt="Clock" style="width: 16px; height: 16px; border-radius: 2px;">
              <span style="background: #e0f2f1; color: #00695c; padding: 2px 6px; border-radius: 8px; font-size: 10px;">LEAD</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #666;">
              <span>Last active: 1 day ago</span>
              <span style="background: #fff3e0; color: #f57c00; padding: 1px 4px; border-radius: 4px;">Away</span>
            </div>
          </div>
        `,
        performance: `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px; color: #666;">
                <span>Project Progress</span>
                <span>45%</span>
              </div>
              <div class="progress-bar" style="height: 6px;">
                <div class="progress-fill" style="width: 45%; background: linear-gradient(90deg, #ff9800, #ffc107);"></div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 11px;">
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">12</div>
                <div style="color: #666; font-size: 10px;">Projects</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">5</div>
                <div style="color: #666; font-size: 10px;">Active</div>
              </div>
              <div style="text-align: center;">
                <div style="font-weight: 600; color: #333;">7</div>
                <div style="color: #666; font-size: 10px;">Completed</div>
              </div>
            </div>
          </div>
        `,
      },
    ],
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates extremely complex HTML content combinations: user profiles with avatars and status indicators, skill tags, complex status information with timestamps, and detailed metrics with progress bars and statistics. All rendered directly from JSON data.',
      },
    },
  },
};

// Screenshot Match Demo - Exact replica of the provided screenshot
export const AdvancedHtmlContentDemo: Story = {
  args: {
    tableHeaders: [
      {
        key: 'name',
        name: 'Name',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 120,
        colWidth: '150px',
      },
      {
        key: 'country',
        name: 'Country',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 100,
        colWidth: '120px',
      },
      {
        key: 'agent',
        name: 'Agent',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 150,
        colWidth: '180px',
      },
      {
        key: 'date',
        name: 'Date',
        dataType: 'date',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 100,
        colWidth: '120px',
      },
      {
        key: 'balance',
        name: 'Balance',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 100,
        colWidth: '120px',
      },
      {
        key: 'status',
        name: 'Status',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 100,
        colWidth: '120px',
      },
      {
        key: 'activity',
        name: 'Activity',
        dataType: 'string',
        isSort: false,
        isFilter: false,
        isResizable: true,
        allowHtml: true,
        minWidth: 120,
        colWidth: '150px',
      },
      {
        key: 'verified',
        name: 'Verified',
        dataType: 'string',
        isSort: false,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 80,
        colWidth: '100px',
      },
    ],
    tableData: [
      {
        id: 1,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">J</div><span>James Butt</span></div>',
        country: 'Algeria',
        agent: '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=24&h=24&fit=crop&crop=face" alt="Ioni Bowcher" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Ioni Bowcher',
        date: '09/13/2015',
        balance: '$70,663.00',
        status: '<span class="status-pill status-unqualified">unqualified</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
      {
        id: 2,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">J</div><span>Josephine Darakjy</span></div>',
        country: 'Egypt',
        agent: '<img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=24&h=24&fit=crop&crop=face" alt="Amy Elsner" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Amy Elsner',
        date: '02/09/2019',
        balance: '$82,429.00',
        status: '<span class="status-pill status-proposal">proposal</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 20%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
      {
        id: 3,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">A</div><span>Art Venere</span></div>',
        country: 'Panama',
        agent: '<img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=24&h=24&fit=crop&crop=face" alt="Asiya Javayant" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Asiya Javayant',
        date: '05/13/2017',
        balance: '$28,334.00',
        status: '<span class="status-pill status-qualified">qualified</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%;"></div></div>',
        verified: '<div class="verification-icon not-verified">✗</div>',
      },
      {
        id: 4,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">L</div><span>Lenna Paprocki</span></div>',
        country: 'Slovenia',
        agent: '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face" alt="Xuxue Feng" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Xuxue Feng',
        date: '09/15/2020',
        balance: '$88,521.00',
        status: '<span class="status-pill status-new">new</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 40%;"></div></div>',
        verified: '<div class="verification-icon not-verified">✗</div>',
      },
      {
        id: 5,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">D</div><span>Donette Foller</span></div>',
        country: 'South Africa',
        agent: '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=24&h=24&fit=crop&crop=face" alt="Asiya Javayant" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Asiya Javayant',
        date: '05/20/2016',
        balance: '$93,905.00',
        status: '<span class="status-pill status-proposal">proposal</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 60%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
      {
        id: 6,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">S</div><span>Simona Morasca</span></div>',
        country: 'Egypt',
        agent: '<img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop&crop=face" alt="Ivan Magalhaes" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Ivan Magalhaes',
        date: '02/16/2018',
        balance: '$50,041.00',
        status: '<span class="status-pill status-qualified">qualified</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 80%;"></div></div>',
        verified: '<div class="verification-icon not-verified">✗</div>',
      },
      {
        id: 7,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">M</div><span>Mitsue Tollner</span></div>',
        country: 'Paraguay',
        agent: '<img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=24&h=24&fit=crop&crop=face" alt="Ivan Magalhaes" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Ivan Magalhaes',
        date: '02/19/2018',
        balance: '$58,706.00',
        status: '<span class="status-pill status-renewal">renewal</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 30%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
      {
        id: 8,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">L</div><span>Leota Dilliard</span></div>',
        country: 'Serbia',
        agent: '<img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop&crop=face" alt="Onyama Limba" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Onyama Limba',
        date: '08/13/2019',
        balance: '$26,640.00',
        status: '<span class="status-pill status-renewal">renewal</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
      {
        id: 9,
        name: '<div style="display: flex; align-items: center; gap: 8px;"><div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0078d4; color: white; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold;">S</div><span>Sage Wieser</span></div>',
        country: 'Egypt',
        agent: '<img src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=24&h=24&fit=crop&crop=face" alt="Ivan Magalhaes" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> Ivan Magalhaes',
        date: '11/21/2018',
        balance: '$65,369.00',
        status: '<span class="status-pill status-unqualified">unqualified</span>',
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%;"></div></div>',
        verified: '<div class="verification-icon verified">✓</div>',
      },
    ],
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: false,
    showSubHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid exactly matches the provided screenshot with the same data, styling, and visual elements. It includes profile pictures, status pills, progress bars, and verification icons rendered from HTML content in JSON data.',
      },
    },
  },
};

// Inline Editing Demo
export const InlineEditing: Story = {
  args: {
    tableHeaders: [
      {
        key: 'id',
        name: 'ID',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: false,
        minWidth: 80,
        maxWidth: 120,
        colWidth: '100px',
      },
      {
        key: 'name',
        name: 'Name',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        required: true,
        minWidth: 150,
        maxWidth: 300,
        isBold: true,
        colWidth: '200px',
      },
      {
        key: 'email',
        name: 'Email',
        dataType: 'email',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        required: true,
        minWidth: 200,
        maxWidth: 300,
        colWidth: '250px',
      },
      {
        key: 'age',
        name: 'Age',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 80,
        maxWidth: 120,
        colWidth: '100px',
        validateCell: (value: any) => {
          const age = Number(value);
          if (age < 18) return 'Age must be at least 18';
          if (age > 100) return 'Age must be less than 100';
          return null;
        },
      },
      {
        key: 'salary',
        name: 'Salary',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 120,
        maxWidth: 200,
        colWidth: '150px',
      },
      {
        key: 'department',
        name: 'Department',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 120,
        maxWidth: 200,
        colWidth: '150px',
      },
      {
        key: 'status',
        name: 'Status',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: false, // This column is not editable
        minWidth: 100,
        maxWidth: 150,
        colWidth: '120px',
      },
    ],
    tableData: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 28,
        salary: 75000,
        department: 'Engineering',
        status: 'Active',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 32,
        salary: 82000,
        department: 'Marketing',
        status: 'Active',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        age: 45,
        salary: 95000,
        department: 'Sales',
        status: 'Inactive',
      },
      {
        id: 4,
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        age: 29,
        salary: 68000,
        department: 'HR',
        status: 'Active',
      },
      {
        id: 5,
        name: 'Charlie Wilson',
        email: 'charlie.wilson@example.com',
        age: 35,
        salary: 88000,
        department: 'Engineering',
        status: 'Active',
      },
    ],
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Cell edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates inline editing functionality with auto-save. Click on any editable cell to start editing. Changes are automatically saved when you click outside or press Enter. All data changes are immediately reflected in the grid with validation for required fields, data types, and custom validation rules.',
      },
    },
  },
};

// Inline Editing with Different Data Types
export const InlineEditingDataTypes: Story = {
  args: {
    tableHeaders: [
      {
        key: 'text',
        name: 'Text Field',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 150,
        colWidth: '200px',
      },
      {
        key: 'number',
        name: 'Number Field',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 120,
        colWidth: '150px',
      },
      {
        key: 'email',
        name: 'Email Field',
        dataType: 'email',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 200,
        colWidth: '250px',
      },
      {
        key: 'url',
        name: 'URL Field',
        dataType: 'url',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 200,
        colWidth: '250px',
      },
      {
        key: 'date',
        name: 'Date Field',
        dataType: 'date',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 120,
        colWidth: '150px',
      },
      {
        key: 'datetime',
        name: 'DateTime Field',
        dataType: 'datetime',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 180,
        colWidth: '200px',
      },
    ],
    tableData: [
      {
        id: 1,
        text: 'Sample text',
        number: 42,
        email: 'test@example.com',
        url: 'https://example.com',
        date: '2024-01-15',
        datetime: '2024-01-15T10:30:00',
      },
      {
        id: 2,
        text: 'Another text',
        number: 123.45,
        email: 'user@domain.com',
        url: 'https://google.com',
        date: '2024-02-20',
        datetime: '2024-02-20T14:15:30',
      },
      {
        id: 3,
        text: 'Third entry',
        number: 999,
        email: 'admin@company.org',
        url: 'https://github.com',
        date: '2024-03-10',
        datetime: '2024-03-10T09:45:15',
      },
    ],
    enableInlineEdit: true,
    inlineEditMode: 'cell',
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Data type edit:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Data type edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates inline editing with different data types and auto-save. Each column uses the appropriate input type based on its dataType property. All changes are automatically saved and immediately reflected in the grid.',
      },
    },
  },
};

// Row-based Inline Editing Demo
export const RowBasedInlineEditing: Story = {
  args: {
    tableHeaders: [
      {
        key: 'id',
        name: 'ID',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: false,
        minWidth: 80,
        maxWidth: 120,
        colWidth: '100px',
      },
      {
        key: 'name',
        name: 'Name',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        required: true,
        minWidth: 150,
        maxWidth: 300,
        isBold: true,
        colWidth: '200px',
      },
      {
        key: 'email',
        name: 'Email',
        dataType: 'email',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        required: true,
        minWidth: 200,
        maxWidth: 300,
        colWidth: '250px',
      },
      {
        key: 'department',
        name: 'Department',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        isEditable: true,
        minWidth: 120,
        maxWidth: 200,
        colWidth: '150px',
      },
    ],
    tableData: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Engineering',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        department: 'Marketing',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        department: 'Sales',
      },
    ],
    enableInlineEdit: true,
    inlineEditMode: 'row',
    isSort: true,
    isFilter: true,
    isResizable: true,
    enableRowSwapping: false,
    enableColumnSwapping: false,
    showHeader: true,
    showSubHeader: true,
    onCellEdit: (rowId, columnKey, newValue, oldValue) => {
      console.log('Row edit - Cell edited:', { rowId, columnKey, newValue, oldValue });
    },
    onCellEditComplete: (rowId, columnKey, newValue, isValid) => {
      console.log('Row edit - Cell edit completed:', { rowId, columnKey, newValue, isValid });
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates row-based inline editing mode. Click "Edit Row" to edit multiple cells at once, then click "Save" to save all changes. All data changes are automatically saved and immediately reflected in the grid.',
      },
    },
  },
};


// Grid Ref Example Story
export const GridRefExample: Story = {
  render: () => {
    const gridRef = useRef<RdsCompGridRef>(null);
    const [gridInfo, setGridInfo] = useState<string>('');

    const sampleData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', salary: 75000, status: 'Active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, department: 'Marketing', salary: 65000, status: 'Active' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Sales', salary: 70000, status: 'Inactive' },
      { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 32, department: 'Engineering', salary: 80000, status: 'Active' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, department: 'HR', salary: 60000, status: 'Active' },
    ];

    const sampleHeaders: RdsCompGridColumn[] = [
      { key: 'id', name: 'ID', dataType: 'number', isSort: true, isFilter: true, isEditable: false },
      { key: 'name', name: 'Name', dataType: 'string', isSort: true, isFilter: true, isEditable: true, required: true },
      { key: 'email', name: 'Email', dataType: 'email', isSort: true, isFilter: true, isEditable: true, required: true },
      { key: 'age', name: 'Age', dataType: 'number', isSort: true, isFilter: true, isEditable: true },
      { key: 'department', name: 'Department', dataType: 'string', isSort: true, isFilter: true, isEditable: true },
      { key: 'salary', name: 'Salary', dataType: 'number', isSort: true, isFilter: true, isEditable: true },
      { key: 'status', name: 'Status', dataType: 'string', isSort: true, isFilter: true, isEditable: true },
    ];

    const updateGridInfo = () => {
      if (gridRef.current) {
        const info = `
          Rows: ${gridRef.current.getRowCount()}
          Filtered Rows: ${gridRef.current.getFilteredRowCount()}
          Selected Rows: ${gridRef.current.getSelectedRowCount()}
          Current Page: ${gridRef.current.getCurrentPage()}
          Total Pages: ${gridRef.current.getTotalPages()}
          Visible Columns: ${gridRef.current.getVisibleColumns().length}
          Is Collapsed: ${gridRef.current.isCollapsed()}
          Is Editing: ${gridRef.current.isEditing()}
        `;
        setGridInfo(info);
      }
    };

    const handleAddRow = () => {
      if (gridRef.current) {
        const newRow = {
          id: Date.now(),
          name: 'New Employee',
          email: 'new@example.com',
          age: 25,
          department: 'New Department',
          salary: 50000,
          status: 'Active'
        };
        gridRef.current.addRow(newRow);
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleFilterByName = () => {
      if (gridRef.current) {
        gridRef.current.applyFilter('name', 'John', 'contains');
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleSortBySalary = () => {
      if (gridRef.current) {
        gridRef.current.setSort('salary', 'desc');
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleClearFilters = () => {
      if (gridRef.current) {
        gridRef.current.clearFilters();
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleSelectAll = () => {
      if (gridRef.current) {
        gridRef.current.selectAll();
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleClearSelection = () => {
      if (gridRef.current) {
        gridRef.current.clearSelection();
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleExportData = () => {
      if (gridRef.current) {
        const csvData = gridRef.current.exportData('csv');
        console.log('CSV Export:', csvData);
        alert('CSV data exported to console!');
      }
    };

    const handleToggleCollapse = () => {
      if (gridRef.current) {
        gridRef.current.toggleCollapse();
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleHideColumns = () => {
      if (gridRef.current) {
        gridRef.current.setColumnVisibility(['salary', 'age'], false);
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    const handleShowAllColumns = () => {
      if (gridRef.current) {
        gridRef.current.showAllColumns();
        setTimeout(() => { updateGridInfo(); }, 500);
      }
    };

    return (
      <Box>
        <CssBaseline />
        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Grid Ref Example - Programmatic Control
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This example demonstrates how to use the grid ref to programmatically control the grid,
            similar to major grid libraries.
          </Typography>
          
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} mb={2}>
            <Button variant="outlined" size="small" onClick={handleAddRow}>
              Add Row
            </Button>
            <Button variant="outlined" size="small" onClick={handleFilterByName}>
              Filter by Name (John)
            </Button>
            <Button variant="outlined" size="small" onClick={handleSortBySalary}>
              Sort by Salary (Desc)
            </Button>
            <Button variant="outlined" size="small" onClick={handleClearFilters}>
              Clear Filters
            </Button>
            <Button variant="outlined" size="small" onClick={handleSelectAll}>
              Select All
            </Button>
            <Button variant="outlined" size="small" onClick={handleClearSelection}>
              Clear Selection
            </Button>
            <Button variant="outlined" size="small" onClick={handleExportData}>
              Export CSV
            </Button>
            <Button variant="outlined" size="small" onClick={handleToggleCollapse}>
              Toggle Collapse
            </Button>
            <Button variant="outlined" size="small" onClick={handleHideColumns}>
              Hide Salary & Age
            </Button>
            <Button variant="outlined" size="small" onClick={handleShowAllColumns}>
              Show All Columns
            </Button>
            <Button variant="outlined" size="small" onClick={updateGridInfo}>
              Refresh Info
            </Button>
          </Stack>

          <Box p={2} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="subtitle2" gutterBottom>
              Grid Information:
            </Typography>
            <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
              {gridInfo || 'Click "Refresh Info" to see grid state'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <RdsCompGrid
          ref={gridRef}
          tableHeaders={sampleHeaders}
          tableData={sampleData}
          enableCheckboxSelection={true}
          enableInlineEdit={true}
          inlineEditMode="cell"
          isSort={true}
          isFilter={true}
          isResizable={true}
          showHeader={true}
          showSubHeader={true}
          pagination={true}
          recordsPerPage={10}
          onRowSelect={(data) => {
            console.log('Row selected:', data);
            updateGridInfo();
          }}
          onDataChange={(newData) => {
            console.log('Data changed:', newData);
            updateGridInfo();
          }}
        />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates the comprehensive grid ref API that provides programmatic control over the grid, similar to major grid libraries.

**Key Features Demonstrated:**
- **Data Management**: Add, update, delete rows programmatically
- **Filtering**: Apply and clear filters programmatically
- **Sorting**: Set sort order programmatically
- **Selection**: Select all, clear selection, get selected rows
- **Column Management**: Show/hide columns, get column info
- **Grid State**: Toggle collapse, get grid information
- **Export**: Export data in different formats
- **Real-time Updates**: Grid info updates automatically

**Available Methods:**
- \`getData()\`, \`setData()\`, \`addRow()\`, \`updateRow()\`, \`deleteRow()\`
- \`getFilters()\`, \`setFilters()\`, \`clearFilters()\`, \`applyFilter()\`
- \`getSortState()\`, \`setSort()\`, \`clearSort()\`
- \`getSelectedRows()\`, \`selectAll()\`, \`clearSelection()\`
- \`getVisibleColumns()\`, \`setColumnVisibility(columnKeys, visible)\`, \`showAllColumns()\`
- \`isCollapsed()\`, \`toggleCollapse()\`, \`expand()\`, \`collapse()\`
- \`exportData()\`, \`refresh()\`, \`scrollToRow()\`
- \`getRowCount()\`, \`getColumnCount()\`, \`getFilteredRowCount()\`

**Column Visibility Examples:**
- \`setColumnVisibility('salary', false)\` - Hide single column
- \`setColumnVisibility(['salary', 'age'], false)\` - Hide multiple columns
- \`setColumnVisibility(['name', 'email'], true)\` - Show multiple columns

This makes the grid highly programmable and suitable for complex applications where you need to control the grid state from external components or business logic.
        `,
      },
    },
  },
};