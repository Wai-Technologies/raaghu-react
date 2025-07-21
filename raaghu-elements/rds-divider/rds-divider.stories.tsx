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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <Box sx={{ display: 'flex', alignItems: 'center', height: 50 }}>
        <Typography>Left</Typography>
        <Story />
        <Typography>Right</Typography>
      </Box>
    ),
  ],
};

export const WithText: Story = {
  args: {
    children: 'OR',
  },
};

export const Flexed: Story = {
  args: {
    flexItem: true,
  },
};
