import { expect, userEvent, within, fn, waitFor } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsLayout from './rds-layout';
import { Typography, Card, CardContent, Box, Button, IconButton } from '@mui/material';
import { Search, Notifications, AccountCircle } from '@mui/icons-material';

const meta: Meta<typeof RdsLayout> = {
  title: 'Elements/Layout',
  component: RdsLayout,
  parameters: {
        status: { type: 'stable' },
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'stable'],
  argTypes: {
    showHeader: {
      control: 'boolean',
      description: 'Whether to show the header',
    },
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Maximum width of the content container',
    },
    padding: {
      control: 'number',
      description: 'Padding around the content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      Welcome to the Dashboard
    </Typography>
    <Typography variant="body1" paragraph>
      This is a sample page layout with header and main content area. The layout is responsive and adjusts to different screen sizes.
    </Typography>
    
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, mt: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Card 1
          </Typography>
          <Typography variant="body2">
            This is some sample content for the first card.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Card 2
          </Typography>
          <Typography variant="body2">
            This is some sample content for the second card.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Card 3
          </Typography>
          <Typography variant="body2">
            This is some sample content for the third card.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </div>
);

export const Default: Story = {
  args: {
    header: {
      title: 'My Application',
    },
    children: <SampleContent />,
  },
  play: async ({ canvasElement }) => {
    const el = canvasElement.firstElementChild;
    expect(el).toBeTruthy();
  },
};

export const WithMenuButton: Story = {
  args: {
    header: {
      title: 'Dashboard',
      showMenuButton: true,
      onMenuClick: () => alert('Menu clicked!'),
    },
    children: <SampleContent />,
  },
};

export const WithHeaderActions: Story = {
  args: {
    header: {
      title: 'Application',
      showMenuButton: true,
      actions: (
        <>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </>
      ),
    },
    children: <SampleContent />,
  },
};

export const WithoutHeader: Story = {
  args: {
    showHeader: false,
    children: (
      <div>
        <Typography variant="h4" gutterBottom>
          Layout without Header
        </Typography>
        <Typography variant="body1">
          This layout doesn't include a header, useful for login pages or other standalone pages.
        </Typography>
      </div>
    ),
  },
};

export const NarrowLayout: Story = {
  args: {
    header: {
      title: 'Narrow Layout',
    },
    maxWidth: 'sm',
    children: (
      <div>
        <Typography variant="h5" gutterBottom>
          Narrow Content Area
        </Typography>
        <Typography variant="body1">
          This layout uses a smaller maximum width, suitable for forms or detailed content that doesn't need the full screen width.
        </Typography>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    header: {
      title: 'Full Width Layout',
    },
    maxWidth: false,
    children: (
      <div>
        <Typography variant="h5" gutterBottom>
          Full Width Content
        </Typography>
        <Typography variant="body1">
          This layout uses the full width of the screen, useful for dashboards or data tables.
        </Typography>
      </div>
    ),
  },
};
