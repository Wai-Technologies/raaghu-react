import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridNoScss, { FluentGridColumn, FluentGridAction, ActionPosition, ActionColumnStyle } from './rds-comp-fluent-grid-no-scss';
import { Box, Chip, Typography } from '@mui/material';

const meta: Meta<typeof RdsFluentGridNoScss> = {
  title: 'Components/RdsFluentGridNoScss',
  component: RdsFluentGridNoScss,
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
    colWidth: '100px',
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
    colWidth: '200px',
  },
  {
    key: 'email',
    name: 'Email',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    isResizable: true,
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
    minWidth: 100,
    maxWidth: 150,
    colWidth: '120px',
  },
];

const sampleData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
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
    role: 'Project Manager',
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
    role: 'Administrator',
    status: 'Active',
  },
];

const sampleActions: FluentGridAction[] = [
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
    displayName: 'View Details',
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
    showHeader: true,
    showSubHeader: true,
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
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates custom button styles for actions. Each button can have different variants (contained, outlined, text), colors (primary, secondary, success, warning, error, info), sizes (small, medium, large), and can be disabled. All styling is configured through the actions JSON array.',
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
    recordsPerPage: 3,
    showHeader: true,
    showSubHeader: true,
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
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates column resizing functionality using MUI components. Hover over column borders to see the resize cursor, then drag to resize columns.',
      },
    },
  },
};

// Non-resizable Columns
export const NonResizableColumns: Story = {
  args: {
    tableHeaders: sampleColumns.map(col => ({ ...col, isResizable: false })),
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: false,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid has column resizing disabled. Notice that there are no resize handles and columns cannot be manually resized.',
      },
    },
  },
};

// Text Truncation Demo
export const TextTruncationDemo: Story = {
  args: {
    tableHeaders: sampleColumns.map(col => ({ 
      ...col, 
      minWidth: 80, // Very narrow columns to force truncation
      colWidth: '80px'
    })),
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates text truncation with ellipsis using MUI components. Resize columns to see text truncate with "..." and hover to see full text in tooltips. Each column has its own minWidth from the headers configuration.',
      },
    },
  },
};

// Email Column Resizing Demo
export const EmailColumnResizing: Story = {
  args: {
    tableHeaders: sampleColumns.map(col => {
      if (col.key === 'email') {
        return { ...col, minWidth: 30, colWidth: '120px' }; // Very small minWidth for email
      }
      return col;
    }),
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates email column resizing with a very small minWidth (30px) using MUI components. Try resizing the email column to see how it truncates with ellipsis and shows tooltips only when needed.',
      },
    },
  },
};

// Debug Resizing Demo
export const DebugResizing: Story = {
  args: {
    tableHeaders: sampleColumns.map(col => ({ 
      ...col, 
      minWidth: 20, // Extremely small minWidth for testing
      colWidth: '100px'
    })),
    tableData: sampleData.slice(0, 3), // Just 3 rows for easier testing
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid has extremely small minWidth values (20px) for debugging resizing using MUI components. Check browser console for debug logs and try resizing columns to see if they can go below their initial width.',
      },
    },
  },
};

