import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsProgress from './rds-progress';
import { Box } from '@mui/material';
import { expect } from 'storybook/test';

const meta: Meta<typeof RdsProgress> = {
  title: 'Elements/Progress',
  component: RdsProgress,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    style: {
      control: {
        type: 'select',
      },
      options: ['circular', 'line', 'stepper', 'dash', 'block'],
      description: 'The visual style of the progress indicator',
    },
    mode: { control: 
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
    stepIcon: {
      control: {
        type: 'select',
      },
      options: ['number', 'dot'],
      description: 'The type of stepper indicator. Only applies when style is stepper.',
      if: { arg: 'style', eq: 'stepper' },
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    style: 'circular',
    mode: 'determinate',
    steps: 4,
    showLabel: true,
    color: 'primary',
  },
  play: async ({ canvas }) => {
    const progress = await canvas.findByRole('progressbar');
    await expect(progress).toBeInTheDocument();
  },
};
Circular.parameters = { controls: { include: ['style', 'mode', 'steps', 'showLabel', 'color', 'stepIcon'] } };

export const Stepper: Story = {
  args: {
    style: 'stepper',
    steps: 2,
    color: 'primary',
    stepIcon: 'dot',
  },
};
Stepper.parameters = { controls: { include: ['style', 'steps', 'color', 'stepIcon'] } };

export const ColorVariants: Story = {
  args: {
    mode: 'determinate',
    value: 60,
    color: 'secondary',
  },
};
ColorVariants.parameters = { controls: { include: ['mode', 'value', 'color'] } };

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
  },
};
Indeterminate.parameters = { controls: { include: ['mode'] } };

export const Linear: Story = {
  args: {
    mode: 'determinate',
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
Linear.parameters = { controls: { include: ['mode', 'value'] } };

export const Default: Story = { ...Circular };
