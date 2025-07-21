import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsStepper from './rds-stepper';

const meta: Meta<typeof RdsStepper> = {
  title: 'Elements/Stepper',
  component: RdsStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number' },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    alternativeLabel: {
      control: { type: 'boolean' },
    },
    nonLinear: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  'Select campaign settings',
  'Create an ad group',
  'Create an ad',
];

export const Default: Story = {
  args: {
    activeStep: 1,
    steps: steps,
  },
};

export const FirstStep: Story = {
  args: {
    activeStep: 0,
    steps: steps,
  },
};

export const LastStep: Story = {
  args: {
    activeStep: 2,
    steps: steps,
  },
};

export const Completed: Story = {
  args: {
    activeStep: 3,
    steps: steps,
  },
};

export const Vertical: Story = {
  args: {
    activeStep: 1,
    orientation: 'vertical',
    steps: steps,
  },
};

export const AlternativeLabel: Story = {
  args: {
    activeStep: 1,
    alternativeLabel: true,
    steps: steps,
  },
};

export const NonLinear: Story = {
  args: {
    activeStep: 1,
    nonLinear: true,
    steps: steps,
  },
};

export const WithOptionalSteps: Story = {
  args: {
    activeStep: 1,
    steps: [
      'Select campaign settings',
      'Create an ad group',
      'Create an ad',
    ],
    optional: [1], // Second step is optional
  },
};

export const WithErrors: Story = {
  args: {
    activeStep: 1,
    steps: steps,
    error: [1], // Second step has error
  },
};
