import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import RdsSlider from './rds-slider';
import { Box } from '@mui/material';

const meta: Meta<typeof RdsSlider> = {
  title: 'Elements/Slider',
  component: RdsSlider,
  parameters: {
        status: { type: 'stable' },
    layout: 'padded',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    controlType: {
      control: { type: 'select' },
      options: ['one way', 'two way'],
      description: 'Slider control type - one way for single value, two way for range',
      defaultValue: 'one way',
    },
    leftLabel: {
      control: 'text',
      description: 'Label to display on the left side of the slider',
      defaultValue: '0',
    },
    rightLabel: {
      control: 'text',
      description: 'Label to display on the right side of the slider',
      defaultValue: '100',
    },
    value: {
      control: 'number',
      description: 'Current value of the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    marks: {
      control: 'boolean',
      description: 'Whether to show marks',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label above the slider',
    },
    showTooltip: {
      control: { type: 'select' },
      options: ['default', 'tooltip'],
      description: 'Show value tooltip on thumb hover',
      defaultValue: 'default',
    },
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Slider level (1-5)',
    },
    component: {
      control: { disable: true },
      table: { disable: true },
    },
    ref: {
      control: { disable: true },
      table: { disable: true },
    },
    slots: {
      control: { disable: true },
      table: { disable: true },
    },
    slotProps: {
      control: { disable: true },
      table: { disable: true },
    },
    valueLabelFormat: {
      control: { disable: true },
    },
    scale: {
      control: { disable: true },
    },
    onChange: {
      control: { disable: true },
      table: { disable: true },
    },
    onChangeCommitted: {
      control: { disable: true },
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    showLabel: true,
    label: 'Slider',
    controlType: 'one way',
    leftLabel: '0',
    rightLabel: '100',
  },
  argTypes: {
    value: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <Box className="rds-slider__story-wrapper">
        <Story />
      </Box>
    ),
  ],
};

export const WithMarks: Story = {
  args: {
    min: 0,
    max: 100,
    marks: true,
    step: 10,
    showLabel: true,
    label: 'Slider',
    controlType: 'one way',
    leftLabel: 'Min',
    rightLabel: 'Max',
  },
  argTypes: {
    value: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <Box className="rds-slider__story-wrapper">
        <Story />
      </Box>
    ),
  ],
};

export const Range: Story = {
  args: {
    value: [20, 80],
    min: 0,
    max: 100,
    showLabel: true,
    label: 'Slider',
    controlType: 'two way',
    leftLabel: 'Low',
    rightLabel: 'High',
  },
  decorators: [
    (Story) => (
      <Box className="rds-slider__story-wrapper">
        <Story />
      </Box>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    disabled: true,
    showLabel: true,
    label: 'Slider',
    controlType: 'one way',
    min: 0,
    max: 100,
    leftLabel: 'Start',
    rightLabel: 'End',
  },
  argTypes: {
    value: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <Box className="rds-slider__story-wrapper">
        <Story />
      </Box>
    ),
  ],
};
