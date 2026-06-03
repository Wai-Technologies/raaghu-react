import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent } from 'storybook/test';
import { Typography, Box } from '@mui/material';
import RdsCollapse from './rds-collapse';
import RdsTypography from '../../raaghu-elements/rds-typography/rds-typography';

const meta: Meta<typeof RdsCollapse> = {
  title: 'Elements/Collapse',
  component: RdsCollapse,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
    controls: { exclude: ['timeout'] },
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
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
      <Box className="rds-collapse__story-box">
        <RdsTypography variant="body1" paragraph>
          This is the content that can be collapsed and expanded.
        </RdsTypography>
        <RdsTypography variant="body2" color="text.secondary">
          You can put any content here including text, images, forms, or other components.
        </RdsTypography>
      </Box>
    ),
  },
  play: async ({ canvas }) => {
    const button = await canvas.findByRole('button');
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(await canvas.findByText('This is the content that can be collapsed and expanded.')).toBeInTheDocument();
  },
};

export const Expanded: Story = {
  args: {
    title: 'Initially Expanded',
    expanded: true,
    children: (
      <Box sx={{ p: 2, backgroundColor: 'primary.light', color: 'primary.contrastText', borderRadius: 1 }}>
        <RdsTypography variant="body1" paragraph>
          This collapse component starts in an expanded state.
        </RdsTypography>
        <RdsTypography variant="body2">
          Click the arrow button to collapse this content.
        </RdsTypography>
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
        <RdsTypography variant="h6" gutterBottom>
          Content without title
        </RdsTypography>
        <RdsTypography variant="body2">
          This collapse component has no title, just a toggle button.
        </RdsTypography>
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
        <RdsTypography variant="body1">
          This collapse component has no toggle button and is controlled externally.
        </RdsTypography>
      </Box>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: 'Long Content Example',
    expanded: false,
    children: (
  <Box className="rds-collapse__story-box rds-collapse__story-box--warning">
        <RdsTypography variant="h6" gutterBottom>
          Lorem Ipsum
        </RdsTypography>
        <RdsTypography variant="body2" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </RdsTypography>
        <RdsTypography variant="body2" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </RdsTypography>
        <RdsTypography variant="body2">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </RdsTypography>
      </Box>
    ),
  },
};


