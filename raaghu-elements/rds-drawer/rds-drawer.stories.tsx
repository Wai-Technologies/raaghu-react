import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useState } from 'react';
import RdsDrawer from './rds-drawer';
import RdsButton from '../rds-button/rds-button';

const meta: Meta<typeof RdsDrawer> = {
  title: 'Elements/Drawer',
  component: RdsDrawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: 'boolean' },
    },
    anchor: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    variant: {
      control: { type: 'select' },
      options: ['permanent', 'persistent', 'temporary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const drawerContent = (
  <div style={{ width: 250, padding: '16px' }}>
    <Typography variant="h6" gutterBottom>
      Drawer Content
    </Typography>
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
    open: true,
    children: drawerContent,
  },
};

export const Right: Story = {
  args: {
    open: true,
    anchor: 'right',
    children: drawerContent,
  },
};

export const Top: Story = {
  args: {
    open: true,
    anchor: 'top',
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Top Drawer
        </Typography>
        <Typography variant="body1">
          This drawer slides from the top of the screen.
        </Typography>
      </div>
    ),
  },
};

export const Bottom: Story = {
  args: {
    open: true,
    anchor: 'bottom',
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <Typography variant="h6" gutterBottom>
          Bottom Drawer
        </Typography>
        <Typography variant="body1">
          This drawer slides from the bottom of the screen.
        </Typography>
      </div>
    ),
  },
};

export const Persistent: Story = {
  args: {
    open: true,
    variant: 'persistent',
    children: drawerContent,
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <RdsButton
          color="primary"
          layout="text-only"
          shape="rectangle"
          size="medium"
          state="default"
          style="filled"
          text="Open Drawer"
          textCase="unset"
          onClick={() => setOpen(true)}
        />
        <RdsDrawer open={open} onClose={() => setOpen(false)} anchor="left">
          <div style={{ width: 250, padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Interactive Drawer
            </Typography>
            <RdsButton
              color="primary"
              layout="text-only"
              shape="rectangle"
              size="medium"
              state="default"
              style="filled"
              text="Close Drawer"
              textCase="unset"
              onClick={() => setOpen(false)}
            />
          </div>
        </RdsDrawer>
      </>
    );
  },
};
