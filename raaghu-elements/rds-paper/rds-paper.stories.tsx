import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsPaper from './rds-paper';
import { Typography } from '@mui/material';

const meta: Meta<typeof RdsPaper> = {
  title: 'Elements/Paper',
  component: RdsPaper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    elevation: {
      control: 'number',
      description: 'Shadow elevation (0-24)',
    },
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
      description: 'Paper variant',
    },
    square: {
      control: 'boolean',
      description: 'Remove border radius',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <Typography>Default paper with elevation</Typography>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
};

export const HighElevation: Story = {
  args: {
    elevation: 8,
    children: (
      <div style={{ padding: '20px' }}>
        <Typography>High elevation paper</Typography>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div style={{ padding: '20px' }}>
        <Typography>Outlined paper variant</Typography>
      </div>
    ),
  },
};

export const Square: Story = {
  args: {
    square: true,
    children: (
      <div style={{ padding: '20px' }}>
        <Typography>Square paper (no border radius)</Typography>
      </div>
    ),
  },
};
