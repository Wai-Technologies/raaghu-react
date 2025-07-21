import type { Meta, StoryObj } from '@storybook/react';
import { Typography, Box } from '@mui/material';
import RdsCollapse from './rds-collapse';

const meta: Meta<typeof RdsCollapse> = {
  title: 'Elements/Collapse',
  component: RdsCollapse,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    timeout: {
      control: 'number',
    },
    expanded: {
      control: 'boolean',
    },
    showToggleButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Collapsible Section',
    expanded: false,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="body1" paragraph>
          This is the content that can be collapsed and expanded.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can put any content here including text, images, forms, or other components.
        </Typography>
      </Box>
    ),
  },
};

export const Expanded: Story = {
  args: {
    title: 'Initially Expanded',
    expanded: true,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'primary.light', color: 'primary.contrastText', borderRadius: 1 }}>
        <Typography variant="body1" paragraph>
          This collapse component starts in an expanded state.
        </Typography>
        <Typography variant="body2">
          Click the arrow button to collapse this content.
        </Typography>
      </Box>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    expanded: false,
    showToggleButton: true,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'secondary.light', color: 'secondary.contrastText', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Content without title
        </Typography>
        <Typography variant="body2">
          This collapse component has no title, just a toggle button.
        </Typography>
      </Box>
    ),
  },
};

export const NoToggleButton: Story = {
  args: {
    title: 'No Toggle Button',
    expanded: true,
    showToggleButton: false,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'success.light', color: 'success.contrastText', borderRadius: 1 }}>
        <Typography variant="body1">
          This collapse component has no toggle button and is controlled externally.
        </Typography>
      </Box>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: 'Long Content Example',
    expanded: false,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'warning.light', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Lorem Ipsum
        </Typography>
        <Typography variant="body2" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body2" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        <Typography variant="body2">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Typography>
      </Box>
    ),
  },
};