// HTML Content Demo - Complex Status Column with Multiple Elements
export const HtmlContentDemo: Story = {
  args: {
    tableHeaders: [
      {
        key: 'agent',
        name: 'Agent',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 200,
        colWidth: '250px',
      },
      {
        key: 'date',
        name: 'Date',
        dataType: 'date',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 120,
        colWidth: '120px',
      },
      {
        key: 'balance',
        name: 'Balance',
        dataType: 'number',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 120,
        colWidth: '120px',
      },
      {
        key: 'status',
        name: 'Status & Tags',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        allowHtml: true,
        minWidth: 200,
        colWidth: '250px',
      },
      {
        key: 'activity',
        name: 'Activity',
        dataType: 'string',
        isSort: false,
        isFilter: false,
        isResizable: true,
        allowHtml: true,
        minWidth: 150,
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
        minWidth: 100,
        colWidth: '100px',
      },
    ],
    tableData: [
      {
        id: 1,
        agent: '<img src="https://via.placeholder.com/32x32/0078d4/ffffff?text=IB" alt="Ioni Bowcher" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> <strong>Ioni Bowcher</strong><br><small style="color: #666;">Senior Developer</small>',
        date: '09/13/2015',
        balance: '$70,663.00',
        status: `
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            <span class="status-pill status-unqualified">unqualified</span>
            <span style="background: #e3f2fd; color: #1976d2; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">PRIORITY</span>
            <img src="https://via.placeholder.com/16x16/ff9800/ffffff?text=!" alt="Warning" style="width: 16px; height: 16px; border-radius: 2px;">
            <span style="background: #f3e5f5; color: #7b1fa2; padding: 2px 6px; border-radius: 8px; font-size: 10px;">VIP</span>
          </div>
        `,
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 25%; background: linear-gradient(90deg, #ff6b6b, #ffa500);"></div></div><small style="color: #666; font-size: 10px;">25% Complete</small>',
        verified: '<div class="verification-icon verified">✓</div><small style="color: #666; font-size: 10px; margin-left: 4px;">Verified</small>',
      },
      {
        id: 2,
        agent: '<img src="https://via.placeholder.com/32x32/dc3545/ffffff?text=AE" alt="Amy Elsner" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> <strong>Amy Elsner</strong><br><small style="color: #666;">Project Manager</small>',
        date: '02/09/2019',
        balance: '$82,429.00',
        status: `
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            <span class="status-pill status-negotiation">negotiation</span>
            <span style="background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">ACTIVE</span>
            <img src="https://via.placeholder.com/16x16/4caf50/ffffff?text=✓" alt="Success" style="width: 16px; height: 16px; border-radius: 2px;">
            <span style="background: #fff3e0; color: #f57c00; padding: 2px 6px; border-radius: 8px; font-size: 10px;">HOT</span>
            <span style="background: #fce4ec; color: #c2185b; padding: 2px 6px; border-radius: 8px; font-size: 10px;">NEW</span>
          </div>
        `,
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 15%; background: linear-gradient(90deg, #4caf50, #8bc34a);"></div></div><small style="color: #666; font-size: 10px;">15% Complete</small>',
        verified: '<div class="verification-icon verified">✓</div><small style="color: #666; font-size: 10px; margin-left: 4px;">Verified</small>',
      },
      {
        id: 3,
        agent: '<img src="https://via.placeholder.com/32x32/28a745/ffffff?text=AJ" alt="Asiya Javayant" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> <strong>Asiya Javayant</strong><br><small style="color: #666;">Lead Designer</small>',
        date: '05/13/2017',
        balance: '$28,334.00',
        status: `
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            <span class="status-pill status-qualified">qualified</span>
            <span style="background: #e8f5e8; color: #2e7d32; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">APPROVED</span>
            <img src="https://via.placeholder.com/16x16/2196f3/ffffff?text=★" alt="Star" style="width: 16px; height: 16px; border-radius: 2px;">
            <span style="background: #e1f5fe; color: #0277bd; padding: 2px 6px; border-radius: 8px; font-size: 10px;">PREMIUM</span>
            <span style="background: #f3e5f5; color: #7b1fa2; padding: 2px 6px; border-radius: 8px; font-size: 10px;">FEATURED</span>
          </div>
        `,
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 65%; background: linear-gradient(90deg, #2196f3, #21cbf3);"></div></div><small style="color: #666; font-size: 10px;">65% Complete</small>',
        verified: '<div class="verification-icon not-verified">✗</div><small style="color: #666; font-size: 10px; margin-left: 4px;">Pending</small>',
      },
      {
        id: 4,
        agent: '<img src="https://via.placeholder.com/32x32/9c27b0/ffffff?text=CB" alt="Charlie Brown" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> <strong>Charlie Brown</strong><br><small style="color: #666;">Data Analyst</small>',
        date: '12/01/2020',
        balance: '$45,200.00',
        status: `
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            <span class="status-pill status-qualified">qualified</span>
            <span style="background: #fff3e0; color: #f57c00; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">PENDING</span>
            <img src="https://via.placeholder.com/16x16/ff9800/ffffff?text=⏰" alt="Clock" style="width: 16px; height: 16px; border-radius: 2px;">
            <span style="background: #e0f2f1; color: #00695c; padding: 2px 6px; border-radius: 8px; font-size: 10px;">ANALYTICS</span>
            <span style="background: #f1f8e9; color: #558b2f; padding: 2px 6px; border-radius: 8px; font-size: 10px;">EXPERT</span>
          </div>
        `,
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 80%; background: linear-gradient(90deg, #9c27b0, #e91e63);"></div></div><small style="color: #666; font-size: 10px;">80% Complete</small>',
        verified: '<div class="verification-icon verified">✓</div><small style="color: #666; font-size: 10px; margin-left: 4px;">Verified</small>',
      },
      {
        id: 5,
        agent: '<img src="https://via.placeholder.com/32x32/ff5722/ffffff?text=DL" alt="Diana Lee" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px; vertical-align: middle;"> <strong>Diana Lee</strong><br><small style="color: #666;">UX Designer</small>',
        date: '08/15/2021',
        balance: '$52,800.00',
        status: `
          <div style="display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            <span class="status-pill status-negotiation">negotiation</span>
            <span style="background: #ffebee; color: #c62828; padding: 2px 6px; border-radius: 8px; font-size: 10px; font-weight: 500;">URGENT</span>
            <img src="https://via.placeholder.com/16x16/f44336/ffffff?text=!" alt="Urgent" style="width: 16px; height: 16px; border-radius: 2px;">
            <span style="background: #e8eaf6; color: #3f51b5; padding: 2px 6px; border-radius: 8px; font-size: 10px;">CREATIVE</span>
            <span style="background: #fce4ec; color: #c2185b; padding: 2px 6px; border-radius: 8px; font-size: 10px;">TRENDING</span>
          </div>
        `,
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 40%; background: linear-gradient(90deg, #ff5722, #ff9800);"></div></div><small style="color: #666; font-size: 10px;">40% Complete</small>',
        verified: '<div class="verification-icon not-verified">✗</div><small style="color: #666; font-size: 10px; margin-left: 4px;">Pending</small>',
      },
    ],
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates complex HTML content in cells using MUI components with multiple elements: profile pictures with names and titles, complex status columns with multiple tags and icons, progress bars with gradients, and verification status with descriptions. All content is rendered directly from JSON data using HTML.',
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
    showHeader: true,
    showSubHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates extremely complex HTML content combinations: employee profiles with avatars and status indicators, skill tags, complex work status information with timestamps, and detailed performance metrics with progress bars and statistics. All rendered directly from JSON data.',
      },
    },
  },
};

// Screenshot Match Demo - Exact replica of the provided screenshot
export const ScreenshotMatch: Story = {
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 20%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 40%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 60%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 80%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 30%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%; ;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%; ;"></div></div>',
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
        story: 'This grid exactly matches the provided screenshot with the same data, styling, and visual elements using MUI components. It includes profile pictures, status pills, progress bars, and verification icons rendered from HTML content in JSON data.',
      },
    },
  },
};

