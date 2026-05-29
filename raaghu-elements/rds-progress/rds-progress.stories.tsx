import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from '@storybook/test';
import RdsProgress from './rds-progress';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof RdsProgress> = {
  title: 'Elements/Progress',
  component: RdsProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: {
        type: 'select',
      },
      options: ['circular', 'line', 'stepper', 'dash', 'block'],
      description: 'The visual style of the progress indicator',
    },
    variant: { control: 
      { type: 'select' },
      options: ['determinate', 'indeterminate', 'buffer', 'query'] 
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The color of the progress indicator',
    },
    steps: {
      control: {
        type: 'select',
      },
      options: [0, 1, 2, 3, 4, 5],
      description: 'Progress steps (1=20%, 2=40%, 3=60%, 4=80%, 5=100%). Only works for circular, stepper, dash, and block styles.',
    },
    stepperType: {
      control: {
        type: 'select',
      },
      options: ['number', 'circle'],
      description: 'The type of stepper indicator',
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    style: 'circular',
    variant: 'determinate',
    steps: 4,
    showLabel: true,
    color: 'primary',
    stepperType: 'circle',
  },
};
Circular.parameters = { controls: { include: ['style', 'variant', 'steps', 'showLabel', 'color', 'stepperType'] } };

export const ColorVariants: Story = {
  args: {
    variant: 'determinate',
    value: 60,
    color: 'secondary',
  },
};
ColorVariants.parameters = { controls: { include: ['variant', 'value', 'color'] } };

export const Indeterminate: Story = {
  args: {
    variant: 'indeterminate',
  },
};
Indeterminate.parameters = { controls: { include: ['variant'] } };

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
Linear.parameters = { controls: { include: ['variant', 'value'] } };

export const ProgressVisible: Story = {
  name: 'Interaction: Progress bar renders with value',
  args: {
    variant: 'determinate',
    value: 75,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const bar = canvas.getByRole('progressbar')
    await expect(bar).toBeVisible()
    await expect(bar).toHaveAttribute('aria-valuenow', '75')
  }
};
