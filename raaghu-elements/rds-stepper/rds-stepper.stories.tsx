import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsStepper from './rds-stepper';

const meta: Meta<typeof RdsStepper> = {
  title: 'Elements/Stepper',
  component: RdsStepper,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: {
      exclude: ['alternativeLabel'],
    },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    currentStep: {
      control: { type: 'number' },
    },
    showContent: {
      control: { type: 'boolean' },
      description: 'Show or hide step label text',
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    alternativeLabel: {
      control: { type: 'boolean' },
    },
    nonLinear: {
      control: { type: 'boolean' },
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
    children: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { label: 'Select campaign settings' },
  { label: 'Create an ad group' },
  { label: 'Create an ad' },
];

export const Default: Story = {
  args: {
    currentStep: 1,
    steps: steps,
    showContent: true,
  },
};

export const FirstStep: Story = {
  args: {
  currentStep: 0,
    steps: steps,
  },
};

export const LastStep: Story = {
  args: {
  currentStep: 2,
    steps: steps,
  },
};

export const Completed: Story = {
  args: {
  currentStep: 3,
    steps: steps,
  },
};

export const Vertical: Story = {
  args: {
  currentStep: 1,
  direction: 'vertical',
    steps: steps,
  },
};

export const AlternativeLabel: Story = {
  args: {
  currentStep: 1,
    alternativeLabel: true,
    steps: steps,
  },
};

export const NonLinear: Story = {
  args: {
  currentStep: 1,
    nonLinear: true,
    steps: steps,
  },
};

export const WithOptionalSteps: Story = {
  args: {
    currentStep: 1,
    steps: [
      { label: 'Select campaign settings' },
      { label: 'Create an ad group', optional: true },
      { label: 'Create an ad' },
    ],
  },
};

export const WithErrors: Story = {
  args: {
    currentStep: 1,
    steps: [
      { label: 'Select campaign settings' },
      { label: 'Create an ad group', error: true },
      { label: 'Create an ad' },
    ],
  },
};
