import type { Meta, StoryObj } from '@storybook/react-vite';
import RdsAppBar from './rds-app-bar';
import { Typography, Button, IconButton } from '@mui/material';
import { Menu, Home, Search } from '@mui/icons-material';

const meta: Meta<typeof RdsAppBar> = {
  title: 'Elements/AppBar',
  component: RdsAppBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <IconButton edge="start" color="inherit">
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          App Title
        </Typography>
        <Button color="inherit">Login</Button>
      </>
    ),
  },
};

export const WithSearch: Story = {
  args: {
    children: (
      <>
        <IconButton edge="start" color="inherit">
          <Home />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <IconButton color="inherit">
          <Search />
        </IconButton>
      </>
    ),
  },
};
