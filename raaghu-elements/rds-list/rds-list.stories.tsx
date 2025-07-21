import type { Meta, StoryObj } from '@storybook/react-vite';
import { List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home, Person, Settings, Info } from '@mui/icons-material';
import RdsList from './rds-list';

const meta: Meta<typeof RdsList> = {
  title: 'Elements/List',
  component: RdsList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    dense: {
      control: { type: 'boolean' },
    },
    disablePadding: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <ListItem>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Item 3" />
        </ListItem>
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </>
    ),
  },
};

export const WithSecondaryText: Story = {
  args: {
    children: (
      <>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText 
            primary="Home" 
            secondary="Navigate to home page" 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText 
            primary="Profile" 
            secondary="View and edit your profile" 
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText 
            primary="Settings" 
            secondary="Configure application settings" 
          />
        </ListItem>
      </>
    ),
  },
};

export const Dense: Story = {
  args: {
    dense: true,
    children: (
      <>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </>
    ),
  },
};

export const WithDividers: Story = {
  args: {
    children: (
      <>
        <ListItem>
          <ListItemText primary="Item 1" secondary="Description 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item 2" secondary="Description 2" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="Item 3" secondary="Description 3" />
        </ListItem>
      </>
    ),
  },
};
