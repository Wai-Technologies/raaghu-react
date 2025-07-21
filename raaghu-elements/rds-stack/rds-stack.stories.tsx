import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Typography } from '@mui/material';
import RdsStack from './rds-stack';

const meta: Meta<typeof RdsStack> = {
  title: 'Elements/Stack',
  component: RdsStack,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    spacing: {
      control: { type: 'number' },
    },
    divider: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const stackItems = [
  <Box key="1" sx={{ p: 1, bgcolor: 'primary.light', color: 'white' }}>Item 1</Box>,
  <Box key="2" sx={{ p: 1, bgcolor: 'secondary.light', color: 'white' }}>Item 2</Box>,
  <Box key="3" sx={{ p: 1, bgcolor: 'success.light', color: 'white' }}>Item 3</Box>,
];

export const Default: Story = {
  args: {
    spacing: 2,
    children: stackItems,
  },
};

export const Row: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    children: stackItems,
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    spacing: 2,
    children: stackItems,
  },
};

export const RowReverse: Story = {
  args: {
    direction: 'row-reverse',
    spacing: 2,
    children: stackItems,
  },
};

export const ColumnReverse: Story = {
  args: {
    direction: 'column-reverse',
    spacing: 2,
    children: stackItems,
  },
};

export const WithSpacing: Story = {
  args: {
    direction: 'row',
    spacing: 4,
    children: stackItems,
  },
};

export const NoSpacing: Story = {
  args: {
    direction: 'row',
    spacing: 0,
    children: stackItems,
  },
};

export const WithDivider: Story = {
  args: {
    direction: 'row',
    spacing: 2,
    divider: true,
    children: stackItems,
  },
};

export const Responsive: Story = {
  args: {
    direction: { xs: 'column', sm: 'row' },
    spacing: { xs: 1, sm: 2, md: 4 },
    children: [
      <Typography key="1" variant="h6">Responsive</Typography>,
      <Typography key="2" variant="h6">Stack</Typography>,
      <Typography key="3" variant="h6">Layout</Typography>,
    ],
  },
};
