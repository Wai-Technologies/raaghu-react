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
  title: 'Components/Fluent Grid',
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
  {
    key: 'lastLogin',
    name: 'Last Login',
    dataType: 'date',
    isSort: true,
    isFilter: true,
    isResizable: true,
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

const sampleActions: FluentGridAction[] = [
  {
    id: 'edit',
    displayName: 'Edit',
    appearance: 'primary',
    color: 'primary',
    size: 'small',
  },
  {
    id: 'delete',
    displayName: 'Delete',
    appearance: 'secondary',
    color: 'error',
    size: 'small',
  },
  {
    id: 'view',
    displayName: 'View',
    appearance: 'outline',
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
        appearance: 'primary',
        color: 'primary',
        size: 'small',
      },
      {
        id: 'delete',
        displayName: 'Delete',
        appearance: 'secondary',
        color: 'error',
        size: 'small',
      },
      {
        id: 'view',
        displayName: 'View',
        appearance: 'outline',
        color: 'info',
        size: 'small',
      },
      {
        id: 'approve',
        displayName: 'Approve',
        appearance: 'primary',
        color: 'success',
        size: 'small',
      },
      {
        id: 'reject',
        displayName: 'Reject',
        appearance: 'outline',
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
        story: 'This grid demonstrates custom button styles for actions. Each button can have different appearances (primary, secondary, outline, subtle), colors (primary, secondary, success, warning, error, info), sizes (small, medium, large), and can be disabled. All styling is configured through the actions JSON array.',
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
    showHeader: true,
    showSubHeader: true,
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
        story: 'This grid demonstrates column resizing functionality. Hover over column borders to see the resize cursor, then drag to resize columns. Each column has defined min and max widths.',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 20%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 40%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 60%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 80%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 30%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 50%; background-color: #000000;"></div></div>',
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
        activity: '<div class="progress-bar"><div class="progress-fill" style="width: 70%; background-color: #000000;"></div></div>',
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
