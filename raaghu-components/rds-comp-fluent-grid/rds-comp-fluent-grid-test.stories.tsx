import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Simple test component
const TestComponent = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Test Component</h2>
      <p>This is a test to see if Storybook can load this file.</p>
    </div>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const meta: Meta<typeof TestComponent> = {
  title: 'Test/TestComponent',
  component: TestComponent,
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
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {},
};