// Custom Renderer Demo
export const CustomRendererDemo: Story = {
  args: {
    tableHeaders: [
      {
        key: 'name',
        name: 'Name',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 200,
        colWidth: '250px',
        renderCell: (value, row) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                backgroundColor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >
              {value.charAt(0).toUpperCase()}
            </Box>
            <Typography variant="body2">{value}</Typography>
          </Box>
        ),
      },
      {
        key: 'status',
        name: 'Status',
        dataType: 'string',
        isSort: true,
        isFilter: true,
        isResizable: true,
        minWidth: 120,
        colWidth: '120px',
        renderCell: (value) => {
          const statusColors = {
            'Active': { bg: '#d4edda', color: '#155724' },
            'Inactive': { bg: '#f8d7da', color: '#721c24' },
            'Pending': { bg: '#fff3cd', color: '#856404' },
          };
          const colors = statusColors[value as keyof typeof statusColors] || { bg: '#e9ecef', color: '#495057' };
          
          return (
            <Chip 
              label={value}
              size="small"
              sx={{
                backgroundColor: colors.bg,
                color: colors.color,
                fontWeight: 500,
                '& .MuiChip-label': {
                  fontSize: '12px',
                }
              }}
            />
          );
        },
      },
      {
        key: 'progress',
        name: 'Progress',
        dataType: 'number',
        isSort: true,
        isFilter: false,
        isResizable: true,
        minWidth: 150,
        colWidth: '150px',
        renderCell: (value) => (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                flex: 1, 
                height: 8, 
                backgroundColor: 'grey.300', 
                borderRadius: 1, 
                overflow: 'hidden' 
              }}
            >
              <Box 
                sx={{ 
                  height: '100%', 
                  backgroundColor: 'primary.main', 
                  width: `${value}%`,
                  transition: 'width 0.3s ease'
                }} 
              />
            </Box>
            <Typography variant="caption" color="text.secondary">{value}%</Typography>
          </Box>
        ),
      },
    ],
    tableData: [
      { id: 1, name: 'John Doe', status: 'Active', progress: 75 },
      { id: 2, name: 'Jane Smith', status: 'Inactive', progress: 25 },
      { id: 3, name: 'Bob Johnson', status: 'Pending', progress: 90 },
      { id: 4, name: 'Alice Brown', status: 'Active', progress: 50 },
    ],
    isSort: true,
    isFilter: true,
    isResizable: true,
    showHeader: true,
    showSubHeader: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This grid demonstrates custom cell renderers using MUI components. Each cell can have its own custom rendering logic while maintaining all grid functionality.',
      },
    },
  },
};
