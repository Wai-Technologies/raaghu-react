import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridBasic, { FluentGridColumn, FluentGridAction, ActionPosition, State, ActionColumnStyle } from './rds-comp-fluent-grid-basic';

// Create MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

// Generate sample data
const generateSampleData = (count: number) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
      salary: Math.floor(Math.random() * 100000) + 50000,
      status: ['Active', 'Inactive', 'Pending'][i % 3],
      joinDate: new Date(2020 + (i % 4), (i % 12), (i % 28) + 1).toISOString().split('T')[0],
    });
  }
  return data;
};

const sampleData = generateSampleData(50);

const sampleHeaders: FluentGridColumn[] = [
  {
    key: 'id',
    name: 'ID',
    dataType: 'number',
    isSort: true,
    isFilter: true,
    minWidth: 80,
    maxWidth: 100,
  },
  {
    key: 'name',
    name: 'Name',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    minWidth: 150,
    maxWidth: 200,
  },
  {
    key: 'email',
    name: 'Email',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    minWidth: 200,
    maxWidth: 300,
  },
  {
    key: 'department',
    name: 'Department',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    minWidth: 120,
    maxWidth: 150,
  },
  {
    key: 'salary',
    name: 'Salary',
    dataType: 'number',
    isSort: true,
    isFilter: true,
    minWidth: 100,
    maxWidth: 120,
  },
  {
    key: 'status',
    name: 'Status',
    dataType: 'string',
    isSort: true,
    isFilter: true,
    minWidth: 100,
    maxWidth: 120,
  },
  {
    key: 'joinDate',
    name: 'Join Date',
    dataType: 'date',
    isSort: true,
    isFilter: true,
    minWidth: 120,
    maxWidth: 150,
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
    displayName: 'View',
  },
];

const meta: Meta<typeof RdsFluentGridBasic> = {
  title: 'Components/RdsFluentGridBasic/FilterPopup',
  component: RdsFluentGridBasic,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Fluent Grid Basic with filter popup functionality. Click the filter icon in any column header to open the popup with column visibility and filtering controls.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ height: '600px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    pagination: {
      control: 'boolean',
      description: 'Enable pagination',
      defaultValue: true,
    },
    recordsPerPage: {
      control: 'number',
      description: 'Number of records per page',
      defaultValue: 10,
    },
    isSort: {
      control: 'boolean',
      description: 'Enable sorting',
      defaultValue: true,
    },
    isFilter: {
      control: 'boolean',
      description: 'Enable filtering',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFilterPopup: Story = {
  render: (args) => {
    const [data, setData] = useState(sampleData);
    
    const handlePaginationChange = (page: number, pageSize: number) => {
      console.log('Pagination changed:', { page, pageSize });
    };

    const handleSortChange = (sortState: any) => {
      console.log('Sort changed:', sortState);
    };

    const handleFilterChange = (filterState: any) => {
      console.log('Filter changed:', filterState);
    };

    const handleActionSelection = (rowData: any, actionId: string) => {
      console.log('Action selected:', { rowData, actionId });
    };

    return (
      <RdsFluentGridBasic
        {...args}
        tableHeaders={sampleHeaders}
        tableData={data}
        actions={sampleActions}
        onPaginationHandler={handlePaginationChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        onActionSelection={handleActionSelection}
        pagination={true}
        recordsPerPage={10}
        isSort={true}
        isFilter={true}
        enableCheckboxSelection={true}
        showHeader={true}
        showSubHeader={true}
        noDataHeaderTitle="Employee Data Grid"
      />
    );
  },
  args: {
    pagination: true,
    recordsPerPage: 10,
    isSort: true,
    isFilter: true,
    enableCheckboxSelection: true,
  },
};

export const LargeDataset: Story = {
  render: (args) => {
    const largeDataset = generateSampleData(200);
    
    return (
      <RdsFluentGridBasic
        {...args}
        tableHeaders={sampleHeaders}
        tableData={largeDataset}
        actions={sampleActions}
        pagination={true}
        recordsPerPage={25}
        isSort={true}
        isFilter={true}
        enableCheckboxSelection={true}
        showHeader={true}
        showSubHeader={true}
        noDataHeaderTitle="Large Dataset Grid"
      />
    );
  },
  args: {
    pagination: true,
    recordsPerPage: 25,
    isSort: true,
    isFilter: true,
    enableCheckboxSelection: true,
  },
};
