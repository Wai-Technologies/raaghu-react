import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import RdsProgressBar, { RdsProgressBarProps } from "./rds-progress-bar";
import { progress_colors } from "../../libs/types/colorvariant";

const meta: Meta = {
  title: 'Elements/Progress Bar',
  component: RdsProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      options: Object.values(progress_colors),
      control: { type: "select" },
      description: 'The color variant of the progress bar.',
    },
    role: {
      options: ['single', 'multiple', 'circular', 'dash', 'block', 'stepper'],
      control: { type: "select" },
      description: 'The role of the progress bar.',
    },
    striped: {
      control: { type: 'boolean' },
      description: 'Whether the progress bar is striped.',
    },
    progressWidth: {
      control: { type: 'number' },
      description: 'The width of the progress bar.',
    },
    steps: {
      control: { type: 'number' },
      description: 'The width of the progress bar.',
    },
    completedSteps: {
      control: { type: 'number' },
      description: 'The width of the progress bar.',
    },
    animation: {
      control: { type: 'boolean' },
      description: 'Whether the progress bar has animation.',
    },
    height: {
      control: { type: 'number' },
      description: 'The height of the progress bar.',
    },
    displayLabel: {
      control: { type: 'boolean' },
      description: 'Whether to display the label on the progress bar.',
    },
    displayPercentage: {
      control: { type: 'boolean' },
      description: 'Whether to display the percentage on the progress bar.',
    },
    progressValues: {
      control: { type: 'object' },
      description: 'The values for multiple progress bars.',
    },
    stepperVariant: {
      options: ['filled', 'outlined'],
      control: { type: "select" },
    },
    Icon: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
} satisfies Meta<RdsProgressBarProps>;


export default meta;
type Story = StoryObj<typeof RdsProgressBar>;

export const Default: Story = {
  args: {
    role: "single",
    colorVariant: "primary",
    striped: true,
    progressWidth: 40,
    steps: 5,
    completedSteps: 0,
    stepperVariant: 'filled',
    Icon: false,
    //StepIconName: generateStepIconName(5),
    animation: false,
    height: 4,
    //displayLabel: true,
    displayPercentage: true,
    progressValues: [
      {
        progressWidth: 50,
        colorVariant: "success",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 20,
        colorVariant: "danger",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 30,
        colorVariant: "info",
        stripe: true,
        animation: true,
      },
    ],
  },
} satisfies Story;

Default.parameters = {
  controls: { include: ['role', 'colorVariant', 'striped', 'progressWidth', 'progressValues', 'steps', 'completedSteps', 'animation', 
    'height', /*'displayLabel',*/ 'displayPercentage', 'stepperVariant', 'Icon', /*'StepIconName'*/] },
};
/*
export const MultiProgressBar: Story = {
  args: {
    role: "multiple",
    height: 15,
    colorVariant: "primary",
    striped: true,
    progressWidth: 40,
    animation: false,
    displayLabel: true,
    displayPercentage: true,
    progressValues: [
      {
        progressWidth: 50,
        colorVariant: "success",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 20,
        colorVariant: "danger",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 30,
        colorVariant: "info",
        stripe: true,
        animation: true,
      },
    ],
  },
} satisfies Story;

MultiProgressBar.parameters = {
  controls: { include: ['role', 'height', 'progressValues'] },
};

export const Circular: Story = {
  args: {
    role: "Circular",
    colorVariant: "primary",
    progressWidth: 40,
    height: 80,
    displayPercentage: true,
    progressValues: [
      {
        progressWidth: 50,
        colorVariant: "success",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 20,
        colorVariant: "danger",
        stripe: true,
        animation: true,
      },
      {
        progressWidth: 30,
        colorVariant: "info",
        stripe: true,
        animation: true,
      },
    ],
  },
  argTypes: {
    height: {
      control: {
        type: 'number',
        min: 80,
        max: 300,
      },
      table: {
        defaultValue: { summary: "80" },
      },
    },
  },
} satisfies Story;

Circular.parameters = {
  controls: { include: ['role', 'colorVariant', 'progressWidth', 'height', 'displayPercentage'] },
};*/
