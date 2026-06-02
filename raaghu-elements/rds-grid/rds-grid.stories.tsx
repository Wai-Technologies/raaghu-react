import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import { Paper, Typography } from '@mui/material';
import RdsGrid from './rds-grid';

const meta: Meta<typeof RdsGrid> = {
  title: 'Elements/Grid',
  component: RdsGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    container: {
      control: { type: 'boolean' },
    },
    spacing: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
  args: {
    children: (
      <div style={{ flex: 1, padding: "15px" }}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Grid Content</Typography>
        </Paper>
      </div>
    ),
  },
};

export const Container: Story = {
  args: {
    container: true,
    spacing: 2,
    sx: { p: 2 },
    children: (
      <>
        <div style={{ flex: 1 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>Item 1</Typography>
          </Paper>
        </div>
        <div style={{ flex: 1 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography>Item 2</Typography>
          </Paper>
        </div>
      </>
    ),
  },
};
