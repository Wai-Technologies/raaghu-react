import type { Meta, StoryObj } from '@storybook/react-vite';
import {List, ListItem, ListItemText, Typography } from '@mui/material';
import RdsDrawer from './rds-drawer';
import RdsTypography from '../rds-typography/rds-typography';

const meta: Meta<typeof RdsDrawer> = {
  title: 'Elements/Drawer',
  component: RdsDrawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    anchor: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    variant: {
      control: { type: 'select' },
      options: ['permanent', 'persistent', 'temporary'],
    },
    container: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const drawerContent = (
  <div style={{ width: 250, padding: '16px' }}>
    <RdsTypography variant="h6" gutterBottom>
      Drawer Content
    </RdsTypography>
    <List>
      <ListItem>
        <ListItemText primary="Item 1" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 2" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 3" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Item 4" />
      </ListItem>
    </List>
  </div>
);

export const Default: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'left',
    children: drawerContent,
  },
};

export const Right: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'right',
    children: drawerContent,
  },
};

export const Top: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'top',
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Top Drawer
        </Typography>
        <Typography variant="body1">This drawer slides from the top of the screen.</Typography>
      </div>
    ),
  },
};

export const Bottom: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'bottom',
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Bottom Drawer
        </Typography>
        <Typography variant="body1">This drawer slides from the bottom of the screen.</Typography>
      </div>
    ),
  },
};

export const Persistent: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Persistent Drawer',
    triggerTextWhenOpen: 'Close Persistent Drawer',
    variant: 'persistent',
    anchor: 'left',
    children: drawerContent,
  },
};

export const Interactive: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'left',
    showCloseButton: true,
    closeButtonText: 'Close Drawer',
    children: (
      <div style={{ width: 250, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Interactive Drawer
        </Typography>
      </div>
    ),
  },
};
