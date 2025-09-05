import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridBasic from './rds-comp-fluent-grid-basic';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const meta: Meta<typeof RdsFluentGridBasic> = {
  title: 'Components/RdsFluentGridSimple',
  component: RdsFluentGridBasic,
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
type Story = StoryObj<typeof RdsFluentGridBasic>;

// Simple sample data
const sampleColumns = [
  {
    key: 'id',
    name: 'ID',
    isSort: true,
    isFilter: true,
  },
  {
    key: 'name',
    name: 'Name',
    isSort: true,
    isFilter: true,
  },
  {
    key: 'email',
    name: 'Email',
    isSort: true,
    isFilter: true,
  },
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

export const Default: Story = {
  args: {
    tableHeaders: sampleColumns,
    tableData: sampleData,
    isSort: true,
    isFilter: true,
    showHeader: true,
    showSubHeader: true,
    theme: 'light',
  },
};