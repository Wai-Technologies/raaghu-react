import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsProgress from './rds-progress';
import { Box } from '@mui/material';

const meta: Meta<typeof RdsProgress> = {
  title: 'Elements/Progress',
  component: RdsProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    variant: 'determinate',
    value: 50,
  },
};

export const Linear: Story = {
  args: {
    variant: 'determinate',
    value: 75,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: '100%' }}>
        <Story />
      </Box>
    ),
  ],
};

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};

export const ColorVariants: Story = {
  args: {
    variant: 'determinate',
    value: 60,
    color: 'secondary',
  },
};
