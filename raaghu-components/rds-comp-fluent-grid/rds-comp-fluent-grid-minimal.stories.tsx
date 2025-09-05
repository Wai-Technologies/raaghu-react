import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RdsFluentGridMinimal from './rds-comp-fluent-grid-minimal';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const meta: Meta<typeof RdsFluentGridMinimal> = {
  title: 'Test/MinimalGrid',
  component: RdsFluentGridMinimal,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ height: '200px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RdsFluentGridMinimal>;

export const Default: Story = {
  args: {
    title: 'Test Grid Component',
  },
};