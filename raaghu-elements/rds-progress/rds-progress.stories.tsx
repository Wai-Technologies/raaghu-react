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
    className: {
      control: 'text',
      description: 'CSS class applied to the progress root.',
      table: { category: 'Root props' },
    },
    sx: {
      control: 'object',
      description: 'MUI system styles applied to the progress root.',
      table: { category: 'Root props' },
    },
    ref: {
      control: false,
      description: 'React ref to the progress root. Assign in code; refs cannot be set through Controls.',
      table: { category: 'Root props' },
    },
    shape: {
      control: {
        type: 'select',
      },
      options: ['circular', 'line', 'stepper', 'dash', 'block'],
      description: 'The shape of the progress indicator',
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
      description: 'The type of stepper indicator. Only applies when shape is stepper.',
      if: { arg: 'shape', eq: 'stepper' },
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    shape: 'circular',
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
Circular.parameters = { controls: { include: ['shape', 'mode', 'steps', 'showLabel', 'color', 'stepIcon', 'className', 'sx', 'ref'] } };

export const Stepper: Story = {
  args: {
    shape: 'stepper',
    steps: 2,
    color: 'primary',
    stepIcon: 'dot',
  },
};
Stepper.parameters = { controls: { include: ['shape', 'steps', 'color', 'stepIcon', 'className', 'sx', 'ref'] } };

export const ColorVariants: Story = {
  args: {
    mode: 'determinate',
    value: 60,
    color: 'secondary',
  },
};
ColorVariants.parameters = { controls: { include: ['mode', 'value', 'color', 'className', 'sx', 'ref'] } };

export const Indeterminate: Story = {
  args: {
    mode: 'indeterminate',
  },
};
Indeterminate.parameters = { controls: { include: ['mode', 'className', 'sx', 'ref'] } };

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
Linear.parameters = { controls: { include: ['mode', 'value', 'className', 'sx', 'ref'] } };

export const Default: Story = { ...Circular };
