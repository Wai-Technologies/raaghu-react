import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import RdsContainer from './rds-container';
import { Typography, Paper } from '@mui/material';

const meta: Meta<typeof RdsContainer> = {
  title: 'Elements/Container',
  component: RdsContainer,
  parameters: {
        status: { type: 'stable' },
    layout: 'fullscreen',
    controls: { exclude: ['component'] },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
    },
    fixed: {
      control: { type: 'boolean' },
    },
    disableGutters: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = (
  <Paper sx={{ p: 3, mt: 2 }}>
    <Typography variant="h4" gutterBottom>
      Container Content
    </Typography>
    <Typography variant="body1">
      This is sample content inside the container. The container controls the max-width
      and centering of the content based on the current breakpoint.
    </Typography>
  </Paper>
);

export const Default: Story = {
  args: {
    children: sampleContent,
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
};

export const ExtraSmall: Story = {
  args: {
    maxWidth: 'xs',
    children: sampleContent,
  },
};

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: sampleContent,
  },
};

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    children: sampleContent,
  },
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: sampleContent,
  },
};

export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    children: sampleContent,
  },
};

export const Fluid: Story = {
  args: {
    maxWidth: false,
    children: sampleContent,
  },
};

export const Fixed: Story = {
  args: {
    fixed: true,
    children: sampleContent,
  },
};

export const NoGutters: Story = {
  args: {
    disableGutters: true,
    children: sampleContent,
  },
};
