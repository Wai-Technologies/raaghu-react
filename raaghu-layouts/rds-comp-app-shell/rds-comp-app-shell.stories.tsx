import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsCompAppShell from './rds-comp-app-shell';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Paper } from '@mui/material';

const meta: Meta<typeof RdsCompAppShell> = {
  title: 'Layouts/Application Shell',
  component: RdsCompAppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['default', 'triPane', 'minimal'],
      description: 'The layout variant of the app shell',
    },
    sideNavCollapsed: {
      control: 'boolean',
      description: 'Whether the side navigation is collapsed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample components for demonstration
const SampleTopNav = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Raaghu App
      </Typography>
    </Toolbar>
  </AppBar>
);

const SampleSideNav = () => (
  <Paper sx={{ height: '100%', width: '100%' }}>
    <List>
      <ListItem>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Settings" />
      </ListItem>
    </List>
  </Paper>
);

const SampleContent = () => (
  <Paper sx={{ p: 3, height: '100%' }}>
    <Typography variant="h4" gutterBottom>
      Main Content Area
    </Typography>
    <Typography variant="body1">
      This is the main content area of your application. It will automatically adjust based on the app shell layout.
    </Typography>
  </Paper>
);

export const Default: Story = {
  args: {
    topNav: <SampleTopNav />,
    sideNav: <SampleSideNav />,
    children: <SampleContent />,
    layout: 'default',
    sideNavCollapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    topNav: <SampleTopNav />,
    sideNav: <SampleSideNav />,
    children: <SampleContent />,
    layout: 'default',
    sideNavCollapsed: true,
  },
};

export const TriPane: Story = {
  args: {
    topNav: <SampleTopNav />,
    sideNav: <SampleSideNav />,
    children: <SampleContent />,
    layout: 'triPane',
    sideNavCollapsed: false,
  },
};

export const Minimal: Story = {
  args: {
    topNav: <SampleTopNav />,
    sideNav: <SampleSideNav />,
    children: <SampleContent />,
    layout: 'minimal',
    sideNavCollapsed: false,
  },
};

export const OnlyContent: Story = {
  args: {
    children: <SampleContent />,
    layout: 'default',
  },
};
