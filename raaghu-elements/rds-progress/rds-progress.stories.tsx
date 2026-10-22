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
    variant: {
      control: {
        type: 'select',
      },
      options: ['circular', 'line', 'stepper', 'dash', 'block'],
      description: 'The visual style of the progress indicator',
    },
    progressVariant: { control:
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
      description: 'Progress steps (1=20%, 2=40%, 3=60%, 4=80%, 5=100%). Only works for circular, stepper, dash, and block variants.',
    },
    stepperType: {
      control: {
        type: 'select',
      },
      options: ['number', 'circle'],
      description: 'The type of stepper indicator. Only applies when variant is stepper.',
      if: { arg: 'variant', eq: 'stepper' },
    },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = {
  args: {
    variant: 'circular',
    progressVariant: 'determinate',
    steps: 4,
    showLabel: true,
    color: 'primary',
  },
  play: async ({ canvas }) => {
    const progress = await canvas.findByRole('progressbar');
    await expect(progress).toBeInTheDocument();
  },
};
Circular.parameters = { controls: { include: ['variant', 'progressVariant', 'steps', 'showLabel', 'color', 'stepperType'] } };

export const Stepper: Story = {
  args: {
    variant: 'stepper',
    steps: 2,
    color: 'primary',
    stepperType: 'circle',
  },
};
Stepper.parameters = { controls: { include: ['variant', 'steps', 'color', 'stepperType'] } };

export const ColorVariants: Story = {
  args: {
    progressVariant: 'determinate',
    value: 60,
    color: 'secondary',
  },
};
ColorVariants.parameters = { controls: { include: ['progressVariant', 'value', 'color'] } };

export const Indeterminate: Story = {
  args: {
    progressVariant: 'indeterminate',
  },
};
Indeterminate.parameters = { controls: { include: ['progressVariant'] } };

export const Linear: Story = {
  args: {
    progressVariant: 'determinate',
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
Linear.parameters = { controls: { include: ['progressVariant', 'value'] } };

export const Default: Story = { ...Circular };
