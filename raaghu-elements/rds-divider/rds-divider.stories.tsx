import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsDivider from './rds-divider';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof RdsDivider> = {
  title: 'Elements/Divider',
  component: RdsDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Typography>Content above divider</Typography>
        <Story />
        <Typography>Content below divider</Typography>
      </Box>
    ),
  ],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    text: {
      control: 'text',
    },
    position: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    flexItem: {
      control: 'boolean',
    },
      showIcon: {
      control: 'boolean',
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Divider',
    position: 'center',
    showIcon: true,
  },
};
export const Vertical: Story = {
  args: {
    
    flexItem: true,
    text: 'Vertical Divider',
    
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: 120 }}>
        <Typography>Left</Typography>
        <Story />
        <Typography>Right</Typography>
      </Box>
    ),
  ],
};


export const WithText: Story = {
  args: {
    text: 'OR',
    position: 'center',
    showIcon: true,
  },
};

export const Flexed: Story = {
  args: {
    text: 'Flexed',
    flexItem: true,
    showIcon: true,
  },
};
