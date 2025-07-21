import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsSlider from './rds-slider';
import { Box } from '@mui/material';

const meta: Meta<typeof RdsSlider> = {
  title: 'Elements/Slider',
  component: RdsSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 30,
    min: 0,
    max: 100,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, margin: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const WithMarks: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    marks: true,
    step: 10,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, margin: 2 }}>
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
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, margin: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    value: 40,
    disabled: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 300, margin: 2 }}>
        <Story />
      </Box>
    ),
  ],
};
