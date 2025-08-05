import type { Meta, StoryObj } from '@storybook/react';
import { Button, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import RdsPopover from './rds-popover';

const meta: Meta<typeof RdsPopover> = {
  title: 'Elements/Popover',
  component: RdsPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
    },
    maxWidth: {
      control: 'text',
    },
    showCloseButton: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'bottom-right', 'bottom-center', 'bottom-left', 'left-bottom', 'left-center', 'left-top', 'no-arrow'],
      description: 'Position of the popover relative to the anchor element. Organized as [side]-[alignment], or "no-arrow" for a popover without an arrow',
      defaultValue: 'bottom-left',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'bottom-left',
    showCloseButton: false,
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
        <RdsPopover
          {...args}
          isOpen={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Simple Popover"
        >
          <Typography>
            This is a simple popover with some basic content.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};

export const WithCloseButton: Story = {
  argTypes: {
    position: { table: { disable: true } },
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="outlined" onClick={handleClick}>
          Open with Close Button
        </Button>
        <RdsPopover
          isOpen={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Popover with Close"
          showCloseButton
          position="no-arrow"
        >
          <Typography paragraph>
            This popover has a close button in the header.
          </Typography>
          <Typography>
            You can close it by clicking the X button or clicking outside.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};

export const WithList: Story = {
  argTypes: {
    position: { table: { disable: true } },
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const menuItems = [
      'Profile Settings',
      'Account Information',
      'Privacy Settings',
      'Notification Preferences',
      'Help & Support',
    ];

    return (
      <Box>
        <Button variant="contained" color="secondary" onClick={handleClick}>
          Open Menu Popover
        </Button>
        <RdsPopover
          isOpen={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Menu Options"
          width={250}
          position="no-arrow"
        >
          <List dense>
            {menuItems.map((item, index) => (
              <ListItem 
                key={index} 
                onClick={handleClose}
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </RdsPopover>
      </Box>
    );
  },
};

export const CustomPosition: Story = {
  argTypes: {
    position: { table: { disable: true } },
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="contained" color="success" onClick={handleClick}>
          Open Above Button
        </Button>
        <RdsPopover
          isOpen={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Custom Position"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          position="no-arrow"
          showCloseButton
        >
          <Typography>
            This popover opens above the button instead of below.
          </Typography>
        </RdsPopover>
      </Box>
    );
  },
};

export const WideContent: Story = {
  argTypes: {
    position: { table: { disable: true } },
  },
  render: () => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Box>
        <Button variant="outlined" color="warning" onClick={handleClick}>
          Open Wide Popover
        </Button>
        <RdsPopover
          isOpen={Boolean(anchorEl)}
          onClose={handleClose}
          anchorEl={anchorEl}
          title="Wide Content Popover"
          width={500}
          showCloseButton
          position="no-arrow"
        >
          <Typography paragraph>
            This popover has a fixed width of 500px and contains more content to demonstrate how it handles larger amounts of text.
          </Typography>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Typography>
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2">
              This is a highlighted section within the popover content.
            </Typography>
          </Box>
        </RdsPopover>
      </Box>
    );
  },
};
