import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within, waitFor } from 'storybook/test';
import { List, ListItem, ListItemText } from '@mui/material';
import RdsDrawer from './rds-drawer';
import RdsTypography from '../rds-typography/rds-typography';

const meta: Meta<typeof RdsDrawer> = {
  title: 'Elements/Drawer',
  component: RdsDrawer,
  parameters: {
        status: { type: 'stable' },
    layout: 'centered',
  },
  tags: ['autodocs', 'stable'],
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
    centerTrigger: true,
    children: drawerContent,
  },
};
Default.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'centerTrigger'] },
};

export const Right: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'right',
    centerTrigger: true,
    children: drawerContent,
  },
};
Right.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'centerTrigger'] },
};

export const Top: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'top',
    centerTrigger: true,
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <RdsTypography variant="h6" gutterBottom>
          Top Drawer
        </RdsTypography>
        <RdsTypography variant="body1">This drawer slides from the top of the screen.</RdsTypography>
      </div>
    ),
  },
};
Top.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'centerTrigger'] },
};

export const Bottom: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'bottom',
    centerTrigger: true,
    children: (
      <div style={{ height: 200, padding: '16px' }}>
        <RdsTypography variant="h6" gutterBottom>
          Bottom Drawer
        </RdsTypography>
        <RdsTypography variant="body1">This drawer slides from the bottom of the screen.</RdsTypography>
      </div>
    ),
  },
};
Bottom.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'centerTrigger'] },
};

export const Persistent: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Persistent Drawer',
    triggerTextWhenOpen: 'Close Persistent Drawer',
    variant: 'persistent',
    anchor: 'left',
    centerTrigger: true,
    triggerWrapperClassName: 'rds-drawer-persistent-trigger',
    children: drawerContent,
  },
};
Persistent.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'triggerTextWhenOpen', 'centerTrigger'] },
};

export const Interactive: Story = {
  args: {
    showTrigger: true,
    triggerText: 'Open Drawer',
    anchor: 'left',
    centerTrigger: true,
    showCloseButton: true,
    closeButtonText: 'Close Drawer',
    children: (
      <div style={{ width: 250, padding: '16px' }}>
        <RdsTypography variant="h6" gutterBottom>
          Interactive Drawer
        </RdsTypography>
      </div>
    ),
  },
};
Interactive.parameters = {
  controls: { include: ['showTrigger', 'triggerText', 'anchor', 'children', 'variant', 'showCloseButton', 'centerTrigger'] },
};
